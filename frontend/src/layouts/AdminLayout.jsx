import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Home, Users, Building, ShieldAlert, Settings, Activity, BarChart3, Video } from 'lucide-react';

const AdminLayout = () => {
  const navigationParams = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
    { name: 'Tenants', path: '/admin/tenants', icon: Building },
    { name: 'Video Library', path: '/admin/videos', icon: Video },
    { name: 'Moderation', path: '/admin/moderation', icon: ShieldAlert },
    { name: 'Processing Logs', path: '/admin/processing', icon: Activity },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  return <DashboardLayout navigationParams={navigationParams} />;
};

export default AdminLayout;
