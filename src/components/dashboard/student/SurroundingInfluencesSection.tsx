
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Heart, Star, TrendingUp, MessageCircle, BookOpen } from 'lucide-react';

const SurroundingInfluencesSection = () => {
  const [activeInfluence, setActiveInfluence] = useState('family');

  const influences = [
    {
      id: 'family',
      title: 'Family Support',
      icon: <Heart className="h-5 w-5" />,
      score: 85,
      description: 'Strong family encouragement and understanding'
    },
    {
      id: 'friends',
      title: 'Study Group',
      icon: <Users className="h-5 w-5" />,
      score: 78,
      description: 'Positive peer influence and motivation'
    },
    {
      id: 'mentors',
      title: 'Mentorship',
      icon: <Star className="h-5 w-5" />,
      score: 92,
      description: 'Guidance from experienced mentors'
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          Surrounding Influences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {influences.map((influence) => (
            <motion.div
              key={influence.id}
              className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all"
              onClick={() => setActiveInfluence(influence.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  {influence.icon}
                </div>
                <div>
                  <h4 className="font-medium">{influence.title}</h4>
                  <p className="text-sm text-gray-600">{influence.score}% positive</p>
                </div>
              </div>
              <Progress value={influence.score} className="mb-2" />
              <p className="text-xs text-gray-500">{influence.description}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SurroundingInfluencesSection;
