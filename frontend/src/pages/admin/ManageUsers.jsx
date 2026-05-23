import React, { useState, useEffect } from 'react';
import { Edit3, Plus, Trash2, UserMinus, CheckCircle, XCircle } from 'lucide-react';
import AdminShell from '../../components/admin/AdminShell';
import AdminTable from '../../components/admin/AdminTable';
import { users as seedUsers } from '../../data/adminMockData';
import api from '../../api/axios';

const roles = ['Admin', 'Editor', 'Moderator', 'Viewer'];

const ManageUsers = () => {
  const [users, setUsers] = useState(seedUsers);
  const [draft, setDraft] = useState({ name: '', email: '', role: 'Viewer', tenant: '' });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const [requestsError, setRequestsError] = useState(null);

  const fetchPendingRequests = async () => {
    try {
      setLoadingRequests(true);
      setRequestsError(null);
      const { data } = await api.get('/admin/editor-requests');
      if (data.success) {
        setPendingRequests(data.requests);
      }
    } catch (error) {
      console.error('Failed to fetch editor requests:', error);
      setRequestsError(error?.response?.data?.message || error.message || 'Failed to load requests');
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/editor-requests/${id}/approve`);
      fetchPendingRequests(); // refresh list
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/admin/editor-requests/${id}/reject`);
      fetchPendingRequests(); // refresh list
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  const createUser = () => {
    if (!draft.name.trim() || !draft.email.trim() || !draft.tenant.trim()) return;
    setUsers((current) => [
      {
        id: `u-${Date.now()}`,
        name: draft.name,
        email: draft.email,
        role: draft.role,
        status: 'Active',
        tenant: draft.tenant,
        lastActive: 'Just now',
      },
      ...current,
    ]);
    setDraft({ name: '', email: '', role: 'Viewer', tenant: '' });
  };

  const cycleRole = (id) => {
    setUsers((current) =>
      current.map((user) => {
        if (user.id !== id) return user;
        const index = roles.indexOf(user.role);
        return { ...user, role: roles[(index + 1) % roles.length] };
      }),
    );
  };

  const suspendUser = (id) => {
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, status: user.status === 'Suspended' ? 'Active' : 'Suspended' } : user)));
  };

  const deleteUser = (id) => {
    setUsers((current) => current.filter((user) => user.id !== id));
  };

  return (
    <AdminShell badge="Users" title="User management" description="Create users, rotate roles, suspend access, and remove accounts through a shared admin table.">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">Create user</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Full name" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" />
          <input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="Email" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" />
          <input value={draft.tenant} onChange={(e) => setDraft({ ...draft, tenant: e.target.value })} placeholder="Organization" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" />
          <div className="flex gap-3">
            <select value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400">
              {roles.map((role) => <option key={role}>{role}</option>)}
            </select>
            <button type="button" onClick={createUser} className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800 active:scale-[0.98]">
              <Plus size={16} />
              Create
            </button>
          </div>
        </div>
      </section>

      {/* Editor Requests Section */}
      <section className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
            Pending Editor Requests
            {pendingRequests.length > 0 && (
              <span className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
                {pendingRequests.length}
              </span>
            )}
          </h2>
          <button onClick={fetchPendingRequests} className="text-xs text-indigo-600 hover:underline">Refresh</button>
        </div>
        {loadingRequests ? (
          <p className="text-sm text-slate-500">Loading requests...</p>
        ) : requestsError ? (
          <p className="text-sm text-red-600 font-medium">⚠ Error: {requestsError}</p>
        ) : pendingRequests.length === 0 ? (
          <p className="text-sm text-slate-500">No pending editor requests.</p>
        ) : (
          <AdminTable
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Current Role' },
              { key: 'createdAt', label: 'Requested At' },
            ]}
            rows={pendingRequests.map(r => ({ ...r, id: r._id, createdAt: new Date(r.updatedAt).toLocaleDateString() }))}
            actions={(row) => (
              <div className="inline-flex gap-2">
                <button type="button" onClick={() => handleApprove(row.id)} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-emerald-700 hover:bg-emerald-50 active:scale-95" title="Approve Request">
                  <CheckCircle size={15} />
                </button>
                <button type="button" onClick={() => handleReject(row.id)} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-rose-700 hover:bg-rose-50 active:scale-95" title="Reject Request">
                  <XCircle size={15} />
                </button>
              </div>
            )}
          />
        )}
      </section>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-slate-950 mb-4">All Users (Mocked)</h2>
        <AdminTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'status', label: 'Status', type: 'badge' },
          { key: 'tenant', label: 'Tenant' },
          { key: 'lastActive', label: 'Last Active' },
        ]}
        rows={users}
        actions={(row) => (
          <div className="inline-flex gap-2">
            <button type="button" onClick={() => cycleRole(row.id)} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 active:scale-95" title="Edit role" aria-label={`Edit role for ${row.name}`}>
              <Edit3 size={15} />
            </button>
            <button type="button" onClick={() => suspendUser(row.id)} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-amber-700 hover:bg-amber-50 active:scale-95" title="Suspend user" aria-label={`Suspend user ${row.name}`}>
              <UserMinus size={15} />
            </button>
            <button type="button" onClick={() => deleteUser(row.id)} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-rose-700 hover:bg-rose-50 active:scale-95" title="Delete user" aria-label={`Delete user ${row.name}`}>
              <Trash2 size={15} />
            </button>
          </div>
        )}
      />
      </div>
    </AdminShell>
  );
};

export default ManageUsers;
