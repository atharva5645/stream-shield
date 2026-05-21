import React from 'react';
import PagePlaceholder from '../../components/common/PagePlaceholder';
import { Home } from 'lucide-react';

const AdminDashboard = () => (
  <PagePlaceholder 
    title="Admin Dashboard" 
    description="System-wide overview, active users, and recent platform alerts." 
    icon={Home} 
    showBack={false}
  />
);

export default AdminDashboard;
