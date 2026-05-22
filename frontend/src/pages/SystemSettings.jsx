import React, { useState } from 'react';
import { User, Mail, Calendar, Plus, Copy, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/common/BackButton';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production API Key',
      key: 'sk_prod_************************xyz',
      fullKey: 'sk_prod_abcdef1234567890xyz',
      created: 'May 21, 2026',
    },
  ]);
  const [copiedId, setCopiedId] = useState(null);
  const [newKeyName, setNewKeyName] = useState('');
  const { role } = useAuth();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: AlertCircle },
    { id: 'notifications', label: 'Notifications', icon: Mail },
    { id: 'api_keys', label: 'API Keys', icon: Calendar },
  ];

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const randomSuffix = Math.random().toString(36).substring(2, 5);
    setApiKeys((current) => [
      {
        id: Date.now(),
        name: newKeyName,
        key: `sk_prod_************************${randomSuffix}`,
        fullKey: `sk_prod_${Math.random().toString(36).substring(2, 15)}${randomSuffix}`,
        created: 'Just now',
      },
      ...current,
    ]);
    setNewKeyName('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <BackButton to={`/${role}/dashboard`} label="Back to Dashboard" />
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  activeTab === tab.id ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className={activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          {activeTab === 'profile' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" defaultValue="John Doe" className="border border-gray-300 rounded-lg px-4 py-2.5" />
              <input type="email" defaultValue="john.doe@example.com" className="border border-gray-300 rounded-lg px-4 py-2.5" />
            </div>
          ) : null}

          {activeTab === 'security' ? (
            <div className="space-y-4 max-w-md">
              <input type="password" placeholder="Current Password" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
              <input type="password" placeholder="New Password" className="w-full border border-gray-300 rounded-lg px-4 py-2.5" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium">Update Password</button>
            </div>
          ) : null}

          {activeTab === 'notifications' ? (
            <div className="space-y-4">
              {['Email Notifications', 'SMS Alerts', 'Marketing Updates'].map((label, index) => (
                <label key={label} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                  <input type="checkbox" defaultChecked={index !== 1} className="w-5 h-5 text-indigo-600 border-gray-300 rounded" />
                  <span className="font-medium text-gray-900">{label}</span>
                </label>
              ))}
            </div>
          ) : null}

          {activeTab === 'api_keys' ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="Enter a name for this key" className="flex-1 border border-gray-300 rounded-lg px-4 py-2" />
                <button onClick={handleCreateKey} className="flex justify-center items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium">
                  <Plus size={16} />
                  Create Key
                </button>
              </div>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 border border-gray-200 rounded-xl bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="font-semibold text-gray-900">{apiKey.name}</span>
                        <div className="flex items-center gap-2 text-sm">
                          <code className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-mono text-xs">{apiKey.key}</code>
                          <button onClick={() => { navigator.clipboard.writeText(apiKey.fullKey); setCopiedId(apiKey.id); setTimeout(() => setCopiedId(null), 2000); }} className="text-gray-400 hover:text-indigo-600 p-1">
                            {copiedId === apiKey.id ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                      <button onClick={() => setApiKeys((current) => current.filter((k) => k.id !== apiKey.id))} className="text-gray-400 hover:text-red-500 p-2 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
