
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface SharedPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  badgeText?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
}

export function SharedPageLayout({
  title,
  subtitle,
  children,
  badgeText,
  actions,
  footer,
  headerClassName = "",
  contentClassName = "",
  footerClassName = "",
}: SharedPageLayoutProps) {
  return (
    <Card className="border bg-card shadow-sm">
      {/* Header */}
      <div className={`border-b p-4 ${headerClassName}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
              {badgeText && <Badge variant="outline">{badgeText}</Badge>}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 sm:ml-auto">{actions}</div>}
        </div>
      </div>
      
      {/* Content */}
      <div className={`p-4 ${contentClassName}`}>{children}</div>
      
      {/* Footer (if provided) */}
      {footer && <div className={`border-t p-4 ${footerClassName}`}>{footer}</div>}
    </Card>
  );
}
