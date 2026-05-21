import React, { useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Settings, ClosedCaption, FastForward 
} from 'lucide-react';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return '00:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const VideoPlayer = ({ src, poster, onVideoEnd }) => {
  const videoElement = useRef(null);
  const playerContainer = useRef(null);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    handleVolume,
    toggleFullscreen,
    showControlsTemporarily
  } = useVideoPlayer(videoElement);

  const { 
    isPlaying, progress, currentTime, duration, 
    speed, isMuted, volume, isFullscreen, showControls 
  } = playerState;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen(playerContainer);
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'arrowright':
          e.preventDefault();
          if (videoElement.current) {
            videoElement.current.currentTime += 5;
          }
          break;
        case 'arrowleft':
          e.preventDefault();
          if (videoElement.current) {
            videoElement.current.currentTime -= 5;
          }
          break;
        default:
          break;
      }
      showControlsTemporarily();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, toggleFullscreen, toggleMute, showControlsTemporarily]);

  return (
    <div 
      ref={playerContainer} 
      className={`relative bg-black overflow-hidden flex items-center justify-center group ${isFullscreen ? 'h-screen w-screen' : 'w-full aspect-video rounded-xl shadow-2xl'}`}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => {
        if (isPlaying) {
          // Force hide when mouse leaves
        }
      }}
      onClick={togglePlay}
    >
      <video
        ref={videoElement}
        src={src}
        poster={poster}
        onTimeUpdate={handleOnTimeUpdate}
        onEnded={onVideoEnd}
        autoPlay
        className="w-full h-full object-contain"
        onClick={(e) => e.stopPropagation()} // Prevent double toggle
      />

      {/* Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-6 py-4 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()} // Prevent toggling play when clicking controls
      >
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleVideoProgress}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:h-2 transition-all"
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="hover:text-indigo-400 transition-colors focus:outline-none">
              {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current" />}
            </button>
            
            <div className="flex items-center gap-3 group/volume">
              <button onClick={toggleMute} className="hover:text-indigo-400 transition-colors focus:outline-none">
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolume}
                className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white transition-all duration-300"
              />
            </div>

            <div className="text-sm font-medium tracking-wide font-mono">
              {formatTime(currentTime)} <span className="text-white/50">/</span> {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Speed Selector (Simple select for now) */}
            <div className="flex items-center gap-2 group/speed relative">
              <button className="hover:text-indigo-400 transition-colors focus:outline-none flex items-center gap-1 text-sm font-medium">
                {speed}x
              </button>
              <select 
                className="absolute inset-0 opacity-0 cursor-pointer"
                value={speed}
                onChange={handleVideoSpeed}
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>

            <button className="hover:text-indigo-400 transition-colors focus:outline-none">
              <ClosedCaption size={20} />
            </button>
            <button className="hover:text-indigo-400 transition-colors focus:outline-none">
              <Settings size={20} />
            </button>
            <button onClick={() => toggleFullscreen(playerContainer)} className="hover:text-indigo-400 transition-colors focus:outline-none">
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
