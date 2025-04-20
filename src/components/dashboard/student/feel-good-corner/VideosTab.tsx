
import React from 'react';
import { motion } from "framer-motion";

const videos = [
  {
    title: "The Power of Yet",
    description: "A 3-minute motivational video about growth mindset",
    thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1974&auto=format&fit=crop",
    url: "https://www.youtube.com/watch?v=XLeUvZvuvAs",
  },
  {
    title: "Learning How to Learn",
    description: "Dr. Barbara Oakley explains effective study techniques",
    thumbnail: "https://images.unsplash.com/photo-1491841651911-c44c30c34548?q=80&w=2070&auto=format&fit=crop",
    url: "https://www.youtube.com/watch?v=O96fE1E-rf8",
  },
  {
    title: "The 9 BEST Scientific Study Tips",
    description: "Quick tips to improve your study efficiency",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop",
    url: "https://www.youtube.com/watch?v=p60rN9JEapg",
  },
];

const VideosTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Videos to boost your mood and motivation</h3>
      <div className="grid grid-cols-1 gap-4">
        {videos.map((video, index) => (
          <motion.a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-1/3 bg-gray-200 dark:bg-gray-700 relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-2/3 p-3">
                <h3 className="font-medium text-violet-800 dark:text-violet-300 group-hover:text-violet-700 dark:group-hover:text-violet-200 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {video.description}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default VideosTab;
