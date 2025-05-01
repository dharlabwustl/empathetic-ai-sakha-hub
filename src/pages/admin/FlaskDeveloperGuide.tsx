
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const CodeBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm my-4">
      <code>{children}</code>
    </pre>
  );
};

const FlaskDeveloperGuide = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <PrepzrLogo width={120} height={40} />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Flask Developer Guide</h1>
            <p className="text-gray-500">
              Last updated: May 1, 2025
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <ScrollArea className="h-[700px] md:h-auto md:max-h-none pr-4">
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction to SAKHA AI Backend</h2>
                  <p className="text-gray-600 mb-3">
                    This guide will help you set up and integrate a Flask backend with the PREPZR frontend application. 
                    The backend powers our SAKHA AI engine and provides all the necessary APIs for our educational platform.
                  </p>
                  <p className="text-gray-600">
                    Our architecture follows a clear separation between the React frontend and Flask backend, 
                    communicating via RESTful APIs. The Flask backend handles data processing, AI operations, 
                    authentication, and database interactions.
                  </p>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Setting Up the Development Environment</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">2.1 Prerequisites</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Python 3.9+ installed</li>
                    <li>pip package manager</li>
                    <li>virtualenv (recommended)</li>
                    <li>MySQL (for data storage)</li>
                    <li>Redis (for caching and session management)</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.2 Initial Setup</h3>
                  <p className="text-gray-600 mb-3">Create a new directory for your backend and set up a virtual environment:</p>
                  <CodeBlock>
{`# Create project directory
mkdir sakha-backend
cd sakha-backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install required packages
pip install flask flask-cors flask-restful flask-jwt-extended flask-sqlalchemy flask-migrate pymysql python-dotenv redis`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">2.3 Project Structure</h3>
                  <p className="text-gray-600 mb-3">Organize your Flask backend with the following structure:</p>
                  <CodeBlock>
{`sakha-backend/
├── .env                    # Environment variables
├── config.py               # Configuration settings
├── app.py                  # Application entry point
├── requirements.txt        # Python dependencies
├── migrations/             # Database migrations
├── api/                    # API endpoints
│   ├── __init__.py
│   ├── auth.py             # Authentication endpoints
│   ├── content.py          # Content endpoints
│   ├── students.py         # Student management endpoints
│   └── ai.py               # AI processing endpoints
├── models/                 # SQLAlchemy models
│   ├── __init__.py
│   ├── user.py
│   ├── content.py
│   └── study_plan.py
├── services/               # Business logic services
│   ├── __init__.py
│   ├── auth_service.py
│   ├── content_service.py
│   └── ai_service.py
└── utils/                  # Utility functions
    ├── __init__.py
    ├── database.py
    └── validators.py`}
                  </CodeBlock>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Implementing the Flask Application</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">3.1 Basic Application Setup</h3>
                  <p className="text-gray-600 mb-3">Create the main Flask application file (app.py):</p>
                  <CodeBlock>
{`from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import Config
from api import register_routes
from models import db

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize SQLAlchemy
db.init_app(app)

# Initialize migrations
migrate = Migrate(app, db)

# Initialize JWT
jwt = JWTManager(app)

# Register API routes
register_routes(app)

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'], host='0.0.0.0', port=5000)`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">3.2 Configuration</h3>
                  <p className="text-gray-600 mb-3">Create the configuration file (config.py):</p>
                  <CodeBlock>
{`import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
    DEBUG = os.environ.get('FLASK_ENV') == 'development'
    
    # JWT settings
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
    # Database settings - MySQL
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'mysql+pymysql://username:password@localhost/sakha')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Redis settings
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
    
    # AI Service settings
    AI_MODEL_PATH = os.environ.get('AI_MODEL_PATH', './ai_models')
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">3.3 Environment Variables</h3>
                  <p className="text-gray-600 mb-3">Create a .env file (not to be committed to version control):</p>
                  <CodeBlock>
{`FLASK_ENV=development
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=mysql+pymysql://username:password@localhost/sakha
REDIS_URL=redis://localhost:6379/0
OPENAI_API_KEY=your-openai-api-key`}
                  </CodeBlock>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Database Integration</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">4.1 MySQL Setup</h3>
                  <p className="text-gray-600 mb-3">Create the database connection module (models/__init__.py):</p>
                  <CodeBlock>
{`from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy instance
db = SQLAlchemy()

# Import models after db is defined to avoid circular imports
from models.user import User
from models.content import Content, ContentType
from models.study_plan import StudyPlan, StudyPlanItem`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">4.2 Data Models</h3>
                  <p className="text-gray-600 mb-3">Create SQLAlchemy models for your data (models/user.py):</p>
                  <CodeBlock>
{`from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from models import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), default='student')  # student, admin, tutor
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    
    # Define relationship with study plans
    study_plans = db.relationship('StudyPlan', backref='user', lazy=True)
    
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

class UserProfile(db.Model):
    __tablename__ = 'user_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    phone_number = db.Column(db.String(15), nullable=True)
    bio = db.Column(db.Text, default='')
    exam_preparation = db.Column(db.String(100), nullable=True)
    grade = db.Column(db.String(20), nullable=True)
    study_pace = db.Column(db.String(20), default='moderate')
    hours_per_day = db.Column(db.Integer, default=2)
    preferred_time_start = db.Column(db.String(5), default='18:00')
    preferred_time_end = db.Column(db.String(5), default='20:00')
    
    # Define relationship with user
    user = db.relationship('User', backref=db.backref('profile', uselist=False, lazy=True))
    
    def to_dict(self):
        return {
            'phoneNumber': self.phone_number,
            'bio': self.bio,
            'examPreparation': self.exam_preparation,
            'grade': self.grade,
            'studyPreferences': {
                'pace': self.study_pace,
                'hoursPerDay': self.hours_per_day,
                'preferredTimeStart': self.preferred_time_start,
                'preferredTimeEnd': self.preferred_time_end
            }
        }`}
                  </CodeBlock>
                  
                  <p className="text-gray-600 mt-4 mb-3">Create the StudyPlan model (models/study_plan.py):</p>
                  <CodeBlock>
{`from datetime import datetime
from models import db

class StudyPlan(db.Model):
    __tablename__ = 'study_plans'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    target_exam = db.Column(db.String(100), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Define relationship with study plan items
    items = db.relationship('StudyPlanItem', backref='study_plan', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'target_exam': self.target_exam,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'items': [item.to_dict() for item in self.items]
        }

class StudyPlanItem(db.Model):
    __tablename__ = 'study_plan_items'
    
    id = db.Column(db.Integer, primary_key=True)
    study_plan_id = db.Column(db.Integer, db.ForeignKey('study_plans.id'), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    topic = db.Column(db.String(200), nullable=False)
    scheduled_date = db.Column(db.Date, nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False)
    priority = db.Column(db.String(20), default='medium')  # high, medium, low
    status = db.Column(db.String(20), default='pending')  # pending, completed, skipped
    
    def to_dict(self):
        return {
            'id': self.id,
            'subject': self.subject,
            'topic': self.topic,
            'scheduled_date': self.scheduled_date.isoformat(),
            'duration_minutes': self.duration_minutes,
            'priority': self.priority,
            'status': self.status
        }`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">4.3 Database Migrations</h3>
                  <p className="text-gray-600 mb-3">Initialize and run database migrations:</p>
                  <CodeBlock>
{`# Initialize migrations
flask db init

# Create initial migration
flask db migrate -m "Initial migration"

# Apply migrations to database
flask db upgrade`}
                  </CodeBlock>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">5. API Implementation</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">5.1 API Routes Registration</h3>
                  <p className="text-gray-600 mb-3">Create the API routes registration file (api/__init__.py):</p>
                  <CodeBlock>
{`from flask import Flask, Blueprint
from api.auth import auth_bp
from api.content import content_bp
from api.students import students_bp
from api.ai import ai_bp

def register_routes(app: Flask):
    # Create a main Blueprint for all API routes
    api_bp = Blueprint('api', __name__, url_prefix='/api')
    
    # Register individual module blueprints
    api_bp.register_blueprint(auth_bp)
    api_bp.register_blueprint(content_bp)
    api_bp.register_blueprint(students_bp)
    api_bp.register_blueprint(ai_bp)
    
    # Register the main blueprint with the app
    app.register_blueprint(api_bp)`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">5.2 Authentication API</h3>
                  <p className="text-gray-600 mb-3">Create the authentication endpoints (api/auth.py):</p>
                  <CodeBlock>
{`from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from models import db
from models.user import User, UserProfile

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"success": False, "error": f"Missing required field: {field}"}), 400
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"success": False, "error": "Email already registered"}), 400
    
    # Create and insert new user
    try:
        new_user = User(
            name=data['name'],
            email=data['email'],
            role=data.get('role', 'student')
        )
        new_user.password = data['password']  # This will use the password setter to hash it
        
        db.session.add(new_user)
        db.session.flush()  # Flush to get the user ID
        
        # Create user profile
        profile = UserProfile(user_id=new_user.id)
        db.session.add(profile)
        
        db.session.commit()
        
        # Create tokens
        access_token = create_access_token(identity=new_user.id)
        refresh_token = create_refresh_token(identity=new_user.id)
        
        return jsonify({
            "success": True,
            "data": {
                "id": new_user.id,
                "name": new_user.name,
                "email": new_user.email,
                "role": new_user.role,
                "token": access_token
            },
            "error": None
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"success": False, "error": "Missing email or password"}), 400
    
    # Find user by email
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.verify_password(data['password']):
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Create tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        return jsonify({
            "success": True,
            "data": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "token": access_token
            },
            "error": None
        }), 200
    else:
        return jsonify({"success": False, "error": "Invalid credentials"}), 401

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    
    return jsonify({
        "success": True,
        "data": {
            "token": access_token
        },
        "error": None
    }), 200`}
                  </CodeBlock>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">6. AI Integration</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">6.1 SAKHA AI Service</h3>
                  <p className="text-gray-600 mb-3">Create the AI service module (services/ai_service.py):</p>
                  <CodeBlock>
{`import os
import openai
from flask import current_app
import json
import redis
from datetime import datetime, timedelta
from models import db
from models.study_plan import StudyPlan, StudyPlanItem

