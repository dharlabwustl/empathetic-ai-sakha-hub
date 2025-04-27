
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Trash2, 
  Download, 
  RefreshCw,
  Save,
  Copy,
  Brush,
  Eraser
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DoodleTab = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const { toast } = useToast();
  const [moodAnalysis, setMoodAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full width of container
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;

    // Fill with white background
    ctx.fillStyle = "white";
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
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);

    // Set drawing style
    ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let clientX, clientY;
    
    if ('touches' in e) {
      // Prevent scrolling on touch devices
      e.preventDefault();
      
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
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
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setMoodAnalysis(null);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'doodle.png';
    link.href = image;
    link.click();
    
    toast({
      title: "Downloaded!",
      description: "Your artwork has been saved to your device.",
      variant: "default"
    });
  };

  const analyzeMood = () => {
    setAnalyzing(true);
    
    // Simulate AI mood analysis with timeout
    setTimeout(() => {
      const moods = [
        "Your doodle suggests a creative and relaxed state of mind, perfect for learning new concepts!",
        "The flowing lines indicate a focused mindset. This is a good time to tackle challenging topics.",
        "Your drawing shows signs of curiosity and exploration. Consider studying something new today!",
        "The patterns in your doodle suggest analytical thinking. Math or science studies might be productive now.",
        "This artwork shows balanced energy - a good time to review materials you've already studied.",
        "Your doodle indicates a playful mindset. Taking short, frequent study breaks might help you today."
      ];
      
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setMoodAnalysis(randomMood);
      setAnalyzing(false);
    }, 1500);
  };

  // Colors for the color picker
  const colors = [
    "#000000", "#FF0000", "#0000FF", "#00FF00", 
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500"
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Doodle Space</h3>
        <p className="text-muted-foreground">
          Express yourself freely through drawing. Your doodles can help reveal your mood and thought patterns.
        </p>
      </div>

      <Card className="border-2 border-teal-100 dark:border-teal-900 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <Button
                variant={tool === 'brush' ? "default" : "outline"}
                size="sm"
                onClick={() => setTool('brush')}
              >
                <Brush className="h-4 w-4 mr-1" />
                Brush
              </Button>
              <Button
                variant={tool === 'eraser' ? "default" : "outline"}
                size="sm"
                onClick={() => setTool('eraser')}
              >
                <Eraser className="h-4 w-4 mr-1" />
                Eraser
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="destructive" size="sm" onClick={clearCanvas}>
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCanvas}>
                <Download className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {colors.map((c) => (
              <div 
                key={c} 
                className={`w-6 h-6 rounded-full cursor-pointer ${color === c ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-6 h-6 cursor-pointer"
            />
            
            <div className="flex items-center ml-4">
              <label htmlFor="lineWidth" className="mr-2 text-sm">Size:</label>
              <input
                type="range"
                id="lineWidth"
                min="1"
                max="20"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
          
          <canvas
            ref={canvasRef}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-md touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{ height: '400px' }}
          />
          
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={analyzeMood} 
              variant="outline" 
              disabled={analyzing}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
            >
              {analyzing ? (
                <><RefreshCw className="h-4 w-4 mr-1 animate-spin" /> Analyzing...</>
              ) : (
                <><Copy className="h-4 w-4 mr-1" /> Analyze My Mood</>
              )}
            </Button>
          </div>
          
          {moodAnalysis && (
            <div className="mt-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800/30">
              <p className="text-teal-800 dark:text-teal-200">
                <strong>Mood Analysis:</strong> {moodAnalysis}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800/30">
        <p className="text-sm text-teal-800 dark:text-teal-300">
          <strong>Creative Break:</strong> Doodling can help improve focus and memory retention. It gives your brain a chance to process information differently and can even reveal your emotional state.
        </p>
      </div>
    </div>
  );
};

export default DoodleTab;
