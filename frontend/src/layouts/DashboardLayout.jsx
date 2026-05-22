import React, { useMemo, useState } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { PlayCircle, LogOut, Menu, Settings as SettingsIcon, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TenantSwitcher from '../components/tenant/TenantSwitcher';
import NotificationCenter from '../components/feedback/NotificationCenter';
import BottomNavigation from '../components/navigation/BottomNavigation';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

const DashboardLayout = ({ navigationParams }) => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const shortcuts = useMemo(() => [{ combo: 'ctrl+b', handler: () => setSidebarOpen((prev) => !prev) }], []);
  useKeyboardShortcuts(shortcuts);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {sidebarOpen ? (
        <div className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm transition-opacity lg:hidden" onClick={() => setSidebarOpen(false)} />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-in-out lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-16 items-center border-b border-gray-100 px-6 shrink-0">
          <NavLink to={`/${role}/dashboard`} onClick={() => setSidebarOpen(false)} className="relative z-10 flex items-center gap-2">
            <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
              <PlayCircle size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">StreamOps</span>
          </NavLink>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-200">
          {navigationParams.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `relative z-10 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive ? 'border border-indigo-100 bg-indigo-50 font-medium text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-gray-500'} />
                    {item.name}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="border-t border-gray-100 p-4 shrink-0">
          <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition-all hover:bg-red-50 hover:text-red-600">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 sm:px-6 lg:px-8 backdrop-blur-md shrink-0">
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-ml-2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden">
              <Menu size={24} />
            </button>
            <div className="min-w-0">
              <TenantSwitcher />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
            <NotificationCenter />
            <button type="button" onClick={() => navigate(`/${role}/settings`)} className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-indigo-600">
              <SettingsIcon size={20} />
            </button>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-3 md:gap-3 md:pl-4 lg:pl-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-indigo-200 bg-indigo-100 font-bold text-indigo-700 shadow-sm">
                {user?.name?.charAt(0) || <User size={16} />}
              </div>
              <div className="hidden sm:block">
                <div className="mb-1 text-sm font-bold leading-none text-gray-900">{user?.name || 'User'}</div>
                <div className="text-xs font-semibold capitalize leading-none text-indigo-600">{role}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 pb-24 flex-1 overflow-y-auto py-4 md:py-6 lg:pb-8 lg:pt-8">
          <div className="mx-auto w-full max-w-7xl ultrawide:max-w-[1720px]">
            <Outlet />
          </div>
        </main>
      </div>

      <BottomNavigation navigationParams={navigationParams} />
    </div>
  );
};

export default DashboardLayout;
