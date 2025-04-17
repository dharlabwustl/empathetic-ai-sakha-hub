
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SubjectsTabProps {
  userProfile: UserProfileType;
}

const SubjectsTab: React.FC<SubjectsTabProps> = ({ userProfile }) => {
  // Check if the user profile has subjects
  const subjects = 'subjects' in userProfile ? userProfile.subjects : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Subjects</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(subjects) && subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{typeof subject === 'string' ? subject : subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {typeof subject !== 'string' && 'progress' in subject && (
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <button className="mt-4 text-sm text-blue-600 font-medium">
                  View Materials
                </button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No subjects found. Add subjects to your profile.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectsTab;
