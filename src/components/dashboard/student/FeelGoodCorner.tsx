
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smile, 
  Music, 
  Coffee, 
  Laugh, 
  Brain, 
  Quote, 
  Wind, 
  Palette, 
  MessageSquare,
  ThumbsUp
} from "lucide-react";

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the student eat his homework? Because the teacher said it was a piece of cake!",
  "What's a physicist's favorite food? Fission chips!",
  "What did one wall say to the other wall? I'll meet you at the corner!",
  "Why couldn't the bicycle stand up by itself? It was two tired!"
];

const brainTeasers = [
  {
    question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    answer: "A candle"
  },
  {
    question: "What has keys but no locks, space but no room, and you can enter but not go in?",
    answer: "A keyboard"
  },
  {
    question: "What has a head and a tail, but no body?",
    answer: "A coin"
  }
];

const quotes = [
  ""Dream, dream, dream. Dreams transform into thoughts and thoughts result in action." - A.P.J. Abdul Kalam",
  ""When you want something, all the universe conspires in helping you to achieve it." - Paulo Coelho",
  ""Learn from yesterday, live for today, hope for tomorrow." - Albert Einstein",
  ""The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt"
];

const wellnessHacks = [
  "Take 3 deep breaths with us 🌬️... Ready?",
  "Stand up and stretch your arms toward the ceiling for 30 seconds",
  "Drink a glass of water right now - hydration helps brain function!",
  "Roll your shoulders backward 5 times, then forward 5 times"
];

export const moodEmojis = [
  { value: "great", label: "😁", description: "Great" },
  { value: "good", label: "🙂", description: "Good" },
  { value: "okay", label: "😐", description: "Okay" },
  { value: "tired", label: "😴", description: "Tired" },
  { value: "stressed", label: "😫", description: "Stressed" },
  { value: "sad", label: "😔", description: "Sad" }
];

export function FeelGoodCorner() {
  const [activeTab, setActiveTab] = useState("joke");
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const [currentTeaser, setCurrentTeaser] = useState(brainTeasers[0]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [currentWellness, setCurrentWellness] = useState(wellnessHacks[0]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodSubmitted, setMoodSubmitted] = useState(false);

  const getRandomItem = <T,>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmitMood = () => {
    if (selectedMood) {
      // In a real app, this would save to a database
      setMoodSubmitted(true);
      // Show a success message or trigger a specific action based on mood
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
      <CardHeader className="pb-3 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smile className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <CardTitle className="text-lg text-violet-700 dark:text-violet-300">Feel Good Corner</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">Your Pocket Smile Buddy</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {!moodSubmitted ? (
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-medium text-center">How are you feeling today?</h3>
            <div className="grid grid-cols-6 gap-2">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                    selectedMood === mood.value
                      ? 'bg-violet-200 dark:bg-violet-800/50 ring-2 ring-violet-500'
                      : 'hover:bg-violet-100 dark:hover:bg-violet-900/30'
                  }`}
                >
                  <span className="text-2xl">{mood.label}</span>
                  <span className="text-xs mt-1">{mood.description}</span>
                </button>
              ))}
            </div>
            <Button 
              onClick={handleSubmitMood}
              disabled={!selectedMood}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
            >
              Log My Mood
            </Button>
          </div>
        ) : (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="p-1">
            <TabsList className="grid grid-cols-5 h-auto p-1 bg-violet-100/50 dark:bg-violet-900/20">
              <TabsTrigger value="joke" className="py-1.5">
                <Laugh className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:text-xs">Joke</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="py-1.5">
                <Music className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:text-xs">Music</span>
              </TabsTrigger>
              <TabsTrigger value="teaser" className="py-1.5">
                <Brain className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:text-xs">Teaser</span>
              </TabsTrigger>
              <TabsTrigger value="quote" className="py-1.5">
                <Quote className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:text-xs">Quote</span>
              </TabsTrigger>
              <TabsTrigger value="wellness" className="py-1.5">
                <Wind className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only sm:text-xs">Wellness</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="joke" className="p-4 flex flex-col items-center">
              <div className="text-center mb-4">
                <p className="text-sm italic">"{currentJoke}"</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setCurrentJoke(getRandomItem(jokes))}
                >
                  Next Joke
                </Button>
                <Button 
                  size="sm"
                  variant="ghost"
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="h-3.5 w-3.5" /> <span className="text-xs">12</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="music" className="p-4 flex flex-col items-center">
              <div className="text-center mb-4">
                <p className="text-sm font-medium">Mood-Based Music</p>
                <p className="text-xs text-muted-foreground">Focus & Relaxation</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Coffee size={14} /> <span>LoFi</span>
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Wind size={14} /> <span>Nature</span>
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Music size={14} /> <span>Classical</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="teaser" className="p-4 flex flex-col items-center">
              <div className="text-center mb-4">
                <p className="text-sm font-medium">Brain Teaser:</p>
                <p className="text-xs my-2">{currentTeaser.question}</p>
                {showAnswer && (
                  <p className="text-xs font-medium text-violet-600 dark:text-violet-400">
                    Answer: {currentTeaser.answer}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={showAnswer ? "outline" : "default"}
                  onClick={() => showAnswer ? setCurrentTeaser(getRandomItem(brainTeasers)) : setShowAnswer(true)}
                  className={showAnswer ? "" : "bg-gradient-to-r from-violet-600 to-indigo-600"}
                >
                  {showAnswer ? "Next Teaser" : "Reveal Answer"}
                </Button>
                {showAnswer && (
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-1"
                    onClick={() => setShowAnswer(false)}
                  >
                    Hide
                  </Button>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="quote" className="p-4 flex flex-col items-center">
              <div className="text-center mb-4">
                <p className="text-sm italic">"{currentQuote}"</p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setCurrentQuote(getRandomItem(quotes))}
              >
                Another Quote
              </Button>
            </TabsContent>
            
            <TabsContent value="wellness" className="p-4 flex flex-col items-center">
              <div className="text-center mb-4">
                <p className="text-sm font-medium">60-Second Wellness Hack:</p>
                <p className="text-xs my-2">{currentWellness}</p>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setCurrentWellness(getRandomItem(wellnessHacks))}
              >
                Try Another
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      {moodSubmitted && (
        <CardFooter className="bg-violet-50/50 dark:bg-violet-900/10 p-3 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Need more? Talk to Sakha in chill mode
          </span>
          <Button 
            size="sm" 
            variant="ghost"
            className="flex items-center gap-1 text-violet-600 dark:text-violet-400"
          >
            <MessageSquare className="h-3.5 w-3.5" /> 
            <span className="text-xs">Chat</span>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default FeelGoodCorner;
