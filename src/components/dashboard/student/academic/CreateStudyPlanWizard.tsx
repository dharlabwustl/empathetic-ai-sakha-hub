import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { mapDisplayToPace, mapDisplayToTime, StudyPace, StudyPacePretty, StudyTime, StudyTimePretty } from "./studyPaceTypes";

const CreateStudyPlanWizard = () => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [examDate, setExamDate] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [pace, setPace] = useState<StudyPace>("moderate");
  const [preferredTime, setPreferredTime] = useState<StudyTime>("morning");

  const handlePaceChange = (displayPace: StudyPacePretty) => {
    setPace(mapDisplayToPace(displayPace));
  };

  const handleTimeChange = (displayTime: StudyTimePretty) => {
    setPreferredTime(mapDisplayToTime(displayTime));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle study plan submission here
    console.log("Study plan submitted:", {
      goal,
      examDate,
      subjects,
      pace,
      preferredTime,
    });
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Create Your Study Plan</CardTitle>
        <CardDescription>
          Follow these steps to create your personalized study plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={`step${step}`} className="w-full">
          {/* Step 1: Exam Goal */}
          <TabsContent value="step1" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What is your exam goal?</h3>
              <p className="text-muted-foreground">
                Select the exam you are preparing for
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal">Exam Goal</Label>
              <Input
                type="text"
                id="goal"
                placeholder="e.g., IIT-JEE"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="examDate">Exam Date</Label>
              <Input
                type="date"
                id="examDate"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
          </TabsContent>

          {/* Step 2: Select Subjects */}
          <TabsContent value="step2" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Select your subjects</h3>
              <p className="text-muted-foreground">
                Choose the subjects you want to include in your study plan
              </p>
            </div>
            <div className="space-y-2">
              <Label>Subjects</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={subjects.includes("Math") ? "default" : "outline"}
                  onClick={() =>
                    subjects.includes("Math")
                      ? setSubjects(subjects.filter((s) => s !== "Math"))
                      : setSubjects([...subjects, "Math"])
                  }
                >
                  Math
                </Button>
                <Button
                  variant={subjects.includes("Physics") ? "default" : "outline"}
                  onClick={() =>
                    subjects.includes("Physics")
                      ? setSubjects(subjects.filter((s) => s !== "Physics"))
                      : setSubjects([...subjects, "Physics"])
                  }
                >
                  Physics
                </Button>
                <Button
                  variant={subjects.includes("Chemistry") ? "default" : "outline"}
                  onClick={() =>
                    subjects.includes("Chemistry")
                      ? setSubjects(subjects.filter((s) => s !== "Chemistry"))
                      : setSubjects([...subjects, "Chemistry"])
                  }
                >
                  Chemistry
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Step 3: Study Pace */}
          <TabsContent value="step3" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Select your study pace</h3>
              <p className="text-muted-foreground">
                Choose the study pace that fits your learning style
              </p>
            </div>

            <RadioGroup
              defaultValue="Balanced"
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onValueChange={handlePaceChange}
            >
              <div className="space-y-1.5">
                <RadioGroupItem value="Relaxed" id="pace-relaxed" />
                <Label htmlFor="pace-relaxed">Relaxed</Label>
              </div>
              <div className="space-y-1.5">
                <RadioGroupItem value="Balanced" id="pace-balanced" />
                <Label htmlFor="pace-balanced">Balanced</Label>
              </div>
              <div className="space-y-1.5">
                <RadioGroupItem value="Aggressive" id="pace-aggressive" />
                <Label htmlFor="pace-aggressive">Aggressive</Label>
              </div>
            </RadioGroup>
          </TabsContent>

          {/* Step 4: Time Preferences */}
          <TabsContent value="step4" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">When do you prefer to study?</h3>
              <p className="text-muted-foreground">
                Select your preferred time of day for studying
              </p>
            </div>

            <RadioGroup
              defaultValue="Morning"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onValueChange={handleTimeChange}
            >
              <div className="space-y-1.5">
                <RadioGroupItem value="Morning" id="time-morning" />
                <Label htmlFor="time-morning">Morning</Label>
              </div>
              <div className="space-y-1.5">
                <RadioGroupItem value="Afternoon" id="time-afternoon" />
                <Label htmlFor="time-afternoon">Afternoon</Label>
              </div>
              <div className="space-y-1.5">
                <RadioGroupItem value="Evening" id="time-evening" />
                <Label htmlFor="time-evening">Evening</Label>
              </div>
              <div className="space-y-1.5">
                <RadioGroupItem value="Night" id="time-night" />
                <Label htmlFor="time-night">Night</Label>
              </div>
            </RadioGroup>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        {step < 4 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateStudyPlanWizard;
