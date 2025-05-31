
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target, BookOpen, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Subject {
  id: string;
  name: string;
  color: string;
  weeklyHours: number;
  progress: number;
  proficiency: 'weak' | 'medium' | 'strong';
  priority: 'high' | 'medium' | 'low';
  topics: {
    id: string;
    name: string;
    completed: boolean;
    estimatedHours: number;
  }[];
}

const EnhancedStudyPlanPage: React.FC = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 'physics',
      name: 'Physics',
      color: '#3b82f6',
      weeklyHours: 14,
      progress: 45,
      proficiency: 'medium',
      priority: 'high',
      topics: [
        { id: 'p1', name: 'Mechanics', completed: true, estimatedHours: 40 },
        { id: 'p2', name: 'Thermodynamics', completed: false, estimatedHours: 35 },
        { id: 'p3', name: 'Electromagnetism', completed: false, estimatedHours: 45 },
        { id: 'p4', name: 'Modern Physics', completed: false, estimatedHours: 30 },
        { id: 'p5', name: 'Optics', completed: false, estimatedHours: 25 }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      color: '#10b981',
      weeklyHours: 12,
      progress: 30,
      proficiency: 'weak',
      priority: 'high',
      topics: [
        { id: 'c1', name: 'Physical Chemistry', completed: false, estimatedHours: 50 },
        { id: 'c2', name: 'Organic Chemistry', completed: false, estimatedHours: 60 },
        { id: 'c3', name: 'Inorganic Chemistry', completed: false, estimatedHours: 40 },
        { id: 'c4', name: 'Analytical Chemistry', completed: true, estimatedHours: 25 }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      color: '#8b5cf6',
      weeklyHours: 16,
      progress: 65,
      proficiency: 'strong',
      priority: 'medium',
      topics: [
        { id: 'b1', name: 'Botany', completed: true, estimatedHours: 45 },
        { id: 'b2', name: 'Zoology', completed: false, estimatedHours: 50 },
        { id: 'b3', name: 'Human Physiology', completed: false, estimatedHours: 40 },
        { id: 'b4', name: 'Genetics', completed: false, estimatedHours: 35 },
        { id: 'b5', name: 'Ecology', completed: true, estimatedHours: 20 }
      ]
    }
  ]);

  const totalWeeklyHours = subjects.reduce((sum, subject) => sum + subject.weeklyHours, 0);
  const examDate = new Date('2026-05-03');
  const daysLeft = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handleTimeAllocationChange = (subjectId: string, newHours: number[]) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, weeklyHours: newHours[0] }
        : subject
    ));
  };

  const saveTimeAllocation = () => {
    toast({
      title: "Time allocation saved",
      description: `Updated weekly study plan: ${totalWeeklyHours} hours total`,
    });
  };

  const getSubjectBadge = (subject: Subject) => {
    if (subject.proficiency === 'weak') {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Weak Area
        </Badge>
      );
    } else if (subject.proficiency === 'strong') {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Strong
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
        Medium
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* NEET 2026 Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span>NEET 2026 Preparation Plan</span>
            </div>
            <Badge className="bg-blue-600 text-white">
              {daysLeft} days left
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Calendar className="h-5 w-5 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">Exam Date</p>
              <p className="text-lg font-bold">May 3, 2026</p>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">Weekly Hours</p>
              <p className="text-lg font-bold">{totalWeeklyHours}h</p>
            </div>
            <div className="text-center">
              <BookOpen className="h-5 w-5 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">Subjects</p>
              <p className="text-lg font-bold">3 Core</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-2 text-orange-600" />
              <p className="text-sm font-medium">Pace</p>
              <p className="text-lg font-bold">Normal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Allocation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Adjustable Time Allocation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  />
                  <h3 className="font-medium">{subject.name}</h3>
                  {getSubjectBadge(subject)}
                </div>
                <span className="text-sm font-medium">
                  {subject.weeklyHours}h/week
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Weekly Hours</span>
                  <span>{subject.weeklyHours}h</span>
                </div>
                <Slider
                  value={[subject.weeklyHours]}
                  onValueChange={(value) => handleTimeAllocationChange(subject.id, value)}
                  max={25}
                  min={5}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>

              {/* Topics Breakdown */}
              <div className="pl-4 border-l-2 border-gray-200 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Topics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {subject.topics.map((topic) => (
                    <div 
                      key={topic.id}
                      className={`p-2 rounded-lg text-xs flex items-center justify-between ${
                        topic.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <span>{topic.name}</span>
                      <div className="flex items-center gap-1">
                        <span>{topic.estimatedHours}h</span>
                        {topic.completed && <CheckCircle className="h-3 w-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total Weekly Hours</span>
              <span className="text-xl font-bold">{totalWeeklyHours}h</span>
            </div>
            <Button onClick={saveTimeAllocation} className="w-full">
              Save Time Allocation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Study Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">Weak Subjects (Priority Focus)</h4>
                {subjects
                  .filter(s => s.proficiency === 'weak')
                  .map(subject => (
                    <div key={subject.id} className="p-3 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-sm text-red-600">{subject.weeklyHours}h/week</span>
                      </div>
                      <Progress value={subject.progress} className="h-2 mt-2" />
                    </div>
                  ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">Strong Subjects (Maintenance)</h4>
                {subjects
                  .filter(s => s.proficiency === 'strong')
                  .map(subject => (
                    <div key={subject.id} className="p-3 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-sm text-green-600">{subject.weeklyHours}h/week</span>
                      </div>
                      <Progress value={subject.progress} className="h-2 mt-2" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedStudyPlanPage;
