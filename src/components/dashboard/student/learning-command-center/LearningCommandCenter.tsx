
import React from 'react';
import { Card } from "@/components/ui/card";
import { Book, Zap, Calendar, Clock, Brain, BarChart } from 'lucide-react';
import { UserProfileType } from "@/types/user";
import { StudyMetricsGrid } from './StudyMetricsGrid';
import { SubjectsTable } from './SubjectsTable';
import { motion } from 'framer-motion';

const mockMetrics = {
  totalConceptCards: 234,
  flashcardsToComplete: 89,
  practiceExams: 45,
  averageQuizScore: 78,
  averageRecallAccuracy: 82,
  totalConceptsCompleted: 156
};

const mockSubjects = [
  {
    subject: "Math",
    priority: "High" as const,
    concepts: { completed: 45, total: 60 },
    flashcards: { completed: 120, total: 150 },
    practiceTests: { completed: 20, total: 25 },
    status: "in-progress" as const
  },
  {
    subject: "History",
    priority: "Medium" as const,
    concepts: { completed: 20, total: 40 },
    flashcards: { completed: 90, total: 100 },
    practiceTests: { completed: 10, total: 15 },
    status: "need-attention" as const
  },
  {
    subject: "Science",
    priority: "High" as const,
    concepts: { completed: 55, total: 55 },
    flashcards: { completed: 180, total: 180 },
    practiceTests: { completed: 25, total: 25 },
    status: "completed" as const
  }
];

export const LearningCommandCenter: React.FC<{ userProfile: UserProfileType }> = ({ userProfile }) => {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Learning Command Center
        </h2>
      </div>

      {/* Overview Card */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Book className="h-5 w-5 text-indigo-500" />
              Your Study Plan at a Glance
            </h3>
            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="font-medium">Exam Goal:</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {userProfile.examPreparation || 'Not Set'}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Book className="h-4 w-4 text-emerald-500" />
                <span className="font-medium">Subjects Enrolled:</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {userProfile.subjects?.length || 0} subjects
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Study Metrics */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          Study Metrics
        </h3>
        <StudyMetricsGrid metrics={userProfile.studyMetrics || mockMetrics} />
      </section>

      {/* Subject Breakdown */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BarChart className="h-5 w-5 text-blue-500" />
          Subject-Wise Breakdown
        </h3>
        <SubjectsTable subjects={userProfile.subjectMetrics || mockSubjects} />
      </section>

      {/* Time Allocation */}
      <section className="space-y-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-green-500" />
            Time Allocation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Daily Study Target</p>
              <p className="text-2xl font-bold text-green-600">4 hours</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Concepts/Day</p>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Flashcards/Day</p>
              <p className="text-2xl font-bold text-purple-600">20</p>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Tests/Week</p>
              <p className="text-2xl font-bold text-pink-600">3</p>
            </div>
          </div>
        </Card>
      </section>
    </motion.div>
  );
};

export default LearningCommandCenter;
