
import React, { useState } from 'react';
import ConceptCardView from '@/components/dashboard/student/concept-cards/ConceptCardView';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Camera, 
  FileText, 
  BookOpen, 
  Zap, 
  Lightbulb, 
  AlertCircle, 
  Target,
  GraduationCap, 
  Sparkles 
} from "lucide-react";
import { UserProfileType } from '@/types/user/base';
import { Button } from '@/components/ui/button';

interface FeatureData {
  id?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path?: string;
  isPremium?: boolean;
}

// Transform FeatureData to the format expected in components
const formatFeatureData = (features: FeatureData[]): { icon: React.ReactNode; title: string; description: string; path: string; isPremium: boolean; }[] => {
  return features.map(feature => ({
    icon: feature.icon,
    title: feature.title,
    description: feature.description,
    path: feature.path || '#',
    isPremium: feature.isPremium || false
  }));
};

export const MicroConceptView = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Concept Cards</h2>
      <p className="text-gray-500">
        Understand concepts deeply with comprehensive explanations and examples.
      </p>
      
      <ConceptCardView 
        title="Newton's Laws of Motion" 
        subject="Physics" 
        chapter="Laws of Motion" 
      />
    </div>
  );
};

export const FlashcardsView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Flashcards</h2>
      <p className="text-gray-600 mb-4">
        Study and memorize key concepts with interactive flashcards.
      </p>
      
      {/* Flashcards content would go here */}
      <div className="p-8 text-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a flashcard deck to begin studying.</p>
      </div>
    </div>
  );
};

export const PracticeExamsView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Practice Exams</h2>
      <p className="text-gray-600 mb-4">
        Test your knowledge with practice exams and quizzes.
      </p>
      
      {/* Practice exams content would go here */}
      <div className="p-8 text-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a practice exam to begin testing.</p>
      </div>
    </div>
  );
};

