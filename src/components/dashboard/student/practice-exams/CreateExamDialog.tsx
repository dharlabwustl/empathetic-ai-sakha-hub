
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileText, Lock, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  difficulty: z.enum(["easy", "medium", "hard"]),
  duration: z.string().refine((val) => !isNaN(parseInt(val)), { message: "Duration must be a number" }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Question schema
const questionSchema = z.object({
  text: z.string().min(1, { message: "Question text is required" }),
  type: z.enum(["single", "multiple", "text"]),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]).optional(),
});

type QuestionValues = z.infer<typeof questionSchema>;

interface CreateExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValues & { questions: QuestionValues[] }) => void;
}

const CreateExamDialog: React.FC<CreateExamDialogProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionValues[]>([
    { text: "", type: "single", options: ["", ""], correctAnswer: "" }
  ]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subject: "",
      topic: "",
      difficulty: "medium",
      duration: "60",
      description: "",
    },
  });
  
  const isPro = false; // This should be determined from user's subscription
  
  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", type: "single", options: ["", ""], correctAnswer: "" }]);
  };
  
  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  
  const handleQuestionChange = (index: number, field: keyof QuestionValues, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    
    // If changing the question type, reset options and correct answer
    if (field === 'type') {
      if (value === 'single' || value === 'multiple') {
        updatedQuestions[index].options = ["", ""];
        updatedQuestions[index].correctAnswer = value === 'single' ? "" : [];
      } else {
        updatedQuestions[index].options = undefined;
        updatedQuestions[index].correctAnswer = "";
      }
    }
    
    setQuestions(updatedQuestions);
  };
  
  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options = [];
    }
    updatedQuestions[questionIndex].options![optionIndex] = value;
    setQuestions(updatedQuestions);
  };
  
  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options = [];
    }
    updatedQuestions[questionIndex].options!.push("");
    setQuestions(updatedQuestions);
  };
  
  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options!.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };
  
  const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };
  
  const handleSubmitForm = (values: FormValues) => {
    if (!isPro) {
      toast({
        title: "Subscription Required",
        description: "Please upgrade to a Pro plan to create custom practice exams.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate all questions
    const invalidQuestions = questions.some(question => {
      if (!question.text) return true;
      if (question.type === 'single' || question.type === 'multiple') {
        return !question.options || 
               question.options.length < 2 || 
               question.options.some(opt => !opt) || 
               !question.correctAnswer;
      }
      return false;
    });
    
    if (invalidQuestions) {
      toast({
        title: "Incomplete Questions",
        description: "Please fill in all question details before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit({ ...values, questions });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-500" />
            Create Practice Exam
            <Badge variant="outline" className="ml-2">Pro Feature</Badge>
          </DialogTitle>
          <DialogDescription>
            Create a custom practice exam with your own questions to test specific knowledge areas.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter exam title" {...field} />
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
                      <FormControl>
                        <Input placeholder="e.g. Physics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Thermodynamics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
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
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the exam content and objectives" 
                        className="min-h-[60px]" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Questions Section */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">Questions</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddQuestion}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Question
                  </Button>
                </div>
                
                {questions.map((question, qIndex) => (
                  <div 
                    key={qIndex} 
                    className="p-4 border rounded-md space-y-4 bg-gray-50 dark:bg-gray-900/50"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Question {qIndex + 1}</h4>
                      {questions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveQuestion(qIndex)}
                          className="h-6 w-6"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* Question Text */}
                    <div>
                      <FormLabel className="text-xs">Question Text</FormLabel>
                      <Textarea
                        placeholder="Enter question"
                        className="min-h-[60px]"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                      />
                    </div>
                    
                    {/* Question Type */}
                    <div>
                      <FormLabel className="text-xs">Question Type</FormLabel>
                      <RadioGroup 
                        value={question.type} 
                        onValueChange={(value) => handleQuestionChange(qIndex, 'type', value)}
                        className="flex flex-wrap gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="single" id={`single-${qIndex}`} />
                          <FormLabel htmlFor={`single-${qIndex}`} className="text-sm font-normal">
                            Single Choice
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multiple" id={`multiple-${qIndex}`} />
                          <FormLabel htmlFor={`multiple-${qIndex}`} className="text-sm font-normal">
                            Multiple Choice
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="text" id={`text-${qIndex}`} />
                          <FormLabel htmlFor={`text-${qIndex}`} className="text-sm font-normal">
                            Text Answer
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Options for Multiple Choice Questions */}
                    {(question.type === 'single' || question.type === 'multiple') && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-xs">Answer Options</FormLabel>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddOption(qIndex)}
                            className="h-6 text-xs"
                          >
                            Add Option
                          </Button>
                        </div>
                        
                        {question.options?.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center gap-2">
                            <Input 
                              placeholder={`Option ${oIndex + 1}`}
                              value={option}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                              className="flex-grow"
                            />
                            {question.options!.length > 2 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveOption(qIndex, oIndex)}
                                className="h-8 w-8 flex-shrink-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        
                        {/* Correct Answer */}
                        <div>
                          <FormLabel className="text-xs">Correct Answer</FormLabel>
                          {question.type === 'single' ? (
                            <Select 
                              value={question.correctAnswer as string} 
                              onValueChange={(value) => handleCorrectAnswerChange(qIndex, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select correct option" />
                              </SelectTrigger>
                              <SelectContent>
                                {question.options?.map((option, oIndex) => (
                                  <SelectItem key={oIndex} value={String(oIndex)}>
                                    Option {oIndex + 1}: {option.substring(0, 20)}{option.length > 20 ? '...' : ''}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="space-y-2">
                              {question.options?.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center space-x-2">
                                  <input 
                                    type="checkbox"
                                    id={`q${qIndex}-opt${oIndex}`}
                                    className="h-4 w-4 rounded border-gray-300"
                                  />
                                  <label 
                                    htmlFor={`q${qIndex}-opt${oIndex}`}
                                    className="text-sm"
                                  >
                                    Option {oIndex + 1}: {option.substring(0, 30)}{option.length > 30 ? '...' : ''}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Text Answer */}
                    {question.type === 'text' && (
                      <div>
                        <FormLabel className="text-xs">Correct Answer (for grading reference)</FormLabel>
                        <Textarea
                          placeholder="Enter the expected answer"
                          className="min-h-[60px]"
                          value={question.correctAnswer as string || ''}
                          onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={!isPro}
                  className={`${!isPro ? "opacity-70" : ""}`}
                >
                  {!isPro && <Lock className="mr-2 h-4 w-4" />}
                  Create Practice Exam
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
        
        {!isPro && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-md">
            <p className="text-sm text-center text-amber-700 dark:text-amber-300">
              Creating custom practice exams requires a Pro subscription. 
              <Button variant="link" className="p-0 h-auto text-sm">Upgrade Now</Button>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamDialog;
