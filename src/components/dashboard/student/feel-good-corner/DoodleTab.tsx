
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilLine, Check, X, Undo } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const DoodleTab: React.FC = () => {
  const { toast } = useToast();
  const [showDoodleCanvas, setShowDoodleCanvas] = useState(false);
  
  // Canvas state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  useEffect(() => {
    if (showDoodleCanvas && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveDrawingState();
      }
    }
  }, [showDoodleCanvas]);
  
  const saveDrawingState = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // If we're not at the end of the history, truncate it
        if (historyIndex < drawingHistory.length - 1) {
          setDrawingHistory(prev => prev.slice(0, historyIndex + 1));
        }
        
        setDrawingHistory(prev => [...prev, currentState]);
        setHistoryIndex(prev => prev + 1);
      }
    }
  };
  
  const undoDrawing = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const newIndex = historyIndex - 1;
      
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.putImageData(drawingHistory[newIndex], 0, 0);
        }
      }
    }
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = drawingColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling while drawing
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const endDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveDrawingState();
    }
  };
  
  const clearCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveDrawingState();
    }
  };
  
  const handleShareDoodle = () => {
    if (!canvasRef.current) return;
    
    toast({
      title: "Doodle shared!",
      description: "Your masterpiece has been shared with the community.",
    });
    
    setShowDoodleCanvas(false);
  };
  
  return (
    <motion.div 
      key="doodle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {!showDoodleCanvas ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Express Yourself</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setShowDoodleCanvas(true)}
            >
              Create New
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-white/50">
            <PencilLine size={48} className="text-gray-300 mb-4" />
            <p className="text-center text-gray-500">
              Create your own doodle to express yourself<br />
              or just have fun taking a creative break!
            </p>
            <Button 
              onClick={() => setShowDoodleCanvas(true)}
              className="mt-4 bg-violet-600"
            >
              Start Doodling
            </Button>
          </div>
          <p className="text-xs text-center text-gray-500">
            Express yourself through doodles - it's great for stress relief!
          </p>
        </>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Create Your Doodle</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowDoodleCanvas(false)}
            >
              Cancel
            </Button>
          </div>
          <div className="flex justify-center gap-2 mb-2">
            {['#000000', '#FF0000', '#0000FF', '#008000', '#FFA500', '#800080'].map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full cursor-pointer ${drawingColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setDrawingColor(color)}
              />
            ))}
          </div>
          <div className="border rounded-md bg-white flex items-center justify-center">
            <canvas 
              ref={canvasRef} 
              width={300} 
              height={250} 
              className="border cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
            />
          </div>
          <div className="flex justify-between">
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearCanvas}
              >
                <X size={14} className="mr-1" /> Clear
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={undoDrawing}
                disabled={historyIndex <= 0}
              >
                <Undo size={14} className="mr-1" /> Undo
              </Button>
            </div>
            <Button 
              className="bg-violet-600" 
              size="sm"
              onClick={handleShareDoodle}
            >
              <Check size={14} className="mr-1" /> Share Doodle
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DoodleTab;
