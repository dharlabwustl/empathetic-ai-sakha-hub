
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, BookOpen, Brain, FileText, Clock, Calendar } from 'lucide-react';
import { useTheme } from "@/providers/ThemeProvider";
import QuickAccess from './QuickAccess';

interface SharedPageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackLink?: boolean;
  backLinkText?: string;
  backLinkUrl?: string;
  showQuickAccess?: boolean;
}

export function SharedPageLayout({
  children,
  title,
  subtitle,
  showBackLink = false,
  backLinkText = "Back",
  backLinkUrl = "/dashboard/student/overview",
  showQuickAccess = true
}: SharedPageLayoutProps) {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        {showBackLink && (
          <Link to={backLinkUrl} className="text-sm text-blue-600 hover:underline inline-flex items-center mb-2">
            <ChevronLeft size={16} className="mr-1" />
            {backLinkText}
          </Link>
        )}
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {children}
        </div>
        
        {showQuickAccess && (
          <div className="space-y-6">
            <QuickAccess />
          </div>
        )}
      </div>
    </div>
  );
}
