
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain } from "lucide-react";
import { motion } from "framer-motion";

interface RelatedConcept {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
}

interface RecommendedConceptsProps {
  relatedConcepts: RelatedConcept[];
}

const RecommendedConcepts: React.FC<RecommendedConceptsProps> = ({ relatedConcepts }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Brain className="h-5 w-5 text-purple-600" />
        Related Concepts
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedConcepts.map((concept, index) => (
          <Link to={`/dashboard/student/concepts/${concept.id}`} key={concept.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Card className="h-full hover:border-purple-200 transition-all">
                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                  <CardTitle className="text-md font-medium">{concept.title}</CardTitle>
                  <ArrowRight className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
                      {concept.subject}
                    </Badge>
                    <Badge variant="outline" className={`
                      ${concept.difficulty === 'Easy' && 'bg-green-50 text-green-600 border-green-100'}
                      ${concept.difficulty === 'Medium' && 'bg-yellow-50 text-yellow-600 border-yellow-100'}
                      ${concept.difficulty === 'Hard' && 'bg-red-50 text-red-600 border-red-100'}
                    `}>
                      {concept.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedConcepts;
