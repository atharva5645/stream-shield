import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Play, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import PagePlaceholder from '../../components/common/PagePlaceholder';

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

const MyVideos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredVideos = MOCK_LIBRARY.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || video.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Library</h1>
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
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Safe', 'Processing', 'Flagged'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredVideos.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map(video => (
            <div 
              key={video.id}
              onClick={() => navigate(`/viewer/watch/${video.id}`)}
              className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer"
            >
              <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
                    <Play size={24} className="fill-current" />
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <StatusBadge status={video.status} />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {video.title}
                </h3>
                <span className="text-xs text-gray-500">Added {new Date(video.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVideos;
