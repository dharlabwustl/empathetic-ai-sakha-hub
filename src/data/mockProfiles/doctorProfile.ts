
import { UserProfileType, UserRole, SubscriptionType } from '@/types/user/base';

export const mockDoctorProfile: UserProfileType = {
  id: "d12345",
  name: "Dr. Priya Patel",
  email: "dr.priya@example.com",
  role: UserRole.Doctor,
  avatar: "/lovable-uploads/e43342b1-bdb8-4aa4-ab51-f2ff046cebfc.png",
  bio: "Cardiologist with 8 years of experience. Passionate about preventive cardiology.",
  phoneNumber: "+91 9876543211",
  personalityType: "practical_applier",
  gender: "female",
  joinDate: "2022-10-05",
  lastActive: "2023-04-19",
  loginCount: 32,
  completedOnboarding: true,
  goals: [
    {
      id: "g1",
      title: "NEET-PG",
      description: "Prepare for super specialization",
      progress: 75,
      status: "in-progress",
      targetDate: new Date("2023-11-30")
    }
  ],
  areasOfInterest: [
    { id: "i1", name: "Cardiology", level: "Expert" },
    { id: "i2", name: "Preventive Medicine", level: "Advanced" },
    { id: "i3", name: "Medical Research", level: "Intermediate" }
  ],
  subscription: SubscriptionType.Premium,
  address: {
    street: "456 Hospital Road",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    country: "India"
  },
  education: {
    level: "Post Graduate",
    institution: "All India Institute of Medical Sciences",
    fieldOfStudy: "Medicine",
    graduationYear: 2015
  }
};

export default mockDoctorProfile;