export const TwentyFourSevenTutorView = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showQuestionInput, setShowQuestionInput] = useState(false);

  const exams = ['IIT-JEE', 'NEET', 'GATE', 'CAT'];
  const subjects = {
    'IIT-JEE': ['Physics', 'Chemistry', 'Mathematics'],
    'NEET': ['Biology', 'Physics', 'Chemistry'],
    'GATE': ['Computer Science', 'Electronics', 'Mechanical'],
    'CAT': ['Quantitative', 'Verbal', 'Logical']
  };
  const topics = {
    'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
    'Chemistry': ['Inorganic', 'Organic', 'Physical Chemistry'],
    'Mathematics': ['Calculus', 'Algebra', 'Trigonometry', 'Statistics'],
    'Biology': ['Anatomy', 'Genetics', 'Ecology', 'Cell Biology']
  };

  const handleExamSelect = (exam: string) => {
    setSelectedExam(exam);
    setSelectedSubject('');
    setSelectedTopic('');
    setShowQuestionInput(false);
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedTopic('');
    setShowQuestionInput(false);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setShowQuestionInput(true);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <GraduationCap className="mr-2" /> 24/7 AI Tutor
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-4">Select Exam</h2>
          <div className="space-y-2">
            {exams.map((exam) => (
              <button
                key={exam}
                className={`w-full text-left p-2 rounded ${
                  selectedExam === exam ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleExamSelect(exam)}
              >
                {exam}
              </button>
            ))}
          </div>
          
          {selectedExam && (
            <>
              <h2 className="font-semibold mb-2 mt-6">Select Subject</h2>
              <div className="space-y-2">
                {subjects[selectedExam as keyof typeof subjects]?.map((subject) => (
                  <button
                    key={subject}
                    className={`w-full text-left p-2 rounded ${
                      selectedSubject === subject ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSubjectSelect(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </>
          )}
          
          {selectedSubject && (
            <>
              <h2 className="font-semibold mb-2 mt-6">Select Topic</h2>
              <div className="space-y-2">
                {topics[selectedSubject as keyof typeof topics]?.map((topic) => (
                  <button
                    key={topic}
                    className={`w-full text-left p-2 rounded ${
                      selectedTopic === topic ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleTopicSelect(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="col-span-1 md:col-span-3">
          {!showQuestionInput ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12">
              <Sparkles className="w-16 h-16 text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your Personal AI Tutor</h2>
              <p className="text-gray-600 mb-6">
                Select an exam, subject, and topic to start learning with your personalized AI tutor
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex-grow mb-4 p-4 bg-gray-50 rounded-lg overflow-y-auto h-64">
                <div className="mb-4 p-3 bg-blue-100 rounded-lg inline-block">
                  <p className="text-blue-800">
                    I'm your AI tutor for {selectedTopic} in {selectedSubject}. What would you like help with?
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ask a question about this topic..."
                />
                <Button className="rounded-l-none">Send</Button>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Recent History</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
                    Understanding Newton's Third Law...
                  </div>
                  <div className="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
                    How to solve quadratic equations...
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AcademicAdvisorView = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showPlanCreation, setShowPlanCreation] = useState(false);

  const exams = ['IIT-JEE', 'NEET', 'GATE', 'CAT'];
  const subjects = {
    'IIT-JEE': ['Physics', 'Chemistry', 'Mathematics'],
    'NEET': ['Biology', 'Physics', 'Chemistry'],
    'GATE': ['Computer Science', 'Electronics', 'Mechanical'],
    'CAT': ['Quantitative', 'Verbal', 'Logical']
  };
  
  const topics = {
    'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
    'Chemistry': ['Inorganic', 'Organic', 'Physical Chemistry'],
    'Mathematics': ['Calculus', 'Algebra', 'Trigonometry', 'Statistics'],
    'Biology': ['Anatomy', 'Genetics', 'Ecology', 'Cell Biology']
  };

  const handleExamSelect = (exam: string) => {
    setSelectedExam(exam);
    setSelectedSubject('');
    setSelectedTopic('');
    setShowPlanCreation(false);
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedTopic('');
    setShowPlanCreation(false);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setShowPlanCreation(true);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Brain className="mr-2" /> Academic Advisor
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-4">Select Exam</h2>
          <div className="space-y-2">
            {exams.map((exam) => (
              <button
                key={exam}
                className={`w-full text-left p-2 rounded ${
                  selectedExam === exam ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleExamSelect(exam)}
              >
                {exam}
              </button>
            ))}
          </div>
          
          {selectedExam && (
            <>
              <h2 className="font-semibold mb-2 mt-6">Select Subject</h2>
              <div className="space-y-2">
                {subjects[selectedExam as keyof typeof subjects]?.map((subject) => (
                  <button
                    key={subject}
                    className={`w-full text-left p-2 rounded ${
                      selectedSubject === subject ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSubjectSelect(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </>
          )}
          
          {selectedSubject && (
            <>
              <h2 className="font-semibold mb-2 mt-6">Select Topic</h2>
              <div className="space-y-2">
                {topics[selectedSubject as keyof typeof topics]?.map((topic) => (
                  <button
                    key={topic}
                    className={`w-full text-left p-2 rounded ${
                      selectedTopic === topic ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleTopicSelect(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="col-span-1 md:col-span-3">
          {!showPlanCreation ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12">
              <Brain className="w-16 h-16 text-purple-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your Academic Advisor</h2>
              <p className="text-gray-600 mb-6">
                Select an exam, subject, and topic to create a personalized study plan
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-purple-800">
                  Create Study Plan for {selectedTopic} in {selectedSubject} ({selectedExam})
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Study Duration</label>
                    <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>2 Weeks</option>
                      <option>1 Month</option>
                      <option>3 Months</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Study Intensity</label>
                    <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Light (1-2 hours/day)</option>
                      <option>Moderate (3-4 hours/day)</option>
                      <option>Intensive (5+ hours/day)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Knowledge Level</label>
                    <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Focus Area</label>
                    <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Theory</option>
                      <option>Problem Solving</option>
                      <option>Balanced</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" className="mr-2">Cancel</Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                    Create Plan
                  </Button>
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="font-medium mb-4">Previous Plans</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Mathematics - Calculus</p>
                      <p className="text-sm text-gray-500">Created 2 weeks ago • 70% complete</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  
                  <div className="p-3 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Physics - Mechanics</p>
                      <p className="text-sm text-gray-500">Created 1 month ago • 100% complete</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Create a default export for importing specific views
export default {
  MicroConceptView,
  FlashcardsView,
  PracticeExamsView,
  TwentyFourSevenTutorView,
  AcademicAdvisorView
};
