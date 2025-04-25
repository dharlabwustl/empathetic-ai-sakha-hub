import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserStudyPlan } from "@/hooks/useUserStudyPlan";
import { Book, Brain, ChartBar, Flag, TrendingUp } from "lucide-react";
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
      quizAverage: 85,
      flashcardAccuracy: 78,
      status: 'in-progress',
      lastUpdated: new Date().toISOString()
    },
    { 
      name: 'Science', 
      priority: 'High',
      concepts: { done: 55, total: 55 },
      quizAverage: 92,
      flashcardAccuracy: 89,
      status: 'completed',
      lastUpdated: new Date().toISOString()
    },
    { 
      name: 'History', 
      priority: 'Medium',
      concepts: { done: 20, total: 40 },
      quizAverage: 75,
      flashcardAccuracy: 68,
      status: 'need-attention',
      lastUpdated: new Date().toISOString()
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
            <p className="text-sm text-gray-600">Total Subjects</p>
            <p className="text-2xl font-bold text-violet-700">{subjects.length}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <p className="text-sm text-gray-600">Concept Cards</p>
            <p className="text-2xl font-bold text-blue-700">
              {subjects.reduce((acc, subj) => acc + subj.concepts.total, 0)}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <p className="text-sm text-gray-600">Average Quiz Score</p>
            <p className="text-2xl font-bold text-green-700">
              {Math.round(subjects.reduce((acc, subj) => acc + subj.quizAverage, 0) / subjects.length)}%
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
            <p className="text-sm text-gray-600">Overall Accuracy</p>
            <p className="text-2xl font-bold text-amber-700">
              {Math.round(subjects.reduce((acc, subj) => acc + subj.flashcardAccuracy, 0) / subjects.length)}%
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link to="/dashboard/student/concepts/all">View All Concepts</Link>
          </Button>
        </div>
      </Card>

      <Card className="p-6 shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Brain className="text-primary" />
          Subject-Wise Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Subject</th>
                <th className="pb-2">Priority</th>
                <th className="pb-2">Concepts</th>
                <th className="pb-2">Quiz Average</th>
                <th className="pb-2">Flashcard Accuracy</th>
                <th className="pb-2">Last Updated</th>
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
                        {subject.concepts.done}/{subject.concepts.total}
                      </span>
                      <Progress 
                        value={(subject.concepts.done / subject.concepts.total) * 100} 
                        className="w-20" 
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {subject.quizAverage}%
                      </span>
                      <Progress value={subject.quizAverage} className="w-20" />
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {subject.flashcardAccuracy}%
                      </span>
                      <Progress value={subject.flashcardAccuracy} className="w-20" />
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-gray-600">
                      {new Date(subject.lastUpdated).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <span className="flex items-center gap-1">
                      {getStatusEmoji(subject.status)}
                      <span className="text-sm capitalize">
                        {subject.status.replace('-', ' ')}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6 shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <ChartBar className="text-primary" />
          Progress Tracker
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium mb-2">Daily Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Concepts Done</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quiz Score</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Flashcard Accuracy</span>
                <span className="font-medium">90%</span>
              </div>
              <Progress value={75} className="mt-2" />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium mb-2">Weekly Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Concepts Done</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quiz Score</span>
                <span className="font-medium">82%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Flashcard Accuracy</span>
                <span className="font-medium">88%</span>
              </div>
              <Progress value={85} className="mt-2" />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h3 className="font-medium mb-2">Monthly Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Concepts Done</span>
                <span className="font-medium">85</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quiz Score</span>
                <span className="font-medium">88%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Flashcard Accuracy</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={90} className="mt-2" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RedesignedDashboardOverview;
