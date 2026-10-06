import React, { useEffect, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Home, RefreshCw, ShieldAlert } from 'lucide-react';
import { useFieldWorkerStore } from '../store/fieldWorkerStore';
import { HouseholdStatus, ORGANIZATION_LABELS, VerificationStatus } from '../types/relief';
import { isReliefBackendConfigured, reliefApi } from '../backend/reliefApi';
import { OfflineBeneficiaryRecord } from '../engine/offlineDb';
import { DONOR_DIRECTORY, TEAM_DIRECTORY } from '../data/portalDirectory';

export const AdminPage: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { beneficiaries, loadBeneficiariesFromDB, updateVerificationStatus } = useFieldWorkerStore();
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [assignmentTeam, setAssignmentTeam] = useState(TEAM_DIRECTORY[0].teamId);
  const [assignmentTask, setAssignmentTask] = useState('Household verification');
  const [assignmentSaved, setAssignmentSaved] = useState(false);

  useEffect(() => { refresh(); }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      await loadBeneficiariesFromDB();
      if (isReliefBackendConfigured) {
        const remoteRecords = await reliefApi.getAdminBeneficiaries();
        const localRecords = useFieldWorkerStore.getState().beneficiaries;
        const mergedRecords = [...localRecords.filter(local => !remoteRecords.some(remote => remote.recordId === local.recordId)), ...remoteRecords];
        useFieldWorkerStore.setState({ beneficiaries: mergedRecords });
      }
    } finally {
      setLoading(false);
    }
  };

  const records = filter === 'all' ? beneficiaries : beneficiaries.filter(record => record.verificationStatus === filter);

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button onClick={onBackToHome} className="mb-3 text-xs font-semibold text-[#0F3A5D] hover:underline">Back to Public Portal</button>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700">Admin control room</p>
            <h1 className="mt-1 text-3xl font-serif font-bold text-[#0F3A5D]">Household verification & team dispatch</h1>
            <p className="mt-2 max-w-2xl text-sm text-stone-600">All partner records are visible only to administrators. Teams receive their own organization and area-scoped records.</p>
          </div>
          <button onClick={refresh} disabled={loading} className="inline-flex items-center gap-2 self-start rounded-xl bg-[#0F3A5D] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh records
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric icon={Home} label="Total households" value={beneficiaries.length} />
          <Metric icon={ClipboardCheck} label="Verified" value={beneficiaries.filter(item => item.verificationStatus === 'verified').length} />
          <Metric icon={ShieldAlert} label="Needs review" value={beneficiaries.filter(item => item.verificationStatus !== 'verified').length} />
          <Metric icon={CheckCircle2} label="Destroyed homes" value={beneficiaries.filter(item => item.householdStatus === 'destroyed').length} />
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm"><div className="border-b border-stone-100 px-5 py-4"><h2 className="text-lg font-serif font-bold text-[#0F3A5D]">Team directory & current work</h2><p className="mt-1 text-xs text-stone-500">Admin ko pata rahega kaun sa team kis area mein kya kar raha hai.</p></div><table className="min-w-[760px] w-full text-left text-xs"><thead className="bg-stone-100 text-[10px] uppercase tracking-wider text-stone-500"><tr><th className="px-4 py-3">Portal / team</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Area</th><th className="px-4 py-3">Capabilities</th><th className="px-4 py-3">Current task</th></tr></thead><tbody className="divide-y divide-stone-100">{TEAM_DIRECTORY.map(team => <tr key={team.teamId}><td className="px-4 py-4"><p className="font-bold text-stone-900">{team.portalName}</p><p className="mt-1 text-stone-500">{team.teamId} · {team.organizationName}</p></td><td className="px-4 py-4"><p>{team.contactEmail}</p><p className="mt-1 text-stone-500">{team.contactPhone}</p></td><td className="px-4 py-4">{team.area}</td><td className="max-w-[220px] px-4 py-4 text-stone-600">{team.capabilities.join(' · ')}</td><td className="px-4 py-4 font-semibold text-emerald-800">{team.currentTask}</td></tr>)}</tbody></table></div>
          <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"><div><h2 className="text-lg font-serif font-bold text-[#0F3A5D]">Assign a team</h2><p className="mt-1 text-xs text-stone-500">Team portal ko next field task bhejein.</p></div><label className="block text-xs font-semibold">Team<select value={assignmentTeam} onChange={event => setAssignmentTeam(event.target.value)} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm">{TEAM_DIRECTORY.map(team => <option key={team.teamId} value={team.teamId}>{team.portalName}</option>)}</select></label><label className="block text-xs font-semibold">Task<select value={assignmentTask} onChange={event => setAssignmentTask(event.target.value)} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"><option>Household verification</option><option>Survey new households</option><option>Deliver aid package</option><option>Confirm home status</option></select></label><button onClick={() => setAssignmentSaved(true)} className="w-full rounded-lg bg-[#0F3A5D] px-3 py-2.5 text-xs font-bold text-white">Assign task</button>{assignmentSaved && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">Task assigned to {assignmentTeam}: {assignmentTask}</p>}</div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-serif font-bold text-[#0F3A5D]">Donor contacts</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{DONOR_DIRECTORY.map(donor => <div key={donor.contactEmail} className="rounded-xl border border-stone-200 p-4 text-xs"><p className="font-bold text-stone-900">{donor.portalName}</p><p className="mt-1 text-stone-600">{donor.contactEmail} · {donor.contactPhone}</p><p className="mt-2 text-stone-500">Areas: {donor.targetAreas.join(', ')}</p><p className="mt-1 font-semibold text-emerald-800">Focus: {donor.contributionFocus}</p></div>)}</div></section>

        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'needs_review', 'verified', 'rejected'].map(value => (
            <button key={value} onClick={() => setFilter(value)} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${filter === value ? 'border-[#0F3A5D] bg-[#0F3A5D] text-white' : 'border-stone-300 bg-white text-stone-700'}`}>
              {value === 'all' ? 'All records' : value.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-stone-100 text-[10px] uppercase tracking-wider text-stone-500">
              <tr><th className="px-4 py-3">Household</th><th className="px-4 py-3">Organization</th><th className="px-4 py-3">Area / team</th><th className="px-4 py-3">Home status</th><th className="px-4 py-3">Verification</th><th className="px-4 py-3">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {records.map(record => <AdminRow key={record.recordId} record={record} onUpdate={updateVerificationStatus} />)}
              {records.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-stone-500">No household records yet. Field teams will appear here after their first sync.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Metric: React.FC<{ icon: React.ElementType; label: string; value: number }> = ({ icon: Icon, label, value }) => (
  <div className="rounded-xl border border-stone-200 bg-white p-4"><Icon className="h-4 w-4 text-[#0F3A5D]" /><p className="mt-3 text-xl font-bold text-stone-900">{value}</p><p className="text-[11px] text-stone-500">{label}</p></div>
);

const AdminRow: React.FC<{ record: OfflineBeneficiaryRecord; onUpdate: (id: string, household: HouseholdStatus, verification: VerificationStatus) => Promise<void> }> = ({ record, onUpdate }) => {
  const [householdStatus, setHouseholdStatus] = useState<HouseholdStatus>(record.householdStatus || 'unknown');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(record.verificationStatus || 'pending');
  const [saving, setSaving] = useState(false);
  const save = async () => { setSaving(true); await onUpdate(record.recordId, householdStatus, verificationStatus); setSaving(false); };
  return <tr className="align-top"><td className="px-4 py-4"><p className="font-bold text-stone-900">{record.applicantName}</p><p className="mt-1 text-stone-500">{record.gothVillage} · {record.recordId}</p></td><td className="px-4 py-4"><p className="font-semibold">{record.organizationId || 'Legacy record'}</p><p className="mt-1 text-stone-500">{record.organizationType ? ORGANIZATION_LABELS[record.organizationType] : 'Unscoped'}</p></td><td className="px-4 py-4"><p>{record.areaId || `${record.district} / ${record.tehsil}`}</p><p className="mt-1 text-stone-500">Team: {record.teamId || 'Unassigned'}</p></td><td className="px-4 py-4"><select value={householdStatus} onChange={event => setHouseholdStatus(event.target.value as HouseholdStatus)} className="rounded-lg border border-stone-300 bg-white px-2 py-2"><option value="unknown">Unknown</option><option value="occupied">House remains</option><option value="destroyed">House destroyed</option><option value="temporarily_displaced">Temporarily displaced</option></select></td><td className="px-4 py-4"><select value={verificationStatus} onChange={event => setVerificationStatus(event.target.value as VerificationStatus)} className="rounded-lg border border-stone-300 bg-white px-2 py-2"><option value="pending">Pending</option><option value="needs_review">Needs review</option><option value="verified">Verified</option><option value="rejected">Rejected</option></select></td><td className="px-4 py-4"><button onClick={save} disabled={saving} className="rounded-lg bg-emerald-700 px-3 py-2 font-bold text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save & assign'}</button></td></tr>;
};