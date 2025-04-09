
import React, { useState } from 'react';
import { X, Edit, Calendar, Clock, BookOpen, Target, Brain, BadgeCheck } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useStudyProgress } from '@/hooks/useStudyProgress';
import { UserProfileType } from '@/types/user';

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog = ({ userProfile, onClose }: StudyPlanDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { subjects, studyStreak } = useStudyProgress();
  const [activeTab, setActiveTab] = useState('overview');

  const estimatedCompletionDate = new Date();
  estimatedCompletionDate.setMonth(estimatedCompletionDate.getMonth() + 3);
  
  const formattedCompletionDate = estimatedCompletionDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800">
        <div className="sticky top-0 z-10 bg-gradient-to-r from-sky-500/90 to-violet-500/90 backdrop-blur-md p-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Your Smart Study Plan</h2>
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X size={24} />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 p-5 rounded-xl border border-sky-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="text-violet-500" size={24} />
                    <h3 className="text-xl font-semibold">Goal</h3>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-bold">{userProfile.goals?.[0]?.title || "IIT-JEE"}</h4>
                    <p className="text-sm text-muted-foreground mt-1">Targeted for May 2025 Examination</p>
                    <Progress value={userProfile.goals?.[0]?.progress || 65} className="mt-3 h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium">{userProfile.goals?.[0]?.progress || 65}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 p-5 rounded-xl border border-sky-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="text-sky-500" size={24} />
                    <h3 className="text-xl font-semibold">Learning Style</h3>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <div className="flex flex-col gap-3">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Personality Type</h4>
                        <p className="font-medium">{userProfile.personality || "Strategic Thinker"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Focus Duration</h4>
                        <p className="font-medium">{userProfile.focusDuration || "45 minutes with 15-minute breaks"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Study Preference</h4>
                        <p className="font-medium">{userProfile.studyPreference || "Visual learning with practical applications"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-violet-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center">
                  <Calendar className="text-violet-500 mb-2" size={28} />
                  <h3 className="text-lg font-semibold">Estimated Completion</h3>
                  <p className="text-2xl font-bold mt-1">{formattedCompletionDate}</p>
                  <p className="text-sm text-muted-foreground mt-1">On-track with your schedule</p>
                </div>
                
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-5 border border-sky-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center">
                  <Clock className="text-sky-500 mb-2" size={28} />
                  <h3 className="text-lg font-semibold">Weekly Study Time</h3>
                  <p className="text-2xl font-bold mt-1">28 hours</p>
                  <p className="text-sm text-muted-foreground mt-1">4 hours daily on average</p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-5 border border-emerald-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center">
                  <BadgeCheck className="text-emerald-500 mb-2" size={28} />
                  <h3 className="text-lg font-semibold">Study Streak</h3>
                  <p className="text-2xl font-bold mt-1">{studyStreak?.currentStreak || 7} days</p>
                  <p className="text-sm text-muted-foreground mt-1">Longest: {studyStreak?.longestStreak || 14} days</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="subjects" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-4">Your Subjects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subjects.map(subject => (
                    <div 
                      key={subject.id}
                      className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-lg">{subject.name}</h4>
                        <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200">
                          {subject.progress}%
                        </Badge>
                      </div>
                      <Progress value={subject.progress} className="h-2 mb-2" />
                      <div className="text-sm text-muted-foreground">
                        <p>Topics: {subject.totalTopics} · Completed: {subject.completedTopics}</p>
                        <p className="mt-1">Expected mastery: {subject.expectedMastery}</p>
                      </div>
                      {isEditing && (
                        <Button className="w-full mt-3 bg-gradient-to-r from-sky-500 to-violet-500 text-white" size="sm">
                          Edit Subject Details
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <Button className="mt-6 bg-gradient-to-r from-sky-500 to-violet-500 text-white">
                    Add New Subject
                  </Button>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-4">Weekly Schedule</h3>
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center">
                      <div className="font-medium text-sm text-muted-foreground">{day}</div>
                      <div className="h-24 md:h-32 bg-gray-50 dark:bg-gray-900 mt-2 rounded-lg border border-gray-100 dark:border-gray-700 p-2">
                        <div className="text-xs text-muted-foreground">4h</div>
                        {day === 'Mon' && (
                          <div className="bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs p-1 rounded mt-1">Physics</div>
                        )}
                        {day === 'Tue' && (
                          <div className="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs p-1 rounded mt-1">Chemistry</div>
                        )}
                        {day === 'Wed' && (
                          <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs p-1 rounded mt-1">Math</div>
                        )}
                        {day === 'Thu' && (
                          <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs p-1 rounded mt-1">Biology</div>
                        )}
                        {day === 'Fri' && (
                          <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs p-1 rounded mt-1">Practice</div>
                        )}
                        {day === 'Sat' && (
                          <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs p-1 rounded mt-1">Review</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <Button className="mt-6 bg-gradient-to-r from-sky-500 to-violet-500 text-white">
                    Edit Schedule
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between w-full">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-sky-500 to-violet-500 text-white">Save Changes</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button 
                  className="bg-gradient-to-r from-sky-500 to-violet-500 text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Study Plan
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </div>
    </div>
  );
};

export default StudyPlanDialog;
