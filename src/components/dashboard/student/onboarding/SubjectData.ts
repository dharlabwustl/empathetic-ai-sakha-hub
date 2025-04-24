
export const getSubjectsForGoal = (examGoal: string): string[] => {
  // Map exam goals to relevant subjects
  switch (examGoal) {
    case "IIT-JEE":
    case "JEE":
    case "Engineering":
      return ["Physics", "Chemistry", "Mathematics"];
    
    case "NEET":
    case "Medical":
      return ["Physics", "Chemistry", "Biology"];
    
    case "UPSC":
    case "Civil Services":
      return ["History", "Geography", "Polity", "Economics", "General Studies"];
    
    case "Board Exams":
    case "Class 12":
    case "Class 10":
      return ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography"];
      
    case "Banking":
    case "SSC":
      return ["Mathematics", "Reasoning", "English", "General Awareness", "Computer Knowledge"];
      
    case "GMAT":
    case "CAT":
      return ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation", "Logical Reasoning"];
    
    case "GATE":
      return ["Engineering Mathematics", "General Aptitude", "Subject Specific"];
    
    default:
      return ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography"];
  }
};

export const getStrongSubjects = (goal: string, examType: string | undefined): { name: string, isStrong: boolean }[] => {
  const subjects = getSubjectsForGoal(goal || examType || "");
  
  // For now, we'll just return the list with all subjects as "not strong"
  return subjects.map(name => ({
    name,
    isStrong: false
  }));
};

export const getWeakSubjects = (goal: string, examType: string | undefined): { name: string, isWeak: boolean }[] => {
  const subjects = getSubjectsForGoal(goal || examType || "");
  
  // For now, we'll just return the list with all subjects as "not weak"
  return subjects.map(name => ({
    name,
    isWeak: false
  }));
};

// Add these exports for ContentUploader.tsx
export const subjectsByGoal = {
  "IIT-JEE": ["Physics", "Chemistry", "Mathematics"],
  "NEET": ["Physics", "Chemistry", "Biology"],
  "UPSC": ["History", "Geography", "Polity", "Economics", "General Studies"],
  "Board Exams": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography"],
  "Banking": ["Mathematics", "Reasoning", "English", "General Awareness", "Computer Knowledge"],
  "CAT": ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation", "Logical Reasoning"],
  "GATE": ["Engineering Mathematics", "General Aptitude", "Subject Specific"],
};

export const defaultSubjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English"];

// Create type definitions for better type safety
export interface SubjectItem {
  name: string;
  isSelected?: boolean;
  isStrong?: boolean;
  isWeak?: boolean;
  topics?: number;
  progress?: number;
}

export interface SubjectSelectionResult {
  strongSubjects: string[];
  weakSubjects: string[];
  allSelectedSubjects: string[];
}
