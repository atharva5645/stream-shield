import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleGuard = ({ allowedRoles }) => {
  const { role, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0B1120]"><div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div></div>;
  }

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default RoleGuard;
