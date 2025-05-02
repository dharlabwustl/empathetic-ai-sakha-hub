
import React, { createContext, useContext } from 'react';
import { AuthProvider as OriginalAuthProvider, useAuth as originalUseAuth } from '@/contexts/auth/AuthContext';

// Re-export the useAuth hook from AuthContext for backwards compatibility
export const useAuth = originalUseAuth;

// Re-export the AuthProvider component
export const AuthProvider = OriginalAuthProvider;

export default useAuth;
