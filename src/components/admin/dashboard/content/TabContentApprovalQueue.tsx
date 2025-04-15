
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Eye } from "lucide-react";

interface TabContentApprovalQueueProps {
  handleContentAction: (action: string, title: string) => void;
}

const TabContentApprovalQueue = ({ handleContentAction }: TabContentApprovalQueueProps) => {
  const pendingContent = [
    {
      id: "1",
      title: "Physics Dynamics Chapter Concept Cards",
      type: "concept",
      subject: "Physics",
      examGoal: "JEE",
      submittedBy: "AI Generator",
      dateSubmitted: "2025-04-10",
      status: "pending"
    },
    {
      id: "2",
      title: "Chemical Bonding Flashcard Deck",
      type: "flashcard",
      subject: "Chemistry",
      examGoal: "NEET",
      submittedBy: "Prof. Sharma",
      dateSubmitted: "2025-04-11",
      status: "pending"
    },
    {
      id: "3",
      title: "Thermodynamics Practice Test",
      type: "exam",
      subject: "Physics",
      examGoal: "JEE Advanced",
      submittedBy: "AI Generator",
      dateSubmitted: "2025-04-12",
      status: "pending"
    },
    {
      id: "4",
      title: "Organic Chemistry Study Guide",
      type: "notes",
      subject: "Chemistry",
      examGoal: "JEE",
      submittedBy: "Dr. Patel",
      dateSubmitted: "2025-04-13",
      status: "pending"
    },
    {
      id: "5",
      title: "Integration Problems Collection",
      type: "question_bank",
      subject: "Mathematics",
      examGoal: "JEE Advanced",
      submittedBy: "AI Generator",
      dateSubmitted: "2025-04-14",
      status: "pending"
    }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Content Pending Approval</h3>
        <div>
          <Button variant="outline" size="sm" className="text-xs h-8">
            Approve All
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Exam Goal</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingContent.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="font-medium">{content.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {content.type.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{content.subject}</TableCell>
                <TableCell>{content.examGoal}</TableCell>
                <TableCell>{content.submittedBy}</TableCell>
                <TableCell className="text-gray-500 text-sm">{content.dateSubmitted}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 p-0 w-8"
                      onClick={() => handleContentAction("View", content.title)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 p-0 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
                      onClick={() => handleContentAction("Approve", content.title)}
                    >
                      <CheckCircle2 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 p-0 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                      onClick={() => handleContentAction("Reject", content.title)}
                    >
                      <XCircle size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TabContentApprovalQueue;
