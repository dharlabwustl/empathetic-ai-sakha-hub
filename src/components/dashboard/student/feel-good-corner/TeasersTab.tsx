
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BrainTeaser } from "./types";
import { Trophy } from "./icons";

// Mock data
const mockBrainTeasers = [
  { 
    id: 1, 
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", 
    answer: "An echo",
    difficulty: "Easy"
  },
  { 
    id: 2, 
    question: "What has keys but no locks, space but no room, and you can enter but not go in?", 
    answer: "A keyboard",
    difficulty: "Medium"
  },
  { 
    id: 3, 
    question: "The more you take, the more you leave behind. What am I?", 
    answer: "Footsteps",
    difficulty: "Easy"
  },
  { 
    id: 4, 
    question: "What has a head, a tail, is brown, and has no legs?", 
    answer: "A penny",
    difficulty: "Medium"
  },
  { 
    id: 5, 
    question: "What gets wet while drying?", 
    answer: "A towel",
    difficulty: "Easy"
  }
] as const;

interface TeasersTabProps {
  initialTeasers?: BrainTeaser[];
}

const TeasersTab: React.FC<TeasersTabProps> = ({ initialTeasers = mockBrainTeasers }) => {
  const [selectedTeaser, setSelectedTeaser] = useState<number | null>(null);
  const [teaserAnswer, setTeaserAnswer] = useState<string | null>(null);

  const handleShowAnswer = (id: number) => {
    setSelectedTeaser(id);
    setTeaserAnswer(mockBrainTeasers.find(teaser => teaser.id === id)?.answer || "");
  };
  
  return (
    <motion.div 
      key="teasers"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Mini Brain Teasers</h3>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            Solve in 30s!
          </Badge>
        </div>
        
        <ScrollArea className="h-[280px] rounded border p-2">
          <div className="space-y-3">
            {mockBrainTeasers.map((teaser) => (
              <motion.div 
                key={teaser.id} 
                className="bg-white rounded-lg p-3 shadow-sm border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: teaser.id * 0.1 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm">{teaser.question}</p>
                  <Badge className={`
                    ${teaser.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : ''}
                    ${teaser.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : ''}
                    ${teaser.difficulty === 'Hard' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {teaser.difficulty}
                  </Badge>
                </div>
                
                {selectedTeaser === teaser.id ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2"
                  >
                    <p className="text-sm font-medium text-violet-700">{teaserAnswer}</p>
                  </motion.div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-1 text-xs"
                    onClick={() => handleShowAnswer(teaser.id)}
                  >
                    Show Answer
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
        <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
          <div className="flex gap-2 items-center">
            <div className="rounded-full bg-indigo-200 p-1.5">
              <Trophy className="h-3 w-3 text-indigo-700" />
            </div>
            <div className="text-xs">
              <span className="font-medium">Today's Top Solvers:</span> @MindMaster, @PuzzleKing, @QuickThinker
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeasersTab;
