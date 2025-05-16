
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import authService from '@/services/auth/authService';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Form schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  grade: z.string().min(1, "Please select your grade"),
  school: z.string().optional(), // School is optional
  subjects: z.array(z.string()).optional() // Subjects are optional
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onBack }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  // Form setup
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      grade: "",
      school: "",
      subjects: []
    }
  });
  
  const handleSubmit = async (data: SignupFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Include the selected subjects in the form data
      const formData = {
        ...data,
        subjects: selectedSubjects
      };
      
      console.log("Submitting signup form:", formData);
      
      // Register the user
      const response = await authService.register({
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        password: data.password,
        school: data.school
      });
      
      if (response.success) {
        // Set the new user flag for welcome tour
        localStorage.setItem('new_user_signup', 'true');
        
        // Store grade and subjects in user preferences
        localStorage.setItem('user_preferences', JSON.stringify({
          grade: data.grade,
          subjects: selectedSubjects,
          school: data.school
        }));
        
        toast({
          title: "Account created successfully!",
          description: "Welcome to PREPZR! Let's set up your study plan.",
        });
        
        // Redirect or continue onboarding
        onSuccess();
      } else {
        throw new Error(response.error || "Failed to register");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: (error as Error).message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
    
    // Update form value
    form.setValue('subjects', selectedSubjects);
  };
  
  const neetSubjects = [
    "Physics",
    "Chemistry",
    "Biology",
    "Botany",
    "Zoology"
  ];
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Your phone number" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="11">11th Grade (First Year)</SelectItem>
                  <SelectItem value="12">12th Grade (Second Year)</SelectItem>
                  <SelectItem value="dropper">Dropper</SelectItem>
                  <SelectItem value="repeater">Repeater</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School/Institute Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your school or coaching institute name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <Label>NEET Subjects</Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {neetSubjects.map(subject => (
              <div
                key={subject}
                className={`px-4 py-2 border rounded-md cursor-pointer transition-all ${
                  selectedSubjects.includes(subject) 
                    ? 'bg-indigo-100 border-indigo-500 dark:bg-indigo-900/30 dark:border-indigo-400' 
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                }`}
                onClick={() => toggleSubject(subject)}
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
          
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
