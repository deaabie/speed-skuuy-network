import React from 'react';
import { AlertOctagon, ArrowLeft, Home, Zap } from 'lucide-react';

interface NotFoundPageProps {
  onBack: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
      <div className="rounded-3xl bg-[#FF007F] border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0px_0px_#000000] text-white space-y-5">
        <div className="w-20 h-20 rounded-2xl bg-black border-3 border-white flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_#FFFFFF]">
          <AlertOctagon className="w-10 h-10 text-[#FFE600]" />
        </div>

        <div className="text-6xl sm:text-8xl font-black font-mono tracking-tighter text-[#FFE600] drop-shadow-[4px_4px_0px_#000000]">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-mono">
            Speedtest Endpoint Not Found
          </h1>
          <p className="text-xs sm:text-sm font-bold text-white/90 max-w-md mx-auto font-mono">
            The diagnostic route or edge test endpoint you are attempting to reach does not exist on Skuuy Speed.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FFE600] text-black hover:bg-white border-3 border-black text-xs font-mono font-black uppercase shadow-[3px_3px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-black" />
            <span>Return to Speedtest Lab</span>
          </button>
          <a
            href="https://skuuy.com"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-black hover:bg-[#00F0FF] border-3 border-black text-xs font-mono font-black uppercase shadow-[3px_3px_0px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-black" />
            <span>Skuuy Master Portal</span>
          </a>
        </div>
      </div>
    </div>
  );
};
