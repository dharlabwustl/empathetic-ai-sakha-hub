
export interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "critical";
  source: string;
  message: string;
  details?: string;
  resolved?: boolean;
  assignedTo?: string;
}
