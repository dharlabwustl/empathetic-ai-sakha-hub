
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, BookOpen, CheckSquare, Clock } from "lucide-react";
import PostLoginRedirect from '@/components/login/PostLoginRedirect';

const PostLoginWelcomeBack = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from your API
  const lastActivity = {
    type: 'concept',
    id: '123',
    description: 'Physics: Newton\'s Laws of Motion',
    timestamp: '2 days ago'
  };
  
  // After a short timeout, show the dialog
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle when the dialog is closed
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    
    // If dialog is closed, navigate to dashboard
    if (!open) {
      navigate('/dashboard/student/today');
    }
  };
  
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900/20">
      <Card className="max-w-md w-full p-6 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Loading your personalized dashboard...</p>
        </div>
        
        <Progress value={100} className="mb-6" />
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-indigo-600" />
            <span>Today's Tasks: 4</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckSquare className="h-4 w-4 text-green-600" />
            <span>Completed: 1</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-amber-600" />
            <span>Pending: 3</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-purple-600" />
            <span>Study time: 2.5 hrs</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={() => navigate('/dashboard/student/today')}>
            Continue to Dashboard
          </Button>
        </div>
      </Card>
      
      <PostLoginRedirect
        open={open}
        onOpenChange={handleOpenChange}
        lastActivity={lastActivity}
      />
    </div>
  );
};

export default PostLoginWelcomeBack;
