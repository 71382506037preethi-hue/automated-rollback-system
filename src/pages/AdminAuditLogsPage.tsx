import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  ShieldCheck, 
  FileText, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Filter,
  Download,
  Trash2,
  Sparkles,
  Terminal
} from 'lucide-react';
import { AdminAccount, AuditLog } from '../types';

export const AdminAuditLogsPage: React.FC = () => {
  const { 
    currentUser, 
    role, 
    auditLogs, 
    clearAuditLogs, 
    showToast,
    setActivePage 
  } = useSystem();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  if (!currentUser || role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4">
        <button
          onClick={() => setActivePage('login')}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold"
        >
          Admin Login Required
        </button>
      </div>
    );
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || log.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleExportLogs = () => {
    if (auditLogs.length === 0) {
      showToast('No logs available to export.');
      return;
    }

    const headers = 'ID,Timestamp,User,Action,Status,Details\n';
    const rows = auditLogs.map((l) => 
      `"${l.id}","${l.timestamp}","${l.user}","${l.action}","${l.status}","${l.details || ''}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExamSafe_Audit_Trail_${Date.now()}.csv`;
    a.click();
    showToast('Audit trail exported successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-bold border border-purple-200 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Compliance & Telemetry Audit Trail</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System Audit & Event Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Cryptographically timestamped record of examination creation, candidate enrollments, auto-saves, and failover rollbacks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportLogs}
            className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Logs</span>
          </button>

          <button
            onClick={clearAuditLogs}
            className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 transition-colors"
            title="Clear Log View"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-pink-100 shadow-xs">
        <div className="relative max-w-sm w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, actor, or detail..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 font-bold font-mono">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Events</option>
            <option value="Success">Success</option>
            <option value="Triggered">Triggered</option>
            <option value="Warning">Warning</option>
            <option value="Restored">Restored</option>
            <option value="Info">Info</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-3xl border border-pink-100 shadow-xs overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <Terminal className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">
              No matching audit events found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Timestamp</th>
                  <th className="px-4 py-3.5">Actor</th>
                  <th className="px-4 py-3.5">Action Event</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Technical Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => {
                  let badge = 'bg-slate-100 text-slate-700';
                  if (log.status === 'Success') badge = 'bg-emerald-100 text-emerald-800 font-bold';
                  if (log.status === 'Restored') badge = 'bg-teal-100 text-teal-800 font-bold';
                  if (log.status === 'Triggered') badge = 'bg-rose-100 text-rose-800 font-bold';
                  if (log.status === 'Warning') badge = 'bg-amber-100 text-amber-800 font-bold';

                  return (
                    <tr key={log.id} className="hover:bg-purple-50/20 transition-colors">
                      <td className="px-5 py-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-800 whitespace-nowrap font-sans">
                        {log.user}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-purple-900 font-sans">
                        {log.action}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold ${badge}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-sans text-xs max-w-md truncate">
                        {log.details || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
