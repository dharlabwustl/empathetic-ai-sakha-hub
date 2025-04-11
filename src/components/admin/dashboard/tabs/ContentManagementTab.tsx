
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, 
  Book, 
  FileCode, 
  Upload, 
  Check, 
  X, 
  Edit, 
  Plus, 
  Search, 
  Filter 
} from "lucide-react";
import { Input } from "@/components/ui/input";

const ContentManagementTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management System (CMS)</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload size={16} />
            <span>Upload</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Create Content</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content & Knowledge Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Concept Cards</span>
                <Badge>238</Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Auto-generated topic concepts</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Route: /api/content/conceptcard</span>
                <Button variant="ghost" size="sm" className="h-7">Manage</Button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Flashcards</span>
                <Badge>1,546</Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Auto-generated topic flashcards</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Route: /api/content/flashcard</span>
                <Button variant="ghost" size="sm" className="h-7">Manage</Button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Exam Papers</span>
                <Badge>42</Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Based on past pattern & syllabus</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Route: /api/content/exam</span>
                <Button variant="ghost" size="sm" className="h-7">Manage</Button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Study Materials</span>
                <Badge>89</Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">View + tag uploaded resources</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Route: /api/content/library</span>
                <Button variant="ghost" size="sm" className="h-7">Manage</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-4">
            <h3 className="font-medium">Content Approval Queue</h3>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search content..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      type: 'concept', 
                      title: 'Newton\'s Laws of Motion', 
                      subject: 'Physics', 
                      date: new Date(2023, 5, 12), 
                      status: 'pending' 
                    },
                    { 
                      type: 'flashcard', 
                      title: 'Periodic Table Elements', 
                      subject: 'Chemistry', 
                      date: new Date(2023, 5, 14), 
                      status: 'approved' 
                    },
                    { 
                      type: 'exam', 
                      title: 'Practice Test: Calculus', 
                      subject: 'Mathematics', 
                      date: new Date(2023, 5, 15), 
                      status: 'pending' 
                    },
                    { 
                      type: 'concept', 
                      title: 'Cellular Respiration', 
                      subject: 'Biology', 
                      date: new Date(2023, 5, 16), 
                      status: 'rejected' 
                    },
                  ].map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.type === 'concept' && <Book size={16} className="text-blue-500" />}
                          {item.type === 'flashcard' && <FileText size={16} className="text-green-500" />}
                          {item.type === 'exam' && <FileCode size={16} className="text-amber-500" />}
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>{item.date.toLocaleDateString()}</TableCell>
                      <TableCell>
                        {item.status === 'approved' && (
                          <Badge className="bg-green-100 text-green-800">Approved</Badge>
                        )}
                        {item.status === 'pending' && (
                          <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                        )}
                        {item.status === 'rejected' && (
                          <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit size={14} />
                          </Button>
                          {item.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                <Check size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                <X size={14} />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">GPT Prompt Tuner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage base prompts for GPT-based content generation and responses
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border p-3 rounded-md">
                <h3 className="text-sm font-medium mb-1">Concept Card Creator</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  Create a concept card for {"{topic}"} targeted at {"{exam_type}"} students...
                </p>
                <Button variant="outline" size="sm" className="mt-2">Edit Prompt</Button>
              </div>
              <div className="border p-3 rounded-md">
                <h3 className="text-sm font-medium mb-1">Flashcard Generator</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  Create a set of flashcards about {"{topic}"} with {"{difficulty_level}"}...
                </p>
                <Button variant="outline" size="sm" className="mt-2">Edit Prompt</Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Manage All Prompts</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementTab;
