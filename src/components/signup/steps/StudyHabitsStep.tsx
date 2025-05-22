
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ChevronRight, Clock } from "lucide-react";

interface StudyHabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onSubmit }) => {
  const [breakFrequency, setBreakFrequency] = useState<string>("");
  const [stressManagement, setStressManagement] = useState<string>("");
  const [studyPreference, setStudyPreference] = useState<string>("");
  const [stressManagementCustom, setStressManagementCustom] = useState<string>("");
  const [studyPreferenceCustom, setStudyPreferenceCustom] = useState<string>("");
  const [showSkipDialog, setShowSkipDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare habits data
    const habitsData: Record<string, string> = {
      breakFrequency,
      stressManagement: stressManagement === "other" ? stressManagementCustom : stressManagement,
      studyPreference: studyPreference === "other" ? studyPreferenceCustom : studyPreference,
    };
    
    onSubmit(habitsData);
  };

  const handleSkip = () => {
    // Use default values when skipping
    onSubmit({
      breakFrequency: "occasionally",
      stressManagement: "breaks",
      studyPreference: "quiet"
    });
  };

  // Ensure all required fields are filled
  const isFormValid = breakFrequency && stressManagement && studyPreference &&
    (stressManagement !== "other" || stressManagementCustom) &&
    (studyPreference !== "other" || studyPreferenceCustom);

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-5"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium mb-1">Additional Study Preferences</h3>
            <p className="text-sm text-gray-500 mb-4">
              Let us understand more about your study habits to personalize your learning experience.
            </p>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowSkipDialog(true)}
            className="text-sm text-indigo-600 hover:bg-indigo-50 mt-1"
          >
            Skip
          </Button>
        </div>

        <motion.div 
          className="space-y-4 rounded-lg bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 p-4 border border-indigo-100 dark:border-indigo-900/30"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Break Frequency */}
          <div>
            <Label htmlFor="breakFrequency" className="text-base font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-indigo-500" />
              Break Frequency
            </Label>
            <Select value={breakFrequency} onValueChange={setBreakFrequency}>
              <SelectTrigger id="breakFrequency" className="mt-2 bg-white dark:bg-gray-900">
                <SelectValue placeholder="How often do you take breaks?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frequently">Frequently (every 30 mins)</SelectItem>
                <SelectItem value="occasionally">Occasionally (every 1-2 hours)</SelectItem>
                <SelectItem value="rarely">Rarely (study for 3+ hours straight)</SelectItem>
                <SelectItem value="pomodoro">Pomodoro technique</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stress Management */}
          <div>
            <Label htmlFor="stressManagement" className="text-base font-medium">
              How do you manage study stress?
            </Label>
            <Select value={stressManagement} onValueChange={setStressManagement}>
              <SelectTrigger id="stressManagement" className="mt-2 bg-white dark:bg-gray-900">
                <SelectValue placeholder="Select stress management technique" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exercise">Physical exercise</SelectItem>
                <SelectItem value="meditation">Meditation/Breathing techniques</SelectItem>
                <SelectItem value="music">Listening to music</SelectItem>
                <SelectItem value="breaks">Taking frequent breaks</SelectItem>
                <SelectItem value="talking">Talking to friends/family</SelectItem>
                <SelectItem value="other">Other (please specify)</SelectItem>
              </SelectContent>
            </Select>
            
            {stressManagement === "other" && (
              <Textarea
                value={stressManagementCustom}
                onChange={(e) => setStressManagementCustom(e.target.value)}
                placeholder="Please specify your stress management technique"
                className="mt-2"
              />
            )}
          </div>

          {/* Study Environment Preference */}
          <div>
            <Label htmlFor="studyPreference" className="text-base font-medium">
              Study Environment Preference
            </Label>
            <Select value={studyPreference} onValueChange={setStudyPreference}>
              <SelectTrigger id="studyPreference" className="mt-2 bg-white dark:bg-gray-900">
                <SelectValue placeholder="Select preferred environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quiet">Quiet environment</SelectItem>
                <SelectItem value="background">Background noise/music</SelectItem>
                <SelectItem value="group">Group study</SelectItem>
                <SelectItem value="library">Library/Study room</SelectItem>
                <SelectItem value="outdoors">Outdoor setting</SelectItem>
                <SelectItem value="other">Other (please specify)</SelectItem>
              </SelectContent>
            </Select>
            
            {studyPreference === "other" && (
              <Textarea
                value={studyPreferenceCustom}
                onChange={(e) => setStudyPreferenceCustom(e.target.value)}
                placeholder="Please specify your study environment preference"
                className="mt-2"
              />
            )}
          </div>
        </motion.div>

        <Button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"
          disabled={!isFormValid}
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.form>

      {/* Skip Dialog */}
      <AlertDialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <AlertDialogContent className="bg-white dark:bg-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle>Skip This Step?</AlertDialogTitle>
            <AlertDialogDescription>
              We'll use default values for your study preferences. You can always update these settings later in your profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 hover:bg-gray-100">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-indigo-600 hover:bg-indigo-700 text-white" 
              onClick={handleSkip}
            >
              Skip & Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StudyHabitsStep;
