
import React from 'react';
import { UserProfileType } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, CheckCircle, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: string;
  estimatedTime: number;
  completed: boolean;
  scheduledFor: string;
  flashcardsTotal: number;
  flashcardsCompleted: number;
}

interface TodaysPlanSectionProps {
  userProfile: UserProfileType;
  conceptCards: ConceptCard[];
  showHeading?: boolean;
  compact?: boolean;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ 
  userProfile, 
  conceptCards, 
  showHeading = true,
  compact = false
}) => {
  // Get study goal from user profile
  const examGoal = userProfile?.goals?.[0]?.title || userProfile?.examPreparation || "General Study";
  
  // Calculate study stats for today
  const todaysCards = conceptCards;
  const totalEstimatedTime = todaysCards.reduce((acc, card) => acc + card.estimatedTime, 0);
  const hasFlashcards = todaysCards.some(card => card.flashcardsTotal > 0);
  const hasPracticeExam = todaysCards.length >= 3; // Assuming practice exam becomes available after 3+ concepts
  
  // Group by subject
  const subjectGroups = todaysCards.reduce<Record<string, ConceptCard[]>>((acc, card) => {
    if (!acc[card.subject]) {
      acc[card.subject] = [];
    }
    acc[card.subject].push(card);
    return acc;
  }, {});
  
  const subjects = Object.keys(subjectGroups);
  
  if (todaysCards.length === 0) {
    return (
      <div className="space-y-4">
        {showHeading && <h2 className="text-2xl font-bold">Today's Study Plan</h2>}
        
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
              No study tasks scheduled for today
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Visit the Academic Advisor to create your personalized study plan
            </p>
            <div className="mt-4">
              <Button asChild>
                <Link to="/dashboard/student/academic">Create Study Plan</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showHeading && <h2 className="text-2xl font-bold">Today's Study Plan</h2>}
      
      {/* Summary card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-100 dark:border-green-800">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300">
                Today's Focus
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/50 dark:bg-gray-800/50">
                  Subjects: {subjects.length}
                </Badge>
                <Badge variant="secondary" className="bg-white/50 dark:bg-gray-800/50">
                  Concepts: {todaysCards.length}
                </Badge>
                <Badge variant="secondary" className="bg-white/50 dark:bg-gray-800/50">
                  Est. Time: {totalEstimatedTime} min
                </Badge>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Play className="mr-1 h-4 w-4" /> Start Study Session
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* If compact mode, just show summary */}
      {compact ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subjects.map(subject => {
            const subjectCards = subjectGroups[subject];
            const subjectTime = subjectCards.reduce((acc, card) => acc + card.estimatedTime, 0);
            const completedCards = subjectCards.filter(card => card.completed).length;
            
            return (
              <Card key={subject} className="border-l-4" style={{ borderLeftColor: getSubjectColor(subject) }}>
                <CardContent className="p-4">
                  <h3 className="font-medium">{subject}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Concepts:</span>
                      <span>{completedCards}/{subjectCards.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Est. Time:</span>
                      <span>{subjectTime} min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        // Full list of concept cards
        <div className="space-y-6">
          {subjects.map(subject => (
            <div key={subject} className="space-y-3">
              <h3 className="font-semibold text-lg">{subject}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {subjectGroups[subject].map(card => (
                  <Card key={card.id} className="border-l-4" style={{ borderLeftColor: getDifficultyColor(card.difficulty) }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{card.title}</h4>
                        <Badge variant={card.completed ? "outline" : "default"}>
                          {card.completed ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span className="mr-3">{card.chapter}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{card.estimatedTime} min</span>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/dashboard/student/concepts/${card.id}`}>
                            Study Now
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          
          {/* Quick actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2 justify-between">
                <h3 className="font-medium">Quick Actions</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" /> Mark All Complete
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4 mr-1" /> Review Past Tasks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Helper functions
const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'hard': return '#ef4444';
    default: return '#6366f1';
  }
};

const getSubjectColor = (subject: string): string => {
  const subjectColors: Record<string, string> = {
    'Mathematics': '#2563eb',
    'Math': '#2563eb',
    'Physics': '#9333ea',
    'Chemistry': '#16a34a',
    'Biology': '#65a30d',
    'History': '#b45309',
    'English': '#0891b2',
    'Science': '#0284c7'
  };
  
  return subjectColors[subject] || '#6366f1';
};

export default TodaysPlanSection;
