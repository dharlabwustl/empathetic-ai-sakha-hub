
import { useState } from "react";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
  action?: React.ReactNode;
}

export const toast = ({ title, description, variant = "default", duration = 3000 }: Omit<Toast, "id">) => {
  // This is just a stub for the exported toast function
  console.log("Toast:", title, description, variant, duration);
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({
    title,
    description,
    variant = "default",
    duration = 5000,
    action
  }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant, duration, action }]);
    
    // Auto dismiss after specified duration
    setTimeout(() => {
      dismiss(id);
    }, duration);
    
    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return {
    toast,
    dismiss,
    toasts,
  };
}
