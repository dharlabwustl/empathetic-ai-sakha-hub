
import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Smile, Brush, Send, Sparkles, Lightbulb, Trash2 } from 'lucide-react';

const FeelGoodCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('teaser');
  const [answer, setAnswer] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentColor, setCurrentColor] = useState<string>('#000000');

  // Mock teaser questions
  const teasers = [
    { id: '1', question: "What has a head and a tail, but no body?", answer: "A coin" },
    { id: '2', question: "I'm tall when I'm young, and I'm short when I'm old. What am I?", answer: "A candle" },
    { id: '3', question: "What is full of holes but still holds water?", answer: "A sponge" }
  ];
  const [currentTeaser, setCurrentTeaser] = useState(teasers[0]);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Initialize canvas
  React.useEffect(() => {
    if (activeTab === 'doodle' && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        setCanvasContext(context);
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = currentColor;
      }
    }
  }, [activeTab, currentColor]);
  
  // Mouse events for drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (canvasContext) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        canvasContext.beginPath();
        canvasContext.moveTo(x, y);
      }
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasContext) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      canvasContext.lineTo(x, y);
      canvasContext.stroke();
    }
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasContext) {
      canvasContext.closePath();
    }
  };
  
  const clearCanvas = () => {
    if (canvasRef.current && canvasContext) {
      canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };
  
  const shareDrawing = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // Here we would typically upload the canvas data to a server
      // For now, we'll just log that it was shared
      console.log("Drawing shared:", canvas.toDataURL());
      alert("Your doodle has been shared! Our system will analyze it to understand your emotional state.");
    }
  };
  
  const colors = ['#000000', '#e53e3e', '#3182ce', '#38a169', '#805ad5', '#d69e2e'];

  const handleTeaserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === currentTeaser.answer.toLowerCase()) {
      alert("Correct! Well done!");
    } else {
      alert("Not quite right. Try again or check the answer!");
    }
  };
  
  const getNewTeaser = () => {
    const newTeaser = teasers[Math.floor(Math.random() * teasers.length)];
    setCurrentTeaser(newTeaser);
    setShowAnswer(false);
    setAnswer('');
  };

  return (
    <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-100/50 dark:border-pink-800/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Smile className="text-pink-500" size={20} />
            Feel Good Corner
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="teaser" className="flex gap-2 items-center">
              <Sparkles size={16} />
              Brain Teasers
            </TabsTrigger>
            <TabsTrigger value="doodle" className="flex gap-2 items-center">
              <Brush size={16} />
              Emotion Doodles
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="teaser">
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                  <Lightbulb className="text-amber-500" size={18} />
                  Today's Brain Teaser
                </h3>
                <p className="mb-4">{currentTeaser.question}</p>
                
                <form onSubmit={handleTeaserSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <Input 
                      type="text" 
                      placeholder="Your answer..." 
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Send size={16} />
                      <span className="sr-only">Submit Answer</span>
                    </Button>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="link" 
                      size="sm"
                      onClick={() => setShowAnswer(!showAnswer)}
                    >
                      {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={getNewTeaser}
                    >
                      New Teaser
                    </Button>
                  </div>
                </form>
                
                {showAnswer && (
                  <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-100 dark:border-amber-700/30">
                    <p className="font-medium">Answer: {currentTeaser.answer}</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="doodle">
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Express Your Emotions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Draw how you feel today. Our system will analyze your doodle to understand your emotional state.
                </p>
                
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                  <canvas 
                    ref={canvasRef}
                    width={500}
                    height={300}
                    className="w-full cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  ></canvas>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded-full ${color === currentColor ? 'ring-2 ring-offset-2 ring-indigo-300' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setCurrentColor(color);
                          if (canvasContext) canvasContext.strokeStyle = color;
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearCanvas}
                      className="flex gap-1 items-center"
                    >
                      <Trash2 size={14} />
                      Clear
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={shareDrawing}
                      className="flex gap-1 items-center"
                    >
                      <Send size={14} />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeelGoodCorner;
