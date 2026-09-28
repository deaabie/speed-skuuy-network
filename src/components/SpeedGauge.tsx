import React from 'react';
import { ClientIpDetails, SpeedMetrics, TestPhase } from '../types/speed';
import {
  Download,
  Upload,
  Zap,
  Activity,
  RotateCw,
  Play,
  Globe,
  Radio
} from 'lucide-react';

interface SpeedGaugeProps {
  phase: TestPhase;
  currentSpeed: number;
  currentPing: number;
  progressPercent: number;
  metrics: SpeedMetrics;
  clientIp: ClientIpDetails;
  onStartTest: () => void;
}

export const SpeedGauge: React.FC<SpeedGaugeProps> = ({
  phase,
  currentSpeed,
  currentPing,
  progressPercent,
  metrics,
  clientIp,
  onStartTest
}) => {
  const isRunning = phase !== 'idle' && phase !== 'complete';

  // Calculate arc stroke for speed up to 500 Mbps max scale
  const maxDisplaySpeed = 500;
  const normalizedSpeed = Math.min(currentSpeed, maxDisplaySpeed);
  const strokeDashoffset = 440 - (440 * (normalizedSpeed / maxDisplaySpeed));

  return (
    <div className="space-y-6">
      {/* Top ISP & Client Header Bar */}
      <div className="bg-[#161922] border-3 border-black rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0px_0px_#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black text-white font-mono leading-none">
                {clientIp.isp}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-black text-[#FFE600] border border-slate-700 text-[10px] font-mono font-bold">
                {clientIp.asn}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono mt-1 block">
              {clientIp.city}, {clientIp.country} • IP: <span className="text-slate-200">{clientIp.ip}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black border-2 border-black text-xs font-mono shadow-[2px_2px_0px_0px_#000]">
            <Radio className="w-3.5 h-3.5 text-[#00E676] animate-pulse" />
            <span className="text-slate-400">Server: </span>
            <span className="text-white font-bold">Cloudflare Anycast PoP</span>
          </div>
        </div>
      </div>

      {/* Main Gauge Dashboard Container */}
      <div className="relative bg-[#161922] border-3 border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000000] overflow-hidden text-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Phase Indicator Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black border-2 border-black shadow-[3px_3px_0px_0px_#000] mb-8 font-mono text-xs font-black uppercase">
          {isRunning ? (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping"></span>
              <span className="text-[#00F0FF]">
                Testing {phase.toUpperCase()}... ({Math.round(progressPercent)}%)
              </span>
            </>
          ) : phase === 'complete' ? (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E676]"></span>
              <span className="text-[#00E676]">Audit Completed (100%)</span>
            </>
          ) : (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600]"></span>
              <span className="text-[#FFE600]">Ready to Benchmark</span>
            </>
          )}
        </div>

        {/* Big Circular Speedometer Dial */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background Track Circle */}
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="#0D0F17"
              strokeWidth="16"
              fill="none"
            />
            {/* Active Speed Arc */}
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="url(#speedGradient)"
              strokeWidth="16"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-200"
            />
            <defs>
              <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E676" />
                <stop offset="50%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#FF007F" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Speedometer Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
            <span className="text-5xl sm:text-7xl font-black font-mono text-white tracking-tight leading-none drop-shadow-[2px_2px_0px_#000]">
              {isRunning
                ? currentSpeed.toFixed(1)
                : phase === 'complete'
                ? metrics.download.toFixed(1)
                : '0.0'}
            </span>
            <span className="text-xs sm:text-sm font-black font-mono uppercase text-[#00F0FF] tracking-wider mt-2">
              Mbps (MegaBit/s)
            </span>
            {currentPing > 0 && isRunning && (
              <span className="text-[11px] font-mono text-[#FFE600] mt-1 font-bold">
                ⚡ {currentPing} ms latency
              </span>
            )}
          </div>
        </div>

        {/* Start / Re-Test Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onStartTest}
            disabled={isRunning}
            className={`flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black font-mono uppercase text-base sm:text-lg border-3 border-black shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
              isRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border-slate-700'
                : 'bg-[#FFE600] text-black hover:bg-white'
            }`}
          >
            {isRunning ? (
              <>
                <RotateCw className="w-5 h-5 animate-spin" />
                <span>Running Edge Benchmark...</span>
              </>
            ) : phase === 'complete' ? (
              <>
                <RotateCw className="w-5 h-5" />
                <span>Run Test Again</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-black" />
                <span>Start Speedtest</span>
              </>
            )}
          </button>
        </div>

        {/* 4 Primary Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {/* Download Card */}
          <div className="bg-black/60 border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000] text-left">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-slate-400 mb-1">
              <Download className="w-4 h-4 text-[#00F0FF]" />
              <span>Download</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-[#00F0FF]">
              {metrics.download > 0 ? metrics.download.toFixed(1) : '--'}
              <span className="text-xs text-slate-400 ml-1 font-normal">Mbps</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              HTTP/3 Multi-Stream
            </span>
          </div>

          {/* Upload Card */}
          <div className="bg-black/60 border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000] text-left">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-slate-400 mb-1">
              <Upload className="w-4 h-4 text-[#00E676]" />
              <span>Upload</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-[#00E676]">
              {metrics.upload > 0 ? metrics.upload.toFixed(1) : '--'}
              <span className="text-xs text-slate-400 ml-1 font-normal">Mbps</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Multi-Chunk POST
            </span>
          </div>

          {/* Ping Card */}
          <div className="bg-black/60 border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000] text-left">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-slate-400 mb-1">
              <Zap className="w-4 h-4 text-[#FFE600]" />
              <span>Idle Ping</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-[#FFE600]">
              {metrics.ping > 0 ? `${metrics.ping}` : '--'}
              <span className="text-xs text-slate-400 ml-1 font-normal">ms</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Unloaded Base Latency
            </span>
          </div>

          {/* Jitter Card */}
          <div className="bg-black/60 border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000] text-left">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-slate-400 mb-1">
              <Activity className="w-4 h-4 text-[#FF007F]" />
              <span>Jitter</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-[#FF007F]">
              {metrics.jitter > 0 ? `${metrics.jitter}` : '--'}
              <span className="text-xs text-slate-400 ml-1 font-normal">ms</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Stability Variation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
