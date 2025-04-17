
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { indianCities } from "./indianCities";
import { institutes } from "./institutes";

// Form schema with validations
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "Password must contain both letters and numbers"),
  confirmPassword: z.string(),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  otp: z.string().optional(),
  age: z.string(),
  grade: z.string(),
  location: z.string(),
  institute: z.string().optional(),
  sleepPattern: z.string().optional(),
  dailyRoutine: z.string().optional(),
  focusDuration: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface EnhancedSignupStepProps {
  onSubmit: (formValues: any) => void;
  isLoading: boolean;
}

const EnhancedSignupStep: React.FC<EnhancedSignupStepProps> = ({ onSubmit, isLoading }) => {
  const { toast } = useToast();
  const [showOtp, setShowOtp] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [locationSearch, setLocationSearch] = useState<string>('');
  
  // Set up form with validation
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      otp: "",
      age: "18", // default age
      grade: "",
      location: "",
      institute: "", 
      sleepPattern: "8",
      dailyRoutine: "",
      focusDuration: "4",
    }
  });
  
  // Handle location search input change
  const handleLocationSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationSearch(value);
    
    if (value.length > 1) {
      const filtered = indianCities
        .filter(city => city.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10); // Limit to 10 results for performance
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };
  
  // Handle location selection
  const handleLocationSelect = (location: string) => {
    form.setValue("location", location);
    setLocationSearch(location);
    setFilteredLocations([]);
  };
  
  // Handle OTP request
  const handleRequestOtp = () => {
    const mobile = form.getValues("mobile");
    if (!mobile || mobile.length < 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }
    
    setShowOtp(true);
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your mobile.",
    });
    
    // Auto-fill OTP for demo purposes
    form.setValue("otp", "1234");
  };
  
  // Handle form submission
  const handleFormSubmit = (values: SignupFormValues) => {
    onSubmit({
      ...values,
      // Transform values if needed before submitting
    });
  };
  
  // Generate options for age selection
  const ageOptions = Array.from({ length: 50 }, (_, i) => i + 10); // Ages 10-60
  
  // Grade options
  const gradeOptions = [
    "Class 9", "Class 10", "Class 11", "Class 12",
    "Undergraduate Year 1", "Undergraduate Year 2", 
    "Undergraduate Year 3", "Undergraduate Year 4",
    "Post Graduate"
  ];
  
  // Daily routine options
  const dailyRoutineOptions = [
    "Morning Person (5 AM - 10 PM)",
    "Standard (7 AM - 11 PM)",
    "Night Owl (10 AM - 2 AM)",
    "Flexible",
    "Fixed Schedule",
    "Custom"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  autoComplete="name"
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="password"
                  autoComplete="new-password"
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="password"
                  autoComplete="new-password"
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Mobile Number Field */}
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input 
                    {...field} 
                    type="tel"
                    autoComplete="tel"
                    className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleRequestOtp}
                  className="border-purple-500 text-purple-600 hover:bg-purple-50"
                >
                  Get OTP
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* OTP Field - shown only after requesting OTP */}
        {showOtp && (
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {/* Age Selection with Scrollbar */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Select your age" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {ageOptions.map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Grade Selection */}
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class/Grade</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Select your class/grade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gradeOptions.map((grade) => (
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
        
        {/* Location with Auto-suggest */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    value={locationSearch}
                    onChange={handleLocationSearchChange}
                    placeholder="Search for your city"
                    className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                  {filteredLocations.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredLocations.map((location) => (
                        <div
                          key={location}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleLocationSelect(location)}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                  <input type="hidden" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Institute Selection (Optional) */}
        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute (Optional)</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Select your institute (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {institutes.map((institute) => (
                    <SelectItem key={institute} value={institute}>
                      {institute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Sleep Pattern */}
        <FormField
          control={form.control}
          name="sleepPattern"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sleep Pattern (hours)</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Select sleep hours" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 4).map((hours) => (
                    <SelectItem key={hours} value={hours.toString()}>
                      {hours} hours
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Daily Routine */}
        <FormField
          control={form.control}
          name="dailyRoutine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Routine</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Select your daily routine" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dailyRoutineOptions.map((routine) => (
                    <SelectItem key={routine} value={routine}>
                      {routine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Focus Duration */}
        <FormField
          control={form.control}
          name="focusDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Focus Duration (hours)</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Select focus duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hours) => (
                    <SelectItem key={hours} value={hours.toString()}>
                      {hours} {hours === 1 ? 'hour' : 'hours'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-violet-700"
          disabled={isLoading || !showOtp}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        
        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default EnhancedSignupStep;
