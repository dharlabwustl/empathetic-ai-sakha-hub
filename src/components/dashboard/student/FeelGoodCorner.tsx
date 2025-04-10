
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
  MessageSquare,
  ThumbsUp
} from "lucide-react";

// Simplified data arrays
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the student eat his homework? Because the teacher said it was a piece of cake!",
  "What's a physicist's favorite food? Fission chips!"
];

const quotes = [
  "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action. - A.P.J. Abdul Kalam",
  "When you want something, all the universe conspires in helping you to achieve it. - Paulo Coelho",
  "Learn from yesterday, live for today, hope for tomorrow. - Albert Einstein"
];

const wellnessHacks = [
  "Take 3 deep breaths with us 🌬️... Ready?",
  "Stand up and stretch your arms toward the ceiling for 30 seconds",
  "Drink a glass of water right now - hydration helps brain function!"
];

const moodEmojis = [
  { value: "great", label: "😁", description: "Great" },
  { value: "good", label: "🙂", description: "Good" },
  { value: "okay", label: "😐", description: "Okay" },
  { value: "tired", label: "😴", description: "Tired" },
  { value: "stressed", label: "😫", description: "Stressed" },
  { value: "sad", label: "😔", description: "Sad" }
];

export function FeelGoodCorner() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodSubmitted, setMoodSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("joke");
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [currentWellness, setCurrentWellness] = useState(wellnessHacks[0]);

  const getRandomItem = (items: any[]) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmitMood = () => {
    if (selectedMood) {
      setMoodSubmitted(true);
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
            <TabsList className="grid grid-cols-3 h-auto p-1 bg-violet-100/50 dark:bg-violet-900/20">
              <TabsTrigger value="joke" className="py-1.5">
                <Laugh className="h-4 w-4 mr-1" />
                <span className="text-xs">Joke</span>
              </TabsTrigger>
              <TabsTrigger value="quote" className="py-1.5">
                <Quote className="h-4 w-4 mr-1" />
                <span className="text-xs">Quote</span>
              </TabsTrigger>
              <TabsTrigger value="wellness" className="py-1.5">
                <Wind className="h-4 w-4 mr-1" />
                <span className="text-xs">Wellness</span>
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
      
      <CardFooter className="bg-violet-50/50 dark:bg-violet-900/10 p-3 flex justify-center items-center">
        <span className="text-xs text-muted-foreground">Take a moment for yourself</span>
      </CardFooter>
    </Card>
  );
}

export default FeelGoodCorner;
