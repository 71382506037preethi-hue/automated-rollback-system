import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { RollbackEvent } from '../types';
import { 
  History, 
  Search, 
  Filter, 
  CheckCircle2, 
  RotateCcw, 
  Eye, 
  X, 
  Flame,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const RollbackHistoryPage: React.FC = () => {
  const { rollbackEvents, triggerDeploymentFailureSimulation, isSimulating } = useSystem();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<RollbackEvent | null>(null);

  const filteredEvents = rollbackEvents.filter((ev) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ev.id.toLowerCase().includes(q) ||
        ev.version.toLowerCase().includes(q) ||
        ev.previousStableVersion.toLowerCase().includes(q) ||
        ev.trigger.toLowerCase().includes(q) ||
        ev.reason.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-600 uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
            <span>Audit Trail & Persistence Record</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Rollback History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Recorded history of automated rollback operations, failure detection triggers, and recovery latencies.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-bold shadow-2xs">
            Persistent Storage (LocalStorage)
          </span>

          <button
            id="history-trigger-simulation-btn"
            onClick={triggerDeploymentFailureSimulation}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Simulate System Failure</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-100 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-purple-700">{filteredEvents.length}</span> persistent rollback records
        </div>

        <div className="w-full sm:w-80 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            id="history-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Rollback ID, version, reason..."
            className="w-full pl-9 pr-3.5 py-2 bg-purple-50/40 border border-purple-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Clean Pastel Table with Exact Requested Columns:
          Rollback ID | Current Version | Stable Version | Reason | Time | Status */}
      <div className="bg-white/95 backdrop-blur-md border border-purple-100 rounded-3xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-gradient-to-r from-purple-50/60 to-pink-50/40 border-b border-purple-100 text-[11px] font-mono uppercase text-slate-600">
              <tr>
                <th className="py-3.5 px-4 font-bold">Rollback ID</th>
                <th className="py-3.5 px-4 font-bold">Current Version</th>
                <th className="py-3.5 px-4 font-bold">Stable Version</th>
                <th className="py-3.5 px-4 font-bold">Reason</th>
                <th className="py-3.5 px-4 font-bold">Time</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50/60 font-sans">
              {filteredEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-purple-700 whitespace-nowrap">
                    {ev.id}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-rose-600 font-semibold whitespace-nowrap">
                    {ev.version} (Failed)
                  </td>
                  <td className="py-3.5 px-4 font-mono text-teal-700 font-semibold whitespace-nowrap">
                    {ev.previousStableVersion} (Restored)
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                    <span className="line-clamp-1" title={ev.reason}>{ev.reason}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                    {ev.recoveryTime} ({ev.timestamp})
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {/* Small pastel status badges */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      Recovered
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedEvent(ev)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[11px] font-semibold transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-purple-100 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-50 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-mono text-xs font-bold">
                  ID
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Rollback Event: {selectedEvent.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">CURRENT (FAILED) VERSION:</span>
                  <span className="font-bold text-rose-600">{selectedEvent.version}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">RESTORED STABLE VERSION:</span>
                  <span className="font-bold text-teal-700">{selectedEvent.previousStableVersion}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">RECOVERY TIME (MTTR):</span>
                  <span className="font-bold text-slate-800">{selectedEvent.recoveryTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">STATUS:</span>
                  <span className="font-bold text-teal-700">Self-Healed Successfully ✓</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Trigger Anomaly:</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-[11px]">
                  {selectedEvent.trigger}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Root Cause Explanation:</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px]">
                  {selectedEvent.reason}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
