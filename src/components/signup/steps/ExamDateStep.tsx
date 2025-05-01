
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface ExamDateStepProps {
  onExamDateSelect: (date: Date) => void;
}

const ExamDateStep: React.FC<ExamDateStepProps> = ({ onExamDateSelect }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onExamDateSelect(selectedDate);
    }
  };

  // Calculate default date range (3 months from now)
  const fromDate = new Date();
  const toDate = new Date();
  toDate.setFullYear(toDate.getFullYear() + 1); // Allow selection up to 1 year in future

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-center mb-4">When is your exam?</h2>
      
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-[280px] justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select exam date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                fromDate={fromDate}
                toDate={toDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </motion.div>
        
        {date && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center"
          >
            <p className="text-sm text-blue-700">
              {Math.round((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days 
              until your exam
            </p>
          </motion.div>
        )}
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-6">
        We'll optimize your study plan based on the time available
      </p>
    </div>
  );
};

export default ExamDateStep;
