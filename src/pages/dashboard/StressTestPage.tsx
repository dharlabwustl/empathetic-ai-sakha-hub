
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle2, Brain, LineChart } from 'lucide-react';

const StressTestPage: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Stress Testing</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Prepare for high-pressure exam situations with stress simulations
      </p>
      
      <Tabs defaultValue="available" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="available">Available Tests</TabsTrigger>
          <TabsTrigger value="completed">Completed Tests</TabsTrigger>
          <TabsTrigger value="analysis">Stress Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          <div className="grid gap-6 md:grid-cols-2">
            <StressTestCard 
              title="Time Pressure Simulation"
              description="Experience solving problems under strict time constraints"
              duration="25 min"
              questionCount={15}
              difficulty="Medium"
              skills={["Speed solving", "Quick decision-making", "Time management"]}
            />
            
            <StressTestCard 
              title="Distraction Resilience Test"
              description="Test your ability to focus despite visual and auditory distractions"
              duration="30 min"
              questionCount={20}
              difficulty="Hard"
              skills={["Focus", "Concentration", "Distraction management"]}
            />
            
            <StressTestCard 
              title="High Stakes Simulation"
              description="Practice with additional performance pressure and consequences"
              duration="45 min"
              questionCount={25}
              difficulty="Very Hard"
              skills={["Pressure handling", "Anxiety management", "Performance consistency"]}
            />
            
            <StressTestCard 
              title="Adaptive Difficulty Challenge"
              description="Questions that get progressively harder as you answer correctly"
              duration="40 min"
              questionCount={20}
              difficulty="Adaptive"
              skills={["Confidence building", "Resilience", "Problem-solving"]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-6 md:grid-cols-2">
            <CompletedStressTestCard 
              title="Time Pressure Simulation"
              completionDate="2025-04-14"
              score={78}
              stressScore={65}
              timeEfficiency={82}
              findings={["Good under initial pressure", "Speed decreases after 15 minutes", "Strong accuracy despite pressure"]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Stress Response Profile</CardTitle>
              <CardDescription>
                Based on your test performance under different pressure conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <StatsCard 
                  title="Stress Resilience" 
                  value={75} 
                  description="Your ability to maintain performance under pressure"
                  icon={<Brain className="h-5 w-5 text-violet-500" />}
                />
                <StatsCard 
                  title="Recovery Time" 
                  value={62} 
                  description="How quickly you recover after stressful events"
                  icon={<Clock className="h-5 w-5 text-sky-500" />}
                />
                <StatsCard 
                  title="Consistency" 
                  value={84} 
                  description="Performance stability across varying conditions"
                  icon={<LineChart className="h-5 w-5 text-emerald-500" />}
                />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-blue-600" />
                  Recommendations
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-blue-800 dark:text-blue-200">
                  <li>Practice more timed tests to improve speed under pressure</li>
                  <li>Try the Distraction Resilience Test to strengthen your focus</li>
                  <li>Schedule regular stress simulation sessions before your actual exam</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StressTestCardProps {
  title: string;
  description: string;
  duration: string;
  questionCount: number;
  difficulty: string;
  skills: string[];
}

const StressTestCard: React.FC<StressTestCardProps> = ({
  title,
  description,
  duration,
  questionCount,
  difficulty,
  skills,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span>{duration}</span>
          </div>
          <div>
            <span>{questionCount} questions</span>
          </div>
          <div>
            <span className={`${
              difficulty === 'Easy' ? 'text-green-600' : 
              difficulty === 'Medium' ? 'text-blue-600' : 
              difficulty === 'Hard' ? 'text-amber-600' : 
              'text-red-600'
            }`}>
              {difficulty}
            </span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Skills Tested:</h4>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Start Test
        </Button>
      </CardFooter>
    </Card>
  );
};

interface CompletedStressTestCardProps {
  title: string;
  completionDate: string;
  score: number;
  stressScore: number;
  timeEfficiency: number;
  findings: string[];
}

const CompletedStressTestCard: React.FC<CompletedStressTestCardProps> = ({
  title,
  completionDate,
  score,
  stressScore,
  timeEfficiency,
  findings,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          Completed on {new Date(completionDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{score}%</div>
            <div className="text-xs text-gray-500">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stressScore}</div>
            <div className="text-xs text-gray-500">Stress Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{timeEfficiency}%</div>
            <div className="text-xs text-gray-500">Time Efficiency</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Key Findings:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
            {findings.map((finding, index) => (
              <li key={index}>{finding}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Detailed Report
        </Button>
      </CardFooter>
    </Card>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{title}</h3>
        {icon}
      </div>
      <div className="flex items-end gap-2 mb-1">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-gray-500 mb-1">/100</div>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default StressTestPage;
