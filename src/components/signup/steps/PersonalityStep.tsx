
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PersonalityType } from '@/types/user/base';

interface PersonalityStepProps {
  onNext?: (personality: PersonalityType) => void;
  onPersonalitySelect?: (personality: PersonalityType) => void; 
  onSelect?: (personality: PersonalityType) => void;
}

const PersonalityStep = ({ onNext, onPersonalitySelect, onSelect }: PersonalityStepProps) => {
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);

  const handleSelectPersonality = (personality: string) => {
    setSelectedPersonality(personality);
    
    // Create a PersonalityType object from the selected personality ID
    const personalityObject: PersonalityType = {
      type: personality,
      traits: getPersonalityTraits(personality),
      learningStyle: getPersonalityLearningStyle(personality)
    };
    
    if (onPersonalitySelect) {
      onPersonalitySelect(personalityObject);
    }
    
    if (onSelect) {
      onSelect(personalityObject);
    }
  };

  const handleContinue = () => {
    if (selectedPersonality && onNext) {
      // Create a PersonalityType object from the selected personality ID
      const personalityObject: PersonalityType = {
        type: selectedPersonality,
        traits: getPersonalityTraits(selectedPersonality),
        learningStyle: getPersonalityLearningStyle(selectedPersonality)
      };
      onNext(personalityObject);
    }
  };

  // Helper function to get traits based on personality type
  const getPersonalityTraits = (personalityType: string): string[] => {
    switch (personalityType) {
      case "systematic_learner":
        return ["Organized", "Methodical", "Detail-oriented", "Follows instructions well"];
      case "curious_explorer":
        return ["Inquisitive", "Creative", "Adaptable", "Enjoys learning new things"];
      case "practical_applier":
        return ["Hands-on", "Solution-focused", "Practical", "Results-oriented"];
      case "social_collaborator":
        return ["Team player", "Communicative", "Empathetic", "Enjoys discussion"];
      case "creative_thinker":
        return ["Imaginative", "Innovative", "Thinks outside the box", "Connects ideas"];
      default:
        return [];
    }
  };

  // Helper function to get learning style based on personality type
  const getPersonalityLearningStyle = (personalityType: string): string => {
    switch (personalityType) {
      case "systematic_learner":
        return "Linear and sequential learning";
      case "curious_explorer":
        return "Exploration-based learning";
      case "practical_applier":
        return "Learning by doing";
      case "social_collaborator":
        return "Collaborative learning";
      case "creative_thinker":
        return "Creative and conceptual learning";
      default:
        return "";
    }
  };

  const personalities = [
    {
      id: "systematic_learner",
      name: "Systematic Learner",
      description: "You prefer structured learning with clear guidelines and milestones.",
      icon: "📚"
    },
    {
      id: "curious_explorer",
      name: "Curious Explorer",
      description: "You enjoy discovering new concepts and making connections between ideas.",
      icon: "🔍"
    },
    {
      id: "practical_applier",
      name: "Practical Applier",
      description: "You learn best by doing and applying knowledge to real-world problems.",
      icon: "🛠️"
    },
    {
      id: "social_collaborator",
      name: "Social Collaborator",
      description: "You thrive in group settings and enjoy learning through discussion.",
      icon: "👥"
    },
    {
      id: "creative_thinker",
      name: "Creative Thinker",
      description: "You approach problems from unique angles with innovative solutions.",
      icon: "💡"
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">What's Your Learning Style?</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Choose the learning personality that best describes you. This helps us personalize your experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {personalities.map((personality) => (
          <motion.div
            key={personality.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "border p-4 rounded-lg cursor-pointer transition-all",
              selectedPersonality === personality.id 
                ? "border-primary bg-primary/10" 
                : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
            )}
            onClick={() => handleSelectPersonality(personality.id)}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{personality.icon}</div>
              <div>
                <h3 className="font-medium text-lg">{personality.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{personality.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!selectedPersonality}
          className="w-full md:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PersonalityStep;
