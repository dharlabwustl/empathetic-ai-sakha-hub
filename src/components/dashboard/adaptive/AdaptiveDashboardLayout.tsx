
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MoodType, LearningStyle, StudyStyle, UserGoal } from '@/types/user/base';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, TrendingUp, Book, Brain, Zap, AlertTriangle, Trophy, Calendar } from 'lucide-react';

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
  examGoalRelevance: number;
}

const AdaptiveDashboardLayout: React.FC<AdaptiveDashboardLayoutProps> = ({
  userProfile,
  preferences,
  children
}) => {
  const adaptiveConfig = useMemo(() => {
    const examGoal = userProfile?.examGoal || preferences?.examGoal || 'NEET';
    const learningStyle = userProfile?.learningStyle || preferences?.learningStyle || 'visual';
    const studyStyle = userProfile?.studyStyle || preferences?.studyStyle || 'gradual';
    const currentMood = userProfile?.currentMood || preferences?.currentMood || MoodType.MOTIVATED;
    const performanceLevel = userProfile?.performanceLevel || preferences?.confidenceLevel || 'intermediate';
    
    // Calculate exam proximity
    const examDate = new Date(userProfile?.examDate || preferences?.examDate || '2024-06-15');
    const daysUntilExam = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const isExamNear = daysUntilExam <= 30;
    const isCriticalTime = daysUntilExam <= 7;
    
    // Time-based context
    const currentHour = new Date().getHours();
    const isStudyTime = (
      (preferences?.preferredStudyTime === 'morning' && currentHour >= 6 && currentHour < 10) ||
      (preferences?.preferredStudyTime === 'afternoon' && currentHour >= 14 && currentHour < 18) ||
      (preferences?.preferredStudyTime === 'evening' && currentHour >= 18 && currentHour < 22) ||
      (preferences?.preferredStudyTime === 'night' && (currentHour >= 22 || currentHour < 2))
    );

    return {
      examGoal,
      learningStyle,
      studyStyle,
      currentMood,
      performanceLevel,
      daysUntilExam,
      isExamNear,
      isCriticalTime,
      isStudyTime,
      weakSubjects: preferences?.weakSubjects || [],
      strongSubjects: preferences?.strongSubjects || []
    };
  }, [userProfile, preferences]);

  const adaptiveWidgets = useMemo(() => {
    const widgets: AdaptiveWidget[] = [];
    const { examGoal, learningStyle, currentMood, performanceLevel, daysUntilExam, isExamNear, isCriticalTime, isStudyTime, weakSubjects } = adaptiveConfig;

    // 1. Exam Goal Specific Widget
    const examGoalContent = {
      'NEET': {
        subjects: ['Physics', 'Chemistry', 'Biology'],
        focusAreas: ['NCERT Mastery', 'Previous Year Questions', 'Mock Tests'],
        urgencyLevel: isExamNear ? 'high' : 'medium'
      },
      'JEE': {
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        focusAreas: ['Problem Solving', 'Concept Clarity', 'Speed & Accuracy'],
        urgencyLevel: isExamNear ? 'high' : 'medium'
      },
      'UPSC': {
        subjects: ['General Studies', 'Optional Subject', 'Current Affairs'],
        focusAreas: ['Answer Writing', 'Revision', 'Test Series'],
        urgencyLevel: 'medium'
      }
    };

    const currentExamContent = examGoalContent[examGoal as keyof typeof examGoalContent] || examGoalContent['NEET'];

    widgets.push({
      id: 'exam-goal-focus',
      title: `${examGoal} Preparation Hub`,
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">{examGoal} Strategy</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {currentExamContent.subjects.map((subject) => (
              <button key={subject} className={`p-2 rounded text-sm font-medium ${
                weakSubjects.includes(subject) 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
                {subject}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">Priority Focus Areas:</p>
            {currentExamContent.focusAreas.map((area, index) => (
              <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      ),
      priority: 10,
      size: 'large',
      position: { row: 0, col: 0 },
      theme: isCriticalTime ? 'critical' : isExamNear ? 'urgent' : 'focused',
      examGoalRelevance: 10
    });

    // 2. Exam Proximity Urgency Widget
    if (isExamNear) {
      widgets.push({
        id: 'exam-countdown',
        title: isCriticalTime ? '🚨 Final Sprint Mode' : 'Exam Approaching',
        content: (
          <div className="space-y-3">
            <div className="text-center">
              <div className={`text-3xl font-bold ${isCriticalTime ? 'text-red-600' : 'text-orange-600'}`}>
                {daysUntilExam}
              </div>
              <div className="text-sm text-gray-600">days remaining</div>
            </div>
            <Progress value={Math.max(0, 100 - (daysUntilExam / 365 * 100))} className="h-2" />
            <button className={`w-full px-4 py-2 text-white rounded transition-colors ${
              isCriticalTime ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'
            }`}>
              {isCriticalTime ? 'Emergency Revision' : 'Intensive Review'}
            </button>
          </div>
        ),
        priority: isCriticalTime ? 10 : 8,
        size: 'medium',
        position: { row: 0, col: 1 },
        theme: isCriticalTime ? 'critical' : 'urgent',
        examGoalRelevance: 9
      });
    }

    // 3. Learning Style Optimized Widget
    const learningStyleContent = {
      [LearningStyle.VISUAL]: {
        title: 'Visual Learning Tools',
        tools: ['Mind Maps', 'Diagrams', 'Flashcards', 'Charts'],
        colors: ['purple', 'blue', 'green', 'orange']
      },
      [LearningStyle.AUDITORY]: {
        title: 'Audio Learning Resources',
        tools: ['Lectures', 'Discussions', 'Audio Notes', 'Podcasts'],
        colors: ['blue', 'teal', 'cyan', 'indigo']
      },
      [LearningStyle.KINESTHETIC]: {
        title: 'Interactive Learning',
        tools: ['Simulations', 'Experiments', 'Practice Tests', 'Models'],
        colors: ['green', 'emerald', 'lime', 'teal']
      }
    };

    const styleContent = learningStyleContent[learningStyle as LearningStyle] || learningStyleContent[LearningStyle.VISUAL];

    widgets.push({
      id: 'learning-style',
      title: styleContent.title,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {styleContent.tools.map((tool, index) => (
              <button key={tool} className={`p-3 bg-${styleContent.colors[index]}-100 rounded text-${styleContent.colors[index]}-800 text-sm font-medium hover:bg-${styleContent.colors[index]}-200 transition-colors`}>
                {tool}
              </button>
            ))}
          </div>
        </div>
      ),
      priority: 7,
      size: 'medium',
      position: { row: 1, col: 0 },
      theme: 'learning-optimized',
      examGoalRelevance: 6
    });

    // 4. Mood-Based Motivation Widget
    const moodContent = {
      [MoodType.STRESSED]: {
        title: 'Stress Relief Zone',
        action: 'Take a Break',
        color: 'blue',
        icon: '🌊',
        suggestion: 'Try breathing exercises or light meditation'
      },
      [MoodType.MOTIVATED]: {
        title: 'Momentum Building',
        action: 'Keep Going!',
        color: 'green',
        icon: '🚀',
        suggestion: 'Perfect time for challenging problems'
      },
      [MoodType.FOCUSED]: {
        title: 'Deep Work Mode',
        action: 'Study Session',
        color: 'purple',
        icon: '🎯',
        suggestion: 'Tackle your most difficult topics now'
      },
      [MoodType.OVERWHELMED]: {
        title: 'Simplify & Organize',
        action: 'Break It Down',
        color: 'orange',
        icon: '📋',
        suggestion: 'Focus on one small task at a time'
      }
    };

    const moodConfig = moodContent[currentMood] || moodContent[MoodType.MOTIVATED];

    widgets.push({
      id: 'mood-based',
      title: `${moodConfig.icon} ${moodConfig.title}`,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{moodConfig.suggestion}</p>
          <button className={`w-full px-4 py-2 bg-${moodConfig.color}-600 text-white rounded hover:bg-${moodConfig.color}-700 transition-colors`}>
            {moodConfig.action}
          </button>
        </div>
      ),
      priority: performanceLevel === 'beginner' ? 8 : 5,
      size: 'small',
      position: { row: 1, col: 1 },
      theme: `mood-${currentMood}`,
      examGoalRelevance: 4
    });

    // 5. Performance-Based Widget
    const performanceWidget = {
      'beginner': {
        title: 'Foundation Building',
        focus: 'Basic concepts and confidence building',
        nextStep: 'Start with fundamentals',
        priority: 9
      },
      'intermediate': {
        title: 'Skill Enhancement',
        focus: 'Practice and application',
        nextStep: 'Solve practice problems',
        priority: 6
      },
      'advanced': {
        title: 'Mastery Mode',
        focus: 'Advanced problems and speed',
        nextStep: 'Challenge yourself',
        priority: 7
      }
    };

    const perfConfig = performanceWidget[performanceLevel as keyof typeof performanceWidget];

    widgets.push({
      id: 'performance-based',
      title: perfConfig.title,
      content: (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium">{perfConfig.focus}</span>
          </div>
          <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
            {perfConfig.nextStep}
          </button>
        </div>
      ),
      priority: perfConfig.priority,
      size: 'small',
      position: { row: 2, col: 0 },
      theme: 'performance',
      examGoalRelevance: 7
    });

    // 6. Time-Context Widget
    widgets.push({
      id: 'time-context',
      title: isStudyTime ? '⏰ Peak Focus Time!' : 'Study Schedule',
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
      priority: isStudyTime ? 8 : 3,
      size: 'small',
      position: { row: 2, col: 1 },
      theme: isStudyTime ? 'active' : 'neutral',
      examGoalRelevance: 5
    });

    return widgets.sort((a, b) => b.priority - a.priority);
  }, [adaptiveConfig]);

  const getLayoutClass = () => {
    const { learningStyle, studyStyle } = adaptiveConfig;
    
    if (learningStyle === LearningStyle.VISUAL) {
      return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'; // Visual masonry
    } else if (learningStyle === LearningStyle.AUDITORY) {
      return 'grid-cols-1 md:grid-cols-2'; // Linear for audio learners
    } else if (learningStyle === LearningStyle.KINESTHETIC) {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // Interactive grid
    }
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  const getWidgetSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'min-h-[150px]';
      case 'medium': return 'min-h-[250px]';
      case 'large': return 'min-h-[350px] md:col-span-2';
      default: return 'min-h-[200px]';
    }
  };

  const getThemeClass = (theme: string) => {
    switch (theme) {
      case 'critical': return 'border-red-300 bg-red-50/80 shadow-red-100';
      case 'urgent': return 'border-orange-200 bg-orange-50/50';
      case 'focused': return 'border-blue-200 bg-blue-50/50';
      case 'learning-optimized': return 'border-purple-200 bg-purple-50/50';
      case 'performance': return 'border-yellow-200 bg-yellow-50/50';
      case 'active': return 'border-green-200 bg-green-50/50';
      case 'motivational': return 'border-emerald-200 bg-emerald-50/50';
      default: return 'border-gray-200 bg-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Adaptive Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold">
          {adaptiveConfig.examGoal} Preparation Dashboard
        </h2>
        <p className="text-gray-600 mt-2">
          Personalized for {userProfile.name} • {adaptiveConfig.performanceLevel} level • {adaptiveConfig.daysUntilExam} days to exam
        </p>
      </motion.div>

      {/* Adaptive Widget Grid */}
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

      {/* Original Children Content */}
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