# Initialize Redis client for caching
redis_client = redis.from_url(os.environ.get('REDIS_URL', 'redis://localhost:6379/0'))

class SAKHAAIService:
    def __init__(self):
        self.api_key = os.environ.get('OPENAI_API_KEY')
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        
        openai.api_key = self.api_key
    
    def generate_study_plan(self, student_data, user_id):
        """Generate personalized study plan based on student data."""
        # Cache key based on student data
        cache_key = f"study_plan:{hash(json.dumps(student_data, sort_keys=True))}"
        
        # Check if we have a cached result
        cached_result = redis_client.get(cache_key)
        if cached_result:
            return json.loads(cached_result)
        
        # Prepare prompt for OpenAI
        prompt = self._create_study_plan_prompt(student_data)
        
        try:
            response = openai.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are SAKHA AI, an expert educational AI assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=1500,
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0,
                response_format={"type": "json_object"}
            )
            
            # Parse the response
            result = json.loads(response.choices[0].message.content)
            
            # Save the study plan to the database
            self._save_study_plan_to_db(result, user_id)
            
            # Cache the result for 1 hour
            redis_client.setex(cache_key, 3600, json.dumps(result))
            
            return result
        except Exception as e:
            current_app.logger.error(f"Error generating study plan: {str(e)}")
            return {"error": str(e)}
    
    def answer_doubt(self, question, subject, topic):
        """Answer student doubt using AI."""
        try:
            response = openai.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are SAKHA AI, an expert educational AI assistant."},
                    {"role": "user", "content": f"Subject: {subject}\\nTopic: {topic}\\nQuestion: {question}"}
                ],
                temperature=0.7,
                max_tokens=800,
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0
            )
            
            return {
                "answer": response.choices[0].message.content,
                "sources": [],  # Would be populated with real sources in a production system
                "followUpQuestions": self._generate_follow_up_questions(question, subject, topic)
            }
        except Exception as e:
            current_app.logger.error(f"Error answering doubt: {str(e)}")
            return {"error": str(e)}
    
    def _create_study_plan_prompt(self, student_data):
        """Create a prompt for generating a study plan."""
        return f"""
        Based on the following student information, create a detailed study plan:
        
        Exam Goal: {student_data.get('examGoal', 'General improvement')}
        Subjects: {', '.join(student_data.get('subjects', []))}
        Proficiency Levels: {json.dumps(student_data.get('proficiencyLevels', {}))}
        Available Study Hours Per Day: {student_data.get('studyHours', 3)}
        Preferred Study Time: {student_data.get('preferredStudyTime', 'Evening')}
        Study Pace: {student_data.get('studyPace', 'Moderate')}
        Days Until Exam: {student_data.get('daysUntilExam', 90)}
        
        Generate a comprehensive study plan including:
        1. Daily schedule with subjects and topics
        2. Weekly goals
        3. Recommended resources for each subject
        4. Practice test schedule
        5. Revision strategy
        
        Return the result as a structured JSON object.
        """
    
    def _generate_follow_up_questions(self, question, subject, topic):
        """Generate follow-up questions based on the original question."""
        try:
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Generate 3 follow-up questions related to this topic:"},
                    {"role": "user", "content": f"Subject: {subject}\\nTopic: {topic}\\nOriginal Question: {question}"}
                ],
                temperature=0.7,
                max_tokens=200,
                top_p=1.0,
                frequency_penalty=0.3,
                presence_penalty=0.3
            )
            
            # Parse lines into questions
            content = response.choices[0].message.content
            questions = [q.strip() for q in content.strip().split('\\n') if q.strip()]
            return questions[:3]  # Return only up to 3 questions
        except Exception as e:
            current_app.logger.error(f"Error generating follow-up questions: {str(e)}")
            return []
    
    def _save_study_plan_to_db(self, plan_data, user_id):
        """Save the generated study plan to the database."""
        try:
            # Create new study plan
            start_date = datetime.now().date()
            end_date = start_date + timedelta(days=plan_data.get('durationDays', 90))
            
            study_plan = StudyPlan(
                user_id=user_id,
                title=plan_data.get('title', 'Personalized Study Plan'),
                description=plan_data.get('description', ''),
                start_date=start_date,
                end_date=end_date,
                target_exam=plan_data.get('examGoal', ''),
                is_active=True
            )
            
            db.session.add(study_plan)
            db.session.flush()  # Get the plan ID
            
            # Add plan items
            for item in plan_data.get('dailySchedule', []):
                topic_date = datetime.strptime(item.get('date', start_date.isoformat()), '%Y-%m-%d').date()
                
                for topic in item.get('topics', []):
                    plan_item = StudyPlanItem(
                        study_plan_id=study_plan.id,
                        subject=topic.get('subject', ''),
                        topic=topic.get('topic', ''),
                        scheduled_date=topic_date,
                        duration_minutes=topic.get('durationMinutes', 60),
                        priority=topic.get('priority', 'medium'),
                        status='pending'
                    )
                    db.session.add(plan_item)
            
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            current_app.logger.error(f"Error saving study plan: {str(e)}")
            return False

