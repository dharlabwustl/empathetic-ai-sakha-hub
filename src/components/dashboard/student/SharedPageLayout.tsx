
import React from 'react';
import { cn } from '@/lib/utils';

interface SharedPageLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({
  children,
  className = '',
  title,
  description,
  showBackButton = false,
  onBack
}) => {
  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30", className)}>
      {(title || description || showBackButton) && (
        <div className="border-b bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {showBackButton && (
              <button onClick={onBack} className="mb-2 text-blue-600 hover:text-blue-800">
                ← Back
              </button>
            )}
            {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
};

export default SharedPageLayout;
