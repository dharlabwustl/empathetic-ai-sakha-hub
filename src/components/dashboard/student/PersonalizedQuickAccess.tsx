
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  Target, 
  ChevronRight,
  Star,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';

interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  progress?: number;
  path: string;
  isNew?: boolean;
  isPriority?: boolean;
}

interface PersonalizedQuickAccessProps {
  recentItems?: QuickAccessItem[];
  suggestedItems?: QuickAccessItem[];
  userName?: string;
}

export default function PersonalizedQuickAccess({
  recentItems,
  suggestedItems,
  userName = 'Student'
}: PersonalizedQuickAccessProps) {
  const navigate = useNavigate();
  
  // Default quick access items if none provided
  const defaultRecentItems: QuickAccessItem[] = [
    {
      id: 'physics-concepts',
      title: 'Physics Concepts',
      description: 'Wave optics and electromagnetic waves',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
      progress: 65,
      path: '/dashboard/student/concepts/physics'
    },
    {
      id: 'bio-flashcards',
      title: 'Biology Flashcards',
      description: 'Human anatomy and physiology',
      icon: Brain,
      color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
      progress: 42,
      path: '/dashboard/student/flashcards/biology'
    },
    {
      id: 'chem-practice-test',
      title: 'Chemistry Test',
      description: 'Organic chemistry practice questions',
      icon: FileText,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
      progress: 0, // Not started
      path: '/dashboard/student/practice-exam/chemistry',
      isNew: true
    }
  ];
  
  const defaultSuggestedItems: QuickAccessItem[] = [
    {
      id: 'daily-plan',
      title: 'Today\'s Study Plan',
      description: 'View your personalized schedule',
      icon: Clock,
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
      progress: 38,
      path: '/dashboard/student/today',
      isPriority: true
    },
    {
      id: 'weak-areas',
      title: 'Focus Areas',
      description: 'Topics that need improvement',
      icon: Target,
      color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
      progress: 25,
      path: '/dashboard/student/academic'
    }
  ];
  
  const items = recentItems || defaultRecentItems;
  const suggested = suggestedItems || defaultSuggestedItems;
  
  return (
    <div className="space-y-6 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Continue Learning</h3>
        <Button variant="ghost" size="sm" className="text-xs">
          View All <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="cursor-pointer border hover:border-primary/30 hover:shadow-md transition-all duration-200"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{item.title}</h4>
                      {item.isNew && (
                        <span className="inline-block bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">NEW</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Progress indicator */}
                {item.progress !== undefined && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span>{item.progress === 0 ? 'Not started' : `${item.progress}% complete`}</span>
                      {item.progress > 0 && <span>{100 - item.progress}% remaining</span>}
                    </div>
                    <Progress value={item.progress} className="h-1.5" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {/* Add new item card */}
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="cursor-pointer border border-dashed border-primary/40 hover:border-primary transition-all duration-200 flex items-center justify-center h-full">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <PlusCircle className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Add New Resource</span>
                <p className="text-xs text-muted-foreground">
                  Create or browse more study materials
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Suggested study items */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggested.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className={`cursor-pointer hover:shadow-md transition-all duration-200 ${
                  item.isPriority ? 'border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10' : ''
                }`}
                onClick={() => navigate(item.path)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.title}</h4>
                        {item.isPriority && (
                          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 ml-auto text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
