
import { useState, useEffect } from 'react';
import { UserProfileBase } from '@/types/user/base';
import { DashboardData } from '@/types/student/dashboard';

export const useStudentDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    recentActivity: [],
    suggestedContent: [],
    stats: {
      studyTime: 0,
      completedTasks: 0,
      streak: 0,
      accuracy: 0
    },
    upcomingEvents: [],
    progressData: {}
  });
  
  const [userProfile, setUserProfile] = useState<UserProfileBase>({
    id: '1',
    name: 'Student User',
    email: 'student@example.com',
    avatar: '/avatars/student-1.png',
    level: 5,
    xp: 1250,
    role: 'student',
    loginCount: 7,
    lastActive: new Date().toISOString(),
    subscription: 'premium',
    streak: 5,
    studyHours: 42,
    conceptsLearned: 78,
    testsCompleted: 12
  });

  // Mock data fetch on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call with a delay
      setTimeout(() => {
        // Mock dashboard data
        const data: DashboardData = {
          recentActivity: [
            { id: 'act1', type: 'quiz', title: 'Physics Quiz', date: new Date().toISOString(), score: 85 },
            { id: 'act2', type: 'flashcard', title: 'Chemistry Flashcards', date: new Date(Date.now() - 86400000).toISOString() },
            { id: 'act3', type: 'concept', title: 'Mathematics - Calculus', date: new Date(Date.now() - 172800000).toISOString() }
          ],
          suggestedContent: [
            { id: 'sug1', type: 'concept', title: 'Newton\'s Laws of Motion', subject: 'Physics' },
            { id: 'sug2', type: 'quiz', title: 'Chemical Bonding Quiz', subject: 'Chemistry' },
            { id: 'sug3', type: 'flashcard', title: 'Periodic Table Elements', subject: 'Chemistry' }
          ],
          stats: {
            studyTime: 12.5,
            completedTasks: 32,
            streak: 5,
            accuracy: 78
          },
          upcomingEvents: [
            { id: 'evt1', title: 'Practice Test', date: new Date(Date.now() + 86400000).toISOString(), type: 'test' },
            { id: 'evt2', title: 'Study Session', date: new Date(Date.now() + 172800000).toISOString(), type: 'session' }
          ],
          progressData: {
            physics: 65,
            chemistry: 42,
            mathematics: 78,
            biology: 53
          }
        };
        
        setDashboardData(data);
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, []);

  // Refresh data function
  const refreshData = () => {
    // Implement refresh logic
    console.log("Refreshing dashboard data...");
    // Could call the same fetchData function or a similar one
  };

  return { loading, dashboardData, userProfile, refreshData };
};
