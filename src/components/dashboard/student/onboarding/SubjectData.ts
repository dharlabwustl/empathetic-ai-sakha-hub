
type SubjectMap = {
  [goal: string]: string[];
};

export const subjectsByGoal: SubjectMap = {
  "IIT-JEE": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Physical Chemistry",
    "Organic Chemistry",
    "Inorganic Chemistry",
    "Calculus",
    "Algebra",
    "Trigonometry",
    "Mechanics",
    "Electromagnetism",
    "Modern Physics"
  ],
  "NEET": [
    "Biology",
    "Physics",
    "Chemistry",
    "Zoology",
    "Botany",
    "Human Physiology",
    "Physical Chemistry",
    "Organic Chemistry",
    "Inorganic Chemistry",
    "Mechanics",
    "Optics",
    "Modern Physics"
  ],
  "UPSC": [
    "History",
    "Geography",
    "Economics",
    "Political Science",
    "International Relations",
    "Indian Polity",
    "Environment & Ecology",
    "Science & Technology",
    "Current Affairs",
    "Ethics",
    "Essay Writing",
    "General Studies"
  ],
  "CAT": [
    "Quantitative Aptitude",
    "Data Interpretation",
    "Logical Reasoning",
    "Verbal Ability",
    "Reading Comprehension",
    "Mathematics",
    "English Language",
    "General Knowledge",
    "Current Affairs"
  ],
  "Banking": [
    "Quantitative Aptitude",
    "Reasoning",
    "English Language",
    "General Awareness",
    "Computer Knowledge",
    "Financial Awareness",
    "Banking Awareness",
    "Current Affairs"
  ],
  "GATE": [
    "Engineering Mathematics",
    "General Aptitude",
    "Computer Science",
    "Electronics",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Programming & Data Structures",
    "Algorithms",
    "Computer Networks",
    "Operating System"
  ],
  "GRE": [
    "Verbal Reasoning",
    "Quantitative Reasoning",
    "Analytical Writing",
    "Vocabulary",
    "Mathematics",
    "Text Completion",
    "Reading Comprehension",
    "Critical Reasoning"
  ],
  "GMAT": [
    "Quantitative Reasoning",
    "Verbal Reasoning",
    "Integrated Reasoning",
    "Analytical Writing",
    "Data Sufficiency",
    "Problem Solving",
    "Critical Reasoning",
    "Reading Comprehension"
  ],
  "CLAT": [
    "English Language",
    "General Knowledge",
    "Legal Reasoning",
    "Logical Reasoning",
    "Quantitative Techniques",
    "Current Affairs",
    "Legal Aptitude",
    "Constitutional Law",
    "Indian Judiciary"
  ],
  "CA": [
    "Accounting",
    "Financial Management",
    "Auditing",
    "Taxation",
    "Cost Accounting",
    "Corporate Laws",
    "Economics",
    "Business Mathematics",
    "Strategic Management"
  ]
};

export const getSubjectsForGoal = (goalTitle: string): string[] => {
  // Find a matching goal in our mapping
  const normalizedGoal = Object.keys(subjectsByGoal).find(
    goal => goalTitle.toLowerCase().includes(goal.toLowerCase())
  );

  // Return the subjects for the matched goal, or a default set
  return normalizedGoal ? 
    subjectsByGoal[normalizedGoal] : 
    ['Mathematics', 'Physics', 'Chemistry', 'English', 'General Knowledge'];
};
