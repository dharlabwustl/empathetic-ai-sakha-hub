
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Sakha Learning</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Your personalized learning companion for exam preparation and academic excellence
      </p>
      <div className="flex gap-4">
        <Button asChild variant="default">
          <Link to="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/login">Log In</Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
