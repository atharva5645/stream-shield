import React, { useState, useEffect } from 'react';
import PagePlaceholder from '../../components/common/PagePlaceholder';
import { Film, MoreVertical, Play, Clock, X } from 'lucide-react';
import BackButton from '../../components/common/BackButton';

const Library = () => {
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem('mockVideos') || '[]');
    
    // Auto-upgrade any legacy videos that are stuck in Processing
    let upgraded = false;
    stored = stored.map(v => {
      if (v.status === 'Processing' || !v.videoUrl) {
        upgraded = true;
        return {
          ...v,
          status: 'Processed',
          videoUrl: v.videoUrl || 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        };
      }
      return v;
    });

    if (upgraded) {
      localStorage.setItem('mockVideos', JSON.stringify(stored));
    }
    
    setVideos(stored);
  }, []);

  if (videos.length === 0) {
    return (
      <PagePlaceholder 
        title="Video Library" 
        description="Manage your uploaded videos. Edit metadata, thumbnails, and privacy settings." 
        icon={Film}
        backTo="/editor/dashboard"
        backLabel="Back to Dashboard"
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <BackButton to="/editor/dashboard" label="Back to Dashboard" />
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Video Library</h2>
          <p className="text-gray-500 mt-1">Manage and organize your uploaded content</p>
        </div>
      </div>

      {playingVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-4xl overflow-hidden relative">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-white font-medium">{playingVideo.title}</h3>
              <button onClick={() => setPlayingVideo(null)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video 
                src={playingVideo.videoUrl} 
                controls 
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div 
              className="aspect-video bg-gray-100 relative flex items-center justify-center cursor-pointer"
              onClick={() => {
                if (video.videoUrl) setPlayingVideo(video);
              }}
            >
              <Film size={32} className="text-gray-400" />
              <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-gray-900 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform">
                  <Play size={20} className="fill-current" />
                </button>
              </div>
              {video.status === 'Processing' ? (
                <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock size={12} />
                  Processing
                </div>
              ) : (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                  Ready
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1" title={video.title}>{video.title}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={18} />
                </button>
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-3">
                <span>{(video.size / (1024 * 1024)).toFixed(1)} MB</span>
                <span>•</span>
                <span>{new Date(video.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
