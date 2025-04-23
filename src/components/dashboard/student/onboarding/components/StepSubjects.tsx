
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Subject } from "@/types/user/studyPlan";
import { Check, Search, X } from "lucide-react";

// Helper function to convert string arrays to Subject arrays
export const convertToSubjects = (subjectNames: string[]): Subject[] => {
  return subjectNames.map(name => ({
    name,
    key: name.toLowerCase().replace(/\s+/g, '-'),
  }));
};

interface StepSubjectsProps {
  strongSubjects: Subject[];
  weakSubjects: Subject[];
  handleToggleSubject: (subject: Subject, type: "strong" | "weak") => void;
  examGoal: string;
}

const StepSubjects: React.FC<StepSubjectsProps> = ({ 
  strongSubjects,
  weakSubjects,
  handleToggleSubject,
  examGoal 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  
  // Suggested subjects based on common exam preparations
  const suggestedSubjectGroups = [
    { group: "Mathematics", subjects: ["Algebra", "Geometry", "Calculus", "Trigonometry", "Statistics"] },
    { group: "Science", subjects: ["Physics", "Chemistry", "Biology", "Environmental Science"] },
    { group: "Languages", subjects: ["English", "Hindi", "Sanskrit"] },
    { group: "Social Studies", subjects: ["History", "Geography", "Political Science", "Economics"] }
  ];

  useEffect(() => {
    // Convert string arrays to Subject arrays
    const groups = new Map(suggestedSubjectGroups.map(group => {
      const subjectList = convertToSubjects(group.subjects).map(subject => ({
        ...subject,
        group: group.group
      }));
      return [group.group, subjectList];
    }));

    // Filter subjects based on search term
    if (searchTerm) {
      const allSubjects = Array.from(groups.values()).flat();
      setFilteredSubjects(
        allSubjects.filter(subject =>
          subject.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredSubjects([]);
    }
  }, [searchTerm]);

  const isSubjectSelected = (subjectName: string) => {
    return [...strongSubjects, ...weakSubjects].some(s => 
      s.name.toLowerCase() === subjectName.toLowerCase()
    );
  };

  const isStrongSubject = (subjectName: string) => {
    return strongSubjects.some(s => s.name.toLowerCase() === subjectName.toLowerCase());
  };

  return (
    <motion.div
      key="step-subjects"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Select Subjects</h3>
          <p className="text-muted-foreground mb-4">
            Choose the subjects you want to study for your {examGoal} exam
          </p>
          
          {/* Search input */}
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for subjects" 
              className="pl-8" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 h-8 w-8" 
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Search results */}
          {searchTerm && filteredSubjects.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Search Results</h4>
              <div className="flex flex-wrap gap-2">
                {filteredSubjects.map(subject => {
                  const isSelected = isSubjectSelected(subject.name);
                  const isStrong = isStrongSubject(subject.name);
                  
                  return (
                    <Badge
                      key={subject.key}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer ${
                        isSelected 
                          ? isStrong
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-amber-600 hover:bg-amber-700" 
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => handleToggleSubject(subject, isStrong ? "strong" : "weak")}
                    >
                      {isSelected && <Check className="mr-1 h-3 w-3" />}
                      {subject.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
          
          {searchTerm && filteredSubjects.length === 0 && (
            <div className="mb-4 p-4 text-center border border-dashed rounded-md">
              <p className="text-sm text-muted-foreground">No subjects found matching "{searchTerm}"</p>
            </div>
          )}
          
          {/* Strong subjects */}
          {strongSubjects.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Strong Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {strongSubjects.map(subject => (
                  <Badge
                    key={subject.key}
                    variant="default"
                    className="cursor-pointer bg-green-600 hover:bg-green-700"
                    onClick={() => handleToggleSubject(subject, "strong")}
                  >
                    <Check className="mr-1 h-3 w-3" />
                    {subject.name}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Weak subjects */}
          {weakSubjects.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Weak Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {weakSubjects.map(subject => (
                  <Badge
                    key={subject.key}
                    variant="default"
                    className="cursor-pointer bg-amber-600 hover:bg-amber-700"
                    onClick={() => handleToggleSubject(subject, "weak")}
                  >
                    <Check className="mr-1 h-3 w-3" />
                    {subject.name}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Common subject groups */}
          {!searchTerm && (
            <div className="space-y-4">
              {suggestedSubjectGroups.map((group) => (
                <div key={group.group}>
                  <h4 className="text-sm font-medium mb-2">{group.group}</h4>
                  <div className="flex flex-wrap gap-2">
                    {convertToSubjects(group.subjects).map((subject) => {
                      const isSelected = isSubjectSelected(subject.name);
                      const isStrong = isStrongSubject(subject.name);
                      
                      return (
                        <Badge
                          key={subject.key}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer ${
                            isSelected 
                              ? isStrong
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-amber-600 hover:bg-amber-700" 
                              : "hover:bg-primary/10"
                          }`}
                          onClick={() => handleToggleSubject(subject, isStrong ? "strong" : "weak")}
                        >
                          {isSelected && <Check className="mr-1 h-3 w-3" />}
                          {subject.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StepSubjects;
