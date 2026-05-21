import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlayCircle, ArrowLeft, User, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleMockRegister = (e) => {
    e.preventDefault();
    // Simulate API response for a default registration based on selectedRole
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New User',
      email: 'new@streamops.com',
      role: selectedRole,
      permissions: selectedRole === 'editor' ? ['upload_video', 'edit_video'] : ['watch_video']
    };
    const mockToken = `mock-jwt-token-for-${selectedRole}`;
    login(mockUser, mockToken);
    navigate(`/${selectedRole}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      
      {/* Back Button */}
      <button 
        onClick={() => selectedRole ? setSelectedRole(null) : navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors group z-10"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">{selectedRole ? 'Back to roles' : 'Back to Home'}</span>
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
          Create account
        </h2>
        <p className="mt-3 text-center text-gray-500 text-lg">
          {selectedRole ? `Registering as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` : 'Please select a demo role to test the RBAC dashboard.'}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-10 px-6 shadow-xl rounded-3xl sm:px-10 border border-gray-100">
          
          {!selectedRole ? (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedRole('editor')}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-3.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <Edit size={20} className="text-indigo-600" />
                Register as Editor
              </button>

              <button
                onClick={() => setSelectedRole('viewer')}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-3.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <User size={20} className="text-indigo-600" />
                Register as Viewer
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleMockRegister}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded bg-white"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]"
              >
                Create Account ({selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Demo)
              </button>
            </div>
          </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
