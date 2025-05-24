
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  BookOpen,
  Brain,
  Award,
  Eye,
  Settings,
  BarChart3
} from 'lucide-react';

const StudentJourneyManagementTab = () => {
  const [selectedStage, setSelectedStage] = useState("signup");

  const journeyStages = [
    {
      id: "signup",
      name: "Signup & Onboarding",
      students: 2847,
      completionRate: 94,
      avgTime: "8 minutes",
      status: "healthy",
      aiComponents: ["Welcome flow personalization", "Learning style assessment", "Initial profiling"],
      dropoffReasons: ["Complex signup process", "Email verification delays"],
      optimizations: ["Simplified onboarding", "Social login integration"]
    },
    {
      id: "profiling",
      name: "Goal Setting & Profiling",
      students: 2678,
      completionRate: 89,
      avgTime: "15 minutes",
      status: "healthy",
      aiComponents: ["Exam goal analysis", "Subject proficiency mapping", "Learning pace assessment"],
      dropoffReasons: ["Too many questions", "Unclear goal options"],
      optimizations: ["Progressive profiling", "Smart defaults"]
    },
    {
      id: "studyplan",
      name: "AI Study Plan Creation",
      students: 2384,
      completionRate: 84,
      avgTime: "2 minutes",
      status: "excellent",
      aiComponents: ["Adaptive study plans", "Daily schedule optimization", "Subject prioritization"],
      dropoffReasons: ["Plan complexity", "Unrealistic schedules"],
      optimizations: ["Simplified plans", "Flexible scheduling"]
    },
    {
      id: "learning",
      name: "Learning Tools Engagement",
      students: 2156,
      completionRate: 76,
      avgTime: "Ongoing",
      status: "healthy",
      aiComponents: ["Concept cards generation", "Interactive flashcards", "3D models creation"],
      dropoffReasons: ["Content difficulty", "Interface complexity"],
      optimizations: ["Adaptive difficulty", "Better UX design"]
    },
    {
      id: "practice",
      name: "Practice & Assessment",
      students: 1943,
      completionRate: 68,
      avgTime: "Weekly",
      status: "warning",
      aiComponents: ["Practice exams", "Formula labs", "Skill assessments", "Adaptive testing"],
      dropoffReasons: ["Test anxiety", "Difficult questions"],
      optimizations: ["Confidence building", "Graduated difficulty"]
    },
    {
      id: "readiness",
      name: "Exam Readiness",
      students: 1654,
      completionRate: 58,
      avgTime: "Monthly",
      status: "healthy",
      aiComponents: ["Readiness scoring", "Gap analysis", "Final preparation", "Mock exams"],
      dropoffReasons: ["Low confidence", "Time pressure"],
      optimizations: ["Confidence coaching", "Time management"]
    }
  ];

  const moodAdaptations = [
    {
      mood: "Stressed",
      adaptations: "Easier content, relaxation exercises, shorter sessions",
      students: 342,
      effectiveness: 78
    },
    {
      mood: "Motivated",
      adaptations: "Challenging content, extended sessions, bonus materials",
      students: 891,
      effectiveness: 92
    },
    {
      mood: "Tired",
      adaptations: "Interactive content, visual aids, frequent breaks",
      students: 234,
      effectiveness: 65
    },
    {
      mood: "Confident",
      adaptations: "Advanced topics, peer teaching, leadership roles",
      students: 567,
      effectiveness: 88
    }
  ];

  const academicAdvisorMetrics = [
    {
      advisor: "Dr. Sarah Johnson (Physics)",
      students: 342,
      avgImprovement: 23,
      planAdherence: 87,
      satisfaction: 4.8
    },
    {
      advisor: "Prof. Raj Patel (Mathematics)",
      students: 298,
      avgImprovement: 28,
      planAdherence: 91,
      satisfaction: 4.9
    },
    {
      advisor: "Dr. Emily Chen (Chemistry)",
      students: 267,
      avgImprovement: 21,
      planAdherence: 84,
      satisfaction: 4.7
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'healthy': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Journey Overview Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Complete Student Journey Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {journeyStages.map((stage, index) => (
              <div 
                key={stage.id} 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedStage === stage.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedStage(stage.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getStatusColor(stage.status)}>
                    {stage.status}
                  </Badge>
                  {index < journeyStages.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <h4 className="font-medium text-sm mb-2">{stage.name}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-medium">{stage.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completion:</span>
                    <span className="font-medium">{stage.completionRate}%</span>
                  </div>
                  <Progress value={stage.completionRate} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Stage Details */}
      {selectedStage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {journeyStages.find(s => s.id === selectedStage)?.name} - AI Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">AI-Powered Features:</h4>
                  <ul className="space-y-1">
                    {journeyStages.find(s => s.id === selectedStage)?.aiComponents.map((component, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Brain className="h-3 w-3 mr-2 text-purple-600" />
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Common Drop-off Reasons:</h4>
                  <ul className="space-y-1">
                    {journeyStages.find(s => s.id === selectedStage)?.dropoffReasons.map((reason, index) => (
                      <li key={index} className="flex items-center text-sm text-red-600">
                        <AlertCircle className="h-3 w-3 mr-2" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Planned Optimizations:</h4>
                  <ul className="space-y-1">
                    {journeyStages.find(s => s.id === selectedStage)?.optimizations.map((optimization, index) => (
                      <li key={index} className="flex items-center text-sm text-green-600">
                        <CheckCircle className="h-3 w-3 mr-2" />
                        {optimization}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stage Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {journeyStages.find(s => s.id === selectedStage)?.students.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Active Students</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {journeyStages.find(s => s.id === selectedStage)?.completionRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Completion Rate</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Time to Complete:</span>
                    <span className="font-medium">{journeyStages.find(s => s.id === selectedStage)?.avgTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate:</span>
                    <span className="font-medium">{journeyStages.find(s => s.id === selectedStage)?.completionRate}%</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-1" />
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mood-Based Adaptations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Mood-Based Study Plan Adaptations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {moodAdaptations.map((adaptation, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{adaptation.mood}</h4>
                  <Badge variant="outline">{adaptation.students} students</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{adaptation.adaptations}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Effectiveness:</span>
                    <span>{adaptation.effectiveness}%</span>
                  </div>
                  <Progress value={adaptation.effectiveness} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Academic Advisor Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Academic Advisor Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {academicAdvisorMetrics.map((advisor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{advisor.advisor}</h4>
                  <Badge variant="outline">{advisor.students} students</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">+{advisor.avgImprovement}%</div>
                    <div className="text-xs text-muted-foreground">Avg Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{advisor.planAdherence}%</div>
                    <div className="text-xs text-muted-foreground">Plan Adherence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{advisor.satisfaction}/5</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentJourneyManagementTab;
