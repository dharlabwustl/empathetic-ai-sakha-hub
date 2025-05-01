
export enum UserRole {
  Student = 'student',
  Tutor = 'tutor',
  Admin = 'admin',
  Parent = 'parent'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions?: string[];
}
