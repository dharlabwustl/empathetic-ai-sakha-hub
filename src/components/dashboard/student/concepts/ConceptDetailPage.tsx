
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Video, 
  FileText, 
  BarChart4, 
  AlertCircle,
  Brain,
  Layers,
  Microscope,
  FastForward,
  Eye,
  FlaskConical,
  Zap,
  Clock,
  Target,
  LineChart,
  BarChart3,
  MessageSquare,
  PencilLine,
  LinkIcon,
  FileQuestion,
  Star
} from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import LinkedConceptsSection from './LinkedConceptsSection';
import RelatedFlashcards from './RelatedFlashcards';
import ConceptExamSection from './ConceptExamSection';

// Sample components to be implemented
const ConceptMasterySection = () => (
  <Card className="border-l-4 border-l-indigo-500 mb-6">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2">
        <Brain className="h-5 w-5 text-indigo-500" />
        Mastery & Recall Tracker
      </CardTitle>
      <CardDescription>Track your understanding of this concept</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Concept Mastery</p>
          <div className="flex items-center gap-2">
            <Progress value={68} className="h-2" />
            <span className="text-sm font-medium">68%</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Active Recall</p>
          <div className="flex items-center gap-2">
            <Progress value={75} className="h-2" />
            <span className="text-sm font-medium">75%</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Next Review</p>
          <span className="text-sm font-medium">Tomorrow</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const AIInsights = () => (
  <Card className="border-l-4 border-l-orange-500 mb-6">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-orange-500" />
        AI Insights
      </CardTitle>
      <CardDescription>Personalized learning recommendations</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md">
          <h4 className="font-medium mb-1">Learning Recommendation</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Based on your recent quiz performance, we recommend focusing on the relationship between 
            voltage, current, and resistance in practical circuits.
          </p>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md">
          <h4 className="font-medium mb-1">Knowledge Gap Identified</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You might want to review how Ohm's Law applies to parallel circuits, 
            as this was a challenging area in your recent practice.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FormulaTabContent = () => (
  <div className="space-y-4">
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
      <div className="text-center my-4">
        <div className="text-2xl font-bold mb-2">V = IR</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Voltage (V) = Current (I) × Resistance (R)
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
          <h4 className="font-medium">V - Voltage</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Unit: Volts (V)<br/>
            The electrical pressure that pushes electrons through a circuit.
          </p>
        </div>
        <div className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
          <h4 className="font-medium">I - Current</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Unit: Amperes (A)<br/>
            The flow rate of electric charge through a point.
          </p>
        </div>
        <div className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
          <h4 className="font-medium">R - Resistance</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Unit: Ohms (Ω)<br/>
            How much a material opposes the flow of electric current.
          </p>
        </div>
      </div>
    </div>
    
    <div className="bg-white dark:bg-gray-800 p-4 border rounded-md">
      <h3 className="font-semibold mb-4">Practice with the Formula</h3>
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
          <h4 className="font-medium mb-2">Example 1</h4>
          <p className="text-sm mb-2">If the voltage across a resistor is 12V and the resistance is 4Ω, what is the current?</p>
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-600/50 p-2 rounded">
            I = V/R = 12V/4Ω = 3A
          </div>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
          <h4 className="font-medium mb-2">Example 2</h4>
          <p className="text-sm mb-2">If a current of 2A flows through a resistor of 6Ω, what is the voltage across it?</p>
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-600/50 p-2 rounded">
            V = I×R = 2A×6Ω = 12V
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Visual3DContent = () => (
  <div className="space-y-6">
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md text-center">
      <h3 className="text-lg font-medium mb-4">3D Circuit Visualization</h3>
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">3D Circuit Model Would Render Here</div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <Button variant="outline" size="sm">Rotate</Button>
        <Button variant="outline" size="sm">Zoom</Button>
        <Button variant="outline" size="sm">Reset</Button>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Interactive Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Resistance</span>
              <span>5 Ω</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full w-1/2"></div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <span>Voltage</span>
              <span>12 V</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full w-3/5"></div>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Current: 2.4 A
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Learning Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Increasing resistance decreases current flow</li>
            <li>• Increasing voltage increases current flow</li>
            <li>• The relationship is linear (doubling voltage doubles current)</li>
            <li>• Ohm's law only applies to ohmic conductors at constant temperature</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

const VideoTabContent = () => (
  <div className="space-y-4">
    <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
      <div className="text-gray-500 dark:text-gray-400">Video Tutorial Would Play Here</div>
    </div>
    
    <div className="bg-white dark:bg-gray-800 border rounded-md">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Ohm's Law Explained</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Duration: 8:24 • Instructor: Prof. Sharma
        </p>
      </div>
      <div className="p-4 text-sm">
        <h4 className="font-medium mb-2">Video Chapters</h4>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="text-blue-500">00:00</span>
            <span>Introduction to Electrical Circuits</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500">01:45</span>
            <span>Understanding Voltage, Current, and Resistance</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500">03:30</span>
            <span>Ohm's Law Formula and Applications</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500">05:15</span>
            <span>Worked Examples</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500">07:00</span>
            <span>Common Mistakes and Practical Tips</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="border rounded-md overflow-hidden">
        <div className="aspect-video bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-3">
          <h4 className="font-medium text-sm">Building Simple Circuits</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">5:36</p>
        </div>
      </div>
      <div className="border rounded-md overflow-hidden">
        <div className="aspect-video bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-3">
          <h4 className="font-medium text-sm">Using a Multimeter</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">7:12</p>
        </div>
      </div>
      <div className="border rounded-md overflow-hidden">
        <div className="aspect-video bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-3">
          <h4 className="font-medium text-sm">Series vs Parallel Circuits</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">10:48</p>
        </div>
      </div>
    </div>
  </div>
);

const CommonMistakesContent = () => (
  <div className="space-y-6">
    <div className="bg-white dark:bg-gray-800 border rounded-md">
      <div className="border-b p-4">
        <h3 className="font-semibold">Common Mistakes with Ohm's Law</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 p-4 rounded-md">
          <h4 className="font-medium text-red-800 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> 
            Mixing up the formula
          </h4>
          <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
            Students often write I = R/V instead of I = V/R. Remember that current is directly proportional to voltage but inversely proportional to resistance.
          </p>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 p-4 rounded-md">
          <h4 className="font-medium text-red-800 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> 
            Unit conversion errors
          </h4>
          <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
            Be careful with units. If resistance is given in kΩ (kilohms), convert to Ω (ohms) before applying the formula. Similarly, make sure to convert mA (milliamperes) to A (amperes) when needed.
          </p>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 p-4 rounded-md">
          <h4 className="font-medium text-red-800 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> 
            Applying to non-ohmic conductors
          </h4>
          <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
            Ohm's Law doesn't apply to all conductors. Components like diodes, transistors, and some non-metallic conductors don't follow this relationship.
          </p>
        </div>
      </div>
    </div>
    
    <div className="bg-white dark:bg-gray-800 border rounded-md overflow-hidden">
      <div className="border-b p-4">
        <h3 className="font-semibold">Troubleshooting Tips</h3>
      </div>
      <div className="space-y-0">
        <div className="p-4 border-b">
          <h4 className="font-medium mb-2">Check your calculations</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Always verify your calculations by substituting the values back into the equation. If you calculate current from voltage and resistance, check if V = I×R holds true with your answer.
          </p>
        </div>
        <div className="p-4 border-b">
          <h4 className="font-medium mb-2">Cross-verify with other formulas</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You can use power relationships (P = V×I or P = I²R) to verify your answers from Ohm's Law calculations.
          </p>
        </div>
        <div className="p-4">
          <h4 className="font-medium mb-2">Use the Ohm's Law triangle</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The Ohm's Law triangle is a helpful memory aid. Cover the quantity you want to find, and the position of the remaining two quantities shows whether to multiply or divide.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PreviousYearQuestionsTab = () => (
  <div className="space-y-4">
    <div className="bg-white dark:bg-gray-800 rounded-md border">
      <div className="border-b p-4">
        <h3 className="font-semibold">Previous Year Questions</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Ohm's Law has appeared in multiple competitive exams
        </p>
      </div>
      
      <div className="space-y-0">
        <div className="border-b p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">NEET 2022</Badge>
              <span className="text-xs text-gray-500 ml-2">Question 14</span>
            </div>
            <Badge>4 marks</Badge>
          </div>
          <p className="text-sm mb-3">
            A wire of resistance 10Ω is bent to form a circle. The effective resistance between the two points on any diameter of the circle is:
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
              (a) 2.5Ω
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
              (b) 5Ω
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 p-2 rounded">
              (c) 2.5Ω <span className="text-green-600 dark:text-green-400">✓</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
              (d) 20Ω
            </div>
          </div>
        </div>
        
        <div className="border-b p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">JEE Main 2021</Badge>
              <span className="text-xs text-gray-500 ml-2">Question 8</span>
            </div>
            <Badge>3 marks</Badge>
          </div>
          <p className="text-sm mb-3">
            According to Ohm's law, the graph of potential difference (V) versus current (I) for a conductor at constant temperature would be:
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 p-2 rounded">
              (a) A straight line through origin <span className="text-green-600 dark:text-green-400">✓</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
              (b) A parabola
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
              (c) A hyperbola
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
              (d) A straight line with non-zero y-intercept
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Badge variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-200">JEE Advanced 2020</Badge>
              <span className="text-xs text-gray-500 ml-2">Question 21</span>
            </div>
            <Badge>5 marks</Badge>
          </div>
          <p className="text-sm mb-3">
            A cell of emf E and internal resistance r is connected across a variable external resistance R. Plot the graph showing variation of terminal voltage V with external resistance R.
          </p>
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mb-2">
            <div className="text-gray-500 dark:text-gray-400">Graph would render here</div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Explanation: The terminal voltage V = E - Ir, where I = E/(R+r). As R increases, I decreases, so terminal voltage V approaches E asymptotically.
          </div>
        </div>
      </div>
    </div>
    
    <Button variant="outline" className="w-full">
      <FileQuestion className="h-4 w-4 mr-2" />
      View More Previous Year Questions
    </Button>
  </div>
);

const RecallSection = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quick Recall Test</CardTitle>
        <CardDescription>Test your memory of this concept</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-4">
            <h4 className="font-medium mb-2">Fill in the blanks</h4>
            <p className="mb-4">In Ohm's Law, voltage (V) equals _______ multiplied by _______.</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">current × resistance</Button>
              <Button variant="outline" className="flex-1">resistance × current</Button>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-4">
            <h4 className="font-medium mb-2">True or False</h4>
            <p className="mb-4">Ohm's Law can be applied to all conductors regardless of temperature.</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">True</Button>
              <Button variant="outline" className="flex-1">False</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <FastForward className="h-4 w-4" />
          Spaced Repetition Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Memory Strength</span>
              <span>Medium</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-3/5"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Last Reviewed</p>
              <p className="font-medium">2 days ago</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Next Review</p>
              <p className="font-medium">Tomorrow</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const AnalyticsSection = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-4 w-4" />
          Performance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mb-4">
          <div className="text-gray-500 dark:text-gray-400">Performance Chart Would Render Here</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Quiz Attempts</p>
            <p className="font-semibold text-xl">8</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Score</p>
            <p className="font-semibold text-xl">76%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Time Spent</p>
            <p className="font-semibold text-xl">135m</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Mastery Gain</p>
            <p className="font-semibold text-xl">+23%</p>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Performance by Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Basic application</span>
              <span className="text-sm text-green-600">90%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full w-[90%]"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Complex circuits</span>
              <span className="text-sm text-amber-600">65%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[65%]"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Theoretical understanding</span>
              <span className="text-sm text-blue-600">80%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full w-[80%]"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Problem-solving</span>
              <span className="text-sm text-red-600">45%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full w-[45%]"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const RevisionSection = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Revision Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800/30">
            <div className="bg-blue-100 dark:bg-blue-800 h-10 w-10 rounded flex items-center justify-center mr-3">
              <Clock className="h-5 w-5 text-blue-700 dark:text-blue-300" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Tomorrow</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Quick recall test</p>
            </div>
            <div>
              <Badge variant="outline">Upcoming</Badge>
            </div>
          </div>
          
          <div className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800/30">
            <div className="bg-green-100 dark:bg-green-800 h-10 w-10 rounded flex items-center justify-center mr-3">
              <Target className="h-5 w-5 text-green-700 dark:text-green-300" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Next Week</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Comprehensive quiz</p>
            </div>
            <div>
              <Badge variant="outline">Planned</Badge>
            </div>
          </div>
          
          <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md border">
            <div className="bg-gray-100 dark:bg-gray-700 h-10 w-10 rounded flex items-center justify-center mr-3">
              <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium">In 3 Weeks</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Final review</p>
            </div>
            <div>
              <Badge variant="outline">Planned</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Revision Technique Recommendation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
            <h4 className="font-medium mb-1">Active Recall</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Practice solving circuit problems without looking at the formulas first, then check your work.
            </p>
          </div>
          
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
            <h4 className="font-medium mb-1">Feynman Technique</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Explain Ohm's Law and its applications to someone else in simple terms to reinforce your understanding.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const NotesSection = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <PencilLine className="h-4 w-4" />
          My Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[200px] p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800/30 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Ohm's Law is V = IR where:
            <br />- V is voltage (measured in volts)
            <br />- I is current (measured in amperes)
            <br />- R is resistance (measured in ohms)
            <br /><br />
            Remember that this only works for resistors and conductors that have a constant resistance regardless of applied voltage.
            <br /><br />
            Rearrangements:
            <br />- Current: I = V/R
            <br />- Resistance: R = V/I
          </p>
        </div>
        <div className="flex justify-end mt-2">
          <Button variant="outline" size="sm">
            <PencilLine className="h-3 w-3 mr-1" />
            Edit Notes
          </Button>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Auto-Generated Summary</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <p>
          Ohm's Law establishes the relationship between current, voltage, and resistance in an electrical circuit. 
          The law states that the current flowing through a conductor is directly proportional to the voltage 
          applied across it, given that physical conditions like temperature remain constant.
        </p>
        <p>
          The mathematical formula V = IR (where V is voltage, I is current, and R is resistance) allows us to 
          calculate any one of these variables if the other two are known. This fundamental principle is essential 
          for analyzing and designing electrical circuits.
        </p>
      </CardContent>
    </Card>
  </div>
);

const DiscussSection = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Discussion Forum
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-md">
            <div className="p-3 border-b bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <span className="font-medium text-sm text-blue-700 dark:text-blue-300">AK</span>
                  </div>
                  <span className="font-medium">Amit K.</span>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <h4 className="font-medium mt-2">Question about non-linear resistors</h4>
            </div>
            <div className="p-3">
              <p className="text-sm mb-3">
                When does Ohm's Law break down? I've heard that some materials don't follow this relationship. 
                Can someone explain what non-ohmic conductors are and give some examples?
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>3 replies</span>
                  <span>12 views</span>
                </div>
                <Button variant="outline" size="sm">Reply</Button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md">
            <div className="p-3 border-b bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <span className="font-medium text-sm text-purple-700 dark:text-purple-300">RJ</span>
                  </div>
                  <span className="font-medium">Riya J.</span>
                </div>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
              <h4 className="font-medium mt-2">Tips for solving complex circuit problems</h4>
            </div>
            <div className="p-3">
              <p className="text-sm mb-3">
                I've been struggling with applying Ohm's Law in circuits with multiple resistors. 
                Any tips or methods to make it easier to analyze series and parallel combinations?
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>8 replies</span>
                  <span>24 views</span>
                </div>
                <Button variant="outline" size="sm">Reply</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start New Discussion
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ConceptDetailPage: React.FC = () => {
  // Tabs state
  const [primaryActiveTab, setPrimaryActiveTab] = useState("learn");
  const [secondaryActiveTab, setSecondaryActiveTab] = useState("recall");
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Sample concept data
  const conceptData = {
    id: "concept-123",
    title: "Ohm's Law",
    subject: "Physics",
    chapter: "Electricity",
    difficulty: "Medium",
    importance: "High",
    description: "Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points.",
    formula: "V = IR",
    variables: [
      { symbol: "V", name: "Voltage", unit: "Volts (V)" },
      { symbol: "I", name: "Current", unit: "Amperes (A)" },
      { symbol: "R", name: "Resistance", unit: "Ohms (Ω)" }
    ],
    examples: [
      {
        question: "If the voltage across a resistor is 12V and the resistance is 4Ω, what is the current?",
        solution: "Using Ohm's law: I = V/R = 12V/4Ω = 3A"
      }
    ],
    relatedConcepts: ["Kirchhoff's Laws", "Electrical Resistance", "Circuit Analysis"]
  };
  
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const difficultyColors = {
    "Easy": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "Medium": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "Hard": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
  };

  const importanceColors = {
    "High": "bg-purple-100 text-purple-700 border-purple-200",
    "Medium": "bg-blue-100 text-blue-700 border-blue-200",
    "Low": "bg-gray-100 text-gray-700 border-gray-200"
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4 space-y-6">
        {/* Masthead with concept title and basic info */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/50">
                  {conceptData.subject}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/50">
                  {conceptData.chapter}
                </Badge>
                <Badge variant="outline" className={difficultyColors[conceptData.difficulty]}>
                  {conceptData.difficulty}
                </Badge>
                <Badge variant="outline" className={importanceColors[conceptData.importance]}>
                  Importance: {conceptData.importance}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
                {conceptData.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {conceptData.description}
              </p>
            </div>
            <button 
              className="h-8 w-8 flex items-center justify-center rounded-full"
              onClick={handleToggleBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Star className={`h-5 w-5 ${isBookmarked ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} />
            </button>
          </div>
        </motion.div>

        {/* Mastery & Recall Tracker */}
        <ConceptMasterySection />
        
        {/* AI Insights */}
        <AIInsights />
        
        {/* Primary tabs for different learning modalities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
          <Tabs value={primaryActiveTab} onValueChange={setPrimaryActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="learn" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Learn</span>
              </TabsTrigger>
              <TabsTrigger value="visual" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>Visual</span>
              </TabsTrigger>
              <TabsTrigger value="3d" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span>3D Simulation</span>
              </TabsTrigger>
              <TabsTrigger value="formula" className="flex items-center gap-1">
                <FlaskConical className="h-4 w-4" />
                <span>Formula Lab</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span>Video</span>
              </TabsTrigger>
              <TabsTrigger value="mistakes" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span>Common Mistakes</span>
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex items-center gap-1">
                <FileQuestion className="h-4 w-4" />
                <span>Previous Year</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="learn" className="pt-4">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Ohm's Law</h2>
                <p>
                  Ohm's law states that the current through a conductor between two points is directly proportional 
                  to the voltage across the two points. Introducing the constant of proportionality, the resistance, 
                  one arrives at the usual mathematical equation that describes this relationship:
                </p>
                <div className="text-center my-4">
                  <div className="text-2xl font-bold mb-2">V = IR</div>
                </div>
                <p>
                  where I is the current through the conductor in units of amperes, V is the voltage measured 
                  across the conductor in units of volts, and R is the resistance of the conductor in units of ohms.
                </p>
                
                <h3>Historical Context</h3>
                <p>
                  Ohm's law was named after the German physicist Georg Ohm, who, in a treatise published in 1827, 
                  described measurements of applied voltage and current through simple electrical circuits containing 
                  various lengths of wire. Ohm explained his experimental results by a slightly more complex equation 
                  than the modern form above.
                </p>
                
                <h3>Implications and Applications</h3>
                <p>
                  Ohm's law is one of the most fundamental relationships in electrical engineering. It allows us to 
                  establish relationships between voltage, current, and resistance in electrical circuits, making it 
                  possible to design and analyze circuits for various applications.
                </p>
                
                <h3>Limitations</h3>
                <p>
                  It's important to note that Ohm's law is not universal. It applies to ideal resistors but breaks 
                  down for certain materials and conditions. Some examples of non-ohmic conductors include:
                </p>
                <ul>
                  <li>Diodes and transistors</li>
                  <li>Vacuum tubes</li>
                  <li>Semiconductors</li>
                  <li>Most electrolytes</li>
                </ul>
                
                <h3>Example Problems</h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md mb-4">
                  <h4>Example 1: Finding Current</h4>
                  <p>If a 12V battery is connected to a resistor with 4Ω resistance, what is the current flowing through the circuit?</p>
                  <div className="bg-white dark:bg-gray-700/50 p-3 rounded-md">
                    <strong>Solution:</strong>
                    <p>Using Ohm's law: I = V/R = 12V/4Ω = 3A</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                  <h4>Example 2: Finding Resistance</h4>
                  <p>If a current of 2A flows through a circuit with a voltage source of 9V, what is the resistance?</p>
                  <div className="bg-white dark:bg-gray-700/50 p-3 rounded-md">
                    <strong>Solution:</strong>
                    <p>Using Ohm's law: R = V/I = 9V/2A = 4.5Ω</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="visual" className="pt-4">
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-center">Visual Representation of Ohm's Law</h3>
                  <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500 dark:text-gray-400">Interactive Ohm's Law diagram would render here</div>
                  </div>
                  <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
                    Ohm's Law Triangle: Cover the quantity you want to find, and the position of the remaining quantities shows whether to multiply or divide.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Current vs. Voltage Graph</h3>
                    </div>
                    <div className="p-4">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-gray-500 dark:text-gray-400">Graph would render here</div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        For an ohmic conductor, the graph of current vs. voltage is a straight line through the origin. 
                        The slope of this line equals 1/R.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Resistance Visualization</h3>
                    </div>
                    <div className="p-4">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-gray-500 dark:text-gray-400">Visualization would render here</div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Resistance can be visualized as a narrowing in a pipe that restricts flow. 
                        Higher resistance (narrower pipe) results in lower current flow for the same voltage (pressure).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="3d" className="pt-4">
              <Visual3DContent />
            </TabsContent>
            
            <TabsContent value="formula" className="pt-4">
              <FormulaTabContent />
            </TabsContent>
            
            <TabsContent value="video" className="pt-4">
              <VideoTabContent />
            </TabsContent>
            
            <TabsContent value="mistakes" className="pt-4">
              <CommonMistakesContent />
            </TabsContent>
            
            <TabsContent value="questions" className="pt-4">
              <PreviousYearQuestionsTab />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Secondary tabs for learning management */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
          <Tabs value={secondaryActiveTab} onValueChange={setSecondaryActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="recall" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span>Recall</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="revision" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Revision</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1">
                <PencilLine className="h-4 w-4" />
                <span>Notes</span>
              </TabsTrigger>
              <TabsTrigger value="discuss" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Discuss</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recall" className="pt-4">
              <RecallSection />
            </TabsContent>
            
            <TabsContent value="analytics" className="pt-4">
              <AnalyticsSection />
            </TabsContent>
            
            <TabsContent value="revision" className="pt-4">
              <RevisionSection />
            </TabsContent>
            
            <TabsContent value="notes" className="pt-4">
              <NotesSection />
            </TabsContent>
            
            <TabsContent value="discuss" className="pt-4">
              <DiscussSection />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Linked concepts */}
          <LinkedConceptsSection 
            conceptName="Ohm's Law" 
            relatedConcepts={[
              "Kirchhoff's Laws",
              "Electrical Resistance",
              "Circuit Analysis"
            ]} 
          />
          
          {/* Related flashcards */}
          <RelatedFlashcards conceptName="Ohm's Law" />
        </div>
        
        {/* Exam appearance */}
        <ConceptExamSection conceptName="Ohm's Law" />
      </div>
    </MainLayout>
  );
};

export default ConceptDetailPage;
