
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Brain, BookOpen } from 'lucide-react';

const PostLoginPrompt = () => {
  const navigate = useNavigate();

  // Check if user data exists in localStorage
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      // If no user data, redirect to login
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleContinueToDashboard = () => {
    // Ensure we're setting proper localStorage values
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        // Make sure we mark onboarding as completed
        localStorage.setItem('userData', JSON.stringify({
          ...parsedData,
          completedOnboarding: true,
          sawWelcomeTour: true
        }));
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
    
    // Use absolute path with replace to avoid navigation issues
    navigate('/dashboard/student', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="mb-8 text-center">
            <img src="/assets/logo.svg" alt="PREPZR Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back to PREPZR!
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Your personalized study journey continues
            </p>
          </div>
          
          <Card className="shadow-lg border-0 overflow-hidden mb-8">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Your Progress</h2>
                    <p className="opacity-90">
                      We've been tracking your learning journey. Here's a quick overview of your progress:
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Weekly study goal</span>
                          <span>75% complete</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full">
                          <div className="h-full bg-white rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Concept mastery</span>
                          <span>62% complete</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full">
                          <div className="h-full bg-white rounded-full" style={{ width: "62%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Practice questions</span>
                          <span>48% complete</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full">
                          <div className="h-full bg-white rounded-full" style={{ width: "48%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 bg-white dark:bg-gray-900">
                  <h3 className="text-xl font-medium mb-4">Continue where you left off</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-full">
                        <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <p className="font-medium">Chemical Bonding</p>
                        <p className="text-sm text-muted-foreground">75% complete • Last studied 2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                        <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Electromagnetic Induction</p>
                        <p className="text-sm text-muted-foreground">42% complete • Last studied 4 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Weekly Assessment</p>
                        <p className="text-sm text-muted-foreground">Due in 2 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-center">
              <Button 
                onClick={handleContinueToDashboard}
                size="lg" 
                className="px-8 bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PREPZR. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLoginPrompt;
