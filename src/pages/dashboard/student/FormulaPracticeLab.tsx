
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, ChevronDown, Download, Upload, ArrowRight, Lightbulb } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Formula {
  id: string;
  name: string;
  equation: string;
  variables: Array<{ symbol: string; name: string; unit: string }>;
  description: string;
  examples?: Array<{ problem: string; solution: string }>;
}

const FormulaPracticeLab: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('formulas');
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Mock data for Newton's Laws of Motion
  const concept = {
    id: conceptId || "1",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics"
  };
  
  // Formula data
  const formulas: Formula[] = [
    {
      id: "1",
      name: "Newton's Second Law",
      equation: "F = m × a",
      variables: [
        { symbol: "F", name: "Force", unit: "N (Newton)" },
        { symbol: "m", name: "Mass", unit: "kg (kilogram)" },
        { symbol: "a", name: "Acceleration", unit: "m/s² (meters per second squared)" }
      ],
      description: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
      examples: [
        { 
          problem: "A 5 kg object experiences a force of 20 N. What is its acceleration?", 
          solution: "a = F/m = 20 N / 5 kg = 4 m/s²" 
        }
      ]
    },
    {
      id: "2",
      name: "Weight",
      equation: "W = m × g",
      variables: [
        { symbol: "W", name: "Weight", unit: "N (Newton)" },
        { symbol: "m", name: "Mass", unit: "kg (kilogram)" },
        { symbol: "g", name: "Gravitational acceleration", unit: "m/s² (meters per second squared)" }
      ],
      description: "Weight is the force exerted on an object due to gravitational acceleration.",
      examples: [
        { 
          problem: "Calculate the weight of a 70 kg person on Earth (g = 9.8 m/s²).", 
          solution: "W = m × g = 70 kg × 9.8 m/s² = 686 N" 
        }
      ]
    },
    {
      id: "3",
      name: "Momentum",
      equation: "p = m × v",
      variables: [
        { symbol: "p", name: "Momentum", unit: "kg·m/s" },
        { symbol: "m", name: "Mass", unit: "kg (kilogram)" },
        { symbol: "v", name: "Velocity", unit: "m/s (meters per second)" }
      ],
      description: "Momentum is a measure of the motion of an object based on its mass and velocity.",
      examples: [
        { 
          problem: "A 1500 kg car is moving at 20 m/s. What is its momentum?", 
          solution: "p = m × v = 1500 kg × 20 m/s = 30,000 kg·m/s" 
        }
      ]
    }
  ];
  
  // Practice problems
  const practiceProblems = [
    {
      id: "1",
      title: "Force and Acceleration",
      difficulty: "Easy",
      problem: "A box with a mass of 10 kg is pushed with a force of 50 N. What is the acceleration of the box?",
      hint: "Use Newton's Second Law: F = m × a and solve for a.",
      solution: "a = F/m = 50 N / 10 kg = 5 m/s²"
    },
    {
      id: "2",
      title: "Weight on Different Planets",
      difficulty: "Medium",
      problem: "A person weighs 700 N on Earth. What would they weigh on the Moon, where gravity is 1/6 that of Earth?",
      hint: "Weight depends on gravitational acceleration. If the weight on Earth is 700 N, and the Moon's gravity is 1/6 of Earth's, multiply by 1/6.",
      solution: "Weight on Moon = 700 N × (1/6) = 116.67 N"
    },
    {
      id: "3",
      title: "Momentum and Force",
      difficulty: "Hard",
      problem: "A 1000 kg car traveling at 25 m/s comes to a stop in 5 seconds. What is the average force applied to stop the car?",
      hint: "First calculate the change in momentum, then use F = Δp/Δt",
      solution: "Δp = m × Δv = 1000 kg × (0 - 25) m/s = -25,000 kg·m/s\nF = Δp/Δt = -25,000 kg·m/s / 5 s = -5,000 N (negative indicates force in opposite direction to motion)"
    }
  ];

  // Handle formula selection
  const handleFormulaSelect = (formula: Formula) => {
    setSelectedFormula(formula);
  };
  
  // Handle back button
  const handleBack = () => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  // Calculator functions
  const appendToExpression = (value: string) => {
    setExpression(prev => prev + value);
  };
  
  const clearExpression = () => {
    setExpression("");
    setResult("");
  };
  
  const calculateResult = () => {
    try {
      // Using Function constructor to evaluate the expression safely
      const calculatedResult = new Function(`return ${expression}`)();
      setResult(calculatedResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };
  
  // File upload functions
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <SharedPageLayout
      title="Formula Practice Lab"
      subtitle={`${concept.title} - ${concept.subject} • ${concept.chapter}`}
    >
      <Button
        variant="outline"
        size="sm"
        className="mb-4 flex items-center gap-1"
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Concept</span>
      </Button>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full grid sm:grid-cols-3 grid-cols-2">
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
          <TabsTrigger value="practice">Practice Problems</TabsTrigger>
          <TabsTrigger value="quiz">Formula Quiz</TabsTrigger>
        </TabsList>
        
        {/* Formulas Tab */}
        <TabsContent value="formulas" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Formula List */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Key Formulas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {formulas.map(formula => (
                  <Button 
                    key={formula.id}
                    variant="outline"
                    className={`w-full justify-start text-left ${selectedFormula?.id === formula.id ? 'bg-blue-50 border-blue-200' : ''}`}
                    onClick={() => handleFormulaSelect(formula)}
                  >
                    <div>
                      <div className="font-medium">{formula.name}</div>
                      <div className="text-sm text-muted-foreground">{formula.equation}</div>
                    </div>
                  </Button>
                ))}
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => setShowCalculator(true)}
                  >
                    <Calculator className="h-4 w-4" />
                    <span>Open Calculator</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Formula Details */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Formula Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFormula ? (
                  <>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                      <h3 className="font-medium text-lg mb-2">{selectedFormula.name}</h3>
                      <div className="text-2xl font-mono mb-4">{selectedFormula.equation}</div>
                      <p className="text-gray-600 dark:text-gray-300">{selectedFormula.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Variables</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Unit</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedFormula.variables.map((variable, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{variable.symbol}</TableCell>
                              <TableCell>{variable.name}</TableCell>
                              <TableCell>{variable.unit}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {selectedFormula.examples && (
                      <div>
                        <h3 className="font-medium mb-2">Example Problems</h3>
                        <Accordion type="single" collapsible>
                          {selectedFormula.examples.map((example, idx) => (
                            <AccordionItem key={idx} value={`example-${idx}`}>
                              <AccordionTrigger>Example {idx + 1}</AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-2 p-2">
                                  <div className="font-medium">Problem:</div>
                                  <p className="text-gray-700 dark:text-gray-300">{example.problem}</p>
                                  <div className="font-medium pt-2">Solution:</div>
                                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{example.solution}</p>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={() => setShowCalculator(true)}
                      >
                        <Calculator className="h-4 w-4" />
                        <span>Calculate</span>
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Select a formula to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Practice Problems Tab */}
        <TabsContent value="practice" className="space-y-4">
          <div className="grid gap-4">
            {practiceProblems.map(problem => (
              <Card key={problem.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                    <Badge className={problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p>{problem.problem}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setShowHint(true)}
                    >
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span>Hint</span>
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setShowCalculator(true)}
                    >
                      <Calculator className="h-4 w-4" />
                      <span>Calculator</span>
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setShowUpload(true)}
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Solution</span>
                    </Button>
                    <Button className="ml-auto">
                      <span>Check Solution</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Formula Quiz Tab */}
        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Formula Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Test your knowledge of formulas with our interactive quiz. You'll be given scenarios where you need to identify the correct formula to apply.
              </p>
              <Button className="w-full sm:w-auto">Start Quiz</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Calculator Dialog */}
      <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scientific Calculator</DialogTitle>
            <DialogDescription>
              Perform calculations for formula-based problems
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col gap-1">
                <Input 
                  value={expression} 
                  onChange={(e) => setExpression(e.target.value)}
                  className="text-right text-lg p-2"
                  placeholder="Enter expression"
                />
                {result && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md text-right font-mono">
                    {result}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-2">
                {/* First row - Clear and operators */}
                <Button variant="outline" onClick={clearExpression}>C</Button>
                <Button variant="outline" onClick={() => appendToExpression("(")}>(</Button>
                <Button variant="outline" onClick={() => appendToExpression(")")}>)</Button>
                <Button variant="outline" onClick={() => appendToExpression("/")}>÷</Button>
                
                {/* Second row - Numbers and multiplication */}
                <Button variant="outline" onClick={() => appendToExpression("7")}>7</Button>
                <Button variant="outline" onClick={() => appendToExpression("8")}>8</Button>
                <Button variant="outline" onClick={() => appendToExpression("9")}>9</Button>
                <Button variant="outline" onClick={() => appendToExpression("*")}>×</Button>
                
                {/* Third row - Numbers and subtraction */}
                <Button variant="outline" onClick={() => appendToExpression("4")}>4</Button>
                <Button variant="outline" onClick={() => appendToExpression("5")}>5</Button>
                <Button variant="outline" onClick={() => appendToExpression("6")}>6</Button>
                <Button variant="outline" onClick={() => appendToExpression("-")}>−</Button>
                
                {/* Fourth row - Numbers and addition */}
                <Button variant="outline" onClick={() => appendToExpression("1")}>1</Button>
                <Button variant="outline" onClick={() => appendToExpression("2")}>2</Button>
                <Button variant="outline" onClick={() => appendToExpression("3")}>3</Button>
                <Button variant="outline" onClick={() => appendToExpression("+")}>+</Button>
                
                {/* Fifth row - Zero, decimal, and equals */}
                <Button variant="outline" onClick={() => appendToExpression("0")}>0</Button>
                <Button variant="outline" onClick={() => appendToExpression(".")}>.</Button>
                <Button variant="outline" onClick={() => appendToExpression("**2")}>x²</Button>
                <Button onClick={calculateResult}>=</Button>
              </div>
              
              {/* Advanced functions */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button variant="outline" onClick={() => appendToExpression("Math.sqrt(")}>√</Button>
                <Button variant="outline" onClick={() => appendToExpression("Math.sin(")}>sin</Button>
                <Button variant="outline" onClick={() => appendToExpression("Math.cos(")}>cos</Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalculator(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Hint Dialog */}
      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Problem Hint</DialogTitle>
          </DialogHeader>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
            <p className="text-amber-800">{practiceProblems[0].hint}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowHint(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* File Upload Dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Your Solution</DialogTitle>
            <DialogDescription>
              Upload your solution work as an image or PDF file.
            </DialogDescription>
          </DialogHeader>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm mb-2">
              Drag and drop files here, or click to select files
            </p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Select Files
              </label>
            </Button>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Uploaded Files:</h4>
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="flex-1 truncate">{file.name}</div>
                    <div className="text-gray-500">{(file.size / 1024).toFixed(1)} KB</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpload(false)}>Cancel</Button>
            <Button>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SharedPageLayout>
  );
};

export default FormulaPracticeLab;
