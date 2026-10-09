import React from 'react';
import { SkuuyLogo } from './SkuuyLogo';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t-3 border-black bg-[#161922] text-slate-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <SkuuyLogo size="sm" />
            <p className="text-xs text-slate-400 font-mono leading-relaxed pt-2">
              Skuuy Speed is an edge-native internet speed test, bufferbloat responsiveness auditor, and multi-region gaming ping matrix running on Cloudflare PoPs.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00E676] text-black text-[10px] font-mono font-black uppercase border border-black shadow-[2px_2px_0px_0px_#000]">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero Throttling</span>
              </span>
            </div>
          </div>

          {/* Col 2: Diagnostic Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#00F0FF] font-mono">
              Diagnostic Tools
            </h4>
            <ul className="space-y-2 text-xs font-mono font-bold">
              <li>
                <button
                  onClick={() => onSelectTab('test')}
                  className="text-slate-300 hover:text-[#00F0FF] transition-colors"
                >
                  Edge Speedtest Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('bufferbloat')}
                  className="text-slate-300 hover:text-[#00F0FF] transition-colors"
                >
                  Bufferbloat & RPM Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('gaming')}
                  className="text-slate-300 hover:text-[#00F0FF] transition-colors"
                >
                  Gaming Ping Matrix (12 Clusters)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('capabilities')}
                  className="text-slate-300 hover:text-[#00F0FF] transition-colors"
                >
                  Application Capability Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('docs')}
                  className="text-slate-300 hover:text-[#00F0FF] transition-colors"
                >
                  RFC Standards & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Skuuy Network Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFE600] font-mono">
              Ecosystem Hubs
            </h4>
            <ul className="space-y-2 text-xs font-mono font-bold">
              <li>
                <a
                  href="https://skuuy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#FFE600] transition-colors flex items-center gap-1 font-bold"
                >
                  <span>→ Skuuy Master Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://mcp.skuuy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00E676] hover:text-emerald-300 transition-colors flex items-center gap-1 font-black"
                >
                  <span>Skuuy MCP Server (AI)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://bin.skuuy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-[#FFE600] transition-colors flex items-center gap-1"
                >
                  <span>Webhook & Request Bin</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://read.skuuy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-[#FFE600] transition-colors flex items-center gap-1"
                >
                  <span>URL to Clean Markdown</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://dns.skuuy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-[#FFE600] transition-colors flex items-center gap-1"
                >
                  <span>DNS Matrix & DNSSEC</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ip.skuuy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-[#00F0FF] transition-colors flex items-center gap-1"
                >
                  <span>IP & Leak Suite</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://2fa.skuuy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-[#FF007F] transition-colors flex items-center gap-1"
                >
                  <span>2FA Online Authenticator</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://mail.skuuy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-[#00E676] transition-colors flex items-center gap-1"
                >
                  <span>Temp Mail & OTP Suite</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://proxy.skuuy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-[#FFE600] transition-colors flex items-center gap-1"
                >
                  <span>Free Proxy Hub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Context */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF007F] font-mono">
              Legal & Machine Context
            </h4>
            <ul className="space-y-2 text-xs font-mono font-bold">
              <li>
                <button
                  onClick={() => onSelectTab('privacy')}
                  className="text-slate-300 hover:text-[#00F0FF] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('terms')}
                  className="text-slate-300 hover:text-[#00F0FF] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('disclaimer')}
                  className="text-slate-300 hover:text-[#00F0FF] transition-colors"
                >
                  Network Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t-2 border-slate-900 text-center text-[11px] text-slate-500 font-mono">
          <p>
            Disclaimer: Speed metrics, loaded latency, and gaming estimates reflect real-time performance against Anycast edge infrastructure. Local device hardware, Wi-Fi conditions, and ISP traffic shaping can influence individual test results.
          </p>
        </div>
      </div>
    </footer>
  );
};
