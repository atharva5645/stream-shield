import React, { useState } from 'react';
import { User, Mail, Calendar, Plus, Copy, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/common/BackButton';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production API Key',
      key: 'sk_prod_************************xyz',
      fullKey: 'sk_prod_abcdef1234567890xyz',
      lastUsed: '5/21/2026'
    }
  ]);
  const [copiedId, setCopiedId] = useState(null);
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: AlertCircle },
    { id: 'notifications', label: 'Notifications', icon: Mail },
    { id: 'api_keys', label: 'API Keys', icon: Calendar }
  ];

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const randomSuffix = Math.random().toString(36).substring(2, 5);
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      key: `sk_prod_************************${randomSuffix}`,
      fullKey: `sk_prod_${Math.random().toString(36).substring(2, 15)}${randomSuffix}`,
      lastUsed: 'Never'
    };
    setApiKeys([newKey, ...apiKeys]);
    setIsCreatingKey(false);
    setNewKeyName('');
  };

  const handleDeleteKey = (id) => setApiKeys(apiKeys.filter(k => k.id !== id));
  
  const handleCopy = (id, fullKey) => {
    navigator.clipboard.writeText(fullKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const { role } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      <BackButton to={`/${role}/dashboard`} label="Back to Dashboard" />
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                  ${activeTab === tab.id 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Icon size={18} className={activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm">
          {activeTab === 'profile' && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><User size={16} /> Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Mail size={16} /> Email Address</label>
                  <input type="email" defaultValue="john.doe@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api_keys' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">API Credentials</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your API keys for programmatic access.</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Generate New Key */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Generate New Key</h3>
                    <p className="text-sm text-gray-500">Create a new API key with your current permissions.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      placeholder="Enter a name for this key (e.g., Zapier Integration)" 
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <button 
                      onClick={handleCreateKey}
                      disabled={isCreatingKey || !newKeyName.trim()}
                      className="flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={16} />
                      {isCreatingKey ? 'Generating...' : 'Create Key'}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="p-4 border border-gray-200 rounded-xl bg-white hover:border-indigo-300 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{apiKey.name}</span>
                            {apiKey.id === apiKeys[0].id && (
                              <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Newest</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <code className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-mono text-xs">{apiKey.key}</code>
                            <button 
                              onClick={() => handleCopy(apiKey.id, apiKey.fullKey)}
                              className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
                              title="Copy full key"
                            >
                              {copiedId === apiKey.id ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-gray-500">
                            Created <span className="text-gray-900 font-medium">{apiKey.created}</span>
                          </div>
                          <button 
                            onClick={() => handleDeleteKey(apiKey.id)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <input type="password" placeholder="Current Password" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
                    <input type="password" placeholder="New Password" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Update Password</button>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account.</p>
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Notification Preferences</h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                  <div>
                    <div className="font-medium text-gray-900">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive daily summaries and critical alerts.</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                  <div>
                    <div className="font-medium text-gray-900">SMS Alerts</div>
                    <div className="text-sm text-gray-500">Get text messages for important security events.</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                  <div>
                    <div className="font-medium text-gray-900">Marketing Updates</div>
                    <div className="text-sm text-gray-500">Receive news about upcoming features.</div>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
