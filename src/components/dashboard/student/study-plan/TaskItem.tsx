
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubjectTask } from "@/types/user/base";

interface TaskItemProps {
  task: SubjectTask;
}

export const TaskItem = ({ task }: TaskItemProps) => (
  <div className="flex items-center gap-3 py-2">
    {task.status === "completed" ? (
      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
    ) : task.status === "in-progress" ? (
      <Circle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
    ) : (
      <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
    )}
    <div className="flex-1">
      <p className={cn(
        "text-sm font-medium",
        task.status === "completed" ? "text-gray-600 dark:text-gray-300" : "text-gray-900 dark:text-gray-100"
      )}>
        {task.title}
      </p>
      {task.details && (
        <p className="text-xs text-gray-500">
          {task.details.questionCount} Questions · ⏱ {task.details.duration} mins
        </p>
      )}
    </div>
  </div>
);
