import React, { useEffect, useRef } from 'react';
import { AdSettings } from '../types/speed';

interface AdBannerProps {
  slot: 'header' | 'result' | 'footer';
  adSettings: AdSettings;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slot,
  adSettings,
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  if (!adSettings.enabled) {
    return null;
  }

  if (adSettings.useCustomHtml && adSettings.customBannerHtml) {
    return (
      <div
        className={`w-full overflow-hidden my-4 flex justify-center ${className}`}
        dangerouslySetInnerHTML={{ __html: adSettings.customBannerHtml }}
      />
    );
  }

  const slotMap: Record<string, string> = {
    header: adSettings.headerSlotId,
    result: adSettings.resultSlotId,
    footer: adSettings.footerSlotId
  };

  const currentSlotId = slotMap[slot] || adSettings.headerSlotId;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {}
  }, [currentSlotId]);

  return (
    <div
      ref={adRef}
      className={`w-full my-4 flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-800 bg-slate-900/40 p-2 min-h-[90px] ${className}`}
    >
      <div className="w-full text-center">
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
          SPONSORED
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adSettings.clientId}
          data-ad-slot={currentSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
