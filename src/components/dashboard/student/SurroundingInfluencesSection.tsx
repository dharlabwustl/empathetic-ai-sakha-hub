
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}: SurroundingInfluencesSectionProps) => {
  return (
    <Card className="w-full mb-6">
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 text-blue-500 mr-2" />
          Surrounding Influence Meter
          <Badge variant="outline" className="ml-3 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            New
          </Badge>
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
        >
          {influenceMeterCollapsed ? (
            <><ChevronDown className="h-4 w-4 mr-1" /> Expand</>
          ) : (
            <><ChevronUp className="h-4 w-4 mr-1" /> Collapse</>
          )}
        </Button>
      </CardHeader>

      {!influenceMeterCollapsed && (
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-3 w-full md:w-2/3 lg:w-1/3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Your Environment</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Noise Level</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <CustomProgress value={68} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
                      <p className="text-xs text-gray-500 mt-1">High background noise detected</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Study Space Quality</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <CustomProgress value={42} className="h-2 bg-gray-100" indicatorClassName="bg-red-500" />
                      <p className="text-xs text-gray-500 mt-1">Your study space needs improvement</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Peer Influence</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Positive Peer Support</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <CustomProgress value={75} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
                      <p className="text-xs text-gray-500 mt-1">Strong support network detected</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Distractions from Friends</span>
                        <span className="text-sm font-medium">38%</span>
                      </div>
                      <CustomProgress value={38} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
                      <p className="text-xs text-gray-500 mt-1">Moderate social distractions</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Digital Environment</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Social Media Interruptions</span>
                        <span className="text-sm font-medium">82%</span>
                      </div>
                      <CustomProgress value={82} className="h-2 bg-gray-100" indicatorClassName="bg-red-500" />
                      <p className="text-xs text-gray-500 mt-1">High digital distraction detected</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Learning Tools Usage</span>
                        <span className="text-sm font-medium">59%</span>
                      </div>
                      <CustomProgress value={59} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
                      <p className="text-xs text-gray-500 mt-1">Good utilization of educational apps</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Study Habits</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Focus Duration</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <CustomProgress value={45} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
                      <p className="text-xs text-gray-500 mt-1">You get distracted every 15 minutes</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Consistency</span>
                        <span className="text-sm font-medium">67%</span>
                      </div>
                      <CustomProgress value={67} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
                      <p className="text-xs text-gray-500 mt-1">Fairly consistent study schedule</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights">
              <div className="space-y-5">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Key Insights</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-200">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>You study best between 9 AM and 11 AM based on your activity patterns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>Your study breaks are too frequent (every 15 minutes)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>Social media is your biggest distraction source</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>You perform 35% better when studying with peers vs. alone</span>
                    </li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-2">Environmental Factors</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>Noise level during study</span>
                        <span className="font-medium text-red-500">Too High</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Lighting quality</span>
                        <span className="font-medium text-green-500">Excellent</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Study space organization</span>
                        <span className="font-medium text-amber-500">Needs improvement</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Temperature comfort</span>
                        <span className="font-medium text-green-500">Optimal</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-2">Social Factors</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>Peer study group influence</span>
                        <span className="font-medium text-green-500">Very positive</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Family distractions</span>
                        <span className="font-medium text-amber-500">Moderate</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Social media interruptions</span>
                        <span className="font-medium text-red-500">Excessive</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Community support</span>
                        <span className="font-medium text-green-500">Strong</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recommendations">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Try Group Study</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your metrics show 35% improvement when studying with peers. Schedule more group sessions.</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
                    <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">Reduce Digital Distractions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Use app blockers during study time to limit social media access.</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-amber-500 shadow-sm">
                    <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Improve Study Environment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Find a quieter space or use noise-canceling headphones to minimize distractions.</p>
                  </div>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Personalized Action Plan</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>Use the Pomodoro technique: 25 minutes of focus followed by 5-minute breaks</li>
                    <li>Schedule study sessions during your peak productivity hours (9-11 AM)</li>
                    <li>Join the Physics study group that meets on Tuesdays and Thursdays</li>
                    <li>Use the Forest app to block distracting websites and apps while studying</li>
                    <li>Organize your study space to reduce visual clutter</li>
                  </ol>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    Generate Detailed Report
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default SurroundingInfluencesSection;
