import React from 'react';
import { Play, Clock, TrendingUp, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_HERO_VIDEO = {
  id: 'hero-1',
  title: 'The Future of AI Streaming',
  description: 'Explore how artificial intelligence is transforming the way we deliver and consume video content globally.',
  thumbnail: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop',
  duration: '45:20',
  match: '98% Match',
  year: '2026',
  rating: 'TV-MA'
};

const MOCK_ROWS = [
  {
    title: 'Continue Watching',
    videos: [
      { id: '1', title: 'Cybersecurity Fundamentals', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop', progress: 45, duration: '1:20:00' },
      { id: '2', title: 'React Performance Tuning', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2940&auto=format&fit=crop', progress: 80, duration: '45:00' },
    ]
  },
  {
    title: 'Assigned For You',
    videos: [
      { id: '3', title: 'Q3 Company All Hands', thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop', isNew: true },
      { id: '4', title: 'Onboarding Part 2', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop' },
      { id: '5', title: 'Compliance Training 2026', thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2940&auto=format&fit=crop' },
    ]
  }
];

const VideoCard = ({ video, onClick }) => (
  <div 
    onClick={onClick}
    className="group relative flex-none w-64 md:w-80 aspect-video rounded-md overflow-hidden bg-gray-800 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 shadow-lg"
  >
    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
      <h4 className="text-white font-bold text-sm line-clamp-1 mb-2">{video.title}</h4>
      <div className="flex items-center gap-3">
        <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors">
          <Play size={14} className="fill-current" />
        </button>
        {video.progress !== undefined && (
          <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 rounded-full" style={{ width: `${video.progress}%` }}></div>
          </div>
        )}
      </div>
    </div>

    {video.isNew && (
      <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
        New
      </span>
    )}
  </div>
);

const ViewerDashboard = () => {
  const navigate = useNavigate();

  const handlePlay = (id) => {
    navigate(`/viewer/watch/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white -mt-8 -mx-8">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={MOCK_HERO_VIDEO.thumbnail} 
            alt={MOCK_HERO_VIDEO.title}
            className="w-full h-full object-cover"
          />
          {/* Gradients for cinematic fade into background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
        </div>

        <div className="absolute bottom-[20%] left-12 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{MOCK_HERO_VIDEO.title}</h1>
          <div className="flex items-center gap-4 text-sm font-medium mb-4 drop-shadow-md">
            <span className="text-green-500">{MOCK_HERO_VIDEO.match}</span>
            <span>{MOCK_HERO_VIDEO.year}</span>
            <span className="border border-white/40 px-1.5 py-0.5 rounded-sm text-xs text-white/80">{MOCK_HERO_VIDEO.rating}</span>
            <span>{MOCK_HERO_VIDEO.duration}</span>
          </div>
          <p className="text-lg text-gray-200 mb-8 line-clamp-3 drop-shadow-md max-w-xl">
            {MOCK_HERO_VIDEO.description}
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handlePlay(MOCK_HERO_VIDEO.id)}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-bold text-lg hover:bg-white/80 transition-colors"
            >
              <Play size={24} className="fill-current" /> Play
            </button>
            <button className="flex items-center gap-2 bg-gray-500/50 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-500/70 transition-colors backdrop-blur-sm">
              <Info size={24} /> More Info
            </button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-10 pb-20 px-12 -mt-24 space-y-12">
        {MOCK_ROWS.map((row, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold text-gray-100 mb-4">{row.title}</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {row.videos.map(video => (
                <div key={video.id} className="snap-start">
                  <VideoCard video={video} onClick={() => handlePlay(video.id)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewerDashboard;
