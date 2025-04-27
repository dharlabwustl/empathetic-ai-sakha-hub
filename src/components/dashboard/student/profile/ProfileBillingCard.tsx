
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, CreditCard, FileText, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/dateUtils';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}

interface ProfileBillingCardProps {
  invoices?: Invoice[];
  onManagePaymentMethods: () => void;
}

const ProfileBillingCard: React.FC<ProfileBillingCardProps> = ({ 
  invoices = [], 
  onManagePaymentMethods 
}) => {
  // Mock invoices if none provided
  const billingHistory = invoices.length > 0 ? invoices : [
    { id: 'INV-001', date: '2025-03-15', amount: 999, status: 'paid' },
    { id: 'INV-002', date: '2025-02-15', amount: 999, status: 'paid' },
    { id: 'INV-003', date: '2025-01-15', amount: 999, status: 'paid' },
  ];

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Billing Information</CardTitle>
        <Button size="sm" variant="outline" onClick={onManagePaymentMethods}>
          <CreditCard className="mr-2 h-4 w-4" />
          Manage Payment Methods
        </Button>
      </CardHeader>
      <CardContent>
        <h3 className="text-sm font-medium mb-2">Payment History</h3>
        
        <div className="space-y-2">
          {billingHistory.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{invoice.id}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(invoice.date)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-3">
                  ${(invoice.amount / 100).toFixed(2)}
                </span>
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
          View All Invoices
          <ChevronRight className="ml-auto h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileBillingCard;
