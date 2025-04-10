
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoadingScreenProps {
  goalTitle: string;
  weakSubjects: string[];
}

export default function LoadingScreen({ goalTitle, weakSubjects }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <Card className="shadow-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-6 text-center">
            <h2 className="text-2xl font-bold">Creating Your Smart Study Plan</h2>
            <p className="text-sky-100">This will only take a moment...</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-sky-500 rounded-full animate-pulse mr-3"></div>
                <p>Reading syllabus for {goalTitle}...</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-indigo-500 rounded-full animate-pulse mr-3"></div>
                <p>Analyzing previous year questions...</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-violet-500 rounded-full animate-pulse mr-3"></div>
                <p>Customizing your study calendar...</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse mr-3"></div>
                <p>Generating flashcards for {weakSubjects.join(", ")}...</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-amber-500 rounded-full animate-pulse mr-3"></div>
                <p>Creating practice quiz sets...</p>
              </div>

              <div className="relative pt-4">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
