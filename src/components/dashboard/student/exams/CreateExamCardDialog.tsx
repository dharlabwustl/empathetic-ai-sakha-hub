
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Check } from 'lucide-react';
import { SubscriptionType } from '@/types/user/subscription';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  subject: z.string().min(1, { message: 'Please select a subject' }),
  difficulty: z.string().min(1, { message: 'Please select a difficulty level' }),
});

interface CreateExamCardDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateExam: (data: any) => void;
  userSubscription: SubscriptionType | { planType: string };
  remainingExams: number;
}

export const CreateExamCardDialog: React.FC<CreateExamCardDialogProps> = ({
  open,
  onClose,
  onCreateExam,
  userSubscription,
  remainingExams,
}) => {
  const [isCreating, setIsCreating] = useState(false);

  // Check if user is on free plan
  const isFreePlan = userSubscription === SubscriptionType.FREE || 
    (typeof userSubscription === 'object' && userSubscription.planType === SubscriptionType.FREE);

  // Check if user has remaining exams
  const hasRemainingExams = remainingExams > 0;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      subject: '',
      difficulty: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsCreating(true);
    setTimeout(() => {
      onCreateExam(data);
      setIsCreating(false);
      form.reset();
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Practice Exam</DialogTitle>
          <DialogDescription>
            Create a custom practice exam based on your preparation needs.
          </DialogDescription>
        </DialogHeader>

        {isFreePlan && !hasRemainingExams ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Limit Reached</AlertTitle>
            <AlertDescription>
              You've used all your free practice exams. Upgrade your plan to access unlimited exams.
            </AlertDescription>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={onClose}>
                Close
              </Button>
              <Button className="w-full mt-2" onClick={() => window.location.href = '/dashboard/student/subscription'}>
                Upgrade Now
              </Button>
            </div>
          </Alert>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {isFreePlan && (
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertDescription>
                    You have {remainingExams} free practice {remainingExams === 1 ? 'exam' : 'exams'} remaining this month.
                  </AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Physics Chapter 1 Review" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe what this exam will cover..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="sm:justify-end">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Exam'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamCardDialog;
