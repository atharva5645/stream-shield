import React from 'react';
import { Activity, AlertTriangle, BarChart3, Building2, PlayCircle, ShieldCheck, UploadCloud, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminShell from '../../components/admin/AdminShell';
import StatCard from '../../components/admin/StatCard';
import ActivityFeedCard from '../../components/admin/ActivityFeedCard';
import SimpleBarChart from '../../components/admin/SimpleBarChart';
import AdminTable from '../../components/admin/AdminTable';
import { activityFeed, adminStats, moderationQueue, tenants, uploadsTrend } from '../../data/adminMockData';

const statIcons = {
  uploads: UploadCloud,
  storage: Building2,
  streams: Activity,
  flagged: AlertTriangle,
};

const AdminDashboard = () => (
  <AdminShell
    badge="Admin control"
    title="Run the platform from one modern operations surface."
    description="System KPIs, tenant health, moderation pressure, and platform activity are all consolidated here for fast decisions."
    actions={
      <>
        <Link to="/admin/users" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Manage users</Link>
        <Link to="/admin/analytics" className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">Open analytics</Link>
      </>
    }
  >
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {adminStats.map((card) => (
        <StatCard key={card.id} icon={statIcons[card.id]} label={card.label} value={card.value} change={card.change} tone={card.tone} />
      ))}
    </section>

    <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <SimpleBarChart title="Upload velocity" subtitle="Daily ingest trend across the last week." data={uploadsTrend} color="bg-sky-500" />
      <ActivityFeedCard items={activityFeed} />
    </section>

    <section className="grid gap-6 xl:grid-cols-2">
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Tenant health</h2>
            <p className="mt-1 text-sm text-slate-500">Organizations with usage and plan context.</p>
          </div>
          <ShieldCheck className="text-emerald-600" size={20} />
        </div>
        <AdminTable
          columns={[
            { key: 'name', label: 'Tenant' },
            { key: 'plan', label: 'Plan' },
            { key: 'users', label: 'Users' },
            { key: 'storage', label: 'Storage' },
            { key: 'health', label: 'Health', type: 'badge' },
          ]}
          rows={tenants}
        />
      </div>

      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Moderation pressure</h2>
            <p className="mt-1 text-sm text-slate-500">Recently flagged videos needing action.</p>
          </div>
          <PlayCircle className="text-amber-600" size={20} />
        </div>
        <AdminTable
          columns={[
            { key: 'title', label: 'Video' },
            { key: 'creator', label: 'Tenant' },
            { key: 'score', label: 'Score' },
            { key: 'status', label: 'Status', type: 'badge' },
          ]}
          rows={moderationQueue.slice(0, 4)}
        />
      </div>
    </section>

    <section className="grid gap-4 md:grid-cols-3">
      <Link to="/admin/users" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:bg-sky-50">
        <Users size={22} className="text-sky-700" />
        <h3 className="mt-4 text-base font-semibold text-slate-900">User management</h3>
        <p className="mt-2 text-sm text-slate-500">Create users, edit roles, suspend accounts, and delete access.</p>
      </Link>
      <Link to="/admin/tenants" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50">
        <Building2 size={22} className="text-emerald-700" />
        <h3 className="mt-4 text-base font-semibold text-slate-900">Tenant management</h3>
        <p className="mt-2 text-sm text-slate-500">Provision organizations, assign users, and inspect tenant analytics.</p>
      </Link>
      <Link to="/admin/moderation" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-200 hover:bg-amber-50">
        <BarChart3 size={22} className="text-amber-700" />
        <h3 className="mt-4 text-base font-semibold text-slate-900">Moderation panel</h3>
        <p className="mt-2 text-sm text-slate-500">Review flagged content, approve or reject videos, and inspect sensitivity scores.</p>
      </Link>
    </section>
  </AdminShell>
);

export default AdminDashboard;
