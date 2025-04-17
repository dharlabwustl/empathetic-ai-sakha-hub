
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, Calendar } from "lucide-react";

interface CommunityTabProps {
  userProfile: UserProfileType;
}

const CommunityTab: React.FC<CommunityTabProps> = ({ userProfile }) => {
  const discussions = [
    { id: 1, title: "Help with calculus integration problem", replies: 5, author: "Alex S.", time: "2 hours ago" },
    { id: 2, title: "Physics experiment ideas for project", replies: 12, author: "Priya M.", time: "Yesterday" },
    { id: 3, title: "Study group for upcoming chemistry exam?", replies: 8, author: "Sam T.", time: "2 days ago" }
  ];

  const events = [
    { id: 1, title: "Physics Problem Solving Workshop", date: "Tomorrow, 5:00 PM", attendees: 18 },
    { id: 2, title: "Biology Study Group Session", date: "Friday, 4:30 PM", attendees: 12 },
    { id: 3, title: "Chemistry Lab Preparation", date: "Next Monday, 3:00 PM", attendees: 9 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Student Community</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Recent Discussions
                </CardTitle>
                <button className="text-sm text-blue-600">New Post</button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discussions.map(discussion => (
                  <div key={discussion.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium">{discussion.title}</h3>
                    <div className="flex justify-between mt-2 text-sm">
                      <div className="text-muted-foreground">
                        Posted by {discussion.author} • {discussion.time}
                      </div>
                      <div>
                        {discussion.replies} {discussion.replies === 1 ? 'reply' : 'replies'}
                      </div>
                    </div>
                    <button className="mt-2 text-sm text-blue-600">View Discussion</button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Your Study Buddies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['Alex', 'Maya', 'Raj', 'Taylor'].map((name, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                      {name.charAt(0)}
                    </div>
                    <span className="text-xs mt-1">{name}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm">
                Find More Study Buddies
              </button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events.map(event => (
                  <div key={event.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <h3 className="text-sm font-medium">{event.title}</h3>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                    <div className="flex justify-between mt-2 text-xs">
                      <span>{event.attendees} attending</span>
                      <button className="text-blue-600">Join</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;
