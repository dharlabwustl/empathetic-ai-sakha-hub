
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

interface HabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const HabitsStep: React.FC<HabitsStepProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const habits: Record<string, string> = {};
    formData.forEach((value, key) => {
      habits[key] = value as string;
    });
    onSubmit(habits);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Label htmlFor="sleepPattern">Sleep Pattern</Label>
        <Input 
          id="sleepPattern" 
          name="sleepPattern" 
          placeholder="Describe your sleep pattern (e.g., 6-8 hours daily)" 
          className="mt-2" 
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Label htmlFor="dailyRoutine">Daily Routine</Label>
        <Input 
          id="dailyRoutine" 
          name="dailyRoutine" 
          placeholder="Describe your daily routine" 
          className="mt-2" 
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Label htmlFor="stressManagement">Stress Management Methods</Label>
        <RadioGroup defaultValue="meditation" name="stressManagement" className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="meditation" id="meditation" />
            <Label htmlFor="meditation" className="cursor-pointer">Meditation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="exercise" id="exercise" />
            <Label htmlFor="exercise" className="cursor-pointer">Exercise</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hobbies" id="hobbies" />
            <Label htmlFor="hobbies" className="cursor-pointer">Hobbies/Creative activities</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="social" id="social" />
            <Label htmlFor="social" className="cursor-pointer">Talking with friends/family</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom-stress" />
            <Label htmlFor="custom-stress" className="cursor-pointer">Other (specify below)</Label>
          </div>
        </RadioGroup>
        <Input id="stressManagementCustom" name="stressManagementCustom" placeholder="Describe other stress management methods" className="mt-2" />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Label htmlFor="focusDuration">Focus Duration</Label>
        <Input 
          id="focusDuration" 
          name="focusDuration" 
          placeholder="How long can you focus? (e.g., 25 minutes with 5-minute breaks)" 
          className="mt-2" 
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Label htmlFor="studyPreference">Study Preference</Label>
        <RadioGroup defaultValue="visual" name="studyPreference" className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="visual" id="visual" />
            <Label htmlFor="visual" className="cursor-pointer">Visual learning (diagrams, videos)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="auditory" id="auditory" />
            <Label htmlFor="auditory" className="cursor-pointer">Auditory learning (lectures, discussions)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reading" id="reading" />
            <Label htmlFor="reading" className="cursor-pointer">Reading/writing</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="kinesthetic" id="kinesthetic" />
            <Label htmlFor="kinesthetic" className="cursor-pointer">Hands-on learning</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="group" id="group" />
            <Label htmlFor="group" className="cursor-pointer">Group study</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom-study" id="custom-study" />
            <Label htmlFor="custom-study" className="cursor-pointer">Other (specify below)</Label>
          </div>
        </RadioGroup>
        <Input id="studyPreferenceCustom" name="studyPreferenceCustom" placeholder="Describe any other study preferences" className="mt-2" />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700"
          >
            Next
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  );
};

export default HabitsStep;
