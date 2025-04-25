
export const getSubjectsForGoal = (examGoal: string): string[] => {
  const subjectsByExam: Record<string, string[]> = {
    "IIT-JEE": ["Physics", "Chemistry", "Mathematics"],
    "NEET": ["Physics", "Chemistry", "Biology"],
    "Board Exams": ["Mathematics", "Science", "Social Studies", "English", "Hindi"],
    "UPSC": ["History", "Geography", "Polity", "Economics", "Current Affairs"],
    "Banking": ["Reasoning", "Quantitative Aptitude", "English Language", "General Awareness"],
    "GATE": ["Engineering Mathematics", "General Aptitude", "Subject-specific Topics"],
    "CAT": ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation", "Logical Reasoning"],
    "General Study": ["Mathematics", "Science", "Language", "Social Studies"]
  };
  
  return subjectsByExam[examGoal] || ["Mathematics", "Science", "Language", "Social Studies"];
};
