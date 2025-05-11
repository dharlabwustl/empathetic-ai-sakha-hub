
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, FileCog, Code, Server, 
  Brain, Database, Network, Puzzle, 
  ListChecks, FileJson, ArrowRight, RefreshCw,
  Check, Play, BookOpen, ExternalLink, Copy, MessageSquare
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FlaskIntegrationGuide = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [testingEndpoint, setTestingEndpoint] = useState("");
  const [testResult, setTestResult] = useState<null | { success: boolean; message: string }>(null);
  const [isTesting, setIsTesting] = useState(false);
  
  const handleDownloadGuide = () => {
    toast({
      title: "Downloading Integration Guide",
      description: "Preparing the comprehensive Flask integration documentation",
      variant: "default"
    });
    
    setTimeout(() => {
      const jsonContent = JSON.stringify({
        title: "Flask Integration Guide",
        version: "1.2.0",
        sections: [
          "Setup & Installation",
          "API Configuration",
          "Database Connection",
          "AI Model Integration",
          "Security Best Practices",
          "Deployment Guide"
        ],
        content: "Full documentation content would be here..."
      }, null, 2);
      
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flask-integration-guide.json';
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Complete",
        description: "Flask integration guide has been downloaded successfully",
        variant: "default"
      });
    }, 1500);
  };
  
  const handleCopyEndpoint = (endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    toast({
      title: "Endpoint Copied",
      description: "API endpoint copied to clipboard",
      variant: "default"
    });
  };
  
  const handleDownloadSchemas = () => {
    toast({
      title: "Downloading Schema Documentation",
      description: "Preparing database schema documentation",
      variant: "default"
    });
    
    setTimeout(() => {
      const jsonContent = JSON.stringify({
        title: "Database Schema Documentation",
        version: "1.3.1",
        tables: [
          {
            name: "users",
            columns: [
              { name: "id", type: "UUID", primaryKey: true },
              { name: "name", type: "VARCHAR(255)" },
              { name: "email", type: "VARCHAR(255)", unique: true },
              { name: "created_at", type: "TIMESTAMP" }
            ]
          },
          {
            name: "study_plans",
            columns: [
              { name: "id", type: "UUID", primaryKey: true },
              { name: "user_id", type: "UUID", foreignKey: "users.id" },
              { name: "title", type: "VARCHAR(255)" },
              { name: "created_at", type: "TIMESTAMP" }
            ]
          }
        ]
      }, null, 2);
      
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'database-schemas.json';
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Complete",
        description: "Database schema documentation has been downloaded successfully",
        variant: "default"
      });
    }, 1500);
  };

  const handleTestEndpoint = () => {
    if (!testingEndpoint) {
      toast({
        title: "Error",
        description: "Please enter an endpoint to test",
        variant: "destructive"
      });
      return;
    }
    
    setIsTesting(true);
    setTestResult(null);
    
    // Simulate API testing
    setTimeout(() => {
      setIsTesting(false);
      
      // Simple validation for demo
      if (testingEndpoint.startsWith('/api/v1/') || testingEndpoint.startsWith('http')) {
        setTestResult({
          success: true,
          message: "Endpoint successfully tested. Status: 200 OK"
        });
        toast({
          title: "Test Successful",
          description: "API endpoint is available and responding properly",
          variant: "default"
        });
      } else {
        setTestResult({
          success: false,
          message: "Invalid endpoint format or endpoint not found. Status: 404"
        });
        toast({
          title: "Test Failed",
          description: "API endpoint test failed",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  // API endpoints data
  const apiEndpoints = [
    { 
      method: "GET", 
      endpoint: "/api/v1/students", 
      description: "Retrieve all students with pagination",
      authenticated: true
    },
    { 
      method: "POST", 
      endpoint: "/api/v1/students", 
      description: "Create a new student",
      authenticated: true
    },
    { 
      method: "GET", 
      endpoint: "/api/v1/students/:id", 
      description: "Retrieve a specific student by ID",
      authenticated: true
    },
    { 
      method: "PUT", 
      endpoint: "/api/v1/students/:id", 
      description: "Update a specific student",
      authenticated: true
    },
    { 
      method: "POST", 
      endpoint: "/api/v1/auth/login", 
      description: "Authenticate a user",
      authenticated: false
    },
    { 
      method: "POST", 
      endpoint: "/api/v1/auth/register", 
      description: "Register a new user",
      authenticated: false
    },
    { 
      method: "POST", 
      endpoint: "/api/v1/content/upload", 
      description: "Upload content files",
      authenticated: true
    },
    { 
      method: "GET", 
      endpoint: "/api/v1/content", 
      description: "Get all content files with pagination",
      authenticated: true
    },
    { 
      method: "GET", 
      endpoint: "/api/v1/admin/dashboard", 
      description: "Get admin dashboard statistics",
      authenticated: true,
      adminOnly: true
    },
    {
      method: "GET",
      endpoint: "/api/v1/study-plans/:id",
      description: "Get a specific study plan",
      authenticated: true
    },
    {
      method: "GET",
      endpoint: "/api/v1/concept-cards",
      description: "Get all concept cards with pagination",
      authenticated: true
    },
    {
      method: "POST",
      endpoint: "/api/v1/mood/log",
      description: "Log user mood data",
      authenticated: true
    }
  ];

  // Database models
  const databaseModels = [
    {
      name: "User",
      tableName: "users",
      fields: [
        { name: "id", type: "Integer", constraints: "Primary Key" },
        { name: "email", type: "String(100)", constraints: "Unique, Not Null" },
        { name: "password_hash", type: "String(200)", constraints: "Not Null" },
        { name: "name", type: "String(100)", constraints: "Not Null" },
        { name: "role", type: "String(20)", constraints: "Not Null" },
        { name: "created_at", type: "DateTime", constraints: "Not Null" },
        { name: "updated_at", type: "DateTime", constraints: "Not Null" }
      ],
      relationships: [
        { type: "One-to-One", target: "StudentProfile", through: "id -> student_profiles.user_id" },
        { type: "One-to-Many", target: "MoodLog", through: "id -> mood_logs.user_id" },
        { type: "One-to-Many", target: "StudyPlan", through: "id -> study_plans.user_id" }
      ]
    },
    {
      name: "StudentProfile",
      tableName: "student_profiles",
      fields: [
        { name: "id", type: "Integer", constraints: "Primary Key" },
        { name: "user_id", type: "Integer", constraints: "Foreign Key (users.id)" },
        { name: "learning_style", type: "String(50)", constraints: "Nullable" },
        { name: "study_preference", type: "String(50)", constraints: "Nullable" },
        { name: "target_exam", type: "String(100)", constraints: "Nullable" },
        { name: "exam_date", type: "Date", constraints: "Nullable" },
        { name: "study_hours_per_week", type: "Integer", constraints: "Nullable" },
        { name: "created_at", type: "DateTime", constraints: "Not Null" },
        { name: "updated_at", type: "DateTime", constraints: "Not Null" }
      ],
      relationships: [
        { type: "One-to-One", target: "User", through: "user_id -> users.id" }
      ]
    },
    {
      name: "StudyPlan",
      tableName: "study_plans",
      fields: [
        { name: "id", type: "Integer", constraints: "Primary Key" },
        { name: "user_id", type: "Integer", constraints: "Foreign Key (users.id)" },
        { name: "title", type: "String(200)", constraints: "Not Null" },
        { name: "description", type: "Text", constraints: "Nullable" },
        { name: "start_date", type: "Date", constraints: "Not Null" },
        { name: "end_date", type: "Date", constraints: "Not Null" },
        { name: "status", type: "String(20)", constraints: "Not Null" },
        { name: "created_at", type: "DateTime", constraints: "Not Null" },
        { name: "updated_at", type: "DateTime", constraints: "Not Null" }
      ],
      relationships: [
        { type: "Many-to-One", target: "User", through: "user_id -> users.id" },
        { type: "One-to-Many", target: "StudyPlanSubject", through: "id -> study_plan_subjects.study_plan_id" }
      ]
    },
    {
      name: "StudyPlanSubject",
      tableName: "study_plan_subjects",
      fields: [
        { name: "id", type: "Integer", constraints: "Primary Key" },
        { name: "study_plan_id", type: "Integer", constraints: "Foreign Key (study_plans.id)" },
        { name: "subject_id", type: "Integer", constraints: "Foreign Key (subjects.id)" },
        { name: "proficiency_level", type: "String(20)", constraints: "Not Null" },
        { name: "priority", type: "Integer", constraints: "Not Null" },
        { name: "hours_allocated", type: "Integer", constraints: "Not Null" },
        { name: "created_at", type: "DateTime", constraints: "Not Null" },
        { name: "updated_at", type: "DateTime", constraints: "Not Null" }
      ],
      relationships: [
        { type: "Many-to-One", target: "StudyPlan", through: "study_plan_id -> study_plans.id" },
        { type: "Many-to-One", target: "Subject", through: "subject_id -> subjects.id" }
      ]
    },
    {
      name: "Subject",
      tableName: "subjects",
      fields: [
        { name: "id", type: "Integer", constraints: "Primary Key" },
        { name: "name", type: "String(100)", constraints: "Not Null" },
        { name: "category", type: "String(100)", constraints: "Nullable" },
        { name: "created_at", type: "DateTime", constraints: "Not Null" },
        { name: "updated_at", type: "DateTime", constraints: "Not Null" }
      ],
      relationships: [
        { type: "One-to-Many", target: "StudyPlanSubject", through: "id -> study_plan_subjects.subject_id" },
        { type: "One-to-Many", target: "ConceptCard", through: "id -> concept_cards.subject_id" }
      ]
    },
    {
      name: "ConceptCard",
      tableName: "concept_cards",
      fields: [
        { name: "id", type: "Integer", constraints: "Primary Key" },
        { name: "subject_id", type: "Integer", constraints: "Foreign Key (subjects.id)" },
        { name: "title", type: "String(200)", constraints: "Not Null" },
        { name: "content", type: "Text", constraints: "Not Null" },
        { name: "difficulty_level", type: "String(20)", constraints: "Not Null" },
        { name: "created_at", type: "DateTime", constraints: "Not Null" },
        { name: "updated_at", type: "DateTime", constraints: "Not Null" }
      ],
      relationships: [
        { type: "Many-to-One", target: "Subject", through: "subject_id -> subjects.id" },
        { type: "One-to-Many", target: "Flashcard", through: "id -> flashcards.concept_card_id" }
      ]
    },
    {
      name: "Flashcard",
      tableName: "flashcards",
      fields: [
        { name: "id", type: "Integer", constraints: "Primary Key" },
        { name: "concept_card_id", type: "Integer", constraints: "Foreign Key (concept_cards.id)" },
        { name: "question", type: "Text", constraints: "Not Null" },
        { name: "answer", type: "Text", constraints: "Not Null" },
        { name: "created_at", type: "DateTime", constraints: "Not Null" },
        { name: "updated_at", type: "DateTime", constraints: "Not Null" }
      ],
      relationships: [
        { type: "Many-to-One", target: "ConceptCard", through: "concept_card_id -> concept_cards.id" }
      ]
    },
    {
      name: "MoodLog",
      tableName: "mood_logs",
      fields: [
        { name: "id", type: "Integer", constraints: "Primary Key" },
        { name: "user_id", type: "Integer", constraints: "Foreign Key (users.id)" },
        { name: "mood_type", type: "String(50)", constraints: "Not Null" },
        { name: "intensity", type: "Integer", constraints: "Not Null" },
        { name: "notes", type: "Text", constraints: "Nullable" },
        { name: "logged_at", type: "DateTime", constraints: "Not Null" },
        { name: "created_at", type: "DateTime", constraints: "Not Null" }
      ],
      relationships: [
        { type: "Many-to-One", target: "User", through: "user_id -> users.id" }
      ]
    }
  ];

  // Implementation steps
  const implementationSteps = [
    {
      title: "1. Project Setup",
      steps: [
        "Install Flask and dependencies (Flask-SQLAlchemy, Flask-Migrate, Flask-JWT-Extended)",
        "Create project structure with app modules for auth, students, study plans, etc.",
        "Configure environment variables for database connection and security keys",
        "Set up Flask app with CORS support for frontend integration"
      ],
      code: `# Example Flask app setup
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object('config.Config')

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Import models
from app.models import *

# Register blueprints
from app.auth.routes import auth_bp
from app.students.routes import students_bp
from app.study_plans.routes import plans_bp

app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
app.register_blueprint(students_bp, url_prefix='/api/v1/students')
app.register_blueprint(plans_bp, url_prefix='/api/v1/study-plans')

if __name__ == '__main__':
    app.run(debug=True)`
    },
    {
      title: "2. Database Models Implementation",
      steps: [
        "Create SQLAlchemy models for all entities (users, profiles, study plans, etc.)",
        "Define relationships between models using back_populates and foreign keys",
        "Add helper methods to models for common operations",
        "Set up Flask-Migrate for database migrations"
      ],
      code: `# Example User model
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='student')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    profile = db.relationship('StudentProfile', uselist=False, back_populates='user')
    study_plans = db.relationship('StudyPlan', back_populates='user')
    mood_logs = db.relationship('MoodLog', back_populates='user')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
        
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'created_at': self.created_at.isoformat()
        }`
    },
    {
      title: "3. Authentication System",
      steps: [
        "Implement JWT-based authentication system",
        "Create login, registration and token refresh endpoints",
        "Add authentication middleware for protected routes",
        "Implement role-based access control"
      ],
      code: `# Example auth routes
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import User, db
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 409
        
    user = User(
        email=data['email'],
        name=data['name'],
        role='student'
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
        
    access_token = create_access_token(
        identity=user.id,
        additional_claims={'role': user.role},
        expires_delta=timedelta(hours=24)
    )
    
    return jsonify({
        'access_token': access_token,
        'user': user.to_dict()
    }), 200`
    },
    {
      title: "4. API Endpoints Implementation",
      steps: [
        "Create REST API endpoints for all resources",
        "Implement CRUD operations for students, study plans, etc.",
        "Add pagination, filtering and sorting for list endpoints",
        "Implement proper error handling and validation"
      ],
      code: `# Example study plan routes
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import StudyPlan, StudyPlanSubject, Subject, db
from app.utils.pagination import paginate_results

plans_bp = Blueprint('study_plans', __name__)

@plans_bp.route('/', methods=['GET'])
@jwt_required()
def get_study_plans():
    user_id = get_jwt_identity()
    query = StudyPlan.query.filter_by(user_id=user_id)
    
    return paginate_results(query, request)

@plans_bp.route('/<int:plan_id>', methods=['GET'])
@jwt_required()
def get_study_plan(plan_id):
    user_id = get_jwt_identity()
    plan = StudyPlan.query.filter_by(id=plan_id, user_id=user_id).first_or_404()
    
    return jsonify(plan.to_dict(with_subjects=True)), 200

@plans_bp.route('/', methods=['POST'])
@jwt_required()
def create_study_plan():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    plan = StudyPlan(
        user_id=user_id,
        title=data['title'],
        description=data.get('description'),
        start_date=data['start_date'],
        end_date=data['end_date'],
        status='active'
    )
    
    db.session.add(plan)
    db.session.commit()
    
    # Add subjects to plan
    for subject_data in data.get('subjects', []):
        subject = Subject.query.get(subject_data['subject_id'])
        if subject:
            plan_subject = StudyPlanSubject(
                study_plan_id=plan.id,
                subject_id=subject.id,
                proficiency_level=subject_data['proficiency_level'],
                priority=subject_data['priority'],
                hours_allocated=subject_data['hours_allocated']
            )
            db.session.add(plan_subject)
    
    db.session.commit()
    return jsonify(plan.to_dict()), 201`
    },
    {
      title: "5. AI Model Integration",
      steps: [
        "Set up integration with external AI services or local models",
        "Create endpoints for personalized study plan generation",
        "Implement mood analysis and recommendations system",
        "Add adaptive learning features based on student progress"
      ],
      code: `# Example AI integration for study recommendations
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import openai
from app.models import User, StudyPlan, MoodLog
from app.config import Config

ai_bp = Blueprint('ai', __name__)

openai.api_key = Config.OPENAI_API_KEY

@ai_bp.route('/personalize', methods=['POST'])
@jwt_required()
def get_personalized_plan():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    profile = user.profile
    
    # Get recent mood data
    recent_moods = MoodLog.query.filter_by(user_id=user_id).order_by(
        MoodLog.logged_at.desc()).limit(5).all()
    
    # Generate context for AI
    context = {
        "learning_style": profile.learning_style,
        "study_preference": profile.study_preference,
        "target_exam": profile.target_exam,
        "exam_date": profile.exam_date.isoformat() if profile.exam_date else None,
        "recent_moods": [m.mood_type for m in recent_moods]
    }
    
    # Call OpenAI API for personalized recommendations
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an AI academic advisor."},
            {"role": "user", "content": f"Generate a personalized study plan based on: {context}"}
        ],
        max_tokens=500
    )
    
    recommendations = response.choices[0].message.content
    
    return jsonify({
        "personalized_plan": recommendations,
        "user_context": context
    }), 200`
    },
    {
      title: "6. Testing & Deployment",
      steps: [
        "Write unit and integration tests for all functionality",
        "Set up CI/CD pipeline for automated testing and deployment",
        "Configure production database and environment",
        "Deploy Flask application with gunicorn/uwsgi behind nginx"
      ],
      code: `# Example test file
import unittest
from app import app, db
from app.models import User

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.client = app.test_client()
        with app.app_context():
            db.create_all()
            
    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()
            
    def test_user_registration(self):
        response = self.client.post('/api/v1/auth/register', json={
            'email': 'test@example.com',
            'password': 'password123',
            'name': 'Test User'
        })
        self.assertEqual(response.status_code, 201)
        
        with app.app_context():
            user = User.query.filter_by(email='test@example.com').first()
            self.assertIsNotNone(user)
            
    def test_user_login(self):
        # Register user first
        self.client.post('/api/v1/auth/register', json={
            'email': 'test@example.com',
            'password': 'password123',
            'name': 'Test User'
        })
        
        # Try logging in
        response = self.client.post('/api/v1/auth/login', json={
            'email': 'test@example.com',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('access_token', data)
        
if __name__ == '__main__':
    unittest.main()`
    }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Server className="text-purple-500" />
          Flask Backend Integration
        </CardTitle>
        <CardDescription>
          Comprehensive guide for seamlessly connecting your PREPZR application with Flask backend services
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-6">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex items-center gap-2 flex-1">
              <Code size={16} />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="endpoints" className="flex items-center gap-2 flex-1">
              <Server size={16} />
              <span>API Endpoints</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2 flex-1">
              <Database size={16} />
              <span>Database Schema</span>
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2 flex-1">
              <BookOpen size={16} />
              <span>Implementation Guide</span>
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center gap-2 flex-1">
              <Play size={16} />
              <span>Testing</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="space-y-6 mt-6">
          <TabsContent value="overview" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Code className="text-blue-500" />
                  Integration Steps
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li className="pb-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Setup Flask environment</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Create a Flask application with essential extensions like Flask-SQLAlchemy, Flask-Migrate, and Flask-JWT-Extended.
                      </p>
                    </li>
                    <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Define database models</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Create SQLAlchemy models for users, student profiles, study plans, concept cards, and other entities.
                      </p>
                    </li>
                    <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Implement authentication</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Set up JWT-based authentication with login, registration, and protected routes.
                      </p>
                    </li>
                    <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Create RESTful APIs</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Develop comprehensive API endpoints for all features of the application.
                      </p>
                    </li>
                    <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Integrate AI services</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Connect to external AI services or implement your own for personalized recommendations.
                      </p>
                    </li>
                    <li className="pt-3">
                      <span className="font-medium">Test and deploy</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Write comprehensive tests and deploy to production environment.
                      </p>
                    </li>
                  </ol>
                </div>
                
                <div className="flex justify-between mt-2">
                  <Button 
                    className="gap-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                    onClick={handleDownloadGuide}
                  >
                    <Download size={16} />
                    Download Complete Guide
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      window.open("https://github.com/flask-projects/ai-flask-template", "_blank");
                    }}
                  >
                    <Code size={16} />
                    View Sample Code
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Database className="text-green-500" />
                  System Architecture
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Key Components</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-100 text-blue-800 rounded-full p-1 mt-0.5">
                        <Server size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Flask Application Server</p>
                        <p className="text-gray-600 dark:text-gray-400">Core backend with RESTful APIs, authentication, and business logic</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="bg-green-100 text-green-800 rounded-full p-1 mt-0.5">
                        <Database size={16} />
                      </div>
                      <div>
                        <p className="font-medium">MySQL Database</p>
                        <p className="text-gray-600 dark:text-gray-400">Relational database for structured data storage with optimized schema</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="bg-purple-100 text-purple-800 rounded-full p-1 mt-0.5">
                        <Brain size={16} />
                      </div>
                      <div>
                        <p className="font-medium">AI Services Integration</p>
                        <p className="text-gray-600 dark:text-gray-400">External AI APIs or local models for personalized learning</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="bg-amber-100 text-amber-800 rounded-full p-1 mt-0.5">
                        <FileCog size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Content Management System</p>
                        <p className="text-gray-600 dark:text-gray-400">Backend services for creating and managing educational content</p>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mt-4 mb-2">Data Flow</h4>
                  <div className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md">
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>React frontend sends requests to Flask backend API endpoints</li>
                      <li>Flask authenticates requests via JWT middleware</li>
                      <li>Business logic processes requests and interacts with database</li>
                      <li>AI services enhance data with personalized recommendations</li>
                      <li>Response data is formatted and returned to frontend</li>
                    </ol>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-4 rounded-lg border border-purple-100 dark:border-purple-900/50">
                  <h4 className="font-medium flex items-center gap-2">
                    <Brain className="text-purple-500" />
                    AI Integration Highlights
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    The Flask backend includes connectors for various AI models to power the personalization features.
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Puzzle className="text-purple-500" size={14} />
                      <span>Personalized study plan generation based on learning preferences</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Puzzle className="text-purple-500" size={14} />
                      <span>Mood analysis and content recommendation engine</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Puzzle className="text-purple-500" size={14} />
                      <span>Adaptive difficulty system for questions and practice exams</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints" className="m-0">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-3">API Endpoints Reference</h3>
                <p className="text-sm mb-4">
                  These endpoints should be implemented in your Flask backend to support all features of the PREPZR application.
                </p>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Method</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Auth Required</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiEndpoints.map((endpoint, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge className={
                              endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                              endpoint.method === 'PUT' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {endpoint.method}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{endpoint.endpoint}</TableCell>
                          <TableCell>{endpoint.description}</TableCell>
                          <TableCell>
                            {endpoint.authenticated ? (
                              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                                {endpoint.adminOnly ? "Admin Only" : "Yes"}
                              </Badge>
                            ) : (
                              <Badge variant="outline">Public</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleCopyEndpoint(endpoint.endpoint)}
                            >
                              <Copy size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="database" className="m-0">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Database Schema & Models</h3>
                <p className="text-sm mb-4">
                  Below are the SQLAlchemy models you'll need to implement in your Flask application to support all features.
                </p>
                
                <div className="overflow-x-auto">
                  {databaseModels.map((model, index) => (
                    <div key={index} className="mb-8">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="text-blue-500" size={18} />
                        <h4 className="font-medium text-lg">{model.name}</h4>
                        <Badge variant="outline" className="ml-2">Table: {model.tableName}</Badge>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 mb-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Field</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Constraints</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {model.fields.map((field, fieldIndex) => (
                              <TableRow key={fieldIndex}>
                                <TableCell className="font-medium font-mono">{field.name}</TableCell>
                                <TableCell>{field.type}</TableCell>
                                <TableCell>{field.constraints}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="mb-2">
                        <h5 className="font-medium text-sm mb-2">Relationships:</h5>
                        <ul className="space-y-1 text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                          {model.relationships.map((rel, relIndex) => (
                            <li key={relIndex} className="flex items-center gap-2">
                              <ArrowRight size={14} className="text-purple-500" />
                              <span>
                                <span className="font-medium">{rel.type}</span> with <span className="font-medium text-blue-600 dark:text-blue-400">{rel.target}</span> via {rel.through}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* SQLAlchemy Code Example */}
                      <div className="mt-4">
                        <h5 className="font-medium text-sm mb-2">SQLAlchemy Model Code:</h5>
                        <div className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm font-mono">
                          <pre>{`class ${model.name}(db.Model):
    __tablename__ = '${model.tableName}'
    
    ${model.fields.map(f => `${f.name} = db.Column(db.${f.type}, ${f.constraints.toLowerCase().includes('primary key') ? 'primary_key=True' : ''}${f.constraints.toLowerCase().includes('not null') ? ', nullable=False' : ''}${f.constraints.toLowerCase().includes('unique') ? ', unique=True' : ''})`).join('\n    ')}
    
    ${model.relationships.map(r => {
      if (r.type === 'One-to-Many') {
        return `${r.target.toLowerCase()}s = db.relationship('${r.target}', back_populates='${model.name.toLowerCase()}')`
      } else if (r.type === 'Many-to-One') {
        return `${r.target.toLowerCase()} = db.relationship('${r.target}', back_populates='${model.name.toLowerCase()}s')`
      } else if (r.type === 'One-to-One') {
        return `${r.target.toLowerCase()} = db.relationship('${r.target}', back_populates='${model.name.toLowerCase()}', uselist=False)`
      } else {
        return `# Many-to-Many relationship implementation`
      }
    }).join('\n    ')}`}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Entity Relationship Diagram</h4>
                  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="space-y-2 overflow-x-auto">
                      <div className="min-w-[800px]">
                        <h5 className="font-medium text-sm mb-2">Core Relationships:</h5>
                        <ul className="space-y-2 text-sm">
                          <li className="p-2 border border-gray-200 dark:border-gray-800 rounded">
                            <span className="font-medium">User</span> → <span className="text-blue-600">one-to-one</span> → <span className="font-medium">StudentProfile</span> (user's detailed information)
                          </li>
                          <li className="p-2 border border-gray-200 dark:border-gray-800 rounded">
                            <span className="font-medium">User</span> → <span className="text-blue-600">one-to-many</span> → <span className="font-medium">StudyPlan</span> (user can have multiple study plans)
                          </li>
                          <li className="p-2 border border-gray-200 dark:border-gray-800 rounded">
                            <span className="font-medium">StudyPlan</span> → <span className="text-blue-600">one-to-many</span> → <span className="font-medium">StudyPlanSubject</span> (study plan contains multiple subjects)
                          </li>
                          <li className="p-2 border border-gray-200 dark:border-gray-800 rounded">
                            <span className="font-medium">Subject</span> → <span className="text-blue-600">one-to-many</span> → <span className="font-medium">ConceptCard</span> (subject contains multiple concept cards)
                          </li>
                          <li className="p-2 border border-gray-200 dark:border-gray-800 rounded">
                            <span className="font-medium">ConceptCard</span> → <span className="text-blue-600">one-to-many</span> → <span className="font-medium">Flashcard</span> (concept card has multiple flashcards)
                          </li>
                          <li className="p-2 border border-gray-200 dark:border-gray-800 rounded">
                            <span className="font-medium">User</span> → <span className="text-blue-600">one-to-many</span> → <span className="font-medium">MoodLog</span> (user has multiple mood logs)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={handleDownloadSchemas} 
                    className="gap-2"
                  >
                    <Download size={16} />
                    Download Schema Documentation
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="implementation" className="m-0">
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Step-by-Step Implementation Guide</h3>
                <p className="text-sm mb-4">
                  Follow this guide to implement all features required by the PREPZR application in your Flask backend.
                </p>
                
                {implementationSteps.map((step, index) => (
                  <div key={index} className="mb-8 last:mb-0">
                    <h4 className="text-lg font-medium mb-3">{step.title}</h4>
                    
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        {step.steps.map((substep, subIndex) => (
                          <li key={subIndex}>{substep}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                      <pre>{step.code}</pre>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={handleDownloadGuide} 
                    className="gap-2"
                  >
                    <Download size={16} />
                    Download Full Implementation Guide
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="testing" className="m-0">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-3">API Endpoint Testing</h3>
                <p className="text-sm mb-4">
                  Test your API endpoints to ensure they are properly configured and responding as expected.
                </p>
                
                <div className="flex gap-2 mb-4">
                  <Input 
                    placeholder="Enter API endpoint (e.g., /api/v1/students)" 
                    value={testingEndpoint}
                    onChange={(e) => setTestingEndpoint(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleTestEndpoint}
                    disabled={isTesting}
                    className="gap-2"
                  >
                    {isTesting ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
                    {isTesting ? "Testing..." : "Test Endpoint"}
                  </Button>
                </div>
                
                {testResult && (
                  <div className={`p-4 rounded-lg mt-4 ${testResult.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    <div className="flex items-center gap-2">
                      {testResult.success ? (
                        <Check className="text-green-500" size={18} />
                      ) : (
                        <RefreshCw className="text-red-500" size={18} />
                      )}
                      <span className="font-medium">{testResult.message}</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Quick Test Common Endpoints</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setTestingEndpoint('/api/v1/students')}
                    >
                      <Server className="mr-2 h-4 w-4 text-green-500" />
                      /api/v1/students
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setTestingEndpoint('/api/v1/auth/login')}
                    >
                      <Server className="mr-2 h-4 w-4 text-blue-500" />
                      /api/v1/auth/login
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setTestingEndpoint('/api/v1/study-plans')}
                    >
                      <Server className="mr-2 h-4 w-4 text-purple-500" />
                      /api/v1/study-plans
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={() => setTestingEndpoint('/api/v1/concept-cards')}
                    >
                      <Server className="mr-2 h-4 w-4 text-amber-500" />
                      /api/v1/concept-cards
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="border-t pt-4 mt-4 flex flex-wrap justify-between gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button variant="outline" className="justify-start text-xs h-8">
            <ListChecks className="mr-2 h-4 w-4 text-green-500" />
            Technical Documentation
          </Button>
          <Button variant="outline" className="justify-start text-xs h-8">
            <Network className="mr-2 h-4 w-4 text-blue-500" />
            Developer Community
          </Button>
          <Button variant="outline" className="justify-start text-xs h-8">
            <FileCog className="mr-2 h-4 w-4 text-purple-500" />
            Integration Guide
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FlaskIntegrationGuide;
