
import { useState } from "react";
import { Calendar, Check, Circle, Clock, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface StudyTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  timeSlot: string;
  isComplete: boolean;
}

export default function StudyPlannerCard() {
  const [tasks, setTasks] = useState<StudyTask[]>([
    {
      id: "task-1",
      title: "Physics - Electromagnetism",
      description: "Chapter 7 - Complete",
      subject: "Physics",
      timeSlot: "9:00 AM - 10:30 AM",
      isComplete: true
    },
    {
      id: "task-2",
      title: "Mathematics - Integration",
      description: "Practice problems - Complete",
      subject: "Mathematics",
      timeSlot: "11:00 AM - 12:30 PM",
      isComplete: true
    },
    {
      id: "task-3",
      title: "Chemistry - Organic Chemistry",
      description: "Alkanes and Alkynes - In progress",
      subject: "Chemistry",
      timeSlot: "2:00 PM - 3:30 PM",
      isComplete: false
    },
    {
      id: "task-4",
      title: "Biology - Human Physiology",
      description: "Nervous System - Not started",
      subject: "Biology",
      timeSlot: "4:00 PM - 5:30 PM",
      isComplete: false
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    subject: "Physics",
    timeSlot: ""
  });

  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const task: StudyTask = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      subject: newTask.subject,
      timeSlot: newTask.timeSlot,
      isComplete: false
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      subject: "Physics",
      timeSlot: ""
    });

    setIsDialogOpen(false);

    toast({
      title: "Task Added",
      description: "Your study task has been added to today's plan."
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.isComplete ? "Task Reopened" : "Task Completed",
        description: task.isComplete 
          ? `"${task.title}" marked as incomplete` 
          : `Great job! You completed "${task.title}"`
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Calendar size={20} />
            <span>Today's Study Plan (May 12, 2025)</span>
          </span>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus size={16} className="mr-1" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Study Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your study plan for today.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., Physics - Wave Optics"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Select 
                    value={newTask.subject}
                    onValueChange={(value) => setNewTask({...newTask, subject: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="timeSlot" className="text-sm font-medium">
                    Time Slot
                  </label>
                  <Input
                    id="timeSlot"
                    placeholder="e.g., 3:00 PM - 4:30 PM"
                    value={newTask.timeSlot}
                    onChange={(e) => setNewTask({...newTask, timeSlot: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Add more details about the task"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-4 p-3 rounded-lg border ${
                task.isComplete
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  task.isComplete
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.isComplete ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${task.isComplete ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>{task.timeSlot}</span>
                  </div>
                </div>
                <p className={`text-sm ${task.isComplete ? "text-gray-400" : "text-gray-600"}`}>
                  {task.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
