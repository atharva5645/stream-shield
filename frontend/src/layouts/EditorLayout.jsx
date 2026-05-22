import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Home, UploadCloud, Film, BarChart2, Building2, Users, MailPlus, SlidersHorizontal } from 'lucide-react';

const EditorLayout = () => {
  const navigationParams = [
    { name: 'Dashboard', path: '/editor/dashboard', icon: Home },
    { name: 'Tenant Dashboard', path: '/editor/tenant', icon: Building2 },
    { name: 'Team Members', path: '/editor/team', icon: Users },
    { name: 'Invite Members', path: '/editor/invites', icon: MailPlus },
    { name: 'Workspace Settings', path: '/editor/workspace-settings', icon: SlidersHorizontal },
    { name: 'Upload Video', path: '/editor/upload', icon: UploadCloud },
    { name: 'Library', path: '/editor/library', icon: Film },
    { name: 'Analytics', path: '/editor/analytics', icon: BarChart2 }
  ];

  return <DashboardLayout navigationParams={navigationParams} />;
};

export default EditorLayout;
