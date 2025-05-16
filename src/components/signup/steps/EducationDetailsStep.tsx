
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { OnboardingStepProps } from '../OnboardingContext';
import SignupStepLayout from '../SignupStepLayout';
import { checkExamName } from '@/utils/checkExamName';

const EducationDetailsStep: React.FC<OnboardingStepProps> = ({ data, updateData, nextStep }) => {
  const handleEducationLevelChange = (value: string) => {
    updateData({ educationLevel: value });
  };

  const handleExamChange = (value: string) => {
    updateData({ targetExam: value });
  };

  const handleGradeChange = (value: string) => {
    updateData({ grade: value });
  };

  const handleSchoolInstituteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ schoolInstitute: e.target.value });
  };

  const handleNextStep = () => {
    if (!data.educationLevel || !data.targetExam) {
      // Show validation error or alert
      return;
    }
    nextStep();
  };

  return (
    <SignupStepLayout
      title="Education Details"
      subtitle="Help us customize your learning experience"
    >
      <div className="space-y-6 w-full max-w-md">
        <div className="space-y-2">
          <Label htmlFor="education-level">Education Level</Label>
          <Select
            value={data.educationLevel || ''}
            onValueChange={handleEducationLevelChange}
          >
            <SelectTrigger id="education-level">
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="undergrad">Undergraduate</SelectItem>
              <SelectItem value="grad-preparing">Preparing for Graduate Exams</SelectItem>
              <SelectItem value="post-grad">Post Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-exam">Target Exam</Label>
          <Select
            value={data.targetExam || ''}
            onValueChange={handleExamChange}
          >
            <SelectTrigger id="target-exam">
              <SelectValue placeholder="Select your target exam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEET">NEET</SelectItem>
              <SelectItem value="AIIMS">AIIMS</SelectItem>
              <SelectItem value="JIPMER">JIPMER</SelectItem>
              <SelectItem value="OTHER">Other Medical Entrance</SelectItem>
            </SelectContent>
          </Select>
          {data.targetExam === 'OTHER' && (
            <Input
              className="mt-2"
              placeholder="Enter exam name"
              value={data.otherExam || ''}
              onChange={(e) => updateData({ otherExam: e.target.value })}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Grade/Year</Label>
          <Select
            value={data.grade || ''}
            onValueChange={handleGradeChange}
          >
            <SelectTrigger id="grade">
              <SelectValue placeholder="Select your grade/year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="11">11th Grade</SelectItem>
              <SelectItem value="12">12th Grade</SelectItem>
              <SelectItem value="12-pass">12th Pass</SelectItem>
              <SelectItem value="dropper">Dropper (Gap Year)</SelectItem>
              <SelectItem value="repeat">Repeater</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="school-institute">School/Institute Name (Optional)</Label>
          <Input
            id="school-institute"
            placeholder="Enter your school or institute name"
            value={data.schoolInstitute || ''}
            onChange={handleSchoolInstituteChange}
          />
        </div>

        <Button
          type="button"
          className="w-full"
          onClick={handleNextStep}
          disabled={!data.educationLevel || !data.targetExam || (data.targetExam === 'OTHER' && !checkExamName(data.otherExam))}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </SignupStepLayout>
  );
};

export default EducationDetailsStep;
