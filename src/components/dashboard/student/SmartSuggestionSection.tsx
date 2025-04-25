
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, BookOpen, FileCheck, Clock, Book, Award, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { motion } from 'framer-motion';

interface SmartSuggestion {
  id: string;
  type: 'concept' | 'exam' | 'flashcard' | 'resource';
  title: string;
  reason: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedTime?: number;
  subject?: string;
  chapter?: string;
  priority: 'high' | 'medium' | 'low';
  url: string;
}

interface SmartSuggestionSectionProps {
  className?: string;
}

const SmartSuggestionSection: React.FC<SmartSuggestionSectionProps> = ({ className }) => {
  // In a real app, fetch this from an API or hook
  const mockSuggestions: SmartSuggestion[] = [
    {
      id: '1',
      type: 'concept',
      title: 'Dynamics: Newton\'s Laws of Motion',
      reason: 'Your recent quizzes showed gaps in understanding of Force applications',
      difficulty: 'medium',
      estimatedTime: 30,
      subject: 'Physics',
      chapter: 'Mechanics',
      priority: 'high',
      url: '/dashboard/student/concepts/c1'
    },
    {
      id: '2',
      type: 'exam',
      title: 'Physics: Mechanics Practice Test',
      reason: 'Based on your study schedule, this will help solidify recent concepts',
      difficulty: 'medium',
      estimatedTime: 45,
      subject: 'Physics',
      priority: 'medium',
      url: '/dashboard/student/exams/e1'
    },
    {
      id: '3',
      type: 'flashcard',
      title: 'Organic Chemistry: Functional Groups',
      reason: 'You\'ve been struggling with this topic based on your practice quiz results',
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      priority: 'high',
      url: '/dashboard/student/flashcards/deck/d1'
    },
    {
      id: '4',
      type: 'resource',
      title: 'Calculus Video: Integration Techniques',
      reason: 'Aligns with your current study plan and learning style preference',
      subject: 'Mathematics',
      chapter: 'Calculus',
      estimatedTime: 20,
      priority: 'medium',
      url: '/dashboard/student/resources/r1'
    }
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case 'concept': return <Brain className="text-purple-500" />;
      case 'exam': return <FileCheck className="text-green-500" />;
      case 'flashcard': return <Book className="text-blue-500" />;
      case 'resource': return <BookOpen className="text-amber-500" />;
      default: return <Lightbulb className="text-indigo-500" />;
    }
  };
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return '';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Lightbulb className="text-amber-500" size={20} />
            Smart Suggestions
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-sm flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockSuggestions.map((suggestion, index) => (
          <Link key={suggestion.id} to={suggestion.url}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-all duration-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {getIconForType(suggestion.type)}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-2 mb-1">
                        <Badge variant="outline">
                          {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                        </Badge>
                        
                        {suggestion.difficulty && (
                          <Badge variant="outline" className={`
                            ${suggestion.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                             suggestion.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                             'bg-red-50 text-red-700 border-red-200'}
                          `}>
                            {suggestion.difficulty.charAt(0).toUpperCase() + suggestion.difficulty.slice(1)}
                          </Badge>
                        )}
                        
                        <Badge variant="outline" className={getPriorityClass(suggestion.priority)}>
                          {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)} Priority
                        </Badge>
                      </div>
                      
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-gray-500">{suggestion.reason}</p>
                      
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
                        {suggestion.subject && (
                          <div className="flex items-center gap-1">
                            <Book size={12} />
                            <span>{suggestion.subject}</span>
                          </div>
                        )}
                        
                        {suggestion.chapter && (
                          <div className="flex items-center gap-1">
                            <BookOpen size={12} />
                            <span>{suggestion.chapter}</span>
                          </div>
                        )}
                        
                        {suggestion.estimatedTime && (
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{suggestion.estimatedTime} min</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button size="sm" variant="ghost" className="shrink-0">
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestionSection;
