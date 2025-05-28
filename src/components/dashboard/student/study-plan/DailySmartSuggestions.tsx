
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Clock, TrendingUp, Target, AlertCircle, Star } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface DailySmartSuggestionsProps {
  subjects: StudyPlanSubject[];
  examDate: string;
}

const DailySmartSuggestions: React.FC<DailySmartSuggestionsProps> = ({ subjects, examDate }) => {
  const today = new Date();
  const exam = new Date(examDate);
  const daysUntilExam = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Generate smart suggestions based on data analysis
  const generateSuggestions = () => {
    const suggestions = [];

    // Priority-based suggestions
    const highPriorityIncomplete = subjects.filter(s => 
      s.priority === 'high' && (s.completedWeightage / s.totalWeightage) < 0.8
    );
    
    if (highPriorityIncomplete.length > 0) {
      suggestions.push({
        type: 'priority',
        icon: AlertCircle,
        title: 'Focus on High Priority Subjects',
        description: `Complete ${highPriorityIncomplete[0].name} topics - only ${Math.round((highPriorityIncomplete[0].completedWeightage / highPriorityIncomplete[0].totalWeightage) * 100)}% covered`,
        urgency: 'high',
        subject: highPriorityIncomplete[0].name,
        action: 'Study Now'
      });
    }

    // Time-based suggestions
    if (daysUntilExam <= 30) {
      const weakSubjects = subjects.filter(s => s.proficiency === 'weak');
      if (weakSubjects.length > 0) {
        suggestions.push({
          type: 'time',
          icon: Clock,
          title: 'Intensive Weak Subject Review',
          description: `Only ${daysUntilExam} days left! Focus on ${weakSubjects[0].name} - schedule 2 extra hours daily`,
          urgency: 'high',
          subject: weakSubjects[0].name,
          action: 'Create Schedule'
        });
      }
    }

    // Weightage-based suggestions
    const highWeightageIncomplete = subjects
      .filter(s => s.examImportance > 25 && (s.completedWeightage / s.totalWeightage) < 0.7)
      .sort((a, b) => b.examImportance - a.examImportance)[0];
    
    if (highWeightageIncomplete) {
      suggestions.push({
        type: 'weightage',
        icon: Target,
        title: 'High-Weightage Subject Alert',
        description: `${highWeightageIncomplete.name} has ${highWeightageIncomplete.examImportance}% exam weightage but only ${Math.round((highWeightageIncomplete.completedWeightage / highWeightageIncomplete.totalWeightage) * 100)}% complete`,
        urgency: 'medium',
        subject: highWeightageIncomplete.name,
        action: 'Prioritize'
      });
    }

    // Performance-based suggestions
    const strongSubjects = subjects.filter(s => s.proficiency === 'strong');
    if (strongSubjects.length > 0) {
      suggestions.push({
        type: 'performance',
        icon: Star,
        title: 'Maintain Your Strengths',
        description: `Quick revision session for ${strongSubjects[0].name} to maintain your strong performance`,
        urgency: 'low',
        subject: strongSubjects[0].name,
        action: 'Quick Review'
      });
    }

    // Study pattern suggestions
    suggestions.push({
      type: 'pattern',
      icon: TrendingUp,
      title: 'Optimize Study Pattern',
      description: 'Based on your progress, consider alternating between difficult and easy topics for better retention',
      urgency: 'low',
      subject: 'General',
      action: 'Learn More'
    });

    return suggestions.slice(0, 4); // Return top 4 suggestions
  };

  const suggestions = generateSuggestions();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getCardBorderColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-amber-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-blue-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-primary" />
          Daily Smart Suggestions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered recommendations based on your progress and exam timeline
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => {
            const IconComponent = suggestion.icon;
            return (
              <Card 
                key={index} 
                className={`border-l-4 hover:shadow-md transition-shadow ${getCardBorderColor(suggestion.urgency)}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4 text-primary" />
                      <Badge variant="outline" className={getUrgencyColor(suggestion.urgency)}>
                        {suggestion.urgency} priority
                      </Badge>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-sm mb-2">{suggestion.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {suggestion.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary">
                      {suggestion.subject}
                    </span>
                    <Button size="sm" variant="outline" className="text-xs">
                      {suggestion.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Daily Focus Recommendation */}
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-blue-700">Today's Focus Recommendation</span>
          </div>
          <p className="text-sm text-blue-600 mb-2">
            Based on your current progress and exam timeline, focus on completing high-weightage topics in your weakest subjects.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-500">
              {daysUntilExam} days until exam • Suggested study time: {Math.round(subjects.reduce((sum, s) => sum + s.hoursPerWeek, 0) / 7)} hours today
            </span>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Start Studying
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
