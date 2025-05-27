
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  TrendingUp, 
  Star,
  BookOpen,
  Trophy,
  Target,
  Clock,
  UserPlus,
  Settings
} from 'lucide-react';

interface Influence {
  id: string;
  name: string;
  type: 'family' | 'friend' | 'mentor' | 'study_group';
  avatar?: string;
  relationship: string;
  supportLevel: number;
  impact: 'positive' | 'neutral' | 'negative';
  lastInteraction: string;
  studyTogether: boolean;
  encouragementCount: number;
}

interface StudyGroup {
  id: string;
  name: string;
  members: number;
  subject: string;
  meetingFrequency: string;
  nextMeeting: string;
  performance: number;
  role: 'member' | 'leader' | 'moderator';
}

const SurroundingInfluencesSection: React.FC = () => {
  const [influences] = useState<Influence[]>([
    {
      id: '1',
      name: 'Mom',
      type: 'family',
      avatar: '/avatars/mom.jpg',
      relationship: 'Mother',
      supportLevel: 95,
      impact: 'positive',
      lastInteraction: '2 hours ago',
      studyTogether: false,
      encouragementCount: 24
    },
    {
      id: '2', 
      name: 'Sarah',
      type: 'friend',
      avatar: '/avatars/sarah.jpg',
      relationship: 'Best Friend',
      supportLevel: 88,
      impact: 'positive',
      lastInteraction: '1 day ago',
      studyTogether: true,
      encouragementCount: 18
    },
    {
      id: '3',
      name: 'Dr. Kumar',
      type: 'mentor',
      avatar: '/avatars/kumar.jpg', 
      relationship: 'Physics Tutor',
      supportLevel: 92,
      impact: 'positive',
      lastInteraction: '3 days ago',
      studyTogether: false,
      encouragementCount: 31
    }
  ]);

  const [studyGroups] = useState<StudyGroup[]>([
    {
      id: '1',
      name: 'NEET Achievers',
      members: 12,
      subject: 'All Subjects',
      meetingFrequency: 'Daily',
      nextMeeting: 'Today 7 PM',
      performance: 85,
      role: 'member'
    },
    {
      id: '2',
      name: 'Physics Masters',
      members: 8,
      subject: 'Physics',
      meetingFrequency: 'Alternate Days',
      nextMeeting: 'Tomorrow 6 PM', 
      performance: 78,
      role: 'leader'
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'family': return <Heart className="h-4 w-4" />;
      case 'friend': return <Users className="h-4 w-4" />;
      case 'mentor': return <Star className="h-4 w-4" />;
      case 'study_group': return <BookOpen className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'leader': return 'text-purple-600 bg-purple-100';
      case 'moderator': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Support Network Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Your Support Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">{influences.length}</div>
              <div className="text-sm text-gray-600">Support Contacts</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">{studyGroups.length}</div>
              <div className="text-sm text-gray-600">Study Groups</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-green-100">
              <div className="text-2xl font-bold text-green-600">
                {influences.reduce((sum, inf) => sum + inf.encouragementCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Encouragements</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-yellow-100">
              <div className="text-2xl font-bold text-yellow-600">
                {Math.round(influences.reduce((sum, inf) => sum + inf.supportLevel, 0) / influences.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg Support</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Network Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Support Network</CardTitle>
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {influences.map((influence) => (
              <div key={influence.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={influence.avatar} />
                    <AvatarFallback>{influence.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{influence.name}</h4>
                      {getTypeIcon(influence.type)}
                      <Badge variant="outline" className={getImpactColor(influence.impact)}>
                        {influence.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{influence.relationship}</p>
                    <p className="text-xs text-gray-500">Last contact: {influence.lastInteraction}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Support Level</span>
                    <span className="text-sm text-blue-600">{influence.supportLevel}%</span>
                  </div>
                  <Progress value={influence.supportLevel} className="w-24 h-2" />
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Heart className="h-3 w-3" />
                    <span>{influence.encouragementCount} encouragements</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Groups */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Study Groups</CardTitle>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Join Group
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {studyGroups.map((group) => (
              <Card key={group.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{group.name}</h4>
                      <p className="text-sm text-gray-600">{group.subject}</p>
                    </div>
                    <Badge variant="outline" className={getRoleColor(group.role)}>
                      {group.role}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Members:</span>
                      <span className="font-medium">{group.members}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Meets:</span>
                      <span className="font-medium">{group.meetingFrequency}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next Meeting:</span>
                      <span className="font-medium text-blue-600">{group.nextMeeting}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Group Performance</span>
                      <span className="font-medium">{group.performance}%</span>
                    </div>
                    <Progress value={group.performance} className="h-2" />
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-4 w-4 mr-1" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurroundingInfluencesSection;
