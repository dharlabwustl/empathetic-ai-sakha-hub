
export interface SystemLog {
  id: string;
  event: string;
  timestamp: string;
  level: "error" | "info" | "warning" | "debug";
  message: string;
  details: Record<string, any>;
}
