
import * as React from "react"

// Updated mobile breakpoint to match standard Tailwind breakpoints
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      return window.innerWidth < MOBILE_BREAKPOINT;
    };
    
    // Set initial value
    setIsMobile(checkIsMobile());
    
    // Add event listener for resize
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
    
    window.addEventListener('resize', handleResize);
    
    // Create media query list for more efficient listening
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mql.removeEventListener("change", handleResize);
    }
  }, [])

  return isMobile
}

// Additional helper hooks for more specific breakpoints
export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    // Tablet range: 768px to 1023px
    const checkIsTablet = () => {
      return window.innerWidth >= 768 && window.innerWidth < 1024
    }
    
    setIsTablet(checkIsTablet())
    
    const handleResize = () => {
      setIsTablet(checkIsTablet())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return isTablet
}

export function useIsMobileOrTablet() {
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    // Mobile or tablet: < 1024px
    const checkIsMobileOrTablet = () => {
      return window.innerWidth < 1024
    }
    
    setIsMobileOrTablet(checkIsMobileOrTablet())
    
    const handleResize = () => {
      setIsMobileOrTablet(checkIsMobileOrTablet())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return isMobileOrTablet
}
