
import { StudentData } from "@/types/admin/studentData";

// Admin student service for managing student data
class AdminStudentService {
  // Fetch all students (in a real app, this would call an API)
  async getAllStudents(): Promise<StudentData[]> {
    // Mock data - in a real app, this would be fetched from an API
    return [
      {
        id: "1",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        joinDate: "2023-04-10",
        lastActive: "2023-04-18",
        subscriptionTier: "premium",
        studyTime: 120,
        completedLessons: 45,
        targetScore: 85,
        avatarUrl: "/avatars/student1.jpg",
        registrationDate: "2023-04-10",
        examType: "IIT-JEE",
        subjectsSelected: ["Physics", "Chemistry", "Mathematics"],
        engagementScore: 87,
        phoneNumber: "+91 98765 43210",
        completedOnboarding: true,
        goals: ["Crack IIT-JEE", "Improve physics score", "Complete all practice tests"],
        studyHours: 120,
        moodScore: 85,
        status: "active",
        progress: {
          completedTopics: 45,
          totalTopics: 120,
          lastActiveDate: "2023-04-18",
        }
      },
      {
        id: "2",
        name: "Priya Patel",
        email: "priya@example.com",
        joinDate: "2023-03-22",
        lastActive: "2023-04-17",
        subscriptionTier: "elite",
        studyTime: 150,
        completedLessons: 62,
        targetScore: 95,
        avatarUrl: "/avatars/student2.jpg",
        registrationDate: "2023-03-22",
        examType: "NEET",
        subjectsSelected: ["Physics", "Chemistry", "Biology"],
        engagementScore: 92,
        phoneNumber: "+91 87654 32109",
        completedOnboarding: true,
        goals: ["Score 650+ in NEET", "Master organic chemistry", "Complete all mock tests"],
        studyHours: 150,
        moodScore: 90,
        status: "active",
        progress: {
          completedTopics: 62,
          totalTopics: 150,
          lastActiveDate: "2023-04-17",
        }
      },
      {
        id: "3",
        name: "Amit Kumar",
        email: "amit@example.com",
        joinDate: "2023-02-15",
        lastActive: "2023-04-05",
        subscriptionTier: "basic",
        studyTime: 80,
        completedLessons: 30,
        targetScore: 75,
        avatarUrl: "/avatars/student3.jpg",
        registrationDate: "2023-02-15",
        examType: "IIT-JEE",
        subjectsSelected: ["Physics", "Chemistry", "Mathematics"],
        engagementScore: 65,
        phoneNumber: "+91 76543 21098",
        completedOnboarding: true,
        goals: ["Qualify for JEE Mains", "Improve mathematics score"],
        studyHours: 80,
        moodScore: 70,
        status: "inactive",
        progress: {
          completedTopics: 30,
          totalTopics: 120,
          lastActiveDate: "2023-04-05",
        }
      },
    ];
  }

  // Get a student by ID (in a real app, this would call an API)
  async getStudentById(id: string): Promise<StudentData | null> {
    const students = await this.getAllStudents();
    return students.find(student => student.id === id) || null;
  }

  // Update a student (in a real app, this would call an API)
  async updateStudent(id: string, data: Partial<StudentData>): Promise<StudentData> {
    const student = await this.getStudentById(id);
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    
    // In a real app, this would call an API endpoint
    return { ...student, ...data };
  }
}

const adminStudentService = new AdminStudentService();
export default adminStudentService;
