
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, Calendar, MessagesSquare, ChevronRight, Lightbulb, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const AcademicAdvisorSection: React.FC = () => {
  const recommendations = [
    {
      id: 'rec-1',
      title: 'Focus on Algebra Fundamentals',
      description: 'Based on your recent quiz performance, we recommend strengthening your algebra skills',
      priority: 'High',
      type: 'concept',
      linkedItems: ['Quadratic Equations', 'Factorization']
    },
    {
      id: 'rec-2',
      title: 'Practice Test: Physics Mechanics',
      description: 'You\'re making good progress in physics. Take this test to solidify your knowledge',
      priority: 'Medium',
      type: 'practice-test',
      linkedItems: ['Newton\'s Laws', 'Kinematics']
    },
    {
      id: 'rec-3',
      title: 'Review Flashcards: Chemical Bonding',
      description: 'Your mastery of chemical bonding concepts has decreased. Review these flashcards',
      priority: 'Medium',
      type: 'flashcard',
      linkedItems: ['Ionic Bonds', 'Covalent Bonds']
    }
  ];
  
  const insights = [
    {
      id: 'insight-1',
      title: 'Strong in Physics, Weak in Chemistry',
      description: 'Your performance across subjects shows a pattern',
      type: 'performance'
    },
    {
      id: 'insight-2',
      title: 'Best Study Time: Morning',
      description: 'You complete more tasks with better retention before noon',
      type: 'habit'
    },
    {
      id: 'insight-3',
      title: 'Test Taking Strategy Needs Work',
      description: 'You often change correct answers to incorrect ones',
      type: 'strategy'
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
            Academic Advisor
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Personalized guidance and recommendations for your academic journey
          </p>
        </div>
        
        <Button asChild>
          <Link to="/dashboard/student/academic-advisor">
            Get Personalized Plan
          </Link>
        </Button>
      </div>
      
      {/* Recommendations Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
            Smart Recommendations
          </h3>
          <Link to="/dashboard/student/academic-advisor/recommendations">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              View All
              <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((recommendation) => (
            <RecommendationCard key={recommendation.id} recommendation={recommendation} />
          ))}
        </div>
      </div>
      
      {/* Insights Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <BarChart className="h-4 w-4 mr-2 text-blue-500" />
            Learning Insights
          </h3>
          <Link to="/dashboard/student/academic-advisor/insights">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              View All
              <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
      
      {/* AI Chat Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 border-purple-200 dark:border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MessagesSquare className="h-5 w-5 mr-2 text-purple-600" />
            Ask Your Academic Advisor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Have questions about your study plan or need advice? Chat with your AI academic advisor.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1" variant="outline">
              How can I improve my math score?
            </Button>
            <Button className="flex-1" variant="outline">
              Create a study plan for physics
            </Button>
            <Button className="flex-1" variant="outline">
              What should I focus on today?
            </Button>
          </div>
          <div className="mt-4">
            <Button className="w-full" asChild>
              <Link to="/dashboard/student/academic-advisor/chat">
                Start Conversation
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface RecommendationCardProps {
  recommendation: any;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2">
            <Badge 
              variant="outline" 
              className={getPriorityClass(recommendation.priority)}
            >
              {recommendation.priority} Priority
            </Badge>
            <Badge variant="outline" className="bg-white">
              {getTypeLabel(recommendation.type)}
            </Badge>
          </div>
          <CardTitle className="text-base">{recommendation.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            {recommendation.description}
          </p>
          
          {recommendation.linkedItems.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-1">Related Topics:</p>
              <div className="flex flex-wrap gap-2">
                {recommendation.linkedItems.map((item: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <Button size="sm" className="w-full" asChild>
            <Link to={`/dashboard/student/${recommendation.type}/${recommendation.id}`}>
              {recommendation.type === 'concept' ? 'View Concept' : 
               recommendation.type === 'flashcard' ? 'Review Flashcards' : 
               'Start Practice Test'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface InsightCardProps {
  insight: any;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-2">
          <Badge 
            variant="outline" 
            className={getInsightTypeClass(insight.type)}
          >
            {getInsightTypeLabel(insight.type)}
          </Badge>
          <CardTitle className="text-base mt-2">{insight.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {insight.description}
          </p>
          
          <Button size="sm" variant="outline" className="w-full" asChild>
            <Link to={`/dashboard/student/academic-advisor/insights/${insight.id}`}>
              Learn More
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Helper functions
function getTypeLabel(type: string): string {
  switch (type) {
    case 'concept': return 'Concept Card';
    case 'practice-test': return 'Practice Test';
    case 'flashcard': return 'Flashcard Deck';
    default: return type;
  }
}

function getPriorityClass(priority: string): string {
  switch (priority) {
    case 'High': return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    case 'Medium': return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
    case 'Low': return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    default: return '';
  }
}

function getInsightTypeClass(type: string): string {
  switch (type) {
    case 'performance': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
    case 'habit': return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    case 'strategy': return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
    default: return '';
  }
}

function getInsightTypeLabel(type: string): string {
  switch (type) {
    case 'performance': return 'Performance Insight';
    case 'habit': return 'Study Habit';
    case 'strategy': return 'Test Strategy';
    default: return type;
  }
}

export default AcademicAdvisorSection;
