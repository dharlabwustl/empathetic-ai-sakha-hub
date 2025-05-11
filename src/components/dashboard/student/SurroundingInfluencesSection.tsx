
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
} from 'chart.js';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

// Define the types of data we'll be tracking
type MetricType = 'physical' | 'social' | 'environment' | 'rest';

// Mock data for current month and previous month
const currentMonthData = {
  physical: {
    sleepHours: [7, 6.5, 8, 7.5, 6, 7, 8],
    nutrition: [80, 75, 85, 60, 90, 70, 65],
    exercise: [45, 30, 0, 60, 30, 0, 45],
  },
  social: {
    studyGroups: [3, 0, 2, 0, 1, 0, 1],
    peerInteractions: [8, 5, 7, 6, 9, 4, 7],
    supportNetwork: [70, 65, 70, 75, 70, 65, 70],
  },
  environment: {
    noiseLevel: [20, 35, 15, 25, 20, 15, 20], // lower is better
    lightQuality: [85, 80, 90, 85, 85, 90, 85],
    organization: [70, 75, 80, 65, 70, 75, 70],
    proactiveness: [
      { name: 'Non-peak hour study', value: 75 },
      { name: 'Self-initiated revision', value: 60 },
    ]
  },
  rest: {
    breakFrequency: [4, 3, 5, 4, 4, 3, 4],
    breakQuality: [7, 6, 8, 7, 7, 6, 7], 
    recreationalActivities: [2, 1, 2, 1, 2, 2, 1],
  }
};

const previousMonthData = {
  physical: {
    sleepHours: [6, 6, 7, 7, 5.5, 6, 7],
    nutrition: [70, 65, 75, 55, 70, 60, 60],
    exercise: [30, 30, 0, 45, 30, 0, 30],
  },
  social: {
    studyGroups: [1, 0, 1, 0, 1, 0, 0],
    peerInteractions: [5, 4, 6, 5, 7, 3, 5],
    supportNetwork: [60, 60, 65, 70, 65, 60, 60],
  },
  environment: {
    noiseLevel: [30, 40, 25, 35, 30, 25, 30], // lower is better
    lightQuality: [75, 70, 80, 75, 75, 80, 75],
    organization: [60, 65, 70, 55, 60, 65, 60],
    proactiveness: [
      { name: 'Non-peak hour study', value: 55 },
      { name: 'Self-initiated revision', value: 45 },
    ]
  },
  rest: {
    breakFrequency: [3, 2, 4, 3, 3, 2, 3],
    breakQuality: [5, 5, 6, 6, 5, 5, 6], 
    recreationalActivities: [1, 1, 1, 0, 1, 1, 0],
  }
};

// Get day labels for the charts
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Helper function to create chart options
const createChartOptions = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: title,
    },
  },
});

const SurroundingInfluencesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MetricType>('physical');
  const [timeframe, setTimeframe] = useState<'current' | 'previous'>('current');

  // Get the active data based on the selected timeframe
  const getActiveData = () => {
    return timeframe === 'current' ? currentMonthData : previousMonthData;
  };

  // Create chart data for the physical metrics
  const physicalChartData = {
    labels: dayLabels,
    datasets: [
      {
        label: 'Sleep (hours)',
        data: getActiveData().physical.sleepHours,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Nutrition (quality %)',
        data: getActiveData().physical.nutrition,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Exercise (minutes)',
        data: getActiveData().physical.exercise,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Create chart data for social metrics
  const socialChartData = {
    labels: dayLabels,
    datasets: [
      {
        label: 'Study Group Sessions',
        data: getActiveData().social.studyGroups,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Peer Interactions',
        data: getActiveData().social.peerInteractions,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Create radar chart data for support network
  const supportNetworkData = {
    labels: ['Academic Support', 'Emotional Support', 'Motivation', 'Accountability', 'Resource Sharing', 'Feedback'],
    datasets: [
      {
        label: 'Support Network Strength',
        data: getActiveData().social.supportNetwork,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Create chart data for environment metrics
  const environmentChartData = {
    labels: dayLabels,
    datasets: [
      {
        label: 'Noise Level (lower is better)',
        data: getActiveData().environment.noiseLevel,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Light Quality',
        data: getActiveData().environment.lightQuality,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Organization',
        data: getActiveData().environment.organization,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Create chart data for rest metrics
  const restChartData = {
    labels: dayLabels,
    datasets: [
      {
        label: 'Breaks Taken',
        data: getActiveData().rest.breakFrequency,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Break Quality (1-10)',
        data: getActiveData().rest.breakQuality,
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Recreational Activities',
        data: getActiveData().rest.recreationalActivities,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Create data for the donut chart
  const breakdownData = {
    labels: ['Study', 'Sleep', 'Exercise', 'Meals', 'Social', 'Recreation'],
    datasets: [
      {
        data: timeframe === 'current' ? [35, 33, 5, 12, 8, 7] : [45, 29, 2, 12, 5, 7],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Surrounding Influences</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={timeframe === 'current' ? "secondary" : "outline"}
              size="sm"
              onClick={() => setTimeframe('current')}
            >
              Current Month
            </Button>
            <Button
              variant={timeframe === 'previous' ? "secondary" : "outline"}
              size="sm"
              onClick={() => setTimeframe('previous')}
            >
              Previous Month
            </Button>
          </div>
        </div>
        <Tabs 
          defaultValue="physical" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as MetricType)}
          className="w-full mt-4"
        >
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="rest">Rest & Balance</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="p-4">
        {activeTab === 'physical' && (
          <div>
            <div className="h-80 mb-6">
              <Bar 
                data={physicalChartData} 
                options={createChartOptions('Physical Well-being Metrics')} 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Key Insights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">1</span>
                    <span>Your average sleep ({getActiveData().physical.sleepHours.reduce((a, b) => a + b, 0) / 7} hours) is {timeframe === 'current' ? 'better than' : 'worse than'} last month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">2</span>
                    <span>Exercise frequency needs improvement - you exercised only {getActiveData().physical.exercise.filter(e => e > 0).length} days this week</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">3</span>
                    <span>Nutritional quality is {Math.round(getActiveData().physical.nutrition.reduce((a, b) => a + b, 0) / 7)}% - {timeframe === 'current' ? '+10%' : '-10%'} from previous month</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Target 7-8 hours of sleep</span>
                    <Badge variant="outline" className={getActiveData().physical.sleepHours.every(h => h >= 7) ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().physical.sleepHours.every(h => h >= 7) ? "On Track" : "Needs Work"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Exercise 3x weekly (min 30 min)</span>
                    <Badge variant="outline" className={getActiveData().physical.exercise.filter(e => e >= 30).length >= 3 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().physical.exercise.filter(e => e >= 30).length >= 3 ? "On Track" : "Needs Work"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Improve nutrition variety</span>
                    <Badge variant="outline" className={getActiveData().physical.nutrition.reduce((a, b) => a + b, 0) / 7 >= 75 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().physical.nutrition.reduce((a, b) => a + b, 0) / 7 >= 75 ? "On Track" : "Needs Work"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="h-80">
                <Bar 
                  data={socialChartData} 
                  options={createChartOptions('Social Interaction Metrics')} 
                />
              </div>
              <div className="h-80">
                <Radar 
                  data={supportNetworkData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Support Network Strength',
                      },
                    },
                    scales: {
                      r: {
                        min: 0,
                        max: 100,
                        beginAtZero: true,
                        angleLines: {
                          color: 'rgba(128, 128, 128, 0.2)',
                        },
                        grid: {
                          color: 'rgba(128, 128, 128, 0.2)',
                        },
                        ticks: {
                          stepSize: 20,
                          backdropColor: 'transparent',
                        },
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Key Insights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">1</span>
                    <span>Study group participation is {getActiveData().social.studyGroups.reduce((a, b) => a + b, 0)} sessions ({timeframe === 'current' ? '+75%' : '-75%'} from previous month)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">2</span>
                    <span>Your peer interaction quality is above average at {Math.round(getActiveData().social.supportNetwork[2])}%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">3</span>
                    <span>Resource sharing could be improved - currently at {Math.round(getActiveData().social.supportNetwork[4])}%</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Join at least 2 study groups weekly</span>
                    <Badge variant="outline" className={getActiveData().social.studyGroups.reduce((a, b) => a + b, 0) >= 2 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().social.studyGroups.reduce((a, b) => a + b, 0) >= 2 ? "On Track" : "Needs Work"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Connect with study partners daily</span>
                    <Badge variant="outline" className={getActiveData().social.peerInteractions.every(i => i > 3) ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().social.peerInteractions.every(i => i > 3) ? "On Track" : "Needs Work"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Share study resources weekly</span>
                    <Badge variant="outline" className={getActiveData().social.supportNetwork[4] > 70 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().social.supportNetwork[4] > 70 ? "On Track" : "Needs Work"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'environment' && (
          <div>
            <div className="h-80 mb-6">
              <Bar 
                data={environmentChartData} 
                options={createChartOptions('Study Environment Metrics')} 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Key Insights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">1</span>
                    <span>Your average noise level is {Math.round(getActiveData().environment.noiseLevel.reduce((a, b) => a + b, 0) / 7)}/100 ({timeframe === 'current' ? 'better' : 'worse'} than last month)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">2</span>
                    <span>Light quality is excellent at {Math.round(getActiveData().environment.lightQuality.reduce((a, b) => a + b, 0) / 7)}%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">3</span>
                    <span>Workspace organization is {Math.round(getActiveData().environment.organization.reduce((a, b) => a + b, 0) / 7)}% - improved from previous month</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Non-peak hour study time</span>
                    <Badge variant="outline" className={getActiveData().environment.proactiveness[0].value > 60 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().environment.proactiveness[0].value > 60 ? "Excellent" : "Good"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Self-initiated revision</span>
                    <Badge variant="outline" className={getActiveData().environment.proactiveness[0].value > 55 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().environment.proactiveness[0].value > 55 ? "Excellent" : "Good"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Maintain dedicated study space</span>
                    <Badge variant="outline" className={getActiveData().environment.organization.reduce((a, b) => a + b, 0) / 7 > 70 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().environment.organization.reduce((a, b) => a + b, 0) / 7 > 70 ? "On Track" : "Needs Work"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rest' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="h-80">
                <Bar 
                  data={restChartData} 
                  options={createChartOptions('Rest & Balance Metrics')} 
                />
              </div>
              <div className="h-80 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <Doughnut
                    data={breakdownData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                        title: {
                          display: true,
                          text: 'Time Allocation (24 hours)',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Key Insights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">1</span>
                    <span>You take an average of {(getActiveData().rest.breakFrequency.reduce((a, b) => a + b, 0) / 7).toFixed(1)} breaks per day ({timeframe === 'current' ? '+25%' : '-25%'} from previous month)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">2</span>
                    <span>Break quality rating is {(getActiveData().rest.breakQuality.reduce((a, b) => a + b, 0) / 7).toFixed(1)}/10 - monitor closely</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 p-1 rounded-full mr-2 h-6 w-6 flex items-center justify-center">3</span>
                    <span>You engaged in {getActiveData().rest.recreationalActivities.reduce((a, b) => a + b, 0)} recreational activities this week</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Take 4-5 quality breaks daily</span>
                    <Badge variant="outline" className={getActiveData().rest.breakFrequency.reduce((a, b) => a + b, 0) / 7 >= 4 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().rest.breakFrequency.reduce((a, b) => a + b, 0) / 7 >= 4 ? "On Track" : "Needs Work"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">2+ recreational activities weekly</span>
                    <Badge variant="outline" className={getActiveData().rest.recreationalActivities.reduce((a, b) => a + b, 0) >= 2 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {getActiveData().rest.recreationalActivities.reduce((a, b) => a + b, 0) >= 2 ? "On Track" : "Needs Work"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Balance study/rest ratio</span>
                    <Badge variant="outline" className={timeframe === 'current' ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"}>
                      {timeframe === 'current' ? "Better Balance" : "Study Heavy"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SurroundingInfluencesSection;
