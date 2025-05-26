
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  Target,
  TrendingUp,
  Star,
  Award,
  Zap
} from 'lucide-react';

const VibrantDashboardPreview: React.FC = () => {
  const quickStats = [
    { label: "Study Streak", value: "12 days", icon: <Zap className="h-4 w-4" />, color: "from-orange-400 to-red-500" },
    { label: "Focus Score", value: "85%", icon: <Target className="h-4 w-4" />, color: "from-blue-400 to-purple-500" },
    { label: "Weekly Goal", value: "78%", icon: <Award className="h-4 w-4" />, color: "from-green-400 to-emerald-500" },
    { label: "Efficiency", value: "92%", icon: <TrendingUp className="h-4 w-4" />, color: "from-purple-400 to-pink-500" }
  ];

  const subjects = [
    { name: "Physics", progress: 85, color: "from-blue-500 to-cyan-500", tasks: "3/4 completed" },
    { name: "Chemistry", progress: 72, color: "from-green-500 to-emerald-500", tasks: "2/3 completed" },
    { name: "Biology", progress: 94, color: "from-purple-500 to-violet-500", tasks: "4/4 completed" }
  ];

  const activities = [
    { type: "Concept", title: "Newton's Laws", icon: <BookOpen className="h-4 w-4" />, status: "completed" },
    { type: "Flashcard", title: "Chemical Bonds", icon: <Brain className="h-4 w-4" />, status: "in-progress" },
    { type: "Practice", title: "Kinematics Quiz", icon: <FileText className="h-4 w-4" />, status: "pending" }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-6 text-white min-h-[400px]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl"
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold mb-2">Live Dashboard Preview</h3>
          <p className="text-blue-200 text-sm">Real-time learning analytics</p>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="relative group"
            >
              <div className={`bg-gradient-to-r ${stat.color} p-0.5 rounded-lg`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 h-full">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 rounded-full bg-white/20">
                      {stat.icon}
                    </div>
                    <span className="text-xs font-medium">{stat.label}</span>
                  </div>
                  <div className="text-lg font-bold">{stat.value}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            Subject Progress
          </h4>
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{subject.name}</span>
                <Badge variant="outline" className="text-xs bg-white/20 border-white/30 text-white">
                  {subject.tasks}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="relative">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${subject.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ delay: 0.7 + index * 0.2, duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-400" />
            Today's Activities
          </h4>
          <div className="space-y-2">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center gap-3"
              >
                <div className="p-1.5 rounded-full bg-white/20">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium">{activity.title}</div>
                  <div className="text-xs text-blue-200">{activity.type}</div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs border-white/30 ${
                    activity.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                    activity.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}
                >
                  {activity.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Action Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-4"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity 
            }}
            className="text-xs text-blue-200"
          >
            ✨ Interactive dashboard with real-time updates
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VibrantDashboardPreview;
