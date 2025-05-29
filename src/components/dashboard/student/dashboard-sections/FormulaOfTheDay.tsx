
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const FormulaOfTheDay: React.FC = () => {
  return (
    <Card id="formula-practice">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-orange-600" />
          Formula Practice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
          <h3 className="font-medium text-sm mb-2">Today's Formula</h3>
          <div className="bg-white dark:bg-gray-800 p-3 rounded border">
            <p className="text-center font-mono text-lg">
              v² = u² + 2as
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              Third Equation of Motion
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Practice Questions Available:</p>
          <p className="text-xs text-gray-600">• Kinematics Problems (5 questions)</p>
          <p className="text-xs text-gray-600">• Numerical Practice (8 questions)</p>
        </div>
        
        <Link to="/dashboard/student/formula-practice">
          <Button className="w-full bg-orange-600 hover:bg-orange-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Practice Formulas
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FormulaOfTheDay;
