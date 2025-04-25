
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ConceptsSection: React.FC = () => {
  // Mock concept data - replace with actual data fetching logic
  const concepts = [
    { id: '1', title: 'Newton\'s Laws of Motion', subject: 'Physics' },
    { id: '2', title: 'Organic Chemistry Basics', subject: 'Chemistry' },
    { id: '3', title: 'Calculus Fundamentals', subject: 'Mathematics' }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2" />
          Concept Cards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Link to={`/dashboard/student/concepts/${concept.id}`} className="block w-full h-full">
                <h3 className="font-medium">{concept.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{concept.subject}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4">
          <Link to="/dashboard/student/concepts">
            <Button variant="outline" className="w-full">View All Concept Cards</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptsSection;
