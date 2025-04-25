
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserStudyPlan } from "@/hooks/useUserStudyPlan";
import { Book, Brain, CalendarDays, ChartBar, Flag, RefreshCcw, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RedesignedDashboardOverview = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
  
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';
  
  const subjects = [
    { 
      name: 'Math', 
      priority: 'High',
      concepts: { done: 45, total: 60 },
      flashcards: { done: 120, total: 150 },
      practiceTests: { done: 20, total: 25 },
      status: 'in-progress'
    },
    { 
      name: 'Science', 
      priority: 'High',
      concepts: { done: 55, total: 55 },
      flashcards: { done: 180, total: 180 },
      practiceTests: { done: 25, total: 25 },
      status: 'completed'
    },
    { 
      name: 'History', 
      priority: 'Medium',
      concepts: { done: 20, total: 40 },
      flashcards: { done: 90, total: 100 },
      practiceTests: { done: 10, total: 15 },
      status: 'need-attention'
    }
  ];

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🟡';
      case 'need-attention': return '🟠';
      default: return '⚪';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Exam Goal Section - Now more prominent */}
      <Card className="p-6 border-t-4 border-blue-500 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Book className="text-blue-500" />
              Exam Goal: {examGoal}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your personalized study plan is tailored for this exam
            </p>
          </div>
          <div className="mt-2 md:mt-0 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
            {conceptCards.filter(card => card.completed).length}/{conceptCards.length} Concepts Completed
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">
            <p className="text-sm text-gray-600">Enrolled Subjects</p>
            <p className="text-2xl font-bold text-violet-700">{subjects.length}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <p className="text-sm text-gray-600">Total Concept Cards</p>
            <p className="text-2xl font-bold text-blue-700">
              {subjects.reduce((acc, subj) => acc + subj.concepts.total, 0)}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <p className="text-sm text-gray-600">Flashcards to Complete</p>
            <p className="text-2xl font-bold text-green-700">
              {subjects.reduce((acc, subj) => acc + (subj.flashcards.total - subj.flashcards.done), 0)}
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
            <p className="text-sm text-gray-600">Practice Exams</p>
            <p className="text-2xl font-bold text-amber-700">
              {subjects.reduce((acc, subj) => acc + subj.practiceTests.total, 0)}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link to="/dashboard/student/concepts/all">
              View All Concepts
            </Link>
          </Button>
        </div>
      </Card>

      {/* Subject-Wise Breakdown */}
      <Card className="p-6 shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Brain className="text-primary" />
          Subject-Wise Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Subject</th>
                <th className="pb-2">Priority</th>
                <th className="pb-2">Concepts</th>
                <th className="pb-2">Flashcards</th>
                <th className="pb-2">Tests</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.name} className="border-b">
                  <td className="py-3 font-medium">{subject.name}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      subject.priority === 'High' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {subject.priority}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {subject.concepts.done} / {subject.concepts.total}
                      </span>
                      <Progress value={(subject.concepts.done / subject.concepts.total) * 100} className="w-20" />
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {subject.flashcards.done} / {subject.flashcards.total}
                      </span>
                      <Progress value={(subject.flashcards.done / subject.flashcards.total) * 100} className="w-20" />
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {subject.practiceTests.done} / {subject.practiceTests.total}
                      </span>
                      <Progress value={(subject.practiceTests.done / subject.practiceTests.total) * 100} className="w-20" />
                    </div>
                  </td>
                  <td>
                    <span className="flex items-center gap-1">
                      {getStatusEmoji(subject.status)}
                      <span className="text-sm capitalize">{subject.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Study Plan Calendar - Enhanced */}
      <Card className="p-6 shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <CalendarDays className="text-primary" />
          Study Plan Calendar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Button className="p-3 bg-blue-50 rounded-lg text-blue-700 font-medium hover:bg-blue-100 transition-colors">
            Daily View
          </Button>
          <Button className="p-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors">
            Weekly View
          </Button>
          <Button className="p-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors">
            Monthly View
          </Button>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg border flex items-center justify-center">
          <p className="text-gray-500">Your study schedule will appear here</p>
        </div>
      </Card>

      {/* Progress Tracker */}
      <Card className="p-6 shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <ChartBar className="text-primary" />
          Progress Tracker
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily Status */}
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium mb-2">Daily Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Concepts Done</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Flashcards Done</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tests Taken</span>
                <span className="font-medium">1</span>
              </div>
              <Progress value={75} className="mt-2" />
            </div>
          </div>

          {/* Weekly Status */}
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium mb-2">Weekly Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Concepts Done</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Flashcards Done</span>
                <span className="font-medium">150</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tests Taken</span>
                <span className="font-medium">5</span>
              </div>
              <Progress value={85} className="mt-2" />
            </div>
          </div>

          {/* Monthly Status */}
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium mb-2">Monthly Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Concepts Done</span>
                <span className="font-medium">85</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Flashcards Done</span>
                <span className="font-medium">450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tests Taken</span>
                <span className="font-medium">15</span>
              </div>
              <Progress value={90} className="mt-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Revision and Upcoming Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revision Loop */}
        <Card className="p-6 shadow-md">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <RefreshCcw className="text-primary" />
            Revision Loop
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <span>Pending Review Concepts</span>
              <span className="font-bold text-orange-700">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <span>Low Retention Flashcards</span>
              <span className="font-bold text-red-700">35</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <span>Flagged for Revisit</span>
              <span className="font-bold text-yellow-700">8</span>
            </div>
          </div>
        </Card>

        {/* Upcoming Milestones */}
        <Card className="p-6 shadow-md">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <TrendingUp className="text-primary" />
            Upcoming Milestones
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <CalendarDays className="h-4 w-4 text-blue-700" />
                <span className="font-medium">Next Weekly Target</span>
              </div>
              <p className="text-sm text-blue-700">Complete Physics Mechanics Module</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Book className="h-4 w-4 text-green-700" />
                <span className="font-medium">Upcoming Practice Exam</span>
              </div>
              <p className="text-sm text-green-700">Chemistry: Chemical Bonding (Apr 28)</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Flag className="h-4 w-4 text-purple-700" />
                <span className="font-medium">Performance Check-In</span>
              </div>
              <p className="text-sm text-purple-700">Monthly Progress Review (Apr 30)</p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default RedesignedDashboardOverview;
