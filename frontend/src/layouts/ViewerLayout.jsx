import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Home, Video, PlaySquare } from 'lucide-react';

const ViewerLayout = () => {
  const navigationParams = [
    { name: 'Dashboard', path: '/viewer/dashboard', icon: Home },
    { name: 'My Videos', path: '/viewer/videos', icon: Video },
    { name: 'Watch', path: '/viewer/watch', icon: PlaySquare }
  ];

  return <DashboardLayout navigationParams={navigationParams} />;
};

export default ViewerLayout;
