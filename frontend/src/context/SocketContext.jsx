import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const STAGES = [
  'Uploading',
  'Validating',
  'Compressing',
  'Sensitivity Analysis',
  'Thumbnail Generation',
  'Streaming Optimization',
  'Completed'
];

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const [queue, setQueue] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  
  // Toggle simulation mode
  const [isSimulating, setIsSimulating] = useState(true);

  // Initialize socket connection
  useEffect(() => {
    // We connect to the backend URL, falling back to localhost if not found
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const newSocket = io(backendUrl, {
      autoConnect: true,
      reconnection: true,
    });

    newSocket.on('connect', () => setIsConnected(true));
    newSocket.on('disconnect', () => setIsConnected(false));

    // Handle real events if they come in
    newSocket.on('processing_started', (data) => handleProcessingStarted(data));
    newSocket.on('processing_progress', (data) => handleProcessingProgress(data));
    newSocket.on('processing_completed', (data) => handleProcessingCompleted(data));
    newSocket.on('processing_failed', (data) => handleProcessingFailed(data));

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  // Utility to add to activity feed
  const logActivity = useCallback((type, message, videoId) => {
    setActivityFeed(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      type,
      message,
      videoId
    }, ...prev].slice(0, 50)); // Keep last 50
  }, []);

  // Event Handlers
  const handleProcessingStarted = useCallback((data) => {
    setQueue(prev => {
      if (prev.find(v => v.id === data.id)) return prev;
      return [...prev, { ...data, stage: 0, progress: 0, status: 'processing' }];
    });
    logActivity('info', `Started processing: ${data.title}`, data.id);
  }, [logActivity]);

  const handleProcessingProgress = useCallback((data) => {
    setQueue(prev => prev.map(video => {
      if (video.id === data.id) {
        return { ...video, stage: data.stage, progress: data.progress, status: 'processing' };
      }
      return video;
    }));
    // Only log stage changes to avoid spam
    if (data.progress === 0 || data.progress === 100) {
      logActivity('progress', `Advanced to stage: ${STAGES[data.stage]}`, data.id);
    }
  }, [logActivity]);

  const handleProcessingCompleted = useCallback((data) => {
    setQueue(prev => prev.map(video => 
      video.id === data.id 
        ? { ...video, stage: 6, progress: 100, status: 'completed' } 
        : video
    ));
    logActivity('success', `Completed processing: ${data.title || data.id}`, data.id);
  }, [logActivity]);

  const handleProcessingFailed = useCallback((data) => {
    setQueue(prev => prev.map(video => 
      video.id === data.id 
        ? { ...video, status: 'failed', error: data.error } 
        : video
    ));
    logActivity('error', `Failed at stage ${STAGES[data.stage]}: ${data.error}`, data.id);
  }, [logActivity]);

  const retryProcessing = useCallback((id) => {
    // In a real app, emit to backend: socket.emit('retry_processing', { id })
    logActivity('warning', `Retrying processing...`, id);
    setQueue(prev => prev.map(video => 
      video.id === id 
        ? { ...video, status: 'processing', error: null, stage: 0, progress: 0 } 
        : video
    ));
  }, [logActivity]);

  // Simulation Mode Logic
  useEffect(() => {
    if (!isSimulating) return;

    // Seed initial videos
    if (queue.length === 0) {
      handleProcessingStarted({ id: 'vid-1', title: 'Q3 All Hands.mp4' });
      setTimeout(() => handleProcessingStarted({ id: 'vid-2', title: 'Onboarding.mp4' }), 3000);
    }

    const interval = setInterval(() => {
      setQueue(currentQueue => {
        currentQueue.forEach(video => {
          if (video.status === 'processing' && video.stage < 6) {
            // Randomly advance progress
            let newProgress = video.progress + Math.floor(Math.random() * 15) + 5;
            let newStage = video.stage;
            
            // Randomly fail sometimes in compression or sensitivity
            if (Math.random() < 0.05 && (newStage === 2 || newStage === 3) && video.status !== 'failed') {
              handleProcessingFailed({ id: video.id, stage: newStage, error: 'Codec mismatch detected.' });
              return;
            }

            if (newProgress >= 100) {
              if (newStage === 5) {
                // Done!
                handleProcessingCompleted({ id: video.id, title: video.title });
              } else {
                // Next stage
                handleProcessingProgress({ id: video.id, stage: newStage + 1, progress: 0 });
              }
            } else {
              handleProcessingProgress({ id: video.id, stage: newStage, progress: newProgress });
            }
          }
        });
        return currentQueue;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulating, queue.length, handleProcessingCompleted, handleProcessingFailed, handleProcessingProgress, handleProcessingStarted]);

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      queue,
      activityFeed,
      retryProcessing,
      isSimulating,
      setIsSimulating
    }}>
      {children}
    </SocketContext.Provider>
  );
};
