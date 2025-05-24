
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BookOpen, Target, TrendingUp, Clock, Star, AlertCircle } from 'lucide-react';
import { UserProfileBase } from '@/types/user/base';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface AcademicAdvisorViewProps {
  userProfile: UserProfileBase;
}

const AcademicAdvisorView: React.FC<AcademicAdvisorViewProps> = ({ userProfile }) => {
  const [selectedTab, setSelectedTab] = useState('recommendations');

  // Mock data with complete StudyPlanSubject structure
  const currentSubjects: StudyPlanSubject[] = [
    {
      id: 'physics-1',
      name: 'Physics - Mechanics',
      difficulty: 'medium',
      completed: false,
      status: 'in-progress',
      priority: 'high',
      proficiency: 'medium',
      hoursPerWeek: 8,
      chaptersTotal: 12,
      chaptersCompleted: 7,
      estimatedHours: 96,
      actualHours: 58,
      topics: ['Motion', 'Forces', 'Energy', 'Momentum']
    },
    {
      id: 'chemistry-1',
      name: 'Chemistry - Organic',
      difficulty: 'easy',
      completed: false,
      status: 'pending',
      priority: 'medium',
      proficiency: 'strong',
      hoursPerWeek: 6,
      chaptersTotal: 10,
      chaptersCompleted: 3,
      estimatedHours: 80,
      actualHours: 24,
      topics: ['Hydrocarbons', 'Alcohols', 'Carbonyl Compounds']
    },
    {
      id: 'mathematics-1',
      name: 'Mathematics - Calculus',
      difficulty: 'hard',
      completed: false,
      status: 'completed',
      priority: 'high',
      proficiency: 'weak',
      hoursPerWeek: 10,
      chaptersTotal: 8,
      chaptersCompleted: 8,
      estimatedHours: 120,
      actualHours: 145,
      topics: ['Limits', 'Derivatives', 'Integration', 'Applications']
    }
  ];

  const upcomingSubjects: StudyPlanSubject[] = [
    {
      id: 'physics-2',
      name: 'Physics - Thermodynamics',
      difficulty: 'hard',
      completed: false,
      status: 'pending',
      priority: 'high',
      proficiency: 'weak',
      hoursPerWeek: 8,
      chaptersTotal: 6,
      chaptersCompleted: 0,
      estimatedHours: 72,
      actualHours: 0,
      topics: ['Heat Transfer', 'Laws of Thermodynamics', 'Kinetic Theory']
    },
    {
      id: 'chemistry-2',
      name: 'Chemistry - Inorganic',
      difficulty: 'medium',
      completed: false,
      status: 'in-progress',
      priority: 'medium',
      proficiency: 'medium',
      hoursPerWeek: 6,
      chaptersTotal: 8,
      chaptersCompleted: 1,
      estimatedHours: 64,
      actualHours: 8,
      topics: ['Coordination Compounds', 'Metallurgy', 'p-Block Elements']
    },
    {
      id: 'mathematics-2',
      name: 'Mathematics - Probability',
      difficulty: 'hard',
      completed: false,
      status: 'pending',
      priority: 'low',
      proficiency: 'weak',
      hoursPerWeek: 5,
      chaptersTotal: 5,
      chaptersCompleted: 0,
      estimatedHours: 50,
      actualHours: 0,
      topics: ['Probability Theory', 'Distributions', 'Statistics']
    }
  ];

  const completedSubjects: StudyPlanSubject[] = [
    {
      id: 'biology-1',
      name: 'Biology - Cell Biology',
      difficulty: 'medium',
      completed: true,
      status: 'completed',
      priority: 'high',
      proficiency: 'strong',
      hoursPerWeek: 7,
      chaptersTotal: 10,
      chaptersCompleted: 10,
      estimatedHours: 70,
      actualHours: 68,
      topics: ['Cell Structure', 'Cell Division', 'Biomolecules', 'Enzymes']
    },
    {
      id: 'chemistry-basics',
      name: 'Chemistry - Basics',
      difficulty: 'easy',
      completed: true,
      status: 'completed',
      priority: 'high',
      proficiency: 'strong',
      hoursPerWeek: 5,
      chaptersTotal: 8,
      chaptersCompleted: 8,
      estimatedHours: 40,
      actualHours: 42,
      topics: ['Atomic Structure', 'Chemical Bonding', 'Stoichiometry']
    },
    {
      id: 'physics-basics',
      name: 'Physics - Basics',
      difficulty: 'hard',
      completed: true,
      status: 'in-progress',
      priority: 'medium',
      proficiency: 'medium',
      hoursPerWeek: 6,
      chaptersTotal: 6,
      chaptersCompleted: 6,
      estimatedHours: 48,
      actualHours: 52,
      topics: ['Units & Measurements', 'Kinematics', 'Dynamics']
    }
  ];

  const recommendations = [
    {
      type: 'priority',
      title: 'Focus on Physics - Mechanics',
      description: 'Complete this high-priority subject first. You\'re 58% done.',
      action: 'Continue studying',
      urgency: 'high'
    },
    {
      type: 'weak-area',
      title: 'Strengthen Mathematics Foundation',
      description: 'Your calculus proficiency needs improvement. Consider extra practice.',
      action: 'Practice more problems',
      urgency: 'medium'
    },
    {
      type: 'schedule',
      title: 'Optimize Study Schedule',
      description: 'You\'re spending more time than estimated on difficult topics.',
      action: 'Adjust time allocation',
      urgency: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'strong': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'weak': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'low': return <TrendingUp className="h-4 w-4 text-green-600" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Academic Advisor Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Academic Advisor
          </CardTitle>
          <p className="text-sm text-gray-600">
            Personalized guidance based on your learning patterns and exam goals
          </p>
        </CardHeader>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="current">Current Subjects</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {recommendations.map((rec, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {getUrgencyIcon(rec.urgency)}
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{rec.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          {rec.action}
                        </Button>
                        <Badge className={getPriorityColor(rec.urgency)}>
                          {rec.urgency} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4">
            {currentSubjects.map((subject) => (
              <Card key={subject.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{subject.name}</h3>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(subject.priority)}>
                        {subject.priority}
                      </Badge>
                      <Badge className={getProficiencyColor(subject.proficiency)}>
                        {subject.proficiency}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{subject.chaptersCompleted}/{subject.chaptersTotal} chapters</span>
                    </div>
                    <Progress value={(subject.chaptersCompleted / subject.chaptersTotal) * 100} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Time Spent:</span>
                      <span className="ml-2 font-medium">{subject.actualHours}h</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Estimated:</span>
                      <span className="ml-2 font-medium">{subject.estimatedHours}h</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Button size="sm" className="gap-2">
                      <BookOpen className="h-4 w-4" />
                      Continue Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingSubjects.map((subject) => (
              <Card key={subject.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{subject.name}</h3>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(subject.priority)}>
                        {subject.priority}
                      </Badge>
                      <Badge variant="outline">
                        {subject.estimatedHours}h estimated
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    Topics: {subject.topics.join(', ')}
                  </p>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm">
                      Start Early
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedSubjects.map((subject) => (
              <Card key={subject.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{subject.name}</h3>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        <Star className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                      <Badge className={getProficiencyColor(subject.proficiency)}>
                        {subject.proficiency}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Time Taken:</span>
                      <span className="ml-2 font-medium">{subject.actualHours}h</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Efficiency:</span>
                      <span className="ml-2 font-medium">
                        {Math.round((subject.estimatedHours / subject.actualHours) * 100)}%
                      </span>
                    </div>
                  </div>

                  <Button size="sm" variant="outline">
                    Review & Practice
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicAdvisorView;
