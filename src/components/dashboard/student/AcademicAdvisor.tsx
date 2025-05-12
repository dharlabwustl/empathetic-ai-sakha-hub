import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  status: "pending" | "in progress" | "completed";
  priority: "low" | "medium" | "high";
}

const AcademicAdvisor: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [topicName, setTopicName] = React.useState("");
  const [topicDifficulty, setTopicDifficulty] = React.useState<"easy" | "medium" | "hard">("medium");
  const [topicPriority, setTopicPriority] = React.useState<"low" | "medium" | "high">("medium");

  const completedTopics: StudyPlanTopic[] = [
    { 
      id: "t1", 
      name: "Cells: The Unit of Life", 
      difficulty: "medium", 
      completed: true, 
      status: "completed",
      priority: "medium" // Add missing priority field
    },
    { 
      id: "t2", 
      name: "Biological Classification", 
      difficulty: "medium", 
      completed: true, 
      status: "completed",
      priority: "medium" // Add missing priority field
    },
    { 
      id: "t3", 
      name: "Molecular Biology (Advanced)", 
      difficulty: "hard", 
      completed: true, 
      status: "completed",
      priority: "high" // Add missing priority field
    }
  ];

  const upcomingTopics: StudyPlanTopic[] = [
    { id: "t4", name: "Genetics and Evolution", difficulty: "hard", completed: false, status: "pending", priority: "high" },
    { id: "t5", name: "Ecology and Environment", difficulty: "medium", completed: false, status: "pending", priority: "medium" },
  ];

  const inProgressTopics: StudyPlanTopic[] = [
    { id: "t6", name: "Human Physiology", difficulty: "medium", completed: false, status: "in progress", priority: "medium" },
  ];

  const totalTopics = completedTopics.length + upcomingTopics.length + inProgressTopics.length;
  const completionPercentage = (completedTopics.length / totalTopics) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Overview Card */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Your progress at a glance</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <span>Overall Progress</span>
            <Progress value={completionPercentage} />
            <span>{completionPercentage.toFixed(0)}%</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Completed Topics</span>
              <span>{completedTopics.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Upcoming Topics</span>
              <span>{upcomingTopics.length}</span>
            </div>
            <div className="flex justify-between">
              <span>In Progress Topics</span>
              <span>{inProgressTopics.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Card */}
      <Card className="col-span-1 md:col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <CardDescription>Plan your study sessions</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-none focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date?.toLocaleDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-none focus:outline-none"
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Add Topic Card */}
      <Card className="col-span-1 md:col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle>Add Topic</CardTitle>
          <CardDescription>Add a new topic to your study plan</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="topic-name">Topic Name</Label>
            <Input 
              type="text" 
              id="topic-name" 
              placeholder="Enter topic name" 
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="topic-difficulty">Difficulty</Label>
            <Select value={topicDifficulty} onValueChange={setTopicDifficulty}>
              <SelectTrigger id="topic-difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="topic-priority">Priority</Label>
            <Select value={topicPriority} onValueChange={setTopicPriority}>
              <SelectTrigger id="topic-priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Add Topic</Button>
        </CardContent>
      </Card>

      {/* Study Plan Table Card */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Study Plan</CardTitle>
          <CardDescription>Your current study plan</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Topic</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedTopics.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell>{topic.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{topic.difficulty}</Badge>
                  </TableCell>
                  <TableCell>{topic.priority}</TableCell>
                  <TableCell>{topic.status}</TableCell>
                </TableRow>
              ))}
              {inProgressTopics.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell>{topic.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{topic.difficulty}</Badge>
                  </TableCell>
                  <TableCell>{topic.priority}</TableCell>
                  <TableCell>{topic.status}</TableCell>
                </TableRow>
              ))}
              {upcomingTopics.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell>{topic.name}</TableCell>
                  <TableCell>
                    <Badge variant="ghost">{topic.difficulty}</Badge>
                  </TableCell>
                  <TableCell>{topic.priority}</TableCell>
                  <TableCell>{topic.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicAdvisor;
