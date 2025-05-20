
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Admin = "admin"
}

export enum MoodType {
  HAPPY = "HAPPY",
  MOTIVATED = "MOTIVATED",
  OKAY = "OKAY",
  STRESSED = "STRESSED",
  TIRED = "TIRED",
  FOCUSED = "FOCUSED",
  CONFUSED = "CONFUSED",
  BORED = "BORED",
  EXCITED = "EXCITED",
  CALM = "CALM",
  SAD = "SAD"
}

export interface UserProfileBase {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: UserRole;
  institution?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  goals?: { id: string; title: string }[];
  currentMood?: MoodType | null;
  lastActive?: Date | string;
  location?: string;
  grade?: string;
  paymentMethods?: any[];
  billingHistory?: any[];
}

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export interface UserAuthState {
  isAuthenticated: boolean;
  user: UserProfileBase | null;
  loading: boolean;
  error: string | null;
}
