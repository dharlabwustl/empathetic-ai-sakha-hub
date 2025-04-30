
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useOnboardingContext } from '../OnboardingContext';
import { motion } from 'framer-motion';
import { Clock, Calendar, Brain, SunMoon } from 'lucide-react';

interface StudyHabitsStepProps {
  onNext: () => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onNext }) => {
  const { formData, updateFormData } = useOnboardingContext();
  const [studyDuration, setStudyDuration] = useState(formData.studyDuration || 2);
  const [studyFrequency, setStudyFrequency] = useState(formData.studyFrequency || "daily");
  const [preferredTime, setPreferredTime] = useState(formData.preferredTime || "morning");
  const [learningStyle, setLearningStyle] = useState(formData.learningStyle || "visual");

  const handleSubmit = () => {
    updateFormData({
      studyHabits: {
        studyDuration,
        studyFrequency,
        preferredTime,
        learningStyle,
      }
    });
    onNext();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.p variants={item} className="text-muted-foreground text-center">
        Tell us about your study preferences to customize your learning experience
      </motion.p>

      {/* Study Duration */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-blue-600" />
          <Label className="font-medium">How many hours can you study per day?</Label>
        </div>
        <div className="space-y-2">
          <Slider
            value={[studyDuration]}
            min={0.5}
            max={8}
            step={0.5}
            onValueChange={(vals) => setStudyDuration(vals[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>30min</span>
            <span>{studyDuration} hours</span>
            <span>8h</span>
          </div>
        </div>
      </motion.div>

      {/* Study Frequency */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-purple-600" />
          <Label className="font-medium">How often do you plan to study?</Label>
        </div>
        <RadioGroup
          value={studyFrequency}
          onValueChange={setStudyFrequency}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">Daily</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekdays" id="weekdays" />
            <Label htmlFor="weekdays">Weekdays only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekends" id="weekends" />
            <Label htmlFor="weekends">Weekends only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="few-times" id="few-times" />
            <Label htmlFor="few-times">Few times a week</Label>
          </div>
        </RadioGroup>
      </motion.div>

      {/* Preferred Study Time */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center">
          <SunMoon className="h-4 w-4 mr-2 text-amber-600" />
          <Label className="font-medium">When do you study best?</Label>
        </div>
        <RadioGroup
          value={preferredTime}
          onValueChange={setPreferredTime}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="morning" id="morning" />
            <Label htmlFor="morning">Early morning (5 AM - 9 AM)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daytime" id="daytime" />
            <Label htmlFor="daytime">Daytime (9 AM - 4 PM)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="evening" id="evening" />
            <Label htmlFor="evening">Evening (4 PM - 8 PM)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="night" id="night" />
            <Label htmlFor="night">Night (8 PM - 12 AM)</Label>
          </div>
        </RadioGroup>
      </motion.div>

      {/* Learning Style */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center">
          <Brain className="h-4 w-4 mr-2 text-green-600" />
          <Label className="font-medium">What's your learning style?</Label>
        </div>
        <RadioGroup
          value={learningStyle}
          onValueChange={setLearningStyle}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="visual" id="visual" />
            <Label htmlFor="visual">Visual (images, diagrams, videos)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="auditory" id="auditory" />
            <Label htmlFor="auditory">Auditory (listening, discussing)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reading" id="reading" />
            <Label htmlFor="reading">Reading/Writing (text, notes)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="kinesthetic" id="kinesthetic" />
            <Label htmlFor="kinesthetic">Kinesthetic (hands-on activities)</Label>
          </div>
        </RadioGroup>
      </motion.div>

      <motion.div variants={item} className="pt-4">
        <Button onClick={handleSubmit} className="w-full">
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default StudyHabitsStep;
