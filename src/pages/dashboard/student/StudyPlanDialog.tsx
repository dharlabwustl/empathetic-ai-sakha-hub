
import React, { useState } from 'react';
import { UserProfileType } from "@/types/user";
import { Button } from '@/components/ui/button';
import { X, Calendar, CheckCircle2, BookOpen, BarChart3, AlertCircle, BookMarked, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog: React.FC<StudyPlanDialogProps> = ({ userProfile, onClose }) => {
  const [tab, setTab] = useState<'today' | 'week' | 'month'>('today');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  const todayTasks = [
    { id: 1, title: "Newton's Laws of Motion", subject: "Physics", duration: 45, completed: false },
    { id: 2, title: "Organic Chemistry: Alcohols", subject: "Chemistry", duration: 30, completed: true },
    { id: 3, title: "Matrix Operations", subject: "Mathematics", duration: 60, completed: false },
  ];
  
  const weeklyTasks = [
    { day: "Monday", tasks: 3, completed: 2 },
    { day: "Tuesday", tasks: 4, completed: 3 },
    { day: "Wednesday", tasks: 3, completed: 1, isToday: true },
    { day: "Thursday", tasks: 5, completed: 0 },
    { day: "Friday", tasks: 2, completed: 0 },
    { day: "Saturday", tasks: 2, completed: 0 },
    { day: "Sunday", tasks: 1, completed: 0 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-850 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="sticky top-0 z-10 bg-indigo-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            <h2 className="text-xl font-bold">Your Study Plan</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-indigo-700 rounded-full" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 md:p-6 bg-white dark:bg-gray-850 overflow-y-auto max-h-[calc(90vh-64px)]">
          {/* Tabs */}
          <div className="flex border-b">
            <button 
              className={`px-4 py-2 font-medium ${tab === 'today' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`} 
              onClick={() => setTab('today')}
            >
              Today
            </button>
            <button 
              className={`px-4 py-2 font-medium ${tab === 'week' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`} 
              onClick={() => setTab('week')}
            >
              This Week
            </button>
            <button 
              className={`px-4 py-2 font-medium ${tab === 'month' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`} 
              onClick={() => setTab('month')}
            >
              Monthly View
            </button>
          </div>

          <AnimatePresence mode="wait">
            {tab === 'today' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                key="today"
                className="mt-6 space-y-6"
              >
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <h3 className="text-lg font-medium flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-amber-500" />
                    Today's Focus
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Complete these tasks to stay on track with your exam preparation.
                  </p>
                  <div className="mt-4 space-y-3">
                    {todayTasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between ${task.completed ? 'opacity-75' : ''}`}
                        onClick={() => setSelectedSubject(task.subject)}
                      >
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full ${task.completed ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                            {task.completed ? <CheckCircle2 className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                          </div>
                          <div className="ml-3">
                            <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className={`mr-2 ${
                                task.subject === 'Physics' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                task.subject === 'Chemistry' ? 'bg-green-50 text-green-700 border-green-200' :
                                'bg-purple-50 text-purple-700 border-purple-200'
                              }`}>
                                {task.subject}
                              </Badge>
                              <span className="text-xs text-gray-500">{task.duration} min</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant={task.completed ? "outline" : "default"} 
                          size="sm"
                        >
                          {task.completed ? 'Completed' : 'Start Study'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="text-lg font-medium flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                    Daily Progress
                  </h3>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-500">Study Time</p>
                      <p className="text-2xl font-bold mt-1">75 min</p>
                      <div className="h-1 w-full bg-gray-100 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{width: '50%'}}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">50% of daily goal</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-500">Tasks Completed</p>
                      <p className="text-2xl font-bold mt-1">1/3</p>
                      <div className="h-1 w-full bg-gray-100 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{width: '33%'}}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">33% completed</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-500">Focus Score</p>
                      <p className="text-2xl font-bold mt-1">7.5/10</p>
                      <div className="h-1 w-full bg-gray-100 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Good focus today</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button variant="outline" className="flex items-center gap-2">
                    <BookMarked className="h-4 w-4" />
                    View Complete Syllabus
                  </Button>
                  
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Adjust Today's Plan
                  </Button>
                </div>
              </motion.div>
            )}
            
            {tab === 'week' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                key="week"
                className="mt-6"
              >
                <div className="grid grid-cols-7 gap-3">
                  {weeklyTasks.map((day) => (
                    <div 
                      key={day.day} 
                      className={`p-3 rounded-lg border ${
                        day.isToday 
                          ? 'bg-indigo-50 border-indigo-200' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <p className="text-sm font-medium text-center">{day.day.substring(0, 3)}</p>
                      <div className="mt-2 flex flex-col items-center">
                        <span className="text-lg font-bold">{day.completed}/{day.tasks}</span>
                        <span className="text-xs text-gray-500">tasks</span>
                      </div>
                      <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${(day.completed / day.tasks) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-amber-50 p-4 rounded-lg flex items-start border border-amber-200">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Weekly Analysis</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      You're on track with your Chemistry studies but falling behind in Physics. 
                      Consider allocating more time to Physics topics in the coming days.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium">Physics</h4>
                    <p className="text-2xl font-bold mt-1 text-blue-600">40%</p>
                    <div className="h-2 w-full bg-gray-100 mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">3/5 topics completed this week</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium">Chemistry</h4>
                    <p className="text-2xl font-bold mt-1 text-green-600">75%</p>
                    <div className="h-2 w-full bg-gray-100 mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">6/8 topics completed this week</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium">Mathematics</h4>
                    <p className="text-2xl font-bold mt-1 text-purple-600">60%</p>
                    <div className="h-2 w-full bg-gray-100 mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">4/5 topics completed this week</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {tab === 'month' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                key="month"
                className="mt-6"
              >
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  {/* Calendar placeholder */}
                  <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                      <div key={day} className="text-center text-xs font-medium p-1">{day}</div>
                    ))}
                    {Array(35).fill(0).map((_, i) => {
                      const isToday = i === 16;
                      const hasTask = [3, 4, 5, 8, 10, 12, 16, 17, 19, 22, 24, 25, 26, 30, 31].includes(i);
                      const isCompleted = [3, 4, 5, 8, 10, 12].includes(i);
                      
                      return (
                        <div 
                          key={i} 
                          className={`
                            aspect-square p-1 text-center border
                            ${isToday ? 'bg-indigo-100 border-indigo-300 font-bold' : 'border-gray-100'}
                            ${i < 3 || i > 31 ? 'text-gray-300 bg-gray-50' : ''}
                          `}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span className="text-xs">{i < 3 ? i + 29 : i > 30 ? i - 30 : i + 1}</span>
                            {hasTask && (
                              <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                                isCompleted ? 'bg-green-500' : 'bg-amber-500'
                              }`}></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-medium">Monthly Progress</h3>
                    <p className="text-sm text-gray-600 mt-1">You've completed 45% of your planned study hours this month.</p>
                    <div className="mt-4 h-4 w-full bg-white rounded-full overflow-hidden border border-gray-200">
                      <div className="h-full bg-purple-500 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>0h</span>
                      <span>45h of 100h</span>
                      <span>100h</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-medium">Consistency Score</h3>
                    <div className="flex items-end mt-2">
                      <span className="text-3xl font-bold text-green-700">75</span>
                      <span className="text-sm text-gray-500 ml-1 mb-1">/100</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">You've been consistent with your study schedule on 15 out of 20 days this month.</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Month At A Glance</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        <span>Physics</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        <span>Chemistry</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                        <span>Mathematics</span>
                      </div>
                    </div>
                    
                    <div className="h-40 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400 text-sm">Month progress visualization</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default StudyPlanDialog;
