
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const QuotesTab: React.FC = () => {
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
    "The only impossible journey is the one you never begin. - Tony Robbins"
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <CardContent className="text-center">
          <p className="text-lg italic mb-4">"{currentQuote}"</p>
          <Button onClick={getRandomQuote} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            New Quote
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotesTab;
