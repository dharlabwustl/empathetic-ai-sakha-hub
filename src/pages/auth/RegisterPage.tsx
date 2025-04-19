
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleRegister = async () => {
    const success = await register('New User', 'user@example.com', '9876543210', 'password', 'student');
    if (success) {
      navigate('/dashboard/student');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register for Sakha AI</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="John Doe" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="your@email.com" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border rounded-md"
              placeholder="+91 9876543210" 
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
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
          
          <div className="text-center text-sm">
            <p>Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
