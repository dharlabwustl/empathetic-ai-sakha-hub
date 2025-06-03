
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Video, FileText, HelpCircle, Star, Search, Filter } from 'lucide-react';

export const ResourcesNotesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Mechanics - Newton\'s Laws Video Lecture',
      type: 'video',
      subject: 'Physics',
      topic: 'Mechanics',
      isBookmarked: true,
      difficulty: 'medium'
    },
    {
      id: 2,
      title: 'Organic Chemistry Mechanisms PDF',
      type: 'pdf',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      isBookmarked: false,
      difficulty: 'hard'
    },
    {
      id: 3,
      title: 'Genetics Practice Questions',
      type: 'practice',
      subject: 'Biology',
      topic: 'Genetics',
      isBookmarked: true,
      difficulty: 'easy'
    },
    {
      id: 4,
      title: 'Thermodynamics Study Notes',
      type: 'notes',
      subject: 'Physics',
      topic: 'Thermodynamics',
      isBookmarked: false,
      difficulty: 'hard'
    }
  ];

  const importantTopics = [
    { subject: 'Physics', topic: 'Electromagnetism', priority: 'high' },
    { subject: 'Chemistry', topic: 'Chemical Bonding', priority: 'medium' },
    { subject: 'Biology', topic: 'Cell Biology', priority: 'high' }
  ];

  const doubts = [
    {
      id: 1,
      subject: 'Physics',
      topic: 'Thermodynamics',
      question: 'How does entropy change in reversible processes?',
      status: 'open',
      createdAt: '2024-06-02'
    },
    {
      id: 2,
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      question: 'Mechanism of SN1 vs SN2 reactions',
      status: 'resolved',
      createdAt: '2024-06-01'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'notes':
        return <BookOpen className="h-4 w-4" />;
      case 'practice':
        return <HelpCircle className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Resources & Notes Section
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="pdf">PDFs</SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
                <SelectItem value="practice">Practice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Daily Study Materials */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Daily Study Materials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Star className={`h-4 w-4 ${resource.isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {resource.subject}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        Open
                      </Button>
                    </div>
                    
                    <div className="text-xs text-gray-600 mt-2">
                      Topic: {resource.topic}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important/Bookmarked Topics */}
          <div className="mb-6">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Important/Bookmarked Topics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {importantTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{topic.topic}</div>
                    <div className="text-xs text-gray-600">{topic.subject}</div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={topic.priority === 'high' ? 'border-red-300 text-red-700' : 'border-yellow-300 text-yellow-700'}
                  >
                    {topic.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Doubt Log/Tracker */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Doubt Log / Tracker
            </h3>
            <div className="space-y-3">
              {doubts.map((doubt) => (
                <Card key={doubt.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{doubt.question}</div>
                        <div className="text-xs text-gray-600">
                          {doubt.subject} - {doubt.topic} • {doubt.createdAt}
                        </div>
                      </div>
                      <Badge 
                        variant={doubt.status === 'resolved' ? 'default' : 'secondary'}
                        className={doubt.status === 'resolved' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {doubt.status}
                      </Badge>
                    </div>
                    
                    {doubt.status === 'open' && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Ask Tutor
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark Resolved
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button className="mt-3" variant="outline">
              <HelpCircle className="h-4 w-4 mr-2" />
              Add New Doubt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
