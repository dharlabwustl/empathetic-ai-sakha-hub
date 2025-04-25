
import { AuthUser } from '@/services/auth/authService';
import authService from '@/services/auth/authService';
import { useToast } from '@/hooks/use-toast';

export const useAuthUtils = () => {
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("AuthUtils - Login attempt with:", { email });
      
      // Check if it's a phone number login
      const isPhoneLogin = email.includes('@sakha.ai');
      
      // If it's a regular login
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        toast({
          title: 'Login successful',
          description: `Welcome back, ${response.data.name}!`,
        });
        
        // For returning users, update loginCount and last login timestamp
        try {
          const userData = localStorage.getItem('userData');
          if (userData) {
            const parsedData = JSON.parse(userData);
            parsedData.loginCount = (parsedData.loginCount || 0) + 1;
            parsedData.lastLogin = new Date().toISOString();
            localStorage.setItem('userData', JSON.stringify(parsedData));
          } else {
            // Create initial user data if it doesn't exist
            const newUserData = {
              loginCount: 1,
              lastLogin: new Date().toISOString(),
              completedOnboarding: true,
              sawWelcomeTour: false
            };
            localStorage.setItem('userData', JSON.stringify(newUserData));
          }
        } catch (error) {
          console.error('Error updating user data:', error);
        }
        
        return true;
      } else {
        // For demo purposes, create a mock user if regular login fails
        console.log("AuthUtils - Creating mock user for demo");
        const phoneNumber = email.replace('@sakha.ai', '');
        
        const mockUser: AuthUser = {
          id: `user_${Date.now()}`,
          name: "Demo User",
          email,
          phoneNumber: isPhoneLogin ? phoneNumber : undefined,
          role: 'student',
          token: `mocktoken_${Date.now()}`
        };
        
        // Save the mock user to auth service
        authService.setAuthData(mockUser);
        
        // Update user data for returning user simulation
        try {
          const userData = localStorage.getItem('userData');
          if (userData) {
            const parsedData = JSON.parse(userData);
            parsedData.loginCount = (parsedData.loginCount || 0) + 1;
            parsedData.lastLogin = new Date().toISOString();
            localStorage.setItem('userData', JSON.stringify(parsedData));
          } else {
            // Create initial user data
            const newUserData = {
              loginCount: 1,
              lastLogin: new Date().toISOString(),
              completedOnboarding: true,
              sawWelcomeTour: false,
              // Add a mock last activity to demonstrate the welcome back dialog
              lastActivity: {
                type: 'concept',
                description: 'Newton\'s Laws of Motion',
                url: '/study/concept-card/physics-101'
              }
            };
            localStorage.setItem('userData', JSON.stringify(newUserData));
          }
        } catch (error) {
          console.error('Error updating user data:', error);
        }
        
        toast({
          title: 'Login successful',
          description: `Welcome back, Demo User!`,
        });
        
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    }
  };

  const handleAdminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        toast({
          title: 'Admin login successful',
          description: `Welcome back, ${response.data.name}!`,
        });
        return true;
      } else {
        toast({
          title: 'Admin login failed',
          description: response.error || 'Invalid email or password',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: 'Login error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    }
  };

  const handleRegister = async (
    name: string, 
    email: string, 
    phoneNumber: string, 
    password: string, 
    role: string = 'student'
  ): Promise<boolean> => {
    console.log("AuthUtils - Registering user:", { name, email, phoneNumber, role });
    
    try {
      const response = await authService.register({
        name,
        email,
        phoneNumber,
        password,
        role
      });
      
      if (response.success && response.data) {
        toast({
          title: 'Registration successful',
          description: `Welcome, ${name}!`,
        });
        
        // Initialize new user data
        const newUserData = {
          name,
          email,
          phoneNumber,
          role,
          loginCount: 1,
          lastLogin: new Date().toISOString(),
          completedOnboarding: false,
          sawWelcomeTour: false
        };
        localStorage.setItem('userData', JSON.stringify(newUserData));
        
        console.log("AuthUtils - Registration complete, user set");
        return true;
      } else {
        toast({
          title: 'Registration failed',
          description: response.error || 'Failed to register user',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await authService.logout();
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out',
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout error',
        description: 'An error occurred while logging out',
        variant: 'destructive',
      });
    }
  };

  return {
    handleLogin,
    handleAdminLogin,
    handleRegister,
    handleLogout
  };
};
