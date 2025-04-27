
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  stats?: {
    label: string;
    value: string;
  }[];
}

export function SharedPageLayout({ title, subtitle, icon, children, stats }: SharedPageLayoutProps) {
  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="space-y-3 pb-2">
        <div className="flex items-center space-x-2">
          {icon && <span>{icon}</span>}
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
        
        {subtitle && (
          <h3 className="text-base text-muted-foreground">
            {subtitle}
          </h3>
        )}
        
        {stats && (
          <div className="flex flex-wrap gap-4">
            {stats.map((stat, index) => (
              <Badge key={index} variant="outline" className="font-normal">
                {stat.label}: {stat.value}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div>
        {children}
      </div>
    </div>
  );
}
