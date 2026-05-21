import React from 'react';
import PagePlaceholder from '../../components/common/PagePlaceholder';
import { Users } from 'lucide-react';

const ManageUsers = () => (
  <PagePlaceholder 
    title="Manage Users" 
    description="Create, edit, and revoke user access. Assign roles and manage permissions." 
    icon={Users}
    backTo="/admin/dashboard"
    backLabel="Back to Dashboard"
  />
);

export default ManageUsers;
