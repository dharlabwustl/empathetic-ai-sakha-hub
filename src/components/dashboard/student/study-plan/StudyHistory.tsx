
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { HistoryEntry } from "@/types/user/base";

interface StudyHistoryProps {
  history: HistoryEntry[];
  showHistory: boolean;
  onToggleHistory: () => void;
}

export const StudyHistory = ({ history, showHistory, onToggleHistory }: StudyHistoryProps) => (
  <div>
    <Button
      variant="outline"
      size="sm"
      className="w-full"
      onClick={onToggleHistory}
    >
      {showHistory ? "Hide History" : "Show History"}
    </Button>
    
    {showHistory && (
      <div className="mt-4 space-y-4">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          Past Progress
        </h4>
        <div className="space-y-3">
          {history.map((entry, index) => (
            <div key={index} className="flex items-center justify-between text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <span className="font-medium">{entry.date}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs">
                  {entry.concepts.completed}/{entry.concepts.total}
                </span>
                <span className="text-xs">
                  {entry.flashcards.completed}/{entry.flashcards.total}
                </span>
                <span className="text-xs">
                  {entry.practice.completed}/{entry.practice.total}
                </span>
                <span>
                  {entry.status === 'done' ? '✅' : 
                   entry.status === 'incomplete' ? '🟡' : '🔴'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
