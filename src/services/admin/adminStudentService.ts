
import { StudentData } from '@/types/admin';

const adminStudentService = {
  getStudents: async (): Promise<StudentData[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'st-1',
            name: 'Rahul Sharma',
            email: 'rahul@example.com',
            phoneNumber: '9876543210',
            examType: 'IIT-JEE',
            registrationDate: '2024-12-15',
            completedOnboarding: true,
            status: 'active'
          },
          {
            id: 'st-2',
            name: 'Priya Patel',
            email: 'priya@example.com',
            phoneNumber: '9876543211',
            examType: 'NEET',
            registrationDate: '2025-01-03',
            completedOnboarding: true,
            status: 'active'
          },
          {
            id: 'st-3',
            name: 'Amit Kumar',
            email: 'amit@example.com',
            phoneNumber: '9876543212',
            examType: 'CAT',
            registrationDate: '2025-02-10',
            completedOnboarding: false,
            status: 'pending'
          }
        ]);
      }, 1000);
    });
  }
};

export default adminStudentService;
