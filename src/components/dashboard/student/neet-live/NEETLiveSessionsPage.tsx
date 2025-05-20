
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Live, Calendar, Clock, Users } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const NEETLiveSessionsPage = () => {
  const upcomingSessions = [
    {
      id: 'session-1',
      title: 'NEET Biology: Human Physiology Deep Dive',
      subject: 'Biology',
      date: 'Today',
      time: '4:00 PM - 5:30 PM',
      instructor: 'Dr. Rohini Sharma',
      participants: 156,
      isLive: true,
    },
    {
      id: 'session-2',
      title: 'NEET Chemistry: Organic Reactions Mastery',
      subject: 'Chemistry',
      date: 'Tomorrow',
      time: '5:00 PM - 6:30 PM',
      instructor: 'Dr. Vivek Malhotra',
      participants: 98,
      isLive: false,
    },
    {
      id: 'session-3',
      title: 'NEET Physics: Mechanics Problem Solving',
      subject: 'Physics',
      date: '23 May, 2023',
      time: '4:30 PM - 6:00 PM',
      instructor: 'Prof. Amit Verma',
      participants: 112,
      isLive: false,
    },
  ];

  return (
    <SharedPageLayout
      title="NEET Live Sessions"
      subtitle="Interactive live classes with top educators"
    >
      <div className="space-y-6">
        {/* Live banner */}
        <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-lg p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_80%)]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Live className="h-5 w-5 animate-pulse" />
                <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/30">LIVE NOW</Badge>
              </div>
              <h2 className="text-2xl font-bold mb-1">Join Today's NEET Biology Session</h2>
              <p className="text-white/80">Dr. Rohini Sharma is covering Human Physiology with practice questions</p>
            </div>
            <Button className="bg-white text-red-600 hover:bg-white/90 hover:text-red-700 font-medium">
              Join Live Class
            </Button>
          </div>
        </div>
        
        {/* Upcoming sessions */}
        <h3 className="text-xl font-semibold mb-3">Upcoming Sessions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingSessions.map((session) => (
            <Card key={session.id} className={`overflow-hidden ${session.isLive ? 'border-red-400 dark:border-red-600 border-2' : ''}`}>
              <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className={`${
                    session.subject === 'Biology' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                    session.subject === 'Chemistry' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 
                    'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}>
                    {session.subject}
                  </Badge>
                  {session.isLive && (
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                      </span>
                      LIVE
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg mt-2">{session.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    {session.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    {session.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    {session.participants} participants
                  </div>
                  <div className="pt-3">
                    <Button 
                      className={`w-full ${session.isLive ? 'bg-red-600 hover:bg-red-700' : ''}`}
                      variant={session.isLive ? "default" : "outline"}
                    >
                      {session.isLive ? 'Join Now' : 'Set Reminder'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default NEETLiveSessionsPage;
