
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Target, Clock, Calendar, BookOpen, Zap } from 'lucide-react';

interface StudentProfileSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const StudentProfileSection: React.FC<StudentProfileSectionProps> = ({ data, onUpdate }) => {
  const [profileData, setProfileData] = useState({
    name: data.name || 'Student',
    examGoal: data.examGoal || 'NEET 2026',
    targetDate: data.targetDate || '2026-05-03',
    learningPace: data.learningPace || 'moderate',
    studyTime: data.studyTime || 'morning',
    hoursPerDay: data.hoursPerDay || '6',
    daysPerWeek: data.daysPerWeek || '6',
    subjectsPerDay: data.subjectsPerDay || '2',
    weakSubjects: data.weakSubjects || ['Chemistry'],
    strongSubjects: data.strongSubjects || ['Biology']
  });

  const handleUpdate = (field: string, value: any) => {
    const updated = { ...profileData, [field]: value };
    setProfileData(updated);
    onUpdate(updated);
  };

  const paceColors = {
    slow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    moderate: 'bg-blue-100 text-blue-800 border-blue-300',
    aggressive: 'bg-red-100 text-red-800 border-red-300'
  };

  const timeColors = {
    morning: 'bg-orange-100 text-orange-800 border-orange-300',
    afternoon: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    evening: 'bg-purple-100 text-purple-800 border-purple-300',
    night: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Student Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleUpdate('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exam-goal">Exam Goal</Label>
              <Select value={profileData.examGoal} onValueChange={(value) => handleUpdate('examGoal', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEET 2026">NEET 2026</SelectItem>
                  <SelectItem value="JEE Main 2026">JEE Main 2026</SelectItem>
                  <SelectItem value="JEE Advanced 2026">JEE Advanced 2026</SelectItem>
                  <SelectItem value="AIIMS 2026">AIIMS 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-date">Target Exam Date</Label>
              <Input
                id="target-date"
                type="date"
                value={profileData.targetDate}
                onChange={(e) => handleUpdate('targetDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Learning Pace</Label>
              <Select value={profileData.learningPace} onValueChange={(value) => handleUpdate('learningPace', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow & Steady</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Study Time</Label>
              <Select value={profileData.studyTime} onValueChange={(value) => handleUpdate('studyTime', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                  <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
                  <SelectItem value="night">Night (10PM - 2AM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Study Hours per Day</Label>
              <Select value={profileData.hoursPerDay} onValueChange={(value) => handleUpdate('hoursPerDay', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="6">6 hours</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="10">10 hours</SelectItem>
                  <SelectItem value="12">12 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Available Days per Week</Label>
              <Select value={profileData.daysPerWeek} onValueChange={(value) => handleUpdate('daysPerWeek', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 days</SelectItem>
                  <SelectItem value="6">6 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subjects per Day</Label>
              <Select value={profileData.subjectsPerDay} onValueChange={(value) => handleUpdate('subjectsPerDay', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 subject</SelectItem>
                  <SelectItem value="2">2 subjects</SelectItem>
                  <SelectItem value="3">3 subjects</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Profile Summary
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge className={paceColors[profileData.learningPace as keyof typeof paceColors]}>
                <Zap className="h-3 w-3 mr-1" />
                {profileData.learningPace} pace
              </Badge>
              <Badge className={timeColors[profileData.studyTime as keyof typeof timeColors]}>
                <Clock className="h-3 w-3 mr-1" />
                {profileData.studyTime} study
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <Calendar className="h-3 w-3 mr-1" />
                {profileData.hoursPerDay}h/day
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                <BookOpen className="h-3 w-3 mr-1" />
                {profileData.subjectsPerDay} subjects/day
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfileSection;
