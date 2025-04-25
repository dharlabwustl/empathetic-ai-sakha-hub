
import { Clock, Brain, Book, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function TimeAllocation() {
  const timeBreakdown = [
    { type: 'Concept Cards', time: 60, icon: Brain, progress: 75 },
    { type: 'Flashcards', time: 30, icon: Book, progress: 50 },
    { type: 'Practice Tests', time: 20, icon: FileText, progress: 25 }
  ];

  return (
    <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-medium flex items-center gap-2">
        <Clock className="text-blue-500" />
        Time Allocation
      </h3>

      <div className="space-y-4">
        {timeBreakdown.map((item) => (
          <div key={item.type} className="flex items-center gap-4">
            <item.icon className="h-5 w-5 text-blue-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{item.type}</span>
                <span className="text-sm text-gray-500">{item.time} mins</span>
              </div>
              <Progress value={item.progress} className="h-1.5" />
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Total Time</span>
            <span className="text-blue-600 font-medium">
              ~1 hr 50 mins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
