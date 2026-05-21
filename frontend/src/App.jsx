import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';

// Auth Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';

// Layouts
import ViewerLayout from './layouts/ViewerLayout';
import EditorLayout from './layouts/EditorLayout';
import AdminLayout from './layouts/AdminLayout';

// Viewer Pages
import ViewerDashboard from './pages/viewer/ViewerDashboard';
import MyVideos from './pages/viewer/MyVideos';
import WatchVideo from './pages/viewer/WatchVideo';

// Editor Pages
import EditorDashboard from './pages/editor/EditorDashboard';
import UploadVideo from './pages/editor/UploadVideo';
import Library from './pages/editor/Library';
import VideoAnalytics from './pages/editor/VideoAnalytics';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageTenants from './pages/admin/ManageTenants';
import Moderation from './pages/admin/Moderation';
import SystemSettings from './pages/admin/SystemSettings';
import AdminLogin from './pages/admin/AdminLogin';
import ProcessingDashboard from './pages/admin/ProcessingDashboard';

function App() {
  const { role, isAuthenticated, loading, logout } = useAuth();

  if (loading) return null; // Avoid flickering before Auth state is resolved

  // Helper to get safe dashboard path
  const getDashboardPath = () => {
    if (!role || !['viewer', 'editor', 'admin'].includes(role)) {
      // If auth state is corrupted with invalid role, clear it
      logout();
      return '/login';
    }
    return `/${role}/dashboard`;
  };

  return (
    <SocketProvider>
      <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to={getDashboardPath()} replace />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={getDashboardPath()} replace />} />
        <Route path="/admin/login" element={!isAuthenticated ? <AdminLogin /> : <Navigate to={getDashboardPath()} replace />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={getDashboardPath()} replace />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          
          {/* Viewer Routes */}
          <Route element={<RoleGuard allowedRoles={['viewer', 'admin']} />}>
            <Route path="/viewer" element={<ViewerLayout />}>
              <Route path="dashboard" element={<ViewerDashboard />} />
              <Route path="videos" element={<MyVideos />} />
              <Route path="watch/:id?" element={<WatchVideo />} />
              <Route path="settings" element={<SystemSettings />} />
            </Route>
          </Route>

          {/* Editor Routes */}
          <Route element={<RoleGuard allowedRoles={['editor', 'admin']} />}>
            <Route path="/editor" element={<EditorLayout />}>
              <Route path="dashboard" element={<EditorDashboard />} />
              <Route path="upload" element={<UploadVideo />} />
              <Route path="library" element={<Library />} />
              <Route path="analytics" element={<VideoAnalytics />} />
              <Route path="settings" element={<SystemSettings />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<RoleGuard allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="tenants" element={<ManageTenants />} />
              <Route path="moderation" element={<Moderation />} />
              <Route path="processing" element={<ProcessingDashboard />} />
              <Route path="settings" element={<SystemSettings />} />
            </Route>
          </Route>
        </Route>

        {/* Old routes redirect */}
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/settings" element={<Navigate to="/" replace />} />

        {/* Catch All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
