
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const StressReliefTips: React.FC = () => {
  const tips = [
    {
      id: 1,
      title: "Take a 5-minute break",
      description: "Step away from your study materials and focus on your breathing."
    },
    {
      id: 2,
      title: "Practice the 4-7-8 technique",
      description: "Breathe in for 4 seconds, hold for 7 seconds, exhale for 8 seconds."
    },
    {
      id: 3,
      title: "Stretch your body",
      description: "Simple stretches can release tension in your muscles and improve focus."
    },
    {
      id: 4,
      title: "Stay hydrated",
      description: "Drink a glass of water. Dehydration can increase stress levels."
    },
    {
      id: 5,
      title: "Use positive affirmations",
      description: "Repeat a positive statement like 'I can handle this' or 'I am prepared'."
    },
    {
      id: 6,
      title: "Listen to calming music",
      description: "Put on some instrumental or low-tempo music for 5 minutes."
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-medium text-lg">Quick Stress Relief Tips</h3>
        <p className="text-sm text-muted-foreground">Try these techniques when you feel overwhelmed</p>
      </div>
      
      <div className="grid gap-3">
        {tips.map((tip) => (
          <Card key={tip.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StressReliefTips;
