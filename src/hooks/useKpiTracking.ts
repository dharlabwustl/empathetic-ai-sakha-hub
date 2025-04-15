import { useState, useEffect } from 'react';
import { UserRole } from '@/types/user';

export interface KpiData {
  id: string;
  value: string | number;
  unit?: string;
  change: number;
  label: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface NudgeData {
  id: string;
  title: string;
  message: string;
  type: 'motivation' | 'reminder' | 'celebration' | 'suggestion' | 'warning';
  read: boolean;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  actionLabel?: string;
  actionUrl?: string;
  icon?: string;
}

export function useKpiTracking(userType: string) {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);

  useEffect(() => {
    // Load KPIs and nudges based on user type
    getKpisByUserType(userType);
    getNudgesByUserType(userType);
  }, [userType]);

  const getKpisByUserType = (type: string) => {
    if (type === 'student' || type === 'Student') {
      setKpis(getStudentKpis());
    } else if (type === 'employee' || type === 'Employee') {
      setKpis(getEmployeeKpis());
    } else if (type === 'doctor' || type === 'Doctor') {
      setKpis(getDoctorKpis());
    } else if (type === 'founder' || type === 'Founder') {
      setKpis(getFounderKpis());
    } else {
      setKpis([]);
    }
  };

  const getNudgesByUserType = (type: string) => {
    if (type === 'student' || type === 'Student') {
      setNudges(getStudentNudges());
    } else if (type === 'employee' || type === 'Employee') {
      setNudges(getEmployeeNudges());
    } else if (type === 'doctor' || type === 'Doctor') {
      setNudges(getDoctorNudges());
    } else if (type === 'founder' || type === 'Founder') {
      setNudges(getFounderNudges());
    } else {
      setNudges([]);
    }
  };

  const markNudgeAsRead = (id: string) => {
    setNudges(prev => prev.map(nudge => 
      nudge.id === id ? { ...nudge, read: true } : nudge
    ));
  };

  const getStudentKpis = (): KpiData[] => {
    return [
      {
        id: 'progress',
        value: 75,
        unit: '%',
        change: 5,
        label: 'Course Progress',
        icon: 'BookOpen',
        trend: 'up',
      },
      {
        id: 'streak',
        value: 15,
        unit: 'days',
        change: 2,
        label: 'Study Streak',
        icon: 'Clock',
        trend: 'up',
      },
      {
        id: 'score',
        value: 88,
        unit: '%',
        change: 3,
        label: 'Average Score',
        icon: 'Brain',
        trend: 'up',
      },
      {
        id: 'mood',
        value: 'Happy',
        change: 10,
        label: 'Current Mood',
        icon: 'Smile',
        trend: 'up',
      },
    ];
  };

  const getEmployeeKpis = (): KpiData[] => {
    return [
      {
        id: 'projects',
        value: 12,
        unit: '',
        change: 1,
        label: 'Projects Completed',
        icon: 'CheckSquare',
        trend: 'up',
      },
      {
        id: 'performance',
        value: 92,
        unit: '%',
        change: 2,
        label: 'Performance Score',
        icon: 'LineChart',
        trend: 'up',
      },
      {
        id: 'satisfaction',
        value: 9.5,
        unit: '/10',
        change: 0.5,
        label: 'Client Satisfaction',
        icon: 'Heart',
        trend: 'up',
      },
      {
        id: 'deadline',
        value: 10,
        unit: 'days',
        change: -1,
        label: 'Time to Deadline',
        icon: 'Clock',
        trend: 'down',
      },
    ];
  };

  const getDoctorKpis = (): KpiData[] => {
    return [
      {
        id: 'patients',
        value: 250,
        unit: '',
        change: 5,
        label: 'Patients Seen',
        icon: 'Users',
        trend: 'up',
      },
      {
        id: 'satisfaction',
        value: 9.8,
        unit: '/10',
        change: 0.1,
        label: 'Patient Satisfaction',
        icon: 'Heart',
        trend: 'up',
      },
      {
        id: 'efficiency',
        value: 85,
        unit: '%',
        change: 2,
        label: 'Operational Efficiency',
        icon: 'TrendingUp',
        trend: 'up',
      },
      {
        id: 'burnout',
        value: 20,
        unit: '%',
        change: -5,
        label: 'Burnout Risk',
        icon: 'Battery',
        trend: 'down',
      },
    ];
  };

  const getFounderKpis = (): KpiData[] => {
    return [
      {
        id: 'revenue',
        value: 150000,
        unit: '₹',
        change: 15,
        label: 'Monthly Revenue',
        icon: 'TrendingUp',
        trend: 'up',
      },
      {
        id: 'users',
        value: 5000,
        unit: '',
        change: 10,
        label: 'Active Users',
        icon: 'Users',
        trend: 'up',
      },
      {
        id: 'runway',
        value: 6,
        unit: 'months',
        change: -1,
        label: 'Runway Remaining',
        icon: 'Clock',
        trend: 'down',
      },
      {
        id: 'risk',
        value: 30,
        unit: '%',
        change: 5,
        label: 'Investment Risk',
        icon: 'FileText',
        trend: 'up',
      },
    ];
  };

