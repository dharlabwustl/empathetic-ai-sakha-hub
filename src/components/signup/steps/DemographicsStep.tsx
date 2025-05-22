
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, HelpCircle, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface DemographicsStepProps {
  role: string;
  examGoal: string;
  onSubmit: (formValues: Record<string, string>) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ role, examGoal, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    age: '',
    school: '',
    location: ''
  });

  const [loading, setLoading] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      onSubmit(formValues);
      setLoading(false);
    }, 800); // Simulated loading for UX
  };

  const infoMessages = {
    name: "Your name helps us personalize your learning experience and communications.",
    age: "Your age helps us tailor content difficulty and study recommendations appropriate for your development stage.",
    school: "Knowing your school helps us adapt our materials to align with your curriculum and academic environment.",
    location: "Your location helps us provide region-specific exam tips and resources relevant to your area."
  };

  const showTooltip = (field: keyof typeof infoMessages) => {
    setInfoTooltip(field);
  };

  const hideTooltip = () => {
    setInfoTooltip(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Heart className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Help us personalize your {examGoal} preparation journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Label htmlFor="name" className="flex items-center">
              Full Name
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 ml-1"
                onMouseEnter={() => showTooltip('name')}
                onMouseLeave={hideTooltip}
                onClick={(e) => {
                  e.preventDefault();
                  showTooltip('name');
                }}
              >
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Button>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your full name"
              value={formValues.name}
              onChange={handleInputChange}
              required
              className="mt-1"
              autoComplete="name"
            />
            <AnimatePresence>
              {infoTooltip === 'name' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 z-50 bg-indigo-50 dark:bg-indigo-900/50 text-sm p-2 rounded-md shadow-md border border-indigo-100 dark:border-indigo-700 max-w-xs"
                >
                  {infoMessages.name}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <Label htmlFor="age" className="flex items-center">
              Age
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 ml-1"
                onMouseEnter={() => showTooltip('age')}
                onMouseLeave={hideTooltip}
                onClick={(e) => {
                  e.preventDefault();
                  showTooltip('age');
                }}
              >
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Button>
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="Your age"
              value={formValues.age}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
            <AnimatePresence>
              {infoTooltip === 'age' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 z-50 bg-indigo-50 dark:bg-indigo-900/50 text-sm p-2 rounded-md shadow-md border border-indigo-100 dark:border-indigo-700 max-w-xs"
                >
                  {infoMessages.age}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <Label htmlFor="school" className="flex items-center">
              School/College
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 ml-1"
                onMouseEnter={() => showTooltip('school')}
                onMouseLeave={hideTooltip}
                onClick={(e) => {
                  e.preventDefault();
                  showTooltip('school');
                }}
              >
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Button>
            </Label>
            <Input
              id="school"
              name="school"
              placeholder="Your school or college"
              value={formValues.school}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
            <AnimatePresence>
              {infoTooltip === 'school' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 z-50 bg-indigo-50 dark:bg-indigo-900/50 text-sm p-2 rounded-md shadow-md border border-indigo-100 dark:border-indigo-700 max-w-xs"
                >
                  {infoMessages.school}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <Label htmlFor="location" className="flex items-center">
              Location
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 ml-1"
                onMouseEnter={() => showTooltip('location')}
                onMouseLeave={hideTooltip}
                onClick={(e) => {
                  e.preventDefault();
                  showTooltip('location');
                }}
              >
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Button>
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="City, State"
              value={formValues.location}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
            <AnimatePresence>
              {infoTooltip === 'location' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 z-50 bg-indigo-50 dark:bg-indigo-900/50 text-sm p-2 rounded-md shadow-md border border-indigo-100 dark:border-indigo-700 max-w-xs"
                >
                  {infoMessages.location}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
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
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50">
            <CardContent className="p-3 text-sm text-center text-blue-700 dark:text-blue-300">
              <p>
                Your information helps us create a personalized {examGoal} study plan optimized for your specific needs.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DemographicsStep;
