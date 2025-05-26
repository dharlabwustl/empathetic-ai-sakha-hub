
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import DashboardProgressMeter from './dashboard-progress/DashboardProgressMeter';
import MoodTrackingSection from './mood-tracking/MoodTrackingSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import StudyStreakSection from './dashboard-sections/StudyStreakSection';
import PracticeSection from './dashboard-sections/PracticeSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import KeyInsightsSection from './dashboard-sections/KeyInsightsSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { getCurrentMoodFromLocalStorage } from './mood-tracking/moodUtils';
import { MoodType } from '@/types/user/base';
import VoiceStudyAssistant from './voice/VoiceStudyAssistant';
import StudyPlannerCard from './StudyPlannerCard';
import SpeechRecognitionButton from '@/components/voice/SpeechRecognitionButton';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const isMobile = useIsMobile();
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);

  // Load current mood from localStorage on component mount
  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  const handleSpeechCommand = (command: string) => {
    console.log('Dashboard speech command received:', command);
  };

  // Dashboard preview with enhanced 3D charts and better text visibility
  const dashboardPreviewData = [
    {
      title: "Weekly Study Progress",
      type: "line",
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Hours Studied',
          data: [2.5, 3.2, 2.8, 4.1, 3.7, 5.2, 4.8],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
        }]
      }
    },
    {
      title: "Subject Performance",
      type: "bar",
      data: {
        labels: ['Physics', 'Chemistry', 'Biology', 'Math'],
        datasets: [{
          label: 'Score %',
          data: [85, 78, 92, 88],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(249, 115, 22, 0.8)'
          ],
          borderColor: [
            'rgb(34, 197, 94)',
            'rgb(59, 130, 246)',
            'rgb(168, 85, 247)',
            'rgb(249, 115, 22)'
          ],
          borderWidth: 2,
          borderRadius: 8,
        }]
      }
    },
    {
      title: "Study Time Distribution",
      type: "doughnut",
      data: {
        labels: ['Concepts', 'Practice', 'Revision', 'Tests'],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(249, 115, 22, 0.8)'
          ],
          borderColor: [
            'rgb(34, 197, 94)',
            'rgb(59, 130, 246)',
            'rgb(168, 85, 247)',
            'rgb(249, 115, 22)'
          ],
          borderWidth: 3,
        }]
      }
    }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgb(75, 85, 99)', // Better text visibility
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(75, 85, 99)', // Better text visibility
          font: {
            weight: 'bold' as const
          }
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'rgb(75, 85, 99)', // Better text visibility
          font: {
            weight: 'bold' as const
          }
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.1)'
        }
      }
    }
  };

  const renderChart = (chartData: any) => {
    const height = isMobile ? 200 : 250;
    
    switch (chartData.type) {
      case 'line':
        return (
          <div style={{ height }}>
            <Line data={chartData.data} options={chartOptions} />
          </div>
        );
      case 'bar':
        return (
          <div style={{ height }}>
            <Bar data={chartData.data} options={chartOptions} />
          </div>
        );
      case 'doughnut':
        return (
          <div style={{ height }}>
            <Doughnut data={chartData.data} options={{
              ...chartOptions,
              scales: undefined // Doughnut charts don't have scales
            }} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Dashboard Preview with Better Visibility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-blue-200/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Your Learning Analytics Dashboard
            </CardTitle>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Track your progress with intelligent insights
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardPreviewData.map((chart, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold text-gray-800 dark:text-white text-center">
                        {chart.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      {renderChart(chart)}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Meter */}
      <DashboardProgressMeter userProfile={userProfile} kpis={kpis} />

      {/* Mood Tracking Section */}
      <MoodTrackingSection 
        currentMood={currentMood} 
        onMoodChange={handleMoodChange} 
        isMobile={isMobile}
      />

      {/* Main Content Grid */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {/* Left Column */}
        <div className="space-y-6">
          <TodaysPlanSection currentMood={currentMood} />
          <StudyStreakSection />
          <PracticeSection />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <UpcomingMilestonesSection />
          <KeyInsightsSection />
          
          {/* Voice Study Assistant */}
          <VoiceStudyAssistant 
            userName={userProfile.name}
            onMoodCommand={handleMoodChange}
          />
        </div>
      </div>

      {/* Study Planner Card */}
      <StudyPlannerCard />

      {/* Speech Recognition Button - positioned above voice assistant */}
      <SpeechRecognitionButton
        position="dashboard"
        onCommand={handleSpeechCommand}
        className="fixed bottom-44 left-6 z-50"
      />
    </div>
  );
};

export default RedesignedDashboardOverview;
