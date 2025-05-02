
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Quote {
  id: string;
  text: string;
  author: string;
  source?: string;
  category: string;
  image?: string;
}

const quotes: Quote[] = [
  {
    id: "1",
    text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    author: "Steve Jobs",
    category: "Success",
    image: "/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png"
  },
  {
    id: "2",
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    category: "Education",
    image: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png"
  },
  {
    id: "3",
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Perseverance",
    image: "/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png"
  },
  {
    id: "4",
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    category: "Learning",
    image: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png"
  },
  {
    id: "5",
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
    category: "Learning",
    image: "/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png"
  },
  {
    id: "6",
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    category: "Success",
    image: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png"
  },
  {
    id: "7",
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Motivation",
    image: "/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png"
  },
  {
    id: "8",
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "Life",
    image: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png"
  },
  {
    id: "9",
    text: "Failure is the opportunity to begin again more intelligently.",
    author: "Henry Ford",
    category: "Failure",
    image: "/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png"
  }
];

const MotivationalQuotes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeQuote, setActiveQuote] = useState<Quote | null>(quotes[0]);
  const [displayMode, setDisplayMode] = useState<"grid" | "carousel">("grid");
  
  const categories = ["all", ...Array.from(new Set(quotes.map(q => q.category)))];
  
  const filteredQuotes = selectedCategory === "all" 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);
    
  const handleRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    setActiveQuote(filteredQuotes[randomIndex]);
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Inspirational Quotes</h3>
        <div className="flex gap-2 items-center">
          <Tabs value={displayMode} onValueChange={(v) => setDisplayMode(v as "grid" | "carousel")}>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="carousel">Carousel</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {displayMode === "carousel" && activeQuote && (
        <Card className="overflow-hidden bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-0">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={activeQuote.image} />
                <AvatarFallback>{activeQuote.author.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{activeQuote.author}</h4>
                <Badge variant="outline" className="font-normal">
                  {activeQuote.category}
                </Badge>
              </div>
            </div>
            
            <blockquote className="text-xl italic font-medium">
              "{activeQuote.text}"
            </blockquote>
            
            <div className="flex justify-center">
              <Button onClick={handleRandomQuote}>
                Next Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {displayMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuotes.map(quote => (
            <Card key={quote.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={quote.image} />
                    <AvatarFallback>{quote.author.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium">{quote.author}</span>
                    <Badge variant="outline" className="font-normal">
                      {quote.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm italic">"{quote.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MotivationalQuotes;
