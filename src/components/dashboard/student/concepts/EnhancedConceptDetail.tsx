
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, BookOpen, FileText, Brain, MessageSquare, Star, BookmarkPlus, Lightbulb, Info } from 'lucide-react';

interface ConceptDetailProps {
  conceptId: string;
  title?: string;
  subject?: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  content?: string;
}

const EnhancedConceptDetail: React.FC<ConceptDetailProps> = ({
  conceptId,
  title = "Understanding Cell Division",
  subject = "Biology",
  topic = "Cell Biology",
  difficulty = "medium",
  content = "Cell division is the process by which a parent cell divides into two or more daughter cells. Cell division usually occurs as part of a larger cell cycle. In eukaryotes, there are two distinct types of cell division: mitosis and meiosis."
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookmarked, setBookmarked] = useState(false);
  const [showAIInsight, setShowAIInsight] = useState(false);

  // Difficulty color mapping
  const difficultyColor = {
    easy: "text-green-500",
    medium: "text-yellow-500",
    hard: "text-red-500"
  };

  // Simulate connected concepts
  const relatedConcepts = [
    { id: "c1", title: "Mitosis", subject: "Biology" },
    { id: "c2", title: "Meiosis", subject: "Biology" },
    { id: "c3", title: "Cell Cycle", subject: "Biology" }
  ];

  // Simulate flashcards related to concept
  const relatedFlashcards = [
    { id: "f1", front: "What are the main stages of mitosis?", back: "Prophase, Metaphase, Anaphase, Telophase" },
    { id: "f2", front: "What is the purpose of cell division?", back: "Growth, repair, reproduction" }
  ];

  // Simulate formulas related to concept
  const relatedFormulas = [
    { id: "form1", name: "Cell Division Rate", formula: "Rate = N₀ × 2^(t/g)", description: "Where N₀ is initial number of cells, t is time, g is generation time" }
  ];

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const toggleAIInsight = () => {
    setShowAIInsight(!showAIInsight);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2.5 py-0.5 rounded text-sm">
                  {subject}
                </span>
                <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2.5 py-0.5 rounded text-sm">
                  {topic}
                </span>
                <span className={`${difficultyColor[difficulty]} bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded text-sm`}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={toggleBookmark}
              >
                <BookmarkPlus className={`mr-1 h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="default" size="sm">
                <Check className="mr-1 h-4 w-4" />
                Mark as Learned
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <TabsList className="flex bg-transparent p-0">
              <TabsTrigger 
                value="overview" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
              <TabsTrigger 
                value="flashcards" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <Brain className="h-4 w-4 mr-2" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger 
                value="ai-insights" 
                className="flex-1 py-3 px-4 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                AI Insights
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview tab */}
          <TabsContent value="overview" className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="prose dark:prose-invert max-w-none">
                <h3>Concept Explanation</h3>
                <p>{content}</p>
                <p>
                  Cell division is necessary for the growth of organisms, tissue repair, and reproduction. 
                  The process ensures the continuity of life from one generation to the next.
                </p>
                
                <h4>Key Points:</h4>
                <ul>
                  <li>Cell division results in genetically identical daughter cells</li>
                  <li>Mitosis is for growth and repair, meiosis is for sexual reproduction</li>
                  <li>The cell cycle has distinct phases: G1, S, G2, and M phase</li>
                </ul>
                
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="mt-4"
                  onClick={toggleAIInsight}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Get AI explanation
                </Button>
                
                {showAIInsight && (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      <h5 className="font-medium text-yellow-700 dark:text-yellow-300">Sakha AI Explanation</h5>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Think of cell division like a book being copied. The original book (parent cell) 
                      makes copies of all its pages (DNA replication) and then separates into two 
                      complete books (daughter cells). This happens so more books can be added to the 
                      library (growth), damaged books can be replaced (repair), or new libraries can 
                      be started (reproduction).
                    </p>
                  </div>
                )}
              </div>

              {/* Related formulas */}
              {relatedFormulas.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">Related Formulas</h3>
                  {relatedFormulas.map(formula => (
                    <Card key={formula.id} className="mb-4">
                      <CardHeader className="py-3">
                        <CardTitle className="text-md">{formula.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md font-mono text-center">
                          {formula.formula}
                        </div>
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{formula.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Related concepts */}
              {relatedConcepts.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">Related Concepts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedConcepts.map(concept => (
                      <Card key={concept.id} className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader className="py-3">
                          <CardTitle className="text-md">{concept.title}</CardTitle>
                          <CardDescription>{concept.subject}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Notes tab */}
          <TabsContent value="notes" className="p-6">
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
                <p className="italic text-gray-600 dark:text-gray-400">Your notes will appear here. Start taking notes about this concept.</p>
              </div>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-2">
                <textarea 
                  className="w-full min-h-[150px] bg-transparent outline-none resize-none p-2" 
                  placeholder="Take notes about this concept..."
                />
                <div className="flex justify-end p-2 border-t border-gray-300 dark:border-gray-600">
                  <Button size="sm">Save Notes</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Flashcards tab */}
          <TabsContent value="flashcards" className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Study with Flashcards</h3>
                <Button size="sm">Create Flashcard</Button>
              </div>
              
              {relatedFlashcards.map((flashcard, index) => (
                <Card key={flashcard.id} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">Card {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-4">
                      <p className="font-medium">{flashcard.front}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                      <p>{flashcard.back}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 py-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="default">Review</Button>
                  </CardFooter>
                </Card>
              ))}
              
              {relatedFlashcards.length === 0 && (
                <div className="text-center p-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <Info className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">No flashcards have been created for this concept yet.</p>
                  <Button className="mt-4">Create your first flashcard</Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* AI Insights tab */}
          <TabsContent value="ai-insights" className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <h3 className="text-lg font-medium">AI Learning Insights</h3>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Learning Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Create a visual diagram of the cell cycle to better understand the sequence of events</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Connect this concept to DNA replication to understand how genetic material is preserved</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Practice explaining the difference between mitosis and meiosis in your own words</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Common Misconceptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Cell division always results in identical cells</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">While mitosis produces genetically identical cells, meiosis produces genetically diverse cells.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">All cells divide at the same rate</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Different cell types have different division rates; some cells like neurons rarely divide.</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  <h4 className="font-medium text-purple-700 dark:text-purple-300">Ask Sakha AI Tutor</h4>
                </div>
                <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                  Have a specific question about cell division? Ask our AI tutor for help!
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your question here..."
                    className="flex-1 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  />
                  <Button>Ask</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
