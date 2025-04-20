
export interface SystemLog {
  id: string;
  timestamp: string;
  source: string;
  level: "info" | "warning" | "error" | "critical";
  message: string;
  resolved?: boolean;
  details?: string;
}
