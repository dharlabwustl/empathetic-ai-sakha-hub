
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { SubscriptionType } from '@/types/user/base';

interface FeatureItem {
  name: string;
  free: boolean;
  pro: boolean;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: FeatureItem[];
  buttonText: string;
  currentPlan?: string;
  recommended?: boolean;
  onSelect: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  features,
  buttonText,
  currentPlan,
  recommended = false,
  onSelect,
}) => {
  const isCurrentPlan = currentPlan === title.toLowerCase();

  // Helper to handle SubscriptionType enum
  const isFreePlan = title.toLowerCase() === SubscriptionType.FREE.toLowerCase();

  return (
    <Card className={`relative overflow-hidden transition-all duration-200 ${
      recommended ? 'border-primary shadow-lg' : 'border-border'
    }`}>
      {recommended && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-bl">
            Recommended
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              recommended ? 'bg-primary/20' : 'bg-muted'
            }`}>
              {icon}
            </div>
            <h3 className="ml-3 text-lg font-semibold">{title}</h3>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-6">{description}</p>
        
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              {isFreePlan ? (
                feature.free ? (
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                ) : (
                  <X className="h-4 w-4 text-gray-300 mr-2 flex-shrink-0" />
                )
              ) : (
                feature.pro ? (
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                ) : (
                  <X className="h-4 w-4 text-gray-300 mr-2 flex-shrink-0" />
                )
              )}
              <span className={`text-sm ${!feature.free && isFreePlan ? 'text-muted-foreground' : ''}`}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>
        
        <Button
          onClick={onSelect}
          className="w-full"
          variant={isCurrentPlan ? "outline" : recommended ? "default" : "outline"}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? "Current Plan" : buttonText}
        </Button>
      </div>
    </Card>
  );
};

export default FeatureCard;
