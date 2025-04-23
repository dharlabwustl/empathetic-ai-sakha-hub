
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, X, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';

// Mock data for concept cards
const mockConcepts = [
  {
    id: '1',
    title: 'Newton\'s First Law of Motion',
    subject: 'Physics',
    description: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.',
    examples: ['A book sitting on a table remains at rest', 'A moving car comes to a stop when brakes are applied due to friction'],
    difficulty: 'medium',
    timeToComplete: 15,
    completed: false
  },
  {
    id: '2',
    title: 'Cell Structure and Function',
    subject: 'Biology',
    description: 'The cell is the basic structural and functional unit of all living organisms. Cells contain organelles that perform specific functions necessary for the cell\'s survival.',
    examples: ['Animal cells have a nucleus, mitochondria, endoplasmic reticulum', 'Plant cells have cell walls and chloroplasts in addition'],
    difficulty: 'hard',
    timeToComplete: 20,
    completed: false
  },
  {
    id: '3',
    title: 'Quadratic Equations',
    subject: 'Mathematics',
    description: 'A quadratic equation is a second-order polynomial equation of the form ax² + bx + c = 0, where a ≠ 0.',
    examples: ['x² + 5x + 6 = 0 can be factored as (x + 2)(x + 3) = 0', 'The quadratic formula: x = (-b ± √(b² - 4ac)) / 2a'],
    difficulty: 'medium',
    timeToComplete: 25,
    completed: false
  },
  {
    id: '4',
    title: 'Chemical Bonding',
    subject: 'Chemistry',
    description: 'Chemical bonding involves the attraction between atoms or molecules that leads to the formation of chemical compounds.',
    examples: ['Ionic bonding in NaCl', 'Covalent bonding in H₂O', 'Metallic bonding in copper'],
    difficulty: 'hard',
    timeToComplete: 30,
    completed: false
  },
  {
    id: '5',
    title: 'Photosynthesis',
    subject: 'Biology',
    description: 'Photosynthesis is the process by which green plants, algae and some bacteria convert light energy into chemical energy.',
    examples: ['6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂'],
    difficulty: 'medium',
    timeToComplete: 20,
    completed: false
  }
];

const ConceptStudyPage = () => {
  const { planType } = useParams<{ planType: string }>();
  const navigate = useNavigate();
  const [concepts, setConcepts] = useState(mockConcepts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const dashboard = useStudentDashboard();
  
  // Simulate loading user's concept cards based on planType
  useEffect(() => {
    // In a real app, fetch concepts from API based on planType and student profile
    const planTitle = planType === 'daily' ? "Today's Concepts" : "Weekly Concepts";
    
    // Simulate loading
    const timer = setTimeout(() => {
      setProgress(100);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [planType]);
  
  const currentConcept = concepts[currentIndex];
  
  const handleNextConcept = () => {
    if (currentIndex < concepts.length - 1) {
      // Mark the current concept as completed
      const updatedConcepts = [...concepts];
      updatedConcepts[currentIndex] = { ...updatedConcepts[currentIndex], completed: true };
      setConcepts(updatedConcepts);
      
      // Move to the next concept
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      
      // Show toast for completion
      toast({
        title: "Concept Completed!",
        description: `You've completed "${currentConcept.title}"`,
      });
    } else {
      // Mark the last concept as completed
      const updatedConcepts = [...concepts];
      updatedConcepts[currentIndex] = { ...updatedConcepts[currentIndex], completed: true };
      setConcepts(updatedConcepts);
      
      // Show completion toast
      toast({
        title: "All Concepts Completed!",
        description: "You've finished all concepts for this study plan.",
      });
      
      // Navigate back to the concept list
      setTimeout(() => {
        navigate("/dashboard/student/concepts");
      }, 1500);
    }
  };
  
  const handlePrevConcept = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  if (!dashboard.userProfile) {
    return <div>Loading...</div>;
  }
  
  return (
    <DashboardLayout
      userProfile={dashboard.userProfile}
      hideSidebar={dashboard.hideSidebar}
      hideTabsNav={dashboard.hideTabsNav}
      activeTab="subjects"
      kpis={dashboard.kpis}
      nudges={dashboard.nudges}
      markNudgeAsRead={dashboard.markNudgeAsRead}
      showWelcomeTour={dashboard.showWelcomeTour}
      onTabChange={dashboard.handleTabChange}
      onViewStudyPlan={dashboard.handleViewStudyPlan}
      onToggleSidebar={dashboard.toggleSidebar}
      onToggleTabsNav={dashboard.toggleTabsNav}
      onSkipTour={dashboard.handleSkipTour}
      onCompleteTour={dashboard.handleCompleteTour}
      showStudyPlan={dashboard.showStudyPlan}
      onCloseStudyPlan={dashboard.handleCloseStudyPlan}
      lastActivity={dashboard.lastActivity}
      suggestedNextAction={dashboard.suggestedNextAction}
      currentMood={dashboard.userProfile.mood}
    >
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => navigate('/dashboard/student/concepts')}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Concepts
          </Button>
          
          <h1 className="text-2xl font-bold">
            {planType === 'daily' ? "Today's Concepts" : "Weekly Study Plan"}
          </h1>
          
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">
              {currentIndex + 1} of {concepts.length}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <Progress value={(currentIndex / (concepts.length - 1)) * 100} className="h-2" />
        </div>
        
        {/* Concept Card */}
        <div className="perspective-1000">
          <div
            className={`w-full transform-style-3d transition-transform duration-500 ${
              isFlipped ? "rotate-y-180" : ""
            } min-h-[400px]`}
          >
            {/* Front of Card (Concept) */}
            <Card
              className={`w-full mb-6 ${
                isFlipped ? "hidden" : "block"
              } border-l-4 border-l-blue-500`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-xl">{currentConcept.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentConcept.subject}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className={getDifficultyColor(currentConcept.difficulty)}>
                      {currentConcept.difficulty.charAt(0).toUpperCase() + currentConcept.difficulty.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {currentConcept.timeToComplete} mins
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-base leading-relaxed">{currentConcept.description}</p>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-primary"
                  onClick={handleFlip}
                >
                  See Examples
                </Button>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevConcept}
                  disabled={currentIndex === 0}
                  className={`${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  onClick={handleNextConcept}
                >
                  <Check className="mr-1 h-4 w-4" /> 
                  {currentIndex < concepts.length - 1 ? 'Complete & Next' : 'Finish All'}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Back of Card (Examples) */}
            <Card
              className={`w-full mb-6 ${
                isFlipped ? "block" : "hidden"
              } border-l-4 border-l-purple-500`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      Examples: {currentConcept.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentConcept.subject}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center">
                    <BookOpen className="mr-1 h-3 w-3" />
                    Examples
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {currentConcept.examples.map((example, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-primary"
                  onClick={handleFlip}
                >
                  Back to Concept
                </Button>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevConcept}
                  disabled={currentIndex === 0}
                  className={`${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  onClick={handleNextConcept}
                >
                  <Check className="mr-1 h-4 w-4" /> 
                  {currentIndex < concepts.length - 1 ? 'Complete & Next' : 'Finish All'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConceptStudyPage;
