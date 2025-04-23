
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Subject, convertToSubjects } from "../SubjectData";
import { Check, Search, X } from "lucide-react";

interface StepSubjectsProps {
  initialSubjects: Subject[];
  onSubjectsChange: (subjects: Subject[]) => void;
}

const StepSubjects: React.FC<StepSubjectsProps> = ({ initialSubjects, onSubjectsChange }) => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
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
    // Convert string arrays to Subject arrays with proper keys
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
    return subjects.some(s => s.name.toLowerCase() === subjectName.toLowerCase());
  };

  const handleToggleSubject = (subject: Subject) => {
    if (isSubjectSelected(subject.name)) {
      // Remove subject
      setSubjects(subjects.filter(s => s.name !== subject.name));
    } else {
      // Add subject
      setSubjects([...subjects, subject]);
    }
  };

  useEffect(() => {
    // Update parent component when subjects change
    onSubjectsChange(subjects);
  }, [subjects, onSubjectsChange]);

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
            Choose the subjects you want to study for your exam
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
                {filteredSubjects.map(subject => (
                  <Badge
                    key={subject.key}
                    variant={isSubjectSelected(subject.name) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      isSubjectSelected(subject.name) 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    }`}
                    onClick={() => handleToggleSubject(subject)}
                  >
                    {isSubjectSelected(subject.name) && <Check className="mr-1 h-3 w-3" />}
                    {subject.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {searchTerm && filteredSubjects.length === 0 && (
            <div className="mb-4 p-4 text-center border border-dashed rounded-md">
              <p className="text-sm text-muted-foreground">No subjects found matching "{searchTerm}"</p>
            </div>
          )}
          
          {/* Currently selected subjects */}
          {subjects.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Your Selected Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {subjects.map(subject => (
                  <Badge
                    key={subject.key}
                    variant="default"
                    className="cursor-pointer bg-primary text-primary-foreground"
                    onClick={() => handleToggleSubject(subject)}
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
                    {convertToSubjects(group.subjects).map((subject) => (
                      <Badge
                        key={subject.key}
                        variant={isSubjectSelected(subject.name) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          isSubjectSelected(subject.name) 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-primary/10"
                        }`}
                        onClick={() => handleToggleSubject(subject)}
                      >
                        {isSubjectSelected(subject.name) && <Check className="mr-1 h-3 w-3" />}
                        {subject.name}
                      </Badge>
                    ))}
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
