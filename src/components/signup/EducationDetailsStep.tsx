
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  educationLevel: z.string().min(1, 'Please select your education level'),
  schoolName: z.string().optional(), // Optional school/institute name
  subjects: z.array(z.string()).min(1, 'Please select at least one subject'),
  targetExam: z.string().min(1, 'Please select your target exam'),
  targetScore: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EducationDetailsStepProps {
  onNext: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

const EducationDetailsStep: React.FC<EducationDetailsStepProps> = ({
  onNext,
  initialData = {},
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educationLevel: initialData.educationLevel || '',
      schoolName: initialData.schoolName || '',
      subjects: initialData.subjects || [],
      targetExam: initialData.targetExam || 'NEET',
      targetScore: initialData.targetScore || '',
    },
  });

  const subjects = [
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'biology', label: 'Biology' },
  ];

  const onSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Education Details</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Help us tailor your NEET preparation experience
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="11th">11th Grade</SelectItem>
                    <SelectItem value="12th">12th Grade</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="post_graduate">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New School/Institute Name Field (Optional) */}
          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School/Institute Name (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your school or institute name" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <FormLabel>Subjects</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject.id}
                    checked={form.watch('subjects')?.includes(subject.id)}
                    onCheckedChange={(checked) => {
                      const currentSubjects = form.watch('subjects') || [];
                      if (checked) {
                        form.setValue('subjects', [...currentSubjects, subject.id]);
                      } else {
                        form.setValue(
                          'subjects',
                          currentSubjects.filter((s) => s !== subject.id)
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={subject.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {subject.label}
                  </label>
                </div>
              ))}
            </div>
            {form.formState.errors.subjects && (
              <p className="text-sm font-medium text-red-500">
                {form.formState.errors.subjects.message}
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="targetExam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Exam</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your target exam" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NEET">NEET</SelectItem>
                    <SelectItem value="AIIMS">AIIMS</SelectItem>
                    <SelectItem value="JIPMER">JIPMER</SelectItem>
                    <SelectItem value="other">Other Medical Entrance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Score (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 650"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EducationDetailsStep;
