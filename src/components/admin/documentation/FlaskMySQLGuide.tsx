
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Code } from "@/components/ui/code";
import { Book, Database, Server, GitBranch, Layers, ArrowRightLeft } from 'lucide-react';

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
              <Layers size={16} />
              SQLAlchemy Models
            </TabsTrigger>
            <TabsTrigger value="relationships" className="flex items-center gap-2">
              <ArrowRightLeft size={16} />
              Relationships
            </TabsTrigger>
            <TabsTrigger value="endpoints" className="flex items-center gap-2">
              <Server size={16} />
              API Implementation
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2">
              <GitBranch size={16} />
              Step-by-Step Guide
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
                  { name: "exam_goal", type: "VARCHAR(100)", description: "Targeted exam for this plan", isNew: true },
                  { name: "start_date", type: "DATE", description: "Plan start date" },
                  { name: "end_date", type: "DATE", description: "Plan end date" },
                  { name: "status", type: "VARCHAR(20)", description: "Status (active, completed, archived)" },
                  { name: "progress", type: "INTEGER", description: "Completion progress percentage", isNew: true },
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
                name="study_plan_subjects" 
                description="Subjects within a study plan"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique record identifier" },
                  { name: "plan_id", type: "UUID", description: "Reference to study plan", isForeign: true },
                  { name: "name", type: "VARCHAR(100)", description: "Subject name" },
                  { name: "status", type: "VARCHAR(20)", description: "Status (pending, in-progress, completed)" },
                  { name: "priority", type: "VARCHAR(20)", description: "Priority level (high, medium, low)" },
                  { name: "completed", type: "BOOLEAN", description: "Whether subject is completed" },
                  { name: "difficulty", type: "VARCHAR(20)", description: "Subject difficulty (easy, medium, hard)", isNew: true },
                  { name: "hours_per_week", type: "INTEGER", description: "Weekly study hours target", isNew: true },
                  { name: "created_at", type: "TIMESTAMP", description: "Record creation timestamp" }
                ]} 
              />

              <SchemaTable 
                name="subject_topics" 
                description="Topics within subjects"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique topic identifier" },
                  { name: "subject_id", type: "UUID", description: "Reference to study plan subject", isForeign: true },
                  { name: "name", type: "VARCHAR(100)", description: "Topic name" },
                  { name: "description", type: "TEXT", description: "Topic description" },
                  { name: "status", type: "VARCHAR(20)", description: "Status (pending, in-progress, completed)" },
                  { name: "estimated_hours", type: "INTEGER", description: "Estimated study hours", isNew: true },
                  { name: "created_at", type: "TIMESTAMP", description: "Record creation timestamp" }
                ]} 
              />

              <SchemaTable 
                name="concept_cards" 
                description="Concept cards for learning"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique card identifier" },
                  { name: "student_id", type: "UUID", description: "Reference to student", isForeign: true },
                  { name: "title", type: "VARCHAR(255)", description: "Card title" },
                  { name: "subject", type: "VARCHAR(100)", description: "Subject of the concept" },
                  { name: "topic", type: "VARCHAR(100)", description: "Topic within the subject" },
                  { name: "content", type: "TEXT", description: "Card content" },
                  { name: "completed", type: "BOOLEAN", description: "Whether card is completed" },
                  { name: "mastery_level", type: "INTEGER", description: "Mastery level (0-100)" },
                  { name: "exam_ready", type: "BOOLEAN", description: "Whether student is exam-ready for this concept" },
                  { name: "bookmarked", type: "BOOLEAN", description: "Whether card is bookmarked" },
                  { name: "last_practiced", type: "TIMESTAMP", description: "When last practiced" },
                  { name: "created_at", type: "TIMESTAMP", description: "Record creation timestamp" }
                ]} 
              />

              <SchemaTable 
                name="flashcards" 
                description="Flashcards for concepts"
                fields={[
                  { name: "id", type: "UUID", isPrimary: true, description: "Unique flashcard identifier" },
                  { name: "concept_card_id", type: "UUID", description: "Reference to concept card", isForeign: true },
                  { name: "question", type: "TEXT", description: "Flashcard question" },
                  { name: "answer", type: "TEXT", description: "Flashcard answer" },
                  { name: "completed", type: "BOOLEAN", description: "Whether flashcard is completed" },
                  { name: "created_at", type: "TIMESTAMP", description: "Record creation timestamp" }
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
    mobile_number = db.Column(db.String(20))  # For mobile authentication
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', uselist=False, back_populates='user')
    demographics = db.relationship('UserDemographics', uselist=False, back_populates='user')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
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
    age = db.Column(db.Integer)
    education_level = db.Column(db.String(50))
    city = db.Column(db.String(100))
    exam_type = db.Column(db.String(50))
    exam_appearing_date = db.Column(db.Date)
    personality_type = db.Column(db.String(50))
    onboarding_completed = db.Column(db.Boolean, default=False)
    last_active = db.Column(db.DateTime)
    
    # Relationships
    user = db.relationship('User', back_populates='student')
    subjects = db.relationship('StudentSubject', back_populates='student')
    mood_logs = db.relationship('MoodLog', back_populates='student')
    study_plans = db.relationship('StudyPlan', back_populates='student')
    study_preferences = db.relationship('StudyPreferences', uselist=False, back_populates='student')
    concept_cards = db.relationship('ConceptCard', back_populates='student')
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
    is_weak_subject = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', back_populates='subjects')
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
    exam_goal = db.Column(db.String(100))
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='active')  # active, completed, archived
    progress = db.Column(db.Integer, default=0)  # 0-100 percentage
    study_pace = db.Column(db.String(20))
    daily_study_hours = db.Column(db.Integer)
    break_frequency = db.Column(db.String(20))
    stress_management = db.Column(db.String(50))
    study_environment = db.Column(db.String(50))
    preferred_study_time = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', back_populates='study_plans')
    subjects = db.relationship('StudyPlanSubject', back_populates='plan', cascade='all, delete-orphan')
    
    # Calculate days left property
    @property
    def days_left(self):
        if self.end_date:
            today = datetime.now().date()
            if today > self.end_date:
                return 0
            return (self.end_date - today).days
        return None
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">StudyPlanSubject Model</h3>
              <Code language="python">{`
class StudyPlanSubject(db.Model):
    __tablename__ = 'study_plan_subjects'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    plan_id = db.Column(db.String(36), db.ForeignKey('study_plans.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, in-progress, completed
    priority = db.Column(db.String(20))  # high, medium, low
    completed = db.Column(db.Boolean, default=False)
    difficulty = db.Column(db.String(20))  # easy, medium, hard
    hours_per_week = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    plan = db.relationship('StudyPlan', back_populates='subjects')
    topics = db.relationship('SubjectTopic', back_populates='subject', cascade='all, delete-orphan')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">SubjectTopic Model</h3>
              <Code language="python">{`
class SubjectTopic(db.Model):
    __tablename__ = 'subject_topics'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    subject_id = db.Column(db.String(36), db.ForeignKey('study_plan_subjects.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending')  # pending, in-progress, completed
    estimated_hours = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    subject = db.relationship('StudyPlanSubject', back_populates='topics')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">MoodLog Model</h3>
              <Code language="python">{`
class MoodLog(db.Model):
    __tablename__ = 'mood_logs'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    mood_type = db.Column(db.String(50), nullable=False)  # happy, motivated, stressed, tired, etc.
    mood_score = db.Column(db.Integer, nullable=False)  # 1-10 scale
    note = db.Column(db.Text)
    logged_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', back_populates='mood_logs')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">ConceptCard Model</h3>
              <Code language="python">{`
class ConceptCard(db.Model):
    __tablename__ = 'concept_cards'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text)
    completed = db.Column(db.Boolean, default=False)
    mastery_level = db.Column(db.Integer, default=0)  # 0-100 scale
    exam_ready = db.Column(db.Boolean, default=False)
    bookmarked = db.Column(db.Boolean, default=False)
    last_practiced = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', back_populates='concept_cards')
    flashcards = db.relationship('Flashcard', back_populates='concept_card', cascade='all, delete-orphan')
    
    @property
    def flashcards_total(self):
        return len(self.flashcards)
    
    @property
    def flashcards_completed(self):
        return len([f for f in self.flashcards if f.completed])
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">Flashcard Model</h3>
              <Code language="python">{`
class Flashcard(db.Model):
    __tablename__ = 'flashcards'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    concept_card_id = db.Column(db.String(36), db.ForeignKey('concept_cards.id'), nullable=False)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    concept_card = db.relationship('ConceptCard', back_populates='flashcards')
              `}</Code>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
              <h3 className="text-lg font-medium mb-2">StudyPreferences Model</h3>
              <Code language="python">{`
class StudyPreferences(db.Model):
    __tablename__ = 'study_preferences'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    study_pace = db.Column(db.String(20))  # slow, moderate, fast
    daily_study_hours = db.Column(db.Integer)
    preferred_study_time = db.Column(db.String(20))  # morning, afternoon, evening, night
    break_frequency = db.Column(db.String(20))  # e.g., "every 30 minutes", "every hour"
    stress_management = db.Column(db.String(50))  # e.g., "meditation", "physical exercise"
    study_environment = db.Column(db.String(50))  # e.g., "quiet room", "with background music"
    learning_style = db.Column(db.String(50))  # visual, auditory, reading/writing, kinesthetic
    personality_type = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    student = db.relationship('Student', back_populates='study_preferences')
              `}</Code>
            </div>
          </TabsContent>
          
          <TabsContent value="relationships" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Database Relationships</h2>
            
            <div className="space-y-6">
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Primary Relationships Diagram</h3>
                <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-xs">
{`
User (1) ────────────┐
                     │
                     │ 
                     ▼
                   Student (1) ───────────────┐
                     │                        │
         ┌───────────┼───────────┐           │
         │           │           │           │
         ▼           ▼           ▼           ▼
 StudyPreferences  MoodLogs  StudentSubjects  StudyPlans
       (1)         (many)      (many)        (many)
                                              │
                                              │
                                              ▼
                                      StudyPlanSubjects
                                          (many)
                                              │
                                              │
                                              ▼
                                       SubjectTopics
                                          (many)
`}
                </pre>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">User-focused Relationships</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  A user can be a student and has demographic information.
                </p>
                <Code language="python">{`
class User(db.Model):
    # Fields...
    
    # One-to-one relationship with Student
    student = db.relationship('Student', uselist=False, back_populates='user')
    
    # One-to-one relationship with UserDemographics
    demographics = db.relationship('UserDemographics', uselist=False, back_populates='user')

class Student(db.Model):
    # Fields...
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    
    # Reference back to User
    user = db.relationship('User', back_populates='student')

class UserDemographics(db.Model):
    # Fields...
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    
    # Reference back to User
    user = db.relationship('User', back_populates='demographics')
                `}</Code>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Student and Study Plan Relationships</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  A student can have multiple study plans, each with multiple subjects.
                </p>
                <Code language="python">{`
class Student(db.Model):
    # Fields...
    
    # One-to-many relationship with StudyPlan
    study_plans = db.relationship('StudyPlan', back_populates='student')

class StudyPlan(db.Model):
    # Fields...
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    
    # Reference back to Student
    student = db.relationship('Student', back_populates='study_plans')
    
    # One-to-many relationship with StudyPlanSubject
    subjects = db.relationship('StudyPlanSubject', back_populates='plan', cascade='all, delete-orphan')

class StudyPlanSubject(db.Model):
    # Fields...
    plan_id = db.Column(db.String(36), db.ForeignKey('study_plans.id'), nullable=False)
    
    # Reference back to StudyPlan
    plan = db.relationship('StudyPlan', back_populates='subjects')
    
    # One-to-many relationship with SubjectTopic
    topics = db.relationship('SubjectTopic', back_populates='subject', cascade='all, delete-orphan')

class SubjectTopic(db.Model):
    # Fields...
    subject_id = db.Column(db.String(36), db.ForeignKey('study_plan_subjects.id'), nullable=False)
    
    # Reference back to StudyPlanSubject
    subject = db.relationship('StudyPlanSubject', back_populates='topics')
                `}</Code>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Concept Cards and Flashcards Relationships</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Students create concept cards, which contain multiple flashcards.
                </p>
                <Code language="python">{`
class Student(db.Model):
    # Fields...
    
    # One-to-many relationship with ConceptCard
    concept_cards = db.relationship('ConceptCard', back_populates='student')

class ConceptCard(db.Model):
    # Fields...
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    
    # Reference back to Student
    student = db.relationship('Student', back_populates='concept_cards')
    
    # One-to-many relationship with Flashcard
    flashcards = db.relationship('Flashcard', back_populates='concept_card', cascade='all, delete-orphan')

class Flashcard(db.Model):
    # Fields...
    concept_card_id = db.Column(db.String(36), db.ForeignKey('concept_cards.id'), nullable=False)
    
    # Reference back to ConceptCard
    concept_card = db.relationship('ConceptCard', back_populates='flashcards')
                `}</Code>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Student and Mood Tracking Relationships</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Students can log multiple mood entries over time.
                </p>
                <Code language="python">{`
class Student(db.Model):
    # Fields...
    
    # One-to-many relationship with MoodLog
    mood_logs = db.relationship('MoodLog', back_populates='student')

class MoodLog(db.Model):
    # Fields...
    student_id = db.Column(db.String(36), db.ForeignKey('students.id'), nullable=False)
    
    # Reference back to Student
    student = db.relationship('Student', back_populates='mood_logs')
                `}</Code>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">API Implementation</h2>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium mb-2">Flask Application Structure</h3>
              <Code language="plaintext">{`
app/
├── __init__.py             # Application factory
├── config.py               # Configuration settings
├── models/                 # SQLAlchemy models
│   ├── __init__.py
│   ├── user.py             # User and UserDemographics models
│   ├── student.py          # Student, StudentSubject, and StudyPreferences models
│   ├── study_plan.py       # StudyPlan, StudyPlanSubject, and SubjectTopic models
│   ├── mood.py             # MoodLog model
│   └── concept.py          # ConceptCard and Flashcard models
├── routes/                 # API endpoints
│   ├── __init__.py
│   ├── auth_routes.py      # Authentication endpoints
│   ├── student_routes.py   # Student profile and preferences endpoints
│   ├── study_routes.py     # Study plans and subjects endpoints
│   ├── mood_routes.py      # Mood tracking endpoints
│   └── content_routes.py   # Concept cards and flashcards endpoints
├── services/               # Business logic
│   ├── __init__.py
│   ├── auth_service.py
│   ├── student_service.py
│   ├── study_service.py
│   ├── mood_service.py
│   └── content_service.py
├── schemas/                # Request/response schemas (Marshmallow)
├── utils/                  # Utility functions
└── extensions.py           # Flask extensions setup
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">User Authentication API</h3>
              <p className="text-sm text-muted-foreground mb-2">POST /api/auth/register</p>
              <Code language="python">{`
# routes/auth_routes.py
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate request data
    if not data or not all(k in data for k in ['email', 'password', 'name']):
        return jsonify({'message': 'Missing required fields'}), 400
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 409
        
    # Create new user
    new_user = User(
        email=data['email'],
        name=data['name'],
        role=data.get('role', 'student'),
        mobile_number=data.get('mobile_number')
    )
    new_user.set_password(data['password'])
    
    # Handle demographics if provided
    demographics_data = data.get('demographics')
    if demographics_data and isinstance(demographics_data, dict):
        demographics = UserDemographics(
            user=new_user,
            age=demographics_data.get('age'),
            gender=demographics_data.get('gender'),
            education_level=demographics_data.get('education_level'),
            city=demographics_data.get('city'),
            state=demographics_data.get('state'),
            country=demographics_data.get('country')
        )
        db.session.add(demographics)
    
    # If role is student, create student profile
    if new_user.role == 'student':
        student = Student(
            user=new_user,
            onboarding_completed=False
        )
        db.session.add(student)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            'message': 'User registered successfully',
            'user_id': new_user.id
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">Student Profile API</h3>
              <p className="text-sm text-muted-foreground mb-2">PUT /api/students/{'{student_id}'}/profile</p>
              <Code language="python">{`
# routes/student_routes.py
@student_bp.route('/<student_id>/profile', methods=['PUT'])
@jwt_required()
def update_student_profile(student_id):
    # Check if current user has permission
    current_user_id = get_jwt_identity()
    student = Student.query.get_or_404(student_id)
    
    if student.user_id != current_user_id:
        return jsonify({'message': 'Unauthorized access'}), 403
    
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    # Update fields
    for field in ['grade', 'age', 'education_level', 'city', 'exam_type', 'personality_type']:
        if field in data:
            setattr(student, field, data[field])
    
    # Handle exam appearing date if provided
    if 'exam_appearing_date' in data:
        try:
            student.exam_appearing_date = datetime.strptime(data['exam_appearing_date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'message': 'Invalid date format, use YYYY-MM-DD'}), 400
    
    try:
        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">Study Plan API</h3>
              <p className="text-sm text-muted-foreground mb-2">POST /api/students/{'{student_id}'}/study-plans</p>
              <Code language="python">{`
# routes/study_routes.py
@study_bp.route('/students/<student_id>/study-plans', methods=['POST'])
@jwt_required()
def create_study_plan(student_id):
    # Check if current user has permission
    current_user_id = get_jwt_identity()
    student = Student.query.get_or_404(student_id)
    
    if student.user_id != current_user_id:
        return jsonify({'message': 'Unauthorized access'}), 403
    
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    # Validate required fields
    required_fields = ['title', 'start_date', 'end_date']
    if not all(field in data for field in required_fields):
        return jsonify({'message': f'Missing required fields: {required_fields}'}), 400
    
    try:
        # Parse dates
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        
        # Create study plan
        new_plan = StudyPlan(
            student_id=student_id,
            title=data['title'],
            description=data.get('description', ''),
            exam_goal=data.get('exam_goal', ''),
            start_date=start_date,
            end_date=end_date,
            status='active',
            progress=0,
            study_pace=data.get('study_pace'),
            daily_study_hours=data.get('daily_study_hours'),
            break_frequency=data.get('break_frequency'),
            stress_management=data.get('stress_management'),
            study_environment=data.get('study_environment'),
            preferred_study_time=data.get('preferred_study_time')
        )
        
        db.session.add(new_plan)
        db.session.flush()  # Get ID for the new plan
        
        # Process subjects if provided
        subjects_data = data.get('subjects', [])
        for subject_data in subjects_data:
            subject = StudyPlanSubject(
                plan_id=new_plan.id,
                name=subject_data.get('name', ''),
                status='pending',
                priority=subject_data.get('priority', 'medium'),
                difficulty=subject_data.get('difficulty', 'medium'),
                hours_per_week=subject_data.get('hours_per_week', 0)
            )
            db.session.add(subject)
            
            # Process topics if provided
            topics_data = subject_data.get('topics', [])
            for topic_data in topics_data:
                topic = SubjectTopic(
                    subject=subject,
                    name=topic_data.get('name', ''),
                    description=topic_data.get('description', ''),
                    estimated_hours=topic_data.get('estimated_hours', 0)
                )
                db.session.add(topic)
        
        db.session.commit()
        return jsonify({
            'message': 'Study plan created successfully',
            'plan_id': new_plan.id
        }), 201
        
    except ValueError:
        return jsonify({'message': 'Invalid date format, use YYYY-MM-DD'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">Concept Cards API</h3>
              <p className="text-sm text-muted-foreground mb-2">GET /api/students/{'{student_id}'}/concept-cards</p>
              <Code language="python">{`
# routes/content_routes.py
@content_bp.route('/students/<student_id>/concept-cards', methods=['GET'])
@jwt_required()
def get_student_concept_cards(student_id):
    # Check if current user has permission
    current_user_id = get_jwt_identity()
    student = Student.query.get_or_404(student_id)
    
    if student.user_id != current_user_id:
        return jsonify({'message': 'Unauthorized access'}), 403
    
    # Get query parameters for filtering
    subject = request.args.get('subject')
    topic = request.args.get('topic')
    completed = request.args.get('completed')
    bookmarked = request.args.get('bookmarked')
    
    # Build query
    query = ConceptCard.query.filter_by(student_id=student_id)
    
    if subject:
        query = query.filter_by(subject=subject)
    if topic:
        query = query.filter_by(topic=topic)
    if completed is not None:
        completed_bool = completed.lower() == 'true'
        query = query.filter_by(completed=completed_bool)
    if bookmarked is not None:
        bookmarked_bool = bookmarked.lower() == 'true'
        query = query.filter_by(bookmarked=bookmarked_bool)
    
    concept_cards = query.all()
    
    # Serialize concept cards
    result = []
    for card in concept_cards:
        result.append({
            'id': card.id,
            'title': card.title,
            'subject': card.subject,
            'topic': card.topic,
            'completed': card.completed,
            'mastery_level': card.mastery_level,
            'exam_ready': card.exam_ready,
            'bookmarked': card.bookmarked,
            'last_practiced': card.last_practiced.isoformat() if card.last_practiced else None,
            'flashcards_total': card.flashcards_total,
            'flashcards_completed': card.flashcards_completed
        })
    
    return jsonify(result), 200
              `}</Code>
            </div>
            
            <div className="rounded-md border p-4 mb-4">
              <h3 className="font-medium">Mood Tracking API</h3>
              <p className="text-sm text-muted-foreground mb-2">POST /api/students/{'{student_id}'}/mood-logs</p>
              <Code language="python">{`
# routes/mood_routes.py
@mood_bp.route('/students/<student_id>/mood-logs', methods=['POST'])
@jwt_required()
def log_mood(student_id):
    # Check if current user has permission
    current_user_id = get_jwt_identity()
    student = Student.query.get_or_404(student_id)
    
    if student.user_id != current_user_id:
        return jsonify({'message': 'Unauthorized access'}), 403
    
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    # Validate required fields
    if 'mood_type' not in data or 'mood_score' not in data:
        return jsonify({'message': 'Missing required fields: mood_type, mood_score'}), 400
    
    try:
        # Validate mood score is in range 1-10
        mood_score = int(data['mood_score'])
        if not 1 <= mood_score <= 10:
            return jsonify({'message': 'Mood score must be between 1 and 10'}), 400
        
        # Create mood log
        mood_log = MoodLog(
            student_id=student_id,
            mood_type=data['mood_type'],
            mood_score=mood_score,
            note=data.get('note', '')
        )
        
        db.session.add(mood_log)
        db.session.commit()
        
        return jsonify({
            'message': 'Mood logged successfully',
            'mood_log_id': mood_log.id
        }), 201
        
    except ValueError:
        return jsonify({'message': 'Invalid mood score, must be a number'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500
              `}</Code>
            </div>
          </TabsContent>
          
          <TabsContent value="implementation" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Step-by-Step Implementation Guide</h2>
            
            <div className="space-y-8">
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">1. Setting Up Flask Project</h3>
                <div className="mt-2 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Project Setup</h4>
                    <Code language="bash">{`
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install flask flask-sqlalchemy flask-jwt-extended flask-migrate flask-cors python-dotenv marshmallow
                    `}</Code>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Directory Structure</h4>
                    <Code language="bash">{`
mkdir -p app/models app/routes app/services app/schemas app/utils
touch app/__init__.py app/config.py app/extensions.py
                    `}</Code>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Configuration</h4>
                    <Code language="python">{`
# app/config.py
import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-for-testing'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or 'mysql+pymysql://username:password@localhost/prepzr'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-dev-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
class DevelopmentConfig(Config):
    DEBUG = True
    
class ProductionConfig(Config):
    DEBUG = False
    
class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
                    `}</Code>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Extensions Setup</h4>
                    <Code language="python">{`
# app/extensions.py
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()
                    `}</Code>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">App Factory</h4>
                    <Code language="python">{`
# app/__init__.py
from flask import Flask
from flask_cors import CORS
from app.extensions import db, jwt, migrate
from app.config import config

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.student_routes import student_bp
    from app.routes.study_routes import study_bp
    from app.routes.mood_routes import mood_bp
    from app.routes.content_routes import content_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(student_bp, url_prefix='/api/students')
    app.register_blueprint(study_bp, url_prefix='/api')
    app.register_blueprint(mood_bp, url_prefix='/api')
    app.register_blueprint(content_bp, url_prefix='/api')
    
    return app
                    `}</Code>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">2. Creating SQLAlchemy Models</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Implement models with relationships following the schema definition.
                </p>
                <div>
                  <h4 className="text-sm font-medium">Add Foreign Key Constraints to Migrations</h4>
                  <Code language="python">{`
# In create_tables.py or your migration script
from app import create_app, db
from app.models import User, Student, StudyPlan, StudyPlanSubject, SubjectTopic

app = create_app()

with app.app_context():
    # Create all tables
    db.create_all()
    print("Database tables created successfully!")
                  `}</Code>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">3. API Routes Implementation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Implement RESTful APIs for each feature area.
                </p>
                <Code language="python">{`
# Example: Setting up route files

# app/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.models.student import Student

auth_bp = Blueprint('auth', __name__)

# Add routes like register, login, etc.

# app/routes/student_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.student import Student, StudyPreferences

student_bp = Blueprint('student', __name__)

# Add routes for student profile, preferences, etc.

# Implement other route files similarly
                `}</Code>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">4. Authentication Implementation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Set up JWT-based authentication with login/logout and token refresh.
                </p>
                <Code language="python">{`
# app/routes/auth_routes.py

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Missing email or password'}), 400
        
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Create access token
    access_token = create_access_token(identity=user.id)
    
    # Get additional data for response
    response_data = {
        'access_token': access_token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'role': user.role
        }
    }
    
    # Add student-specific info if applicable
    if user.role == 'student' and user.student:
        student = user.student
        response_data['student'] = {
            'id': student.id,
            'onboarding_completed': student.onboarding_completed
        }
    
    return jsonify(response_data), 200
                `}</Code>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">5. Study Plan Feature Implementation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Implement APIs for managing study plans, subjects and topics.
                </p>
                <Code language="python">{`
# app/routes/study_routes.py

@study_bp.route('/students/<student_id>/study-plans/<plan_id>', methods=['GET'])
@jwt_required()
def get_study_plan_detail(student_id, plan_id):
    # Permission check
    current_user_id = get_jwt_identity()
    student = Student.query.get_or_404(student_id)
    
    if student.user_id != current_user_id:
        return jsonify({'message': 'Unauthorized access'}), 403
    
    # Get study plan with subjects and topics
    plan = StudyPlan.query.get_or_404(plan_id)
    
    if plan.student_id != student_id:
        return jsonify({'message': 'Study plan not found for this student'}), 404
    
    # Serialize plan data
    plan_data = {
        'id': plan.id,
        'title': plan.title,
        'description': plan.description,
        'exam_goal': plan.exam_goal,
        'start_date': plan.start_date.isoformat(),
        'end_date': plan.end_date.isoformat(),
        'status': plan.status,
        'progress': plan.progress,
        'study_pace': plan.study_pace,
        'daily_study_hours': plan.daily_study_hours,
        'preferred_study_time': plan.preferred_study_time,
        'days_left': plan.days_left,
        'subjects': []
    }
    
    # Add subjects with topics
    for subject in plan.subjects:
        subject_data = {
            'id': subject.id,
            'name': subject.name,
            'status': subject.status,
            'priority': subject.priority,
            'completed': subject.completed,
            'difficulty': subject.difficulty,
            'hours_per_week': subject.hours_per_week,
            'topics': []
        }
        
        for topic in subject.topics:
            topic_data = {
                'id': topic.id,
                'name': topic.name,
                'description': topic.description,
                'status': topic.status,
                'estimated_hours': topic.estimated_hours
            }
            subject_data['topics'].append(topic_data)
        
        plan_data['subjects'].append(subject_data)
    
    return jsonify(plan_data), 200
                `}</Code>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">6. Mood Tracking Implementation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Implement APIs for mood logging and retrieval.
                </p>
                <Code language="python">{`
# app/routes/mood_routes.py

@mood_bp.route('/students/<student_id>/mood-logs', methods=['GET'])
@jwt_required()
def get_mood_logs(student_id):
    # Permission check
    current_user_id = get_jwt_identity()
    student = Student.query.get_or_404(student_id)
    
    if student.user_id != current_user_id:
        return jsonify({'message': 'Unauthorized access'}), 403
    
    # Get query parameters
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    mood_type = request.args.get('mood_type')
    
    # Build query
    query = MoodLog.query.filter_by(student_id=student_id)
    
    if start_date:
        try:
            parsed_start = datetime.strptime(start_date, '%Y-%m-%d')
            query = query.filter(MoodLog.logged_at >= parsed_start)
        except ValueError:
            return jsonify({'message': 'Invalid start_date format, use YYYY-MM-DD'}), 400
    
    if end_date:
        try:
            parsed_end = datetime.strptime(end_date, '%Y-%m-%d')
            parsed_end = parsed_end.replace(hour=23, minute=59, second=59)
            query = query.filter(MoodLog.logged_at <= parsed_end)
        except ValueError:
            return jsonify({'message': 'Invalid end_date format, use YYYY-MM-DD'}), 400
    
    if mood_type:
        query = query.filter_by(mood_type=mood_type)
    
    # Order by timestamp descending
    query = query.order_by(MoodLog.logged_at.desc())
    
    # Get results
    mood_logs = query.all()
    result = []
    
    for log in mood_logs:
        result.append({
            'id': log.id,
            'mood_type': log.mood_type,
            'mood_score': log.mood_score,
            'note': log.note,
            'logged_at': log.logged_at.isoformat()
        })
    
    return jsonify(result), 200
                `}</Code>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">7. Running the Application</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Set up environment variables and run the Flask application.
                </p>
                <Code language="bash">{`
# Create a .env file
echo "FLASK_APP=run.py
FLASK_ENV=development
DATABASE_URI=mysql+pymysql://username:password@localhost/prepzr
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here" > .env

# Create run.py file
echo "from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)" > run.py

# Run migrations
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Run the application
flask run
                `}</Code>
              </div>
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
