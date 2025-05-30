import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ExamGoalCard from "./dashboard-sections/ExamGoalCard";
import { MoodType } from "@/types/user/base";
import { getCurrentMoodFromLocalStorage, applyMoodTheme } from "./mood-tracking/moodUtils";
import {
  Briefcase,
  BookOpen,
  Lightbulb,
   presentation,
  TrendingUp,
  Users,
  FileText,
  BarChart4,
  LineChart,
  LayoutDashboard,
  ListChecks,
  Calendar,
  Settings,
  HelpCircle,
} from "lucide-react";

interface RedesignedDashboardOverviewProps {
  userProfile: any;
  kpis: any[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const [currentMood, setCurrentMood] = React.useState<MoodType | undefined>(
    getCurrentMoodFromLocalStorage()
  );

  // Apply mood theme on component mount and mood changes
  useEffect(() => {
    if (currentMood) {
      applyMoodTheme(currentMood);
    }
    
    // Import premium styles
    import('@/styles/premium-dashboard.css');
  }, [currentMood]);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  const mockKpis = [
    {
      title: "Exam Readiness",
      value: "78%",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Time Progress",
      value: "65%",
      change: "-1%",
      trend: "down",
      icon: Calendar,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Study Progress",
      value: "72%",
      change: "+5%",
      trend: "up",
      icon: BookOpen,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Overall Progress",
      value: "71%",
      change: "+2%",
      trend: "up",
      icon: LayoutDashboard,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const mockAdditionalCards = [
    {
      title: "Upcoming Events",
      content: "Review session on June 15th",
      icon: Calendar,
    },
    {
      title: "Suggested Topics",
      content: "Thermodynamics, Optics",
      icon: Lightbulb,
    },
  ];

  const mockQuickActions = [
    {
      title: "View Study Plan",
      icon: ListChecks,
    },
    {
      title: "Check Exam Results",
      icon: FileText,
    },
  ];

  const mockCommunityStats = [
    {
      title: "Active Users",
      value: "4,589",
      icon: Users,
    },
    {
      title: "Daily Engagements",
      value: "12,345",
      icon: presentation,
    },
  ];

  const mockPerformanceStats = [
    {
      title: "Avg. Score",
      value: "78%",
      icon: BarChart4,
    },
    {
      title: "Progress Trend",
      value: "+12%",
      icon: LineChart,
    },
  ];

  const mockSupportLinks = [
    {
      title: "Settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-white to-blue-50/60 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-blue-900/20 prevent-flash">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {userProfile?.name || userProfile?.firstName || 'Student'}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Ready to continue your learning journey today?
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Exam Goal Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ExamGoalCard 
                currentMood={currentMood}
                onMoodChange={handleMoodChange}
              />
            </motion.div>

            {/* KPI Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
            >
              {mockKpis.map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="premium-card p-4 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {kpi.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {kpi.value}
                      </p>
                      <p className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                        {kpi.change} from last week
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                      <kpi.icon className={`h-6 w-6 ${kpi.iconColor}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Premium Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {mockAdditionalCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="premium-card p-4 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center mb-3">
                    <card.icon className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">{card.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{card.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="premium-card p-4"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {mockQuickActions.map((action) => (
                  <button
                    key={action.title}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.title}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Community Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="premium-card p-4"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Community Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockCommunityStats.map((stat) => (
                  <div key={stat.title} className="flex items-center">
                    <stat.icon className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Performance Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="premium-card p-4"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Performance Stats</h3>
              <div className="space-y-2">
                {mockPerformanceStats.map((stat) => (
                  <div key={stat.title} className="flex items-center">
                    <stat.icon className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Support Links Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="premium-card p-4"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Support Links</h3>
              <div className="space-y-2">
                {mockSupportLinks.map((link) => (
                  <button
                    key={link.title}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
