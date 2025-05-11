
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TaskList from './TaskList';
import { MoodSelector } from '../mood-tracking/MoodSelector';
import { MoodType } from '@/types/user/base';

const getTodaysPlanBasedOnMood = (mood?: MoodType) => {
  if (!mood) return defaultTasks;

  switch (mood) {
    case MoodType.Tired:
      return [
        { id: '1', title: 'Review flashcards (15 min)', completed: false, type: 'review' },
        { id: '2', title: 'Take a short break (20 min)', completed: false, type: 'break' },
        { id: '3', title: 'Watch concept video on Cell Structure', completed: false, type: 'video' },
      ];
    case MoodType.Stressed:
      return [
        { id: '1', title: 'Breathing exercise (5 min)', completed: false, type: 'wellness' },
        { id: '2', title: 'Review simple concepts (20 min)', completed: false, type: 'review' },
        { id: '3', title: 'Organize study notes', completed: false, type: 'organization' },
      ];
    case MoodType.Focused:
      return [
        { id: '1', title: 'Practice problem set - Physics', completed: false, type: 'practice' },
        { id: '2', title: 'Review Chemistry formulas', completed: false, type: 'review' },
        { id: '3', title: 'Take a mock test', completed: false, type: 'test' },
      ];
    case MoodType.Motivated:
      return [
        { id: '1', title: 'Master new concepts - Organic Chemistry', completed: false, type: 'learn' },
        { id: '2', title: 'Solve advanced problems - Physics', completed: false, type: 'practice' },
        { id: '3', title: 'Create comprehensive study notes', completed: false, type: 'create' },
      ];
    default:
      return defaultTasks;
  }
};

const defaultTasks = [
  { id: '1', title: 'Review Biology notes', completed: false, type: 'review' },
  { id: '2', title: 'Practice Physics problems', completed: false, type: 'practice' },
  { id: '3', title: 'Watch Chemistry video lesson', completed: false, type: 'video' },
];

const TodaysPlanSection = () => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [tasks, setTasks] = useState(defaultTasks);

  // Get mood from localStorage on component mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const data = JSON.parse(userData);
        if (data.mood) {
          setCurrentMood(data.mood as MoodType);
        }
      }
    } catch (error) {
      console.error('Error retrieving mood from localStorage:', error);
    }
  }, []);

  // Update tasks when mood changes
  useEffect(() => {
    setTasks(getTodaysPlanBasedOnMood(currentMood));
  }, [currentMood]);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    
    // Save to localStorage
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const data = JSON.parse(userData);
        data.mood = mood;
        localStorage.setItem('userData', JSON.stringify(data));
      } else {
        localStorage.setItem('userData', JSON.stringify({ mood }));
      }
    } catch (error) {
      console.error('Error saving mood to localStorage:', error);
    }
    
    // Update tasks based on new mood
    setTasks(getTodaysPlanBasedOnMood(mood));
  };

  const handleViewFullPlan = () => {
    navigate('/dashboard/student/today');
  };

  return (
    <Card className="col-span-12 md:col-span-6 lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Today's Study Plan</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1" onClick={handleViewFullPlan}>
          Full Plan <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">How are you feeling today?</p>
          <MoodSelector
            selectedMood={currentMood}
            onSelectMood={handleMoodChange}
          />
        </div>
        <TaskList tasks={tasks.slice(0, 3)} />
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
