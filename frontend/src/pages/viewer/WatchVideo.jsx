import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../../components/video/VideoPlayer';
import { ThumbsUp, ThumbsDown, Share2, Plus, Flag, Eye, Loader2, Lock } from 'lucide-react';
import BackButton from '../../components/common/BackButton';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const MOCK_VIDEO_DETAILS = {
  title: 'Cybersecurity Fundamentals 2026',
  views: '12,402',
  date: 'May 20, 2026',
  description: 'An essential overview of modern cybersecurity threats and defense mechanisms. Mandatory training for all employees in Q2.',
  tags: ['Security', 'Training', 'Mandatory'],
  likes: 423,
};

const MOCK_RELATED = [
  { id: '1', title: 'Phishing Awareness', duration: '15:20', views: '15K', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop' },
  { id: '2', title: 'Data Privacy Policy', duration: '22:10', views: '10K', thumbnail: 'https://images.unsplash.com/photo-1516322073797-1521a00a1843?q=80&w=2940&auto=format&fit=crop' },
  { id: '3', title: 'Password Best Practices', duration: '10:05', views: '20K', thumbnail: 'https://images.unsplash.com/photo-1614064641913-6b7162ff56ce?q=80&w=2940&auto=format&fit=crop' },
];

const WatchVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [theaterMode, setTheaterMode] = useState(false);
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        const endpoint = isAuthenticated ? `/videos/${id}` : `/videos/public/${id}`;
        const response = await api.get(endpoint);
        if (response.data.success) {
          setVideo(response.data.video);
        } else {
          setError('Video not found');
        }
      } catch (err) {
        console.error('Failed to fetch video details:', err);
        setError('Could not load video. It may have been deleted or you do not have permission.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchVideo();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Oops!</h2>
        <p className="mb-6 text-gray-500">{error || 'Video not found.'}</p>
        <button onClick={() => navigate('/viewer/dashboard')} className="rounded-xl bg-indigo-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
  const videoSrc = `${baseUrl}/api/videos/stream/${video._id}`;
  const posterSrc = video.thumbnail || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop';

  return (
    <div className={`min-h-screen transition-all ${theaterMode ? 'bg-[#0f0f0f] px-0 pt-3 md:-mx-6 md:-mt-6 md:px-4 md:pt-4 lg:-mx-8 lg:-mt-8' : 'bg-[#0a0c10] p-4 md:p-8'}`}>
      {!theaterMode ? (
        <div className="mb-4 max-w-7xl mx-auto">
          <BackButton to={isAuthenticated ? "/viewer/dashboard" : "/browse"} label={isAuthenticated ? "Back to Dashboard" : "Back to Browse"} />
        </div>
      ) : null}

      <div className={`flex flex-col gap-5 lg:gap-6 xl:flex-row ${theaterMode ? 'mx-auto max-w-[1800px]' : 'mx-auto max-w-7xl ultrawide:max-w-[1720px]'}`}>
        <div className={`flex-1 ${theaterMode ? 'xl:w-full' : ''}`}>
          <div className={`relative ${theaterMode ? 'w-full' : 'overflow-hidden rounded-xl'}`}>
            {!isAuthenticated ? (
              <div className="relative aspect-video w-full bg-gray-900">
                <img src={posterSrc} alt={video.title} className="h-full w-full object-cover opacity-30 blur-sm" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-white/10 p-4 backdrop-blur-md">
                    <Lock size={32} className="text-white" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-white shadow-black drop-shadow-md">Login to watch full video</h2>
                  <p className="mb-6 max-w-md text-gray-300 shadow-black drop-shadow-md">
                    This training material requires an authenticated session to stream securely.
                  </p>
                  <button 
                    onClick={() => navigate('/login')}
                    className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-700 shadow-lg"
                  >
                    Log In Now
                  </button>
                </div>
              </div>
            ) : (
              <VideoPlayer src={videoSrc} poster={posterSrc} onVideoEnd={() => console.log('Video ended')} />
            )}
          </div>

          <div className="mt-4 px-3 xs:px-4 md:px-0">
            <h1 className={`mb-2 text-xl font-bold xs:text-2xl ${theaterMode ? 'text-white' : 'text-gray-900'}`}>{video.title || video.originalName}</h1>

            <div className="mb-4 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
              <div className={`flex items-center gap-4 text-sm ${theaterMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="flex items-center gap-1"><Eye size={16} /> 0 views</span>
                <span className="hidden xs:inline">•</span>
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <button className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${theaterMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  <ThumbsUp size={18} /> {MOCK_VIDEO_DETAILS.likes}
                </button>
                <button className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${theaterMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  <ThumbsDown size={18} />
                </button>
                <button className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${theaterMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  <Share2 size={18} /> Share
                </button>
                <button
                  onClick={() => setTheaterMode(!theaterMode)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${theaterMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                >
                  <Plus size={18} /> Theater
                </button>
                <button className="ml-auto flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                  <Flag size={18} />
                </button>
              </div>
            </div>

            <div className={`rounded-xl p-4 ${theaterMode ? 'bg-white/5 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
              <div className="mb-3 flex flex-wrap gap-2">
                {video.category && (
                  <span className="cursor-pointer text-sm font-medium text-indigo-500 hover:text-indigo-600">#{video.category}</span>
                )}
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed md:text-base">{video.description || 'No description provided.'}</p>
            </div>
          </div>
        </div>

        <div className={`w-full shrink-0 xl:w-96 ${theaterMode ? 'px-3 xs:px-4 md:px-4' : ''}`}>
          <h3 className={`mb-4 text-lg font-bold ${theaterMode ? 'text-white' : 'text-gray-900'}`}>Related Videos</h3>
          <div className="flex flex-col gap-3">
            {MOCK_RELATED.map((video) => (
              <div
                key={video.id}
                onClick={() => navigate(`/viewer/watch/${video.id}`)}
                className={`group flex cursor-pointer gap-3 rounded-lg p-2 transition-colors ${theaterMode ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`}
              >
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md bg-gray-200 xs:w-36 md:w-40">
                  <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[10px] font-medium text-white">{video.duration}</span>
                </div>
                <div className="flex flex-col py-1">
                  <h4 className={`mb-1 line-clamp-2 text-sm font-semibold leading-tight transition-colors group-hover:text-indigo-500 ${theaterMode ? 'text-gray-100' : 'text-gray-900'}`}>{video.title}</h4>
                  <span className={`text-xs ${theaterMode ? 'text-gray-400' : 'text-gray-500'}`}>{video.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
