
// Mock user accounts for authentication - in a real app these would be in a database
export const accountData = {
  students: [
    {
      id: "student1",
      name: "Rahul Sharma",
      email: "student@sakhaai.com",
      password: "student123",
      role: "student",
      phoneNumber: "+91 9876543210",
      profileImage: "/assets/avatars/student.jpg"
    }
  ],
  admins: [
    {
      id: "admin1",
      name: "Admin User",
      email: "admin@sakhaai.com",
      password: "admin123",
      role: "admin",
      permissions: ["all"]
    },
    {
      id: "content_creator1",
      name: "Content Creator",
      email: "content@sakhaai.com",
      password: "content123",
      role: "admin",
      permissions: ["content_management", "content_creation", "content_upload"]
    }
  ]
};

// Function to validate credentials
export const validateCredentials = (email: string, password: string) => {
  // Check student accounts
  const student = accountData.students.find(
    student => student.email === email && student.password === password
  );
  
  if (student) {
    // Create a safe version without password
    const { password, ...safeStudentData } = student;
    return {
      ...safeStudentData,
      token: `student_token_${Date.now()}`
    };
  }
  
  // Check admin accounts
  const admin = accountData.admins.find(
    admin => admin.email === email && admin.password === password
  );
  
  if (admin) {
    // Create a safe version without password
    const { password, ...safeAdminData } = admin;
    return {
      ...safeAdminData,
      token: `admin_token_${Date.now()}`
    };
  }
  
  // No matching user found
  return null;
};
