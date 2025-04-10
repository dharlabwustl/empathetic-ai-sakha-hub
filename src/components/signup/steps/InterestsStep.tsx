
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InterestsStepProps {
  onSubmit: (interests: string) => void;
}

const InterestsStep: React.FC<InterestsStepProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const interests = formData.get("interests") as string;
    onSubmit(interests);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="interests">Your Interests (comma-separated)</Label>
        <Input id="interests" name="interests" placeholder="e.g. Math, Coding, Music, Writing" required />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700">Next</Button>
    </form>
  );
};

export default InterestsStep;
