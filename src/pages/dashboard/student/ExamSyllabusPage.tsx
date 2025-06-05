
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, CheckCircle, Clock, Target } from 'lucide-react';

const ExamSyllabusPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('physics');

  const syllabusData = {
    physics: {
      name: 'Physics',
      totalChapters: 30,
      completedChapters: 18,
      chapters: [
        { id: 1, name: 'Mechanics', status: 'completed', topics: ['Motion', 'Forces', 'Energy'] },
        { id: 2, name: 'Thermodynamics', status: 'in-progress', topics: ['Heat', 'Temperature', 'Laws'] },
        { id: 3, name: 'Optics', status: 'pending', topics: ['Reflection', 'Refraction', 'Lenses'] },
      ]
    },
    chemistry: {
      name: 'Chemistry',
      totalChapters: 28,
      completedChapters: 15,
      chapters: [
        { id: 1, name: 'Organic Chemistry', status: 'completed', topics: ['Hydrocarbons', 'Alcohols', 'Acids'] },
        { id: 2, name: 'Inorganic Chemistry', status: 'in-progress', topics: ['Metals', 'Non-metals', 'Compounds'] },
        { id: 3, name: 'Physical Chemistry', status: 'pending', topics: ['Atomic Structure', 'Bonding', 'Kinetics'] },
      ]
    },
    biology: {
      name: 'Biology',
      totalChapters: 32,
      completedChapters: 20,
      chapters: [
        { id: 1, name: 'Cell Biology', status: 'completed', topics: ['Cell Structure', 'Cell Division', 'Metabolism'] },
        { id: 2, name: 'Genetics', status: 'in-progress', topics: ['DNA', 'RNA', 'Heredity'] },
        { id: 3, name: 'Ecology', status: 'pending', topics: ['Ecosystems', 'Biodiversity', 'Conservation'] },
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <Target className="h-4 w-4 text-gray-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <SharedPageLayout
      title="Exam Syllabus"
      subtitle="Track your syllabus completion for NEET 2025"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(syllabusData).map(([key, subject]) => (
            <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedSubject(key)}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {subject.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((subject.completedChapters / subject.totalChapters) * 100)}%</span>
                  </div>
                  <Progress value={(subject.completedChapters / subject.totalChapters) * 100} />
                  <p className="text-xs text-muted-foreground">
                    {subject.completedChapters} of {subject.totalChapters} chapters completed
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Syllabus */}
        <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
          </TabsList>

          {Object.entries(syllabusData).map(([key, subject]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{subject.name} Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subject.chapters.map((chapter) => (
                      <div key={chapter.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(chapter.status)}
                            <h3 className="font-semibold">{chapter.name}</h3>
                          </div>
                          <Badge className={getStatusColor(chapter.status)}>
                            {chapter.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {chapter.topics.map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline">
                            Study Now
                          </Button>
                          <Button size="sm" variant="ghost">
                            Practice
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ExamSyllabusPage;
