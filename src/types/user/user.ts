
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription?: {
    type: string;
    planType: string;
    status: 'active' | 'expired' | 'cancelled';
    startDate: string | Date;
    expiryDate: string | Date;
  };
}
