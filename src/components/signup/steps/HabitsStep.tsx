
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
        <Select name="sleepPattern" defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="Select or type your sleep pattern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6-8 hours daily">6-8 hours daily</SelectItem>
            <SelectItem value="Less than 6 hours">Less than 6 hours</SelectItem>
            <SelectItem value="8+ hours daily">8+ hours daily</SelectItem>
            <SelectItem value="Irregular sleep schedule">Irregular sleep schedule</SelectItem>
            <SelectItem value="">Custom (type below)</SelectItem>
          </SelectContent>
        </Select>
        <Input id="sleepPatternCustom" name="sleepPatternCustom" placeholder="Or type your custom sleep pattern" className="mt-2" />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Label htmlFor="dailyRoutine">Daily Routine</Label>
        <Select name="dailyRoutine" defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="Select your daily routine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Morning study, evening review">Morning study, evening review</SelectItem>
            <SelectItem value="Afternoon focused sessions">Afternoon focused sessions</SelectItem>
            <SelectItem value="Night owl - study late">Night owl - study late</SelectItem>
            <SelectItem value="Study between classes">Study between classes</SelectItem>
            <SelectItem value="">Custom (type below)</SelectItem>
          </SelectContent>
        </Select>
        <Input id="dailyRoutineCustom" name="dailyRoutineCustom" placeholder="Or describe your custom daily routine" className="mt-2" />
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
        <Select name="focusDuration" defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="How long can you focus?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25 minutes with 5-minute breaks">25 minutes with 5-minute breaks</SelectItem>
            <SelectItem value="45 minutes with 15-minute breaks">45 minutes with 15-minute breaks</SelectItem>
            <SelectItem value="1 hour with 20-minute breaks">1 hour with 20-minute breaks</SelectItem>
            <SelectItem value="90+ minutes, long breaks">90+ minutes, long breaks</SelectItem>
            <SelectItem value="">Custom (type below)</SelectItem>
          </SelectContent>
        </Select>
        <Input id="focusDurationCustom" name="focusDurationCustom" placeholder="Or describe your custom focus pattern" className="mt-2" />
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
