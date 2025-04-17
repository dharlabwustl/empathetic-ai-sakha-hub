
import { Award } from "lucide-react";

interface CompletionMessageProps {
  show: boolean;
}

export const CompletionMessage = ({ show }: CompletionMessageProps) => {
  if (!show) return null;
  
  return (
    <div className="mt-6 text-center bg-green-50 p-4 rounded-lg">
      <div className="inline-block p-2 bg-green-100 rounded-full mb-2">
        <Award className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="font-medium text-green-800">Amazing job! You've completed today's study plan.</h3>
      <p className="text-sm text-green-600">Check back tomorrow for your next set of concepts.</p>
    </div>
  );
};
