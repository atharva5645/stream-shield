import React from 'react';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_HERO_VIDEO = {
  id: 'hero-1',
  title: 'The Future of AI Streaming',
  description: 'Explore how artificial intelligence is transforming the way we deliver and consume video content globally.',
  thumbnail: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop',
  duration: '45:20',
  match: '98% Match',
  year: '2026',
  rating: 'TV-MA',
};

const MOCK_ROWS = [
  {
    title: 'Continue Watching',
    videos: [
      { id: '1', title: 'Cybersecurity Fundamentals', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop', progress: 45, duration: '1:20:00' },
      { id: '2', title: 'React Performance Tuning', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2940&auto=format&fit=crop', progress: 80, duration: '45:00' },
    ],
  },
  {
    title: 'Assigned For You',
    videos: [
      { id: '3', title: 'Q3 Company All Hands', thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop', isNew: true },
      { id: '4', title: 'Onboarding Part 2', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop' },
      { id: '5', title: 'Compliance Training 2026', thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2940&auto=format&fit=crop' },
    ],
  },
];

const VideoCard = ({ video, onClick }) => (
  <div onClick={onClick} className="group relative flex-none w-52 xs:w-60 md:w-72 xl:w-80 aspect-video cursor-pointer overflow-hidden rounded-md bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10">
    <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />

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
  const handlePlay = (id) => navigate(`/viewer/watch/${id}`);

  return (
    <div className="min-h-screen bg-[#141414] text-white md:-mx-6 md:-mt-6 lg:-mx-8 lg:-mt-8">
      <div className="relative h-[58vh] min-h-[420px] w-full md:h-[70vh]">
        <div className="absolute inset-0">
          <img src={MOCK_HERO_VIDEO.thumbnail} alt={MOCK_HERO_VIDEO.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-[12%] left-4 right-4 max-w-2xl xs:left-6 xs:right-6 md:bottom-[20%] md:left-12 md:right-auto">
          <h1 className="mb-4 text-3xl font-bold drop-shadow-lg xs:text-4xl md:text-6xl">{MOCK_HERO_VIDEO.title}</h1>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-medium drop-shadow-md">
            <span className="text-green-500">{MOCK_HERO_VIDEO.match}</span>
            <span>{MOCK_HERO_VIDEO.year}</span>
            <span className="rounded-sm border border-white/40 px-1.5 py-0.5 text-xs text-white/80">{MOCK_HERO_VIDEO.rating}</span>
            <span>{MOCK_HERO_VIDEO.duration}</span>
          </div>
          <p className="mb-6 max-w-xl line-clamp-3 text-sm text-gray-200 drop-shadow-md xs:text-base md:mb-8 md:text-lg">{MOCK_HERO_VIDEO.description}</p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <button onClick={() => handlePlay(MOCK_HERO_VIDEO.id)} className="flex items-center gap-2 rounded-md bg-white px-5 py-3 text-base font-bold text-black transition-colors hover:bg-white/80 md:px-8 md:text-lg">
              <Play size={24} className="fill-current" /> Play
            </button>
            <button className="flex items-center gap-2 rounded-md bg-gray-500/50 px-5 py-3 text-base font-bold text-white transition-colors hover:bg-gray-500/70 md:px-8 md:text-lg">
              <Info size={24} /> More Info
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-16 space-y-10 px-4 pb-24 xs:px-6 md:-mt-24 md:space-y-12 md:px-8 lg:px-12">
        {MOCK_ROWS.map((row, index) => (
          <div key={index}>
            <h2 className="mb-4 text-xl font-bold text-gray-100">{row.title}</h2>
            <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 snap-x">
              {row.videos.map((video) => (
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
