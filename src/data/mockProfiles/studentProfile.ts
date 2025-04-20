
const mockStudentProfile = {
  name: "Rahul Sharma",
  email: "rahul.sharma@gmail.com",
  phoneNumber: "+91 9876543210",
  profilePicture: "https://i.pravatar.cc/150?img=11",
  examType: "NEET",
  studyPreferences: {
    preferredStudyTime: "Morning",
    sessionsPerDay: 3,
    preferredLanguage: "English",
  },
  progress: {
    overallCompletion: 45,
    recentTopics: [
      { name: "Organic Chemistry", completion: 60 },
      { name: "Mechanics", completion: 75 },
      { name: "Human Anatomy", completion: 30 }
    ],
    streak: 7,
    lastStudySession: "2023-08-12T14:30:00Z"
  }
};

export default mockStudentProfile;
