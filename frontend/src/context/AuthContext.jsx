import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null); // 'viewer', 'editor', 'admin'
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken && storedUser !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
        setRole(parsedUser.role);
        setPermissions(parsedUser.permissions || []);
      }
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      // Clear invalid state
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setRole(userData.role);
    setPermissions(userData.permissions || []);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    setPermissions([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const hasPermission = (permission) => {
    if (role === 'admin') return true; // Admins have all permissions
    return permissions.includes(permission);
  };

  const value = {
    user,
    token,
    role,
    permissions,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    hasPermission
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
