
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileBase } from '@/types/user/base';
import StudyTimeAllocation from '@/components/dashboard/student/study-plan/StudyTimeAllocation';
import { Calendar, Clock, BookOpen, BarChart } from 'lucide-react';

interface StudyPlanDialogProps {
  userProfile: UserProfileBase;
  onClose: () => void;
}

const StudyPlanDialog: React.FC<StudyPlanDialogProps> = ({ userProfile, onClose }) => {
  const [activeTab, setActiveTab] = useState('weekly');
  
  // Handle study time allocation updates
  const handleTimeAllocationUpdate = (allocations: Record<string, number>) => {
    console.log("Updated study time allocations:", allocations);
    // Could trigger additional logic here if needed
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Your Study Plan</DialogTitle>
          <DialogDescription>
            Personalized study plan for {userProfile.name}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Weekly Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Daily Plan</span>
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Subjects</span>
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Time Allocation</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="pt-2">
            <h3 className="font-medium text-lg mb-3">Weekly Study Overview</h3>
            <div className="space-y-4">
              <p>Your weekly study schedule is designed to help you prepare effectively for your {userProfile.goals?.[0]?.title || "upcoming exam"}.</p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Weekly Focus Areas</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Physics: Mechanics and Thermodynamics</li>
                  <li>Chemistry: Organic Chemistry, Chemical Bonding</li>
                  <li>Biology: Human Physiology, Cell Biology</li>
                  <li>Mathematics: Calculus, Probability</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="daily" className="pt-2">
            <h3 className="font-medium text-lg mb-3">Today's Study Plan</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">Here's your personalized study plan for today:</p>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">9:00 AM - 10:30 AM</span>
                    <span className="text-blue-600">Physics</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Mechanics: Newton's Laws of Motion</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">11:00 AM - 12:30 PM</span>
                    <span className="text-green-600">Chemistry</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Chemical Bonding and Molecular Structure</p>
                </div>
                <div className="p-3 border rounded-lg bg-muted">
                  <div className="flex justify-between">
                    <span className="font-medium">2:00 PM - 3:30 PM</span>
                    <span className="text-purple-600">Biology</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Cell Biology and Organization</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subjects" className="pt-2">
            <h3 className="font-medium text-lg mb-3">Subject Progress</h3>
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Physics</h3>
                    <span className="text-sm text-muted-foreground">65% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Chemistry</h3>
                    <span className="text-sm text-muted-foreground">78% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Biology</h3>
                    <span className="text-sm text-muted-foreground">42% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Mathematics</h3>
                    <span className="text-sm text-muted-foreground">59% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '59%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="time" className="pt-2">
            <StudyTimeAllocation onUpdate={handleTimeAllocationUpdate} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDialog;
