
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Server,
  Database,
  Brain,
  Shield,
  Download,
  BookOpen,
  Code,
  Globe
} from "lucide-react";

const DocumentationTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard Architecture</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          <span>Download as PDF</span>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="frontend" className="text-sm">Frontend</TabsTrigger>
          <TabsTrigger value="backend" className="text-sm">Backend</TabsTrigger>
          <TabsTrigger value="ai" className="text-sm">AI Components</TabsTrigger>
          <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
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
        
        {/* Frontend Tab */}
        <TabsContent value="frontend">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frontend Architecture</CardTitle>
              <p className="text-sm text-gray-500">Detailed information about the frontend implementation</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm">Frontend architecture details would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Backend Tab */}
        <TabsContent value="backend">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Backend Architecture</CardTitle>
              <p className="text-sm text-gray-500">Detailed information about the backend implementation</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm">Backend architecture details would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* AI Components Tab */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Components</CardTitle>
              <p className="text-sm text-gray-500">AI models and integration details</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-3">AI Integration Architecture</h3>
                <p className="text-sm mb-3">
                  The Sakha AI platform integrates several AI models and components:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-medium mb-1">Learning Style Detection</h4>
                    <ul className="space-y-1 text-sm list-disc pl-5">
                      <li><span className="font-medium">ML Models:</span> Classification based on responses during onboarding</li>
                      <li><span className="font-medium">GPT Logic:</span> Extract weak concepts from sign-up inputs</li>
                      <li><span className="font-medium">Admin Control:</span> View learning style clusters and adjust sensitivity</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-1">Personalized Study Planning</h4>
                    <ul className="space-y-1 text-sm list-disc pl-5">
                      <li><span className="font-medium">Models:</span> Recommender + GPT + NLP classifier for papers & subject mapping</li>
                      <li><span className="font-medium">Adaptive Engine:</span> Difficulty adjustment based on performance</li>
                      <li><span className="font-medium">Admin Control:</span> Approve/edit plan templates, monitor adherence</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-1">Content Generation</h4>
                    <ul className="space-y-1 text-sm list-disc pl-5">
                      <li><span className="font-medium">GPT-based:</span> Generates educational content from syllabus</li>
                      <li><span className="font-medium">LLM Tuning:</span> Educational tone, exam-specific phrasing</li>
                      <li><span className="font-medium">Admin Control:</span> Review, approve, and tag content</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-1">Emotional Intelligence</h4>
                    <ul className="space-y-1 text-sm list-disc pl-5">
                      <li><span className="font-medium">Sentiment Analysis:</span> Detects mood from text interactions</li>
                      <li><span className="font-medium">Intervention Model:</span> Determines when and how to provide support</li>
                      <li><span className="font-medium">Admin Control:</span> Set thresholds, upload feel-good content</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-1">AI Doubt Solver</h4>
                    <ul className="space-y-1 text-sm list-disc pl-5">
                      <li><span className="font-medium">GPT:</span> Fine-tuned on educational content</li>
                      <li><span className="font-medium">Knowledge Base:</span> Curated content for accurate responses</li>
                      <li><span className="font-medium">Admin Control:</span> Review flagged responses, update knowledge</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
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
