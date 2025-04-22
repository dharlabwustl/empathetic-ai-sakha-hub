
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user/base";
import {
  BookOpen,
  Brain,
  BookCheck,
  Target,
  Calendar,
  FileText,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RecommendedActionButtonsProps {
  userProfile: UserProfileType;
  className?: string;
}

const RecommendedActionButtons: React.FC<RecommendedActionButtonsProps> = ({ userProfile, className = "" }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Calculate days to exam if exam date is available
  const daysToExam = userProfile.examPreparation?.examDate 
    ? Math.ceil((new Date(userProfile.examPreparation.examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  
  // Generate recommendations based on user profile
  const getRecommendations = () => {
    const recommendations = [];
    
    // Next concept recommendation
    recommendations.push({
      id: "next-concept",
      title: "Continue Learning",
      description: "Move to your next concept",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
      action: () => navigate("/dashboard/student/concept/next"),
      variant: "default" as const,
      priority: 10
    });
    
    // Flashcard revision recommendation
    recommendations.push({
      id: "revise-flashcards",
      title: "Let's Revise",
      description: "Practice with flashcards",
      icon: <BookCheck className="h-4 w-4 mr-2" />,
      action: () => navigate("/dashboard/student/flashcards"),
      variant: "outline" as const,
      priority: 8
    });
    
    // Practice exam recommendation (higher priority if exam is close)
    const examPriority = daysToExam && daysToExam < 30 ? 9 : 7;
    recommendations.push({
      id: "practice-exam",
      title: daysToExam && daysToExam < 30 ? `Prepare for Exam (${daysToExam} days left)` : "Practice Exam",
      description: "Test your knowledge",
      icon: <FileText className="h-4 w-4 mr-2" />,
      action: () => navigate("/dashboard/student/practice-exam"),
      variant: daysToExam && daysToExam < 14 ? "default" as const : "outline" as const,
      priority: examPriority
    });
    
    // Focus on weak topics if available
    if (userProfile.subjects?.some(subject => subject.weakTopics && subject.weakTopics.length > 0)) {
      recommendations.push({
        id: "focus-weak-topics",
        title: "Focus on Weak Areas",
        description: "Improve your understanding",
        icon: <Target className="h-4 w-4 mr-2" />,
        action: () => navigate("/dashboard/student/weakareas"),
        variant: "outline" as const,
        priority: 9
      });
    }
    
    // Study plan recommendation
    recommendations.push({
      id: "view-study-plan",
      title: "View Study Plan",
      description: "Follow your personalized plan",
      icon: <Calendar className="h-4 w-4 mr-2" />,
      action: () => navigate("/dashboard/student/study-plan"),
      variant: "outline" as const,
      priority: 6
    });
    
    // AI Tutor chat if user has had previous interactions
    if (userProfile.aiTutorHistory && userProfile.aiTutorHistory.totalInteractions > 0) {
      recommendations.push({
        id: "ai-tutor",
        title: "Continue with AI Tutor",
        description: "Get help with concepts",
        icon: <Brain className="h-4 w-4 mr-2" />,
        action: () => navigate("/dashboard/student/tutor"),
        variant: "outline" as const,
        priority: 7
      });
    }
    
    // Quick practice for busy users
    recommendations.push({
      id: "quick-practice",
      title: "Quick Practice",
      description: "15-min focused review",
      icon: <Zap className="h-4 w-4 mr-2" />,
      action: () => navigate("/dashboard/student/quick-practice"),
      variant: "outline" as const,
      priority: 5
    });
    
    // Sort by priority (highest first) and return top 4
    return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 4);
  };
  
  const recommendations = getRecommendations();
  
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 ${className}`}>
      {recommendations.map((rec) => (
        <Button
          key={rec.id}
          variant={rec.variant}
          onClick={() => {
            rec.action();
            toast({
              title: rec.title,
              description: "Navigating to your recommended activity...",
            });
          }}
          className={`flex items-center justify-center text-xs sm:text-sm ${rec.variant === 'default' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' : ''}`}
        >
          {rec.icon}
          {rec.title}
        </Button>
      ))}
    </div>
  );
};

export default RecommendedActionButtons;
