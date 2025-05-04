
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { StudyGroup } from '@/types/studyGroup';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  UserPlus 
} from 'lucide-react';

interface StudyGroupsListProps {
  groups: StudyGroup[];
  loading: boolean;
  emptyMessage: string;
  onSelect: (groupId: string) => void;
  isUserMember: boolean;
  onJoin?: (groupId: string) => void;
}

const StudyGroupsList: React.FC<StudyGroupsListProps> = ({
  groups,
  loading,
  emptyMessage,
  onSelect,
  isUserMember,
  onJoin
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <Users size={48} strokeWidth={1.5} />
        </div>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No groups found</h3>
        <p className="mt-1 text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => (
        <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div 
              className="h-32 bg-cover bg-center bg-gradient-to-r from-blue-500 to-indigo-700"
              style={{ backgroundImage: group.coverImage ? `url(${group.coverImage})` : 'none' }}
            >
              <div className="h-full w-full bg-black/40 p-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <Badge variant="secondary" className="bg-white text-gray-800">
                    {group.subject}
                  </Badge>
                  <Badge variant={group.isActive ? "default" : "outline"} className={group.isActive ? "bg-green-500" : ""}>
                    {group.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg text-white">{group.name}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="ml-1 text-sm text-gray-500">{group.members?.length || 0} members</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="ml-1 text-sm text-gray-500">{group.meetingFrequency}</span>
                </div>
              </div>
              
              {group.tags && group.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {group.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="mt-4">
                <div className="flex -space-x-2 overflow-hidden">
                  {group.members?.slice(0, 3).map((member, i) => (
                    <Avatar key={i} className="border-2 border-white h-6 w-6">
                      <img src={member.avatar} alt={member.name} />
                    </Avatar>
                  ))}
                  {(group.members?.length || 0) > 3 && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs font-medium text-gray-600 border-2 border-white">
                      +{(group.members?.length || 0) - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onSelect(group.id)}
              className="text-sm flex items-center"
            >
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            
            {!isUserMember && onJoin && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onJoin(group.id);
                }}
                className="text-sm flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Join
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StudyGroupsList;
