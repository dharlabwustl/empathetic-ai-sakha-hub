
import { DoctorProfile } from "@/types/user";
import { MoodType } from "@/types/user/base";
import { v4 as uuidv4 } from "uuid";

export const mockDoctorProfile: DoctorProfile = {
  id: "3",
  name: "Dr. Vikram Patel",
  email: "vikram.patel@example.com",
  phoneNumber: "7654321098",
  role: "doctor",
  personalityType: "analytical",
  subscription: "premium",
  joinDate: "2025-01-10",
  lastActive: "2025-05-11",
  areasOfInterest: [
    { id: "i1", name: "Cardiology", level: "Expert" },
    { id: "i2", name: "Medical Research", level: "Advanced" },
    { id: "i3", name: "Patient Care", level: "Expert" }
  ],
  specialization: "Cardiology",
  institution: "AIIMS Delhi",
  research: "Cardiovascular Disease Prevention",
  goals: [
    {
      id: "g1",
      title: "Complete Research Paper",
      description: "Finish cardiovascular disease research paper",
      progress: 80,
      status: "in-progress",
      dueDate: "2025-06-15"
    },
    {
      id: "g2",
      title: "Attend Medical Conference",
      description: "Prepare presentation for international cardiology conference",
      progress: 55,
      status: "in-progress",
      dueDate: "2025-07-30"
    }
  ],
  currentMood: "focused" as MoodType
};
