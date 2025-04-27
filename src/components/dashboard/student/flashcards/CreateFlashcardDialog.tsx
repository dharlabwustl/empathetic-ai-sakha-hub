
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
import { Brain, Lock, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Form validation schema
const formSchema = z.object({
  deckName: z.string().min(3, { message: "Deck name must be at least 3 characters" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.string().optional(),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Card schema for individual flashcards
const cardSchema = z.object({
  front: z.string().min(1, { message: "Front content is required" }),
  back: z.string().min(1, { message: "Back content is required" }),
});

type CardValues = z.infer<typeof cardSchema>;

interface CreateFlashcardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValues & { cards: CardValues[] }) => void;
}

const CreateFlashcardDialog: React.FC<CreateFlashcardDialogProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const { toast } = useToast();
  const [cards, setCards] = useState<CardValues[]>([
    { front: "", back: "" }
  ]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deckName: "",
      subject: "",
      topic: "",
      difficulty: "medium",
      tags: "",
      description: "",
    },
  });
  
  const isPro = false; // This should be determined from user's subscription
  
  const handleAddCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };
  
  const handleRemoveCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };
  
  const handleCardChange = (index: number, field: keyof CardValues, value: string) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };
  
  const handleSubmit = (values: FormValues) => {
    if (!isPro) {
      toast({
        title: "Subscription Required",
        description: "Please upgrade to a Pro plan to create custom flashcard decks.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate all cards
    const invalidCards = cards.some(card => !card.front || !card.back);
    if (invalidCards) {
      toast({
        title: "Incomplete Cards",
        description: "Please fill in all flashcard content before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit({ ...values, cards });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Create New Flashcard Deck
            <Badge variant="outline" className="ml-2">Pro Feature</Badge>
          </DialogTitle>
          <DialogDescription>
            Create a personalized flashcard deck for your study sessions. Add as many cards as you need.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="deckName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deck Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter deck name" {...field} />
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
                        <Input placeholder="e.g. Quantum Mechanics" {...field} />
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
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. JEE, Important" {...field} />
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
                        placeholder="Briefly describe this flashcard deck" 
                        className="min-h-[60px]" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">Flashcards</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddCard}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Card
                  </Button>
                </div>
                
                {cards.map((card, index) => (
                  <div key={index} className="p-4 border rounded-md space-y-3 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Card {index + 1}</h4>
                      {cards.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveCard(index)}
                          className="h-6 w-6"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <FormLabel className="text-xs">Front Side</FormLabel>
                        <Textarea
                          placeholder="Enter question or term"
                          className="min-h-[60px]"
                          value={card.front}
                          onChange={(e) => handleCardChange(index, 'front', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <FormLabel className="text-xs">Back Side</FormLabel>
                        <Textarea
                          placeholder="Enter answer or definition"
                          className="min-h-[60px]"
                          value={card.back}
                          onChange={(e) => handleCardChange(index, 'back', e.target.value)}
                        />
                      </div>
                    </div>
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
                  Create Flashcard Deck
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
        
        {!isPro && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-md">
            <p className="text-sm text-center text-blue-700 dark:text-blue-300">
              Creating custom flashcards requires a Pro subscription. 
              <Button variant="link" className="p-0 h-auto text-sm">Upgrade Now</Button>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateFlashcardDialog;
