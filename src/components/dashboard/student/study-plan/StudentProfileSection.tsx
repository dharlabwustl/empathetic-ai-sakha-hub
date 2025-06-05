
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Target, Clock, Calendar, Book } from "lucide-react";

const StudentProfileSection = () => {
  const [profile, setProfile] = useState({
    name: "Arjun Sharma",
    examGoal: "NEET 2026",
    targetDate: "2026-05-03",
    learningPace: "Moderate",
    studyTime: "Evening",
    hoursPerDay: "6",
    daysPerWeek: "6",
    weakSubjects: ["Physics", "Chemistry"],
    strongSubjects: ["Biology"]
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          🧑‍🎓 Student Profile Section
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Student Name</Label>
            <Input 
              id="name" 
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="examGoal">Exam Goal</Label>
            <Select value={profile.examGoal} onValueChange={(value) => setProfile({...profile, examGoal: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEET 2026">NEET 2026</SelectItem>
                <SelectItem value="JEE Main 2026">JEE Main 2026</SelectItem>
                <SelectItem value="JEE Advanced 2026">JEE Advanced 2026</SelectItem>
                <SelectItem value="UPSC 2026">UPSC 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetDate">Target Exam Date</Label>
            <Input 
              id="targetDate" 
              type="date"
              value={profile.targetDate}
              onChange={(e) => setProfile({...profile, targetDate: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pace">Learning Pace</Label>
            <Select value={profile.learningPace} onValueChange={(value) => setProfile({...profile, learningPace: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Slow">Slow</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="studyTime">Preferred Study Time</Label>
            <Select value={profile.studyTime} onValueChange={(value) => setProfile({...profile, studyTime: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Afternoon">Afternoon</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
                <SelectItem value="Night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hoursPerDay">Study Hours per Day</Label>
            <Select value={profile.hoursPerDay} onValueChange={(value) => setProfile({...profile, hoursPerDay: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 hours</SelectItem>
                <SelectItem value="4">4 hours</SelectItem>
                <SelectItem value="5">5 hours</SelectItem>
                <SelectItem value="6">6 hours</SelectItem>
                <SelectItem value="7">7 hours</SelectItem>
                <SelectItem value="8">8 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="daysPerWeek">Available Days per Week</Label>
            <Select value={profile.daysPerWeek} onValueChange={(value) => setProfile({...profile, daysPerWeek: value})}>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-red-600">Weak Subjects (Need Focus)</Label>
            <div className="flex flex-wrap gap-2">
              {profile.weakSubjects.map((subject) => (
                <Badge key={subject} variant="destructive" className="bg-red-100 text-red-800">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-green-600">Strong Subjects</Label>
            <div className="flex flex-wrap gap-2">
              {profile.strongSubjects.map((subject) => (
                <Badge key={subject} variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Save Profile Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfileSection;
