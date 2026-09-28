import React, { useState } from 'react';
import { X, Copy, Check, Share2, Award, Zap, Download, Upload, Activity } from 'lucide-react';
import { ClientIpDetails, SpeedMetrics } from '../types/speed';
import { SkuuyLogo } from './SkuuyLogo';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: SpeedMetrics;
  clientIp: ClientIpDetails;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  metrics,
  clientIp
}) => {
  if (!isOpen) return null;

  const [copiedType, setCopiedType] = useState<string | null>(null);

  const markdownBadge = `[![Skuuy Speedtest](https://img.shields.io/badge/Speed-${metrics.download.toFixed(0)}%20Mbps%20%7C%20Ping-${metrics.ping}ms-00F0FF?style=for-the-badge&logo=cloudflare)](https://speed.skuuy.com)`;

  const rawSummary = `⚡ Skuuy Speedtest Results:
⬇️ Download: ${metrics.download.toFixed(1)} Mbps
⬆️ Upload: ${metrics.upload.toFixed(1)} Mbps
📶 Ping: ${metrics.ping} ms (Jitter: ${metrics.jitter} ms)
🛡️ Bufferbloat: Grade ${metrics.bufferbloatGrade} (${metrics.bufferbloatRpm} RPM)
🌐 ISP: ${clientIp.isp} (${clientIp.asn})
Tested via https://speed.skuuy.com`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#161922] border-3 border-black rounded-2xl shadow-[8px_8px_0px_0px_#00F0FF] overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#00F0FF] border-b-3 border-black text-black">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-black" />
            <h3 className="text-lg font-black uppercase font-mono tracking-tight">
              Speed & Bufferbloat Certificate
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Certificate Card Preview */}
          <div className="bg-[#0D0F17] border-3 border-black rounded-2xl p-6 shadow-[5px_5px_0px_0px_#FFE600] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-800">
              <SkuuyLogo size="sm" />
              <span className="px-2.5 py-1 rounded bg-[#00E676] text-black text-[10px] font-mono font-black uppercase border border-black shadow-[1.5px_1.5px_0px_0px_#000]">
                VERIFIED BENCHMARK
              </span>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="p-3 rounded-xl bg-black border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Download</span>
                <span className="text-xl sm:text-2xl font-black text-[#00F0FF]">
                  {metrics.download.toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-500 block">Mbps</span>
              </div>

              <div className="p-3 rounded-xl bg-black border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Upload</span>
                <span className="text-xl sm:text-2xl font-black text-[#00E676]">
                  {metrics.upload.toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-500 block">Mbps</span>
              </div>

              <div className="p-3 rounded-xl bg-black border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Ping / Jitter</span>
                <span className="text-xl sm:text-2xl font-black text-[#FFE600]">
                  {metrics.ping} <span className="text-xs font-normal">ms</span>
                </span>
                <span className="text-[10px] text-slate-500 block">±{metrics.jitter}ms</span>
              </div>

              <div className="p-3 rounded-xl bg-black border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Bufferbloat</span>
                <span className="text-xl sm:text-2xl font-black text-[#FF007F]">
                  Grade {metrics.bufferbloatGrade}
                </span>
                <span className="text-[10px] text-slate-500 block">{metrics.bufferbloatRpm} RPM</span>
              </div>
            </div>

            {/* Client Info Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <div>
                <span>ISP: <strong className="text-white">{clientIp.isp}</strong></span>
                <span className="ml-2 text-slate-500">({clientIp.asn})</span>
              </div>
              <span className="text-[10px]">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Copy Snippets */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="block text-slate-300 font-bold uppercase text-[10px] mb-1">
                GitHub Profile README Markdown Badge
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={markdownBadge}
                  className="flex-1 px-3 py-2 rounded-lg bg-black border border-slate-800 text-slate-300 text-xs select-all focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(markdownBadge, 'badge')}
                  className="px-4 py-2 rounded-lg bg-[#FFE600] text-black font-black uppercase border border-black hover:bg-white"
                >
                  {copiedType === 'badge' ? <Check className="w-4 h-4 text-[#00E676]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase text-[10px] mb-1">
                Plain Text Summary (Discord / Reddit)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={rawSummary}
                  className="flex-1 px-3 py-2 rounded-lg bg-black border border-slate-800 text-slate-300 text-xs select-all focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(rawSummary, 'summary')}
                  className="px-4 py-2 rounded-lg bg-[#00F0FF] text-black font-black uppercase border border-black hover:bg-white"
                >
                  {copiedType === 'summary' ? <Check className="w-4 h-4 text-[#00E676]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
