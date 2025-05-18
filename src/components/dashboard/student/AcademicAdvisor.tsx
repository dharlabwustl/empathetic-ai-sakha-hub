
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StudyPlanTopic } from '@/types/student/StudyPlan';
import { useNavigate } from 'react-router-dom';

interface AcademicAdvisorProps {
  userName?: string;
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userName = "Student" }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('progress');
  
  // Mock study plan data
  const studyPlan = {
    overallProgress: 68,
    subjects: [
      { name: "Physics", progress: 75, color: "bg-blue-500" },
      { name: "Chemistry", progress: 60, color: "bg-green-500" },
      { name: "Biology", progress: 65, color: "bg-purple-500" }
    ],
    weakTopics: [
      {
        id: "topic-1",
        name: "Electromagnetic Induction",
        difficulty: "hard",
        subject: "Physics",
        status: "needs-review",
        priority: "high",
        lastReviewed: "2 weeks ago"
      },
      {
        id: "topic-2",
        name: "Organic Chemistry Mechanisms",
        difficulty: "medium",
        subject: "Chemistry",
        status: "needs-practice",
        priority: "medium",
        lastReviewed: "1 week ago"
      },
      {
        id: "topic-3",
        name: "Cell Respiration",
        difficulty: "medium",
        subject: "Biology",
        status: "started",
        priority: "high",
        lastReviewed: "3 days ago"
      }
    ],
    strongTopics: [
      {
        id: "strong-1",
        name: "Newton's Laws",
        difficulty: "medium",
        subject: "Physics",
        status: "completed",
        completed: true,
        priority: "medium"
      },
      {
        id: "strong-2",
        name: "Periodic Table",
        difficulty: "medium",
        subject: "Chemistry",
        status: "completed",
        completed: true,
        priority: "medium"
      },
      {
        id: "strong-3",
        name: "Human Anatomy",
        difficulty: "hard",
        subject: "Biology",
        status: "completed",
        completed: true,
        priority: "high"
      }
    ]
  };
  
  const handleSubjectClick = (subject: string) => {
    // Navigate to subject view
    console.log("Navigate to subject:", subject);
  };
  
  const handleTopicClick = (topicId: string) => {
    // Navigate to topic details
    navigate(`/dashboard/student/concepts/${topicId}`);
  };
  
  return (
    <div className="space-y-6">
      {/* Personal greeting */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-none">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Hello, {userName}</h2>
              <p className="text-muted-foreground">Here's your academic progress overview</p>
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Overall Exam Preparation</span>
                <span>{studyPlan.overallProgress}%</span>
              </div>
              <Progress value={studyPlan.overallProgress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {studyPlan.subjects.map((subject) => (
                <div 
                  key={subject.name} 
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleSubjectClick(subject.name)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{subject.name}</h3>
                    <span className="text-sm">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className={`h-1.5 ${subject.color}`} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed analysis tabs */}
      <Tabs defaultValue="progress" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="progress">Areas to Focus</TabsTrigger>
          <TabsTrigger value="strengths">Your Strengths</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Topics Needing Attention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyPlan.weakTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleTopicClick(topic.id)}
                >
                  <div>
                    <div className="font-medium">{topic.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <span>{topic.subject}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                      <span>
                        Last reviewed: {topic.lastReviewed}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      topic.difficulty === "hard" ? "destructive" : 
                      topic.difficulty === "medium" ? "secondary" : 
                      "outline"
                    }>
                      {topic.difficulty}
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              ))}
              
              <Button className="w-full mt-4" variant="outline">
                View All Focus Areas
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strengths" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Strong Performance Areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyPlan.strongTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30"
                  onClick={() => handleTopicClick(topic.id)}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{topic.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {topic.subject}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      <Check className="h-3 w-3 mr-1" />
                      Mastered
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              ))}
              
              <Button className="w-full mt-4" variant="outline">
                View All Strengths
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicAdvisor;
