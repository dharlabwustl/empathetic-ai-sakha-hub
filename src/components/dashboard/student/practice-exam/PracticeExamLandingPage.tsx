
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  FileText,
  Zap,
  Brain,
  Star,
  Calendar,
  BarChart3
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const PracticeExamLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const syllabusProgress = {
    physics: { completed: 65, total: 100, chapters: 15, lastStudied: "Wave Optics" },
    chemistry: { completed: 72, total: 100, chapters: 18, lastStudied: "Organic Chemistry" },
    biology: { completed: 58, total: 100, chapters: 22, lastStudied: "Human Physiology" }
  };

  const upcomingMilestones = [
    { subject: "Physics", topic: "Modern Physics", dueDate: "Dec 15", priority: "high" },
    { subject: "Chemistry", topic: "Chemical Kinetics", dueDate: "Dec 18", priority: "medium" },
    { subject: "Biology", topic: "Genetics", dueDate: "Dec 20", priority: "high" }
  ];

  const achievements = [
    { title: "Physics Explorer", description: "Completed 10 physics chapters", icon: Zap, earned: true },
    { title: "Chemistry Master", description: "Scored 90%+ in organic chemistry", icon: Star, earned: true },
    { title: "Biology Genius", description: "Mastered human physiology", icon: Brain, earned: false },
    { title: "NEET Warrior", description: "Complete full syllabus", icon: Award, earned: false }
  ];

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Target className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">NEET 2026 Syllabus</h1>
              <p className="text-indigo-100">Your comprehensive exam preparation roadmap</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Exam Date</span>
              </div>
              <p className="text-2xl font-bold">May 2026</p>
              <p className="text-sm text-indigo-100">486 days remaining</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5" />
                <span className="font-semibold">Overall Progress</span>
              </div>
              <p className="text-2xl font-bold">65%</p>
              <p className="text-sm text-indigo-100">Above average pace</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5" />
                <span className="font-semibold">Target Score</span>
              </div>
              <p className="text-2xl font-bold">650+</p>
              <p className="text-sm text-indigo-100">Top medical colleges</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-xl"></div>
      </div>

      {/* Achievement Badges */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
            <Award className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Achievements</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <Card key={index} className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
              achievement.earned 
                ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50' 
                : 'border-gray-200 bg-gray-50/50'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                      : 'bg-gray-400'
                  }`}>
                    <achievement.icon className="h-4 w-4 text-white" />
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <h3 className="font-semibold text-sm mb-1">{achievement.title}</h3>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Subject Progress Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Subject-wise Progress</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(syllabusProgress).map(([subject, data]) => (
            <Card key={subject} className="relative overflow-hidden border-2 border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold capitalize flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${
                      subject === 'physics' ? 'bg-blue-500' :
                      subject === 'chemistry' ? 'bg-green-500' : 'bg-purple-500'
                    }`}>
                      {subject === 'physics' ? <Zap className="h-4 w-4 text-white" /> :
                       subject === 'chemistry' ? <Star className="h-4 w-4 text-white" /> :
                       <Brain className="h-4 w-4 text-white" />}
                    </div>
                    {subject}
                  </CardTitle>
                  <Badge variant="outline" className="bg-white/80">
                    {data.chapters} Chapters
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Completion</span>
                    <span className="font-bold">{data.completed}%</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-white/70 rounded-full h-3 shadow-inner">
                      <div 
                        className={`h-3 rounded-full shadow-sm transition-all duration-500 ${
                          subject === 'physics' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                          subject === 'chemistry' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                          'bg-gradient-to-r from-purple-400 to-purple-600'
                        }`}
                        style={{ width: `${data.completed}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 p-3 rounded-lg border border-white/50">
                  <p className="text-xs text-gray-600 mb-1">Last Studied</p>
                  <p className="font-semibold text-sm">{data.lastStudied}</p>
                </div>
                
                <Button 
                  className={`w-full shadow-md hover:shadow-lg transition-all duration-200 ${
                    subject === 'physics' ? 'bg-blue-600 hover:bg-blue-700' :
                    subject === 'chemistry' ? 'bg-green-600 hover:bg-green-700' :
                    'bg-purple-600 hover:bg-purple-700'
                  }`}
                  onClick={() => navigate(`/dashboard/student/practice-exam`)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Syllabus
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Milestones */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Milestones</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingMilestones.map((milestone, index) => (
            <Card key={index} className="border-2 border-rose-100 bg-gradient-to-br from-rose-50/80 to-pink-50/80 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className={`${
                    milestone.priority === 'high' ? 'border-red-200 bg-red-50 text-red-700' :
                    'border-yellow-200 bg-yellow-50 text-yellow-700'
                  }`}>
                    {milestone.priority} Priority
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {milestone.dueDate}
                  </div>
                </div>
                <h3 className="font-semibold mb-1">{milestone.subject}</h3>
                <p className="text-sm text-gray-600">{milestone.topic}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:bg-blue-100"
          onClick={() => navigate('/dashboard/student/practice-exam')}
        >
          <FileText className="h-5 w-5" />
          <span>Practice Tests</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:bg-green-100"
          onClick={() => navigate('/dashboard/student/concepts')}
        >
          <BookOpen className="h-5 w-5" />
          <span>Study Concepts</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:bg-purple-100"
          onClick={() => navigate('/dashboard/student/flashcards')}
        >
          <Brain className="h-5 w-5" />
          <span>Flashcards</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:bg-amber-100"
        >
          <TrendingUp className="h-5 w-5" />
          <span>Progress Analytics</span>
        </Button>
      </div>
    </div>
  );
};

export default PracticeExamLandingPage;
