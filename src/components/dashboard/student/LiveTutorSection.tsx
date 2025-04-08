
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Clock, DollarSign, Star, Calendar, Tag, BookOpen } from "lucide-react";

interface Tutor {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  rating: number;
  hourlyRate: number;
  availability: string[];
  subjects: string[];
}

const mockTutors: Tutor[] = [
  {
    id: "t1",
    name: "Dr. Priya Sharma",
    avatar: "/lovable-uploads/2a3b330c-09e1-40bd-b9bd-85ecb5cc394a.png",
    expertise: ["Physics", "Mathematics", "JEE Preparation"],
    rating: 4.8,
    hourlyRate: 1200,
    availability: ["Mon 4-6 PM", "Wed 5-8 PM", "Sat 10 AM-1 PM"],
    subjects: ["Physics", "Mathematics"]
  },
  {
    id: "t2",
    name: "Rajesh Verma",
    avatar: "/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png",
    expertise: ["Chemistry", "Biology", "NEET Preparation"],
    rating: 4.7,
    hourlyRate: 1000,
    availability: ["Tue 5-8 PM", "Thu 6-9 PM", "Sun 10 AM-1 PM"],
    subjects: ["Chemistry", "Biology"]
  },
  {
    id: "t3",
    name: "Arjun Kapoor",
    avatar: "/lovable-uploads/26a404be-3145-4a01-9204-8e74a5984c36.png",
    expertise: ["History", "Geography", "UPSC Preparation"],
    rating: 4.9,
    hourlyRate: 1500,
    availability: ["Wed 4-7 PM", "Fri 5-8 PM", "Sun 2-5 PM"],
    subjects: ["History", "Geography", "Political Science"]
  }
];

const LiveTutorSection = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showQueryForm, setShowQueryForm] = useState<boolean>(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const filteredTutors = mockTutors.filter(tutor => {
    if (selectedSubject && !tutor.subjects.includes(selectedSubject)) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return tutor.name.toLowerCase().includes(query) || 
        tutor.expertise.some(exp => exp.toLowerCase().includes(query));
    }
    return true;
  });

  const handleCreateQuery = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setShowQueryForm(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Connect with Live Tutors</h2>
          <p className="text-muted-foreground">
            Get personalized help from expert tutors in your subject area.
            <Badge variant="premium" className="ml-2">Premium</Badge>
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Video size={16} />
          View Past Sessions
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Search by name or expertise..."
          className="w-full md:flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Subjects</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Biology">Biology</SelectItem>
            <SelectItem value="History">History</SelectItem>
            <SelectItem value="Geography">Geography</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!showQueryForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <Card key={tutor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-violet-200">
                    <AvatarImage src={tutor.avatar} alt={tutor.name} />
                    <AvatarFallback>{tutor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{tutor.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{tutor.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-violet-500" />
                  <div>
                    <strong>Expertise:</strong> {tutor.expertise.join(", ")}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-violet-500" />
                  <div>
                    <strong>Available:</strong> {tutor.availability.join(", ")}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-violet-500" />
                  <div>
                    <strong>Rate:</strong> ₹{tutor.hourlyRate}/hour
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                  onClick={() => handleCreateQuery(tutor)}
                >
                  Book Session
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create Query for {selectedTutor?.name}</CardTitle>
            <CardDescription>Fill in details about your study query</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTutor?.subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Input placeholder="Topic (e.g. Thermodynamics, Integration)" />
              </div>

              <div className="space-y-2">
                <Input placeholder="Specific concept (e.g. First Law, Partial Integration)" />
              </div>

              <div className="space-y-2">
                <Textarea 
                  placeholder="Describe your question or problem in detail..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Select date and time</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTutor?.availability.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes (₹{selectedTutor ? selectedTutor.hourlyRate / 2 : 0})</SelectItem>
                      <SelectItem value="60">1 hour (₹{selectedTutor?.hourlyRate})</SelectItem>
                      <SelectItem value="90">1.5 hours (₹{selectedTutor ? selectedTutor.hourlyRate * 1.5 : 0})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowQueryForm(false)}>Back</Button>
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
              Pay & Schedule Session
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Upcoming Sessions</h3>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">No upcoming sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You don't have any scheduled sessions with tutors yet.
              Book a session above to get started!
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Previous Sessions</h3>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">No previous sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your past tutoring sessions will appear here for review.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveTutorSection;
