
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InterestsStepProps {
  onSubmit: (interests: string) => void;
  selectedGoal?: string;
}

const InterestsStep: React.FC<InterestsStepProps> = ({ onSubmit, selectedGoal }) => {
  const [interests, setInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const suggestedInterests = [
    "Physics", "Chemistry", "Biology", "Mathematics",
    "Computer Science", "History", "Geography", "Economics",
    "Programming", "AI", "Machine Learning", "Data Science"
  ];

  const handleAddInterest = (interest: string) => {
    if (interest.trim() !== "" && !interests.includes(interest.trim())) {
      setInterests([...interests, interest.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== "") {
      e.preventDefault();
      handleAddInterest(inputValue);
    }
  };

  const handleSubmit = () => {
    if (interests.length > 0) {
      onSubmit(interests.join(","));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Select Your Interests</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
        Choose the subjects that interest you the most
        {selectedGoal ? ` for ${selectedGoal}` : ''}
      </p>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 min-h-[50px] border p-2 rounded-md">
              {interests.map(interest => (
                <Badge key={interest} variant="secondary" className="gap-1 pr-1">
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="ml-1 rounded-full hover:bg-gray-200 p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {interests.length === 0 && (
                <span className="text-gray-400 text-sm py-1">No interests selected yet</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add an interest..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="flex-grow"
              />
              <Button
                type="button"
                onClick={() => handleAddInterest(inputValue)}
                disabled={!inputValue.trim()}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Suggested Interests:</h3>
        <div className="flex flex-wrap gap-2">
          {suggestedInterests.map(interest => (
            <Badge
              key={interest}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => handleAddInterest(interest)}
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={interests.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default InterestsStep;