  const getStudentNudges = (): NudgeData[] => {
    return [
      {
        id: 'nudge-1',
        title: 'Complete Physics Module',
        message: 'Finish the electromagnetism module to boost your score.',
        type: 'reminder',
        read: false,
        timestamp: '2025-05-12T10:00:00',
        priority: 'high',
        actionLabel: 'Start Module',
        actionUrl: '/dashboard/student/subjects',
        icon: 'BookOpen',
      },
      {
        id: 'nudge-2',
        title: 'Practice Quiz Available',
        message: 'A new practice quiz is available for calculus.',
        type: 'suggestion',
        read: false,
        timestamp: '2025-05-11T16:30:00',
        priority: 'medium',
        actionLabel: 'Take Quiz',
        actionUrl: '/dashboard/student/quizzes',
        icon: 'FileText',
      },
      {
        id: 'nudge-3',
        title: 'Keep Up the Streak!',
        message: 'You\'re on a 15-day study streak. Keep going!',
        type: 'celebration',
        read: true,
        timestamp: '2025-05-10T08:00:00',
        priority: 'low',
        icon: 'Star',
      },
    ];
  };

  const getEmployeeNudges = (): NudgeData[] => {
    return [
      {
        id: 'nudge-4',
        title: 'Submit Project Report',
        message: 'The deadline for the Q2 project report is approaching.',
        type: 'reminder',
        read: false,
        timestamp: '2025-05-12T09:00:00',
        priority: 'high',
        actionLabel: 'Submit Report',
        actionUrl: '/dashboard/employee/projects',
        icon: 'FileText',
      },
      {
        id: 'nudge-5',
        title: 'Skill Enhancement Opportunity',
        message: 'Enroll in the upcoming data analysis workshop.',
        type: 'suggestion',
        read: false,
        timestamp: '2025-05-11T14:00:00',
        priority: 'medium',
        actionLabel: 'Enroll Now',
        actionUrl: '/dashboard/employee/training',
        icon: 'Code',
      },
      {
        id: 'nudge-6',
        title: 'Great Job on Client X',
        message: 'Your client satisfaction score is up by 5%.',
        type: 'celebration',
        read: true,
        timestamp: '2025-05-10T12:00:00',
        priority: 'low',
        icon: 'Heart',
      },
    ];
  };

  const getDoctorNudges = (): NudgeData[] => {
    return [
      {
        id: 'nudge-7',
        title: 'Review Patient Records',
        message: 'Update the records for patient ID 12345.',
        type: 'reminder',
        read: false,
        timestamp: '2025-05-12T11:00:00',
        priority: 'high',
        actionLabel: 'View Records',
        actionUrl: '/dashboard/doctor/patients',
        icon: 'Users',
      },
      {
        id: 'nudge-8',
        title: 'New Medical Research',
        message: 'Check out the latest research on cardiology.',
        type: 'suggestion',
        read: false,
        timestamp: '2025-05-11T18:00:00',
        priority: 'medium',
        actionLabel: 'Read Article',
        actionUrl: '/dashboard/doctor/research',
        icon: 'FileText',
      },
      {
        id: 'nudge-9',
        title: 'High Patient Satisfaction',
        message: 'Your patient satisfaction score is consistently high.',
        type: 'celebration',
        read: true,
        timestamp: '2025-05-10T14:00:00',
        priority: 'low',
        icon: 'Heart',
      },
    ];
  };

  const getFounderNudges = (): NudgeData[] => {
    return [
      {
        id: 'nudge-10',
        title: 'Investor Meeting Reminder',
        message: 'Prepare for the upcoming Series A funding meeting.',
        type: 'reminder',
        read: false,
        timestamp: '2025-05-12T13:00:00',
        priority: 'high',
        actionLabel: 'Prepare Deck',
        actionUrl: '/dashboard/founder/funding',
        icon: 'FileText',
      },
      {
        id: 'nudge-11',
        title: 'Product Beta Launch',
        message: 'Finalize the MVP for the product beta launch.',
        type: 'suggestion',
        read: false,
        timestamp: '2025-05-11T20:00:00',
        priority: 'medium',
        actionLabel: 'Launch Beta',
        actionUrl: '/dashboard/founder/product',
        icon: 'Code',
      },
      {
        id: 'nudge-12',
        title: 'Revenue Milestone Achieved',
        message: 'Your monthly revenue has increased by 15%.',
        type: 'celebration',
        read: true,
        timestamp: '2025-05-10T16:00:00',
        priority: 'low',
        icon: 'TrendingUp',
      },
    ];
  };

  return { kpis, nudges, markNudgeAsRead };
}
