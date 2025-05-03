
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Code } from "@/components/ui/code";
import { Book, Database, Server } from 'lucide-react';

const FlaskMySQLGuide = () => {
  return (
    <Card className="max-w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="flex items-center gap-2">
          <Database className="text-blue-600" size={20} />
          Flask MySQL Developer Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="schema">
          <TabsList className="mb-4">
            <TabsTrigger value="schema" className="flex items-center gap-2">
              <Database size={16} />
              Database Schema
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Book size={16} />
              SQLAlchemy Models
            </TabsTrigger>
            <TabsTrigger value="endpoints" className="flex items-center gap-2">
              <Server size={16} />
              API Endpoints
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schema" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Database Schema</h2>
            <p className="mb-4">
              This guide provides the complete database schema for the Prepzr application.
              All the tables have been updated to include onboarding user data and study preferences.
            </p>
            
            <div className="space-y-6">
              <SchemaTable 
                name="users" 
                description="Core user account information"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique user identifier" },
                  { name: "email", type: "VARCHAR(255)", description: "User email address" },
                  { name: "password_hash", type: "VARCHAR(255)", description: "Hashed user password" },
                  { name: "name", type: "VARCHAR(100)", description: "User's full name" },
                  { name: "role", type: "VARCHAR(50)", description: "User role (student, teacher, admin)" },
                  { name: "mobile_number", type: "VARCHAR(20)", description: "Mobile number for authentication", isNew: true },
                  { name: "created_at", type: "TIMESTAMP", description: "Account creation timestamp" },
                  { name: "updated_at", type: "TIMESTAMP", description: "Last update timestamp" }
                ]} 
              />

              <SchemaTable 
                name="students" 
                description="Student-specific profile information"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique student identifier" },
                  { name: "user_id", type: "UUID", description: "Reference to user account", isForeign: true },
                  { name: "grade", type: "VARCHAR(20)", description: "Student's academic grade/level" },
                  { name: "age", type: "INTEGER", description: "Student's age", isNew: true },
                  { name: "education_level", type: "VARCHAR(50)", description: "Highest education level", isNew: true },
                  { name: "city", type: "VARCHAR(100)", description: "City of residence", isNew: true },
                  { name: "exam_type", type: "VARCHAR(50)", description: "Exam the student is preparing for" },
                  { name: "exam_appearing_date", type: "DATE", description: "Date student will take exam", isNew: true },
                  { name: "personality_type", type: "VARCHAR(50)", description: "Learning personality type", isNew: true },
                  { name: "onboarding_completed", type: "BOOLEAN", description: "Whether onboarding is complete" },
                  { name: "last_active", type: "TIMESTAMP", description: "Last activity timestamp" }
                ]} 
              />

              <SchemaTable 
                name="student_subjects" 
                description="Subjects that students are studying"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique record identifier" },
                  { name: "student_id", type: "UUID", description: "Reference to student", isForeign: true },
                  { name: "subject_name", type: "VARCHAR(100)", description: "Subject name" },
                  { name: "proficiency_level", type: "INTEGER", description: "Self-rated proficiency (1-10)" },
                  { name: "is_priority", type: "BOOLEAN", description: "Whether this is a priority subject" },
                  { name: "is_weak_subject", type: "BOOLEAN", description: "Whether this is a weak subject", isNew: true },
                  { name: "created_at", type: "TIMESTAMP", description: "Record creation timestamp" }
                ]} 
              />

              <SchemaTable 
                name="mood_logs" 
                description="User mood tracking records"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique log identifier" },
                  { name: "student_id", type: "UUID", description: "Reference to student", isForeign: true },
                  { name: "mood_type", type: "VARCHAR(50)", description: "Type of mood (happy, motivated, focused, etc.)", isNew: true },
                  { name: "mood_score", type: "INTEGER", description: "Numerical mood score (1-10)" },
                  { name: "note", type: "TEXT", description: "Optional notes about mood" },
                  { name: "logged_at", type: "TIMESTAMP", description: "When mood was logged" }
                ]} 
              />

              <SchemaTable 
                name="study_plans" 
                description="Structured learning plans for students"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique plan identifier" },
                  { name: "student_id", type: "UUID", description: "Reference to student", isForeign: true },
                  { name: "title", type: "VARCHAR(100)", description: "Plan title" },
                  { name: "description", type: "TEXT", description: "Plan description" },
                  { name: "start_date", type: "DATE", description: "Plan start date" },
                  { name: "end_date", type: "DATE", description: "Plan end date" },
                  { name: "is_active", type: "BOOLEAN", description: "Whether plan is active" },
                  { name: "study_pace", type: "VARCHAR(20)", description: "Study pace preference", isNew: true },
                  { name: "daily_study_hours", type: "INTEGER", description: "Target daily study hours", isNew: true },
                  { name: "break_frequency", type: "VARCHAR(20)", description: "Preferred break frequency", isNew: true },
                  { name: "stress_management", type: "VARCHAR(50)", description: "Stress management technique", isNew: true },
                  { name: "study_environment", type: "VARCHAR(50)", description: "Preferred study environment", isNew: true },
                  { name: "preferred_study_time", type: "VARCHAR(20)", description: "Preferred time of day to study", isNew: true },
                  { name: "created_at", type: "TIMESTAMP", description: "Plan creation timestamp" },
                  { name: "updated_at", type: "TIMESTAMP", description: "Plan update timestamp" }
                ]} 
              />

              <SchemaTable 
                name="study_preferences" 
                description="User study preferences and habits"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique record identifier" },
                  { name: "student_id", type: "UUID", description: "Reference to student", isForeign: true },
                  { name: "study_pace", type: "VARCHAR(20)", description: "Study pace preference", isNew: true },
                  { name: "daily_study_hours", type: "INTEGER", description: "Daily study hours target", isNew: true },
                  { name: "preferred_study_time", type: "VARCHAR(20)", description: "Preferred time of day", isNew: true },
                  { name: "break_frequency", type: "VARCHAR(20)", description: "Break frequency preference", isNew: true },
                  { name: "stress_management", type: "VARCHAR(50)", description: "Stress management technique", isNew: true },
                  { name: "study_environment", type: "VARCHAR(50)", description: "Study environment preference", isNew: true },
                  { name: "learning_style", type: "VARCHAR(50)", description: "Learning style", isNew: true },
                  { name: "personality_type", type: "VARCHAR(50)", description: "Learning personality type", isNew: true },
                  { name: "created_at", type: "TIMESTAMP", description: "Record creation timestamp" },
                  { name: "updated_at", type: "TIMESTAMP", description: "Record update timestamp" }
                ]} 
              />

              <SchemaTable 
                name="user_demographics" 
                description="Detailed demographic information for users"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique record identifier" },
                  { name: "user_id", type: "UUID", description: "Reference to user account", isForeign: true },
                  { name: "age", type: "INTEGER", description: "User's age", isNew: true },
                  { name: "gender", type: "VARCHAR(20)", description: "User's gender" },
                  { name: "education_level", type: "VARCHAR(50)", description: "Highest education level", isNew: true },
                  { name: "city", type: "VARCHAR(100)", description: "City of residence", isNew: true },
                  { name: "state", type: "VARCHAR(100)", description: "State/province of residence" },
                  { name: "country", type: "VARCHAR(100)", description: "Country of residence" },
                  { name: "created_at", type: "TIMESTAMP", description: "Record creation timestamp" },
                  { name: "updated_at", type: "TIMESTAMP", description: "Record update timestamp" }
                ]} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="models" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">SQLAlchemy Models</h2>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">User Model</h3>
              <Code language="python">{`
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    mobile_number = db.Column(db.String(20))  # New field for mobile authentication
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', uselist=False, back_populates='user')
    demographics = db.relationship('UserDemographics', uselist=False, back_populates='user')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">Student Model</h3>
              <Code language="python">{`
class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    grade = db.Column(db.String(20))
    age = db.Column(db.Integer)  # New field
    education_level = db.Column(db.String(50))  # New field
    city = db.Column(db.String(100))  # New field
    exam_type = db.Column(db.String(50))
    exam_appearing_date = db.Column(db.Date)  # New field
    personality_type = db.Column(db.String(50))  # New field
    onboarding_completed = db.Column(db.Boolean, default=False)
    last_active = db.Column(db.DateTime)
    
    # Relationships
    user = db.relationship('User', back_populates='student')
    subjects = db.relationship('StudentSubject', back_populates='student')
    mood_logs = db.relationship('MoodLog', back_populates='student')
    study_plans = db.relationship('StudyPlan', back_populates='student')
    study_preferences = db.relationship('StudyPreferences', uselist=False, back_populates='student')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">StudentSubject Model</h3>
              <Code language="python">{`
class StudentSubject(db.Model):
    __tablename__ = 'student_subjects'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    subject_name = db.Column(db.String(100), nullable=False)
    proficiency_level = db.Column(db.Integer, nullable=False)
    is_priority = db.Column(db.Boolean, default=False)
    is_weak_subject = db.Column(db.Boolean, default=False)  # New field
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', back_populates='subjects')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">MoodLog Model</h3>
              <Code language="python">{`
class MoodLog(db.Model):
    __tablename__ = 'mood_logs'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    mood_type = db.Column(db.String(50), nullable=False)  # Updated field to include all mood types
    mood_score = db.Column(db.Integer, nullable=False)
    note = db.Column(db.Text)
    logged_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', back_populates='mood_logs')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">StudyPlan Model</h3>
              <Code language="python">{`
class StudyPlan(db.Model):
    __tablename__ = 'study_plans'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    study_pace = db.Column(db.String(20))  # New field
    daily_study_hours = db.Column(db.Integer)  # New field
    break_frequency = db.Column(db.String(20))  # New field
    stress_management = db.Column(db.String(50))  # New field
    study_environment = db.Column(db.String(50))  # New field
    preferred_study_time = db.Column(db.String(20))  # New field
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', back_populates='study_plans')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">StudyPreferences Model</h3>
              <Code language="python">{`
class StudyPreferences(db.Model):
    __tablename__ = 'study_preferences'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    study_pace = db.Column(db.String(20))  # New field
    daily_study_hours = db.Column(db.Integer)  # New field
    preferred_study_time = db.Column(db.String(20))  # New field
    break_frequency = db.Column(db.String(20))  # New field
    stress_management = db.Column(db.String(50))  # New field
    study_environment = db.Column(db.String(50))  # New field
    learning_style = db.Column(db.String(50))  # New field
    personality_type = db.Column(db.String(50))  # New field
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', back_populates='study_preferences')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
              <h3 className="text-lg font-medium mb-2">UserDemographics Model</h3>
              <Code language="python">{`
class UserDemographics(db.Model):
    __tablename__ = 'user_demographics'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(20))
    education_level = db.Column(db.String(50))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    country = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', back_populates='demographics')
              `}</Code>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">API Endpoints for Onboarding Data</h2>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">User Registration with Demographics</h3>
              <p className="text-sm text-muted-foreground mb-2">POST /api/auth/register</p>
              <Code language="json">{`
// Request Body
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "mobile_number": "+919876543210",  // New field for mobile authentication
  "role": "student",
  "demographics": {
    "age": 18,
    "gender": "female",
    "education_level": "high school",
    "city": "Mumbai"
  }
}
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">Update Student Profile</h3>
              <p className="text-sm text-muted-foreground mb-2">PUT /api/students/{'{student_id}'}/profile</p>
              <Code language="json">{`
// Request Body
{
  "grade": "12th",
  "age": 18,
  "education_level": "high school",
  "city": "Mumbai",
  "exam_type": "JEE Advanced",
  "exam_appearing_date": "2024-05-15",
  "personality_type": "analytical"
}
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">Update Student Study Preferences</h3>
              <p className="text-sm text-muted-foreground mb-2">PUT /api/students/{'{student_id}'}/study-preferences</p>
              <Code language="json">{`
// Request Body
{
  "study_pace": "moderate",
  "daily_study_hours": 6,
  "preferred_study_time": "evening",
  "break_frequency": "every 45 minutes",
  "stress_management": "meditation",
  "study_environment": "quiet room",
  "learning_style": "visual"
}
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">Create Study Plan</h3>
              <p className="text-sm text-muted-foreground mb-2">POST /api/students/{'{student_id}'}/study-plan</p>
              <Code language="json">{`
// Request Body
{
  "title": "JEE Advanced 2024 Plan",
  "description": "Comprehensive study plan for JEE Advanced preparation",
  "start_date": "2023-06-01",
  "end_date": "2024-05-10",
  "study_pace": "moderate",
  "daily_study_hours": 6,
  "break_frequency": "every 45 minutes",
  "stress_management": "meditation",
  "study_environment": "quiet room",
  "preferred_study_time": "evening",
  "subjects": [
    {
      "name": "Physics",
      "proficiency_level": 7,
      "is_priority": true,
      "is_weak_subject": false
    },
    {
      "name": "Chemistry",
      "proficiency_level": 8,
      "is_priority": true,
      "is_weak_subject": false
    },
    {
      "name": "Mathematics",
      "proficiency_level": 5,
      "is_priority": true,
      "is_weak_subject": true
    }
  ]
}
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">Log Mood</h3>
              <p className="text-sm text-muted-foreground mb-2">POST /api/students/{'{student_id}'}/mood-logs</p>
              <Code language="json">{`
// Request Body
{
  "mood_type": "motivated",  // Updated to include all mood types
  "mood_score": 8,
  "note": "Feeling confident after completing physics study session"
}
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium">Get Student Demographics and Preferences</h3>
              <p className="text-sm text-muted-foreground mb-2">GET /api/students/{'{student_id}'}/profile/full</p>
              <Code language="json">{`
// Response
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "mobile_number": "+919876543210"
  },
  "demographics": {
    "age": 18,
    "education_level": "high school",
    "city": "Mumbai"
  },
  "exam_details": {
    "exam_type": "JEE Advanced",
    "exam_appearing_date": "2024-05-15"
  },
  "personality_type": "analytical",
  "study_preferences": {
    "study_pace": "moderate",
    "daily_study_hours": 6,
    "preferred_study_time": "evening",
    "break_frequency": "every 45 minutes",
    "stress_management": "meditation",
    "study_environment": "quiet room",
    "learning_style": "visual"
  },
  "subjects": [
    {
      "name": "Physics",
      "proficiency_level": 7,
      "is_priority": true,
      "is_weak_subject": false
    },
    {
      "name": "Chemistry",
      "proficiency_level": 8,
      "is_priority": true,
      "is_weak_subject": false
    },
    {
      "name": "Mathematics",
      "proficiency_level": 5,
      "is_priority": true,
      "is_weak_subject": true
    }
  ]
}
              `}</Code>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Schema Table Component
interface SchemaFieldProps {
  name: string;
  type: string;
  description: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  isNew?: boolean;
}

interface SchemaTableProps {
  name: string;
  description: string;
  fields: SchemaFieldProps[];
}

const SchemaTable: React.FC<SchemaTableProps> = ({ name, description, fields }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-900 p-3 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{name}</h3>
          <Badge variant="outline">{fields.length} fields</Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-2 text-left">Field</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Attributes</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {fields.map((field, index) => (
              <tr key={index} className={field.isNew ? "bg-green-50 dark:bg-green-900/10" : ""}>
                <td className="px-4 py-2 font-mono">{field.name}</td>
                <td className="px-4 py-2 font-mono">{field.type}</td>
                <td className="px-4 py-2">{field.description}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-1 flex-wrap">
                    {field.isPrimary && <Badge variant="default" className="bg-blue-600">Primary Key</Badge>}
                    {field.isForeign && <Badge variant="outline" className="border-yellow-600 text-yellow-700 dark:text-yellow-500">Foreign Key</Badge>}
                    {field.isNew && <Badge variant="default" className="bg-green-600">New Field</Badge>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlaskMySQLGuide;
