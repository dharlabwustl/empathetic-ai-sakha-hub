
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Trophy,
  Zap,
  Calendar,
  FileText,
  Brain,
  FlaskConical,
  Dna
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SyllabusProgress {
  subject: string;
  totalTopics: number;
  completedTopics: number;
  timeSpent: number;
  lastStudied: string;
  difficulty: 'easy' | 'medium' | 'hard';
  color: string;
  icon: React.ElementType;
}

interface TopicData {
  id: string;
  name: string;
  completion: number;
  importance: 'high' | 'medium' | 'low';
  estimatedTime: number;
  lastReviewed?: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

const ExamSyllabusPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const syllabusData: SyllabusProgress[] = [
    {
      subject: 'Physics',
      totalTopics: 85,
      completedTopics: 52,
      timeSpent: 180,
      lastStudied: '2 days ago',
      difficulty: 'hard',
      color: 'blue',
      icon: Zap
    },
    {
      subject: 'Chemistry',
      totalTopics: 92,
      completedTopics: 67,
      timeSpent: 210,
      lastStudied: 'Yesterday',
      difficulty: 'medium',
      color: 'green',
      icon: FlaskConical
    },
    {
      subject: 'Biology',
      totalTopics: 78,
      completedTopics: 71,
      timeSpent: 195,
      lastStudied: 'Today',
      difficulty: 'easy',
      color: 'purple',
      icon: Dna
    }
  ];

  const physicsTopics: TopicData[] = [
    { id: '1', name: 'Mechanics', completion: 85, importance: 'high', estimatedTime: 25, status: 'completed' },
    { id: '2', name: 'Thermodynamics', completion: 60, importance: 'high', estimatedTime: 20, status: 'in-progress' },
    { id: '3', name: 'Waves and Optics', completion: 45, importance: 'medium', estimatedTime: 18, status: 'in-progress' },
    { id: '4', name: 'Electromagnetism', completion: 0, importance: 'high', estimatedTime: 30, status: 'not-started' }
  ];

  const chemistryTopics: TopicData[] = [
    { id: '1', name: 'Organic Chemistry', completion: 75, importance: 'high', estimatedTime: 35, status: 'in-progress' },
    { id: '2', name: 'Inorganic Chemistry', completion: 90, importance: 'high', estimatedTime: 28, status: 'completed' },
    { id: '3', name: 'Physical Chemistry', completion: 55, importance: 'medium', estimatedTime: 25, status: 'in-progress' },
    { id: '4', name: 'Chemical Bonding', completion: 100, importance: 'high', estimatedTime: 15, status: 'completed' }
  ];

