
import { ThemeProvider as CustomThemeProvider, useTheme } from '@/providers/ThemeProvider';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark";
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "sakha-ui-theme",
}: ThemeProviderProps) {
  return (
    <CustomThemeProvider>
      {children}
    </CustomThemeProvider>
  );
}

export { useTheme } from "@/providers/ThemeProvider";
