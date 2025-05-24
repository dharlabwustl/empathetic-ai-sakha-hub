import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, Edit, MoreHorizontal, UserCheck, TrendingUp, Clock, BookOpen } from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { StudyStreak, ExamGoal } from '@/types/user/studyPlan';

const StudentProfilesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('all');

  const mockStudentProfiles: (UserProfileBase & { 
    studyHoursToday: number; 
    mood: MoodType; 
    completionRate: number;
    lastActive: string;
    studyStreakData: StudyStreak;
    examGoal: ExamGoal;
  })[] = [
    {
      id: '1',
      name: 'Aryan Sharma',
      email: 'aryan.s@example.com',
      studyHoursToday: 4.5,
      mood: MoodType.Motivated,
      completionRate: 85,
      lastActive: '2 minutes ago',
      subscription: {
        type: 'pro_monthly',
        isActive: true,
        planType: 'Pro Monthly',
        features: ['AI Tutor', 'Practice Tests'],
        memberLimit: 1,
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      },
      studyStreakData: {
        currentStreak: 12,
        longestStreak: 25,
        lastActiveDate: '2024-01-15'
      },
      examGoal: {
        examName: 'IIT-JEE Advanced',
        targetDate: '2024-05-26',
        subjects: ['Physics', 'Chemistry', 'Mathematics']
      }
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya.p@example.com',
      studyHoursToday: 3.2,
      mood: MoodType.Focused,
      completionRate: 92,
      lastActive: '15 minutes ago',
      subscription: {
        type: 'free',
        isActive: true,
        planType: 'Free',
        features: ['Basic Content'],
        memberLimit: 1,
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      },
      studyStreakData: {
        currentStreak: 7,
        longestStreak: 15,
        lastActiveDate: '2024-01-15'
      },
      examGoal: {
        examName: 'NEET UG',
        targetDate: '2024-05-05',
        subjects: ['Biology', 'Chemistry', 'Physics']
      }
    },
    {
      id: '3',
      name: 'Vikram Singh',
      email: 'vikram.s@example.com',
      studyHoursToday: 6.8,
      mood: MoodType.Tired,
      completionRate: 78,
      lastActive: '1 hour ago',
      subscription: {
        type: 'pro_yearly',
        isActive: true,
        planType: 'Pro Yearly',
        features: ['AI Tutor', 'Practice Tests', 'Analytics'],
        memberLimit: 1,
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      },
      studyStreakData: {
        currentStreak: 25,
        longestStreak: 45,
        lastActiveDate: '2024-01-15'
      },
      examGoal: {
        examName: 'UPSC Civil Services',
        targetDate: '2024-06-02',
        subjects: ['History', 'Geography', 'Polity']
      }
    }
  ];

  const getMoodColor = (mood: MoodType) => {
    const colors: Record<MoodType, string> = {
      [MoodType.Happy]: 'bg-green-100 text-green-800',
      [MoodType.Motivated]: 'bg-blue-100 text-blue-800',
      [MoodType.Focused]: 'bg-purple-100 text-purple-800',
      [MoodType.Tired]: 'bg-orange-100 text-orange-800',
      [MoodType.Anxious]: 'bg-red-100 text-red-800',
      [MoodType.Neutral]: 'bg-gray-100 text-gray-800',
      [MoodType.Stressed]: 'bg-red-100 text-red-800',
      [MoodType.Sad]: 'bg-gray-100 text-gray-800',
      [MoodType.Calm]: 'bg-green-100 text-green-800',
      [MoodType.Confused]: 'bg-yellow-100 text-yellow-800',
      [MoodType.Overwhelmed]: 'bg-red-100 text-red-800',
      [MoodType.Okay]: 'bg-gray-100 text-gray-800',
      [MoodType.Curious]: 'bg-blue-100 text-blue-800'
    };
    return colors[mood] || 'bg-gray-100 text-gray-800';
  };

  const filteredProfiles = mockStudentProfiles.filter(profile => {
    const matchesSearch = profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = filterMood === 'all' || profile.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudentProfiles.length}</div>
            <p className="text-xs text-muted-foreground">Currently studying</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockStudentProfiles.reduce((sum, p) => sum + p.studyHoursToday, 0) / mockStudentProfiles.length).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">Today's average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockStudentProfiles.reduce((sum, p) => sum + p.completionRate, 0) / mockStudentProfiles.length).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">Task completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Streak</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStudentProfiles.reduce((sum, p) => sum + p.studyStreakData.currentStreak, 0)} days
            </div>
            <p className="text-xs text-muted-foreground">Combined streaks</p>
          </CardContent>
        </Card>
      </div>

      {/* Student Profiles Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Student Profiles</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">Export Data</Button>
              <Button>View Analytics</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <select 
              value={filterMood}
              onChange={(e) => setFilterMood(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md text-sm"
            >
              <option value="all">All Moods</option>
              <option value={MoodType.Motivated}>Motivated</option>
              <option value={MoodType.Focused}>Focused</option>
              <option value={MoodType.Tired}>Tired</option>
              <option value={MoodType.Happy}>Happy</option>
              <option value={MoodType.Anxious}>Anxious</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Exam Goal</TableHead>
                  <TableHead>Current Mood</TableHead>
                  <TableHead>Study Hours Today</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead>Study Streak</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{profile.name}</div>
                        <div className="text-sm text-gray-500">{profile.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{profile.examGoal.examName}</div>
                        <div className="text-sm text-gray-500">{profile.examGoal.targetDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getMoodColor(profile.mood)}>
                        {profile.mood}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{profile.studyHoursToday}h</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{profile.completionRate}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${profile.completionRate}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{profile.studyStreakData.currentStreak} days</span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {profile.lastActive}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfilesTab;
