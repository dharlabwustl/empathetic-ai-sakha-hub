
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GradesOverview } from "./GradesOverview";
import SubjectOverview from "./SubjectOverview";

interface PerformanceTabsProps {
  studentId: string;
}

const PerformanceTabs: React.FC<PerformanceTabsProps> = ({ studentId }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="grades" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grades">Grades Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="grades">
            <div className="p-4">
              <GradesOverview studentId={studentId} />
            </div>
          </TabsContent>
          <TabsContent value="subjects">
            <div className="p-4">
              <SubjectOverview />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceTabs;
