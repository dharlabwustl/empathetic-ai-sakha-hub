import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, HelpCircle, Lightbulb, MessageCircle, Sparkles, User2, Users2, Volume2, VolumeX } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useVoiceContext } from '@/contexts/VoiceContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SurroundingInfluencesSection: React.FC = () => {
  const [showTips, setShowTips] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const { speakText, stopSpeaking, isSpeaking } = useVoiceContext();
  const { toast } = useToast();

  const { ref: tipsRef, inView: tipsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: communityRef, inView: communityInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: voiceRef, inView: voiceInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const toggleTips = () => {
    setShowTips(!showTips);
  };

  const toggleCommunity = () => {
    setShowCommunity(!showCommunity);
  };

  const toggleVoiceAssistant = () => {
    setShowVoiceAssistant(!showVoiceAssistant);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      stopSpeaking();
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      stopSpeaking();
    }
  };

  const handleSpeak = (text: string) => {
    if (isVoiceEnabled) {
      if (isSpeaking) {
        stopSpeaking();
      } else {
        speakText(text);
      }
    } else {
      toast({
        title: "Voice is disabled",
        description: "Please enable voice in settings to use this feature.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Study Tips Card */}
      <Card ref={tipsRef}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
            Study Tips
          </CardTitle>
          <CardDescription>
            Boost your study sessions with these helpful tips
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className={`transform ${tipsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-100 mb-2`}>
              <h4 className="font-semibold">Time Management</h4>
              <p className="text-sm text-muted-foreground">
                Create a study schedule and stick to it. Break down large tasks into smaller, manageable chunks.
              </p>
            </div>
            <div className={`transform ${tipsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-200 mb-2`}>
              <h4 className="font-semibold">Active Recall</h4>
              <p className="text-sm text-muted-foreground">
                Test yourself frequently on the material. Use flashcards, quizzes, or practice questions.
              </p>
            </div>
            <div className={`transform ${tipsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-300 mb-2`}>
              <h4 className="font-semibold">Spaced Repetition</h4>
              <p className="text-sm text-muted-foreground">
                Review material at increasing intervals. This helps to reinforce learning and improve retention.
              </p>
            </div>
            <div className={`transform ${tipsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-400 mb-2`}>
              <h4 className="font-semibold">Minimize Distractions</h4>
              <p className="text-sm text-muted-foreground">
                Find a quiet study environment. Turn off notifications on your phone and computer.
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={toggleTips}>
            {showTips ? "Hide Tips" : "Show More Tips"}
          </Button>
          {showTips && (
            <div className="mt-4 space-y-2">
              <div className="mb-2">
                <h4 className="font-semibold">Stay Organized</h4>
                <p className="text-sm text-muted-foreground">
                  Keep your notes, assignments, and study materials organized. Use folders, binders, or digital tools.
                </p>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold">Take Breaks</h4>
                <p className="text-sm text-muted-foreground">
                  Schedule regular breaks during your study sessions. Get up, stretch, or do something you enjoy.
                </p>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold">Get Enough Sleep</h4>
                <p className="text-sm text-muted-foreground">
                  Aim for 7-8 hours of sleep per night. Sleep is essential for memory consolidation and cognitive function.
                </p>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold">Stay Hydrated</h4>
                <p className="text-sm text-muted-foreground">
                  Drink plenty of water throughout the day. Dehydration can lead to fatigue and decreased concentration.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Community Support Card */}
      <Card ref={communityRef}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users2 className="mr-2 h-5 w-5 text-blue-500" />
            Community Support
          </CardTitle>
          <CardDescription>
            Connect with peers and get support from the community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className={`transform ${communityInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-100 mb-2`}>
              <h4 className="font-semibold">Join Study Groups</h4>
              <p className="text-sm text-muted-foreground">
                Collaborate with other students to review material, discuss concepts, and solve problems together.
              </p>
            </div>
            <div className={`transform ${communityInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-200 mb-2`}>
              <h4 className="font-semibold">Participate in Forums</h4>
              <p className="text-sm text-muted-foreground">
                Ask questions, share insights, and offer support to other students in online forums or discussion boards.
              </p>
            </div>
            <div className={`transform ${communityInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-300 mb-2`}>
              <h4 className="font-semibold">Attend Workshops</h4>
              <p className="text-sm text-muted-foreground">
                Attend workshops or seminars led by instructors or experts in the field.
              </p>
            </div>
            <div className={`transform ${communityInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-400 mb-2`}>
              <h4 className="font-semibold">Seek Mentorship</h4>
              <p className="text-sm text-muted-foreground">
                Find a mentor who can provide guidance, support, and encouragement throughout your academic journey.
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={toggleCommunity}>
            {showCommunity ? "Hide Community Tips" : "Show More Community Tips"}
          </Button>
          {showCommunity && (
            <div className="mt-4 space-y-2">
              <div className="mb-2">
                <h4 className="font-semibold">Share Resources</h4>
                <p className="text-sm text-muted-foreground">
                  Share helpful resources, such as notes, study guides, or practice questions, with other students.
                </p>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold">Offer Encouragement</h4>
                <p className="text-sm text-muted-foreground">
                  Offer words of encouragement and support to other students who may be struggling or feeling overwhelmed.
                </p>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold">Celebrate Successes</h4>
                <p className="text-sm text-muted-foreground">
                  Celebrate your successes and the successes of others. Recognizing achievements can boost morale and motivation.
                </p>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold">Stay Positive</h4>
                <p className="text-sm text-muted-foreground">
                  Maintain a positive attitude and mindset. Believe in yourself and your ability to succeed.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Assistant Card */}
      <Card ref={voiceRef}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volume2 className="mr-2 h-5 w-5 text-purple-500" />
            Voice Assistant
          </CardTitle>
          <CardDescription>
            Get personalized assistance with voice commands
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className={`transform ${voiceInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-100 mb-2`}>
              <h4 className="font-semibold">Enable Voice Commands</h4>
              <p className="text-sm text-muted-foreground">
                Use voice commands to navigate the dashboard, access study materials, and more.
              </p>
            </div>
            <div className={`transform ${voiceInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-200 mb-2`}>
              <h4 className="font-semibold">Personalized Assistance</h4>
              <p className="text-sm text-muted-foreground">
                Get personalized assistance with study tips, time management, and goal setting.
              </p>
            </div>
            <div className={`transform ${voiceInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-300 mb-2`}>
              <h4 className="font-semibold">Study Reminders</h4>
              <p className="text-sm text-muted-foreground">
                Set study reminders and receive notifications to stay on track with your study schedule.
              </p>
            </div>
            <div className={`transform ${voiceInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-500 delay-400 mb-2`}>
              <h4 className="font-semibold">Progress Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Track your progress and get insights into your study habits and performance.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="voice-enabled" checked={isVoiceEnabled} onCheckedChange={toggleVoice} />
              <Label htmlFor="voice-enabled">Voice Enabled</Label>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleSpeak("Hello, how can I help you today?")}>
              Test Voice
            </Button>
          </div>
          <Button variant="outline" className="w-full" onClick={toggleVoiceAssistant}>
            {showVoiceAssistant ? "Hide Voice Assistant Tips" : "Show More Voice Assistant Tips"}
          </Button>
          {showVoiceAssistant && (
            <div className="mt-4 space-y-2">
              <div className="mb-2">
                <h4 className="font-semibold">Set Study Goals</h4>
                <p className="text-sm text-muted-foreground">
                  Use voice commands to set study goals and track your progress towards achieving them.
                </p>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold">Access Study Materials</h4>
                <p className="text-sm text-muted-foreground">
                  Use voice commands to access study materials, such as notes, flashcards, and practice questions.
                </p>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold">Get Study Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Receive personalized study recommendations based on your learning style and preferences.
                </p>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold">Manage Study Schedule</h4>
                <p className="text-sm text-muted-foreground">
                  Use voice commands to manage your study schedule, set reminders, and track your progress.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SurroundingInfluencesSection;
