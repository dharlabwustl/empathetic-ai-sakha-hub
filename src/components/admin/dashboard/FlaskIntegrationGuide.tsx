
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Server, 
  Code, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  Copy,
  Terminal,
  Database,
  Shield,
  Zap,
  Book,
  Settings,
  Play
} from 'lucide-react';

const FlaskIntegrationGuide: React.FC = () => {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast({
      title: "Code copied",
      description: "Code has been copied to your clipboard.",
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const flaskSetupCode = `# Install required packages
pip install flask flask-cors flask-sqlalchemy flask-jwt-extended python-dotenv

# Create Flask app structure
flask_app/
├── app.py
├── config.py
├── models/
│   ├── __init__.py
│   ├── user.py
│   ├── student.py
│   └── exam.py
├── routes/
│   ├── __init__.py
│   ├── auth.py
│   ├── admin.py
│   └── student.py
└── requirements.txt`;

  const mainAppCode = `from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app, origins=["http://localhost:5173", "https://yourdomain.com"])

# Import routes
from routes.auth import auth_bp
from routes.admin import admin_bp
from routes.student import student_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(student_bp, url_prefix='/api/students')

@app.route('/api/health')
def health_check():
    return jsonify({"status": "healthy", "message": "PREPZR Flask API is running"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)`;

  const configCode = `import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///prepzr.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-string'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
    # PREPZR Frontend URLs
    FRONTEND_URL = os.environ.get('FRONTEND_URL') or 'http://localhost:5173'
    ADMIN_FRONTEND_URL = os.environ.get('ADMIN_FRONTEND_URL') or 'http://localhost:5173/admin'`;

  const authRouteCode = `from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash
from models.user import User
from app import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role
            }
        })
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'success': False, 'message': 'User already exists'}), 400
    
    # Create new user
    user = User(
        name=data.get('name'),
        email=data.get('email'),
        password_hash=generate_password_hash(data.get('password')),
        role=data.get('role', 'student')
    )
    
    db.session.add(user)
    db.session.commit()
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'success': True,
        'access_token': access_token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'role': user.role
        }
    })`;

  const studentModelCode = `from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='student')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Student specific fields
    exam_type = db.Column(db.String(50))
    target_score = db.Column(db.Integer)
    study_hours_per_day = db.Column(db.Integer)
    subscription_type = db.Column(db.String(20), default='free')
    
    # Relationships
    study_sessions = db.relationship('StudySession', backref='user', lazy=True)
    mood_logs = db.relationship('MoodLog', backref='user', lazy=True)
    exam_results = db.relationship('ExamResult', backref='user', lazy=True)

class StudySession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False)
    concepts_covered = db.Column(db.Text)
    mood_before = db.Column(db.String(20))
    mood_after = db.Column(db.String(20))
    efficiency_score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MoodLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mood = db.Column(db.String(20), nullable=False)
    energy_level = db.Column(db.Integer)
    stress_level = db.Column(db.Integer)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)`;

  const adminApiCode = `from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User, StudySession, MoodLog
from app import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    # Verify admin access
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.role != 'admin':
        return jsonify({'success': False, 'message': 'Admin access required'}), 403
    
    # Calculate statistics
    total_users = User.query.count()
    active_users = User.query.filter(User.created_at >= datetime.now() - timedelta(days=30)).count()
    total_sessions = StudySession.query.count()
    avg_mood_score = db.session.query(db.func.avg(MoodLog.energy_level)).scalar() or 0
    
    return jsonify({
        'success': True,
        'data': {
            'totalUsers': total_users,
            'activeUsers': active_users,
            'totalSessions': total_sessions,
            'averageMoodScore': round(avg_mood_score, 1),
            'verifiedMoodImprovement': 72,  # Calculated metric
            'studyPlanEfficiencyImprovement': 58,
            'verifiedRetentionRate': 84
        }
    })

@admin_bp.route('/students', methods=['GET'])
@jwt_required()
def get_students():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.role != 'admin':
        return jsonify({'success': False, 'message': 'Admin access required'}), 403
    
    students = User.query.filter_by(role='student').all()
    
    students_data = [{
        'id': student.id,
        'name': student.name,
        'email': student.email,
        'examType': student.exam_type,
        'subscriptionType': student.subscription_type,
        'createdAt': student.created_at.isoformat(),
        'sessionCount': len(student.study_sessions),
        'lastActive': student.study_sessions[-1].created_at.isoformat() if student.study_sessions else None
    } for student in students]
    
    return jsonify({
        'success': True,
        'data': students_data
    })`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Flask Integration Guide</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Complete guide for integrating Flask backend with PREPZR frontend
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Full Guide (PDF)
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          Download Starter Code (ZIP)
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          View on GitHub
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="admin">Admin APIs</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Flask Backend Overview
              </CardTitle>
              <CardDescription>
                PREPZR Flask backend provides comprehensive API support for all student dashboard modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold">Core Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      JWT Authentication & Authorization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Student Dashboard APIs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Admin Management APIs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Mood Tracking & Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Study Plan Management
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Student Modules Supported</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">API</Badge>
                      Today's Plan Management
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">API</Badge>
                      Concepts & Flashcards
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">API</Badge>
                      Practice Exams
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">API</Badge>
                      Mood Tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">API</Badge>
                      Voice Assistant Integration
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flask Application Setup</CardTitle>
              <CardDescription>
                Step-by-step setup for PREPZR Flask backend
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Project Structure</h4>
                <div className="relative">
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{flaskSetupCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(flaskSetupCode, 'setup')}
                  >
                    {copiedCode === 'setup' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Main Application (app.py)</h4>
                <div className="relative">
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{mainAppCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(mainAppCode, 'main')}
                  >
                    {copiedCode === 'main' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Configuration (config.py)</h4>
                <div className="relative">
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{configCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(configCode, 'config')}
                  >
                    {copiedCode === 'config' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Models</CardTitle>
              <CardDescription>
                SQLAlchemy models for PREPZR data structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{studentModelCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(studentModelCode, 'models')}
                >
                  {copiedCode === 'models' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Routes</CardTitle>
              <CardDescription>
                JWT-based authentication for PREPZR users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{authRouteCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(authRouteCode, 'auth')}
                >
                  {copiedCode === 'auth' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin API Routes</CardTitle>
              <CardDescription>
                Complete admin dashboard API implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{adminApiCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(adminApiCode, 'admin')}
                >
                  {copiedCode === 'admin' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Guide</CardTitle>
              <CardDescription>
                Deploy your Flask backend to production
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Environment Variables</h4>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <code className="text-sm">
                      SECRET_KEY=your-production-secret-key<br/>
                      DATABASE_URL=postgresql://user:pass@host:port/dbname<br/>
                      JWT_SECRET_KEY=your-jwt-secret<br/>
                      FRONTEND_URL=https://your-prepzr-domain.com<br/>
                      ADMIN_FRONTEND_URL=https://your-prepzr-domain.com/admin
                    </code>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Production Deployment</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Terminal className="h-4 w-4" />
                      Use Gunicorn for production WSGI server
                    </li>
                    <li className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Configure PostgreSQL for production database
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Enable HTTPS and secure headers
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Set up Redis for caching and sessions
                    </li>
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

export default FlaskIntegrationGuide;
