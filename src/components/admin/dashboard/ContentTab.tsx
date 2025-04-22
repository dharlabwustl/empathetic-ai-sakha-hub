
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminDashboardStats } from "@/types/admin";

interface ContentTabProps {
  stats: AdminDashboardStats | null;
}

const ContentTab = ({ stats }: ContentTabProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <h3 className="text-xl font-bold">{stats?.totalConcepts ? stats.totalConcepts.value : 0}</h3>
                <p className="text-sm text-gray-500">Concept Cards</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <h3 className="text-xl font-bold">{stats?.totalFlashcards ? stats.totalFlashcards.value : 0}</h3>
                <p className="text-sm text-gray-500">Flashcards</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <h3 className="text-xl font-bold">{stats?.totalQuestions ? stats.totalQuestions.value : 0}</h3>
                <p className="text-sm text-gray-500">Practice Questions</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <h3 className="text-xl font-bold">{Math.floor(Math.random() * 100) + 50}</h3>
                <p className="text-sm text-gray-500">Full Exams</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-6">
              Manage Content
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Generation Stats (Last 7 days)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">AI Generated:</span>
                      <span className="font-bold">1,245</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Approved:</span>
                      <span className="font-bold">967</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Pending Review:</span>
                      <span className="font-bold">85</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rejected:</span>
                      <span className="font-bold">193</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">Review Pending</Button>
                <Button variant="default" size="sm">Generate New</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>GPT Prompt Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Active Prompt Templates</h3>
              <div className="space-y-3">
                <div className="bg-primary/10 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Concept Card Creator</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    Create a concept card for {"{topic}"} targeted at {"{exam_type}"} students...
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Flashcard Generator</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    Create a set of flashcards about {"{topic}"} with {"{difficulty_level}"}...
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Question Builder</span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Needs Review</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    Create a multiple-choice question about {"{topic}"} that tests {"{concept}"}...
                  </p>
                </div>
              </div>
            </div>
            <Button variant="default">Edit Prompt Templates</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;
