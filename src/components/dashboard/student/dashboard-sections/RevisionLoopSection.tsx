
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Define the RevisionItem type directly here
interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'practice';
  dueDate: string;
  lastReviewed: string;
  urgency: 'high' | 'medium' | 'low';
}

const mockRevisionItems: RevisionItem[] = [
  {
    id: "1",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    type: "concept",
    dueDate: "Today",
    lastReviewed: "7 days ago",
    urgency: "high"
  },
  {
    id: "2",
    title: "Organic Chemistry Mechanisms",
    subject: "Chemistry",
    type: "flashcard",
    dueDate: "Tomorrow",
    lastReviewed: "3 days ago",
    urgency: "medium"
  },
  {
    id: "3",
    title: "Cell Division",
    subject: "Biology",
    type: "practice",
    dueDate: "In 2 days",
    lastReviewed: "5 days ago",
    urgency: "low"
  }
];

const typeIcons = {
  concept: <BookOpen className="h-4 w-4" />,
  flashcard: <CheckCircle className="h-4 w-4" />,
  practice: <Clock className="h-4 w-4" />
};

const urgencyColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200"
};

export const RevisionLoopSection = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Revision Loop</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockRevisionItems.length > 0 ? (
          <>
            <div className="text-sm text-muted-foreground mb-2">
              Based on spaced repetition science, these items need your review:
            </div>
            <div className="space-y-2">
              {mockRevisionItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-muted/40 rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-background p-2 rounded-full">
                      {typeIcons[item.type]}
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">
                          {item.subject}
                        </span>
                        <span className="bg-muted w-1 h-1 rounded-full" />
                        <span className="text-muted-foreground">
                          Last: {item.lastReviewed}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${
                        urgencyColors[item.urgency as keyof typeof urgencyColors]
                      }`}
                    >
                      Due: {item.dueDate}
                    </Badge>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/dashboard/student/concepts/card/${item.id}`}>
                        Review
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center pt-2">
              <Button variant="ghost" size="sm" className="text-primary">
                View All Due Items
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              No revision items due! You're all caught up.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
