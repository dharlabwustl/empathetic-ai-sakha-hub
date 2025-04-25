
export const getSubjectsForGoal = (goal: string): string[] => {
  const subjects = subjectsByGoal[goal as keyof typeof subjectsByGoal] || defaultSubjects;
  return subjects;
};

export const subjectsByGoal = {
  "IIT-JEE": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Physical Chemistry",
    "Organic Chemistry",
    "Inorganic Chemistry",
    "Mechanics",
    "Electromagnetism",
    "Modern Physics",
    "Calculus",
    "Algebra",
    "Coordinate Geometry"
  ],
  "NEET": [
    "Biology",
    "Physics",
    "Chemistry",
    "Botany",
    "Zoology",
    "Human Physiology",
    "Cell Biology",
    "Genetics",
    "Physical Chemistry",
    "Organic Chemistry",
    "Inorganic Chemistry"
  ],
  "Board Exams": [
    "Mathematics",
    "Science",
    "Social Science",
    "English",
    "Hindi",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Political Science",
    "Economics"
  ],
  "General Study": [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "General Knowledge",
    "Computer Science"
  ],
  "Career Growth": [
    "Business Communication",
    "Leadership Skills",
    "Project Management",
    "Data Analysis",
    "Digital Marketing",
    "Strategic Thinking",
    "Financial Planning"
  ],
  "Skill Development": [
    "Programming",
    "Web Development",
    "Data Science",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Public Speaking"
  ],
  "Medical Research": [
    "Clinical Research",
    "Biochemistry",
    "Pharmacology",
    "Microbiology",
    "Epidemiology",
    "Medical Statistics",
    "Molecular Biology"
  ]
};

export const defaultSubjects = [
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
  "Computer Science"
];
