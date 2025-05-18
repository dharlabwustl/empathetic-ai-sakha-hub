
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
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
