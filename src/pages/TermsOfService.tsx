import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-[#FFE600] border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#000000] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-black" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-black font-mono uppercase">
              Terms of Service
            </h1>
            <p className="text-xs font-mono font-bold text-black/80">
              Diagnostic Network Testing Agreement
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
            1. Service Description
          </h2>
          <p>
            Skuuy Speed (https://speed.skuuy.com) provides edge-based network performance profiling, multithreaded bandwidth throughput tests, bufferbloat responsiveness (Round-trips Per Minute / RPM) audits according to RFC 8290, and gaming datacenter latency estimations. All tools are offered free of charge on an "as-is" and "as-available" basis for personal, administrative, and research diagnostics.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-white uppercase text-[#00E676]">
            2. Fair Usage Policy
          </h2>
          <p>
            Because bandwidth tests saturate your internet downlink and uplink for high-precision measurement, you agree not to automate non-stop continuous load loops through headless botting scripts designed to exhaust edge server compute or cause artificial denial of service. Rate-limiting safeguards are implemented across edge clusters.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-white uppercase text-[#FF007F]">
            3. Limitation of Liability
          </h2>
          <p>
            In no event shall Skuuy or its contributors be held liable for any network data plan charges, cellular overages, or temporary connectivity disruptions resulting from high-throughput speed test diagnostics. Users on metered or capped connections should exercise discretion before running continuous multithreaded tests.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
          Last revised: September 2026.
        </div>
      </div>
    </div>
  );
};
