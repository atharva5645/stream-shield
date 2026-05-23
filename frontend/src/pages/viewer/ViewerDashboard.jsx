import React, { useState, useEffect } from 'react';
import { Play, Info, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const VideoCard = ({ video, onClick }) => (
  <div onClick={onClick} className="group relative flex-none w-52 xs:w-60 md:w-72 xl:w-80 aspect-video cursor-pointer overflow-hidden rounded-md bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10 flex items-center justify-center">
    {video.videoUrl ? (
      <video 
        src={video.videoUrl} 
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" 
        preload="metadata"
        muted
        loop
        onMouseEnter={(e) => e.target.play().catch(() => {})}
        onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
      />
    ) : video.thumbnail ? (
      <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
    ) : (
      <div className="flex items-center justify-center h-full w-full bg-slate-900 border border-slate-700">
        <Video size={32} className="text-slate-600" />
      </div>
    )}

    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <h4 className="mb-2 line-clamp-1 text-sm font-bold text-white">{video.title}</h4>
      <div className="flex items-center gap-3">
        <button className="rounded-full bg-white p-2 text-black transition-colors hover:bg-gray-200">
          <Play size={14} className="fill-current" />
        </button>
        {video.progress !== undefined ? (
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-600">
            <div className="h-full rounded-full bg-red-600" style={{ width: `${video.progress}%` }} />
          </div>
        ) : null}
      </div>
    </div>

    {video.isNew ? <span className="absolute right-2 top-2 rounded-sm bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">New</span> : null}
  </div>
);

const ViewerDashboard = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await api.get('/videos');
        if (data.success) {
          const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
          // Filter to only show 'completed' and 'safe' videos for viewers
          const safeVideos = data.videos
            .filter(v => v.status === 'completed' && v.sensitivity === 'safe')
            .map(video => ({
              ...video,
              videoUrl: `${baseUrl}/api/videos/stream/${video._id}`,
            }));
          setVideos(safeVideos);
        }
      } catch (error) {
        console.error('Failed to fetch videos', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handlePlay = (id) => navigate(`/viewer/watch/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center md:-mx-6 md:-mt-6 lg:-mx-8 lg:-mt-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const heroVideo = videos.length > 0 ? videos[0] : null;
  const remainingVideos = videos.length > 1 ? videos.slice(1) : [];

  if (!heroVideo) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center md:-mx-6 md:-mt-6 lg:-mx-8 lg:-mt-8">
        <Video size={64} className="text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-300">No Videos Available</h2>
        <p className="text-gray-500 mt-2">Check back later when your organization uploads content.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white md:-mx-6 md:-mt-6 lg:-mx-8 lg:-mt-8">
      <div className="relative h-[58vh] min-h-[420px] w-full md:h-[70vh] bg-gray-900 border-b border-gray-800">


        <div className="absolute bottom-[12%] left-4 right-4 max-w-2xl xs:left-6 xs:right-6 md:bottom-[20%] md:left-12 md:right-auto z-10">
          <h1 className="mb-4 text-3xl font-bold drop-shadow-lg xs:text-4xl md:text-6xl">{heroVideo.title}</h1>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-medium drop-shadow-md">
            <span className="text-green-500">98% Match</span>
            <span>{new Date(heroVideo.createdAt).getFullYear()}</span>
            <span className="rounded-sm border border-white/40 px-1.5 py-0.5 text-xs text-white/80">HD</span>
          </div>
          <p className="mb-6 max-w-xl line-clamp-3 text-sm text-gray-200 drop-shadow-md xs:text-base md:mb-8 md:text-lg">
            {heroVideo.description || 'No description provided.'}
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <button onClick={() => handlePlay(heroVideo._id)} className="flex items-center gap-2 rounded-md bg-white px-5 py-3 text-base font-bold text-black transition-colors hover:bg-white/80 md:px-8 md:text-lg">
              <Play size={24} className="fill-current" /> Play
            </button>
            <button className="flex items-center gap-2 rounded-md bg-gray-500/50 px-5 py-3 text-base font-bold text-white transition-colors hover:bg-gray-500/70 md:px-8 md:text-lg">
              <Info size={24} /> More Info
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-16 space-y-10 px-4 pb-24 xs:px-6 md:-mt-24 md:space-y-12 md:px-8 lg:px-12">
        {remainingVideos.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-bold text-gray-100">Organization Library</h2>
            <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 snap-x">
              {remainingVideos.map((video) => (
                <div key={video._id} className="snap-start">
                  <VideoCard video={video} onClick={() => handlePlay(video._id)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewerDashboard;
