
import React from 'react';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  // Set the flag that this is a new user signup
  localStorage.setItem('new_user_signup', 'true');
  localStorage.setItem('isLoggedIn', 'true');
  
  // Create a minimal user data object to avoid errors
  const userData = {
    id: `user_${Date.now()}`,
    name: "New User",
    email: `user${Date.now()}@example.com`,
    role: 'student',
    isFirstTimeUser: true
  };
  
  // Store it in localStorage for downstream components
  localStorage.setItem('userData', JSON.stringify(userData));
  
  // Navigate directly to welcome page (skipping login)
  return <Navigate to="/welcome" replace />;
};

export default Signup;
