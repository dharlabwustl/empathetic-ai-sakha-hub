
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import StudyGroupsList from '@/components/dashboard/student/study-groups/StudyGroupsList';
import StudyGroupDetails from '@/components/dashboard/student/study-groups/StudyGroupDetails';
import CreateStudyGroupForm from '@/components/dashboard/student/study-groups/CreateStudyGroupForm';
import { useStudyGroups } from '@/components/dashboard/student/study-groups/hooks/useStudyGroups';

const StudyGroupsPage = () => {
  const [activeTab, setActiveTab] = useState('my-groups');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { 
    loading, 
    userGroups, 
    availableGroups, 
    joinGroup,
    leaveGroup
  } = useStudyGroups();

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroupId(groupId);
  };

  const handleBackToList = () => {
    setSelectedGroupId(null);
  };

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  return (
    <SharedPageLayout
      title="Study Groups"
      subtitle="Collaborate with peers to enhance your learning experience"
    >
      {selectedGroupId ? (
        <StudyGroupDetails 
          groupId={selectedGroupId} 
          onBack={handleBackToList}
          onLeave={() => {
            leaveGroup(selectedGroupId);
            handleBackToList();
          }}
        />
      ) : showCreateForm ? (
        <CreateStudyGroupForm onCancel={handleCancelCreate} />
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="my-groups">My Groups</TabsTrigger>
                <TabsTrigger value="discover">Discover Groups</TabsTrigger>
              </TabsList>
              <button
                onClick={handleShowCreateForm}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Create Group
              </button>
            </div>
            <TabsContent value="my-groups" className="mt-0">
              <StudyGroupsList
                groups={userGroups}
                loading={loading}
                emptyMessage="You haven't joined any study groups yet"
                onSelect={handleGroupSelect}
                isUserMember={true}
              />
            </TabsContent>
            <TabsContent value="discover" className="mt-0">
              <StudyGroupsList
                groups={availableGroups}
                loading={loading}
                emptyMessage="No study groups available to join"
                onSelect={handleGroupSelect}
                isUserMember={false}
                onJoin={joinGroup}
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </SharedPageLayout>
  );
};

export default StudyGroupsPage;
