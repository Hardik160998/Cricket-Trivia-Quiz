'use client';

import React, { useEffect, useRef } from 'react';
import { AD_UNITS } from '@/lib/ads';

interface AdSlotProps {
  format: 'banner' | 'anchor' | 'interstitial';
  slotId: string;
  className?: string;
}

declare global {
  interface Window {
    googletag: any;
  }
}

const AdSlot: React.FC<AdSlotProps> = ({ format, slotId, className = '' }) => {
  const adUnit = AD_UNITS[slotId as keyof typeof AD_UNITS];
  const hasDefined = useRef(false);

  useEffect(() => {
    if (!adUnit) return;

    window.googletag = window.googletag || { cmd: [] };
    const { cmd } = window.googletag;

    cmd.push(() => {
      // Safety check for GPT service
      if (!window.googletag?.pubads) {
        console.warn('GPT service not available (likely blocked by ad-blocker)');
        return;
      }

      // Banners
      if (format === 'banner' && 'id' in adUnit && adUnit.id && !hasDefined.current) {
        window.googletag
          .defineSlot(adUnit.path, adUnit.sizes, adUnit.id)
          ?.addService(window.googletag.pubads());
        
        window.googletag.display(adUnit.id);
        hasDefined.current = true;
      } 
      // Anchors
      else if (format === 'anchor' && !hasDefined.current) {
        const anchorSlot = window.googletag.defineOutOfPageSlot(
          adUnit.path,
          window.googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
        );
        if (anchorSlot) {
          anchorSlot.addService(window.googletag.pubads());
          window.googletag.display(anchorSlot);
        }
        hasDefined.current = true;
      } 
      // Interstitials
      else if (format === 'interstitial' && !hasDefined.current) {
         const interstitialSlot = window.googletag.defineOutOfPageSlot(
            adUnit.path,
            window.googletag.enums.OutOfPageFormat.INTERSTITIAL
          );
          if (interstitialSlot) {
            interstitialSlot.addService(window.googletag.pubads());
            window.googletag.display(interstitialSlot);
          }
          hasDefined.current = true;
      }
    });
  }, [adUnit, format, slotId]);

  if (!adUnit) {
    return <div className="text-[10px] text-rose-400 italic">Invalid Ad Slot: {slotId}</div>;
  }

  if (format === 'anchor' || format === 'interstitial') {
    return null;
  }

  return (
    <div className={`flex flex-col items-center my-6 ${className}`}>
      <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-medium">Advertisement</span>
      <div 
        id={'id' in adUnit ? adUnit.id : undefined}
        className="w-full bg-slate-50 flex items-center justify-center border border-dashed border-slate-200 rounded-lg min-h-[50px]"
        style={{ 
          minWidth: (
            'sizes' in adUnit && 
            Array.isArray(adUnit.sizes) && 
            Array.isArray(adUnit.sizes[0]) 
              ? (adUnit.sizes[0] as unknown as number[])[0] 
              : 300
          ) + 'px' 
        }}
      >
        <span className="text-[10px] text-slate-300 italic">Loading Ad...</span>
      </div>
    </div>
  );
};

export default AdSlot;
