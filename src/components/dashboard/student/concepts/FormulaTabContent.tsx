
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Lightbulb, Upload, History } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  onOpenFormulaLab: () => void;
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({
  conceptId,
  conceptTitle,
  onOpenFormulaLab
}) => {
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showFileUpload, setShowFileUpload] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  
  // Newton's Laws formulas and equations
  const formulas = [
    { id: "1", name: "Newton's Second Law", equation: "F = m×a", description: "Force equals mass times acceleration" },
    { id: "2", name: "Weight", equation: "W = m×g", description: "Weight equals mass times gravitational acceleration" },
    { id: "3", name: "Momentum", equation: "p = m×v", description: "Momentum equals mass times velocity" },
    { id: "4", name: "Impulse", equation: "J = F×t", description: "Impulse equals force times time" },
    { id: "5", name: "Kinetic Energy", equation: "KE = (1/2)×m×v²", description: "Kinetic energy equals half of mass times velocity squared" }
  ];
  
  // Practice problems
  const practiceProblems = [
    {
      id: "1",
      problem: "A 5 kg object experiences a force of 20 N. What is its acceleration?",
      hint: "Use F = m×a and solve for a",
      solution: "a = F/m = 20N/5kg = 4 m/s²"
    },
    {
      id: "2",
      problem: "A car of mass 1000 kg accelerates from 0 to 27 m/s in 9 seconds. What is the force applied?",
      hint: "Find acceleration first using v = u + at, then use F = m×a",
      solution: "a = (27 - 0)/9 = 3 m/s², F = 1000×3 = 3000 N"
    }
  ];

  // Calculator functions
  const handleCalculatorOpen = () => {
    setShowCalculator(true);
  };
  
  const handleCalculatorClose = () => {
    setShowCalculator(false);
  };
  
  const appendToExpression = (value: string) => {
    setExpression(prev => prev + value);
  };
  
  const clearExpression = () => {
    setExpression("");
    setResult("");
  };
  
  const calculateResult = () => {
    try {
      // Using Function constructor to evaluate the expression
      // This is generally not recommended for production due to security concerns
      // but works for a simple calculator demo
      const calculatedResult = new Function(`return ${expression}`)();
      setResult(calculatedResult.toString());
      
      // Add to history
      setHistory(prev => [...prev, `${expression} = ${calculatedResult}`]);
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  // Return the formula lab content
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Formula Lab</CardTitle>
          <CardDescription>Practice solving numeric problems with interactive formulas</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Strengthen your understanding of {conceptTitle} by practicing with formula-based problems.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-900/50 mb-6">
            <h3 className="font-medium text-lg mb-3 text-blue-800 dark:text-blue-300">Key Formulas for {conceptTitle}</h3>
            <div className="space-y-3">
              {formulas.map(formula => (
                <div key={formula.id} className="flex items-center gap-3">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                    <span className="font-medium text-lg">{formula.equation}</span>
                  </div>
                  <span>{formula.description}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Practice Problems */}
          <h3 className="font-medium text-lg mb-3">Practice Problems</h3>
          <div className="space-y-4 mb-6">
            {practiceProblems.map((problem, index) => (
              <div key={problem.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                <h4 className="font-medium mb-2">Problem {index + 1}</h4>
                <p className="mb-4">{problem.problem}</p>
                <div className="flex flex-wrap gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => setShowHint(true)}
                        >
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          <span>Hint</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Get a hint to solve this problem</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={handleCalculatorOpen}
                        >
                          <Calculator className="h-4 w-4 text-blue-500" />
                          <span>Calculator</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Open the scientific calculator</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => setShowFileUpload(true)}
                        >
                          <Upload className="h-4 w-4 text-green-500" />
                          <span>Upload Work</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Upload your solution work</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={onOpenFormulaLab} 
            className="w-full flex items-center justify-center gap-2"
          >
            <Calculator className="h-4 w-4" />
            <span>Open Interactive Formula Lab</span>
          </Button>
        </CardContent>
      </Card>
      
      {/* Calculator Dialog */}
      <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scientific Calculator</DialogTitle>
            <DialogDescription>
              Perform calculations for formula-based problems.
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
              
              {/* Calculation history */}
              {history.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <History className="h-4 w-4" />
                    <span>History</span>
                  </div>
                  <div className="max-h-[100px] overflow-y-auto text-sm">
                    {history.map((item, index) => (
                      <div key={index} className="py-1 border-b border-gray-100 last:border-0">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCalculatorClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Hint Dialog */}
      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Problem Hint</DialogTitle>
          </DialogHeader>
          
          <Alert className="bg-amber-50 border-amber-200">
            <AlertDescription>
              {practiceProblems[0].hint}
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <p className="text-sm">Remember these key points:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Make sure to use the correct units in your calculations</li>
              <li>Write down the known variables clearly</li>
              <li>Identify the formula(s) needed to solve the problem</li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowHint(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* File Upload Dialog */}
      <Dialog open={showFileUpload} onOpenChange={setShowFileUpload}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Your Work</DialogTitle>
            <DialogDescription>
              Upload your solution or working notes as images or PDFs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
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
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFileUpload(false)}>Cancel</Button>
            <Button>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormulaTabContent;
