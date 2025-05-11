
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Markdown from 'react-markdown';
import signupDatabaseMapping from '@/documentation/SignupDatabaseMapping';

const SignupDatabaseMappingViewer: React.FC = () => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="text-xl font-semibold">Signup Flow - Database Mapping</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="documentation" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="implementation">Implementation Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="documentation" className="p-4">
            <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
              <div className="prose dark:prose-invert max-w-none">
                <Markdown>{signupDatabaseMapping}</Markdown>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="implementation" className="p-4">
            <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Step-by-Step Integration Guide</h3>
                  <p className="text-muted-foreground mt-2">
                    Follow these steps to integrate the frontend signup flow with the backend database:
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">1. Data Collection</h4>
                  <p>Use the OnboardingContext to collect and store data across all steps:</p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm overflow-auto">
                    {`const { onboardingData, setOnboardingData } = useOnboarding();

// When collecting data at each step
setOnboardingData({ 
  ...onboardingData, 
  newField: value 
});`}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">2. API Integration</h4>
                  <p>Use the following code pattern in the final signup step:</p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm overflow-auto">
                    {`const handleSignupSubmit = async () => {
  try {
    // Format data according to API requirements
    const userData = {
      name: onboardingData.name,
      email: \`\${formValues.mobile}@prepzr.com\`, // or directly from form
      phoneNumber: formValues.mobile,
      password: formValues.password,
      role: onboardingData.role || 'student',
      // Include other collected data as needed
      preferences: {
        examGoal: onboardingData.examGoal,
        studyPace: onboardingData.studyPace,
        // etc...
      }
    };
    
    // Call API endpoint
    const response = await authService.register(userData);
    
    if (response.success) {
      // Handle successful signup
      localStorage.setItem("userData", JSON.stringify({...}));
      navigate("/dashboard/student?new=true");
    }
  } catch (error) {
    // Handle errors
  }
};`}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">3. Data Validation</h4>
                  <p>Validate data before submission to ensure it matches the expected formats:</p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm overflow-auto">
                    {`// Example validation functions
const validateDemographics = (data) => {
  const errors = {};
  if (!data.age || data.age < 13 || data.age > 80) {
    errors.age = "Please enter a valid age between 13 and 80";
  }
  // More validations...
  return { isValid: Object.keys(errors).length === 0, errors };
};`}
                  </pre>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SignupDatabaseMappingViewer;
