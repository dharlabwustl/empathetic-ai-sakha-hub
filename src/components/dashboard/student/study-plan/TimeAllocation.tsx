
import { Card } from "@/components/ui/card";
import { Timer } from "lucide-react";
import { TimeAllocationItem } from "@/types/user/base";

interface TimeAllocationProps {
  timeAllocation: TimeAllocationItem[];
}

export const TimeAllocation = ({ timeAllocation }: TimeAllocationProps) => {
  const totalTime = timeAllocation.reduce((acc, curr) => acc + curr.time, 0);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-lg p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
        <Timer className="h-4 w-4 text-indigo-600" />
        Time Guidance & Allocation
      </h3>
      <div className="space-y-3">
        {timeAllocation.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">{item.task}</span>
            <span className="font-medium">{item.time} mins</span>
          </div>
        ))}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Total Time</span>
            <span>~{Math.floor(totalTime / 60)} hr {totalTime % 60} mins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
