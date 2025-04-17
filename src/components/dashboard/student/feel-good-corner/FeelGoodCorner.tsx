
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, MessageSquare, Music, PictureInPicture, Puzzle, Video } from "lucide-react";

const FeelGoodCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState("teasers");

  // Mock data for teasers
  const teasers = [
    {
      id: 1,
      question: "What has a head, a tail, is brown, and has no legs?",
      answer: "A penny",
      solvedBy: {
        name: "Arjun S.",
        image: "https://i.pravatar.cc/150?img=32"
      }
    },
    {
      id: 2,
      question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
      answer: "A candle",
      solvedBy: {
        name: "Priya M.",
        image: "https://i.pravatar.cc/150?img=25"
      }
    },
    {
      id: 3,
      question: "What has many keys but can't open a single lock?",
      answer: "A piano",
      solvedBy: {
        name: "Rahul K.",
        image: "https://i.pravatar.cc/150?img=67"
      }
    },
    {
      id: 4,
      question: "What can you break, even if you never pick it up or touch it?",
      answer: "A promise",
      solvedBy: {
        name: "Ananya P.",
        image: "https://i.pravatar.cc/150?img=45"
      }
    },
    {
      id: 5,
      question: "What has to be broken before you can use it?",
      answer: "An egg",
      solvedBy: {
        name: "Vikram S.",
        image: "https://i.pravatar.cc/150?img=12"
      }
    }
  ];

  // Mock data for doodles
  const doodles = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200/FF9A8B/000000?text=Creative+Doodle+1",
      user: {
        name: "Meera R.",
        image: "https://i.pravatar.cc/150?img=47"
      }
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200/FFDFD3/000000?text=Creative+Doodle+2",
      user: {
        name: "Sanjay D.",
        image: "https://i.pravatar.cc/150?img=53"
      }
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200/E2F0CB/000000?text=Creative+Doodle+3",
      user: {
        name: "Kavita N.",
        image: "https://i.pravatar.cc/150?img=38"
      }
    }
  ];

  // Mock data for videos
  const videoCategories = [
    {
      name: "Relaxation",
      videos: [
        { id: 1, title: "5-Minute Meditation", thumbnail: "https://via.placeholder.com/200x120/B5EAD7/000000?text=Meditation" },
        { id: 2, title: "Nature Sounds", thumbnail: "https://via.placeholder.com/200x120/C7CEEA/000000?text=Nature+Sounds" },
        { id: 3, title: "Breathing Exercises", thumbnail: "https://via.placeholder.com/200x120/FFDFD3/000000?text=Breathing" }
      ]
    },
    {
      name: "Motivation",
      videos: [
        { id: 4, title: "Student Success Stories", thumbnail: "https://via.placeholder.com/200x120/FF9AA2/000000?text=Success+Stories" },
        { id: 5, title: "Exam Champions", thumbnail: "https://via.placeholder.com/200x120/FFB7B2/000000?text=Exam+Champions" },
        { id: 6, title: "Overcoming Challenges", thumbnail: "https://via.placeholder.com/200x120/FFDAC1/000000?text=Challenges" }
      ]
    },
    {
      name: "Study Breaks",
      videos: [
        { id: 7, title: "Quick Brain Games", thumbnail: "https://via.placeholder.com/200x120/E2F0CB/000000?text=Brain+Games" },
        { id: 8, title: "Desk Exercises", thumbnail: "https://via.placeholder.com/200x120/B5EAD7/000000?text=Desk+Exercises" },
        { id: 9, title: "Eye Strain Relief", thumbnail: "https://via.placeholder.com/200x120/C7CEEA/000000?text=Eye+Relief" }
      ]
    }
  ];

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-pink-100 to-violet-100 dark:from-pink-900/30 dark:to-violet-900/30">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-pink-600 dark:text-pink-400" />
          Feel Good Corner
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="teasers" className="flex items-center gap-1">
              <Puzzle className="h-4 w-4" /> Teasers
            </TabsTrigger>
            <TabsTrigger value="doodles" className="flex items-center gap-1">
              <PictureInPicture className="h-4 w-4" /> Doodles
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-1">
              <Video className="h-4 w-4" /> Videos
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-1">
              <Music className="h-4 w-4" /> Music
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" /> Chat
            </TabsTrigger>
          </TabsList>

          {/* Teasers Tab Content */}
          <TabsContent value="teasers" className="mt-4">
            <h3 className="text-lg font-medium mb-4">Top 5 Most Solved Teasers Today</h3>
            <div className="grid gap-4">
              {teasers.map((teaser) => (
                <div key={teaser.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{teaser.question}</h4>
                    <div className="flex items-center gap-2">
                      <img 
                        src={teaser.solvedBy.image} 
                        alt={teaser.solvedBy.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {teaser.solvedBy.name}
                      </span>
                    </div>
                  </div>
                  <div className="pl-4 border-l-4 border-indigo-300 dark:border-indigo-500 mt-2 text-gray-700 dark:text-gray-300">
                    {teaser.answer}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Doodles Tab Content */}
          <TabsContent value="doodles" className="mt-4">
            <h3 className="text-lg font-medium mb-4">Best Doodles of the Day</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {doodles.map((doodle) => (
                <div key={doodle.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <img 
                    src={doodle.image} 
                    alt="Doodle" 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 flex items-center gap-2">
                    <img 
                      src={doodle.user.image} 
                      alt={doodle.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{doodle.user.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab Content */}
          <TabsContent value="videos" className="mt-4">
            <h3 className="text-lg font-medium mb-4">Video Categories</h3>
            <div className="space-y-6">
              {videoCategories.map((category) => (
                <div key={category.name}>
                  <h4 className="text-md font-medium mb-3">{category.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {category.videos.map((video) => (
                      <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-24 object-cover"
                        />
                        <div className="p-3">
                          <h5 className="font-medium text-sm">{video.title}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Music Tab Content - Placeholder for now */}
          <TabsContent value="music" className="mt-4">
            <h3 className="text-lg font-medium mb-4">Relaxing Music</h3>
            <p className="text-gray-600 dark:text-gray-400">Music section coming soon. Stay tuned!</p>
          </TabsContent>

          {/* Chat Tab Content - Placeholder for now */}
          <TabsContent value="chat" className="mt-4">
            <h3 className="text-lg font-medium mb-4">Student Chat</h3>
            <p className="text-gray-600 dark:text-gray-400">Chat feature coming soon. Stay tuned!</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeelGoodCorner;
