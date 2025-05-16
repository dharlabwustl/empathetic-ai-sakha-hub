
// Simple auth service with mock functionality
// In a real app, this would interact with a backend API

import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
import { validateCredentials } from './accountData';
import { UserRole } from '@/types/user/base';

// Auth service types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  completedOnboarding?: boolean;
}

// Auth service with mock functions
const authService = {
  // Login function
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    console.log("Auth service: login attempt for", credentials.email);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const validLogin = validateCredentials(credentials.email, credentials.password);
      
      if (validLogin) {
        // Generate a mock token and user
        const mockToken = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        const user: User = {
          id: '1',
          name: "Test User",
          email: credentials.email,
          role: "student",
          avatar: "https://ui-avatars.com/api/?name=Test+User&background=random"
        };
        
        // Store token in localStorage
        localStorage.setItem("authToken", mockToken);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        
        return {
          success: true,
          data: user,
          message: "Login successful"
        };
      } else {
        return {
          success: false,
          data: null,
          message: "Invalid credentials"
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        data: null,
        message: "An error occurred during login"
      };
    }
  },
  
  // Signup function
  async signup(credentials: SignupCredentials): Promise<ApiResponse<User>> {
    console.log("Auth service: signup attempt for", credentials.email);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user
      const newUser: User = {
        id: `user_${Math.floor(Math.random() * 10000)}`,
        name: credentials.name,
        email: credentials.email,
        role: "student",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name)}&background=random`
      };
      
      // Generate mock auth token
      const mockToken = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      // Store user data for immediate access after signup
      localStorage.setItem("authToken", mockToken);
      
      // IMPORTANT: Set these values to ensure the user is fully logged in after signup
      const userDataObj = {
        ...newUser,
        role: UserRole.Student,
        isFirstTimeUser: true
      };
      
      // Important - set these values to ensure user is logged in after signup
      localStorage.setItem('userData', JSON.stringify(userDataObj));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('new_user_signup', 'true');
      localStorage.setItem('completedOnboarding', 'true');
      
      // Dispatch auth state changed event to trigger re-renders
      window.dispatchEvent(new Event('auth-state-changed'));
      
      return {
        success: true,
        data: newUser,
        message: "Account created successfully"
      };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        data: null,
        message: "An error occurred during signup"
      };
    }
  },
  
  // Logout function
  async logout(): Promise<void> {
    console.log("Auth service: executing logout");
    
    // Clear auth data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    
    // Clear other session data
    localStorage.removeItem('completedOnboarding');
    localStorage.removeItem('new_user_signup');
    sessionStorage.removeItem('hasSeenSplash');
    
    // Dispatch auth state changed event
    window.dispatchEvent(new Event('auth-state-changed'));
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem("isLoggedIn") === "true";
  },
  
  // Get current user
  getCurrentUser(): User | null {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  },
  
  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    console.log("Auth service: updating user profile");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get current user data
      const currentUserData = localStorage.getItem("userData");
      if (!currentUserData) {
        return {
          success: false,
          data: null,
          message: "No user is logged in"
        };
      }
      
      // Update user data
      const currentUser = JSON.parse(currentUserData);
      const updatedUser = { ...currentUser, ...userData };
      
      // Store updated user data
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      
      return {
        success: true,
        data: updatedUser,
        message: "Profile updated successfully"
      };
    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        data: null,
        message: "An error occurred while updating profile"
      };
    }
  }
};

export default authService;
