
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FlashcardCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      // Using Function instead of eval for safer execution
      const result = new Function('return ' + equation + display)();
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-sm">Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 p-2 rounded mb-2 text-right">
          <div className="text-sm text-gray-600">{equation}</div>
          <div className="text-xl">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
            <Button
              key={btn}
              variant="outline"
              size="sm"
              onClick={() => {
                switch (btn) {
                  case '=': calculate(); break;
                  case '÷': handleOperator('/'); break;
                  case '×': handleOperator('*'); break;
                  case '+':
                  case '-': handleOperator(btn); break;
                  default: handleNumber(btn);
                }
              }}
            >
              {btn}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={clear}
            className="col-span-4"
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashcardCalculator;
