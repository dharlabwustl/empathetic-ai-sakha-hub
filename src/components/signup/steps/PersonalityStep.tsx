
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PersonalityStepProps {
  onSelect: (personality: string) => void;
  isLoading?: boolean;
}

const PersonalityStep = ({ onSelect, isLoading = false }: PersonalityStepProps) => {
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);

  const handleSelectPersonality = (personality: string) => {
    setSelectedPersonality(personality);
  };

  const handleContinue = () => {
    if (selectedPersonality) {
      onSelect(selectedPersonality);
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
          disabled={!selectedPersonality || isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default PersonalityStep;
