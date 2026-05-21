import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Home, Users, Building, ShieldAlert, Settings, Activity } from 'lucide-react';

const AdminLayout = () => {
  const navigationParams = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Video Processing', path: '/admin/processing', icon: Activity },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
    { name: 'Manage Tenants', path: '/admin/tenants', icon: Building },
    { name: 'Moderation', path: '/admin/moderation', icon: ShieldAlert },
    { name: 'System Settings', path: '/admin/settings', icon: Settings }
  ];

  return <DashboardLayout navigationParams={navigationParams} />;
};

export default AdminLayout;
