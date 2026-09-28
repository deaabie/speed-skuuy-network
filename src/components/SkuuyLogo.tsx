import React from 'react';

interface SkuuyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SkuuyLogo: React.FC<SkuuyLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Icon Badge */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#00F0FF] border-2 border-black shadow-[2px_2px_0px_0px_#000000] overflow-hidden">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-black stroke-[2.5]" fill="none" stroke="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>

      {/* Text Branding */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white uppercase ${sizeClasses[size]}`}>
            SKUUY
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-black uppercase rounded bg-[#FFE600] text-black border border-black shadow-[1.5px_1.5px_0px_0px_#000000]">
            SPEED
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#00F0FF] tracking-wider uppercase">
          EDGE LAB & BUFFERBLOAT
        </span>
      </div>
    </div>
  );
};
