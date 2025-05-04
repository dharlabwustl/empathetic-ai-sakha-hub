
import { useContext } from 'react';
import { createContext, useContext as reactUseContext } from 'react';

// Define the theme context type
type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
};

// Create the theme context with default values
const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: 'system',
  setTheme: () => null,
});

export const useTheme = () => {
  const context = reactUseContext(ThemeProviderContext);
  
  if (context === undefined)
    return { theme: 'light', setTheme: () => null };
    
  return context;
};
