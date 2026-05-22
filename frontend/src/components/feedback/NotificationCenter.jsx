import React, { useState } from 'react';
import { Bell, Trash2, X } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const NotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, remove, markAllRead, clearAll } = useNotifications();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);
          markAllRead();
        }}
        className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-indigo-600"
      >
        <Bell size={20} />
        {unreadCount ? <span className="absolute -right-0.5 -top-0.5 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{unreadCount}</span> : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-12 z-50 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <h3 className="font-semibold text-slate-900">Notifications</h3>
              <p className="text-xs text-slate-500">{notifications.length} recent updates</p>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={clearAll} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <Trash2 size={15} />
              </button>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <X size={15} />
              </button>
            </div>
          </div>
          <div className="max-h-[420px] overflow-y-auto p-3">
            {notifications.length ? (
              <div className="space-y-2">
                {notifications.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                        <p className="mt-1 text-sm text-slate-500">{item.message}</p>
                      </div>
                      <button type="button" onClick={() => remove(item.id)} className="rounded-full p-1 text-slate-400 hover:bg-white hover:text-slate-600">
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">No notifications yet.</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationCenter;