  const biologyTopics: TopicData[] = [
    { id: '1', name: 'Human Physiology', completion: 95, importance: 'high', estimatedTime: 30, status: 'completed' },
    { id: '2', name: 'Plant Biology', completion: 80, importance: 'medium', estimatedTime: 22, status: 'completed' },
    { id: '3', name: 'Genetics', completion: 70, importance: 'high', estimatedTime: 25, status: 'in-progress' },
    { id: '4', name: 'Ecology', completion: 85, importance: 'medium', estimatedTime: 18, status: 'completed' }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-200 hover:border-blue-300',
      green: 'from-green-500/20 to-green-600/20 border-green-200 hover:border-green-300',
      purple: 'from-purple-500/20 to-purple-600/20 border-purple-200 hover:border-purple-300'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const renderTopicCard = (topic: TopicData, subjectColor: string) => (
    <Card key={topic.id} className="overflow-hidden hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm">{topic.name}</h4>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={
                topic.importance === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                topic.importance === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                'bg-gray-50 text-gray-700 border-gray-200'
              }
            >
              {topic.importance}
            </Badge>
            {topic.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Progress</span>
            <span>{topic.completion}%</span>
          </div>
          <Progress value={topic.completion} className="h-2" />
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{topic.estimatedTime}h</span>
            </div>
            <Button size="sm" variant="outline" className="h-6 text-xs px-2">
              {topic.status === 'completed' ? 'Review' : 
               topic.status === 'in-progress' ? 'Continue' : 'Start'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSubjectContent = (topics: TopicData[], color: string) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => renderTopicCard(topic, color))}
      </div>
    </div>
  );

  const totalTopics = syllabusData.reduce((sum, subject) => sum + subject.totalTopics, 0);
  const totalCompleted = syllabusData.reduce((sum, subject) => sum + subject.completedTopics, 0);
  const totalTimeSpent = syllabusData.reduce((sum, subject) => sum + subject.timeSpent, 0);
  const overallProgress = Math.round((totalCompleted / totalTopics) * 100);

  return (
    <SharedPageLayout
      title="NEET 2026 Exam Syllabus"
      subtitle="Master every topic with our comprehensive syllabus tracking"
    >
      <div className="space-y-6">
        {/* Premium Header Section */}
        <Card className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0">
          <div className="absolute inset-0 bg-black/10" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">NEET 2026 Preparation</h2>
                <p className="text-white/90">Complete syllabus coverage with smart tracking</p>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-8 w-8 text-yellow-300" />
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {overallProgress}% Complete
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-sm font-medium">Total Topics</span>
                </div>
                <p className="text-2xl font-bold">{totalCompleted}/{totalTopics}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">Study Time</span>
                </div>
                <p className="text-2xl font-bold">{totalTimeSpent}h</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5" />
                  <span className="text-sm font-medium">Target</span>
                </div>
                <p className="text-2xl font-bold">95%</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm font-medium">Exam Date</span>
                </div>
                <p className="text-lg font-bold">May 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
            <TabsTrigger value="physics" className="data-[state=active]:bg-white">Physics</TabsTrigger>
            <TabsTrigger value="chemistry" className="data-[state=active]:bg-white">Chemistry</TabsTrigger>
            <TabsTrigger value="biology" className="data-[state=active]:bg-white">Biology</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Subject Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {syllabusData.map((subject) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`bg-gradient-to-br ${getColorClasses(subject.color)} border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg font-bold">{subject.subject}</span>
                        <div className="flex items-center gap-2">
                          <subject.icon className={`h-5 w-5 ${getIconColor(subject.color)}`} />
                          {subject.completedTopics >= subject.totalTopics * 0.8 && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">Topics Completed</span>
                          <span className="font-bold">{subject.completedTopics}/{subject.totalTopics}</span>
                        </div>
                        <Progress 
                          value={(subject.completedTopics / subject.totalTopics) * 100} 
                          className="h-3"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/80 p-3 rounded-lg border border-white/50">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-600" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Study Time</p>
                              <p className="font-bold text-gray-800">{subject.timeSpent}h</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/80 p-3 rounded-lg border border-white/50">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-gray-600" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Last Study</p>
                              <p className="font-bold text-gray-800">{subject.lastStudied}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button 
                        size="sm" 
                        className={`w-full mt-4 ${
                          subject.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                          subject.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                          'bg-purple-600 hover:bg-purple-700'
                        }`}
                        onClick={() => setActiveTab(subject.subject.toLowerCase())}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Syllabus
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Smart Recommendations */}
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Brain className="h-5 w-5" />
                  AI-Powered Study Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-orange-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">Priority: Physics Electromagnetism</h4>
                        <p className="text-sm text-gray-600">High weightage topic, needs immediate attention</p>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Urgent
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg border border-orange-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">Revision: Chemistry Organic</h4>
                        <p className="text-sm text-gray-600">Last studied 5 days ago, quick revision needed</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Review
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="physics">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-800">Physics Syllabus - NEET 2026</h3>
              {renderSubjectContent(physicsTopics, 'blue')}
            </div>
          </TabsContent>

          <TabsContent value="chemistry">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-800">Chemistry Syllabus - NEET 2026</h3>
              {renderSubjectContent(chemistryTopics, 'green')}
            </div>
          </TabsContent>

          <TabsContent value="biology">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-800">Biology Syllabus - NEET 2026</h3>
              {renderSubjectContent(biologyTopics, 'purple')}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ExamSyllabusPage;
