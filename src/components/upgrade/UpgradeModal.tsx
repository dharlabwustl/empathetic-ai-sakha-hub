
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { useSubscriptionFlow } from "@/contexts/SubscriptionFlowContext";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  feature: string;
  requiredPlan: string;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ 
  open, 
  onClose, 
  feature, 
  requiredPlan 
}) => {
  const { startSubscriptionFlow } = useSubscriptionFlow();

  const handleUpgrade = () => {
    startSubscriptionFlow(requiredPlan.toLowerCase().replace(/\s+/g, '-'));
    onClose();
  };

  const planDisplayName = requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1);

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Upgrade to {planDisplayName}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="space-y-4 py-4 px-2">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700">Premium Feature</h3>
            <p className="text-sm text-blue-600 mt-1">
              {feature} is available exclusively to our {planDisplayName} subscribers.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Upgrade now to get access to:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">✓</span>
                <span>All {planDisplayName} level features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-700 group"
            >
              <span>Upgrade to {planDisplayName}</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
