
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, User, BookOpen, Brain, Heart, Clock, 
  Target, MapPin, Calendar, Phone, Mail, Award
} from 'lucide-react';

interface StudentOnboardingData {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  examGoal: string;
  examDate: string;
  educationLevel: string;
  institute: string;
  subjects: string[];
  strongSubjects: string[];
  weakSubjects: string[];
  learningStyle: string;
  studyPace: string;
  dailyStudyHours: number;
  preferredStudyTime: string;
  personalityType: string;
  mood: string;
  interests: string[];
  signupDate: string;
  onboardingComplete: boolean;
}

const OnboardingDataViewer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentOnboardingData | null>(null);

  // Mock data - replace with actual API call
  const studentsData: StudentOnboardingData[] = [
    {
      id: "1",
      name: "Arjun Sharma",
      email: "arjun.sharma@email.com",
      phone: "+91 9876543210",
      age: 17,
      location: "Delhi",
      examGoal: "IIT-JEE Main 2025",
      examDate: "2025-01-15",
      educationLevel: "12th Grade",
      institute: "Delhi Public School",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      strongSubjects: ["Mathematics"],
      weakSubjects: ["Chemistry"],
      learningStyle: "Visual",
      studyPace: "Moderate",
      dailyStudyHours: 6,
      preferredStudyTime: "Morning",
      personalityType: "Analytical",
      mood: "Motivated",
      interests: ["Programming", "Science", "Music"],
      signupDate: "2024-01-15",
      onboardingComplete: true
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 9876543211",
      age: 16,
      location: "Mumbai",
      examGoal: "NEET 2025",
      examDate: "2025-05-05",
      educationLevel: "11th Grade",
      institute: "St. Xavier's School",
      subjects: ["Physics", "Chemistry", "Biology"],
      strongSubjects: ["Biology"],
      weakSubjects: ["Physics"],
      learningStyle: "Auditory",
      studyPace: "Fast",
      dailyStudyHours: 8,
      preferredStudyTime: "Evening",
      personalityType: "Creative",
      mood: "Confident",
      interests: ["Medicine", "Art", "Sports"],
      signupDate: "2024-02-20",
      onboardingComplete: true
    }
  ];

  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.examGoal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name, email, or exam goal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Students ({filteredStudents.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedStudent?.id === student.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.examGoal}</p>
                      </div>
                      <Badge variant={student.onboardingComplete ? "default" : "secondary"}>
                        {student.onboardingComplete ? "Complete" : "Incomplete"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Details */}
        <div className="lg:col-span-2">
          {selectedStudent ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {selectedStudent.name} - Onboarding Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="academic">Academic</TabsTrigger>
                    <TabsTrigger value="learning">Learning Style</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Age: {selectedStudent.age}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.location}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.interests.map((interest, index) => (
                          <Badge key={index} variant="outline">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="academic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.examGoal}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.examDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.educationLevel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStudent.institute}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.subjects.map((subject, index) => (
                          <Badge key={index} variant="default">{subject}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Strong Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudent.strongSubjects.map((subject, index) => (
                            <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Weak Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudent.weakSubjects.map((subject, index) => (
                            <Badge key={index} variant="default" className="bg-red-100 text-red-800">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="learning" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Style: {selectedStudent.learningStyle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Pace: {selectedStudent.studyPace}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Daily Hours: {selectedStudent.dailyStudyHours}h</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Personality: {selectedStudent.personalityType}</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preferences" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Study Time: {selectedStudent.preferredStudyTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Current Mood: {selectedStudent.mood}</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Select a student to view their onboarding data</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingDataViewer;
