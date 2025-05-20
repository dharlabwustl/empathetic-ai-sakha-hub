
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, Brain, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';

interface RevisionLoopStepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  completed: boolean;
}

const RevisionLoopStep = ({ step, title, description, icon, active, completed }: RevisionLoopStepProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex items-start p-4 rounded-lg ${active ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
      <div className={`${completed ? 'bg-green-500' : active ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'} text-white h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
        {completed ? <Check size={16} /> : step}
      </div>
      <div>
        <h4 className={`font-medium ${isMobile ? 'text-sm' : ''} mb-1`}>{title}</h4>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{description}</p>
        
        {active && !completed && (
          <Button size="sm" className="mt-3" variant="outline">
            {icon}
            <span className="ml-2">Start</span>
          </Button>
        )}
        
        {completed && (
          <span className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center">
            <Check size={14} className="mr-1" /> Completed
          </span>
        )}
      </div>
    </div>
  );
};

interface RevisionLoopSectionProps {
  conceptTitle: string;
  isStarted: boolean;
}

const RevisionLoopSection: React.FC<RevisionLoopSectionProps> = ({ conceptTitle, isStarted }) => {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className={isMobile ? 'text-lg' : ''}>Revision Loop for {conceptTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isStarted ? (
          <div className="text-center py-6">
            <Brain className="h-12 w-12 mx-auto text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Start Your Revision Loop</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Follow our proven 5-step revision method to better understand and remember this concept.
            </p>
            <Button size="lg">
              <Clock className="mr-2 h-4 w-4" />
              Start Revision Loop
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Revision Progress</span>
              <span className="text-sm font-medium">1/5 completed</span>
            </div>
            <Progress value={20} className="h-2" />
            
            <div className="space-y-3 mt-6">
              <RevisionLoopStep
                step={1}
                title="Initial Read-through"
                description="Read the concept carefully to understand the main ideas"
                icon={<BookOpen size={16} />}
                active={true}
                completed={false}
              />
              
              <RevisionLoopStep
                step={2}
                title="Key Points Identification"
                description="Identify and highlight the most important points"
                icon={<Check size={16} />}
                active={false}
                completed={false}
              />
              
              <RevisionLoopStep
                step={3}
                title="Concept Mapping"
                description="Create connections between ideas using a concept map"
                icon={<Brain size={16} />}
                active={false}
                completed={false}
              />
              
              <RevisionLoopStep
                step={4}
                title="Practice Questions"
                description="Apply your knowledge by answering practice questions"
                icon={<Brain size={16} />}
                active={false}
                completed={false}
              />
              
              <RevisionLoopStep
                step={5}
                title="Final Review"
                description="Review the concept one more time to solidify understanding"
                icon={<Clock size={16} />}
                active={false}
                completed={false}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevisionLoopSection;
