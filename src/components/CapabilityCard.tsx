import React from 'react';
import { CapabilityItem } from '../types/speed';
import { Award, CheckCircle2, XCircle } from 'lucide-react';

interface CapabilityCardProps {
  items: CapabilityItem[];
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({ items }) => {
  return (
    <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#FFE600]" />
            <h3 className="text-xl sm:text-2xl font-black text-white font-mono uppercase">
              Real-World Application Capability Index
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Practical network suitability ratings for ultra-HD media, voice, cloud gaming, and heavy workflows.
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-black border border-slate-700 text-[#00E676] text-xs font-mono font-bold">
          {items.filter((i) => i.isCapable).length} of {items.length} Supported
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={`rounded-xl border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000000] bg-black/50 flex items-start justify-between gap-3 ${
                item.isCapable ? 'border-[#00E676]/60' : 'border-[#FF007F]/60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 text-[9px] font-mono font-bold uppercase border border-slate-800">
                    {item.category}
                  </span>
                  <h4 className="font-mono font-black text-sm text-white">
                    {item.label}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {item.description}
                </p>
                <span className="text-[10px] font-mono text-slate-500 block pt-1">
                  Threshold: {item.requiredSpeed}
                </span>
              </div>

              <div className="flex-shrink-0 mt-1">
                {item.isCapable ? (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00E676] text-black text-xs font-mono font-black uppercase border border-black shadow-[1.5px_1.5px_0px_0px_#000]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>READY</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF007F] text-white text-xs font-mono font-black uppercase border border-black shadow-[1.5px_1.5px_0px_0px_#000]">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>LIMITED</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
