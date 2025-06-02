
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Target, Clock, Calendar, BookOpen, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StudentProfileSection = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    examGoal: 'NEET 2026',
    targetDate: '2026-05-03',
    learningPace: 'medium',
    preferredStudyTime: 'evening',
    studyHoursPerDay: 6,
    availableDaysPerWeek: 6,
    preferredSubjectsPerDay: 2
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your study profile has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Profile
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-student.jpg" />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <Badge variant="secondary" className="mt-1">
                {profile.examGoal} Aspirant
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Exam Details
              </h4>
              
              <div className="space-y-3">
                <div>
                  <Label>Name</Label>
                  {isEditing ? (
                    <Input 
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border">{profile.name}</div>
                  )}
                </div>

                <div>
                  <Label>Exam Goal</Label>
                  {isEditing ? (
                    <Select value={profile.examGoal} onValueChange={(value) => setProfile(prev => ({ ...prev, examGoal: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEET 2026">NEET 2026</SelectItem>
                        <SelectItem value="JEE Main 2026">JEE Main 2026</SelectItem>
                        <SelectItem value="JEE Advanced 2026">JEE Advanced 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border">{profile.examGoal}</div>
                  )}
                </div>

                <div>
                  <Label>Target Exam Date</Label>
                  {isEditing ? (
                    <Input 
                      type="date"
                      value={profile.targetDate}
                      onChange={(e) => setProfile(prev => ({ ...prev, targetDate: e.target.value }))}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border">
                      {new Date(profile.targetDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Study Preferences */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Study Preferences
              </h4>
              
              <div className="space-y-3">
                <div>
                  <Label>Learning Pace</Label>
                  {isEditing ? (
                    <Select value={profile.learningPace} onValueChange={(value) => setProfile(prev => ({ ...prev, learningPace: value }))}>
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
                    <div className="p-2 bg-gray-50 rounded border">
                      {profile.learningPace === 'slow' ? 'Slow & Steady' : 
                       profile.learningPace === 'medium' ? 'Moderate' : 'Aggressive'}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Preferred Study Time</Label>
                  {isEditing ? (
                    <Select value={profile.preferredStudyTime} onValueChange={(value) => setProfile(prev => ({ ...prev, preferredStudyTime: value }))}>
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
                    <div className="p-2 bg-gray-50 rounded border capitalize">{profile.preferredStudyTime}</div>
                  )}
                </div>

                <div>
                  <Label>Study Hours per Day</Label>
                  {isEditing ? (
                    <Input 
                      type="number"
                      min="1"
                      max="12"
                      value={profile.studyHoursPerDay}
                      onChange={(e) => setProfile(prev => ({ ...prev, studyHoursPerDay: parseInt(e.target.value) }))}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border">{profile.studyHoursPerDay} hours</div>
                  )}
                </div>
              </div>
            </div>

            {/* Schedule Configuration */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Configuration
              </h4>
              
              <div className="space-y-3">
                <div>
                  <Label>Available Days per Week</Label>
                  {isEditing ? (
                    <Select value={profile.availableDaysPerWeek.toString()} onValueChange={(value) => setProfile(prev => ({ ...prev, availableDaysPerWeek: parseInt(value) }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 days (Mon-Fri)</SelectItem>
                        <SelectItem value="6">6 days (Mon-Sat)</SelectItem>
                        <SelectItem value="7">7 days (Full week)</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border">{profile.availableDaysPerWeek} days</div>
                  )}
                </div>

                <div>
                  <Label>Preferred Subjects per Day</Label>
                  {isEditing ? (
                    <Select value={profile.preferredSubjectsPerDay.toString()} onValueChange={(value) => setProfile(prev => ({ ...prev, preferredSubjectsPerDay: parseInt(value) }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 subject</SelectItem>
                        <SelectItem value="2">2 subjects</SelectItem>
                        <SelectItem value="3">3 subjects</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border">{profile.preferredSubjectsPerDay} subjects</div>
                  )}
                </div>

                <div className="pt-2">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-3 w-3" />
                      Weekly Study Hours: {profile.studyHoursPerDay * profile.availableDaysPerWeek}h
                    </div>
                    <div className="text-xs text-gray-500">
                      Days until exam: {Math.ceil((new Date(profile.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 mt-6 pt-4 border-t">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
