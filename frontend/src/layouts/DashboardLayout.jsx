import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  PlayCircle, LogOut, Menu, X, Settings as SettingsIcon, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ navigationParams }) => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 shadow-sm
        flex flex-col transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/${role}/dashboard`)}>
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <PlayCircle size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">StreamOps</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
          {navigationParams.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-600 font-medium border border-indigo-100' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-gray-500'} />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <button 
              onClick={() => navigate(`/${role}/settings`)}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition-colors"
            >
              <SettingsIcon size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 lg:pl-6 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 shadow-sm">
                {user?.name?.charAt(0) || <User size={16} />}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900 leading-none mb-1">{user?.name || 'User'}</div>
                <div className="text-xs text-indigo-600 font-semibold capitalize leading-none">{role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
