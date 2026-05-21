import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Home, UploadCloud, Film, BarChart2 } from 'lucide-react';

const EditorLayout = () => {
  const navigationParams = [
    { name: 'Dashboard', path: '/editor/dashboard', icon: Home },
    { name: 'Upload Video', path: '/editor/upload', icon: UploadCloud },
    { name: 'Library', path: '/editor/library', icon: Film },
    { name: 'Analytics', path: '/editor/analytics', icon: BarChart2 }
  ];

  return <DashboardLayout navigationParams={navigationParams} />;
};

export default EditorLayout;
