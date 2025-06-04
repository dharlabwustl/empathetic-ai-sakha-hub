
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Smile, 
  Frown, 
  Meh, 
  Heart, 
  Brain, 
  Zap,
  Calendar as CalendarIcon,
  Plus,
  Save
} from 'lucide-react';
import { MoodType } from '@/types/mood';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface MoodEntry {
  date: string;
  mood: MoodType;
  note?: string;
  studyPlanAdjustment?: string;
}

const MoodCalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [showMoodDialog, setShowMoodDialog] = useState(false);

  // Load mood entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('moodEntries');
    if (saved) {
      try {
        setMoodEntries(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading mood entries:', error);
      }
    }
  }, []);

  // Save mood entries to localStorage when they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const moodOptions = [
    { type: MoodType.HAPPY, icon: Smile, color: 'bg-green-500', label: 'Happy' },
    { type: MoodType.FOCUSED, icon: Brain, color: 'bg-blue-500', label: 'Focused' },
    { type: MoodType.MOTIVATED, icon: Zap, color: 'bg-purple-500', label: 'Motivated' },
    { type: MoodType.TIRED, icon: Meh, color: 'bg-yellow-500', label: 'Tired' },
    { type: MoodType.STRESSED, icon: Frown, color: 'bg-red-500', label: 'Stressed' },
    { type: MoodType.ANXIOUS, icon: Heart, color: 'bg-orange-500', label: 'Anxious' }
  ];

  const getMoodForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return moodEntries.find(entry => entry.date === dateStr);
  };

  const getStudyPlanAdjustment = (mood: MoodType): string => {
    switch (mood) {
      case MoodType.HAPPY:
        return "Great mood for tackling challenging topics! Consider advanced problem-solving sessions.";
      case MoodType.FOCUSED:
        return "Perfect for deep study sessions. Ideal time for complex concepts and detailed notes.";
      case MoodType.MOTIVATED:
        return "High energy day! Great for practice tests and covering more syllabus.";
      case MoodType.TIRED:
        return "Light study recommended. Focus on revision and easy topics.";
      case MoodType.STRESSED:
        return "Take it easy. Short study sessions with breaks. Focus on familiar topics.";
      case MoodType.ANXIOUS:
        return "Calm study approach. Review completed topics to build confidence.";
      default:
        return "Regular study plan applies.";
    }
  };

  const saveMoodEntry = () => {
    if (!selectedDate || !currentMood) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const newEntry: MoodEntry = {
      date: dateStr,
      mood: currentMood,
      note: moodNote,
      studyPlanAdjustment: getStudyPlanAdjustment(currentMood)
    };

    setMoodEntries(prev => {
      const filtered = prev.filter(entry => entry.date !== dateStr);
      return [...filtered, newEntry];
    });

    setCurrentMood(null);
    setMoodNote('');
    setShowMoodDialog(false);
  };

  const getDayMoodIndicator = (date: Date) => {
    const moodEntry = getMoodForDate(date);
    if (!moodEntry) return null;

    const moodOption = moodOptions.find(opt => opt.type === moodEntry.mood);
    if (!moodOption) return null;

    return (
      <div className={`w-2 h-2 rounded-full ${moodOption.color} mx-auto`} />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Mood Calendar & Study Plan Adjustments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Calendar */}
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              components={{
                DayContent: ({ date }) => (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <span>{date.getDate()}</span>
                    {getDayMoodIndicator(date)}
                  </div>
                )
              }}
            />
            
            <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
              <DialogTrigger asChild>
                <Button className="w-full mt-4" disabled={!selectedDate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Log Mood for {selectedDate?.toLocaleDateString()}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Your Mood</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {moodOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <Button
                          key={option.type}
                          variant={currentMood === option.type ? "default" : "outline"}
                          onClick={() => setCurrentMood(option.type)}
                          className="flex items-center gap-2"
                        >
                          <Icon className="h-4 w-4" />
                          {option.label}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Textarea
                    placeholder="Add a note about your mood (optional)"
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                  />
                  
                  {currentMood && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Study Plan Adjustment:</h4>
                      <p className="text-sm text-gray-600">
                        {getStudyPlanAdjustment(currentMood)}
                      </p>
                    </div>
                  )}
                  
                  <Button onClick={saveMoodEntry} disabled={!currentMood} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Mood Entry
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Selected Date Details */}
          <div>
            <h3 className="font-medium mb-3">
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            {selectedDate && (() => {
              const moodEntry = getMoodForDate(selectedDate);
              if (!moodEntry) {
                return (
                  <p className="text-gray-500 text-sm">No mood logged for this date.</p>
                );
              }

              const moodOption = moodOptions.find(opt => opt.type === moodEntry.mood);
              const Icon = moodOption?.icon || Meh;

              return (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <Badge variant="outline" className={`${moodOption?.color} text-white`}>
                      {moodOption?.label}
                    </Badge>
                  </div>
                  
                  {moodEntry.note && (
                    <div>
                      <h4 className="font-medium text-sm mb-1">Note:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {moodEntry.note}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Study Plan Adjustment:</h4>
                    <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                      {moodEntry.studyPlanAdjustment}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodCalendarSection;
