
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Target, Calendar, Clock, BookOpen, Settings } from 'lucide-react';

export const StudentProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    examGoal: "NEET 2026",
    targetDate: "2026-05-03",
    learningPace: "medium",
    preferredStudyTime: "evening",
    studyHoursPerDay: 6,
    availableDaysPerWeek: 6,
    preferredSubjectsPerDay: 2
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Profile
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Settings className="h-4 w-4 mr-2" />
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Student Name</Label>
                {isEditing ? (
                  <Input 
                    id="name" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                ) : (
                  <div className="font-medium">{profile.name}</div>
                )}
              </div>
              
              <div>
                <Label htmlFor="examGoal">Exam Goal</Label>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {profile.examGoal}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label htmlFor="targetDate">Target Exam Date</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{new Date(profile.targetDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="learningPace">Learning Pace</Label>
                {isEditing ? (
                  <Select value={profile.learningPace} onValueChange={(value) => setProfile({...profile, learningPace: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow & Steady</SelectItem>
                      <SelectItem value="medium">Moderate</SelectItem>
                      <SelectItem value="fast">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant={profile.learningPace === 'fast' ? 'destructive' : profile.learningPace === 'medium' ? 'default' : 'secondary'}>
                    {profile.learningPace === 'slow' ? 'Slow & Steady' : profile.learningPace === 'medium' ? 'Moderate' : 'Aggressive'}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="preferredStudyTime">Preferred Study Time</Label>
                {isEditing ? (
                  <Select value={profile.preferredStudyTime} onValueChange={(value) => setProfile({...profile, preferredStudyTime: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                      <SelectItem value="night">Night</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="font-medium capitalize">{profile.preferredStudyTime}</span>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="studyHours">Total Study Hours per Day</Label>
                {isEditing ? (
                  <Input 
                    type="number" 
                    value={profile.studyHoursPerDay}
                    onChange={(e) => setProfile({...profile, studyHoursPerDay: parseInt(e.target.value)})}
                  />
                ) : (
                  <div className="font-medium">{profile.studyHoursPerDay} hours</div>
                )}
              </div>
              
              <div>
                <Label htmlFor="availableDays">Available Days per Week</Label>
                {isEditing ? (
                  <Input 
                    type="number" 
                    max="7" 
                    value={profile.availableDaysPerWeek}
                    onChange={(e) => setProfile({...profile, availableDaysPerWeek: parseInt(e.target.value)})}
                  />
                ) : (
                  <div className="font-medium">{profile.availableDaysPerWeek} days</div>
                )}
              </div>
              
              <div>
                <Label htmlFor="subjectsPerDay">Preferred Subjects per Day</Label>
                {isEditing ? (
                  <Input 
                    type="number" 
                    max="3" 
                    value={profile.preferredSubjectsPerDay}
                    onChange={(e) => setProfile({...profile, preferredSubjectsPerDay: parseInt(e.target.value)})}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">{profile.preferredSubjectsPerDay} subjects</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
