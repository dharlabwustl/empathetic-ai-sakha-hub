
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Code,
  Database,
  Server,
  Shield,
  Layers,
} from "lucide-react";

const DocumentationTab = () => {
  const [selectedSection, setSelectedSection] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard Documentation</h2>
        <Button variant="outline">Download PDF</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Layers size={16} />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="frontend" className="flex items-center gap-2">
            <Code size={16} />
            <span>Frontend</span>
          </TabsTrigger>
          <TabsTrigger value="backend" className="flex items-center gap-2">
            <Server size={16} />
            <span>Backend</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Database size={16} />
            <span>AI Components</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Architecture Overview</h3>
                <p>High-level overview of the Sakha AI admin dashboard architecture</p>
                
                <h4>Backend Stack</h4>
                <ul>
                  <li><strong>Framework:</strong> Flask (Blueprint-based modularity)</li>
                  <li><strong>ORM:</strong> SQLAlchemy</li>
                  <li><strong>Database:</strong> MySQL</li>
                  <li><strong>Auth:</strong> JWT-based Auth / OAuth2 for SSO</li>
                  <li><strong>AI Interface:</strong> LLM/API</li>
                  <li><strong>Task Queue:</strong> Celery + Redis (for scheduled jobs)</li>
                </ul>

                <h4>Frontend Stack</h4>
                <ul>
                  <li><strong>Framework:</strong> React</li>
                  <li><strong>Styling:</strong> Tailwind CSS</li>
                  <li><strong>Component Library:</strong> Shadcn UI</li>
                  <li><strong>State Management:</strong> React Query + Context</li>
                  <li><strong>Routing:</strong> React Router</li>
                </ul>

                <h4>API Integration</h4>
                <p>The frontend makes API calls to the Flask backend for:</p>
                <ul>
                  <li>User authentication and management</li>
                  <li>Content creation and management</li>
                  <li>AI personalization settings</li>
                  <li>Analytics and reporting</li>
                  <li>System configuration</li>
                </ul>
                <p>React Query is used for efficient data fetching, caching and state management.</p>

                <h4>Database Schema (Key Entities)</h4>
                <ul>
                  <li><strong>Users:</strong> (id, email, name, role, preferences)</li>
                  <li><strong>Plans:</strong> (user_id, plan_json, status)</li>
                  <li><strong>Flashcards/Concepts:</strong> (topic_id, text, approved)</li>
                  <li><strong>Engagement Logs:</strong> (user_id, timestamp, activity)</li>
                  <li><strong>Payments:</strong> (user_id, plan, status, billing info)</li>
                  <li><strong>Moods:</strong> (user_id, mood_score, pulse_summary)</li>
                  <li><strong>Chats/Doubts:</strong> (user_id, message, response, flagged)</li>
                  <li><strong>Notifications:</strong> (type, target, status, timestamp)</li>
                </ul>

                <h4>API Endpoints (Examples)</h4>
                <ul>
                  <li>/api/users/registrations - User registration tracking</li>
                  <li>/api/content/conceptcard - Concept card management</li>
                  <li>/api/emotion/mood - Mood tracking and analysis</li>
                  <li>/api/planner/generate - Study plan generation</li>
                  <li>/api/analytics/emotion - Emotional trend analytics</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frontend">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Frontend Architecture</h3>
                
                <h4>Component Structure</h4>
                <p>The admin dashboard is built using a component-based architecture with React. Key components include:</p>
                <ul>
                  <li><strong>AdminLayout</strong> - The main layout wrapper for all admin pages</li>
                  <li><strong>DashboardStats</strong> - Overview cards showing key metrics</li>
                  <li><strong>DashboardTabs</strong> - Tab navigation for different dashboard sections</li>
                  <li><strong>UserManagementTab</strong> - User management interface</li>
                  <li><strong>AIPersonalizationTab</strong> - AI settings and controls</li>
                  <li><strong>ContentManagementTab</strong> - Content oversight tools</li>
                  <li><strong>EngagementTab</strong> - Student engagement tracking</li>
                  <li><strong>SubscriptionTab</strong> - Payment and subscription management</li>
                </ul>

                <h4>State Management</h4>
                <p>The application uses several state management approaches:</p>
                <ul>
                  <li><strong>React Context</strong> - For global state like authentication</li>
                  <li><strong>React Query</strong> - For server state management and caching</li>
                  <li><strong>Local component state</strong> - For UI-specific states</li>
                </ul>

                <h4>Authentication Flow</h4>
                <p>Authentication is handled through a dedicated AdminAuthContext that:</p>
                <ul>
                  <li>Manages login/logout operations</li>
                  <li>Stores admin user data</li>
                  <li>Provides authentication status</li>
                  <li>Guards admin routes from unauthorized access</li>
                </ul>

                <h4>Responsive Design</h4>
                <p>The dashboard is fully responsive with:</p>
                <ul>
                  <li>Mobile-first approach using Tailwind CSS breakpoints</li>
                  <li>Collapsible sidebar for smaller screens</li>
                  <li>Responsive grid and card layouts</li>
                  <li>Touch-friendly controls for mobile devices</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backend">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Backend Architecture</h3>
                
                <h4>API Structure</h4>
                <p>The backend API is organized using Flask Blueprints:</p>
                <ul>
                  <li><strong>auth_bp</strong> - Authentication and authorization</li>
                  <li><strong>users_bp</strong> - User management operations</li>
                  <li><strong>content_bp</strong> - Content management operations</li>
                  <li><strong>analytics_bp</strong> - Data analysis and reporting</li>
                  <li><strong>ai_bp</strong> - AI model interfaces and controls</li>
                </ul>

                <h4>Database Models</h4>
                <p>Key SQLAlchemy models include:</p>
                <ul>
                  <li><strong>User</strong> - User account information</li>
                  <li><strong>Content</strong> - Educational content (cards, concepts, etc.)</li>
                  <li><strong>UserActivity</strong> - Tracking user engagement</li>
                  <li><strong>AIConfig</strong> - AI model configuration settings</li>
                  <li><strong>Subscription</strong> - Payment and plan information</li>
                </ul>

                <h4>Authentication</h4>
                <p>JWT-based token authentication with:</p>
                <ul>
                  <li>Token-based API authorization</li>
                  <li>Role-based access control</li>
                  <li>Token refresh mechanism</li>
                  <li>Secure password storage with bcrypt</li>
                </ul>

                <h4>Background Tasks</h4>
                <p>Celery workers handle asynchronous operations:</p>
                <ul>
                  <li>Scheduled notifications</li>
                  <li>AI content generation</li>
                  <li>Report generation</li>
                  <li>Data cleanup and maintenance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>AI Components</h3>
                <p>The Sakha AI platform integrates several AI models and components:</p>
                
                <h4>Learning Style Detection</h4>
                <ul>
                  <li><strong>ML Models:</strong> Classification based on responses during onboarding</li>
                  <li><strong>GPT Logic:</strong> Extract weak concepts from sign-up inputs</li>
                  <li><strong>Admin Control:</strong> View learning style clusters and adjust sensitivity</li>
                </ul>

                <h4>Personalized Study Planning</h4>
                <ul>
                  <li><strong>Models:</strong> Recommender + GPT + NLP classifier for papers & subject mapping</li>
                  <li><strong>Adaptive Engine:</strong> Difficulty adjustment based on performance</li>
                  <li><strong>Admin Control:</strong> Approve/edit plan templates, monitor adherence</li>
                </ul>

                <h4>Content Generation</h4>
                <ul>
                  <li><strong>GPT-based:</strong> Generates educational content from syllabus</li>
                  <li><strong>LLM Tuning:</strong> Educational tone, exam-specific phrasing</li>
                  <li><strong>Admin Control:</strong> Review, approve, and tag content</li>
                </ul>

                <h4>Emotional Intelligence</h4>
                <ul>
                  <li><strong>Sentiment Analysis:</strong> Detects mood from text interactions</li>
                  <li><strong>Intervention Model:</strong> Determines when and how to provide support</li>
                  <li><strong>Admin Control:</strong> Set thresholds, upload feel-good content</li>
                </ul>

                <h4>AI Doubt Solver</h4>
                <ul>
                  <li><strong>GPT:</strong> Fine-tuned on educational content</li>
                  <li><strong>Knowledge Base:</strong> Curated content for accurate responses</li>
                  <li><strong>Admin Control:</strong> Review flagged responses, update knowledge</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Security Architecture</h3>
                
                <h4>Authentication & Authorization</h4>
                <ul>
                  <li><strong>JWT-based Authentication:</strong> Secure token-based authentication</li>
                  <li><strong>Role-based Access Control:</strong> Admin, Tutor, Student access levels</li>
                  <li><strong>OAuth2:</strong> Optional SSO with educational institutions</li>
                  <li><strong>2FA:</strong> Two-factor authentication for admin accounts</li>
                </ul>

                <h4>Data Protection</h4>
                <ul>
                  <li><strong>Database Encryption:</strong> Sensitive data encrypted at rest</li>
                  <li><strong>HTTPS:</strong> All API communications encrypted in transit</li>
                  <li><strong>PII Handling:</strong> Compliance with data protection regulations</li>
                  <li><strong>Backup Strategy:</strong> Regular encrypted backups</li>
                </ul>

                <h4>API Security</h4>
                <ul>
                  <li><strong>Rate Limiting:</strong> Protection against abuse</li>
                  <li><strong>CSRF Protection:</strong> Cross-site request forgery prevention</li>
                  <li><strong>Input Validation:</strong> Sanitization of all inputs</li>
                  <li><strong>API Keys:</strong> Secure key management for third-party APIs</li>
                </ul>

                <h4>Monitoring & Logging</h4>
                <ul>
                  <li><strong>Audit Logs:</strong> Comprehensive logging of admin actions</li>
                  <li><strong>Intrusion Detection:</strong> Monitoring for suspicious activities</li>
                  <li><strong>Error Logs:</strong> Detailed system error tracking</li>
                  <li><strong>Performance Monitoring:</strong> System health and responsiveness</li>
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
