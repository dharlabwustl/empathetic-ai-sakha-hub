
import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design media queries
 * @param query The media query string to evaluate
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Create the media query list
    const media = window.matchMedia(query);
    
    // Initial check
    setMatches(media.matches);
    
    // Define listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the listener
    // Use addEventListener for modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    }
    // Fall back to deprecated addListener for older browsers
    else if ('addListener' in media) {
      // @ts-ignore - TypeScript doesn't know about addListener
      media.addListener(listener);
    }
    
    // Cleanup function
    return () => {
      // Use removeEventListener for modern browsers
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      }
      // Fall back to deprecated removeListener for older browsers
      else if ('removeListener' in media) {
        // @ts-ignore - TypeScript doesn't know about removeListener
        media.removeListener(listener);
      }
    };
  }, [query]);
  
  return matches;
}

export default useMediaQuery;
