import React from 'react';
import { SpeedMetrics } from '../types/speed';
import { Activity, ShieldCheck, AlertTriangle, ArrowRight, Gauge, HelpCircle } from 'lucide-react';

interface BufferbloatCardProps {
  metrics: SpeedMetrics;
}

export const BufferbloatCard: React.FC<BufferbloatCardProps> = ({ metrics }) => {
  const { bufferbloatGrade, bufferbloatRpm, ping, downloadLatency, uploadLatency } = metrics;

  const gradeColors: Record<string, { bg: string; text: string; border: string }> = {
    'A+': { bg: 'bg-[#00E676]', text: 'text-black', border: 'border-black' },
    A: { bg: 'bg-[#00E676]', text: 'text-black', border: 'border-black' },
    B: { bg: 'bg-[#00F0FF]', text: 'text-black', border: 'border-black' },
    C: { bg: 'bg-[#FFE600]', text: 'text-black', border: 'border-black' },
    D: { bg: 'bg-[#FF7A00]', text: 'text-white', border: 'border-black' },
    F: { bg: 'bg-[#FF007F]', text: 'text-white', border: 'border-black' }
  };

  const style = gradeColors[bufferbloatGrade] || gradeColors['A'];
  const downloadDelta = Math.max(0, downloadLatency - ping);
  const uploadDelta = Math.max(0, uploadLatency - ping);

  return (
    <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#00F0FF]" />
            <h3 className="text-xl sm:text-2xl font-black text-white font-mono uppercase">
              Bufferbloat & Responsiveness Lab (RFC 8290)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Measures latency degradation under heavy network saturation. Tested against Apple / IETF RFC 8290 standards.
          </p>
        </div>

        {/* Grade Badge */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-slate-400 block uppercase">
              Responsiveness (RPM)
            </span>
            <span className="text-2xl font-mono font-black text-white">
              {bufferbloatRpm.toLocaleString()} <span className="text-xs font-normal text-slate-400">RPM</span>
            </span>
          </div>

          <div
            className={`w-20 h-20 rounded-2xl border-3 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_#000000] ${style.bg} ${style.text} ${style.border}`}
          >
            <span className="text-3xl font-black font-mono leading-none">{bufferbloatGrade}</span>
            <span className="text-[10px] font-black uppercase tracking-wider mt-1">GRADE</span>
          </div>
        </div>
      </div>

      {/* Latency Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Unloaded Idle Ping */}
        <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">
            1. Unloaded Base Latency
          </span>
          <div className="text-2xl font-black text-[#FFE600]">
            {ping} <span className="text-xs font-normal text-slate-400">ms</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Idle network ping without active background traffic.
          </p>
        </div>

        {/* Download Loaded Latency */}
        <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">
            2. Download Loaded Latency
          </span>
          <div className="text-2xl font-black text-[#00F0FF]">
            {downloadLatency} <span className="text-xs font-normal text-slate-400">ms</span>
            <span className="text-xs text-[#00E676] ml-2 font-bold">(+{downloadDelta}ms)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Latency when multiple heavy download streams are active.
          </p>
        </div>

        {/* Upload Loaded Latency */}
        <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">
            3. Upload Loaded Latency
          </span>
          <div className="text-2xl font-black text-[#FF007F]">
            {uploadLatency} <span className="text-xs font-normal text-slate-400">ms</span>
            <span className="text-xs text-[#FFE600] ml-2 font-bold">(+{uploadDelta}ms)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Latency when sending large files or streaming screen.
          </p>
        </div>
      </div>

      {/* Explanatory SQM Guide */}
      <div className="p-4 rounded-xl bg-slate-900 border-2 border-slate-800 space-y-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#FFE600] font-black uppercase">
          <HelpCircle className="w-4 h-4 text-[#FFE600]" />
          <span>Why Does Bufferbloat Matter?</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Bufferbloat is caused by oversized packet buffers in home routers and modems. When anyone on your Wi-Fi downloads large files or cloud backups, unmanaged routers store packets in a deep queue rather than dropping them, causing latency to spike from 20ms to 400ms+. This is why gaming freezes or voice calls stutter!
        </p>
        <div className="pt-2 text-slate-400 flex items-center gap-1.5 font-bold">
          <ArrowRight className="w-3.5 h-3.5 text-[#00E676]" />
          <span>Recommended Fix: Enable Smart Queue Management (SQM) with CAKE or FQ-CoDel in your router firmware (OpenWrt, ASUS Merlin, MikroTik).</span>
        </div>
      </div>
    </div>
  );
};
