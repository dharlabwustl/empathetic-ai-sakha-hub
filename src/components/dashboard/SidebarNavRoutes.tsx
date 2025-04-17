import {
  Book,
  BookOpen,
  Crown,
  FileText,
  Layers,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: JSX.Element;
  submenu?: boolean;
  subItems?: NavItem[];
  onClick?: () => void;
};

export const studentNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/student",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Profile",
    href: "/dashboard/student/profile",
    icon: <User size={18} />,
  },
  {
    title: "Resources",
    href: "/dashboard/student/resources",
    icon: <BookOpen size={18} />,
  },
  {
    title: "Practice",
    href: "/dashboard/student/practice",
    icon: <FileText size={18} />,
  },
  {
    title: "Progress",
    href: "/dashboard/student/progress",
    icon: <LineChart size={18} />,
  },
  {
    title: "Concepts",
    href: "/dashboard/student/concepts",
    icon: <Layers size={18} />,
  },
  {
    title: "Study Groups",
    href: "/dashboard/student/study-groups",
    icon: <Users size={18} />,
  },
  {
    title: "AI Tutor",
    href: "/dashboard/student/tutor",
    icon: <MessageSquare size={18} />,
  },
  {
    title: "Settings",
    href: "/dashboard/student/settings",
    icon: <Settings size={18} />,
  },
];

export const employeeNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/employee",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Profile",
    href: "/dashboard/employee/profile",
    icon: <User size={18} />,
  },
  {
    title: "Learning Paths",
    href: "/dashboard/employee/learning-paths",
    icon: <Book size={18} />,
  },
  {
    title: "Skills Assessment",
    href: "/dashboard/employee/skills",
    icon: <FileText size={18} />,
  },
  {
    title: "Progress",
    href: "/dashboard/employee/progress",
    icon: <LineChart size={18} />,
  },
  {
    title: "Career Development",
    href: "/dashboard/employee/career",
    icon: <Layers size={18} />,
  },
  {
    title: "Mentorship",
    href: "/dashboard/employee/mentorship",
    icon: <Users size={18} />,
  },
  {
    title: "Settings",
    href: "/dashboard/employee/settings",
    icon: <Settings size={18} />,
  },
];

export const founderNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/founder",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Profile",
    href: "/dashboard/founder/profile",
    icon: <User size={18} />,
  },
  {
    title: "Startup Roadmap",
    href: "/dashboard/founder/roadmap",
    icon: <Book size={18} />,
  },
  {
    title: "Pitch Deck",
    href: "/dashboard/founder/pitch-deck",
    icon: <FileText size={18} />,
  },
  {
    title: "Metrics",
    href: "/dashboard/founder/metrics",
    icon: <LineChart size={18} />,
  },
  {
    title: "Fundraising",
    href: "/dashboard/founder/fundraising",
    icon: <Crown size={18} />,
  },
  {
    title: "Mentorship",
    href: "/dashboard/founder/mentorship",
    icon: <Users size={18} />,
  },
  {
    title: "Settings",
    href: "/dashboard/founder/settings",
    icon: <Settings size={18} />,
  },
];

export const doctorNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/doctor",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Profile",
    href: "/dashboard/doctor/profile",
    icon: <User size={18} />,
  },
  {
    title: "Medical Resources",
    href: "/dashboard/doctor/resources",
    icon: <Book size={18} />,
  },
  {
    title: "CME Courses",
    href: "/dashboard/doctor/cme",
    icon: <FileText size={18} />,
  },
  {
    title: "Clinical Updates",
    href: "/dashboard/doctor/updates",
    icon: <LineChart size={18} />,
  },
  {
    title: "Research",
    href: "/dashboard/doctor/research",
    icon: <Layers size={18} />,
  },
  {
    title: "Peer Network",
    href: "/dashboard/doctor/network",
    icon: <Users size={18} />,
  },
  {
    title: "Settings",
    href: "/dashboard/doctor/settings",
    icon: <Settings size={18} />,
  },
];

export const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "User Management",
    href: "/dashboard/admin/users",
    icon: <Users size={18} />,
  },
  {
    title: "Content Management",
    href: "/dashboard/admin/content",
    icon: <Book size={18} />,
  },
  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: <LineChart size={18} />,
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: <Settings size={18} />,
  },
];
