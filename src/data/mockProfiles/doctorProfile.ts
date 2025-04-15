
import { UserRole } from "@/types/user";
import { DoctorProfile } from "@/types/user/professional";

export const mockDoctorProfile: DoctorProfile = {
  id: "3",
  name: "Dr. Priya Sharma",
  phoneNumber: "9876543212",
  email: "priya.sharma@hospital.com",
  role: "doctor" as UserRole,
  personalityType: "Analytical Problem Solver",
  subscription: "Premium",
  joinDate: "2025-01-15",
  lastActive: "2025-05-11",
  areasOfInterest: [
    { id: "i1", name: "Cardiology", level: "Advanced" },
    { id: "i2", name: "Medical Research", level: "Intermediate" },
    { id: "i3", name: "Patient Care", level: "Advanced" }
  ],
  goals: [
    {
      id: "g1",
      title: "Complete Research Paper",
      description: "Finish cardiovascular research paper",
      progress: 85,
      dueDate: "2025-06-15"
    },
    {
      id: "g2",
      title: "Prepare for Medical Conference",
      description: "Create presentation for international conference",
      progress: 40,
      dueDate: "2025-07-10"
    }
  ],
  specialization: "Cardiology",
  institution: "Apollo Hospitals",
  patientsHelped: 5000,
  yearsOfExperience: 12,
  publications: 15,
  certifications: ["MBBS", "MD", "Fellowship in Interventional Cardiology"]
};
