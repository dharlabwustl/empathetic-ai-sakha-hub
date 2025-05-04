
import React from 'react';
import { TooltipProvider as ShadcnTooltipProvider } from '@/components/ui/tooltip';

interface TooltipProviderProps {
  children: React.ReactNode;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <ShadcnTooltipProvider>{children}</ShadcnTooltipProvider>;
};

export default TooltipProvider;
