
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, Sun, Moon, AlertCircle } from "lucide-react";

interface StudyTimeStepProps {
  studyTime: "Morning" | "Afternoon" | "Evening" | "Night";
  setStudyTime: (time: "Morning" | "Afternoon" | "Evening" | "Night") => void;
}

export default function StudyTimeStep({ studyTime, setStudyTime }: StudyTimeStepProps) {
  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Clock className="text-sky-500" size={20} />
            Preferred Study Time
          </h3>
          <p className="text-muted-foreground mb-4">When do you feel most productive for studying?</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant={studyTime === "Morning" ? "default" : "outline"}
              onClick={() => setStudyTime("Morning")}
              className={cn(
                "h-24 flex flex-col items-center justify-center space-y-2",
                studyTime === "Morning" && "bg-amber-500 hover:bg-amber-600"
              )}
            >
              <Sun size={24} />
              <span>Morning</span>
              <span className="text-xs">5 AM - 12 PM</span>
            </Button>
            
            <Button 
              variant={studyTime === "Afternoon" ? "default" : "outline"}
              onClick={() => setStudyTime("Afternoon")}
              className={cn(
                "h-24 flex flex-col items-center justify-center space-y-2",
                studyTime === "Afternoon" && "bg-sky-500 hover:bg-sky-600"
              )}
            >
              <Sun size={24} />
              <span>Afternoon</span>
              <span className="text-xs">12 PM - 5 PM</span>
            </Button>
            
            <Button 
              variant={studyTime === "Evening" ? "default" : "outline"}
              onClick={() => setStudyTime("Evening")}
              className={cn(
                "h-24 flex flex-col items-center justify-center space-y-2",
                studyTime === "Evening" && "bg-indigo-500 hover:bg-indigo-600"
              )}
            >
              <Sun size={24} />
              <span>Evening</span>
              <span className="text-xs">5 PM - 9 PM</span>
            </Button>
            
            <Button 
              variant={studyTime === "Night" ? "default" : "outline"}
              onClick={() => setStudyTime("Night")}
              className={cn(
                "h-24 flex flex-col items-center justify-center space-y-2",
                studyTime === "Night" && "bg-violet-500 hover:bg-violet-600"
              )}
            >
              <Moon size={24} />
              <span>Night</span>
              <span className="text-xs">9 PM - 5 AM</span>
            </Button>
          </div>
          
          <div className="mt-4 p-4 rounded-md bg-gradient-to-r from-sky-50 to-indigo-50">
            <p className="text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-sky-500" />
              <span>We'll schedule your most challenging topics during your preferred time when your focus is at its peak.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
