
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Subject {
  id: string;
  name: string;
  progress: number;
  proficiency: 'weak' | 'moderate' | 'strong';
  chapters: { id: string; name: string; progress: number }[];
  quizzes: { id: string; title: string; score?: number }[];
  flashcards: { total: number; mastered: number };
  recommendedStudyHours: number;
}

interface UpcomingMilestonesSectionProps {
  subjects: Subject[];
}

const UpcomingMilestonesSection: React.FC<UpcomingMilestonesSectionProps> = ({ subjects }) => {
  // Generate next weekly target
  const nextWeeklyTarget = generateWeeklyTarget(subjects);
  
  // Get upcoming practice exam
  const upcomingExam = getUpcomingExam(subjects);
  
  // Get next performance check-in date
  const nextCheckInDate = getNextCheckInDate();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Upcoming Milestones</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MilestoneCard
          title="Next Weekly Target"
          date={getNextSunday()}
          icon={<Calendar className="h-6 w-6 text-blue-600" />}
          description={nextWeeklyTarget}
          buttonLink="/dashboard/student/academic"
          buttonText="View Study Plan"
        />
        
        <MilestoneCard
          title="Upcoming Practice Exam"
          date={getRandomFutureDate(3, 10)}
          icon={<BookOpen className="h-6 w-6 text-green-600" />}
          description={upcomingExam}
          buttonLink="/dashboard/student/practice-exam"
          buttonText="Prepare Now"
        />
        
        <MilestoneCard
          title="Performance Check-In"
          date={nextCheckInDate}
          icon={<LineChart className="h-6 w-6 text-purple-600" />}
          description="Review your progress and adjust study plans"
          buttonLink="/dashboard/student/progress"
          buttonText="View Progress"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Goal Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="mr-4 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">25%</span>
                </div>
                <div>
                  <h3 className="font-medium">Foundation Complete</h3>
                  <p className="text-sm text-gray-500">Master basic concepts across all subjects</p>
                </div>
              </div>
              <Badge variant="outline" className={getMilestoneStatusClass(getMilestoneStatus(subjects, 25))}>
                {getMilestoneStatus(subjects, 25)}
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="mr-4 h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <span className="text-xl font-bold text-amber-600 dark:text-amber-400">50%</span>
                </div>
                <div>
                  <h3 className="font-medium">Half-Way Mark</h3>
                  <p className="text-sm text-gray-500">Complete mid-level concepts and begin practice exams</p>
                </div>
              </div>
              <Badge variant="outline" className={getMilestoneStatusClass(getMilestoneStatus(subjects, 50))}>
                {getMilestoneStatus(subjects, 50)}
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="mr-4 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">75%</span>
                </div>
                <div>
                  <h3 className="font-medium">Advanced Progress</h3>
                  <p className="text-sm text-gray-500">Master advanced concepts and increase test practice</p>
                </div>
              </div>
              <Badge variant="outline" className={getMilestoneStatusClass(getMilestoneStatus(subjects, 75))}>
                {getMilestoneStatus(subjects, 75)}
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="mr-4 h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">100%</span>
                </div>
                <div>
                  <h3 className="font-medium">Exam Ready</h3>
                  <p className="text-sm text-gray-500">Complete all concepts and full mock exams</p>
                </div>
              </div>
              <Badge variant="outline" className={getMilestoneStatusClass(getMilestoneStatus(subjects, 100))}>
                {getMilestoneStatus(subjects, 100)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface MilestoneCardProps {
  title: string;
  date: string;
  icon: React.ReactNode;
  description: string;
  buttonLink: string;
  buttonText: string;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  title,
  date,
  icon,
  description,
  buttonLink,
  buttonText
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="mr-4 h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        
        <p className="text-sm mb-4">{description}</p>
        
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

// Helper functions
const getNextSunday = () => {
  const today = new Date();
  const daysUntilSunday = 7 - today.getDay();
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);
  
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(nextSunday);
};

const getRandomFutureDate = (minDays: number, maxDays: number) => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + randomDays);
  
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(futureDate);
};

const getNextCheckInDate = () => {
  // Performance check-ins are typically every two weeks
  const today = new Date();
  const checkInDate = new Date(today);
  checkInDate.setDate(today.getDate() + 14);
  
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(checkInDate);
};

const generateWeeklyTarget = (subjects: Subject[]) => {
  // Find the subject with lowest progress
  const lowestProgressSubject = [...subjects].sort((a, b) => a.progress - b.progress)[0];
  
  if (!lowestProgressSubject) {
    return "Complete foundation concepts across all subjects";
  }
  
  return `Focus on ${lowestProgressSubject.name}: Complete ${Math.min(5, lowestProgressSubject.chapters.length)} concepts and related flashcards`;
};

const getUpcomingExam = (subjects: Subject[]) => {
  // Find subject with most progress but incomplete
  const nearCompletionSubject = [...subjects]
    .filter(subject => subject.progress < 100 && subject.progress > 50)
    .sort((a, b) => b.progress - a.progress)[0];
  
  if (!nearCompletionSubject) {
    return "General Knowledge Mock Test";
  }
  
  return `${nearCompletionSubject.name} - Comprehensive Topic Test`;
};

const getMilestoneStatus = (subjects: Subject[], targetPercent: number) => {
  const averageProgress = subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length;
  
  if (averageProgress >= targetPercent) {
    return "Completed";
  } else if (averageProgress >= targetPercent - 15) {
    return "In Progress";
  } else {
    return "Not Started";
  }
};

const getMilestoneStatusClass = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30";
    case "In Progress":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30";
  }
};

export default UpcomingMilestonesSection;
