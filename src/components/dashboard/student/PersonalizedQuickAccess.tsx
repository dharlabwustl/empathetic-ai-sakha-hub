
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Smile, Sparkles } from 'lucide-react';

interface PersonalizedQuickAccessProps {
  userName?: string;
}

const PersonalizedQuickAccess: React.FC<PersonalizedQuickAccessProps> = ({ userName }) => {
  const navigate = useNavigate();
  
  const quickAccessItems = [
    {
      id: 'ai-tutor',
      title: '24/7 AI Tutor',
      description: 'Get immediate help with your studies',
      icon: MessageSquare,
      path: '/dashboard/student/tutor',
      color: 'from-blue-600 to-violet-600',
      textColor: 'text-blue-50',
      priority: 1
    },
    {
      id: 'feel-good',
      title: 'Feel Good Corner',
      description: 'Take a break and recharge',
      icon: Smile,
      path: '/dashboard/student/feel-good-corner',
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-emerald-50',
      priority: 2
    }
  ];

  return (
    <div className="mb-6">
      {userName && (
        <div className="flex items-center mb-3">
          <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
          <h3 className="text-sm font-medium text-muted-foreground">Quick Access Tools for {userName}</h3>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2">
        {quickAccessItems.sort((a, b) => a.priority - b.priority).map((item) => (
          <Card 
            key={item.id}
            className="overflow-hidden border-transparent shadow-md hover:shadow-lg transition-shadow"
          >
            <Button
              variant="ghost"
              className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br ${item.color} ${item.textColor} hover:opacity-90`}
              onClick={() => navigate(item.path)}
            >
              <div className="bg-white/20 p-2 rounded-full mb-2">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-sm mb-1">{item.title}</h3>
              <p className="text-xs opacity-80 text-center">{item.description}</p>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedQuickAccess;
