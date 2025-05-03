
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeProps {
  language?: string;
  className?: string;
  children: React.ReactNode;
}

export const Code = ({ language, className, children }: CodeProps) => {
  return (
    <pre className={cn(
      "p-4 rounded-md font-mono text-sm overflow-auto",
      language && `language-${language}`,
      className
    )}>
      <code>{children}</code>
    </pre>
  );
};
