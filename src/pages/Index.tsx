
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <header className="py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
            alt="Sakha AI Logo"
            className="w-10 h-10 mr-2"
          />
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Sakha AI
          </span>
        </div>
        <div className="flex space-x-2">
          {isAuthenticated ? (
            <Link to="/dashboard/student">
              <Button variant="ghost" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your AI Study Companion
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Enhance your learning journey with personalized study plans, intelligent concept cards, and AI-powered tutoring.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Login
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-4">
              🧠
            </div>
            <h3 className="text-xl font-bold text-gray-800">Interactive Concept Cards</h3>
            <p className="mt-2 text-gray-600">
              Master complex topics with our visual concept cards designed for better retention and understanding.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="text-xl font-bold text-gray-800">Personalized Study Plans</h3>
            <p className="mt-2 text-gray-600">
              Get customized study schedules and recommendations based on your learning style and goals.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-4">
              🤖
            </div>
            <h3 className="text-xl font-bold text-gray-800">AI Tutoring</h3>
            <p className="mt-2 text-gray-600">
              Get help whenever you need it with our AI tutor that adapts to your learning needs.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-24 py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <img
                  src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
                  alt="Sakha AI Logo"
                  className="w-8 h-8 mr-2"
                />
                <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Sakha AI
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Your personalized AI study companion
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Product</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-base text-gray-600 hover:text-indigo-600">Features</a></li>
                  <li><a href="#" className="text-base text-gray-600 hover:text-indigo-600">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-base text-gray-600 hover:text-indigo-600">About</a></li>
                  <li><a href="#" className="text-base text-gray-600 hover:text-indigo-600">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-base text-gray-600 hover:text-indigo-600">Privacy</a></li>
                  <li><a href="#" className="text-base text-gray-600 hover:text-indigo-600">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} Sakha AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
