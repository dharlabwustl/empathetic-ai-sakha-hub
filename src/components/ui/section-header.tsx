
import React from 'react';

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      {title && <h1 className="text-2xl font-bold text-foreground">{title}</h1>}
      {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
};
