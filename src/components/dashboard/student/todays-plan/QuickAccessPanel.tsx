
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, BookOpen, FileText, Clock } from "lucide-react";

const QuickAccessPanel: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Quick Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link to="/dashboard/student/concepts" className="block">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Book className="mr-2 h-4 w-4" />
            All Concepts
          </Button>
        </Link>
        <Link to="/dashboard/student/flashcards" className="block">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            All Flashcards
          </Button>
        </Link>
        <Link to="/dashboard/student/practice-exam" className="block">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            All Practice Tests
          </Button>
        </Link>
        <Link to="/dashboard/student/today?view=backlog" className="block">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            My Backlogs
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuickAccessPanel;
