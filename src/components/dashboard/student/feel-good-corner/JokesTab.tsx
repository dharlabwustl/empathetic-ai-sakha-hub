import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";
import { Joke } from './types';

const JokesTab = () => {
  const [jokes, setJokes] = useState<Joke[]>([
    {
      id: 1,
      text: "Why don't scientists trust atoms? Because they make up everything!",
      type: "science",
      likes: 15,
      author: "Science Buddy"
    },
    {
      id: 2,
      text: "Parallel lines have so much in common. It’s a shame they’ll never meet.",
      type: "math",
      likes: 8,
      author: "Math Magician"
    },
    {
      id: 3,
      text: "Why did the scarecrow win an award? Because he was outstanding in his field!",
      type: "general",
      likes: 22,
      author: "Funny Farmer"
    },
    {
      id: 4,
      text: "I told my wife she was drawing her eyebrows too high. She seemed surprised.",
      type: "general",
      likes: 12,
      author: "Dad Jokes"
    },
    {
      id: 5,
      text: "What do you call a fish with no eyes? Fsh!",
      type: "general",
      likes: 18,
      author: "Silly Sailor"
    }
  ]);

  const [likedJokes, setLikedJokes] = useState<number[]>([]);

  const handleLike = (jokeId: number) => {
    if (likedJokes.includes(jokeId)) {
      setLikedJokes(likedJokes.filter(id => id !== jokeId));
      setJokes(jokes.map(joke => 
        joke.id === jokeId 
          ? { ...joke, likes: (joke.likes || 0) - 1 }
          : joke
      ));
    } else {
      setLikedJokes([...likedJokes, jokeId]);
      setJokes(jokes.map(joke => 
        joke.id === jokeId 
          ? { ...joke, likes: (joke.likes || 0) + 1 }
          : joke
      ));
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {jokes.map((joke) => (
        <Card key={joke.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">{joke.type.toUpperCase()} Joke</CardTitle>
            <CardDescription className="text-gray-500">By {joke.author || 'Anonymous'}</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700">{joke.text}</p>
          </CardContent>
          <div className="flex items-center justify-between p-4">
            <Button 
              variant="ghost"
              onClick={() => handleLike(joke.id)}
            >
              {likedJokes.includes(joke.id) ? (
                <>
                  <HeartOff className="mr-2 h-4 w-4 text-red-500" /> Unlike
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4 text-gray-500" /> Like
                </>
              )}
            </Button>
            <span className="text-sm text-gray-600">Likes: {joke.likes || 0}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JokesTab;
