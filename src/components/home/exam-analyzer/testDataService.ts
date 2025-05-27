
export const examTypes = [
  { id: 'neet', name: 'NEET', description: 'National Eligibility cum Entrance Test for medical colleges' },
  { id: 'jee-main', name: 'JEE Main', description: 'Joint Entrance Examination for engineering colleges' },
  { id: 'jee-advanced', name: 'JEE Advanced', description: 'Advanced level engineering entrance exam' },
  { id: 'bitsat', name: 'BITSAT', description: 'Birla Institute of Technology and Science Admission Test' },
  { id: 'cat', name: 'CAT', description: 'Common Admission Test for management programs' },
  { id: 'gate', name: 'GATE', description: 'Graduate Aptitude Test in Engineering' }
];

export const getDialogTitle = (currentTest: string) => {
  switch (currentTest) {
    case 'selection':
      return 'Exam Readiness & Scholarship Test';
    case 'readiness':
      return 'Exam Readiness Assessment';
    case 'concept':
      return 'Concept Mastery Test';
    case 'results':
      return 'Your Test Results';
    default:
      return 'Exam Readiness & Scholarship Test';
  }
};

export const getDialogDescription = (currentTest: string) => {
  switch (currentTest) {
    case 'selection':
      return 'Choose your exam and test type to get personalized insights and potential scholarship benefits.';
    case 'readiness':
      return 'Answer these questions honestly to assess your current preparation level.';
    case 'concept':
      return 'Test your understanding of key concepts for your selected exam.';
    case 'results':
      return 'Here are your detailed results and personalized recommendations.';
    default:
      return 'Analyze your exam preparation level and discover scholarship opportunities.';
  }
};
