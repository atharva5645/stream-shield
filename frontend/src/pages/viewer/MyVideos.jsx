import React, { memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Play, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

const MOCK_LIBRARY = [
  { id: '1', title: 'Cybersecurity Fundamentals 2026', status: 'Safe', date: '2026-05-20', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop', duration: '1:20:00' },
  { id: '2', title: 'React Performance Tuning', status: 'Safe', date: '2026-05-18', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2940&auto=format&fit=crop', duration: '45:00' },
  { id: '3', title: 'Q3 Company All Hands', status: 'Safe', date: '2026-05-15', thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop', duration: '2:15:00' },
  { id: '4', title: 'Onboarding Part 2', status: 'Processing', date: '2026-05-21', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop', duration: '30:00' },
  { id: '5', title: 'Compliance Training 2026', status: 'Flagged', date: '2026-05-10', thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2940&auto=format&fit=crop', duration: '1:10:00' },
];

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Safe':
      return <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={12} /> {status}</span>;
    case 'Flagged':
      return <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1"><AlertTriangle size={12} /> {status}</span>;
    case 'Processing':
      return <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1"><Clock size={12} /> {status}</span>;
    default:
      return null;
  }
};

const VideoRow = memo(({ video, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(video.id)}
    className="group flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
  >
    <div className="relative h-20 w-36 overflow-hidden rounded-lg bg-gray-100">
      <img src={video.thumbnail} alt={video.title} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100" />
      <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">{video.duration}</span>
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="truncate font-semibold text-gray-900 group-hover:text-indigo-600">{video.title}</h3>
      <p className="mt-1 text-xs text-gray-500">Added {new Date(video.date).toLocaleDateString()}</p>
    </div>
    <StatusBadge status={video.status} />
    <div className="rounded-full bg-indigo-100 p-2 text-indigo-700"><Play size={16} className="fill-current" /></div>
  </button>
));

const MyVideos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredVideos = useMemo(() => MOCK_LIBRARY.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || video.status === activeFilter;
    return matchesSearch && matchesFilter;
  }), [activeFilter, searchTerm]);

  return (
    <div className="mx-auto max-w-7xl pb-12">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">My Library</h1>
          <p className="text-gray-500">Access and watch videos assigned to your account.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search library..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Safe', 'Processing', 'Flagged'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === filter ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="max-h-[70vh] space-y-3 overflow-y-auto p-1" role="list" aria-label="Video library results">
        {filteredVideos.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-900">No videos found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredVideos.map((video) => <VideoRow key={video.id} video={video} onOpen={(id) => navigate(`/viewer/watch/${id}`)} />)
        )}
      </div>
    </div>
  );
};

export default MyVideos;
