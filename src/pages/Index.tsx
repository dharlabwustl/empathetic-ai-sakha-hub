
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
          Sakha AI
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
          Your personalized AI learning companion for exam preparation
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
          <Link to="/login">
            <Button className="w-full" size="lg">
              Login
            </Button>
          </Link>
          
          <Link to="/signup">
            <Button variant="outline" className="w-full" size="lg">
              Sign Up
            </Button>
          </Link>
          
          <Link to="/dashboard/student" className="md:col-span-2">
            <Button variant="secondary" className="w-full" size="lg">
              Student Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="mt-16">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Prepare for exams more effectively with personalized study plans and AI assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
