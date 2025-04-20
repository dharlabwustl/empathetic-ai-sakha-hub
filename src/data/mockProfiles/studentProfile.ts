
import { UserProfileType, UserRole, SubscriptionType } from '@/types/user/base';

const studentProfile: UserProfileType = {
  id: "s12345",
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  role: UserRole.Student,
  avatar: "/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png",
  bio: "Preparing for JEE. Love physics and math.",
  phoneNumber: "+91 9876543210",
  personalityType: "systematic_learner",
  gender: "male",
  examPreparation: "IIT-JEE",
  joinDate: "2023-01-15",
  lastActive: "2023-04-19",
  loginCount: 45,
  completedOnboarding: true,
  goals: [
    {
      id: "g1",
      title: "IIT-JEE",
      description: "Score 250+ in JEE Mains",
      progress: 65,
      status: "in-progress",
      targetDate: new Date("2023-12-31")
    },
    {
      id: "g2",
      title: "Physics Olympiad",
      description: "Qualify for national level",
      progress: 40,
      status: "in-progress",
      targetDate: new Date("2023-09-30")
    }
  ],
  areasOfInterest: [
    { id: "i1", name: "Physics", level: "Advanced" },
    { id: "i2", name: "Mathematics", level: "Advanced" },
    { id: "i3", name: "Computer Science", level: "Intermediate" }
  ],
  subscription: SubscriptionType.Premium,
  address: {
    street: "123 Main Road",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110001",
    country: "India"
  },
  education: {
    level: "High School", // Changed from educationLevel to level
    institution: "Delhi Public School",
    fieldOfStudy: "Science",
    graduationYear: 2023
  }
};

export default studentProfile;
