
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PlaygroundView = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Interactive Learning Playground</h1>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our interactive learning playground is under development.
              Check back soon for interactive experiments and learning tools!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaygroundView;
