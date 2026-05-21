import React from 'react';
import PagePlaceholder from '../../components/common/PagePlaceholder';
import { ShieldAlert } from 'lucide-react';

const Moderation = () => (
  <PagePlaceholder 
    title="Moderation Panel" 
    description="Review reported content, manage takedown requests, and enforce community guidelines." 
    icon={ShieldAlert}
    backTo="/admin/dashboard"
    backLabel="Back to Dashboard"
  />
);

export default Moderation;
