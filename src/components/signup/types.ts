
export interface Demographics {
  age: number;
  gender: string;
  educationLevel: string;
  institute?: string;
}

export interface Goal {
  type: string;
  examType?: string;
  targetDate?: string;
  specificExam?: string;
  subjects?: string[];
  careerPath?: string;
  skillLevel?: string;
  preferredLearningStyle?: string;
}

export interface UserOnboardingFormData {
  step: number;
  name?: string;
  email?: string;
  password?: string;
  demographics?: Demographics;
  goals?: Goal[];
}

export interface OnboardingContextType {
  formData: UserOnboardingFormData;
  updateFormData: (data: Partial<UserOnboardingFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}
