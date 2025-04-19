
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard/student');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login to Sakha AI</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="your@email.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="••••••••" 
            />
          </div>
          
          <div className="pt-2">
            <button 
              className="w-full bg-primary text-primary-foreground py-2 rounded-md"
              onClick={() => handleLogin('demo@example.com', 'password')}
            >
              Login
            </button>
          </div>
          
          <div className="text-center text-sm">
            <p>Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
