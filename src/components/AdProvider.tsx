'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdSlot from './AdSlot';

export default function AdProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initial load: Try to trigger interstitial immediately
    if (typeof window !== 'undefined' && window.googletag) {
      window.googletag.cmd.push(() => {
        const slots = window.googletag.pubads().getSlots();
        const interstitialSlots = slots.filter((slot: any) => 
          slot.getAdUnitPath().includes('interstitial')
        );
        if (interstitialSlots.length > 0) {
          console.log('Initial load: Refreshing interstitial');
          window.googletag.pubads().refresh(interstitialSlots);
        }
      });
    }
  }, []);

  useEffect(() => {
    // Navigation refresh: Refresh interstitials on pathname change
    if (typeof window !== 'undefined' && window.googletag && window.googletag.pubads) {
      window.googletag.cmd.push(() => {
        const slots = window.googletag.pubads().getSlots();
        const interstitialSlots = slots.filter((slot: any) => 
          slot.getAdUnitPath().includes('interstitial') || 
          slot.getSlotElementId()?.includes('interstitial')
        );
        
        if (interstitialSlots.length > 0) {
          console.log('Navigation: Refreshing interstitial to:', pathname);
          window.googletag.pubads().refresh(interstitialSlots);
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
