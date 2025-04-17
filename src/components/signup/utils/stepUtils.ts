
import { UserRole } from "@/types/user/base";

export const getDemographicsQuestion = (role: UserRole) => {
  switch(role) {
    case "student": 
      return "Great! To help personalize your learning experience, could you share your age, class/grade (10th to post graduation), and location?";
    case "employee" as UserRole: 
      return "Excellent! Please tell me about your job role, seniority level, and domain to customize your professional growth plan.";
    case "doctor" as UserRole: 
      return "Thanks! Could you share your specialization, institution, and any ongoing research you're working on?";
    case "founder" as UserRole: 
      return "Perfect! To tailor our support, please share your startup stage, team size, industry, and main goals.";
    default: 
      return "Please tell me more about yourself.";
  }
};
