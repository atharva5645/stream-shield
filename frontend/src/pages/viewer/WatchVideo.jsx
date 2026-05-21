import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../../components/video/VideoPlayer';
import { ThumbsUp, ThumbsDown, Share2, Plus, Flag, Eye } from 'lucide-react';
import BackButton from '../../components/common/BackButton';

const MOCK_VIDEO_DETAILS = {
  title: 'Cybersecurity Fundamentals 2026',
  views: '12,402',
  date: 'May 20, 2026',
  description: 'An essential overview of modern cybersecurity threats and defense mechanisms. Mandatory training for all employees in Q2.',
  tags: ['Security', 'Training', 'Mandatory'],
  likes: 423
};

const MOCK_RELATED = [
  { id: '1', title: 'Phishing Awareness', duration: '15:20', views: '15K', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop' },
  { id: '2', title: 'Data Privacy Policy', duration: '22:10', views: '10K', thumbnail: 'https://images.unsplash.com/photo-1516322073797-1521a00a1843?q=80&w=2940&auto=format&fit=crop' },
  { id: '3', title: 'Password Best Practices', duration: '10:05', views: '20K', thumbnail: 'https://images.unsplash.com/photo-1614064641913-6b7162ff56ce?q=80&w=2940&auto=format&fit=crop' },
];

const WatchVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [theaterMode, setTheaterMode] = useState(false);

  // Using the sample public video for the mock
  const videoSrc = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const posterSrc = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop';

  return (
    <div className={`min-h-screen transition-all ${theaterMode ? 'bg-[#0f0f0f] -mx-8 -mt-8 pt-4 px-4' : ''}`}>
      {!theaterMode && (
        <div className="mb-4">
          <BackButton to="/viewer/dashboard" label="Back to Dashboard" />
        </div>
      )}

      <div className={`flex flex-col xl:flex-row gap-6 ${theaterMode ? 'max-w-[1800px] mx-auto' : 'max-w-7xl mx-auto'}`}>
        
        {/* Main Player Area */}
        <div className={`flex-1 ${theaterMode ? 'xl:w-full' : ''}`}>
          <div className={`${theaterMode ? 'w-full' : 'rounded-xl overflow-hidden'}`}>
            <VideoPlayer 
              src={videoSrc}
              poster={posterSrc}
              onVideoEnd={() => console.log('Video ended')}
            />
          </div>

          {/* Metadata Section */}
          <div className="mt-4 p-4 md:p-0">
            <h1 className={`text-2xl font-bold mb-2 ${theaterMode ? 'text-white' : 'text-gray-900'}`}>
              {MOCK_VIDEO_DETAILS.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-4">
              <div className={`flex items-center gap-4 text-sm ${theaterMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="flex items-center gap-1"><Eye size={16} /> {MOCK_VIDEO_DETAILS.views} views</span>
                <span>•</span>
                <span>{MOCK_VIDEO_DETAILS.date}</span>
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${theaterMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  <ThumbsUp size={18} /> {MOCK_VIDEO_DETAILS.likes}
                </button>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${theaterMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  <ThumbsDown size={18} />
                </button>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${theaterMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  <Share2 size={18} /> Share
                </button>
                <button 
                  onClick={() => setTheaterMode(!theaterMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${theaterMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                >
                  <Plus size={18} /> Theater
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full font-medium hover:bg-red-50 text-red-600 transition-colors ml-auto">
                  <Flag size={18} />
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${theaterMode ? 'bg-white/5 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
              <div className="flex gap-2 mb-3">
                {MOCK_VIDEO_DETAILS.tags.map(tag => (
                  <span key={tag} className="text-sm font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer">#{tag}</span>
                ))}
              </div>
              <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {MOCK_VIDEO_DETAILS.description}
              </p>
            </div>
          </div>
        </div>

        {/* Related Sidebar */}
        <div className={`w-full xl:w-96 shrink-0 ${theaterMode ? 'px-4' : ''}`}>
          <h3 className={`font-bold text-lg mb-4 ${theaterMode ? 'text-white' : 'text-gray-900'}`}>Related Videos</h3>
          <div className="flex flex-col gap-3">
            {MOCK_RELATED.map(video => (
              <div 
                key={video.id}
                onClick={() => navigate(`/viewer/watch/${video.id}`)}
                className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-colors group ${theaterMode ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`}
              >
                <div className="relative w-40 shrink-0 aspect-video rounded-md overflow-hidden bg-gray-200">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="flex flex-col py-1">
                  <h4 className={`font-semibold text-sm line-clamp-2 leading-tight mb-1 group-hover:text-indigo-500 transition-colors ${theaterMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {video.title}
                  </h4>
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
