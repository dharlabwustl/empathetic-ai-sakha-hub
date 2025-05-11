
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Award, BrainCircuit, LineChart, BookOpen } from 'lucide-react';

// This component displays key performance indicators in the "Our Impact" section
const KpiStats = () => {
  // This data would come from admin backend in a real implementation
  const kpiData = [
    {
      id: "students",
      label: "Total Students",
      value: "50,000+",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      description: "Active learners across the platform"
    },
    {
      id: "success",
      label: "Exam Success Rate",
      value: "92%",
      icon: <Award className="h-6 w-6 text-green-600" />,
      description: "Students achieving target scores"
    },
    {
      id: "plans",
      label: "Dynamic Plans",
      value: "125,000+",
      icon: <LineChart className="h-6 w-6 text-purple-600" />,
      description: "Personalized study plans generated"
    },
    {
      id: "stress",
      label: "Stress Reduced",
      value: "73%",
      icon: <BrainCircuit className="h-6 w-6 text-pink-600" />,
      description: "Decrease in exam anxiety reported"
    },
    {
      id: "concepts",
      label: "Mastery Concepts",
      value: "1,200+",
      icon: <BookOpen className="h-6 w-6 text-amber-600" />,
      description: "Concepts mastered per student"
    }
  ];

  return (
    <div className="w-full">
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          {kpiData.map(kpi => (
            <TabsTrigger key={kpi.id} value={kpi.id} className="flex items-center gap-2">
              {kpi.icon}
              <span className="hidden md:inline">{kpi.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {kpiData.map(kpi => (
          <TabsContent key={kpi.id} value={kpi.id} className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="mr-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                      {kpi.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{kpi.label}</h3>
                      <p className="text-gray-500">{kpi.description}</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{kpi.value}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default KpiStats;
