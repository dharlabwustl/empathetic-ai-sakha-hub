
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create the media query
    const media = window.matchMedia(query);
    
    // Set the initial value
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
