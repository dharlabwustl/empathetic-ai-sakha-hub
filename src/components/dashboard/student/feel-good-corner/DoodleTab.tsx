
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PencilLine, Eraser, Trash2, Download } from "lucide-react";

const colorOptions = [
  "#000000", // black
  "#ED5564", // red
  "#FFCE54", // yellow
  "#A0D568", // green
  "#4FC1E8", // blue
  "#AC92EB", // purple
  "#FFFFFF", // white
];

const DoodleTab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set white background
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setCtx(context);
    
    // Handle resize
    const handleResize = () => {
      if (!canvas || !context) return;
      
      // Save current drawing
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      // Resize canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Restore white background
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Restore drawing
      context.putImageData(imageData, 0, 0);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    setIsDrawing(true);
    
    // Get position
    const pos = getEventPosition(e);
    if (!pos) return;
    
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    
    // Get position
    const pos = getEventPosition(e);
    if (!pos) return;
    
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    if (!ctx) return;
    setIsDrawing(false);
    ctx.closePath();
  };
  
  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return null;
    
    const rect = canvasRef.current.getBoundingClientRect();
    
    let x, y;
    
    if ('touches' in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    return { x, y };
  };
  
  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  
  const downloadDrawing = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'sakha-doodle.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Button
            variant={tool === 'pencil' ? "default" : "outline"}
            size="icon"
            className={tool === 'pencil' ? "bg-violet-500 hover:bg-violet-600" : ""}
            onClick={() => setTool('pencil')}
          >
            <PencilLine className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === 'eraser' ? "default" : "outline"}
            size="icon"
            className={tool === 'eraser' ? "bg-violet-500 hover:bg-violet-600" : ""}
            onClick={() => setTool('eraser')}
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <div className="h-6 border-r border-gray-300 dark:border-gray-600 mx-1"></div>
          <div className="flex flex-wrap gap-1">
            {colorOptions.map((c) => (
              <motion.button
                key={c}
                className={`w-6 h-6 rounded-full ${c === '#FFFFFF' ? 'border border-gray-300' : ''} ${color === c && tool !== 'eraser' ? 'ring-2 ring-offset-2 ring-violet-500' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => {
                  setColor(c);
                  setTool('pencil');
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={clearCanvas}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={downloadDrawing}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      <p className="text-xs text-center text-gray-500">
        Doodling can help reduce stress and improve focus. Take a break and express yourself!
      </p>
    </div>
  );
};

export default DoodleTab;
