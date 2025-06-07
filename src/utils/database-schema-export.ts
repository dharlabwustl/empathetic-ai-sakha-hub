export interface DatabaseField {
  name: string;
  type: string;
  required: boolean;
  primaryKey: boolean;
  foreignKey?: string;
  defaultValue?: any;
  uiComponent?: string;
  pageLocation?: string;
  fieldId?: string;
  description?: string;
}

export interface DatabaseTable {
  name: string;
  description: string;
  fields: DatabaseField[];
}

const mockTables: DatabaseTable[] = [
  {
    name: 'Users',
    description: 'Stores user account information',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'username', type: 'VARCHAR(50)', required: true, uiComponent: 'Input', pageLocation: 'Registration' },
      { name: 'email', type: 'VARCHAR(100)', required: true, uiComponent: 'Input', pageLocation: 'Registration' },
      { name: 'passwordHash', type: 'VARCHAR(255)', required: true, uiComponent: 'Password', pageLocation: 'Registration' },
      { name: 'createdAt', type: 'TIMESTAMP', required: true, uiComponent: 'Date', pageLocation: 'Any' },
      { name: 'updatedAt', type: 'TIMESTAMP', required: true, uiComponent: 'Date', pageLocation: 'Any' },
      { name: 'profileId', type: 'UUID', required: true, foreignKey: 'Profiles.id', uiComponent: 'UUID', pageLocation: 'Profile' }
    ]
  },
  {
    name: 'Profiles',
    description: 'Stores user profile details',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'fullName', type: 'VARCHAR(100)', required: true, uiComponent: 'Input', pageLocation: 'Profile' },
      { name: 'dateOfBirth', type: 'DATE', uiComponent: 'Date', pageLocation: 'Profile' },
      { name: 'bio', type: 'TEXT', uiComponent: 'TextArea', pageLocation: 'Profile' },
      { name: 'profilePicture', type: 'VARCHAR(255)', uiComponent: 'ImageUpload', pageLocation: 'Profile' },
      { name: 'userId', type: 'UUID', required: true, foreignKey: 'Users.id', uiComponent: 'UUID', pageLocation: 'Any' }
    ]
  },
  {
    name: 'StudyPlans',
    description: 'Stores study plan information',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'name', type: 'VARCHAR(100)', required: true, uiComponent: 'Input', pageLocation: 'StudyPlan' },
      { name: 'description', type: 'TEXT', uiComponent: 'TextArea', pageLocation: 'StudyPlan' },
      { name: 'exam', type: 'VARCHAR(50)', required: true, uiComponent: 'Select', pageLocation: 'StudyPlan' },
      { name: 'examDate', type: 'DATE', required: true, uiComponent: 'Date', pageLocation: 'StudyPlan' },
      { name: 'startDate', type: 'DATE', required: true, uiComponent: 'Date', pageLocation: 'StudyPlan' },
      { name: 'endDate', type: 'DATE', required: true, uiComponent: 'Date', pageLocation: 'StudyPlan' },
      { name: 'hoursPerWeek', type: 'INTEGER', required: true, uiComponent: 'Number', pageLocation: 'StudyPlan' },
      { name: 'userId', type: 'UUID', required: true, foreignKey: 'Users.id', uiComponent: 'UUID', pageLocation: 'Any' }
    ]
  },
  {
    name: 'Subjects',
    description: 'Stores subject details for study plans',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'name', type: 'VARCHAR(50)', required: true, uiComponent: 'Input', pageLocation: 'Subject' },
      { name: 'color', type: 'VARCHAR(7)', required: true, uiComponent: 'ColorPicker', pageLocation: 'Subject' },
      { name: 'hoursPerWeek', type: 'INTEGER', required: true, uiComponent: 'Number', pageLocation: 'Subject' },
      { name: 'studyPlanId', type: 'UUID', required: true, foreignKey: 'StudyPlans.id', uiComponent: 'UUID', pageLocation: 'Any' }
    ]
  },
  {
    name: 'Topics',
    description: 'Stores topic details for subjects',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'name', type: 'VARCHAR(100)', required: true, uiComponent: 'Input', pageLocation: 'Topic' },
      { name: 'hoursAllocated', type: 'INTEGER', required: true, uiComponent: 'Number', pageLocation: 'Topic' },
      { name: 'status', type: 'ENUM("not-started", "in-progress", "completed")', uiComponent: 'Select', pageLocation: 'Topic' },
      { name: 'subjectId', type: 'UUID', required: true, foreignKey: 'Subjects.id', uiComponent: 'UUID', pageLocation: 'Any' }
    ]
  },
  {
    name: 'DailyPlans',
    description: 'Stores daily plan items',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'date', type: 'DATE', required: true, uiComponent: 'Date', pageLocation: 'DailyPlan' },
      { name: 'subject', type: 'VARCHAR(50)', required: true, uiComponent: 'Input', pageLocation: 'DailyPlan' },
      { name: 'topics', type: 'TEXT', uiComponent: 'TextArea', pageLocation: 'DailyPlan' },
      { name: 'studyHours', type: 'INTEGER', required: true, uiComponent: 'Number', pageLocation: 'DailyPlan' },
      { name: 'timeOfStudy', type: 'VARCHAR(50)', uiComponent: 'Select', pageLocation: 'DailyPlan' },
      { name: 'focusLevel', type: 'ENUM("high", "medium", "low")', uiComponent: 'Select', pageLocation: 'DailyPlan' },
      { name: 'status', type: 'ENUM("done", "skipped", "pending")', uiComponent: 'Select', pageLocation: 'DailyPlan' },
      { name: 'studyPlanId', type: 'UUID', required: true, foreignKey: 'StudyPlans.id', uiComponent: 'UUID', pageLocation: 'Any' }
    ]
  },
  {
    name: 'MockTests',
    description: 'Stores mock test information',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'name', type: 'VARCHAR(100)', required: true, uiComponent: 'Input', pageLocation: 'MockTest' },
      { name: 'date', type: 'DATE', required: true, uiComponent: 'Date', pageLocation: 'MockTest' },
      { name: 'syllabus', type: 'TEXT', uiComponent: 'TextArea', pageLocation: 'MockTest' },
      { name: 'duration', type: 'INTEGER', required: true, uiComponent: 'Number', pageLocation: 'MockTest' },
      { name: 'totalQuestions', type: 'INTEGER', required: true, uiComponent: 'Number', pageLocation: 'MockTest' },
      { name: 'studyPlanId', type: 'UUID', required: true, foreignKey: 'StudyPlans.id', uiComponent: 'UUID', pageLocation: 'Any' }
    ]
  },
  {
    name: 'AIRecommendations',
    description: 'Stores AI recommendations for study plans',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'type', type: 'ENUM("focus", "time-allocation", "strategy", "revision")', uiComponent: 'Select', pageLocation: 'AIRecommendation' },
      { name: 'title', type: 'VARCHAR(255)', required: true, uiComponent: 'Input', pageLocation: 'AIRecommendation' },
      { name: 'description', type: 'TEXT', uiComponent: 'TextArea', pageLocation: 'AIRecommendation' },
      { name: 'priority', type: 'ENUM("low", "medium", "high")', uiComponent: 'Select', pageLocation: 'AIRecommendation' },
      { name: 'actionable', type: 'BOOLEAN', required: true, uiComponent: 'Checkbox', pageLocation: 'AIRecommendation' },
      { name: 'studyPlanId', type: 'UUID', required: true, foreignKey: 'StudyPlans.id', uiComponent: 'UUID', pageLocation: 'Any' }
    ]
  },
  {
    name: 'StudyResources',
    description: 'Stores study resources',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'title', type: 'VARCHAR(255)', required: true, uiComponent: 'Input', pageLocation: 'StudyResource' },
      { name: 'type', type: 'ENUM("video", "pdf", "notes", "practice")', uiComponent: 'Select', pageLocation: 'StudyResource' },
      { name: 'subject', type: 'VARCHAR(50)', required: true, uiComponent: 'Input', pageLocation: 'StudyResource' },
      { name: 'topic', type: 'VARCHAR(100)', required: true, uiComponent: 'Input', pageLocation: 'StudyResource' },
      { name: 'url', type: 'VARCHAR(255)', uiComponent: 'Input', pageLocation: 'StudyResource' },
      { name: 'isBookmarked', type: 'BOOLEAN', uiComponent: 'Checkbox', pageLocation: 'StudyResource' },
      { name: 'studyPlanId', type: 'UUID', required: true, foreignKey: 'StudyPlans.id', uiComponent: 'UUID', pageLocation: 'Any' }
    ]
  },
  {
    name: 'DoubtEntries',
    description: 'Stores doubt entries',
    fields: [
      { name: 'id', type: 'UUID', required: true, primaryKey: true, uiComponent: 'UUID', pageLocation: 'Any' },
      { name: 'subject', type: 'VARCHAR(50)', required: true, uiComponent: 'Input', pageLocation: 'DoubtEntry' },
      { name: 'topic', type: 'VARCHAR(100)', required: true, uiComponent: 'Input', pageLocation: 'DoubtEntry' },
      { name: 'question', type: 'TEXT', required: true, uiComponent: 'TextArea', pageLocation: 'DoubtEntry' },
      { name: 'status', type: 'ENUM("open", "resolved")', uiComponent: 'Select', pageLocation: 'DoubtEntry' },
      { name: 'createdAt', type: 'TIMESTAMP', required: true, uiComponent: 'Date', pageLocation: 'DoubtEntry' },
      { name: 'resolvedAt', type: 'TIMESTAMP', uiComponent: 'Date', pageLocation: 'DoubtEntry' },
      { name: 'userId', type: 'UUID', required: true, foreignKey: 'Users.id', uiComponent: 'UUID', pageLocation: 'Any' }
    ]
  }
];

