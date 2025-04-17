
import React from "react";
import { MoodType } from "@/types/user/base";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMoodBackgroundClass } from "./moodUtils";
import { BatteryCharging, Lightbulb, Meh, Coffee, AlertTriangle, BookOpen, Smile, SmilePlus, Frown, Heart } from "lucide-react";

interface MoodSpecificContentProps {
  currentMood: MoodType;
}

const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({ currentMood }) => {
  // Function to get the appropriate mood panel based on current mood
  const renderMoodPanel = () => {
    switch (currentMood) {
      case "motivated":
        return <MotivatedMoodPanel />;
      case "curious":
        return <CuriousMoodPanel />;
      case "neutral":
        return <NeutralMoodPanel />;
      case "tired":
        return <TiredMoodPanel />;
      case "stressed":
        return <StressedMoodPanel />;
      case "focused":
        return <FocusedMoodPanel />;
      case "happy":
        return <HappyMoodPanel />;
      case "okay":
        return <OkayMoodPanel />;
      case "overwhelmed":
        return <OverwhelmedMoodPanel />;
      case "sad":
        return <SadMoodPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-6 animate-fade-in">
      {renderMoodPanel()}
    </div>
  );
};

// Individual Mood Panels
const MotivatedMoodPanel = () => {
  return (
    <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
          <BatteryCharging size={20} />
          <span>Motivated Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-orange-900/80 dark:text-orange-200">
          You're feeling motivated! Let's use this energy to tackle challenging concepts and make significant progress today.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Challenge Yourself" 
            description="Try our advanced practice problems to push your limits."
          />
          <RecommendedActivity 
            title="Set Big Goals" 
            description="Create a challenging study plan for the next few days."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const CuriousMoodPanel = () => {
  return (
    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Lightbulb size={20} />
          <span>Curious Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-900/80 dark:text-blue-200">
          Your curiosity is a powerful learning tool! Explore new concepts and make connections between different subjects.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Explore Related Topics" 
            description="Discover how concepts connect across different subjects."
          />
          <RecommendedActivity 
            title="Ask Deep Questions" 
            description="Use our AI tutor to explore the 'why' behind concepts."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const NeutralMoodPanel = () => {
  return (
    <Card className="bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
          <Meh size={20} />
          <span>Neutral Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-900/80 dark:text-gray-200">
          A neutral mood is perfect for balanced learning. Let's work on a mix of review and new material.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Balanced Study Session" 
            description="Mix review and new material for optimal learning."
          />
          <RecommendedActivity 
            title="Progress Check" 
            description="Take a quick quiz to see where you stand."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const TiredMoodPanel = () => {
  return (
    <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <Coffee size={20} />
          <span>Tired Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-amber-900/80 dark:text-amber-200">
          Feeling tired is normal! Let's focus on lighter review activities with more breaks to maximize retention.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Short Review Sessions" 
            description="Brief 15-minute reviews with 5-minute breaks in between."
          />
          <RecommendedActivity 
            title="Visual Learning" 
            description="Focus on diagrams and videos instead of dense text."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const StressedMoodPanel = () => {
  return (
    <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
          <AlertTriangle size={20} />
          <span>Stressed Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-red-900/80 dark:text-red-200">
          Let's manage that stress with structured review and confidence-building activities.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Confidence Builders" 
            description="Practice problems you've mastered to build confidence."
          />
          <RecommendedActivity 
            title="Breathing Exercise" 
            description="Take a 2-minute guided breathing break."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const FocusedMoodPanel = () => {
  return (
    <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <BookOpen size={20} />
          <span>Focused Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-emerald-900/80 dark:text-emerald-200">
          You're in the zone! Let's make the most of this focus with deep learning and challenging material.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Deep Dive" 
            description="Focus on one challenging concept for an extended period."
          />
          <RecommendedActivity 
            title="Problem Solving" 
            description="Tackle difficult problems that require sustained focus."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const HappyMoodPanel = () => {
  return (
    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <Smile size={20} />
          <span>Happy Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-green-900/80 dark:text-green-200">
          Happiness boosts learning capacity! This is a great time to tackle challenging concepts or try creative approaches.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Tackle Challenges" 
            description="Work on concepts you've found difficult before."
          />
          <RecommendedActivity 
            title="Creative Learning" 
            description="Try creating your own examples or teaching a concept."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const OkayMoodPanel = () => {
  return (
    <Card className="bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sky-700 dark:text-sky-400">
          <SmilePlus size={20} />
          <span>Okay Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sky-900/80 dark:text-sky-200">
          A steady mood is great for consistent progress. Let's maintain a balanced approach to your studies today.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Steady Progress" 
            description="Follow your study plan with a mix of review and new material."
          />
          <RecommendedActivity 
            title="Practice Tests" 
            description="Test your knowledge with mixed-topic quizzes."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const OverwhelmedMoodPanel = () => {
  return (
    <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
          <Frown size={20} />
          <span>Overwhelmed Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-purple-900/80 dark:text-purple-200">
          Feeling overwhelmed is common during intense study periods. Let's break things down into smaller, manageable pieces.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Micro Tasks" 
            description="Break down your study goals into 10-minute tasks."
          />
          <RecommendedActivity 
            title="Mind Mapping" 
            description="Visualize how concepts connect to reduce complexity."
          />
        </div>
      </CardContent>
    </Card>
  );
};

const SadMoodPanel = () => {
  return (
    <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
          <Heart size={20} />
          <span>Self-Care Mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-indigo-900/80 dark:text-indigo-200">
          It's okay to feel down sometimes. Take care of your mental health first - learning is more effective when you feel better.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendedActivity 
            title="Gentle Review" 
            description="Light revision of topics you enjoy and understand well."
          />
          <RecommendedActivity 
            title="Wellbeing Break" 
            description="Consider a short wellbeing activity before studying."
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Reusable component for recommended activities
const RecommendedActivity = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className="p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg">
      <h4 className="text-sm font-medium mb-1">{title}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default MoodSpecificContent;
