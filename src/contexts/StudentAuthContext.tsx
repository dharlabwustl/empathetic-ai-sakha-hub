
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type StudentUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: Record<string, any>;
};

interface StudentAuthContextType {
  studentUser: StudentUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: StudentUser) => void;
  logout: () => void;
}

const StudentAuthContext = React.createContext<StudentAuthContextType | undefined>(undefined);

export function StudentAuthProvider({ children }: { children: React.ReactNode }) {
  const [studentUser, setStudentUser] = React.useState<StudentUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Check for existing auth data
    const authData = localStorage.getItem("student-auth");
    
    if (authData) {
      try {
        const parsedData = JSON.parse(authData);
        setStudentUser(parsedData);
      } catch (error) {
        console.error("Failed to parse student auth data:", error);
        localStorage.removeItem("student-auth");
      }
    }
    
    setLoading(false);
  }, []);

  const login = (user: StudentUser) => {
    setStudentUser(user);
    localStorage.setItem("student-auth", JSON.stringify(user));
    toast({
      title: "Login Successful",
      description: `Welcome back, ${user.name}!`,
    });
  };

  const logout = () => {
    setStudentUser(null);
    localStorage.removeItem("student-auth");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/login");
  };

  const value = {
    studentUser,
    isAuthenticated: !!studentUser,
    loading,
    login,
    logout,
  };

  return (
    <StudentAuthContext.Provider value={value}>
      {children}
    </StudentAuthContext.Provider>
  );
}

export function useStudentAuth() {
  const context = React.useContext(StudentAuthContext);
  if (context === undefined) {
    throw new Error("useStudentAuth must be used within a StudentAuthProvider");
  }
  return context;
}
