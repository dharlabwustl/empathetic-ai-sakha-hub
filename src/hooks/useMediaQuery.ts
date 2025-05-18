
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Initial check for SSR or test environments
    if (typeof window === 'undefined' || !window.matchMedia) {
      // Set a default value based on common mobile breakpoints
      const isMobileByDefault = typeof window !== 'undefined' && 
        window.innerWidth !== undefined && 
        window.innerWidth < 768;
      setMatches(isMobileByDefault);
      return;
    }
    
    // Create the media query
    const media = window.matchMedia(query);
    
    // Set the initial value immediately
    setMatches(media.matches);

    // Define update function
    const updateMatches = () => setMatches(media.matches);
    
    // Add the callback as a listener
    media.addEventListener('change', updateMatches);
    
    // Remove the listener on cleanup
    return () => media.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
}

// Common breakpoint helpers
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

// Additional helper for really small screens
export const useIsSmallMobile = () => useMediaQuery('(max-width: 375px)');
