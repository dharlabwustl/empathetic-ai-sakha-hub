
import { UserRole } from './base';

export interface ContactInfo {
  phoneNumber?: string;
  email: string;
  city?: string;
  state?: string;
  address?: string;
}

export interface EducationInfo {
  school?: string;
  grade?: string;
  board?: string;
  field?: string;
  degree?: string;
  university?: string;
}

export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  occupation?: string;
  location?: string;
}

export interface UserProfileExtended {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  educationInfo: EducationInfo;
}

export interface SubscriptionDetails {
  planName: string;
  status: 'active' | 'inactive' | 'trial';
  endDate: string;
  isGroupLeader?: boolean;
  plan?: string;
  expiresAt?: string;
  id?: string;
}

export type PersonalityType = {
  type: string;
  traits: string[];
  learningStyle: string;
};
