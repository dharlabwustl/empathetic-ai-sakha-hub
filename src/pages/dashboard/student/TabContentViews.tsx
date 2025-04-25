
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ConceptCardView from '@/components/dashboard/student/concept-cards/ConceptCardView';

// Mock data for concepts
const mockConcepts = [
  { 
    id: "concept-1", 
    title: "Newton's Laws of Motion", 
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "Medium",
    description: "Understand Newton's three laws of motion that form the foundation of classical mechanics."
  },
  { 
    id: "concept-2", 
    title: "Conservation of Momentum", 
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "Medium",
    description: "Learn about the principle where the total momentum of an isolated system remains constant."
  },
  { 
    id: "concept-3", 
    title: "Work and Energy", 
    subject: "Physics",
    chapter: "Energy",
    difficulty: "Medium",
    description: "Explore the relationship between work done on an object and its kinetic and potential energy."
  },
  { 
    id: "concept-4", 
    title: "Circular Motion", 
    subject: "Physics",
    chapter: "Motion in a Plane",
    difficulty: "Hard",
    description: "Study the mechanics of objects moving in circular paths and the forces involved."
  }
];

export const MicroConceptView = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Concept Cards</h2>
          <p className="text-gray-500">
            Understand concepts deeply with comprehensive explanations and examples.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Book className="h-4 w-4 mr-1" />
            My Concepts
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockConcepts.map(concept => (
          <Link to={`/dashboard/student/concepts/${concept.id}`} key={concept.id} className="block">
            <div className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{concept.title}</h3>
                <ArrowRight className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{concept.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
                  {concept.subject}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-100">
                  {concept.chapter}
                </Badge>
                <Badge variant="outline" className={`
                  ${concept.difficulty === 'Easy' && 'bg-green-50 text-green-600 border-green-100'}
                  ${concept.difficulty === 'Medium' && 'bg-yellow-50 text-yellow-600 border-yellow-100'}
                  ${concept.difficulty === 'Hard' && 'bg-red-50 text-red-600 border-red-100'}
                `}>
                  {concept.difficulty}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8">
        <ConceptCardView 
          title="Newton's Laws of Motion" 
          subject="Physics" 
          chapter="Laws of Motion" 
        />
      </div>
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
