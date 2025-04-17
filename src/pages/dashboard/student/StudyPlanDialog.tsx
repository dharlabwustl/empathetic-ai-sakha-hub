
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, X } from "lucide-react";
import { UserProfileType } from "@/types/user";

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog: React.FC<StudyPlanDialogProps> = ({ userProfile, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-900 p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white flex justify-between items-center">
          <DialogTitle className="text-2xl font-bold text-white">Your Personalized Study Plan</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10 rounded-full h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        <div className="p-6">
          {/* Student info section */}
          <div className="flex flex-col md:flex-row justify-between pb-4 border-b mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                {userProfile.name || "Student"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {userProfile.goals?.[0]?.title || "Exam Preparation"}
              </p>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <Calendar className="h-5 w-5 text-violet-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">
                Plan updated on {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Today's schedule */}
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <Clock className="h-5 w-5 text-violet-500 mr-2" />
            Today's Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Morning Block */}
            <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-violet-100 dark:border-violet-800/30">
              <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Morning Session</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-white dark:bg-gray-800 text-violet-600 text-xs font-medium px-2 py-1 rounded mr-2 mt-0.5">
                    8:00 - 9:30
                  </div>
                  <div>
                    <span className="font-medium">Physics: Wave Optics</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Complete numerical problems and revision
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white dark:bg-gray-800 text-violet-600 text-xs font-medium px-2 py-1 rounded mr-2 mt-0.5">
                    10:00 - 11:30
                  </div>
                  <div>
                    <span className="font-medium">Chemistry: Coordination Compounds</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Study nomenclature and bonding theories
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Evening Block */}
            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800/30">
              <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">Evening Session</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-white dark:bg-gray-800 text-indigo-600 text-xs font-medium px-2 py-1 rounded mr-2 mt-0.5">
                    4:00 - 5:30
                  </div>
                  <div>
                    <span className="font-medium">Mathematics: Calculus</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Practice integration problems from the workbook
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-white dark:bg-gray-800 text-indigo-600 text-xs font-medium px-2 py-1 rounded mr-2 mt-0.5">
                    6:30 - 7:30
                  </div>
                  <div>
                    <span className="font-medium">Revision Quiz</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Complete the daily assessment for all subjects
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* This Week's Focus */}
          <h3 className="text-xl font-medium mb-4 flex items-center">
            <FileText className="h-5 w-5 text-violet-500 mr-2" />
            This Week's Focus
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-violet-700 dark:text-violet-400 mb-2">Physics</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Wave Optics</li>
                <li>Electrostatics</li>
                <li>Current Electricity</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Chemistry</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Coordination Compounds</li>
                <li>Chemical Kinetics</li>
                <li>Aldehydes & Ketones</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-fuchsia-700 dark:text-fuchsia-400 mb-2">Mathematics</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Definite Integration</li>
                <li>Differential Equations</li>
                <li>Probability</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-end">
            <Button variant="outline">Download PDF</Button>
            <Button variant="outline">Share Plan</Button>
            <Button>Adjust Plan</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDialog;
