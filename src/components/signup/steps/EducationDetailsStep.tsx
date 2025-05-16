
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { EducationLevel } from '@/types/user/base';

interface EducationDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
  onboardingData: Record<string, any>;
  setOnboardingData: (data: Record<string, any>) => void;
}

const EducationDetailsStep: React.FC<EducationDetailsStepProps> = ({
  onNext,
  onBack,
  onboardingData,
  setOnboardingData,
}) => {
  const [educationLevel, setEducationLevel] = useState<EducationLevel>(
    onboardingData.educationLevel || EducationLevel.HighSchool
  );
  const [grade, setGrade] = useState<string>(onboardingData.grade || '');
  const [schoolName, setSchoolName] = useState<string>(onboardingData.schoolName || '');
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    if (!grade) {
      setError('Please select your grade/year');
      return;
    }

    setOnboardingData({
      educationLevel,
      grade,
      schoolName
    });
    
    onNext();
  };

  // Generate grade options based on education level
  const getGradeOptions = () => {
    switch (educationLevel) {
      case EducationLevel.HighSchool:
        return [
          { value: '9', label: 'Class 9' },
          { value: '10', label: 'Class 10' },
          { value: '11', label: 'Class 11' },
          { value: '12', label: 'Class 12' },
        ];
      case EducationLevel.Undergraduate:
        return [
          { value: '1', label: '1st Year' },
          { value: '2', label: '2nd Year' },
          { value: '3', label: '3rd Year' },
          { value: '4', label: '4th Year' },
        ];
      case EducationLevel.Graduate:
        return [
          { value: '1', label: '1st Year' },
          { value: '2', label: '2nd Year' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Education Details</h2>
        <p className="text-muted-foreground">Tell us about your educational background</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base">Education Level</Label>
          <RadioGroup
            value={educationLevel}
            onValueChange={(val) => {
              setEducationLevel(val as EducationLevel);
              setGrade('');
            }}
            className="flex flex-col space-y-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={EducationLevel.HighSchool} id="highschool" />
              <Label htmlFor="highschool" className="font-normal">High School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={EducationLevel.Undergraduate} id="undergraduate" />
              <Label htmlFor="undergraduate" className="font-normal">Undergraduate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={EducationLevel.Graduate} id="graduate" />
              <Label htmlFor="graduate" className="font-normal">Graduate</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="grade">Current Grade/Year</Label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger id="grade" className="w-full">
              <SelectValue placeholder="Select your grade/year" />
            </SelectTrigger>
            <SelectContent>
              {getGradeOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        {/* Added School/Institute name field as requested */}
        <div>
          <Label htmlFor="schoolName">School/Institute Name (optional)</Label>
          <Input
            id="schoolName"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="Enter your school or institute name"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EducationDetailsStep;
