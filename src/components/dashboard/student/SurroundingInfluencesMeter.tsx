import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Users, 
  Home, 
  GraduationCap, 
  Globe, 
  Smartphone, 
  BookOpen,
  Heart,
  ThumbsUp
} from "lucide-react";

interface InfluenceCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  score: number;
  color: string;
  details: string;
  stories?: Array<{id: string, text: string, author: string}>;
}

const SurroundingInfluencesMeter: React.FC = () => {
  const influenceFactors: InfluenceCard[] = [
    {
      id: 'family',
      title: 'Family',
      icon: <Home />,
      score: 85,
      color: 'bg-blue-500',
      details: 'Your family provides strong emotional and academic support',
      stories: [
        {id: '1', text: 'My parents always helped me with my homework and encouraged my love for science', author: 'Amit K.'},
        {id: '2', text: 'My siblings and I have study sessions together which helps us all stay motivated', author: 'Priya S.'}
      ]
    },
    {
      id: 'friends',
      title: 'Friends',
      icon: <Users />,
      score: 70,
      color: 'bg-green-500',
      details: 'Your friends have a positive influence on your studies',
      stories: [
        {id: '3', text: 'Creating a study group with my friends helped me understand difficult concepts', author: 'Rahul M.'}
      ]
    },
    {
      id: 'school',
      title: 'Educational Institution',
      icon: <GraduationCap />,
      score: 90,
      color: 'bg-purple-500',
      details: 'Your school/college provides excellent learning resources',
      stories: [
        {id: '4', text: 'The library at my college has been my second home during exam season', author: 'Divya L.'}
      ]
    },
    {
      id: 'community',
      title: 'Community',
      icon: <Globe />,
      score: 60,
      color: 'bg-orange-500',
      details: 'Your community provides moderate support for educational goals',
      stories: [
        {id: '5', text: 'The local community center organizes free tutoring sessions which helped me a lot', author: 'Sanjay R.'}
      ]
    },
    {
      id: 'digital',
      title: 'Digital Environment',
      icon: <Smartphone />,
      score: 65,
      color: 'bg-pink-500',
      details: 'Your digital habits have a mixed impact on your studies',
      stories: [
        {id: '6', text: 'I use app blockers during study time to avoid social media distractions', author: 'Meera T.'}
      ]
    },
    {
      id: 'resources',
      title: 'Learning Resources',
      icon: <BookOpen />,
      score: 88,
      color: 'bg-yellow-500',
      details: 'You have excellent access to learning materials',
      stories: [
        {id: '7', text: 'Online courses have been a game changer for my study routine', author: 'Vikram P.'}
      ]
    }
  ];
  
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);
  
  const handleCardClick = (cardId: string) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };
  
  const likeStory = (storyId: string) => {
    console.log(`Liked story: ${storyId}`);
    // This would typically update a backend API to record the like
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-4">
        {influenceFactors.map((factor) => (
          <motion.div
            key={factor.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick(factor.id)}
            className={`cursor-pointer ${selectedCard === factor.id ? 'ring-2 ring-indigo-400 dark:ring-indigo-500' : ''}`}
          >
            <Card className={`p-4 flex flex-col items-center text-center h-full relative overflow-hidden ${selectedCard === factor.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
              {/* Background gradient effect */}
              <div className={`absolute inset-0 opacity-10 ${factor.color.replace('bg-', 'bg-gradient-to-br from-')}-600 to-transparent`} />
              
              <div className={`p-2 rounded-full mb-2 ${factor.color} bg-opacity-20 dark:bg-opacity-30 text-${factor.color.split('-')[1]}-700 dark:text-${factor.color.split('-')[1]}-400`}>
                {factor.icon}
              </div>
              <h3 className="text-sm font-medium mb-1">{factor.title}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${factor.color}`} 
                  style={{ width: `${factor.score}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium mt-1">{factor.score}%</span>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Selected card details */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
              {influenceFactors.filter(factor => factor.id === selectedCard).map(factor => (
                <div key={`details-${factor.id}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-full ${factor.color} bg-opacity-20 dark:bg-opacity-30 text-${factor.color.split('-')[1]}-700 dark:text-${factor.color.split('-')[1]}-400`}>
                      {factor.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{factor.title} Impact</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{factor.details}</p>
                    </div>
                  </div>
                  
                  {/* Stories from others */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Heart size={16} className="text-red-500" />
                      Community Stories
                    </h4>
                    
                    <div className="space-y-3">
                      {factor.stories && factor.stories.length > 0 ? (
                        factor.stories.map(story => (
                          <div 
                            key={story.id} 
                            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-sm"
                          >
                            <p className="mb-2 italic">"{story.text}"</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 dark:text-gray-400">— {story.author}</span>
                              <button 
                                onClick={() => likeStory(story.id)}
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400"
                              >
                                <ThumbsUp size={12} />
                                Like
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No stories shared yet. Be the first!</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Add more sections as needed */}
                  <div className="flex gap-1 mt-3 flex-wrap">
                    <Badge variant="outline">Influence Score: {factor.score}/100</Badge>
                    <Badge variant="secondary">{factor.score > 80 ? 'Positive Impact' : factor.score > 60 ? 'Moderate Impact' : 'Needs Attention'}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SurroundingInfluencesMeter;

import { AnimatePresence } from 'framer-motion';
