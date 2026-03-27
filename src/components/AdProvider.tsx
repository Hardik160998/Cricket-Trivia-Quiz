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

  useEffect(() => {
    // Custom Click-Triggered Interstitial Setup
    if (typeof window !== 'undefined') {
      let clickSlot: any = null;
      let lastClickTime = 0;

      window.googletag.cmd.push(() => {
        // Define the custom click slot
        try {
          clickSlot = window.googletag.defineSlot(
            '/23314720614/interstitial_quiz_101_1', 
            [1, 1], 
            'div-gpt-ad-1774609339306-0'
          );

          if (clickSlot) {
            clickSlot.addService(window.googletag.companionAds())
                     .addService(window.googletag.pubads());
            
            // These might already be enabled globally, but ensuring they run
            window.googletag.pubads().enableVideoAds();
            window.googletag.companionAds().setRefreshUnfilledSlots(true);
            
            // Initial Display
            window.googletag.display('div-gpt-ad-1774609339306-0');
          }
        } catch (e) {
          console.error("Error setting up click interstitial:", e);
        }
      });

      // Global Click Listener with 1-second throttle
      const handleGlobalClick = () => {
        const now = Date.now();
        if (now - lastClickTime > 1000 && clickSlot && window.googletag.pubads) {
          lastClickTime = now;
          console.log('Global Click: Refreshing click-interstitial');
          window.googletag.cmd.push(() => {
            window.googletag.pubads().refresh([clickSlot]);
          });
        }
      };

      document.addEventListener('click', handleGlobalClick);

      return () => {
        document.removeEventListener('click', handleGlobalClick);
        // Note: GPT slots usually aren't destroyed in React cleanups, 
        // but removing the click listener prevents memory leaks
      };
    }
  }, []);

  return (
    <>
      {children}
      {/* Global Sticky Bottom Banner */}
      <AdSlot format="anchor" slotId="mobile-anchor" />
      {/* Global Interstitial definition (Navigation-based) */}
      <AdSlot format="interstitial" slotId="interstitial" />
      
      {/* Hidden Click-Triggered Interstitial Container */}
      <div 
        id="div-gpt-ad-1774609339306-0" 
        style={{ width: '1px', height: '1px', opacity: 0, position: 'fixed', bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}
      ></div>
    </>
  );
}
