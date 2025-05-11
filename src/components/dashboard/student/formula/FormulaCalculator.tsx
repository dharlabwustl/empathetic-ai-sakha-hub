
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, HelpCircle, FileUp, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface FormulaCalculatorProps {
  formula: string;
  variables?: { name: string; symbol: string; unit?: string }[];
  description?: string;
  hint?: string;
}

const FormulaCalculator: React.FC<FormulaCalculatorProps> = ({
  formula,
  variables = [],
  description,
  hint
}) => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const { toast } = useToast();

  const handleInputChange = (name: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculate = () => {
    try {
      // Simple evaluation for demo purposes
      // In a real app, you would use a proper math library or safer evaluation
      
      // Create a scope with all variables
      const scope: Record<string, number> = {};
      
      // Check if all required variables have values
      let missingValues = false;
      variables.forEach(variable => {
        const value = parseFloat(values[variable.name]);
        if (isNaN(value)) {
          missingValues = true;
        } else {
          scope[variable.name] = value;
        }
      });
      
      if (missingValues) {
        toast({
          title: "Missing values",
          description: "Please enter values for all variables",
          variant: "destructive"
        });
        return;
      }
      
      // Use Function constructor to evaluate the formula with the scope
      // Note: This is generally not safe for production, but works for demo
      const evalFunction = new Function(...Object.keys(scope), `return ${formula}`);
      const calculatedResult = evalFunction(...Object.values(scope));
      
      setResult(calculatedResult);
      
      toast({
        title: "Calculation complete",
        description: `Result: ${calculatedResult.toFixed(2)}`,
      });
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation error",
        description: "There was an error calculating the result. Please check your inputs.",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUploaded(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded for analysis.`,
      });
    }
  };

  const clearFile = () => {
    setFileUploaded(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {/* Calculator Button */}
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
        >
          <Calculator className="h-4 w-4" />
          <span>{isCalculatorOpen ? "Close Calculator" : "Open Calculator"}</span>
        </Button>
        
        {/* Hint Button */}
        {hint && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Show Hint</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <h4 className="font-medium mb-2">Hint</h4>
              <p className="text-sm text-muted-foreground">{hint}</p>
            </PopoverContent>
          </Popover>
        )}
        
        {/* File Upload Button */}
        <div className="relative">
          <input
            type="file"
            id="file-upload"
            className="sr-only"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
          />
          <Label htmlFor="file-upload" className="cursor-pointer">
            <Button variant="outline" className="flex items-center gap-2" type="button">
              <FileUp className="h-4 w-4" />
              <span>Upload Work</span>
            </Button>
          </Label>
        </div>
      </div>
      
      {/* Show uploaded file name if any */}
      {fileUploaded && (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded">
          <span className="text-sm truncate max-w-[200px]">{fileUploaded.name}</span>
          <Button variant="ghost" size="sm" onClick={clearFile} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Calculator Panel */}
      {isCalculatorOpen && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Formula Calculator</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Formula Display */}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center font-medium">
                {formula}
              </div>
              
              {/* Variable Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {variables.map(variable => (
                  <div key={variable.name} className="space-y-1">
                    <Label htmlFor={variable.name}>
                      {variable.symbol} ({variable.name})
                      {variable.unit && <span className="text-xs text-muted-foreground ml-1">in {variable.unit}</span>}
                    </Label>
                    <Input
                      id={variable.name}
                      type="number"
                      placeholder={`Enter ${variable.name}`}
                      value={values[variable.name] || ''}
                      onChange={(e) => handleInputChange(variable.name, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              
              {/* Calculate Button */}
              <Button onClick={handleCalculate} className="w-full">
                Calculate
              </Button>
              
              {/* Result Display */}
              {result !== null && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 p-3 rounded-md text-center">
                  <div className="text-sm text-muted-foreground mb-1">Result:</div>
                  <div className="font-bold text-lg">{result.toFixed(2)}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FormulaCalculator;
