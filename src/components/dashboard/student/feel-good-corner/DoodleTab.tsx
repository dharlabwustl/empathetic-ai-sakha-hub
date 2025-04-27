
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PencilLine, Eraser, Trash2, Undo, Download, Heart } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const COLORS = [
  "#000000", // Black
  "#FF0000", // Red
  "#FF8800", // Orange
  "#FFDD00", // Yellow
  "#00CC00", // Green
  "#0099FF", // Blue
  "#6633CC", // Purple
  "#FF3399", // Pink
];

const SIZES = [2, 5, 10, 15];

type Tool = "pencil" | "eraser";

const DoodleTab = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [tool, setTool] = useState<Tool>("pencil");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize canvas context
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Set canvas to be fully transparent initially
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      setCtx(context);
    }
    
    // Set canvas dimensions based on container size
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = 300;
      
      if (context) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return;
    
    setDrawing(true);
    ctx.beginPath();
    
    // Get coordinates
    let x, y;
    if ('clientX' in e) {
      // Mouse event
      const rect = canvasRef.current.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else {
      // Touch event
      const rect = canvasRef.current.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }
    
    ctx.moveTo(x, y);
    
    // Set styles based on selected tool
    if (tool === "pencil") {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    } else {
      ctx.strokeStyle = "white";
      ctx.lineWidth = size * 2;
    }
    
    ctx.lineCap = "round";
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing || !ctx || !canvasRef.current) return;
    
    // Prevent scrolling on mobile when drawing
    if ('touches' in e) {
      e.preventDefault();
    }
    
    // Get coordinates
    let x, y;
    if ('clientX' in e) {
      // Mouse event
      const rect = canvasRef.current.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else {
      // Touch event
      const rect = canvasRef.current.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (!drawing) return;
    setDrawing(false);
    if (ctx) {
      ctx.closePath();
    }
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setSentiment(null);
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'my-doodle.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    
    toast({
      title: "Doodle Downloaded",
      description: "Your artwork has been saved to your device"
    });
  };

  const analyzeDoodle = () => {
    // Simulate AI analysis
    const emotions = [
      "Your drawing shows creative energy and optimism!",
      "I sense a calm and peaceful mood in your artwork.",
      "Your doodle suggests you're feeling playful today!",
      "There's a thoughtful quality to your drawing that shows reflection.",
      "The patterns in your art indicate a focused and determined mindset."
    ];
    
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setSentiment(randomEmotion);
    
    toast({
      title: "Doodle Analyzed",
      description: "Our AI has analyzed your drawing"
    });
  };

  return (
    <div className="space-y-4">
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardContent className="p-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {COLORS.map((c) => (
              <button 
                key={c}
                className={`w-8 h-8 rounded-full ${color === c ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => { setColor(c); setTool("pencil"); }}
              />
            ))}
          </div>
          
          <div className="flex gap-2 mb-3">
            {SIZES.map((s) => (
              <button 
                key={s}
                className={`w-8 h-8 flex items-center justify-center border ${size === s ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                onClick={() => setSize(s)}
              >
                <div 
                  className="rounded-full bg-current" 
                  style={{ width: s, height: s }} 
                />
              </button>
            ))}
            
            <Button 
              variant={tool === "pencil" ? "default" : "outline"} 
              size="sm"
              className="ml-auto"
              onClick={() => setTool("pencil")}
            >
              <PencilLine className="h-4 w-4 mr-1" />
              Draw
            </Button>
            
            <Button 
              variant={tool === "eraser" ? "default" : "outline"} 
              size="sm"
              onClick={() => setTool("eraser")}
            >
              <Eraser className="h-4 w-4 mr-1" />
              Erase
            </Button>
          </div>
          
          <div 
            className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden mb-3"
            style={{ touchAction: 'none' }}
          >
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              onMouseDown={startDrawing}
              onTouchStart={startDrawing}
              onMouseMove={draw}
              onTouchMove={draw}
              onMouseUp={endDrawing}
              onTouchEnd={endDrawing}
              onMouseLeave={endDrawing}
              className="w-full cursor-crosshair touch-none"
            />
          </div>
          
          {sentiment && (
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2">
                <Heart className="text-pink-500 h-5 w-5" />
                <h4 className="font-medium">Emotion Analysis</h4>
              </div>
              <p className="text-sm mt-1">{sentiment}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={clearCanvas}>
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={downloadCanvas}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="default" size="sm" onClick={analyzeDoodle} className="ml-auto">
              <Heart className="h-4 w-4 mr-1" />
              Analyze Emotion
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-xs text-center text-muted-foreground">
        Express yourself through art! Your doodles can be analyzed to help understand your mood.
      </p>
    </div>
  );
};

export default DoodleTab;
