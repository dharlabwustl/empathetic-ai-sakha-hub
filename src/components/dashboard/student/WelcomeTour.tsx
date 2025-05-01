
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeTourProps {
  open: boolean;
  onClose: () => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({ open, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();
  
  // Tour content slides
  const slides = [
    {
      title: "Welcome to PREPZR",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Let's take a quick tour of the features that will help you excel in your studies.
          </p>
          <div className="flex justify-center">
            <img 
              src="https://placehold.co/400x200/e2e8f0/1e293b?text=PREPZR+Dashboard" 
              alt="Dashboard Overview" 
              className="rounded-lg border shadow-sm"
            />
          </div>
          <p>Your personalized dashboard gives you an overview of your progress and upcoming tasks.</p>
        </div>
      )
    },
    {
      title: "Smart Study Plans",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            PREPZR creates personalized study plans based on your learning style and goals.
          </p>
          <div className="flex justify-center">
            <img 
              src="https://placehold.co/400x200/e2e8f0/1e293b?text=Study+Plan+Feature" 
              alt="Study Plan" 
              className="rounded-lg border shadow-sm" 
            />
          </div>
          <p>Track your progress, adjust your schedule, and stay on top of your exam preparation.</p>
        </div>
      )
    },
    {
      title: "Interactive Learning",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Engage with concept cards, flashcards, and practice exams to reinforce your knowledge.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://placehold.co/200x150/e2e8f0/1e293b?text=Concept+Cards" 
              alt="Concept Cards" 
              className="rounded-lg border shadow-sm" 
            />
            <img 
              src="https://placehold.co/200x150/e2e8f0/1e293b?text=Flashcards" 
              alt="Flashcards" 
              className="rounded-lg border shadow-sm" 
            />
          </div>
          <p>Our interactive tools help you understand complex topics and test your knowledge.</p>
        </div>
      )
    },
    {
      title: "Meet Our Founder",
      content: (
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
              <img 
                src="https://placehold.co/200x200/e2e8f0/1e293b?text=Founder" 
                alt="PREPZR Founder" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="mt-4 font-bold text-lg">Dr. Raj Kumar</h3>
            <p className="text-sm text-muted-foreground">Founder & CEO</p>
          </div>
          
          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            "Our mission at PREPZR is to revolutionize exam preparation by creating an AI-powered platform that adapts to each student's unique learning style and needs."
          </blockquote>
          
          <p className="text-sm text-muted-foreground">
            With over 15 years of experience in education technology, Dr. Kumar founded PREPZR to make quality exam preparation accessible to students everywhere.
          </p>
        </div>
      )
    },
    {
      title: "Ready to Begin?",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Your journey to exam success starts now. PREPZR is here to support you every step of the way.
          </p>
          <div className="flex justify-center">
            <img 
              src="https://placehold.co/400x200/e2e8f0/1e293b?text=Your+Journey+Begins" 
              alt="Begin Your Journey" 
              className="rounded-lg border shadow-sm"
            />
          </div>
          <p>Let's get started with your personalized study experience!</p>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const handleComplete = () => {
    // Mark tour as completed in localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
    
    toast({
      title: "Welcome aboard!",
      description: "You're all set to start your learning journey with PREPZR."
    });
    
    onClose();
  };
  
  const handleSkip = () => {
    // Mark tour as completed
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
    
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={() => handleSkip()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">{slides[currentSlide].title}</DialogTitle>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={handleSkip}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="min-h-[350px] py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {slides[currentSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center my-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <DialogFooter className="sm:justify-between">
          <div className="flex gap-2">
            {currentSlide > 0 && (
              <Button variant="outline" onClick={handlePrev}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            {currentSlide < slides.length - 1 ? (
              <Button variant="default" onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button variant="default" onClick={handleComplete}>
                Get Started
              </Button>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            Skip Tour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
