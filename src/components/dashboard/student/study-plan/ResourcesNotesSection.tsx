
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Video, FileText, HelpCircle, Star, Search } from "lucide-react";

const ResourcesNotesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState("");

  const dailyMaterials = [
    { type: "Video", title: "Newton's Laws Explained", subject: "Physics", duration: "15 min", link: "#" },
    { type: "PDF", title: "Organic Chemistry Notes", subject: "Chemistry", pages: 12, link: "#" },
    { type: "Video", title: "Cell Division Process", subject: "Biology", duration: "20 min", link: "#" }
  ];

  const topicNotes = [
    { topic: "Thermodynamics", subject: "Physics", notes: "Energy transfer, entropy concepts...", date: "2024-01-10", bookmarked: true },
    { topic: "Atomic Structure", subject: "Chemistry", notes: "Electron configuration, orbital theory...", date: "2024-01-12", bookmarked: false },
    { topic: "Photosynthesis", subject: "Biology", notes: "Light reactions, Calvin cycle...", date: "2024-01-14", bookmarked: true }
  ];

  const doubtLog = [
    { question: "Why does entropy always increase?", subject: "Physics", date: "2024-01-15", status: "Resolved" },
    { question: "Difference between SN1 and SN2 reactions", subject: "Chemistry", date: "2024-01-14", status: "Pending" },
    { question: "How do plants respire at night?", subject: "Biology", date: "2024-01-13", status: "Resolved" }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4 text-red-600" />;
      case "PDF":
        return <FileText className="h-4 w-4 text-blue-600" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Resolved" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            📚 Resources & Notes Section
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources, notes, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daily Study Material Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyMaterials.map((material, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  {getResourceIcon(material.type)}
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{material.title}</h4>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {material.subject}
                    </Badge>
                    <div className="text-sm text-gray-600 mb-3">
                      {material.duration || `${material.pages} pages`}
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Open Resource
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Topic-wise Notes Repository</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topicNotes.map((note, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{note.topic}</h4>
                  {note.bookmarked && (
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <Badge variant="outline">{note.subject}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{note.notes}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Last updated: {new Date(note.date).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-xs">
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs">
                    {note.bookmarked ? "Unbookmark" : "Bookmark"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Important/Bookmarked Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topicNotes.filter(note => note.bookmarked).map((note, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <div>
                    <div className="font-medium">{note.topic}</div>
                    <div className="text-sm text-gray-600">{note.subject}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-orange-600" />
              Doubt Log / Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {doubtLog.map((doubt, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{doubt.question}</h4>
                  <Badge className={getStatusColor(doubt.status)}>
                    {doubt.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{doubt.subject}</span>
                  <span>{new Date(doubt.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            
            <div className="mt-4 space-y-3">
              <Textarea
                placeholder="Ask a new question or log a doubt..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={2}
              />
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Add to Doubt Log
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesNotesSection;
