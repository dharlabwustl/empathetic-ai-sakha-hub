
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<number>(0);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);
  const [pendingOperator, setPendingOperator] = useState<string | null>(null);
  const [lastValue, setLastValue] = useState<number>(0);

  // Clear the display
  const clear = () => {
    setDisplay('0');
    setWaitingForOperand(true);
  };

  // Clear everything
  const clearAll = () => {
    clear();
    setPendingOperator(null);
    setLastValue(0);
  };

  // Handle digit button click
  const digitPressed = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  // Handle decimal point button click
  const decimalPointPressed = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // Handle operator button click
  const operatorPressed = (operator: string) => {
    const operand = parseFloat(display);

    if (pendingOperator !== null) {
      const result = calculate(lastValue, operand, pendingOperator);
      setDisplay(String(result));
      setLastValue(result);
    } else {
      setLastValue(operand);
    }

    setWaitingForOperand(true);
    setPendingOperator(operator);
  };

  // Handle equals button click
  const equalsPressed = () => {
    const operand = parseFloat(display);

    if (pendingOperator !== null) {
      const result = calculate(lastValue, operand, pendingOperator);
      setDisplay(String(result));
      setLastValue(result);
      setPendingOperator(null);
    } else {
      setDisplay(display);
    }

    setWaitingForOperand(true);
  };

  // Calculate result based on operator
  const calculate = (firstOperand: number, secondOperand: number, operator: string): number => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return firstOperand / secondOperand;
      case '^':
        return Math.pow(firstOperand, secondOperand);
      default:
        return secondOperand;
    }
  };

  // Handle memory actions
  const memoryPlus = () => {
    setMemory(memory + parseFloat(display));
    setWaitingForOperand(true);
  };

  const memoryMinus = () => {
    setMemory(memory - parseFloat(display));
    setWaitingForOperand(true);
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
    setWaitingForOperand(true);
  };

  // Handle scientific functions
  const scientificFunction = (fn: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (fn) {
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'reciprocal':
        result = 1 / value;
        break;
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'exp':
        result = Math.exp(value);
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  // Backspace functionality
  const backspace = () => {
    if (!waitingForOperand && display.length > 1) {
      setDisplay(display.substring(0, display.length - 1));
    } else {
      setDisplay('0');
      setWaitingForOperand(true);
    }
  };

  // Change sign
  const changeSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  // Calculator button styling
  const buttonClass = "h-8 text-xs font-medium";
  const operatorButtonClass = "bg-orange-500 hover:bg-orange-600 text-white";
  const functionButtonClass = "bg-blue-500 hover:bg-blue-600 text-white";
  const memoryButtonClass = "bg-purple-500 hover:bg-purple-600 text-white";
  const clearButtonClass = "bg-red-500 hover:bg-red-600 text-white";
  const digitButtonClass = "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600";

  return (
    <div className="border rounded-lg p-2 bg-white dark:bg-gray-900 shadow-sm w-full max-w-sm mx-auto">
      <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 border rounded-md text-right h-10 flex items-center justify-end">
        <span className="text-lg font-mono">{display}</span>
      </div>
      
      <div className="grid grid-cols-5 gap-1">
        {/* Row 1 - Memory and Clear functions */}
        <Button variant="ghost" size="sm" className={`${buttonClass} ${memoryButtonClass}`} onClick={memoryRecall}>MR</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${memoryButtonClass}`} onClick={memoryPlus}>M+</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${memoryButtonClass}`} onClick={memoryMinus}>M-</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${memoryButtonClass}`} onClick={memoryClear}>MC</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${clearButtonClass}`} onClick={clearAll}>AC</Button>
        
        {/* Row 2 - Scientific functions */}
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('sqrt')}>√</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('square')}>x²</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('reciprocal')}>1/x</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => operatorPressed('^')}>x^n</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${clearButtonClass}`} onClick={backspace}>⌫</Button>
        
        {/* Row 3 - Trig functions */}
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('sin')}>sin</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('cos')}>cos</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('tan')}>tan</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('log')}>log</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${operatorButtonClass}`} onClick={() => operatorPressed('÷')}>÷</Button>
        
        {/* Row 4 - Constants and digits */}
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('pi')}>π</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('7')}>7</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('8')}>8</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('9')}>9</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${operatorButtonClass}`} onClick={() => operatorPressed('×')}>×</Button>
        
        {/* Row 5 */}
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('e')}>e</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('4')}>4</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('5')}>5</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('6')}>6</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${operatorButtonClass}`} onClick={() => operatorPressed('-')}>-</Button>
        
        {/* Row 6 */}
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={() => scientificFunction('ln')}>ln</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('1')}>1</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('2')}>2</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('3')}>3</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${operatorButtonClass}`} onClick={() => operatorPressed('+')}>+</Button>
        
        {/* Row 7 */}
        <Button variant="ghost" size="sm" className={`${buttonClass} ${functionButtonClass}`} onClick={changeSign}>±</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => scientificFunction('exp')}>EXP</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={() => digitPressed('0')}>0</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${digitButtonClass}`} onClick={decimalPointPressed}>.</Button>
        <Button variant="ghost" size="sm" className={`${buttonClass} ${operatorButtonClass}`} onClick={equalsPressed}>=</Button>
      </div>
    </div>
  );
};

export default ScientificCalculator;
