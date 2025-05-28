
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { UserGoal, MoodType } from '@/types/user/base';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, TrendingUp, Book, Brain, Zap } from 'lucide-react';

interface AdaptiveDashboardLayoutProps {
  userProfile: any;
  preferences: any;
  children?: React.ReactNode;
}

interface AdaptiveWidget {
  id: string;
  title: string;
  content: React.ReactNode;
  priority: number;
  size: 'small' | 'medium' | 'large';
  position: { row: number; col: number };
  theme: string;
}

const AdaptiveDashboardLayout: React.FC<AdaptiveDashboardLayoutProps> = ({
  userProfile,
  preferences,
  children
}) => {
  const adaptiveWidgets = useMemo(() => {
    const widgets: AdaptiveWidget[] = [];
    
    // Weak subjects focus widget (high priority for struggling students)
    if (preferences.weakSubjects?.length > 0) {
      widgets.push({
        id: 'weak-subjects',
        title: 'Priority Focus Areas',
        content: (
          <div className="space-y-3">
            {preferences.weakSubjects.slice(0, 3).map((subject: string) => (
              <div key={subject} className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="font-medium text-red-800">{subject}</span>
                <Badge variant="destructive">Needs Work</Badge>
              </div>
            ))}
            <button className="w-full mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
              Start Practice Session
            </button>
          </div>
        ),
        priority: preferences.confidenceLevel === 'beginner' ? 10 : 7,
        size: 'large',
        position: { row: 0, col: 0 },
        theme: 'urgent'
      });
    }

    // Study streak and motivation (confidence building)
    widgets.push({
      id: 'motivation',
      title: 'Your Progress',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-orange-500" />
            <span className="font-medium">5-day study streak!</span>
          </div>
          <Progress value={68} className="h-2" />
          <p className="text-sm text-gray-600">68% exam readiness</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
            Continue Streak
          </button>
        </div>
      ),
      priority: preferences.confidenceLevel === 'beginner' ? 9 : 5,
      size: 'medium',
      position: { row: 0, col: 1 },
      theme: 'motivational'
    });

    // Time-based widget (study session or break reminder)
    const currentHour = new Date().getHours();
    const isStudyTime = (
      (preferences.preferredStudyTime === 'morning' && currentHour >= 6 && currentHour < 10) ||
      (preferences.preferredStudyTime === 'afternoon' && currentHour >= 14 && currentHour < 18) ||
      (preferences.preferredStudyTime === 'evening' && currentHour >= 18 && currentHour < 22) ||
      (preferences.preferredStudyTime === 'night' && (currentHour >= 22 || currentHour < 2))
    );

    widgets.push({
      id: 'time-context',
      title: isStudyTime ? 'Perfect Study Time!' : 'Study Schedule',
      content: (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className={isStudyTime ? 'text-green-600 font-medium' : 'text-gray-600'}>
              {isStudyTime ? 'Optimal focus window active' : 'Next study session in 2 hours'}
            </span>
          </div>
          {isStudyTime && (
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Start Focus Session
            </button>
          )}
        </div>
      ),
      priority: isStudyTime ? 8 : 4,
      size: 'small',
      position: { row: 1, col: 0 },
      theme: isStudyTime ? 'active' : 'neutral'
    });

    // Learning style optimized widget
    if (preferences.learningStyle === 'visual') {
      widgets.push({
        id: 'visual-learning',
        title: 'Visual Study Tools',
        content: (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button className="p-3 bg-purple-100 rounded text-purple-800 text-sm font-medium">
                Mind Maps
              </button>
              <button className="p-3 bg-blue-100 rounded text-blue-800 text-sm font-medium">
                Diagrams
              </button>
              <button className="p-3 bg-green-100 rounded text-green-800 text-sm font-medium">
                Flashcards
              </button>
              <button className="p-3 bg-orange-100 rounded text-orange-800 text-sm font-medium">
                Charts
              </button>
            </div>
          </div>
        ),
        priority: 6,
        size: 'medium',
        position: { row: 1, col: 1 },
        theme: 'learning-visual'
      });
    }

    // Exam proximity urgency (if exam date is near)
    const examDate = new Date('2024-06-15'); // Mock exam date
    const daysUntilExam = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExam <= 30) {
      widgets.push({
        id: 'exam-countdown',
        title: 'Exam Countdown',
        content: (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{daysUntilExam}</div>
              <div className="text-sm text-gray-600">days remaining</div>
            </div>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
              Intensive Review
            </button>
          </div>
        ),
        priority: daysUntilExam <= 7 ? 10 : 8,
        size: 'small',
        position: { row: 2, col: 0 },
        theme: 'urgent'
      });
    }

    return widgets.sort((a, b) => b.priority - a.priority);
  }, [userProfile, preferences]);

  const getLayoutClass = () => {
    switch (preferences.learningStyle) {
      case 'visual':
        return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'; // Masonry-like
      case 'auditory':
        return 'grid-cols-1 md:grid-cols-2'; // Linear
      case 'kinesthetic':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // Interactive grid
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getWidgetSizeClass = (size: string) => {
    switch (size) {
      case 'small':
        return 'min-h-[150px]';
      case 'medium':
        return 'min-h-[250px]';
      case 'large':
        return 'min-h-[350px] md:col-span-2';
      default:
        return 'min-h-[200px]';
    }
  };

  const getThemeClass = (theme: string) => {
    switch (theme) {
      case 'urgent':
        return 'border-red-200 bg-red-50/50';
      case 'motivational':
        return 'border-green-200 bg-green-50/50';
      case 'active':
        return 'border-blue-200 bg-blue-50/50';
      case 'learning-visual':
        return 'border-purple-200 bg-purple-50/50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Adaptive header based on time and user state */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold">
          {preferences.confidenceLevel === 'beginner' ? 'Building Your Foundation' : 
           preferences.confidenceLevel === 'advanced' ? 'Final Sprint Mode' : 
           'Steady Progress Mode'}
        </h2>
        <p className="text-gray-600 mt-2">
          Personalized for {userProfile.name} • {preferences.examGoal} Preparation
        </p>
      </motion.div>

      {/* Adaptive widget grid */}
      <div className={`grid gap-6 ${getLayoutClass()}`}>
        {adaptiveWidgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={getWidgetSizeClass(widget.size)}
          >
            <Card className={`h-full ${getThemeClass(widget.theme)}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{widget.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {widget.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Original children content */}
      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default AdaptiveDashboardLayout;
