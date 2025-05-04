
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, Headphones, MessageSquare, Volume2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Image from '@/components/common/Image';

interface WelcomeTourProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({ 
  open, 
  onOpenChange, 
  onSkipTour, 
  onCompleteTour,
  isFirstTimeUser,
  lastActivity,
  suggestedNextAction,
  loginCount
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  
  const steps = [
    {
      title: "Welcome to PREPZR",
      description: "Your personalized AI-powered study companion for exam preparation",
      content: (
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-sky-500 to-violet-500 flex items-center justify-center p-8 mb-4">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">PREPZR</h1>
              <p className="text-lg">Your AI Study Companion</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Hi there!</h3>
            <p>Welcome to PREPZR, your personalized AI study companion designed to help you prepare for your exams effectively.</p>
            <p>Let's take a quick tour to get you familiar with the platform.</p>
          </div>
        </div>
      )
    },
    {
      title: "Your Dashboard",
      description: "Get an overview of your progress and daily tasks",
      content: (
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-sky-100 via-white to-violet-100 flex items-center justify-center p-6 border">
            <div className="grid grid-cols-2 gap-4 w-full">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Study Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-16 bg-muted/50 rounded-md"></div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Today's Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-16 bg-muted/50 rounded-md"></div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Your Personal Dashboard</h3>
            <p>Your dashboard displays your study progress, upcoming tasks, and personalized recommendations.</p>
            <p>You can track your performance metrics and quickly access your most important study resources.</p>
          </div>
        </div>
      )
    },
    {
      title: "Voice Assistant",
      description: "Get help and information using natural voice commands",
      content: (
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-6 border">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 flex items-center justify-center">
                <Volume2 className="h-12 w-12 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-1">Voice Assistant</h3>
                <p className="text-sm text-muted-foreground">"Hello! How can I help you today?"</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Intelligent Voice Assistant</h3>
            <p>PREPZR comes with a smart voice assistant that can help you navigate the platform, provide information, and answer your questions.</p>
            <p>Say "Hello" to your voice assistant or use the microphone button to activate it. You can ask questions like "What's my next task?" or "Help me prepare for physics".</p>
            <p>The voice assistant supports multiple languages including Hindi!</p>
            
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg mt-2">
              <div className="flex items-start gap-2">
                <Headphones className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Try saying:</p>
                  <ul className="text-sm text-blue-700 list-disc pl-4 space-y-1 mt-1">
                    <li>"What's on my schedule today?"</li>
                    <li>"Show me my study plan"</li>
                    <li>"Help me understand thermodynamics"</li>
                    <li>"What topics should I focus on?"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Learning Tools",
      description: "Explore our tools to enhance your study experience",
      content: (
        <div className="space-y-4">
          <Tabs defaultValue="conceptCards" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="conceptCards">Concept Cards</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="practiceExams">Practice Exams</TabsTrigger>
            </TabsList>
            
            <TabsContent value="conceptCards" className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-blue-50 border border-blue-200 flex items-center justify-center p-6">
                <Card className="w-full max-w-md shadow-md border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle>Newton's Laws of Motion</CardTitle>
                    <CardDescription>Physics | Mechanics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">The fundamental principles of classical mechanics...</p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="font-semibold">Interactive Concept Cards</h3>
                <p className="text-sm text-muted-foreground">
                  Explore complex topics broken down into easy-to-understand visual cards with examples and practice questions.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="flashcards" className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-purple-50 border border-purple-200 flex items-center justify-center p-6">
                <Card className="w-full max-w-md shadow-md border-purple-200">
                  <CardHeader className="bg-purple-50">
                    <CardTitle>Chemistry Flashcards</CardTitle>
                    <CardDescription>Organic Compounds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-lg font-medium">What is the molecular formula for Ethanol?</p>
                    <p className="text-center text-muted-foreground mt-2">(Tap to see answer)</p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="font-semibold">Smart Flashcards</h3>
                <p className="text-sm text-muted-foreground">
                  Practice with intelligent flashcards that adapt to your learning pace and help you memorize key concepts.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="practiceExams" className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-green-50 border border-green-200 flex items-center justify-center p-6">
                <Card className="w-full max-w-md shadow-md border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle>NEET Practice Exam</CardTitle>
                    <CardDescription>Biology Section | 45 minutes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Question 1 of 30</p>
                      <p>Which organelle is known as the powerhouse of the cell?</p>
                      <div className="space-y-2">
                        <div className="p-2 bg-white border rounded-md">Mitochondria</div>
                        <div className="p-2 bg-white border rounded-md">Golgi Apparatus</div>
                        <div className="p-2 bg-white border rounded-md">Nucleus</div>
                        <div className="p-2 bg-white border rounded-md">Endoplasmic Reticulum</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="font-semibold">Practice Exams</h3>
                <p className="text-sm text-muted-foreground">
                  Test your knowledge with exam-like conditions and get detailed analysis of your performance.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )
    },
    {
      title: "AI Assistance",
      description: "Get personalized help whenever you need it",
      content: (
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-sky-100 via-white to-violet-100 flex items-center justify-center p-6 border">
            <Card className="w-full max-w-md shadow-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">24/7 AI Tutor</CardTitle>
                    <CardDescription>Your personal study assistant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-2 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">Can you help me understand the concept of electromagnetic induction?</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                    <p className="text-sm">Electromagnetic induction is the production of voltage across a conductor when exposed to a varying magnetic field. Let me explain with an example...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">24/7 AI Tutor & Feel Good Corner</h3>
            <p>Get help with difficult concepts, ask questions, and receive personalized explanations any time.</p>
            <p>The AI tutor can help you solve problems, explain complex topics, and guide your study sessions.</p>
            <p>When you need a break, visit the Feel Good Corner to boost your mood and motivation.</p>
          </div>
        </div>
      )
    },
    {
      title: "Daily Challenges",
      description: "Build healthy study habits with daily challenges and rewards",
      content: (
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-amber-50 border border-amber-200 flex items-center justify-center p-6">
            <Card className="w-full max-w-md shadow-md border-amber-200">
              <CardHeader className="bg-amber-50/70">
                <div className="flex items-center justify-between">
                  <CardTitle>Daily Challenges</CardTitle>
                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                    <Flame className="h-3 w-3" />
                    <span>5 day streak</span>
                  </div>
                </div>
                <CardDescription>Complete challenges to earn points and badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-amber-100 bg-white rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Complete Physics Quiz</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">+50 XP</span>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-amber-100 bg-white rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-amber-400 rounded-full"></div>
                        <span className="font-medium">Create 5 Flashcards</span>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">+30 XP</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Daily Challenges & Gamification</h3>
            <p>Stay motivated with daily challenges, streaks, and achievements.</p>
            <p>Complete challenges to earn XP points, unlock badges, and track your progress over time.</p>
            <p>Compete with yourself and maintain study streaks to build consistent study habits.</p>
          </div>
        </div>
      )
    },
    {
      title: "Let's Get Started!",
      description: "You're all set to begin your learning journey",
      content: (
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center p-8 border">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-green-800 mb-2">You're All Set!</h2>
              <p className="text-green-700">Ready to start your learning journey with PREPZR</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Ready to Begin?</h3>
            <p>You're now familiar with all the key features of PREPZR.</p>
            <p>Remember, your personal AI voice assistant will guide you through the platform and help you with your studies.</p>
            <p>We're committed to supporting your exam preparation every step of the way. Let's achieve your goals together!</p>
          </div>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteTour();
      toast({
        title: "Tour Completed!",
        description: "Welcome to PREPZR. Your dashboard is ready!",
      });
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    onSkipTour();
    toast({
      title: "Tour Skipped",
      description: "You can always access help from the menu.",
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>{steps[currentStep].description}</DialogDescription>
        </DialogHeader>
        
        <div className="overflow-y-auto pr-1 py-4">
          {steps[currentStep].content}
        </div>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between mt-2 sm:space-y-0">
          <div className="flex space-x-2 mt-4 sm:mt-0">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={handleSkip}>
                Skip Tour
              </Button>
            )}
          </div>
          <Button onClick={handleNext}>
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Get Started'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
