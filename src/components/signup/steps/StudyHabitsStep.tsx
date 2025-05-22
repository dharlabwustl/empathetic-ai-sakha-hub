
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog';

interface StudyHabitsStepProps {
  onSubmit: (formValues: Record<string, string>) => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    studyTime: '',
    studyPreference: '',
    stressManagement: '',
    studyDuration: '',
    studyPreferenceCustom: '',
    stressManagementCustom: '',
  });

  const [loading, setLoading] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      onSubmit(formValues);
      setLoading(false);
    }, 800);
  };

  const handleSkipStep = () => {
    // Set default values for all fields
    const defaultValues = {
      studyTime: 'morning',
      studyPreference: 'visual',
      stressManagement: 'deepBreathing',
      studyDuration: '30to45',
      studyPreferenceCustom: '',
      stressManagementCustom: '',
    };
    
    // Submit with default values
    onSubmit(defaultValues);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <BookOpen className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Your Study Preferences</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Help us understand how you learn best
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label>When do you study best?</Label>
              <Select
                value={formValues.studyTime}
                onValueChange={(value) => handleSelectChange('studyTime', value)}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select your preferred study time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earlyMorning">Early Morning (4AM-8AM)</SelectItem>
                  <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                  <SelectItem value="evening">Evening (5PM-9PM)</SelectItem>
                  <SelectItem value="night">Night (9PM-12AM)</SelectItem>
                  <SelectItem value="lateNight">Late Night (12AM-4AM)</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label>What's your learning style?</Label>
              <RadioGroup
                value={formValues.studyPreference}
                onValueChange={(value) => handleSelectChange('studyPreference', value)}
                className="grid grid-cols-2 gap-2 mt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="visual" id="visual" />
                  <Label htmlFor="visual" className="cursor-pointer">Visual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auditory" id="auditory" />
                  <Label htmlFor="auditory" className="cursor-pointer">Auditory</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reading" id="reading" />
                  <Label htmlFor="reading" className="cursor-pointer">Reading/Writing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                  <Label htmlFor="kinesthetic" className="cursor-pointer">Kinesthetic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="cursor-pointer">Other</Label>
                </div>
              </RadioGroup>

              <AnimatePresence>
                {formValues.studyPreference === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      name="studyPreferenceCustom"
                      placeholder="Specify your learning style"
                      value={formValues.studyPreferenceCustom}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label>How do you manage study stress?</Label>
              <Select
                value={formValues.stressManagement}
                onValueChange={(value) => handleSelectChange('stressManagement', value)}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select your stress management technique" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deepBreathing">Deep Breathing</SelectItem>
                  <SelectItem value="breaks">Taking Breaks</SelectItem>
                  <SelectItem value="exercise">Physical Exercise</SelectItem>
                  <SelectItem value="music">Listening to Music</SelectItem>
                  <SelectItem value="meditation">Meditation</SelectItem>
                  <SelectItem value="custom">Other</SelectItem>
                </SelectContent>
              </Select>

              <AnimatePresence>
                {formValues.stressManagement === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      name="stressManagementCustom"
                      placeholder="Specify your stress management technique"
                      value={formValues.stressManagementCustom}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label>How long can you focus in one study session?</Label>
              <RadioGroup
                value={formValues.studyDuration}
                onValueChange={(value) => handleSelectChange('studyDuration', value)}
                className="grid grid-cols-2 gap-2 mt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="less30" id="less30" />
                  <Label htmlFor="less30" className="cursor-pointer">Less than 30 min</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30to45" id="30to45" />
                  <Label htmlFor="30to45" className="cursor-pointer">30-45 minutes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="45to60" id="45to60" />
                  <Label htmlFor="45to60" className="cursor-pointer">45-60 minutes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60plus" id="60plus" />
                  <Label htmlFor="60plus" className="cursor-pointer">More than 60 min</Label>
                </div>
              </RadioGroup>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-2 pt-2"
            >
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowSkipConfirm(true)}
              >
                Skip for now
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50"
          >
            <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
              <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p>
                These preferences help us create personalized study sessions that match your learning style.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Skip confirmation dialog */}
      <Dialog open={showSkipConfirm} onOpenChange={setShowSkipConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Skip study preferences?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 dark:text-gray-300 py-4">
            We'll use default preferences for your study plan. You can always update these settings later.
          </p>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setShowSkipConfirm(false)}>
              Go back
            </Button>
            <Button onClick={handleSkipStep}>
              Skip & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudyHabitsStep;
