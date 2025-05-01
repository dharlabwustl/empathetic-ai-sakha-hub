
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ChevronRight, LayoutDashboard, Book, Calendar, User } from 'lucide-react';

interface WelcomeTourProps {
  open: boolean;
  onClose: () => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome to Your PREPZR Dashboard</DialogTitle>
          <DialogDescription className="text-center text-base">
            Let's take a quick tour of the key features to help you get started
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="dashboard" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="concepts">Concept Cards</TabsTrigger>
            <TabsTrigger value="study">Study Plan</TabsTrigger>
            <TabsTrigger value="founder">Founder's Note</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-24 w-24 text-blue-500 opacity-50" />
            </div>
            <h3 className="text-lg font-medium">Your Smart Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your personalized dashboard shows your progress, upcoming tasks, and smart recommendations based on your study habits and goals.
              Check your key performance indicators and get insights on where to focus next.
            </p>
          </TabsContent>
          
          <TabsContent value="concepts" className="space-y-4">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Book className="h-24 w-24 text-purple-500 opacity-50" />
            </div>
            <h3 className="text-lg font-medium">AI-Powered Concept Cards</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse through our extensive library of concept cards that explain complex topics in simple terms.
              Our AI tailors the content to match your learning style and current understanding level.
              Practice with flashcards to reinforce your learning.
            </p>
          </TabsContent>
          
          <TabsContent value="study" className="space-y-4">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Calendar className="h-24 w-24 text-green-500 opacity-50" />
            </div>
            <h3 className="text-lg font-medium">Smart Study Planning</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your personalized study plan helps you organize your time effectively.
              Based on your learning goals, available time, and progress, PREPZR creates
              an optimized schedule to help you achieve your targets efficiently.
            </p>
          </TabsContent>
          
          <TabsContent value="founder" className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium">A Message from Our Founder</h3>
                <p className="text-sm text-gray-500">Dr. Rajesh Kumar • Founder & CEO</p>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400">
              "At PREPZR, we believe that every student deserves personalized learning support.
              Our mission is to democratize access to quality education through AI-driven
              personalization. We're committed to continuously improving our platform based on
              your feedback and learning patterns."
            </blockquote>
            
            <p className="text-gray-600 dark:text-gray-400">
              With years of experience in education technology, our team has developed PREPZR to be
              your perfect learning companion. We understand the challenges students face and have built
              solutions to address them effectively.
            </p>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            Skip Tour
          </Button>
          <Button onClick={() => { onClose(); navigate('/dashboard/student'); }}>
            Start Learning <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
