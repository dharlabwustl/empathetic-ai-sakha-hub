
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Smile, Frown, Meh, Heart, Brain, Zap } from 'lucide-react';
import { MoodType } from '@/types/mood';

interface MoodEntry {
  date: string;
  mood: MoodType;
  note?: string;
  studyPlanAdjustment?: string;
}

export const MoodCalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();
  const [moodNote, setMoodNote] = useState('');

  // Load mood entries from localStorage
  useEffect(() => {
    const savedMoods = localStorage.getItem('mood_calendar_entries');
    if (savedMoods) {
      try {
        setMoodEntries(JSON.parse(savedMoods));
      } catch (error) {
        console.error('Error loading mood entries:', error);
      }
    }
  }, []);

  // Save mood entries to localStorage
  const saveMoodEntries = (entries: MoodEntry[]) => {
    localStorage.setItem('mood_calendar_entries', JSON.stringify(entries));
    setMoodEntries(entries);
  };

  const getMoodIcon = (mood: MoodType) => {
    switch (mood) {
      case MoodType.HAPPY:
      case MoodType.MOTIVATED:
        return <Smile className="h-4 w-4 text-green-600" />;
      case MoodType.STRESSED:
      case MoodType.ANXIOUS:
        return <Frown className="h-4 w-4 text-red-600" />;
      case MoodType.FOCUSED:
        return <Brain className="h-4 w-4 text-blue-600" />;
      case MoodType.TIRED:
        return <Meh className="h-4 w-4 text-orange-600" />;
      default:
        return <Heart className="h-4 w-4 text-purple-600" />;
    }
  };

  const getMoodColor = (mood: MoodType) => {
    switch (mood) {
      case MoodType.HAPPY:
      case MoodType.MOTIVATED:
        return 'bg-green-100 text-green-800 border-green-300';
      case MoodType.STRESSED:
      case MoodType.ANXIOUS:
        return 'bg-red-100 text-red-800 border-red-300';
      case MoodType.FOCUSED:
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case MoodType.TIRED:
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  const getStudyPlanAdjustment = (mood: MoodType): string => {
    switch (mood) {
      case MoodType.MOTIVATED:
      case MoodType.FOCUSED:
        return 'Increase study hours by 15% - tackle difficult topics';
      case MoodType.TIRED:
        return 'Reduce study hours by 20% - focus on revision and light topics';
      case MoodType.STRESSED:
      case MoodType.ANXIOUS:
        return 'Switch to familiar topics - add relaxation breaks every 30 mins';
      case MoodType.HAPPY:
        return 'Maintain normal schedule - good day for challenging concepts';
      default:
        return 'Follow regular study plan with standard breaks';
    }
  };

  const handleMoodLog = () => {
    if (!selectedDate || !currentMood) return;

    const dateString = selectedDate.toISOString().split('T')[0];
    const existingEntryIndex = moodEntries.findIndex(entry => entry.date === dateString);
    
    const newEntry: MoodEntry = {
      date: dateString,
      mood: currentMood,
      note: moodNote,
      studyPlanAdjustment: getStudyPlanAdjustment(currentMood)
    };

    let updatedEntries;
    if (existingEntryIndex >= 0) {
      updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = newEntry;
    } else {
      updatedEntries = [...moodEntries, newEntry];
    }

    saveMoodEntries(updatedEntries);
    setMoodNote('');
    setCurrentMood(undefined);
  };

  const getSelectedDateEntry = () => {
    if (!selectedDate) return null;
    const dateString = selectedDate.toISOString().split('T')[0];
    return moodEntries.find(entry => entry.date === dateString);
  };

  const selectedEntry = getSelectedDateEntry();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Mood Calendar & Study Plan Adjustments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  mood: moodEntries.map(entry => new Date(entry.date))
                }}
                modifiersStyles={{
                  mood: { backgroundColor: '#e0f2fe', color: '#0369a1' }
                }}
              />
              
              {/* Mood Legend */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {Object.values(MoodType).slice(0, 6).map((mood) => (
                  <div key={mood} className="flex items-center gap-1">
                    {getMoodIcon(mood)}
                    <span className="capitalize">{mood.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mood Entry Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Log Mood for {selectedDate?.toLocaleDateString()}
                </label>
                <Select value={currentMood} onValueChange={(value) => setCurrentMood(value as MoodType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MoodType).map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        <div className="flex items-center gap-2">
                          {getMoodIcon(mood)}
                          <span className="capitalize">{mood.replace('_', ' ')}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Notes (Optional)</label>
                <Textarea
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="How are you feeling today? Any specific concerns?"
                  className="h-20"
                />
              </div>

              <Button 
                onClick={handleMoodLog}
                disabled={!currentMood}
                className="w-full"
              >
                <Zap className="h-4 w-4 mr-2" />
                Log Mood & Update Plan
              </Button>

              {/* Current Study Plan Adjustment Preview */}
              {currentMood && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-3">
                    <h4 className="text-sm font-medium mb-2">Plan Adjustment Preview:</h4>
                    <p className="text-xs text-gray-700">
                      {getStudyPlanAdjustment(currentMood)}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Selected Date Entry Display */}
          {selectedEntry && (
            <Card className="mt-6 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getMoodColor(selectedEntry.mood)}>
                    <div className="flex items-center gap-1">
                      {getMoodIcon(selectedEntry.mood)}
                      <span className="capitalize">{selectedEntry.mood.replace('_', ' ')}</span>
                    </div>
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {new Date(selectedEntry.date).toLocaleDateString()}
                  </span>
                </div>
                
                {selectedEntry.note && (
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Note:</strong> {selectedEntry.note}
                  </p>
                )}
                
                <div className="bg-white p-3 rounded border">
                  <h4 className="text-sm font-medium mb-1">Study Plan Adjustment:</h4>
                  <p className="text-xs text-gray-700">{selectedEntry.studyPlanAdjustment}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
