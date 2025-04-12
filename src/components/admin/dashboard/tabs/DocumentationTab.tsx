import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Server,
  Database,
  Brain,
  Shield,
  Download,
  BookOpen,
  Code,
  Globe,
  Layers,
  UserCog,
  Cable,
  Network
} from "lucide-react";

const DocumentationTab = () => {
  const { toast } = useToast();
  const [documentFilter, setDocumentFilter] = useState("all");
  
  const handleDownloadPDF = (docName: string) => {
    toast({
      title: "Downloading Documentation",
      description: `Preparing ${docName} for download as PDF...`,
      variant: "default"
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${docName} has been downloaded successfully`,
        variant: "default"
      });
    }, 1500);
  };
  
  const handleViewFullDoc = (docName: string) => {
    toast({
      title: "Opening Documentation",
      description: `Opening full ${docName} documentation in viewer...`,
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Admin Dashboard Architecture</h2>
          <p className="text-gray-500 dark:text-gray-400">
            System documentation and reference materials
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => handleDownloadPDF("System Architecture")}
          >
            <Download size={16} />
            <span>Download as PDF</span>
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-2"
            onClick={() => handleViewFullDoc("Complete System Documentation")}
          >
            <BookOpen size={16} />
            <span>View Full Documentation</span>
          </Button>
        </div>
      </div>

      <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
        <button 
          className={`px-3 py-1 text-sm rounded-md ${documentFilter === "all" ? 
            "bg-white dark:bg-gray-700 shadow-sm" : 
            "text-gray-600 dark:text-gray-400"}`}
          onClick={() => setDocumentFilter("all")}
        >
          All Documents
        </button>
        <button 
          className={`px-3 py-1 text-sm rounded-md ${documentFilter === "technical" ? 
            "bg-white dark:bg-gray-700 shadow-sm" : 
            "text-gray-600 dark:text-gray-400"}`}
          onClick={() => setDocumentFilter("technical")}
        >
          Technical
        </button>
        <button 
          className={`px-3 py-1 text-sm rounded-md ${documentFilter === "guide" ? 
            "bg-white dark:bg-gray-700 shadow-sm" : 
            "text-gray-600 dark:text-gray-400"}`}
          onClick={() => setDocumentFilter("guide")}
        >
          User Guides
        </button>
        <button 
          className={`px-3 py-1 text-sm rounded-md ${documentFilter === "api" ? 
            "bg-white dark:bg-gray-700 shadow-sm" : 
            "text-gray-600 dark:text-gray-400"}`}
          onClick={() => setDocumentFilter("api")}
        >
          API Reference
        </button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="getting-started" className="text-sm">Getting Started</TabsTrigger>
          <TabsTrigger value="ai-models" className="text-sm">AI Models</TabsTrigger>
          <TabsTrigger value="content-mgmt" className="text-sm">Content Management</TabsTrigger>
          <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Architecture Overview</CardTitle>
              <p className="text-sm text-gray-500">High-level overview of the Sakha AI admin dashboard architecture</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
                <h3 className="text-lg font-medium mb-4 text-center">Architecture Overview</h3>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <div className="flex-1 border bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-center mb-2">Frontend Layer</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Globe size={14} className="text-blue-500" />
                        <span>React Dashboard UI</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Code size={14} className="text-blue-500" />
                        <span>Tailwind CSS & ShadCN UI</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Brain size={14} className="text-blue-500" />
                        <span>React Query State Management</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center flex items-center">
                    <div className="w-full md:w-6 h-6 md:h-auto border-t md:border-l border-gray-300"></div>
                  </div>
                  <div className="flex-1 border bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-center mb-2">Backend Layer</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Server size={14} className="text-green-500" />
                        <span>Flask Application Server</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Database size={14} className="text-green-500" />
                        <span>MySQL & Redis Cache</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield size={14} className="text-green-500" />
                        <span>JWT Authentication</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center flex items-center">
                    <div className="w-full md:w-6 h-6 md:h-auto border-t md:border-l border-gray-300"></div>
                  </div>
                  <div className="flex-1 border bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-center mb-2">AI Layer</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Brain size={14} className="text-purple-500" />
                        <span>GPT Integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen size={14} className="text-purple-500" />
                        <span>Custom ML Models</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Server size={14} className="text-purple-500" />
                        <span>AI Orchestration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Backend Stack</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium w-32">Framework:</span>
                      <span>Flask (Blueprint-based modularity)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium w-32">ORM:</span>
                      <span>SQLAlchemy</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium w-32">Database:</span>
                      <span>MySQL</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium w-32">Auth:</span>
                      <span>JWT-based Auth / OAuth2 for SSO</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium w-32">AI Interface:</span>
                      <span>LLM/API</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium w-32">Task Queue:</span>
                      <span>Celery + Redis (for scheduled jobs)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Frontend Stack</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium w-32">Framework:</span>
                      <span>React</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium w-32">Styling:</span>
                      <span>Tailwind CSS</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium w-32">Component Library:</span>
                      <span>Shadcn UI</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium w-32">State Management:</span>
                      <span>React Query + Context</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium w-32">Routing:</span>
                      <span>React Router</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">API Integration</h3>
                <p className="text-sm mb-3">
                  The frontend makes API calls to the Flask backend for:
                </p>
                <ul className="space-y-1 text-sm list-disc pl-5 mb-3">
                  <li>User authentication and management</li>
                  <li>Content creation and management</li>
                  <li>AI personalization settings</li>
                  <li>Analytics and reporting</li>
                  <li>System configuration</li>
                </ul>
                <p className="text-sm">
                  React Query is used for efficient data fetching, caching and state management.
                </p>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">Database Schema (Key Entities)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-1 text-sm">
                      <li><span className="font-medium">Users:</span> (id, email, name, role, preferences)</li>
                      <li><span className="font-medium">Plans:</span> (user_id, plan_json, status)</li>
                      <li><span className="font-medium">Flashcards/Concepts:</span> (topic_id, text, approved)</li>
                      <li><span className="font-medium">Engagement Logs:</span> (user_id, timestamp, activity)</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1 text-sm">
                      <li><span className="font-medium">Payments:</span> (user_id, plan, status, billing info)</li>
                      <li><span className="font-medium">Moods:</span> (user_id, mood_score, pulse_summary)</li>
                      <li><span className="font-medium">Chats/Doubts:</span> (user_id, message, response, flagged)</li>
                      <li><span className="font-medium">Notifications:</span> (type, target, status, timestamp)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">API Endpoints (Examples)</h3>
                <ul className="space-y-1 text-sm">
                  <li><code className="text-pink-600 bg-pink-50 dark:bg-pink-900/20 px-1 py-0.5 rounded">/api/users/registrations</code> - User registration tracking</li>
                  <li><code className="text-pink-600 bg-pink-50 dark:bg-pink-900/20 px-1 py-0.5 rounded">/api/content/conceptcard</code> - Concept card management</li>
                  <li><code className="text-pink-600 bg-pink-50 dark:bg-pink-900/20 px-1 py-0.5 rounded">/api/emotion/mood</code> - Mood tracking and analysis</li>
                  <li><code className="text-pink-600 bg-pink-50 dark:bg-pink-900/20 px-1 py-0.5 rounded">/api/planner/generate</code> - Study plan generation</li>
                  <li><code className="text-pink-600 bg-pink-50 dark:bg-pink-900/20 px-1 py-0.5 rounded">/api/analytics/emotion</code> - Emotional trend analytics</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="getting-started">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Getting Started</CardTitle>
              <p className="text-sm text-gray-500">Introduction guides and setup instructions</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-3">
                      <UserCog size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium">Admin Panel Onboarding</h3>
                  </div>
                  <p className="text-sm mb-4">Complete guide to get started with the admin dashboard features and functionality.</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewFullDoc("Admin Panel Onboarding")}
                  >
                    View Documentation
                  </Button>
                </div>
                
                <div className="border p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg mr-3">
                      <Cable size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-medium">API Integration</h3>
                  </div>
                  <p className="text-sm mb-4">How to integrate with the Sakha AI API endpoints and backend services.</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewFullDoc("API Integration Guide")}
                  >
                    View Documentation
                  </Button>
                </div>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">Quick Start Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mb-3">
                      <span className="text-gray-500">Video Thumbnail</span>
                    </div>
                    <h4 className="font-medium mb-1">Admin Dashboard Tour</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">5:32 • Updated Apr 2025</p>
                    <Button variant="outline" size="sm" className="w-full">Watch Now</Button>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mb-3">
                      <span className="text-gray-500">Video Thumbnail</span>
                    </div>
                    <h4 className="font-medium mb-1">Content Management</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">7:45 • Updated Mar 2025</p>
                    <Button variant="outline" size="sm" className="w-full">Watch Now</Button>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mb-3">
                      <span className="text-gray-500">Video Thumbnail</span>
                    </div>
                    <h4 className="font-medium mb-1">AI Model Configuration</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">6:18 • Updated Apr 2025</p>
                    <Button variant="outline" size="sm" className="w-full">Watch Now</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-models">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Model Management</CardTitle>
              <p className="text-sm text-gray-500">Documentation for AI model configuration and optimization</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">AI Model Architecture</h3>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 p-6 rounded-lg mb-4">
                  <div className="flex flex-col items-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                        <h4 className="font-medium text-center mb-2 text-purple-700 dark:text-purple-400">Input Processing</h4>
                        <ul className="text-xs space-y-1 list-disc pl-4">
                          <li>Natural Language Understanding</li>
                          <li>Query Classification</li>
                          <li>Intent Recognition</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                        <h4 className="font-medium text-center mb-2 text-blue-700 dark:text-blue-400">Core AI Models</h4>
                        <ul className="text-xs space-y-1 list-disc pl-4">
                          <li>GPT-4 Integration</li>
                          <li>Custom ML Classifiers</li>
                          <li>Knowledge Graph Navigation</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                        <h4 className="font-medium text-center mb-2 text-indigo-700 dark:text-indigo-400">Output Generation</h4>
                        <ul className="text-xs space-y-1 list-disc pl-4">
                          <li>Content Adaption</li>
                          <li>Response Formulation</li>
                          <li>Multi-format Output</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-2">
                      <Network size={24} className="text-gray-400" />
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm w-full">
                      <h4 className="font-medium text-center mb-2 text-green-700 dark:text-green-400">
                        Personalization Layer
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        <div>Learning Style Detection</div>
                        <div>Adaptive Difficulty</div>
                        <div>Emotional Intelligence</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleViewFullDoc("AI Model Architecture")}
                  className="w-full"
                >
                  View Complete Architecture Documentation
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Model Configuration</h3>
                  <p className="text-sm mb-3">Documentation on configuring the various AI models in the system:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>GPT-4 Integration Guide</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("GPT-4 Integration Guide")}
                      >
                        View
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Custom Classifier Configuration</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Custom Classifier Configuration")}
                      >
                        View
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Sentiment Analysis Tuning</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Sentiment Analysis Tuning")}
                      >
                        View
                      </Button>
                    </li>
                  </ul>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Model Performance</h3>
                  <p className="text-sm mb-3">Documentation on monitoring and optimizing AI model performance:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Performance Metrics Guide</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Performance Metrics Guide")}
                      >
                        View
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Optimization Techniques</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Optimization Techniques")}
                      >
                        View
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Model Evaluation</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Model Evaluation")}
                      >
                        View
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content-mgmt">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Management</CardTitle>
              <p className="text-sm text-gray-500">Documentation for content creation, management and distribution</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">Content Workflow</h3>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10 p-6 rounded-lg mb-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex flex-col items-center">
                      <Layers size={24} className="text-blue-500 mb-2" />
                      <h4 className="font-medium text-center">Content Creation</h4>
                      <p className="text-xs text-center mt-1">Manual or AI-generated content creation</p>
                    </div>
                    
                    <div className="hidden md:block text-gray-400">→</div>
                    <div className="block md:hidden text-gray-400">↓</div>
                    
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex flex-col items-center">
                      <Shield size={24} className="text-purple-500 mb-2" />
                      <h4 className="font-medium text-center">Review & Approval</h4>
                      <p className="text-xs text-center mt-1">Quality check and content approval</p>
                    </div>
                    
                    <div className="hidden md:block text-gray-400">→</div>
                    <div className="block md:hidden text-gray-400">↓</div>
                    
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex flex-col items-center">
                      <BookOpen size={24} className="text-green-500 mb-2" />
                      <h4 className="font-medium text-center">Publication</h4>
                      <p className="text-xs text-center mt-1">Content made available to students</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleViewFullDoc("Content Workflow Guide")}
                  className="w-full"
                >
                  View Complete Content Management Guide
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Content Types</h3>
                  <p className="text-sm mb-3">Documentation for different content types in the system:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Concept Cards</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Concept Cards Guide")}
                      >
                        View
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Flashcards</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Flashcards Guide")}
                      >
                        View
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Exam Papers</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Exam Papers Guide")}
                      >
                        View
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Study Materials</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Study Materials Guide")}
                      >
                        View
                      </Button>
                    </li>
                  </ul>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Content Generation</h3>
                  <p className="text-sm mb-3">Documentation for AI-powered content generation:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>GPT Prompt Templates</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("GPT Prompt Templates")}
                      >
                        View
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Content Formatting Guidelines</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Content Formatting Guidelines")}
                      >
                        View
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span>Review Process</span>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewFullDoc("Review Process")}
                      >
                        View
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Architecture</CardTitle>
              <p className="text-sm text-gray-500">Security measures and data protection</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">Authentication & Authorization</h3>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  <li><span className="font-medium">JWT-based Authentication:</span> Secure token-based authentication</li>
                  <li><span className="font-medium">Role-based Access Control:</span> Admin, Tutor, Student access levels</li>
                  <li><span className="font-medium">OAuth2:</span> Optional SSO with educational institutions</li>
                  <li><span className="font-medium">2FA:</span> Two-factor authentication for admin accounts</li>
                </ul>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">Data Protection</h3>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  <li><span className="font-medium">Database Encryption:</span> Sensitive data encrypted at rest</li>
                  <li><span className="font-medium">HTTPS:</span> All API communications encrypted in transit</li>
                  <li><span className="font-medium">PII Handling:</span> Compliance with data protection regulations</li>
                  <li><span className="font-medium">Backup Strategy:</span> Regular encrypted backups</li>
                </ul>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">API Security</h3>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  <li><span className="font-medium">Rate Limiting:</span> Protection against abuse</li>
                  <li><span className="font-medium">CSRF Protection:</span> Cross-site request forgery prevention</li>
                  <li><span className="font-medium">Input Validation:</span> Sanitization of all inputs</li>
                  <li><span className="font-medium">API Keys:</span> Secure key management for third-party APIs</li>
                </ul>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">Monitoring & Logging</h3>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  <li><span className="font-medium">Audit Logs:</span> Comprehensive logging of admin actions</li>
                  <li><span className="font-medium">Intrusion Detection:</span> Monitoring for suspicious activities</li>
                  <li><span className="font-medium">Error Logs:</span> Detailed system error tracking</li>
                  <li><span className="font-medium">Performance Monitoring:</span> System health and responsiveness</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentationTab;
