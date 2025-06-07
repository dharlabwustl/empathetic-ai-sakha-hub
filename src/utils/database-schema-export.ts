
// Enhanced database schema CSV generation with comprehensive UI mappings and analytics

export const downloadDatabaseSchemaCSV = () => {
  // Enhanced CSV content with all UI mappings and analytics data points
  const csvContent = `table_name,field_name,data_type,ui_component,page_location,description,analytics_tracked,default_value
users,id,UUID,Hidden Field,All Pages,Primary key identifier,true,gen_random_uuid()
users,email,VARCHAR(255),Email Input,Login/Profile,User email address,true,
users,name,VARCHAR(255),Text Input,Profile/Dashboard,User full name,true,
users,avatar,TEXT,Image Upload,Profile,Profile picture URL,false,
users,subscription_type,ENUM,Subscription Badge,Dashboard Header,Current subscription plan,true,free
users,signup_date,TIMESTAMP,Date Display,Admin Dashboard,Account creation date,true,NOW()
users,last_login,TIMESTAMP,Date Display,Admin Dashboard,Last login timestamp,true,NOW()
users,created_at,TIMESTAMP,Date Display,Admin Dashboard,Record creation time,true,NOW()
users,updated_at,TIMESTAMP,Date Display,Admin Dashboard,Last update time,true,NOW()

student_profiles,id,UUID,Hidden Field,All Pages,Primary key identifier,true,gen_random_uuid()
student_profiles,user_id,UUID,Hidden Field,All Pages,Foreign key to users,true,
student_profiles,exam_goal,VARCHAR(255),Dropdown Select,Onboarding/Profile,Target exam (NEET/JEE),true,
student_profiles,target_score,INTEGER,Number Input,Profile/Goals,Desired exam score,true,
student_profiles,current_class,VARCHAR(50),Dropdown Select,Profile,Current academic class,true,
student_profiles,school_name,VARCHAR(255),Text Input,Profile,School/Institution name,false,
student_profiles,learning_pace,ENUM,Radio Buttons,Study Plan,Learning speed preference,true,medium
student_profiles,study_hours_per_day,INTEGER,Slider Input,Study Plan,Daily study hours,true,6
student_profiles,preferred_study_time,ENUM,Time Picker,Study Plan,Preferred study timing,true,evening
student_profiles,weak_subjects,JSON,Checkbox Group,Academic Advisor,Subjects needing focus,true,[]
student_profiles,strong_subjects,JSON,Checkbox Group,Academic Advisor,Strong subject areas,true,[]
student_profiles,mood_preference,ENUM,Mood Selector,Dashboard,Current mood setting,true,motivated
student_profiles,ai_tutor_enabled,BOOLEAN,Toggle Switch,Settings,AI tutor feature status,true,true
student_profiles,voice_assistant_enabled,BOOLEAN,Toggle Switch,Settings,Voice assistant status,true,false

concept_cards,id,UUID,Hidden Field,Concepts Page,Primary key identifier,true,gen_random_uuid()
concept_cards,title,VARCHAR(255),Card Title,Concepts Grid,Concept card title,true,
concept_cards,subject,VARCHAR(100),Subject Badge,Concepts Grid,Subject category,true,
concept_cards,difficulty,ENUM,Difficulty Badge,Concepts Grid,Difficulty level,true,medium
concept_cards,description,TEXT,Card Description,Concept Detail,Detailed explanation,false,
concept_cards,visual_content,TEXT,Image/Video Display,Visual Tab,Visual learning content,false,
concept_cards,formula_content,TEXT,Formula Renderer,Formula Lab Tab,Mathematical formulas,false,
concept_cards,3d_content,JSON,3D Viewer,3D Tab,Interactive 3D models,false,{}
concept_cards,practice_questions,JSON,Question List,Practice Tab,Related questions,false,[]
concept_cards,completion_rate,DECIMAL(5,2),Progress Bar,Overview Cards,Completion percentage,true,0.00
concept_cards,mastery_level,ENUM,Mastery Badge,Analytics,Student mastery level,true,beginner
concept_cards,average_study_time,INTEGER,Time Display,Analytics,Avg time spent (minutes),true,0
concept_cards,total_views,INTEGER,Counter Display,Analytics,Total view count,true,0
concept_cards,last_accessed,TIMESTAMP,Date Display,Analytics,Last access timestamp,true,
concept_cards,bookmark_count,INTEGER,Counter Display,Analytics,Times bookmarked,true,0
concept_cards,difficulty_rating,DECIMAL(3,2),Star Rating,Analytics,User difficulty rating,true,0.00
concept_cards,understanding_score,DECIMAL(5,2),Progress Circle,Analytics,Understanding percentage,true,0.00

flashcard_sets,id,UUID,Hidden Field,Flashcards Page,Primary key identifier,true,gen_random_uuid()
flashcard_sets,title,VARCHAR(255),Card Title,Flashcards Grid,Flashcard set title,true,
flashcard_sets,subject,VARCHAR(100),Subject Badge,Flashcards Grid,Subject category,true,
flashcard_sets,total_cards,INTEGER,Count Badge,Flashcards Grid,Number of cards in set,true,0
flashcard_sets,difficulty,ENUM,Difficulty Badge,Flashcards Grid,Set difficulty level,true,medium
flashcard_sets,description,TEXT,Card Description,Flashcard Detail,Set description,false,
flashcard_sets,accuracy_rate,DECIMAL(5,2),Progress Bar,Analytics,Overall accuracy rate,true,0.00
flashcard_sets,average_time_per_card,INTEGER,Time Display,Analytics,Avg time per card (seconds),true,0
flashcard_sets,total_attempts,INTEGER,Counter Display,Analytics,Total practice attempts,true,0
flashcard_sets,correct_attempts,INTEGER,Counter Display,Analytics,Correct answer count,true,0
flashcard_sets,mastery_percentage,DECIMAL(5,2),Progress Circle,Analytics,Mastery percentage,true,0.00
flashcard_sets,last_practiced,TIMESTAMP,Date Display,Analytics,Last practice session,true,
flashcard_sets,streak_count,INTEGER,Streak Badge,Analytics,Current correct streak,true,0
flashcard_sets,confidence_level,ENUM,Confidence Badge,Analytics,User confidence level,true,low

practice_exams,id,UUID,Hidden Field,Practice Exams Page,Primary key identifier,true,gen_random_uuid()
practice_exams,title,VARCHAR(255),Exam Title,Exams Grid,Practice exam title,true,
practice_exams,exam_type,VARCHAR(100),Type Badge,Exams Grid,Exam category,true,
practice_exams,duration,INTEGER,Time Display,Exam Detail,Exam duration (minutes),true,180
practice_exams,total_questions,INTEGER,Count Display,Exam Detail,Total number of questions,true,100
practice_exams,difficulty,ENUM,Difficulty Badge,Exams Grid,Exam difficulty level,true,medium
practice_exams,syllabus_coverage,JSON,Progress Bars,Exam Detail,Syllabus topics covered,false,[]
practice_exams,avg_score,DECIMAL(5,2),Score Display,Analytics,Average score achieved,true,0.00
practice_exams,highest_score,DECIMAL(5,2),Score Display,Analytics,Highest score achieved,true,0.00
practice_exams,attempt_count,INTEGER,Counter Display,Analytics,Total attempts made,true,0
practice_exams,completion_rate,DECIMAL(5,2),Progress Bar,Analytics,Completion percentage,true,0.00
practice_exams,time_efficiency,DECIMAL(5,2),Efficiency Meter,Analytics,Time utilization rate,true,0.00
practice_exams,subject_wise_performance,JSON,Performance Chart,Analytics,Subject-wise scores,true,{}
practice_exams,improvement_trend,JSON,Trend Chart,Analytics,Score improvement data,true,[]
practice_exams,last_attempted,TIMESTAMP,Date Display,Analytics,Last attempt timestamp,true,

study_plans,id,UUID,Hidden Field,Study Plan Page,Primary key identifier,true,gen_random_uuid()
study_plans,title,VARCHAR(255),Plan Title,Study Plan Header,Study plan title,true,
study_plans,exam_target,VARCHAR(100),Target Badge,Study Plan Header,Target exam name,true,
study_plans,exam_date,DATE,Date Display,Study Plan Header,Target exam date,true,
study_plans,total_hours,INTEGER,Hours Display,Study Plan Stats,Total planned hours,true,0
study_plans,weekly_hours,INTEGER,Hours Display,Study Plan Stats,Weekly study hours,true,40
study_plans,progress_percentage,DECIMAL(5,2),Progress Bar,Study Plan Header,Overall progress,true,0.00
study_plans,subjects_data,JSON,Subject Cards,Study Plan Grid,Subject-wise planning,true,[]
study_plans,daily_schedule,JSON,Calendar View,Weekly Schedule,Daily study schedule,false,{}
study_plans,milestones,JSON,Milestone Cards,Goals Tab,Study milestones,false,[]
study_plans,ai_recommendations,JSON,Recommendation Cards,AI Tab,AI-generated suggestions,true,[]
study_plans,performance_metrics,JSON,Performance Charts,Dashboard Tab,Progress analytics,true,{}
study_plans,last_updated,TIMESTAMP,Date Display,Study Plan Footer,Last modification time,true,NOW()

feel_good_content,id,UUID,Hidden Field,Feel Good Corner,Primary key identifier,true,gen_random_uuid()
feel_good_content,type,ENUM,Content Type Badge,Feel Good Grid,Content category,true,quote
feel_good_content,title,VARCHAR(255),Content Title,Feel Good Cards,Content title,true,
feel_good_content,content,TEXT,Content Display,Feel Good Detail,Main content text,false,
feel_good_content,image_url,TEXT,Image Display,Feel Good Cards,Associated image,false,
feel_good_content,tags,JSON,Tag Pills,Feel Good Cards,Content tags,false,[]
feel_good_content,mood_category,ENUM,Mood Badge,Feel Good Grid,Target mood category,true,happy
feel_good_content,engagement_score,DECIMAL(5,2),Engagement Meter,Analytics,User engagement rate,true,0.00
feel_good_content,view_count,INTEGER,View Counter,Analytics,Total view count,true,0
feel_good_content,like_count,INTEGER,Like Counter,Feel Good Cards,Likes received,true,0
feel_good_content,share_count,INTEGER,Share Counter,Analytics,Times shared,true,0
feel_good_content,effectiveness_rating,DECIMAL(3,2),Star Rating,Analytics,Mood improvement rating,true,0.00

ai_tutor_sessions,id,UUID,Hidden Field,AI Tutor Page,Primary key identifier,true,gen_random_uuid()
ai_tutor_sessions,user_id,UUID,Hidden Field,AI Tutor Page,User identifier,true,
ai_tutor_sessions,subject,VARCHAR(100),Subject Badge,Chat Header,Discussion subject,true,
ai_tutor_sessions,topic,VARCHAR(255),Topic Display,Chat Header,Specific topic discussed,true,
ai_tutor_sessions,session_duration,INTEGER,Time Display,Session Stats,Duration in minutes,true,0
ai_tutor_sessions,message_count,INTEGER,Message Counter,Session Stats,Total messages exchanged,true,0
ai_tutor_sessions,difficulty_level,ENUM,Difficulty Badge,Chat Header,Question difficulty,true,medium
ai_tutor_sessions,satisfaction_rating,INTEGER,Star Rating,Session End,User satisfaction score,true,0
ai_tutor_sessions,concepts_clarified,JSON,Concept Tags,Session Summary,Clarified concepts list,true,[]
ai_tutor_sessions,follow_up_needed,BOOLEAN,Status Badge,Session Summary,Requires follow-up,true,false
ai_tutor_sessions,session_summary,TEXT,Summary Display,Session History,AI-generated summary,false,
ai_tutor_sessions,effectiveness_score,DECIMAL(5,2),Effectiveness Meter,Analytics,Learning effectiveness,true,0.00
ai_tutor_sessions,created_at,TIMESTAMP,Date Display,Session History,Session start time,true,NOW()

formula_practice_sessions,id,UUID,Hidden Field,Formula Lab Page,Primary key identifier,true,gen_random_uuid()
formula_practice_sessions,concept_id,UUID,Hidden Field,Formula Lab,Related concept ID,true,
formula_practice_sessions,formula_type,VARCHAR(100),Formula Badge,Practice Header,Type of formula,true,
formula_practice_sessions,difficulty,ENUM,Difficulty Badge,Practice Header,Practice difficulty,true,medium
formula_practice_sessions,total_problems,INTEGER,Count Display,Practice Stats,Total problems attempted,true,0
formula_practice_sessions,correct_solutions,INTEGER,Count Display,Practice Stats,Correct solutions count,true,0
formula_practice_sessions,average_time,INTEGER,Time Display,Practice Stats,Avg time per problem,true,0
formula_practice_sessions,accuracy_rate,DECIMAL(5,2),Accuracy Meter,Practice Summary,Solution accuracy rate,true,0.00
formula_practice_sessions,improvement_rate,DECIMAL(5,2),Improvement Chart,Analytics,Learning improvement,true,0.00
formula_practice_sessions,practice_streak,INTEGER,Streak Badge,Practice Stats,Consecutive practice days,true,0
formula_practice_sessions,mastery_level,ENUM,Mastery Badge,Practice Summary,Current mastery level,true,beginner
formula_practice_sessions,last_practiced,TIMESTAMP,Date Display,Practice History,Last practice session,true,

dashboard_cards,id,UUID,Hidden Field,Dashboard Overview,Primary key identifier,true,gen_random_uuid()
dashboard_cards,card_type,VARCHAR(100),Card Type Badge,Dashboard Grid,Type of dashboard card,true,
dashboard_cards,title,VARCHAR(255),Card Title,Dashboard Cards,Card display title,true,
dashboard_cards,value,VARCHAR(100),Value Display,Dashboard Cards,Main metric value,true,
dashboard_cards,unit,VARCHAR(50),Unit Label,Dashboard Cards,Value unit (%, hours, etc),true,
dashboard_cards,trend,ENUM,Trend Icon,Dashboard Cards,Trend direction,true,stable
dashboard_cards,comparison_period,VARCHAR(50),Period Label,Dashboard Cards,Comparison timeframe,true,week
dashboard_cards,previous_value,VARCHAR(100),Previous Value,Card Tooltip,Previous period value,true,
dashboard_cards,percentage_change,DECIMAL(5,2),Change Indicator,Dashboard Cards,Percentage change,true,0.00
dashboard_cards,color_theme,VARCHAR(50),Color Class,Dashboard Cards,Card color scheme,true,blue
dashboard_cards,icon_name,VARCHAR(100),Icon Component,Dashboard Cards,Display icon name,true,target
dashboard_cards,click_action,VARCHAR(255),Navigation Link,Dashboard Cards,Click destination,false,
dashboard_cards,visibility_rules,JSON,Visibility Logic,Dashboard Cards,Display conditions,false,{}
dashboard_cards,refresh_interval,INTEGER,Auto-refresh Timer,Dashboard Cards,Update frequency (seconds),true,300
dashboard_cards,last_updated,TIMESTAMP,Update Timestamp,Card Footer,Last data refresh,true,NOW()

mood_logs,id,UUID,Hidden Field,Mood Tracking,Primary key identifier,true,gen_random_uuid()
mood_logs,user_id,UUID,Hidden Field,Mood Tracking,User identifier,true,
mood_logs,mood_type,ENUM,Mood Selector,Mood Widget,Selected mood type,true,neutral
mood_logs,intensity,INTEGER,Intensity Slider,Mood Widget,Mood intensity (1-10),true,5
mood_logs,trigger_factors,JSON,Factor Chips,Mood Detail,Mood trigger factors,true,[]
mood_logs,study_correlation,DECIMAL(3,2),Correlation Meter,Analytics,Study performance correlation,true,0.00
mood_logs,improvement_suggestions,JSON,Suggestion Cards,Mood Analysis,AI improvement tips,false,[]
mood_logs,mood_duration,INTEGER,Duration Display,Mood History,Mood duration (hours),true,0
mood_logs,context_notes,TEXT,Notes Display,Mood Detail,User context notes,false,
mood_logs,created_at,TIMESTAMP,Timestamp Display,Mood Timeline,Mood log creation time,true,NOW()

system_settings,id,UUID,Hidden Field,Admin Settings,Primary key identifier,true,gen_random_uuid()
system_settings,setting_category,VARCHAR(100),Category Tab,Settings Page,Setting category group,true,
system_settings,setting_name,VARCHAR(255),Setting Label,Settings Form,Setting display name,true,
system_settings,setting_value,TEXT,Input Field,Settings Form,Current setting value,true,
system_settings,setting_type,ENUM,Input Type,Settings Form,Type of input control,true,text
system_settings,description,TEXT,Help Text,Settings Form,Setting description,false,
system_settings,is_user_configurable,BOOLEAN,Permission Check,Settings Form,User can modify,true,true
system_settings,requires_restart,BOOLEAN,Restart Warning,Settings Form,Needs app restart,true,false
system_settings,last_modified,TIMESTAMP,Modified Date,Settings History,Last change timestamp,true,NOW()
system_settings,modified_by,UUID,User Display,Settings History,Last modifier user ID,true,

notifications,id,UUID,Hidden Field,Notifications Page,Primary key identifier,true,gen_random_uuid()
notifications,user_id,UUID,Hidden Field,Notifications,Target user identifier,true,
notifications,type,ENUM,Type Badge,Notification Card,Notification category,true,info
notifications,title,VARCHAR(255),Notification Title,Notification Card,Main notification title,true,
notifications,message,TEXT,Message Display,Notification Detail,Notification content,true,
notifications,priority,ENUM,Priority Badge,Notification Card,Notification importance,true,normal
notifications,is_read,BOOLEAN,Read Status,Notification Card,Read/unread indicator,true,false
notifications,action_url,VARCHAR(255),Action Button,Notification Card,Click destination URL,false,
notifications,expires_at,TIMESTAMP,Expiry Date,Notification Management,Notification expiry time,false,
notifications,created_at,TIMESTAMP,Created Date,Notification Timeline,Creation timestamp,true,NOW()`;

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, 'prepzr_comprehensive_database_schema.csv');
  } else {
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'prepzr_comprehensive_database_schema.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const exportDatabaseSchemaToCSV = downloadDatabaseSchemaCSV;
