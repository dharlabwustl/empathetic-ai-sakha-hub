
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, Globe, Code, Database, Server, BookOpen } from 'lucide-react';

const DocumentationTab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const flaskIntegrationGuide = `
# Flask Integration Guide for PREPZR Admin Dashboard

## Prerequisites
- Python 3.8+
- Flask 2.0+
- SQLAlchemy
- Flask-CORS
- Flask-JWT-Extended

## Installation

\`\`\`bash
pip install flask flask-sqlalchemy flask-cors flask-jwt-extended python-dotenv
\`\`\`

## Project Structure

\`\`\`
flask-backend/
├── app.py
├── models/
│   ├── __init__.py
│   ├── user.py
│   ├── student.py
│   ├── content.py
│   └── analytics.py
├── routes/
│   ├── __init__.py
│   ├── auth.py
│   ├── students.py
│   ├── content.py
│   └── analytics.py
├── config.py
└── requirements.txt
\`\`\`

## Database Models

### User Model
\`\`\`python
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default='student')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
\`\`\`

### Student Profile Model
\`\`\`python
class StudentProfile(db.Model):
    __tablename__ = 'student_profiles'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    target_exam = db.Column(db.String(100))
    study_preference = db.Column(db.String(50))
    current_level = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref='student_profile')
\`\`\`

## API Endpoints

### Authentication Routes
\`\`\`python
from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role
            }
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401
\`\`\`

### Student Routes
\`\`\`python
from flask_jwt_extended import jwt_required, get_jwt_identity

students_bp = Blueprint('students', __name__)

@students_bp.route('/students', methods=['GET'])
@jwt_required()
def get_students():
    students = db.session.query(User, StudentProfile).join(
        StudentProfile, User.id == StudentProfile.user_id
    ).filter(User.role == 'student').all()
    
    return jsonify([{
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'target_exam': profile.target_exam,
        'study_preference': profile.study_preference,
        'created_at': user.created_at.isoformat()
    } for user, profile in students])

@students_bp.route('/students/<student_id>/study-plans', methods=['GET'])
@jwt_required()
def get_student_study_plans(student_id):
    # Implementation for getting student study plans
    pass
\`\`\`

## Running the Application

\`\`\`python
# app.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from routes.auth import auth_bp
from routes.students import students_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    JWTManager(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(students_bp, url_prefix='/api')
    
    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
\`\`\`

## Configuration

\`\`\`python
# config.py
import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///prepzr.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-string'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
\`\`\`

## Environment Variables

\`\`\`bash
# .env
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://username:password@localhost/prepzr_db
JWT_SECRET_KEY=your-jwt-secret-key
FRONTEND_URL=http://localhost:3000
\`\`\`

## Testing the Integration

\`\`\`bash
# Start the Flask server
python app.py

# Test API endpoints
curl -X POST http://localhost:5000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"admin@prepzr.com","password":"password"}'
\`\`\`

This Flask backend provides:
- User authentication and authorization
- Student management endpoints
- Study plan and content management
- Analytics and reporting APIs
- Real-time data synchronization with the admin dashboard
`;

  const handleExportDocumentation = async (format: 'pdf' | 'word' | 'json') => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let content = '';
      let filename = '';
      let mimeType = '';

      if (format === 'json') {
        content = JSON.stringify({
          title: "PREPZR Admin Dashboard Documentation",
          version: "1.0.0",
          generatedAt: new Date().toISOString(),
          sections: {
            flaskIntegration: {
              title: "Flask Integration Guide",
              content: flaskIntegrationGuide
            },
            apiEndpoints: {
              title: "API Endpoints Reference",
              content: "Complete API documentation with all student module endpoints"
            },
            databaseSchema: {
              title: "Database Schema",
              content: "Database table definitions and relationships"
            }
          }
        }, null, 2);
        filename = 'prepzr_documentation.json';
        mimeType = 'application/json';
      } else {
        content = `PREPZR Admin Dashboard Documentation
Generated on: ${new Date().toLocaleDateString()}

${flaskIntegrationGuide}

Additional sections would include:
- API Reference
- Database Schema
- Deployment Guide
- Troubleshooting
`;
        filename = `prepzr_documentation.${format === 'pdf' ? 'pdf' : 'docx'}`;
        mimeType = format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsGenerating(false);
      toast({
        title: "Documentation Exported",
        description: `Documentation exported as ${format.toUpperCase()}`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Documentation Management</h3>
          <p className="text-sm text-gray-600">Generate and export comprehensive system documentation</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleExportDocumentation('json')} 
            disabled={isGenerating}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Export JSON
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExportDocumentation('pdf')} 
            disabled={isGenerating}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExportDocumentation('word')} 
            disabled={isGenerating}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Export Word
          </Button>
        </div>
      </div>

      <Tabs defaultValue="flask-guide">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="flask-guide" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Flask Guide
          </TabsTrigger>
          <TabsTrigger value="api-docs" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            API Docs
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="deployment" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Deployment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flask-guide">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Flask Integration Guide
              </CardTitle>
              <CardDescription>
                Complete guide for setting up Flask backend with PREPZR admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-96 overflow-y-auto">
                {flaskIntegrationGuide}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-docs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                API Documentation
              </CardTitle>
              <CardDescription>
                Complete API reference for all student module endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default" className="bg-blue-100 text-blue-800">GET</Badge>
                        <span className="font-mono text-sm">/api/students</span>
                      </div>
                      <p className="text-xs text-gray-600">Get all students</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">POST</Badge>
                        <span className="font-mono text-sm">/api/concepts</span>
                      </div>
                      <p className="text-xs text-gray-600">Create concept card</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default" className="bg-green-100 text-green-800">GET</Badge>
                        <span className="font-mono text-sm">/api/analytics</span>
                      </div>
                      <p className="text-xs text-gray-600">Get analytics data</p>
                    </CardContent>
                  </Card>
                </div>
                
                <p className="text-sm text-gray-600">
                  Complete API documentation includes 40+ endpoints covering all student modules including 
                  study plans, concept cards, flashcards, practice exams, mood tracking, analytics, and more.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Database Schema Documentation
              </CardTitle>
              <CardDescription>
                Complete database schema with tables, relationships, and indexes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Core Tables</h4>
                    <ul className="text-sm space-y-1">
                      <li>• users - User accounts and authentication</li>
                      <li>• student_profiles - Extended student information</li>
                      <li>• admin_users - Admin user management</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Content Tables</h4>
                    <ul className="text-sm space-y-1">
                      <li>• concept_cards - Educational content cards</li>
                      <li>• flashcards - Study flashcards</li>
                      <li>• practice_exams - Practice examination data</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Analytics Tables</h4>
                    <ul className="text-sm space-y-1">
                      <li>• mood_logs - Student mood tracking</li>
                      <li>• study_sessions - Study session records</li>
                      <li>• performance_metrics - Performance analytics</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">System Tables</h4>
                    <ul className="text-sm space-y-1">
                      <li>• notifications - System notifications</li>
                      <li>• system_logs - Application logs</li>
                      <li>• feature_flags - Feature toggles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Deployment Guide
              </CardTitle>
              <CardDescription>
                Instructions for deploying the Flask backend and React frontend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Production Deployment</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Configure environment variables</li>
                    <li>• Set up PostgreSQL database</li>
                    <li>• Deploy Flask backend to cloud provider</li>
                    <li>• Deploy React frontend to CDN</li>
                    <li>• Configure CORS and security headers</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Environment Configuration</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• DATABASE_URL - PostgreSQL connection string</li>
                    <li>• JWT_SECRET_KEY - JWT token signing key</li>
                    <li>• FRONTEND_URL - React app URL for CORS</li>
                    <li>• FLASK_ENV - Set to 'production'</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentationTab;
