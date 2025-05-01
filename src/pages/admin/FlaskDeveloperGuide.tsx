
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FlaskDeveloperGuide = () => {
  const { toast } = useToast();

  const handleDownloadGuide = () => {
    // Create a blob with Word-compatible HTML content
    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Flask MySQL Integration Guide</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #2563eb; margin-bottom: 16px; }
          h2 { color: #1e40af; margin-top: 24px; margin-bottom: 12px; }
          p { margin-bottom: 16px; line-height: 1.5; }
        </style>
      </head>
      <body>
        <h1>Flask Integration Guide for MySQL</h1>
        <p>Version 1.0.0 | Last Updated: May 1, 2025</p>
        
        <h2>1. Setup & Installation</h2>
        <p>Install required packages using pip:</p>
        <pre>pip install Flask SQLAlchemy Flask-SQLAlchemy mysql-connector-python Flask-Migrate</pre>
        
        <h2>2. Database Configuration</h2>
        <p>Configure your MySQL database connection using SQLAlchemy ORM in your Flask app:</p>
        <pre>
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# MySQL database connection config
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://username:password@localhost/dbname'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
        </pre>
        
        <h2>3. API Development</h2>
        <p>Structure your Flask API with blueprints and RESTful endpoints:</p>
        <pre>
# app/routes.py
from flask import Blueprint, jsonify, request

api = Blueprint('api', __name__, url_prefix='/api/v1')

@api.route('/users', methods=['GET'])
def get_users():
    # Query database using SQLAlchemy
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    # Create new user in database
    user = User(**data)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

# Register blueprint with app
app.register_blueprint(api)
        </pre>
        
        <h2>4. Models Creation</h2>
        <p>Define SQLAlchemy models that map to your MySQL tables:</p>
        <pre>
# app/models.py
from datetime import datetime
from app import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
        </pre>
        
        <h2>5. Authentication</h2>
        <p>Implement JWT or session-based authentication with Flask-Login:</p>
        <pre>
# Install Flask-Login and Flask-JWT-Extended
# pip install flask-login flask-jwt-extended

from flask_login import LoginManager, login_user, current_user
from flask_jwt_extended import JWTManager, create_access_token

# Initialize in app
login_manager = LoginManager(app)
jwt = JWTManager(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        login_user(user)
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
        
    return jsonify({'error': 'Invalid credentials'}), 401
        </pre>
        
        <h2>6. Migrations</h2>
        <p>Use Flask-Migrate to handle database schema changes:</p>
        <pre>
# Initialize migrations
flask db init

# Create a migration
flask db migrate -m "Initial migration"

# Apply migration to database
flask db upgrade
        </pre>
        
        <h2>7. Testing</h2>
        <p>Implement unit and integration tests for your API:</p>
        <pre>
# tests/test_api.py
import unittest
from app import app, db
from app.models import User

class APITestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://test_user:test_pass@localhost/test_db'
        self.client = app.test_client()
        db.create_all()
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        
    def test_create_user(self):
        response = self.client.post('/api/v1/users', 
                                   json={'username': 'testuser', 'email': 'test@example.com'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.query.count(), 1)
        </pre>
        
        <h2>8. Deployment</h2>
        <p>Deploy using Gunicorn/uWSGI with Nginx:</p>
        <pre>
# Install gunicorn
pip install gunicorn

# Create a wsgi.py file
from app import app as application

if __name__ == "__main__":
    application.run()

# Run with Gunicorn
gunicorn -w 4 -b 127.0.0.1:5000 wsgi:application
        </pre>
        
        <p>Nginx configuration:</p>
        <pre>
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
        </pre>
      </body>
      </html>
    `;
    
    // Create a blob and download it as a Word document
    const blob = new Blob([wordContent], { type: 'application/vnd.ms-word' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flask-mysql-integration-guide.doc';
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Flask MySQL integration guide is being downloaded as a Word document",
      variant: "default"
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Flask MySQL Developer Guide</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Flask MySQL Integration Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            This guide provides comprehensive instructions for integrating a Flask 
            application with MySQL database for backend development.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">1. Setup & Installation</h3>
              <p className="text-sm text-muted-foreground">
                Install required packages: Flask, SQLAlchemy, Flask-SQLAlchemy, mysql-connector-python
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">2. Database Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Configure MySQL database connection using SQLAlchemy ORM
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">3. API Development</h3>
              <p className="text-sm text-muted-foreground">
                Structure your Flask API with blueprints and RESTful endpoints
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">4. Models Creation</h3>
              <p className="text-sm text-muted-foreground">
                Define SQLAlchemy models that map to your MySQL tables
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">5. Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Implement JWT or session-based authentication
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              onClick={handleDownloadGuide} 
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download as Word Document
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-sm text-gray-500 mt-4">
        Version: 1.0.0 | Last updated: May 1, 2025
      </p>
    </div>
  );
};

export default FlaskDeveloperGuide;