# Create singleton instance
sakha_ai_service = SAKHAAIService()`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">6.2 AI API Endpoints</h3>
                  <p className="text-gray-600 mb-3">Create the AI API endpoints (api/ai.py):</p>
                  <CodeBlock>
{`from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.ai_service import sakha_ai_service
from models import db
from models.user import User

ai_bp = Blueprint('ai', __name__, url_prefix='/ai')

@ai_bp.route('/generate-plan', methods=['POST'])
@jwt_required()
def generate_plan():
    data = request.get_json()
    
    if not data:
        return jsonify({"success": False, "error": "No data provided"}), 400
    
    # Get user ID from JWT
    user_id = get_jwt_identity()
    
    # Generate study plan
    study_plan = sakha_ai_service.generate_study_plan(data, user_id)
    
    if "error" in study_plan:
        return jsonify({"success": False, "error": study_plan["error"]}), 500
    
    return jsonify({
        "success": True,
        "data": {
            "study_plan": study_plan
        },
        "error": None
    }), 201

@ai_bp.route('/doubt-response', methods=['POST'])
@jwt_required()
def doubt_response():
    data = request.get_json()
    
    # Validate inputs
    required_fields = ['question', 'subject', 'topic']
    for field in required_fields:
        if field not in data:
            return jsonify({"success": False, "error": f"Missing required field: {field}"}), 400
    
    # Get user ID from JWT
    user_id = get_jwt_identity()
    
    # Generate answer
    response = sakha_ai_service.answer_doubt(
        data['question'], 
        data['subject'], 
        data['topic']
    )
    
    if "error" in response:
        return jsonify({"success": False, "error": response["error"]}), 500
    
    # Log the question for analytics
    try:
        user = User.query.get(user_id)
        if user:
            # Here you would typically save to a student_doubts table
            # For now, we'll just log it
            current_app.logger.info(f"User {user_id} asked: {data['question']}")
    except Exception as e:
        current_app.logger.error(f"Error logging student doubt: {str(e)}")
    
    return jsonify({
        "success": True,
        "data": response,
        "error": None
    }), 200`}
                  </CodeBlock>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Integrating with the Frontend</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">7.1 Cross-Origin Resource Sharing (CORS)</h3>
                  <p className="text-gray-600 mb-3">Ensure your Flask backend properly allows CORS for your frontend domain:</p>
                  <CodeBlock>
{`# In app.py
from flask_cors import CORS

