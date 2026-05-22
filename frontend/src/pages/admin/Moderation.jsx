import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, XCircle } from 'lucide-react';
import AdminShell from '../../components/admin/AdminShell';
import AdminTable from '../../components/admin/AdminTable';
import { moderationQueue as seedQueue } from '../../data/adminMockData';

const Moderation = () => {
  const [queue, setQueue] = useState(seedQueue);

  const updateStatus = (id, status) => {
    setQueue((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  return (
    <AdminShell badge="Moderation" title="Flagged content review" description="Review sensitivity signals, approve or reject videos, and keep the queue moving with a clear moderation table.">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Needs review</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">{queue.filter((item) => item.status === 'Needs review').length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Approved</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">{queue.filter((item) => item.status === 'Approved').length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Rejected</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">{queue.filter((item) => item.status === 'Rejected').length}</p>
        </div>
      </section>

      <AdminTable
        columns={[
          { key: 'title', label: 'Video' },
          { key: 'creator', label: 'Tenant' },
          { key: 'score', label: 'Sensitivity' },
          { key: 'reason', label: 'Reason' },
          { key: 'status', label: 'Status', type: 'badge' },
        ]}
        rows={queue}
        actions={(row) => (
          <div className="inline-flex gap-2">
            <button type="button" onClick={() => updateStatus(row.id, 'Approved')} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-emerald-700 hover:bg-emerald-50 active:scale-95" title="Approve" aria-label={`Approve ${row.title}`}>
              <CheckCircle2 size={15} />
            </button>
            <button type="button" onClick={() => updateStatus(row.id, 'Rejected')} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-rose-700 hover:bg-rose-50 active:scale-95" title="Reject" aria-label={`Reject ${row.title}`}>
              <XCircle size={15} />
            </button>
            <button type="button" className="cursor-pointer rounded-lg border border-slate-200 p-2 text-amber-700 hover:bg-amber-50 active:scale-95" title="Review score" aria-label={`Review sensitivity score for ${row.title}`}>
              <ShieldAlert size={15} />
            </button>
          </div>
        )}
      />
    </AdminShell>
  );
};

export default Moderation;
