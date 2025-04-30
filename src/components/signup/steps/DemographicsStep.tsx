
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/types/user/base';

interface DemographicsStepProps {
  role: UserRole | string;
  goal: string;
  onSubmit: (data: Record<string, string>) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ role, goal, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    age: "",
    grade: "",
    city: "",
    institute: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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

  // Determine which fields to show based on role
  const isStudent = role === UserRole.Student || role === "Student";
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold text-center mb-2">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          {isStudent 
            ? `We'll personalize your ${goal} preparation experience` 
            : "We'll customize your experience based on your profile"}
        </p>
      </motion.div>

      {isStudent && (
        <motion.div variants={item} className="space-y-4">
          <div>
            <Label htmlFor="age">Your Age</Label>
            <Input 
              id="age"
              type="number"
              placeholder="e.g. 17" 
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="grade">Current Grade/Year</Label>
            <Select 
              onValueChange={(value) => handleChange('grade', value)}
              defaultValue={formData.grade}
            >
              <SelectTrigger id="grade">
                <SelectValue placeholder="Select your grade/year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
                <SelectItem value="12-pass">12th Pass</SelectItem>
                <SelectItem value="college-1">College Year 1</SelectItem>
                <SelectItem value="college-2">College Year 2</SelectItem>
                <SelectItem value="college-3">College Year 3</SelectItem>
                <SelectItem value="college-4">College Year 4</SelectItem>
                <SelectItem value="working">Working Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="city">Your City</Label>
            <Input 
              id="city"
              placeholder="e.g. New Delhi" 
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="institute">School/Institute</Label>
            <Input 
              id="institute"
              placeholder="e.g. Delhi Public School" 
              value={formData.institute}
              onChange={(e) => handleChange('institute', e.target.value)}
            />
          </div>
        </motion.div>
      )}
      
      {!isStudent && (
        <motion.div variants={item} className="space-y-4">
          {/* Fields for teachers/other professionals */}
          <div>
            <Label htmlFor="experience">Years of Experience</Label>
            <Input 
              id="experience"
              placeholder="e.g. 5" 
              value={formData.experience || ""}
              onChange={(e) => handleChange('experience', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="specialization">Specialization/Subject</Label>
            <Input 
              id="specialization"
              placeholder="e.g. Physics, Mathematics" 
              value={formData.specialization || ""}
              onChange={(e) => handleChange('specialization', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="institute">Institute/Organization</Label>
            <Input 
              id="institute"
              placeholder="Where do you work?" 
              value={formData.institute || ""}
              onChange={(e) => handleChange('institute', e.target.value)}
            />
          </div>
        </motion.div>
      )}

      <motion.div variants={item}>
        <Button type="submit" className="w-full">Continue</Button>
      </motion.div>
    </motion.form>
  );
};

export default DemographicsStep;
