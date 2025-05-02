
// This is the main toast implementation
import type {
  ToasterToast,
} from "@/components/ui/toast";

import {
  toast as toastFn,
  useToast as useToastOriginal,
} from "@/components/ui/use-toast";

export const useToast = useToastOriginal;
export const toast = toastFn;

export type { ToasterToast };
