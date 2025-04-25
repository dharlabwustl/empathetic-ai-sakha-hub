
import { ReactNode } from 'react';
import { AuthProvider as CustomAuthProvider } from '@/contexts/auth/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <CustomAuthProvider>{children}</CustomAuthProvider>;
};

export default AuthProvider;
