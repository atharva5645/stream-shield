export const adminStats = [
  { id: 'uploads', label: 'Uploads Today', value: '184', change: '+12.4%', tone: 'sky' },
  { id: 'storage', label: 'Storage Usage', value: '18.6 TB', change: '+1.1 TB', tone: 'emerald' },
  { id: 'streams', label: 'Active Streams', value: '642', change: '+8.2%', tone: 'violet' },
  { id: 'flagged', label: 'Flagged Ratio', value: '3.8%', change: '-0.6%', tone: 'rose' },
];

export const uploadsTrend = [
  { label: 'Mon', value: 96 },
  { label: 'Tue', value: 122 },
  { label: 'Wed', value: 108 },
  { label: 'Thu', value: 160 },
  { label: 'Fri', value: 184 },
  { label: 'Sat', value: 142 },
  { label: 'Sun', value: 118 },
];

export const storageByTenant = [
  { label: 'Northstar Media', value: 42 },
  { label: 'Helio Learning', value: 26 },
  { label: 'Apex Sports', value: 18 },
  { label: 'CivicCast', value: 14 },
];

export const userActivitySeries = [
  { label: '00', value: 120 },
  { label: '04', value: 80 },
  { label: '08', value: 210 },
  { label: '12', value: 320 },
  { label: '16', value: 280 },
  { label: '20', value: 190 },
];

export const activityFeed = [
  { id: 'a1', type: 'success', title: 'Video approved', detail: 'Town Hall Recap was approved by moderation.', time: '3m ago' },
  { id: 'a2', type: 'warning', title: 'User suspended', detail: 'Editor access revoked for repeated policy violations.', time: '18m ago' },
  { id: 'a3', type: 'info', title: 'Tenant created', detail: 'North Ridge Studio was provisioned with 12 seats.', time: '35m ago' },
  { id: 'a4', type: 'danger', title: 'High sensitivity upload', detail: 'A flagged upload reached a 92 sensitivity score.', time: '1h ago' },
];

export const users = [
  { id: 'u-101', name: 'Ava Chen', email: 'ava@northstar.io', role: 'Admin', status: 'Active', tenant: 'Northstar Media', lastActive: '2 min ago' },
  { id: 'u-102', name: 'Marcus Hale', email: 'marcus@helio.edu', role: 'Editor', status: 'Active', tenant: 'Helio Learning', lastActive: '14 min ago' },
  { id: 'u-103', name: 'Priya Nair', email: 'priya@civiccast.com', role: 'Moderator', status: 'Suspended', tenant: 'CivicCast', lastActive: '2 days ago' },
  { id: 'u-104', name: 'Lena Ortiz', email: 'lena@apexsports.tv', role: 'Viewer', status: 'Active', tenant: 'Apex Sports', lastActive: '1 hour ago' },
];

export const tenants = [
  { id: 't-201', name: 'Northstar Media', plan: 'Enterprise', users: 48, storage: '8.2 TB', uploads: 420, health: 'Healthy' },
  { id: 't-202', name: 'Helio Learning', plan: 'Growth', users: 31, storage: '4.1 TB', uploads: 210, health: 'Healthy' },
  { id: 't-203', name: 'Apex Sports', plan: 'Enterprise', users: 56, storage: '5.0 TB', uploads: 332, health: 'Attention' },
  { id: 't-204', name: 'CivicCast', plan: 'Starter', users: 12, storage: '1.3 TB', uploads: 84, health: 'Healthy' },
];

export const moderationQueue = [
  { id: 'm-301', title: 'Locker Room Interview', creator: 'Apex Sports', score: 92, reason: 'Potential explicit language', status: 'Needs review' },
  { id: 'm-302', title: 'Student Workshop Recap', creator: 'Helio Learning', score: 36, reason: 'Mild policy keywords', status: 'Approved' },
  { id: 'm-303', title: 'City Council Stream', creator: 'CivicCast', score: 71, reason: 'Graphic protest footage', status: 'Needs review' },
  { id: 'm-304', title: 'Product Launch Reel', creator: 'Northstar Media', score: 18, reason: 'Auto-cleared', status: 'Rejected' },
];

export const analyticsCards = [
  { id: 'uploads-day', label: 'Uploads / Day', value: '156', delta: '+9%', tone: 'sky' },
  { id: 'user-activity', label: 'User Activity', value: '2.4k', delta: '+14%', tone: 'violet' },
  { id: 'streams', label: 'Active Streams', value: '642', delta: '+8%', tone: 'emerald' },
  { id: 'flagged', label: 'Flagged Ratio', value: '3.8%', delta: '-0.6%', tone: 'rose' },
];
