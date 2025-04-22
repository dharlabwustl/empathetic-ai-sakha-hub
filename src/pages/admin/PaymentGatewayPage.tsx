
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AdminSettings } from '@/types/admin';
import AdminLayout from '@/components/admin/AdminLayout';
import PaymentGatewayTab from '@/components/admin/dashboard/tabs/PaymentGatewayTab';

const PaymentGatewayPage = () => {
  const { toast } = useToast();
  
  // Mock admin settings
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    siteName: "Sakha AI",
    siteDescription: "AI-powered Education Platform",
    contactEmail: "support@sakhai.edu",
    enableRegistration: true,
    enableGuestCheckout: false,
    maintenanceMode: false,
    theme: 'light',
    features: {
      tutorChat: true,
      feelGood: true,
      moodTracking: true,
      surroundingInfluences: true
    },
    paymentGateway: {
      provider: 'stripe',
      isLive: false,
      apiKey: '',
      secretKey: '',
      webhookSecret: '',
      redirectUrl: window.location.origin + '/payment/success'
    }
  });
  
  const handleUpdateSettings = (updates: Partial<AdminSettings>) => {
    setAdminSettings({
      ...adminSettings,
      ...updates
    });
    
    toast({
      title: "Settings Updated",
      description: "Your changes have been saved successfully."
    });
  };

  return (
    <AdminLayout>
      <PaymentGatewayTab 
        settings={adminSettings}
        onUpdateSettings={handleUpdateSettings}
      />
    </AdminLayout>
  );
};

export default PaymentGatewayPage;
