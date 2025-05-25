
import React from 'react';
import { Helmet } from 'react-helmet';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  BookOpen, 
  Target, 
  Calendar,
  TrendingUp,
  Award,
  Clock,
  AlertTriangle
} from 'lucide-react';
import AcademicAdvisorVoiceAssistant from '@/components/voice/AcademicAdvisorVoiceAssistant';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';

const AcademicAdvisor: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);

  const advisorSections = [
    {
      id: 'study-plan',
      title: 'Study Plan Optimization',
      icon: <Calendar className="h-6 w-6" />,
      description: 'Get personalized study schedules and time management tips',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      recommendations: [
        'Focus on weak subjects during peak hours',
        'Allocate 60% time to problem-solving',
        'Schedule revision every 3 days'
      ]
    },
    {
      id: 'performance',
      title: 'Performance Analysis',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Track your progress and identify improvement areas',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      recommendations: [
        'Physics concepts need more attention',
        'Strong performance in Mathematics',
        'Practice more Chemistry numerical'
      ]
    },
    {
      id: 'goal-setting',
      title: 'Goal Setting & Milestones',
      icon: <Target className="h-6 w-6" />,
      description: 'Set achievable targets and track milestone completion',
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50',
      recommendations: [
        'Complete 80% syllabus by March',
        'Achieve 85% in mock tests',
        'Master 5 concepts weekly'
      ]
    },
    {
      id: 'exam-strategy',
      title: 'Exam Strategy',
      icon: <Award className="h-6 w-6" />,
      description: 'Develop effective exam-taking strategies and techniques',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      recommendations: [
        'Solve easy questions first',
        'Time allocation: 1.5 min per question',
        'Review answers in last 15 minutes'
      ]
    }
  ];

  const urgentActions = [
    {
      title: 'Update Study Schedule',
      description: 'Your current schedule needs adjustment based on recent performance',
      priority: 'high',
      timeEstimate: '15 min'
    },
    {
      title: 'Review Weak Areas',
      description: 'Focus on identified weak concepts in Physics',
      priority: 'medium',
      timeEstimate: '30 min'
    },
    {
      title: 'Plan Mock Test Schedule',
      description: 'Schedule upcoming practice exams and mock tests',
      priority: 'low',
      timeEstimate: '10 min'
    }
  ];

  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Get personalized guidance for your academic journey"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Academic Advisor - PREPZR</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Voice Assistant */}
        <div className="flex justify-end">
          <AcademicAdvisorVoiceAssistant 
            userName={userProfile?.name}
            userGoals={userProfile?.goals}
            isEnabled={true}
          />
        </div>

        {/* Welcome Message */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome to Your Academic Advisor, {userProfile?.name}!
                </h2>
                <p className="text-indigo-100">
                  Get personalized guidance, study strategies, and performance insights to excel in your {userProfile?.goals?.[0]?.title || 'exam'} preparation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Urgent Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgentActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={action.priority === 'high' ? 'destructive' : action.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {action.priority}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-3 w-3" />
                    {action.timeEstimate}
                  </div>
                  <Button size="sm">Take Action</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Advisor Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {advisorSections.map((section) => (
            <Card key={section.id} className={`bg-gradient-to-br ${section.bgGradient} border-0 hover:shadow-lg transition-all duration-300`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 bg-gradient-to-r ${section.gradient} rounded-full text-white`}>
                    {section.icon}
                  </div>
                  <Button variant="outline" size="sm" className="bg-white/80">
                    Explore
                  </Button>
                </div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
                <p className="text-gray-600">{section.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Key Recommendations:</h5>
                  <ul className="space-y-1">
                    {section.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisor;