export const downloadDatabaseSchemaCSV = (tableName?: string) => {
  try {
    const tables = tableName ? 
      mockTables.filter(table => table.name.toLowerCase() === tableName.toLowerCase()) : 
      mockTables;
    
    if (tables.length === 0) {
      console.warn('No tables found for export');
      return;
    }

    tables.forEach(table => {
      const csvContent = generateCSVFromTable(table);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${table.name}_schema.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    });
  } catch (error) {
    console.error('Error downloading database schema:', error);
  }
};

const generateCSVFromTable = (table: DatabaseTable): string => {
  const headers = [
    'Field Name',
    'Data Type',
    'Required',
    'Primary Key',
    'Foreign Key',
    'Default Value',
    'UI Component',
    'Page Location',
    'Field ID',
    'Description'
  ];
  
  const rows = table.fields.map(field => [
    field.name,
    field.type,
    field.required ? 'Yes' : 'No',
    field.primaryKey ? 'Yes' : 'No',
    field.foreignKey || '',
    field.defaultValue || '',
    field.uiComponent || '',
    field.pageLocation || '',
    field.fieldId || '',
    field.description || ''
  ]);
  
  const csvRows = [headers, ...rows];
  return csvRows.map(row => 
    row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
  ).join('\n');
};

export const downloadDatabaseSchemaJSON = (tableName?: string) => {
  try {
    const tables = tableName ? 
      mockTables.filter(table => table.name.toLowerCase() === tableName.toLowerCase()) : 
      mockTables;
    
    if (tables.length === 0) {
      console.warn('No tables found for export');
      return;
    }

    const jsonContent = JSON.stringify(tables, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `database_schema${tableName ? `_${tableName}` : ''}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error downloading database schema as JSON:', error);
  }
};

export const downloadDatabaseSchemaSQL = (tableName?: string) => {
  try {
    const tables = tableName ? 
      mockTables.filter(table => table.name.toLowerCase() === tableName.toLowerCase()) : 
      mockTables;
    
    if (tables.length === 0) {
      console.warn('No tables found for export');
      return;
    }

    const sqlContent = generateSQLFromTables(tables);
    const blob = new Blob([sqlContent], { type: 'text/sql;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `database_schema${tableName ? `_${tableName}` : ''}.sql`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error downloading database schema as SQL:', error);
  }
};

const generateSQLFromTables = (tables: DatabaseTable[]): string => {
  return tables.map(table => {
    const fields = table.fields.map(field => {
      let sql = `  ${field.name} ${field.type.toUpperCase()}`;
      if (field.required) sql += ' NOT NULL';
      if (field.primaryKey) sql += ' PRIMARY KEY';
      if (field.defaultValue) sql += ` DEFAULT '${field.defaultValue}'`;
      return sql;
    }).join(',\n');
    
    return `-- Table: ${table.name}\n-- Description: ${table.description}\nCREATE TABLE ${table.name} (\n${fields}\n);\n`;
  }).join('\n');
};

export const getAllDatabaseTables = () => {
  return mockTables;
};

export const getDatabaseTableByName = (tableName: string) => {
  return mockTables.find(table => table.name.toLowerCase() === tableName.toLowerCase());
};
