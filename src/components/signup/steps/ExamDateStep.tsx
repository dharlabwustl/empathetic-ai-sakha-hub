
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ExamDateStepProps {
  onExamDateSelect: (date: Date) => void;
}

const ExamDateStep: React.FC<ExamDateStepProps> = ({ onExamDateSelect }) => {
  const today = new Date();
  const defaultDate = new Date(today);
  defaultDate.setMonth(today.getMonth() + 3); // Default to 3 months from now
  
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  
  const handleSubmit = () => {
    if (date) {
      onExamDateSelect(date);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">When is your exam?</h2>
        <p className="text-gray-500">
          We'll tailor your study plan to help you prepare in time.
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[280px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select your exam date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              fromDate={new Date()} // Can't select dates in the past
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <div className="text-center w-full">
          <p className="text-sm text-gray-500 mt-4">
            {date ? (
              <>You have {Math.ceil((date.getTime() - today.getTime()) / (1000 * 3600 * 24))} days until your exam.</>
            ) : (
              <>Please select your exam date.</>
            )}
          </p>
        </div>
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full mt-4"
        disabled={!date}
      >
        Continue
      </Button>
    </div>
  );
};

export default ExamDateStep;
