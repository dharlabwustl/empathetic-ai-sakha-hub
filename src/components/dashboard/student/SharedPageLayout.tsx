import React from 'react';
import { UserRole } from '@/types/user/base';
import { UserProfileType } from '@/types/user/base';

interface SharedPageLayoutProps {
  user: UserProfileType | null;
  children: React.ReactNode;
}

const checkUserRole = (userRole: string) => {
  return userRole === UserRole.Student; // Changed from UserRole.Student to UserRole.STUDENT
};

const SharedPageLayout: React.FC<SharedPageLayoutProps> = ({ user, children }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  const isStudent = checkUserRole(user.role);

  if (!isStudent) {
    return <div>Access denied.</div>;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default SharedPageLayout;
