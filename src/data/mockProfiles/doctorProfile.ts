import { UserProfileType, UserRole } from "@/types/user/base";

const doctorProfile: UserProfileType = {
  id: "doctor-1",
  name: "Dr. Emily Carter",
  email: "emily.carter@example.com",
  avatar: "/avatars/doctor1.jpg",
  role: UserRole.Doctor,
  phoneNumber: "+15551234567",
  createdAt: "2022-01-15",
  lastLogin: "2023-04-19",
  onboarded: true,
  loginCount: 25,
  completedOnboarding: true,

  // Make sure status values conform to the allowed types
  goals: [
    {
      id: "goal-1",
      title: "Expand medical knowledge",
      description: "Stay updated with the latest medical research and findings",
      progress: 65,
      status: "in_progress" // Fixed from "in-progress"
    },
    {
      id: "goal-2",
      title: "Patient care improvements",
      description: "Implement new strategies for better patient outcomes",
      progress: 40,
      status: "not_started" // Fixed from "not-started"
    },
    {
      id: "goal-3",
      title: "Publish research paper",
      description: "Contribute to the medical field with original research",
      progress: 15,
      status: "not_started"
    }
  ],
  subscription: {
    id: "sub-doc-1",
    plan: "premium",
    expiresAt: "2024-06-30",
    status: "active"
  },
  // Additional fields specific to doctor profiles
  specialization: "Cardiology",
  yearsOfExperience: 12,
  hospitalName: "City General Hospital",
  licenseNumber: "MD201012345",
  city: "New York",
  state: "NY"
};

export default doctorProfile;
