import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, User, Edit, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loadingRole, setLoadingRole] = useState(null);

  const handleDemoLogin = (role) => {
    setLoadingRole(role);
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
      email: `${role}@streamops.com`,
      role: role,
      permissions: role === 'editor' ? ['upload_video', 'edit_video'] : (role === 'viewer' ? ['watch_video'] : [])
    };
    const mockToken = `mock-jwt-token-for-${role}`;
    
    setTimeout(() => {
      login(mockUser, mockToken);
      navigate(`/${role}/dashboard`);
      setLoadingRole(null);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </button>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-purple-50 blur-3xl opacity-50 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div 
          onClick={() => navigate('/')} 
          className="flex justify-center items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <PlayCircle size={28} />
          </div>
          <span className="font-bold text-3xl tracking-tight text-gray-900">StreamOps</span>
        </div>
        <h2 className="mt-8 text-center text-4xl font-extrabold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-3 text-center text-gray-500 text-lg">
          Select a demo role below to test the RBAC dashboard.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-10 px-6 shadow-xl rounded-3xl sm:px-10 border border-gray-100">
          <div className="space-y-4">
            
            <button
              onClick={() => handleDemoLogin('editor')}
              disabled={!!loadingRole}
              className={`w-full flex items-center justify-center gap-3 font-medium py-3.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 ${
                loadingRole === 'editor' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {loadingRole === 'editor' ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : (
                <Edit size={20} className="text-indigo-600" />
              )}
              Login as Editor
            </button>

            <button
              onClick={() => handleDemoLogin('viewer')}
              disabled={!!loadingRole}
              className={`w-full flex items-center justify-center gap-3 font-medium py-3.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 ${
                loadingRole === 'viewer' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {loadingRole === 'viewer' ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : (
                <User size={20} className="text-indigo-600" />
              )}
              Login as Viewer
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
