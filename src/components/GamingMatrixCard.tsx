import React from 'react';
import { GamingServer } from '../types/speed';
import { Gamepad2, Zap, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface GamingMatrixCardProps {
  servers: GamingServer[];
}

export const GamingMatrixCard: React.FC<GamingMatrixCardProps> = ({ servers }) => {
  return (
    <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-[#FF007F]" />
            <h3 className="text-xl sm:text-2xl font-black text-white font-mono uppercase">
              Global Gaming & Cloud Cluster Ping Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time ping benchmarks to 12 major cloud datacenter and game server regions worldwide.
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-black border border-slate-700 text-[#00F0FF] text-xs font-mono font-bold">
          12 Regions Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((server) => {
          const isOptimal = server.status === 'optimal';
          const isGood = server.status === 'good';

          return (
            <div
              key={server.id}
              className={`rounded-xl border-2 border-black p-4 shadow-[3px_3px_0px_0px_#000000] bg-black/50 space-y-3 ${
                isOptimal
                  ? 'border-[#00E676]/60'
                  : isGood
                  ? 'border-[#FFE600]/60'
                  : 'border-[#FF007F]/60'
              }`}
            >
              {/* Region Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl select-none" role="img" aria-label={server.country}>
                    {server.flag}
                  </span>
                  <div>
                    <h4 className="font-mono font-black text-sm text-white leading-tight">
                      {server.city}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {server.region}
                    </span>
                  </div>
                </div>

                {/* Ping Readout */}
                <div className="text-right">
                  <span
                    className={`text-lg font-black font-mono block leading-none ${
                      isOptimal
                        ? 'text-[#00E676]'
                        : isGood
                        ? 'text-[#FFE600]'
                        : 'text-[#FF007F]'
                    }`}
                  >
                    {server.ping > 0 ? `${server.ping}ms` : '--'}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    ±{server.jitter}ms jitter
                  </span>
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] font-mono">
                <span className="text-slate-400">Viability:</span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    isOptimal
                      ? 'bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40'
                      : isGood
                      ? 'bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40'
                      : 'bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/40'
                  }`}
                >
                  {isOptimal ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : isGood ? (
                    <Zap className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  <span>
                    {isOptimal ? 'Competitive Ready' : isGood ? 'Playable' : 'High Latency'}
                  </span>
                </span>
              </div>

              {/* Associated Games Chips */}
              <div className="flex flex-wrap gap-1 pt-1">
                {server.games.map((game, gIdx) => (
                  <span
                    key={gIdx}
                    className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-[9px] font-mono text-slate-300"
                  >
                    {game}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
