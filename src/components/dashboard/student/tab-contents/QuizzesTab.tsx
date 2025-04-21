
import React from 'react';
import { UserProfileType } from "@/types/user/base";

interface QuizzesTabProps {
  userProfile: UserProfileType;
}

const QuizzesTab: React.FC<QuizzesTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Quizzes</h2>
      <p className="text-muted-foreground mt-2">
        Test your knowledge and track your progress with our quizzes.
      </p>
    </div>
  );
};

export default QuizzesTab;
