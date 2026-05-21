import React from 'react';
import PagePlaceholder from '../../components/common/PagePlaceholder';
import { Home } from 'lucide-react';

const EditorDashboard = () => (
  <PagePlaceholder 
    title="Editor Dashboard" 
    description="Overview of your uploaded videos, processing status, and channel metrics." 
    icon={Home} 
    showBack={false}
  />
);

export default EditorDashboard;