# For development
CORS(app, resources={r"/api/*": {"origins": "*"}})

# For production - restrict to your frontend domain
# CORS(app, resources={r"/api/*": {"origins": "https://prepzr.com"}})`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">7.2 Frontend API Service Integration</h3>
                  <p className="text-gray-600 mb-3">Update the existing frontend API client to connect to your Flask backend:</p>
                  <CodeBlock>
{`// Update src/services/api/apiConfig.ts with:

// Base API URL - switch based on environment
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Then update the apiClient.ts file to include the correct base URL`}
                  </CodeBlock>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Deployment</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">8.1 Development Environment</h3>
                  <p className="text-gray-600 mb-3">Run your Flask application in development mode:</p>
                  <CodeBlock>
{`# Start the Flask server
python app.py

# Or with Flask CLI
export FLASK_APP=app.py
export FLASK_ENV=development
flask run`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">8.2 Production Deployment</h3>
                  <p className="text-gray-600 mb-3">For production, we recommend using Gunicorn with Nginx:</p>
                  <CodeBlock>
{`# Install Gunicorn
pip install gunicorn

# Create a wsgi.py file
# wsgi.py
from app import app

if __name__ == "__main__":
    app.run()

# Run with Gunicorn
gunicorn --bind 0.0.0.0:5000 wsgi:app`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">8.3 Docker Deployment</h3>
                  <p className="text-gray-600 mb-3">Alternatively, use Docker for containerized deployment:</p>
                  <CodeBlock>
{`# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]

# docker-compose.yml
version: '3'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    env_file:
      - .env
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8
    volumes:
      - mysql_data:/var/lib/mysql
    env_file:
      - .env
    environment:
      - MYSQL_DATABASE=sakha
      - MYSQL_ROOT_PASSWORD=${MYSQL_PASSWORD}
    ports:
      - "3306:3306"

  redis:
    image: redis:6
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

volumes:
  mysql_data:
  redis_data:`}
                  </CodeBlock>
                </section>

                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Testing and Monitoring</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">9.1 Unit Testing</h3>
                  <p className="text-gray-600 mb-3">Create tests using pytest:</p>
                  <CodeBlock>
{`# Install pytest
pip install pytest

# Example test file: tests/test_auth.py
import pytest
from app import app
from models import db, User

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_register(client):
    response = client.post('/api/auth/register', 
                          json={
                              'name': 'Test User',
                              'email': 'test@example.com',
                              'password': 'password123'
                          })
    assert response.status_code == 201
    data = response.get_json()
    assert data['success'] == True
    assert 'token' in data['data']

def test_login(client):
    # First register a user
    client.post('/api/auth/register', 
               json={
                   'name': 'Login Test User',
                   'email': 'login@example.com',
                   'password': 'password123'
               })
    
    # Then try to login
    response = client.post('/api/auth/login',
                          json={
                              'email': 'login@example.com',
                              'password': 'password123'
                          })
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] == True
    assert 'token' in data['data']`}
                  </CodeBlock>
                  
                  <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">9.2 Logging</h3>
                  <p className="text-gray-600 mb-3">Implement proper logging:</p>
                  <CodeBlock>
{`import logging
from flask import Flask, request, g
import time

def setup_logging(app: Flask):
    # Configure basic logging
    logging.basicConfig(
        level=logging.INFO if app.config['DEBUG'] else logging.WARNING,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler()
        ]
    )
    
    # Request logging
    @app.before_request
    def before_request():
        g.start_time = time.time()
    
    @app.after_request
    def after_request(response):
        if request.path.startswith('/api'):
            request_duration = time.time() - g.start_time
            app.logger.info(
                f"Request: {request.method} {request.path} - "
                f"Status: {response.status_code} - "
                f"Duration: {request_duration:.4f}s"
            )
        return response`}
                  </CodeBlock>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Additional Resources</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-md space-y-3">
                    <p className="text-gray-700"><strong>Flask Documentation:</strong> <a href="https://flask.palletsprojects.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://flask.palletsprojects.com/</a></p>
                    <p className="text-gray-700"><strong>Flask-SQLAlchemy Documentation:</strong> <a href="https://flask-sqlalchemy.palletsprojects.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://flask-sqlalchemy.palletsprojects.com/</a></p>
                    <p className="text-gray-700"><strong>Flask-Migrate Documentation:</strong> <a href="https://flask-migrate.readthedocs.io/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://flask-migrate.readthedocs.io/</a></p>
                    <p className="text-gray-700"><strong>MySQL Documentation:</strong> <a href="https://dev.mysql.com/doc/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://dev.mysql.com/doc/</a></p>
                    <p className="text-gray-700"><strong>Flask-JWT-Extended:</strong> <a href="https://flask-jwt-extended.readthedocs.io/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://flask-jwt-extended.readthedocs.io/</a></p>
                    <p className="text-gray-700"><strong>OpenAI API Reference:</strong> <a href="https://platform.openai.com/docs/api-reference" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://platform.openai.com/docs/api-reference</a></p>
                    <p className="text-gray-700"><strong>Contact for Development Support:</strong> <a href="mailto:hello@prepzr.com" className="text-blue-600 hover:underline">hello@prepzr.com</a></p>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Return to Homepage
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Go to Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} GreatWisdom India Pvt Ltd. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
            <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FlaskDeveloperGuide;

