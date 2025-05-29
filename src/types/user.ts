
export interface UserProfile {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  avatar?: string;
  loginCount?: number;
  goals?: Array<{ title: string }>;
  mood?: string;
}

export interface Kpi {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  icon?: string;
  change?: number;
  changeType?: 'positive' | 'negative';
}
