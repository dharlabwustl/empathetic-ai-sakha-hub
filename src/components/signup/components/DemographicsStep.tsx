
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FormField, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UserOnboardingFormData } from '../types';

const formSchema = z.object({
  age: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Age must be a valid number",
  }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  educationLevel: z.string().min(1, { message: "Please select an education level" }),
  institute: z.string().optional(),
});

interface DemographicsStepProps {
  formData: UserOnboardingFormData;
  updateFormData: (data: Partial<UserOnboardingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DemographicsStep({ formData, updateFormData, onNext, onBack }: DemographicsStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: formData.demographics?.age?.toString() || "",
      gender: formData.demographics?.gender || "",
      educationLevel: formData.demographics?.educationLevel || "",
      institute: formData.demographics?.institute || "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    updateFormData({
      demographics: {
        age: parseInt(data.age),
        gender: data.gender,
        educationLevel: data.educationLevel,
        institute: data.institute,
      }
    });
    onNext();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tell us about yourself</h2>
        <p className="text-muted-foreground mt-2">
          This helps us personalize your learning experience
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <div className="space-y-2">
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your age"
                    {...field}
                    type="number"
                    min="1"
                    max="100"
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <div className="space-y-2">
                <FormLabel>Gender</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <div className="space-y-2">
                <FormLabel>Education Level</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>School</SelectLabel>
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>College</SelectLabel>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Other</SelectLabel>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            )}
          />
          
          <FormField
            control={form.control}
            name="institute"
            render={({ field }) => (
              <div className="space-y-2">
                <FormLabel>Institute Name (Optional)</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your institute (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Popular Institutes</SelectLabel>
                      <SelectItem value="allen">Allen Career Institute</SelectItem>
                      <SelectItem value="fiitjee">FIITJEE</SelectItem>
                      <SelectItem value="aakash">Aakash Institute</SelectItem>
                      <SelectItem value="resonance">Resonance</SelectItem>
                      <SelectItem value="vibrant">Vibrant Academy</SelectItem>
                      <SelectItem value="pace">PACE IIT & Medical</SelectItem>
                    </SelectGroup>
                    <SelectItem value="other">Other Institute</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
