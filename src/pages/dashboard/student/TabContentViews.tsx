
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Bookmark, Share, CheckCircle, Image, AudioLines, FileText, Video, BarChart, BookOpen } from "lucide-react";

export const MicroConceptView = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [mediaType, setMediaType] = useState<"text" | "image" | "audio" | "video" | "analysis">("text");
  
  const conceptCards = [
    {
      id: 1,
      title: "Thermodynamics: First Law",
      description: "Understanding energy conservation in thermodynamic systems",
      subject: "Physics",
      difficulty: "Medium",
      timeToComplete: "5 mins",
      content: {
        text: "The first law of thermodynamics states that energy cannot be created or destroyed in an isolated system. The change in internal energy of a system equals the heat added to the system minus the work done by the system: ΔU = Q - W.",
        image: "/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png",
        audio: "#",
        video: "#",
        analysis: "This concept is fundamental to understanding energy transfer in physical systems and appears in 65% of exams. Focus on applying this principle to different scenarios."
      },
      isCompleted: false,
    },
    {
      id: 2,
      title: "Organic Chemistry: Functional Groups",
      description: "Identifying and naming organic functional groups",
      subject: "Chemistry",
      difficulty: "Hard",
      timeToComplete: "8 mins",
      content: {
        text: "Functional groups are specific groups of atoms within organic molecules that are responsible for the characteristic chemical reactions of those molecules. Common examples include alcohols (-OH), aldehydes (-CHO), ketones (C=O), and carboxylic acids (-COOH).",
        image: "/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png",
        audio: "#",
        video: "#",
        analysis: "Functional groups appear in approximately 80% of organic chemistry questions. Focus on recognition and reactivity patterns."
      },
      isCompleted: false,
    },
    {
      id: 3,
      title: "Calculus: Integration Techniques",
      description: "Advanced methods for solving integrals",
      subject: "Mathematics",
      difficulty: "Advanced",
      timeToComplete: "10 mins",
      content: {
        text: "Integration techniques include substitution, integration by parts, partial fractions, and trigonometric substitution. Each method is suitable for different types of integrals and understanding when to apply which technique is crucial for solving complex problems.",
        image: "/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png",
        audio: "#",
        video: "#",
        analysis: "Integration appears in approximately 70% of advanced mathematics exams. These techniques are especially important for solving differential equations."
      },
      isCompleted: true,
    },
  ];
  
  const totalCards = conceptCards.length;
  const currentCard = conceptCards[currentCardIndex];
  
  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % totalCards);
    setMediaType("text");
  };
  
  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
    setMediaType("text");
  };
  
  const renderMediaContent = () => {
    switch (mediaType) {
      case "text":
        return (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>{currentCard.content.text}</p>
          </div>
        );
      case "image":
        return (
          <div className="flex justify-center">
            <img 
              src={currentCard.content.image} 
              alt={currentCard.title} 
              className="max-h-72 object-contain rounded-lg" 
            />
          </div>
        );
      case "audio":
        return (
          <div className="flex justify-center p-4">
            <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center">
              <AudioLines size={48} className="text-indigo-600 dark:text-indigo-400 mb-2" />
              <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                Audio explanation available
              </p>
              <Button variant="default" size="sm" className="mt-3">
                <Play size={16} className="mr-2" /> Play Audio
              </Button>
            </div>
          </div>
        );
      case "video":
        return (
          <div className="flex justify-center p-4">
            <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center">
              <Video size={48} className="text-indigo-600 dark:text-indigo-400 mb-2" />
              <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                Video explanation available
              </p>
              <Button variant="default" size="sm" className="mt-3">
                <Play size={16} className="mr-2" /> Play Video
              </Button>
            </div>
          </div>
        );
      case "analysis":
        return (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h4 className="text-blue-800 dark:text-blue-300 flex items-center mb-2">
                <BarChart size={16} className="mr-2" /> Concept Analysis
              </h4>
              <p className="text-blue-700 dark:text-blue-200">{currentCard.content.analysis}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <BookOpen className="mr-2 text-indigo-600" size={24} />
          Concept Cards
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {currentCardIndex + 1} of {totalCards}
        </div>
      </div>
      
      <Progress value={(currentCardIndex + 1) / totalCards * 100} className="h-2" />
      
      <div className="relative">
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hidden sm:flex"
          onClick={prevCard}
          disabled={currentCardIndex === 0}
        >
          <ChevronLeft size={18} />
        </Button>
        
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-indigo-100 dark:border-indigo-900/40 shadow-lg overflow-hidden bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-800 dark:to-indigo-900/20">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{currentCard.title}</CardTitle>
                  <CardDescription className="text-indigo-100">{currentCard.description}</CardDescription>
                </div>
                {currentCard.isCompleted && (
                  <Badge variant="outline" className="bg-green-500/20 text-green-100 border-green-300">
                    <CheckCircle size={14} className="mr-1" /> Completed
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2 mt-3">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {currentCard.subject}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {currentCard.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {currentCard.timeToComplete}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6 pb-4">
              <Tabs defaultValue="text" value={mediaType} onValueChange={(value) => setMediaType(value as any)}>
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="text" className="flex items-center gap-1">
                    <FileText size={14} /> Text
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center gap-1">
                    <Image size={14} /> Image
                  </TabsTrigger>
                  <TabsTrigger value="audio" className="flex items-center gap-1">
                    <AudioLines size={14} /> Audio
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-1">
                    <Video size={14} /> Video
                  </TabsTrigger>
                  <TabsTrigger value="analysis" className="flex items-center gap-1">
                    <BarChart size={14} /> Analysis
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value={mediaType} className="min-h-[200px]">
                  {renderMediaContent()}
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 pt-3 pb-3 flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark size={16} className="mr-1" /> Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share size={16} className="mr-1" /> Share
                </Button>
              </div>
              <Button 
                variant={currentCardIndex < totalCards - 1 ? "default" : "secondary"}
                size="sm" 
                onClick={nextCard}
                className={currentCardIndex < totalCards - 1 ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" : ""}
              >
                {currentCardIndex < totalCards - 1 ? "Next Concept" : "Review All"}
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hidden sm:flex"
          onClick={nextCard}
        >
          <ChevronRight size={18} />
        </Button>
      </div>
      
      <div className="flex justify-center gap-1 mt-4">
        {conceptCards.map((_, index) => (
          <Button 
            key={index} 
            variant="ghost" 
            size="icon" 
            className={`w-2 h-2 p-0 rounded-full ${currentCardIndex === index ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            onClick={() => {
              setCurrentCardIndex(index);
              setMediaType("text");
            }}
          />
        ))}
      </div>
      
      <div className="flex justify-between mt-6 sm:hidden">
        <Button 
          variant="outline" 
          onClick={prevCard}
          disabled={currentCardIndex === 0}
        >
          <ChevronLeft size={18} className="mr-1" /> Previous
        </Button>
        <Button 
          variant="outline"
          onClick={nextCard}
        >
          Next <ChevronRight size={18} className="ml-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export const FlashcardsView = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium">Flashcards</h2>
      {/* Flashcards content will go here */}
    </div>
  );
};

export const PracticeExamsView = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium">Practice Exams</h2>
      {/* Practice Exams content will go here */}
    </div>
  );
};
