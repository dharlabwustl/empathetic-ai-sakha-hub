
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, BookOpen, Brain, Layout, Calendar, Star, GraduationCap } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Welcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Welcome to PREPZR!",
      description: "Your personal AI study partner is ready",
      content: (
        <div className="space-y-4">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mt-4">Your study journey begins now</h2>
            <p className="text-muted-foreground mt-2">
              We've created a personalized learning experience just for you
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex items-start">
              <img 
                src="https://placekitten.com/100/100" 
                alt="Founder" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="font-medium">A message from our founder</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  "Welcome to PREPZR! I created this platform to make learning more effective and personalized. 
                  Your study plan has been crafted based on your unique learning style and goals. 
                  Let's achieve academic excellence together!"
                </p>
                <p className="text-sm font-medium mt-3">
                  - Dr. Atul Sarma, Founder & CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your Dashboard",
      description: "Everything you need in one place",
      content: (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Layout className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Personalized Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your progress and access all your tools
              </p>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
              <GraduationCap className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium">Academic Advisor</h3>
              <p className="text-sm text-muted-foreground">
                View and manage your personalized study plans
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Today's Plan</h3>
              <p className="text-sm text-muted-foreground">
                Your daily learning activities and schedule
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Study Resources",
      description: "Tools for effective learning",
      content: (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-violet-500/10 flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <h3 className="font-medium">Concept Cards</h3>
              <p className="text-sm text-muted-foreground">
                Detailed explanations of key concepts
              </p>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center mr-3">
              <Brain className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-medium">Flashcards</h3>
              <p className="text-sm text-muted-foreground">
                Quick review cards for memorization
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Pro tip:</span> Start with your weaker subjects first, 
              when your mind is fresh and more receptive to challenging topics.
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/dashboard/student');
    }
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-6">
          <PrepzrLogo width={80} className="mx-auto" />
        </div>
        
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>{slides[currentSlide].title}</CardTitle>
            <CardDescription>{slides[currentSlide].description}</CardDescription>
          </CardHeader>
          
          <CardContent className="py-4">
            {slides[currentSlide].content}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full" 
              onClick={handleNext}
            >
              {currentSlide < slides.length - 1 ? (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            <div className="w-full space-y-2">
              <Progress value={progress} className="h-1" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Step {currentSlide + 1} of {slides.length}</span>
                <button 
                  className="underline hover:text-primary"
                  onClick={() => navigate('/dashboard/student')}
                >
                  Skip tour
                </button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Welcome;
