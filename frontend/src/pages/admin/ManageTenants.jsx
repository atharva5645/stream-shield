import React from 'react';
import PagePlaceholder from '../../components/common/PagePlaceholder';
import { Building } from 'lucide-react';

const ManageTenants = () => (
  <PagePlaceholder 
    title="Manage Tenants" 
    description="Configure multi-tenant settings, monitor tenant resource usage and billing." 
    icon={Building} 
    backTo="/admin/dashboard"
    backLabel="Back to Dashboard"
  />
);

export default ManageTenants;
