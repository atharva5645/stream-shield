import React, { useState } from 'react';
import { BarChart3, Plus, UserPlus } from 'lucide-react';
import AdminShell from '../../components/admin/AdminShell';
import AdminTable from '../../components/admin/AdminTable';
import SimpleBarChart from '../../components/admin/SimpleBarChart';
import { storageByTenant, tenants as seedTenants, users } from '../../data/adminMockData';

const ManageTenants = () => {
  const [tenants, setTenants] = useState(seedTenants);
  const [draft, setDraft] = useState({ name: '', plan: 'Starter' });
  const [selectedTenantId, setSelectedTenantId] = useState(seedTenants[0]?.id ?? null);

  const createTenant = () => {
    if (!draft.name.trim()) return;
    setTenants((current) => [
      { id: `t-${Date.now()}`, name: draft.name, plan: draft.plan, users: 0, storage: '0 TB', uploads: 0, health: 'Healthy' },
      ...current,
    ]);
    setDraft({ name: '', plan: 'Starter' });
  };

  const assignUsers = (tenantId) => {
    setTenants((current) => current.map((tenant) => (tenant.id === tenantId ? { ...tenant, users: tenant.users + 1 } : tenant)));
  };

  const selectedTenant = tenants.find((tenant) => tenant.id === selectedTenantId) || tenants[0];

  return (
    <AdminShell badge="Tenants" title="Tenant management" description="Provision organizations, assign users, and inspect tenant-level analytics and health.">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Create organization</h2>
          <div className="mt-5 flex flex-col gap-4 md:flex-row">
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Organization name" className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" />
            <select value={draft.plan} onChange={(e) => setDraft({ ...draft, plan: e.target.value })} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400">
              <option>Starter</option>
              <option>Growth</option>
              <option>Enterprise</option>
            </select>
            <button type="button" onClick={createTenant} className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 active:scale-[0.98]">
              <Plus size={16} />
              Create
            </button>
          </div>
          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            {users.length} users are available to assign across tenant workspaces.
          </div>
        </div>
        <div className="space-y-4">
          <SimpleBarChart title="Tenant analytics" subtitle="Storage concentration across active organizations." data={storageByTenant} color="bg-emerald-500" />
          {selectedTenant ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-950">{selectedTenant.name}</h3>
              <p className="mt-1 text-sm text-slate-500">Users: {selectedTenant.users} • Uploads: {selectedTenant.uploads} • Storage: {selectedTenant.storage}</p>
            </div>
          ) : null}
        </div>
      </section>

      <AdminTable
        columns={[
          { key: 'name', label: 'Organization' },
          { key: 'plan', label: 'Plan' },
          { key: 'users', label: 'Users' },
          { key: 'storage', label: 'Storage' },
          { key: 'uploads', label: 'Uploads' },
          { key: 'health', label: 'Health', type: 'badge' },
        ]}
        rows={tenants}
        actions={(row) => (
          <div className="inline-flex gap-2">
            <button type="button" onClick={() => assignUsers(row.id)} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-sky-700 hover:bg-sky-50 active:scale-95" title="Assign users" aria-label={`Assign users to ${row.name}`}>
              <UserPlus size={15} />
            </button>
            <button type="button" onClick={() => setSelectedTenantId(row.id)} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-emerald-700 hover:bg-emerald-50 active:scale-95" title="Tenant analytics" aria-label={`View analytics for ${row.name}`}>
              <BarChart3 size={15} />
            </button>
          </div>
        )}
      />
    </AdminShell>
  );
};

export default ManageTenants;
