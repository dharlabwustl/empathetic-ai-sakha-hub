
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Image, BarChart, LineChart } from 'lucide-react';

interface Visual3DContentProps {
  conceptName: string;
}

const Visual3DContent: React.FC<Visual3DContentProps> = ({ conceptName }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-indigo-600" />
            Visual Representations
          </CardTitle>
          <CardDescription>
            Different ways to visualize {conceptName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="diagrams">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="diagrams">
                <Image className="h-4 w-4 mr-2" />
                Diagrams
              </TabsTrigger>
              <TabsTrigger value="charts">
                <BarChart className="h-4 w-4 mr-2" />
                Charts
              </TabsTrigger>
              <TabsTrigger value="graphs">
                <LineChart className="h-4 w-4 mr-2" />
                Graphs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="diagrams" className="space-y-4">
              <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p>Circuit Diagram illustrating Ohm's Law</p>
                  <p className="text-sm text-muted-foreground mt-2">Shows relationship between voltage, current, and resistance</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p>Series Circuit Example</p>
                  </div>
                </div>
                <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p>Parallel Circuit Example</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="charts">
              <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p>Bar Chart comparing different resistors</p>
                  <p className="text-sm text-muted-foreground mt-2">Shows current at constant voltage</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="graphs">
              <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p>Linear Graph showing V-I characteristics</p>
                  <p className="text-sm text-muted-foreground mt-2">Demonstrates the linear relationship in Ohm's Law</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Visual3DContent;
