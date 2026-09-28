import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

interface DisclaimerProps {
  onBack: () => void;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-[#FF007F] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-white" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
              Network Disclaimer
            </h1>
            <p className="text-xs font-mono font-bold text-white/80">
              Throughput Measurement & Latency Estimation Notice
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-lg bg-black text-white font-mono font-bold text-xs uppercase hover:bg-white hover:text-black border-2 border-black transition-colors flex items-center gap-1 shadow-[2px_2px_0px_0px_#000000]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      <div className="bg-[#161922] border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000000] text-slate-300 font-mono text-xs sm:text-sm space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-black text-white uppercase text-[#FFE600]">
            1. Real-World Variance in Speed Results
          </h2>
          <p>
            Measurements recorded by Skuuy Speed represent throughput and round-trip time between your browser and nearest edge Anycast CDN nodes at the exact moment of execution. Actual real-world speeds are influenced by Wi-Fi signal interference, router CPU limitations, background software updates, network adapter drivers, and ISP traffic management policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-white uppercase text-[#00F0FF]">
            2. Gaming & Cloud Latency Estimates
          </h2>
          <p>
            Global gaming cluster ping metrics are measured via HTTP/HTTPS ping probes to corresponding regional cloud datacenters (AWS, GCP, Azure, Cloudflare). In-game ping may slightly differ due to proprietary game server tick rates, UDP encapsulation, and private peering agreements between your ISP and publisher backbones.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-white uppercase text-[#00E676]">
            3. SQM & Bufferbloat Remedies
          </h2>
          <p>
            Recommendations provided for resolving bufferbloat (such as Smart Queue Management, CAKE, and FQ-CoDel algorithms) are technical advisories based on RFC 8290. Configuring third-party router firmware (OpenWrt, pfSense, OPNsense) should be done with care according to your router manufacturer's guidelines.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
          Last revised: September 2026.
        </div>
      </div>
    </div>
  );
};
