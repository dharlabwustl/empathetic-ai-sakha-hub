
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { Clock, Target, TrendingUp, BookOpen, Brain, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ExamGoalAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  examProximity: 'critical' | 'urgent' | 'moderate' | 'relaxed';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading_writing';
  currentMood?: MoodType;
}

const ExamGoalAdaptiveDashboard: React.FC<ExamGoalAdaptiveDashboardProps> = ({
  userProfile,
  examProximity,
  learningStyle,
  currentMood
}) => {
  const examGoal = userProfile.examGoal || 'NEET';
  const daysLeft = calculateDaysLeft(userProfile.examDate);
  
  // Adaptive color scheme based on exam proximity
  const getThemeColors = () => {
    switch (examProximity) {
      case 'critical':
        return {
          primary: 'bg-red-500',
          secondary: 'bg-red-100',
          accent: 'text-red-600',
          border: 'border-red-200'
        };
      case 'urgent':
        return {
          primary: 'bg-orange-500',
          secondary: 'bg-orange-100',
          accent: 'text-orange-600',
          border: 'border-orange-200'
        };
      case 'moderate':
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-100',
          accent: 'text-blue-600',
          border: 'border-blue-200'
        };
      default:
        return {
          primary: 'bg-green-500',
          secondary: 'bg-green-100',
          accent: 'text-green-600',
          border: 'border-green-200'
        };
    }
  };

  const theme = getThemeColors();

  // Adaptive priorities based on exam goal and proximity
  const getAdaptivePriorities = () => {
    const basePriorities = getExamGoalPriorities(examGoal);
    return adjustPrioritiesForProximity(basePriorities, examProximity);
  };

  const priorities = getAdaptivePriorities();

  // Learning style specific components
  const getLearningStyleComponents = () => {
    switch (learningStyle) {
      case 'visual':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VisualProgressCharts theme={theme} priorities={priorities} />
            <ConceptMindMaps theme={theme} examGoal={examGoal} />
            <VisualStudyPlan theme={theme} daysLeft={daysLeft} />
          </div>
        );
      case 'auditory':
        return (
          <div className="space-y-6">
            <AudioLearningSection theme={theme} examGoal={examGoal} />
            <VoiceNotesSection theme={theme} />
            <PodcastRecommendations theme={theme} examGoal={examGoal} />
          </div>
        );
      case 'kinesthetic':
        return (
          <div className="space-y-6">
            <InteractiveSimulations theme={theme} examGoal={examGoal} />
            <HandsOnPractice theme={theme} />
            <MovementBasedLearning theme={theme} />
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReadingMaterials theme={theme} examGoal={examGoal} />
            <WritingExercises theme={theme} />
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen p-6 ${theme.secondary}`}>
      {/* Adaptive Header */}
      <div className="mb-8">
        <ExamProximityHeader 
          examGoal={examGoal}
          daysLeft={daysLeft}
          examProximity={examProximity}
          theme={theme}
          userName={userProfile.name || 'Student'}
        />
      </div>

      {/* Critical Actions Bar (appears for urgent/critical proximity) */}
      {(examProximity === 'critical' || examProximity === 'urgent') && (
        <CriticalActionsBar theme={theme} priorities={priorities} />
      )}

      {/* Main Adaptive Content */}
      <div className="space-y-8">
        {/* Priority Tasks Section */}
        <PriorityTasksSection 
          priorities={priorities}
          theme={theme}
          examProximity={examProximity}
          learningStyle={learningStyle}
        />

        {/* Learning Style Specific Components */}
        {getLearningStyleComponents()}

        {/* Exam Goal Specific Widgets */}
        <ExamSpecificWidgets 
          examGoal={examGoal}
          theme={theme}
          daysLeft={daysLeft}
          examProximity={examProximity}
        />
      </div>
    </div>
  );
};

// Helper Components
const ExamProximityHeader: React.FC<any> = ({ examGoal, daysLeft, examProximity, theme, userName }) => {
  const urgencyMessages = {
    critical: "🚨 Final Sprint Mode",
    urgent: "⚡ Intensive Preparation",
    moderate: "📚 Steady Progress",
    relaxed: "🌱 Foundation Building"
  };

  return (
    <Card className={`${theme.border} ${theme.secondary}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Welcome back, {userName}!
            </CardTitle>
            <p className={`${theme.accent} font-medium`}>
              {urgencyMessages[examProximity]} - {examGoal} Preparation
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${theme.accent}`}>
              {daysLeft}
            </div>
            <p className="text-sm text-gray-600">days to {examGoal}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

const CriticalActionsBar: React.FC<any> = ({ theme, priorities }) => (
  <Card className={`${theme.border} border-l-4 ${theme.primary.replace('bg-', 'border-l-')}`}>
    <CardContent className="py-4">
      <div className="flex items-center gap-4 flex-wrap">
        <AlertTriangle className={`h-5 w-5 ${theme.accent}`} />
        <span className="font-medium">Critical Actions Today:</span>
        {priorities.slice(0, 3).map((priority: any, index: number) => (
          <Button key={index} size="sm" className={theme.primary}>
            {priority.title}
          </Button>
        ))}
      </div>
    </CardContent>
  </Card>
);

const PriorityTasksSection: React.FC<any> = ({ priorities, theme, examProximity, learningStyle }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {priorities.map((priority: any, index: number) => (
      <Card key={index} className={`${theme.border} hover:shadow-lg transition-shadow`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant={priority.urgency === 'high' ? 'destructive' : 'default'}>
              {priority.category}
            </Badge>
            <priority.icon className={`h-5 w-5 ${theme.accent}`} />
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-medium mb-2">{priority.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{priority.description}</p>
          <Progress value={priority.progress} className="mb-3" />
          <Button size="sm" className={`w-full ${theme.primary}`}>
            {priority.action}
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Learning Style Components
const VisualProgressCharts: React.FC<any> = ({ theme }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className={`h-5 w-5 ${theme.accent}`} />
        Visual Progress
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Interactive Progress Charts</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ConceptMindMaps: React.FC<any> = ({ theme, examGoal }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Brain className={`h-5 w-5 ${theme.accent}`} />
        Concept Maps - {examGoal}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Interactive Mind Maps</p>
      </div>
    </CardContent>
  </Card>
);

const VisualStudyPlan: React.FC<any> = ({ theme, daysLeft }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Calendar className={`h-5 w-5 ${theme.accent}`} />
        Visual Timeline
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Study Plan Progress</span>
          <span>{daysLeft} days left</span>
        </div>
        <Progress value={Math.max(10, 100 - (daysLeft / 365) * 100)} />
      </div>
    </CardContent>
  </Card>
);

// Helper functions
const calculateDaysLeft = (examDate?: string) => {
  if (!examDate) return 100;
  const exam = new Date(examDate);
  const today = new Date();
  const diffTime = exam.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
};

const getExamGoalPriorities = (examGoal: string) => {
  const examPriorities: any = {
    'NEET': [
      { category: 'Biology', title: 'Human Physiology', description: 'High weightage in NEET', urgency: 'high', progress: 75, action: 'Study Now', icon: BookOpen },
      { category: 'Chemistry', title: 'Organic Chemistry', description: 'Practice reaction mechanisms', urgency: 'high', progress: 60, action: 'Practice', icon: Brain },
      { category: 'Physics', title: 'Mechanics', description: 'Numerical problem solving', urgency: 'medium', progress: 80, action: 'Review', icon: Target }
    ],
    'JEE': [
      { category: 'Mathematics', title: 'Calculus', description: 'Critical for JEE Advanced', urgency: 'high', progress: 70, action: 'Practice', icon: BookOpen },
      { category: 'Physics', title: 'Electromagnetism', description: 'High scoring potential', urgency: 'high', progress: 65, action: 'Study', icon: Brain },
      { category: 'Chemistry', title: 'Physical Chemistry', description: 'Numerical problems', urgency: 'medium', progress: 75, action: 'Solve', icon: Target }
    ]
  };
  
  return examPriorities[examGoal] || examPriorities['NEET'];
};

const adjustPrioritiesForProximity = (priorities: any[], proximity: string) => {
  if (proximity === 'critical') {
    return priorities.map(p => ({ ...p, urgency: 'high', action: 'URGENT: ' + p.action }));
  }
  return priorities;
};

// Additional components would be implemented here...
const AudioLearningSection: React.FC<any> = ({ theme }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle>🎧 Audio Learning</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Podcast-style lessons and audio notes</p>
    </CardContent>
  </Card>
);

const VoiceNotesSection: React.FC<any> = ({ theme }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle>🎤 Voice Notes</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Record and review your study notes</p>
    </CardContent>
  </Card>
);

const PodcastRecommendations: React.FC<any> = ({ theme }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle>📻 Study Podcasts</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Curated educational content</p>
    </CardContent>
  </Card>
);

const InteractiveSimulations: React.FC<any> = ({ theme }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle>🔬 Interactive Simulations</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Hands-on virtual experiments</p>
    </CardContent>
  </Card>
);

const HandsOnPractice: React.FC<any> = ({ theme }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle>✋ Hands-on Practice</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Physical problem-solving activities</p>
    </CardContent>
  </Card>
);

const MovementBasedLearning: React.FC<any> = ({ theme }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle>🏃 Movement Learning</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Learn through physical activities</p>
    </CardContent>
  </Card>
);

const ReadingMaterials: React.FC<any> = ({ theme }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle>📖 Reading Materials</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Comprehensive study texts</p>
    </CardContent>
  </Card>
);

const WritingExercises: React.FC<any> = ({ theme }) => (
  <Card className={theme.border}>
    <CardHeader>
      <CardTitle>✍️ Writing Exercises</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Note-taking and essay practice</p>
    </CardContent>
  </Card>
);

const ExamSpecificWidgets: React.FC<any> = ({ examGoal, theme, daysLeft, examProximity }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card className={theme.border}>
      <CardHeader>
        <CardTitle>{examGoal} Specific Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Exam-specific study materials and patterns</p>
        <Button className={`mt-4 ${theme.primary}`}>
          Access Resources
        </Button>
      </CardContent>
    </Card>
    
    <Card className={theme.border}>
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Overall Progress</span>
            <span className={theme.accent}>78%</span>
          </div>
          <Progress value={78} />
        </div>
      </CardContent>
    </Card>
    
    <Card className={theme.border}>
      <CardHeader>
        <CardTitle>Smart Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <p>AI-powered study suggestions based on your progress</p>
        <Button variant="outline" className="mt-4">
          View Suggestions
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default ExamGoalAdaptiveDashboard;
