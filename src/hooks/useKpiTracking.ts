
import { useState, useEffect } from "react";
import { UserRole } from "@/types/user";

export interface KpiData {
  id: string;
  label: string;
  value: number;
  icon: string;
  color: string;
  increase: number;
  description: string;
  trend?: "up" | "down" | "flat";
  change?: number;
  unit?: string;
}

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  cta: string;
  isRead: boolean;
  message: string;
  type: "motivation" | "reminder" | "celebration" | "suggestion" | "warning";
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

export function useKpiTracking(userType: UserRole | string) {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);

  useEffect(() => {
    // Mock KPI data based on user role
    let mockKpis: KpiData[] = [];
    if (userType === "student") {
      mockKpis = [
        {
          id: "kpi-1",
          label: "Subjects Studied",
          value: 7,
          icon: "BookOpen",
          color: "blue",
          increase: 12,
          description: "Increase from last week",
          trend: "up",
          change: 12,
          unit: ""
        },
        {
          id: "kpi-2",
          label: "Quizzes Taken",
          value: 25,
          icon: "CheckSquare",
          color: "green",
          increase: 8,
          description: "Increase from last week",
          trend: "up",
          change: 8
        },
        {
          id: "kpi-3",
          label: "Hours Studied",
          value: 42,
          icon: "Clock",
          color: "purple",
          increase: 5,
          description: "Increase from last week",
          trend: "up",
          change: 5,
          unit: "hrs"
        },
        {
          id: "kpi-4",
          label: "Avg. Quiz Score",
          value: 85,
          icon: "LineChart",
          color: "orange",
          increase: 2,
          description: "Increase from last week",
          trend: "up",
          change: 2,
          unit: "%"
        },
      ];
    } else if (userType === "employee") {
      mockKpis = [
        {
          id: "kpi-1",
          label: "Projects Completed",
          value: 15,
          icon: "FileText",
          color: "blue",
          increase: 7,
          description: "Increase from last month",
          trend: "up",
          change: 7
        },
        {
          id: "kpi-2",
          label: "Tasks Finished",
          value: 120,
          icon: "CheckSquare",
          color: "green",
          increase: 30,
          description: "Increase from last month",
          trend: "up",
          change: 30
        },
      ];
    } else if (userType === "doctor") {
      mockKpis = [
        {
          id: "kpi-1",
          label: "Patients Treated",
          value: 500,
          icon: "Users",
          color: "blue",
          increase: 50,
          description: "Increase from last month",
          trend: "up",
          change: 50
        },
        {
          id: "kpi-2",
          label: "Surgeries Performed",
          value: 30,
          icon: "Heart",
          color: "green",
          increase: 5,
          description: "Increase from last month",
          trend: "up",
          change: 5
        },
      ];
    } else if (userType === "founder") {
      mockKpis = [
        {
          id: "kpi-1",
          label: "New Users",
          value: 1000,
          icon: "Users",
          color: "blue",
          increase: 200,
          description: "Increase from last month",
          trend: "up",
          change: 200
        },
        {
          id: "kpi-2",
          label: "Revenue",
          value: 50000,
          icon: "TrendingUp",
          color: "green",
          increase: 10000,
          description: "Increase from last month",
          trend: "up",
          change: 20,
          unit: "₹"
        },
      ];
    }

    setKpis(mockKpis);

    // Mock Nudges data
    let mockNudges: NudgeData[] = [];
    if (userType === "student") {
      mockNudges = [
        {
          id: "nudge-1",
          title: "Complete your profile",
          description: "Add a profile picture and bio to personalize your account.",
          message: "Add a profile picture and bio to personalize your account.",
          cta: "Edit Profile",
          isRead: false,
          read: false,
          type: "reminder",
          actionLabel: "Edit Profile",
          actionUrl: "/profile"
        },
        {
          id: "nudge-2",
          title: "Start a new study plan",
          description: "Create a study plan to stay organized and achieve your goals.",
          message: "Create a study plan to stay organized and achieve your goals.",
          cta: "Create Plan",
          isRead: false,
          read: false,
          type: "suggestion",
          actionLabel: "Create Plan",
          actionUrl: "/study-plan"
        },
      ];
    } else if (userType === "employee") {
      mockNudges = [
        {
          id: "nudge-1",
          title: "Submit your timesheet",
          description: "Your timesheet is due this Friday.",
          message: "Your timesheet is due this Friday.",
          cta: "Submit Now",
          isRead: false,
          read: false,
          type: "reminder",
          actionLabel: "Submit Now",
          actionUrl: "/timesheet"
        },
        {
          id: "nudge-2",
          title: "Attend the team meeting",
          description: "Don't forget to attend the team meeting tomorrow at 10 AM.",
          message: "Don't forget to attend the team meeting tomorrow at 10 AM.",
          cta: "View Details",
          isRead: false,
          read: false,
          type: "reminder",
          actionLabel: "View Details",
          actionUrl: "/meetings"
        },
      ];
    } else if (userType === "doctor") {
      mockNudges = [
        {
          id: "nudge-1",
          title: "Review patient files",
          description: "Review the files of your patients for tomorrow's appointments.",
          message: "Review the files of your patients for tomorrow's appointments.",
          cta: "View Files",
          isRead: false,
          read: false,
          type: "reminder",
          actionLabel: "View Files",
          actionUrl: "/patients"
        },
        {
          id: "nudge-2",
          title: "Attend the medical conference",
          description: "Don't forget to attend the medical conference next week.",
          message: "Don't forget to attend the medical conference next week.",
          cta: "View Details",
          isRead: false,
          read: false,
          type: "reminder",
          actionLabel: "View Details",
          actionUrl: "/conferences"
        },
      ];
    } else if (userType === "founder") {
      mockNudges = [
        {
          id: "nudge-1",
          title: "Review financial reports",
          description: "Review the financial reports for the last quarter.",
          message: "Review the financial reports for the last quarter.",
          cta: "View Reports",
          isRead: false,
          read: false,
          type: "reminder",
          actionLabel: "View Reports",
          actionUrl: "/reports"
        },
        {
          id: "nudge-2",
          title: "Schedule a meeting with investors",
          description: "Schedule a meeting with potential investors.",
          message: "Schedule a meeting with potential investors.",
          cta: "Schedule Meeting",
          isRead: false,
          read: false,
          type: "suggestion",
          actionLabel: "Schedule Meeting",
          actionUrl: "/meetings"
        },
      ];
    }
    setNudges(mockNudges);
  }, [userType]);

  const markNudgeAsRead = (id: string) => {
    setNudges((prevNudges) =>
      prevNudges.map((nudge) =>
        nudge.id === id ? { ...nudge, isRead: true, read: true } : nudge
      )
    );
  };

  return { kpis, nudges, markNudgeAsRead };
}
