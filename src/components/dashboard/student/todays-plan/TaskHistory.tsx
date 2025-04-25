
import { CalendarDays, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TaskHistory() {
  const history = [
    {
      date: 'Apr 24',
      stats: { concepts: '4/5', flashcards: '1/1', tests: '1/1' },
      status: 'incomplete'
    },
    {
      date: 'Apr 23',
      stats: { concepts: '3/4', flashcards: '0/1', tests: '1/1' },
      status: 'pending'
    },
    {
      date: 'Apr 22',
      stats: { concepts: '5/5', flashcards: '2/2', tests: '1/1' },
      status: 'done'
    }
  ];

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'done': return '✅';
      case 'incomplete': return '🟡';
      case 'pending': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <CalendarDays className="text-blue-500" />
        Study History
      </h3>

      <div className="space-y-3">
        {history.map((day) => (
          <div 
            key={day.date}
            className="p-3 bg-gray-50 rounded-lg text-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{day.date}</span>
              <span>{getStatusEmoji(day.status)}</span>
            </div>
            
            <div className="space-y-1 text-gray-600">
              <div className="flex justify-between">
                <span>Concepts:</span>
                <span>{day.stats.concepts}</span>
              </div>
              <div className="flex justify-between">
                <span>Flashcards:</span>
                <span>{day.stats.flashcards}</span>
              </div>
              <div className="flex justify-between">
                <span>Tests:</span>
                <span>{day.stats.tests}</span>
              </div>
            </div>

            {day.status !== 'done' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
              >
                Continue Learning
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
