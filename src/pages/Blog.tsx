
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/HeaderWithAdmin";
import Footer from "@/components/layout/Footer";

const Blog = () => {
  const blogPosts = [
    {
      title: "5 Effective Study Techniques Based on Science",
      date: "May 15, 2025",
      excerpt: "Discover research-backed methods to improve retention and understanding of complex topics.",
      author: "Dr. Sarah Johnson"
    },
    {
      title: "How to Manage Exam Stress and Anxiety",
      date: "May 12, 2025",
      excerpt: "Practical strategies to keep your stress levels in check during exam season.",
      author: "Michael Chen, Psychologist"
    },
    {
      title: "The Importance of Sleep in Exam Preparation",
      date: "May 8, 2025",
      excerpt: "Why sacrificing sleep for extra study time might be counterproductive.",
      author: "Dr. Lisa Patel"
    },
    {
      title: "AI in Education: The Future of Learning",
      date: "May 5, 2025",
      excerpt: "How artificial intelligence is transforming the way students prepare for exams.",
      author: "Tech Team at PREPZR"
    },
    {
      title: "From Average to Top Scorer: A Success Story",
      date: "May 1, 2025",
      excerpt: "How one student used PREPZR to dramatically improve their exam results.",
      author: "Rajesh Kumar, Student"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">PREPZR Blog</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">{post.date}</div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">By {post.author}</span>
                  <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
