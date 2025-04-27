
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PenLine, Download, Trash, Undo, Share, Image, MessageSquare, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DoodleTab = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState('5');
  const { toast } = useToast();
  
  // Mock shared doodles - would come from API in real app
  const sharedDoodles = [
    { 
      id: 1, 
      user: "Rahul M.", 
      image: "https://via.placeholder.com/300x200/e2f7fe/1a202c?text=Doodle+1",
      likes: 12,
      comments: 3 
    },
    { 
      id: 2, 
      user: "Sneha P.", 
      image: "https://via.placeholder.com/300x200/fef4e2/1a202c?text=Doodle+2",
      likes: 8,
      comments: 2 
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Fill with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = parseInt(lineWidth);
    ctx.lineCap = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling while drawing on touch devices
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'doodle.png';
    a.click();
  };

  const shareDoodle = () => {
    toast({
      title: "Doodle Shared!",
      description: "Your masterpiece has been shared with the community."
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-blue-50 dark:bg-blue-950/30 py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <PenLine className="h-4 w-4" />
            Doodle Canvas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-2 bg-gray-50 dark:bg-gray-900/20 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <label htmlFor="color" className="text-xs">Color:</label>
              <input 
                type="color" 
                id="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)} 
                className="w-8 h-6"
              />
            </div>
            
            <div className="flex items-center gap-1">
              <label htmlFor="lineWidth" className="text-xs">Size:</label>
              <Select value={lineWidth} onValueChange={setLineWidth}>
                <SelectTrigger className="w-16 h-7">
                  <SelectValue placeholder="5px" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2px</SelectItem>
                  <SelectItem value="5">5px</SelectItem>
                  <SelectItem value="10">10px</SelectItem>
                  <SelectItem value="20">20px</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="ml-auto flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={clearCanvas}>
                <Trash className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Undo className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <canvas 
            ref={canvasRef} 
            className="w-full bg-white h-[250px] border-y"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </CardContent>
        <CardFooter className="p-3 flex justify-between bg-blue-50 dark:bg-blue-950/30">
          <div>
            <p className="text-xs text-muted-foreground">
              Got creative ideas? Express them here!
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={downloadCanvas}>
              <Download className="mr-1 h-4 w-4" />
              Save
            </Button>
            <Button size="sm" onClick={shareDoodle}>
              <Share className="mr-1 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Image className="h-4 w-4" />
          Community Doodles
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sharedDoodles.map((doodle) => (
            <Card key={doodle.id}>
              <CardContent className="p-0">
                <img 
                  src={doodle.image} 
                  alt={`Doodle by ${doodle.user}`}
                  className="w-full h-[150px] object-cover"
                />
                
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://via.placeholder.com/30/4f46e5/ffffff?text=${doodle.user[0]}`} />
                      <AvatarFallback>{doodle.user[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{doodle.user}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-xs">{doodle.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-xs">{doodle.comments}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4">
          <Button variant="outline" className="w-full" size="sm">
            View All Doodles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoodleTab;
