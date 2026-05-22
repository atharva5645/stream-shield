import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

const createNotificationId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const push = useCallback(({ title, message, type = 'info', sticky = false }) => {
    const id = createNotificationId();
    const createdAt = new Date().toISOString();
    setNotifications((current) => [{ id, title, message, type, sticky, createdAt, read: false }, ...current].slice(0, 30));
    if (!sticky) {
      window.setTimeout(() => {
        setNotifications((current) => current.filter((item) => item.id !== id));
      }, 4500);
    }
    return id;
  }, []);

  const remove = useCallback((id) => setNotifications((current) => current.filter((item) => item.id !== id)), []);
  const markAllRead = useCallback(() => setNotifications((current) => current.map((item) => ({ ...item, read: true }))), []);
  const clearAll = useCallback(() => setNotifications([]), []);
  const notifySuccess = useCallback((title, message, sticky) => push({ title, message, type: 'success', sticky }), [push]);
  const notifyError = useCallback((title, message, sticky = true) => push({ title, message, type: 'error', sticky }), [push]);
  const notifyWarning = useCallback((title, message, sticky = true) => push({ title, message, type: 'warning', sticky }), [push]);
  const notifyInfo = useCallback((title, message, sticky) => push({ title, message, type: 'info', sticky }), [push]);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount: notifications.filter((item) => !item.read).length,
      notifySuccess,
      notifyError,
      notifyWarning,
      notifyInfo,
      remove,
      markAllRead,
      clearAll,
    }),
    [clearAll, markAllRead, notifications, notifyError, notifyInfo, notifySuccess, notifyWarning, remove],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
