
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical, BookOpen, DownloadCloud, Share, Copy, Check, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface Formula {
  id: string;
  formula: string;
  description: string;
}

interface ConceptContentProps {
  content: string;
  conceptId: string;
  userNotes: string;
  setUserNotes: React.Dispatch<React.SetStateAction<string>>;
  handleSaveNotes: () => void;
  isReadingAloud: boolean;
  setIsReadingAloud: React.Dispatch<React.SetStateAction<boolean>>;
  formulas?: Formula[];
}

const ConceptContent: React.FC<ConceptContentProps> = ({ 
  content, 
  conceptId,
  userNotes,
  setUserNotes,
  handleSaveNotes,
  isReadingAloud,
  setIsReadingAloud,
  formulas = []
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  // Set up speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = content.replace(/<[^>]+>/g, '');
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onend = () => {
        setIsReadingAloud(false);
      };
      utterance.onerror = () => {
        setIsReadingAloud(false);
        toast({
          title: "Read Aloud Error",
          description: "There was an error with the text-to-speech functionality.",
          variant: "destructive",
        });
      };
      setSpeech(utterance);

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [content, toast, setIsReadingAloud]);

  // Handle read aloud toggle
  const toggleReadAloud = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isReadingAloud) {
        window.speechSynthesis.cancel();
        setIsReadingAloud(false);
      } else if (speech) {
        window.speechSynthesis.speak(speech);
        setIsReadingAloud(true);
      }
    } else {
      toast({
        title: "Feature Not Available",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  const handleCopyContent = () => {
    const plainContent = content.replace(/<[^>]+>/g, '');
    navigator.clipboard.writeText(plainContent);
    setCopied(true);
    
    toast({
      title: "Content copied",
      description: "The concept content has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = () => {
    toast({
      title: "Share feature",
      description: "Share functionality would open a modal with sharing options",
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Download PDF",
      description: "The concept would be downloaded as a PDF",
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 }
        }
      }}
      className="space-y-6"
    >
      {/* Actions bar */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-2 justify-end"
      >
        <Button 
          variant={isReadingAloud ? "default" : "outline"} 
          size="sm"
          className={`flex items-center gap-1 ${isReadingAloud ? "bg-blue-600" : ""}`}
          onClick={toggleReadAloud}
        >
          <Volume2 className="h-4 w-4" />
          {isReadingAloud ? 'Stop Reading' : 'Read Aloud'}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
          onClick={handleCopyContent}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
          onClick={handleShare}
        >
          <Share className="h-4 w-4" />
          Share
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
          onClick={handleDownload}
        >
          <DownloadCloud className="h-4 w-4" />
          Download
        </Button>
      </motion.div>
      
      {/* Main content */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" /> Concept Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div 
              className="prose dark:prose-invert max-w-none" 
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Notes Section */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <PenLine className="h-5 w-5 mr-2 text-green-600" /> Your Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Textarea
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Take notes on this concept..."
              className="min-h-32"
            />
            <div className="mt-3 flex justify-end">
              <Button onClick={handleSaveNotes}>
                Save Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Formulas section */}
      {formulas.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-purple-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <FlaskConical className="h-5 w-5 mr-2 text-purple-600" /> Key Formulas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formulas.map(formula => (
                  <motion.div 
                    key={formula.id}
                    className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-center py-2 font-bold text-lg">{formula.formula}</div>
                    <div className="text-sm text-center text-gray-600 dark:text-gray-400">{formula.description}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ConceptContent;
