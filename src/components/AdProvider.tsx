'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdSlot from './AdSlot';

export default function AdProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Refresh interstitials on navigation
    if (typeof window !== 'undefined' && window.googletag && window.googletag.pubads) {
      window.googletag.cmd.push(() => {
        // Find interstitial slots and refresh them
        const slots = window.googletag.pubads().getSlots();
        const interstitialSlots = slots.filter((slot: any) => 
          slot.getAdUnitPath().includes('interstitial') || 
          slot.getSlotElementId().includes('interstitial')
        );
        
        if (interstitialSlots.length > 0) {
          console.log('Refreshing interstitials on navigation to:', pathname);
          window.googletag.pubads().refresh(interstitialSlots);
        } else {
          // If not defined yet, AdSlot will handle initial display
          // But we can force a global refresh for auto-ads if any
          window.googletag.pubads().refresh();
        }
      });
    }
  }, [pathname]);

  return (
    <>
      {children}
      {/* Global Sticky Bottom Banner */}
      <AdSlot format="anchor" slotId="mobile-anchor" />
      {/* Global Interstitial definition */}
      <AdSlot format="interstitial" slotId="interstitial" />
    </>
  );
}
