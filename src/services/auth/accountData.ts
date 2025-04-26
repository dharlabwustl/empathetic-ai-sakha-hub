
import { AuthUser } from "./authService";

// Mock user database for demonstration purposes
const mockUsers = [
  {
    email: "student@example.com",
    password: "password123",
    role: "student",
    name: "Student User",
    id: "user_student_1"
  },
  {
    email: "admin@sakha.ai",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    id: "user_admin_1",
    permissions: ["all"]
  },
  {
    email: "content@sakha.ai",
    password: "content123",
    role: "admin",
    name: "Content Manager",
    id: "user_admin_2",
    permissions: ["manage_content", "view_dashboard"]
  },
  {
    email: "uploader@sakha.ai",
    password: "uploader123",
    role: "admin",
    name: "Content Uploader",
    id: "user_admin_3",
    permissions: ["upload_content"]
  }
];

// Validate user credentials
export function validateCredentials(email: string, password: string): AuthUser | null {
  // Find user by email and password
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  
  if (!user) {
    return null;
  }
  
  // Create and return the authenticated user object
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    token: `mock_token_${Date.now()}_${user.id}`
  };
}

export function getUserByEmail(email: string): Omit<AuthUser, 'token'> | null {
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return null;
  }
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions
  };
}
