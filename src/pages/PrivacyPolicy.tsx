import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-[#FFE600] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-black" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-black font-mono uppercase">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono font-bold text-black/80">
              Zero-Logging Telemetry & AdSense Compliance
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
          <h2 className="text-base font-black text-white uppercase text-[#00F0FF]">
            1. Zero Telemetry & Bandwidth Data Storage
          </h2>
          <p>
            Skuuy Speed (https://speed.skuuy.com) executes internet throughput, loaded bufferbloat latency, and gaming ping evaluations entirely in real-time between your browser runtime and geographically distributed Cloudflare edge Anycast points of presence (PoPs). We do not record, store, sell, or analyze your bandwidth payload, download/upload throughput history, or IP addresses on persistent centralized databases.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-white uppercase text-[#00E676]">
            2. Google AdSense & Advertising Disclosures
          </h2>
          <p>
            To keep Skuuy Speed 100% free and open for all users without bandwidth caps, paywalls, or accounts, this application integrates Google AdSense (Publisher ID: ca-pub-8440630877434169). Third-party vendors, including Google, utilize cookies to serve contextual or interest-based advertisements based on prior visits to our utilities or other web resources. You can configure or opt out of personalized advertising anytime via Google Ads Settings (https://adssettings.google.com).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-white uppercase text-[#FF007F]">
            3. Local Browser Storage Only
          </h2>
          <p>
            Any custom settings, recent speed test results, or administrative configurations are stored strictly inside your browser's local sandbox (HTML5 LocalStorage and SessionStorage). These tokens are ephemeral and never transmitted to external third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-white uppercase text-[#FFE600]">
            4. Real-Time Diagnostics & Third-Party Edge PoPs
          </h2>
          <p>
            Speed measurement chucks are fetched from and streamed to high-capacity Content Delivery Network (CDN) edge nodes to benchmark raw link capacity. The payloads consist of pseudorandom binary streams with zero identifying user metadata.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
          Last revised: September 2026 • Governed under Skuuy Network Zero-Knowledge Principles.
        </div>
      </div>
    </div>
  );
};
