
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserGoal, MoodType } from '@/types/user/base';
import { Brain, Target, Clock, TrendingUp, Book, Zap, Heart, Focus } from 'lucide-react';

interface AdaptiveDashboardPersonalizationProps {
  userProfile: any;
  onComplete: (preferences: DashboardPreferences) => void;
}

interface DashboardPreferences {
  examGoal: UserGoal;
  weakSubjects: string[];
  learningStyle: string;
  preferredStudyTime: string;
  confidenceLevel: string;
  focusAreas: string[];
}

const AdaptiveDashboardPersonalization: React.FC<AdaptiveDashboardPersonalizationProps> = ({
  userProfile,
  onComplete
}) => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<DashboardPreferences>({
    examGoal: userProfile.goal || 'JEE',
    weakSubjects: [],
    learningStyle: 'visual',
    preferredStudyTime: 'morning',
    confidenceLevel: 'beginner',
    focusAreas: []
  });

  const examSubjects = {
    'JEE': ['Physics', 'Chemistry', 'Mathematics'],
    'NEET': ['Physics', 'Chemistry', 'Biology'],
    'CAT': ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation'],
    'GATE': ['Engineering Mathematics', 'General Aptitude', 'Core Subject']
  };

  const learningStyles = [
    { id: 'visual', name: 'Visual Learner', icon: <Brain className="h-5 w-5" />, description: 'Charts, diagrams, flashcards' },
    { id: 'auditory', name: 'Auditory Learner', icon: <Heart className="h-5 w-5" />, description: 'Voice explanations, discussions' },
    { id: 'kinesthetic', name: 'Hands-on Learner', icon: <Zap className="h-5 w-5" />, description: 'Practice problems, simulations' },
    { id: 'reading', name: 'Reading/Writing', icon: <Book className="h-5 w-5" />, description: 'Text-based learning, notes' }
  ];

  const studyTimes = [
    { id: 'morning', name: 'Morning (6-10 AM)', icon: <Clock className="h-5 w-5" /> },
    { id: 'afternoon', name: 'Afternoon (2-6 PM)', icon: <Clock className="h-5 w-5" /> },
    { id: 'evening', name: 'Evening (6-10 PM)', icon: <Clock className="h-5 w-5" /> },
    { id: 'night', name: 'Night (10 PM-2 AM)', icon: <Clock className="h-5 w-5" /> }
  ];

  const confidenceLevels = [
    { id: 'beginner', name: 'Just Starting', description: 'Need confidence building', color: 'bg-blue-100 text-blue-800' },
    { id: 'intermediate', name: 'Making Progress', description: 'Building momentum', color: 'bg-green-100 text-green-800' },
    { id: 'advanced', name: 'Almost Ready', description: 'Fine-tuning skills', color: 'bg-purple-100 text-purple-800' }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(preferences);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold">Identify Your Weak Areas</h3>
              <p className="text-gray-600">Select subjects where you need more focus</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {examSubjects[preferences.examGoal]?.map((subject) => (
                <Card 
                  key={subject}
                  className={`cursor-pointer transition-all ${
                    preferences.weakSubjects.includes(subject) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    const newWeak = preferences.weakSubjects.includes(subject)
                      ? preferences.weakSubjects.filter(s => s !== subject)
                      : [...preferences.weakSubjects, subject];
                    setPreferences({ ...preferences, weakSubjects: newWeak });
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject}</span>
                      {preferences.weakSubjects.includes(subject) && (
                        <Badge variant="secondary">Selected</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold">Your Learning Style</h3>
              <p className="text-gray-600">How do you learn best?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {learningStyles.map((style) => (
                <Card 
                  key={style.id}
                  className={`cursor-pointer transition-all ${
                    preferences.learningStyle === style.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setPreferences({ ...preferences, learningStyle: style.id })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      {style.icon}
                      <div>
                        <div className="font-medium">{style.name}</div>
                        <div className="text-sm text-gray-600">{style.description}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold">Best Study Time</h3>
              <p className="text-gray-600">When are you most focused?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {studyTimes.map((time) => (
                <Card 
                  key={time.id}
                  className={`cursor-pointer transition-all ${
                    preferences.preferredStudyTime === time.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setPreferences({ ...preferences, preferredStudyTime: time.id })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      {time.icon}
                      <span className="font-medium">{time.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold">Confidence Level</h3>
              <p className="text-gray-600">How prepared do you feel?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {confidenceLevels.map((level) => (
                <Card 
                  key={level.id}
                  className={`cursor-pointer transition-all ${
                    preferences.confidenceLevel === level.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setPreferences({ ...preferences, confidenceLevel: level.id })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{level.name}</div>
                        <div className="text-sm text-gray-600">{level.description}</div>
                      </div>
                      <Badge className={level.color}>{level.name}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Focus className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold">Dashboard Ready!</h3>
              <p className="text-gray-600">Your personalized learning experience is being created</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Your Personalization Summary:</h4>
                <div className="space-y-2 text-sm">
                  <div>🎯 <strong>Exam Goal:</strong> {preferences.examGoal}</div>
                  <div>📚 <strong>Focus Areas:</strong> {preferences.weakSubjects.join(', ') || 'All subjects'}</div>
                  <div>🧠 <strong>Learning Style:</strong> {learningStyles.find(s => s.id === preferences.learningStyle)?.name}</div>
                  <div>⏰ <strong>Study Time:</strong> {studyTimes.find(t => t.id === preferences.preferredStudyTime)?.name}</div>
                  <div>💪 <strong>Level:</strong> {confidenceLevels.find(l => l.id === preferences.confidenceLevel)?.name}</div>
                </div>
              </div>
              
              <Progress value={100} className="h-2" />
              <p className="text-center text-sm text-gray-600">
                Creating your adaptive dashboard layout...
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Progress value={((step + 1) / 5) * 100} className="h-2" />
          <p className="text-center text-sm text-gray-600 mt-2">
            Step {step + 1} of 5: Personalizing Your Dashboard
          </p>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              {renderStep()}
              
              <div className="mt-6 flex justify-between">
                {step > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button 
                  onClick={handleNext}
                  className="ml-auto"
                  disabled={step === 0 && preferences.weakSubjects.length === 0}
                >
                  {step === 4 ? 'Create My Dashboard' : 'Continue'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdaptiveDashboardPersonalization;
