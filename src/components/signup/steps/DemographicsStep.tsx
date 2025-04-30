import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UserRole } from "@/types/user/base";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DemographicsStepProps {
  role: UserRole;
  goal: string;
  onSubmit: (data: Record<string, string>) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({
  role,
  goal,
  onSubmit,
}) => {
  // Calculate minimum date (today) and maximum date (3 years from now)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 3);

  // Define form schema based on role
  const formSchema = z.object({
    age: z.string().min(1, "Age is required"),
    school: z.string().min(1, "School/College name is required"),
    grade: z.string().min(1, "Grade/Year is required"),
    subject: z.string().min(1, "Preferred subject is required"),
    examDate: z.date({
      required_error: "Target exam date is required",
    }),
  });

  type FormValues = z.infer<typeof formSchema>;

  // Get default values
  const getDefaultValues = (): FormValues => {
    // Calculate default exam date (6 months from now)
    const defaultExamDate = new Date();
    defaultExamDate.setMonth(defaultExamDate.getMonth() + 6);
    
    return {
      age: "",
      school: "",
      grade: "",
      subject: "",
      examDate: defaultExamDate,
    };
  };
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    const formattedValues = {
      ...values,
      examDate: format(values.examDate, "yyyy-MM-dd"),
    };
    
    onSubmit(formattedValues as unknown as Record<string, string>);
  };

  // Options based on goal
  const getSubjectOptions = () => {
    if (goal === "IIT-JEE") {
      return ["Physics", "Chemistry", "Mathematics"];
    } else if (goal === "NEET") {
      return ["Physics", "Chemistry", "Biology"];
    } else if (goal === "UPSC") {
      return ["History", "Geography", "Political Science", "Economics", "Public Administration", "Sociology"];
    }
    return ["Mathematics", "Science", "English", "Social Studies"];
  };

  const getGradeOptions = () => {
    if (goal === "IIT-JEE" || goal === "NEET") {
      return ["11th Standard", "12th Standard", "Repeater/Drop Year"];
    } else if (goal === "UPSC") {
      return ["Bachelor's Degree", "Master's Degree", "Other"];
    }
    return ["8th Standard", "9th Standard", "10th Standard", "11th Standard", "12th Standard"];
  };

  const subjects = getSubjectOptions();
  const grades = getGradeOptions();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Tell us about yourself</h2>
        <p className="text-sm text-gray-500">We'll customize your learning experience based on your profile</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your age"
                    {...field}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School/College Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your school or college name"
                    {...field}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade/Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Select your grade or year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Subject</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Select your preferred subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="examDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold text-blue-600">Target Exam Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal border-blue-300 focus:border-blue-600 bg-blue-50/50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick your target exam date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < today}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DemographicsStep;
