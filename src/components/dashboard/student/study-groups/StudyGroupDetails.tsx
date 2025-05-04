
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  Star, 
  Award,
  LogOut,
  Shield 
} from 'lucide-react';
import { useStudyGroups } from './hooks/useStudyGroups';
import SharedNotes from './features/SharedNotes';
import GroupDiscussion from './features/GroupDiscussion';
import PeerReviews from './features/PeerReviews';
import DailyGroupChallenges from './features/DailyGroupChallenges';

interface StudyGroupDetailsProps {
  groupId: string;
  onBack: () => void;
  onLeave: () => void;
}

const StudyGroupDetails: React.FC<StudyGroupDetailsProps> = ({ 
  groupId, 
  onBack,
  onLeave 
}) => {
  const [activeTab, setActiveTab] = useState('discussions');
  const { getGroupById, loading } = useStudyGroups();
  const [group, setGroup] = useState<any>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      const groupData = await getGroupById(groupId);
      setGroup(groupData);
    };
    
    fetchGroup();
  }, [groupId, getGroupById]);

  if (loading || !group) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isUserAdmin = group.adminId === 'current-user-id'; // Replace with actual user ID check

  return (
    <div>
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Groups
        </Button>
      </div>

      <div className="relative mb-6">
        <div 
          className="h-40 md:h-60 rounded-t-lg bg-cover bg-center bg-gradient-to-r from-blue-500 to-indigo-700"
          style={{ backgroundImage: group.coverImage ? `url(${group.coverImage})` : 'none' }}
        >
          <div className="h-full w-full bg-black/40 p-6 flex flex-col justify-end">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="bg-white text-gray-800">
                {group.subject}
              </Badge>
              {isUserAdmin && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Admin
                </Badge>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{group.name}</h1>
          </div>
        </div>
        
        <div className="absolute right-4 -bottom-4">
          <Button 
            variant="destructive" 
            size="sm"
            onClick={onLeave}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            Leave Group
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {group.members?.map((member: any) => (
                <div key={member.id} className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role || 'Member'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Meeting frequency: {group.meetingFrequency}</p>
            {group.nextMeeting && (
              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                <p className="font-medium">Next meeting:</p>
                <p>{new Date(group.nextMeeting).toLocaleString()}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Study Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{group.studyPlan?.title || 'No study plan linked'}</p>
            {group.studyPlan && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${group.studyPlan.progress || 0}%` }}
                  />
                </div>
                <p className="text-xs text-right mt-1">{group.studyPlan.progress || 0}%</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">{group.description}</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab as any} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="discussions" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">Discussions</span>
          </TabsTrigger>
          <TabsTrigger value="shared-notes" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Shared Notes</span>
          </TabsTrigger>
          <TabsTrigger value="peer-reviews" className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span className="hidden md:inline">Peer Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span className="hidden md:inline">Challenges</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions">
          <GroupDiscussion groupId={groupId} />
        </TabsContent>
        
        <TabsContent value="shared-notes">
          <SharedNotes groupId={groupId} />
        </TabsContent>
        
        <TabsContent value="peer-reviews">
          <PeerReviews groupId={groupId} />
        </TabsContent>
        
        <TabsContent value="challenges">
          <DailyGroupChallenges groupId={groupId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyGroupDetails;
