
import React from 'react';
import { UserRole } from '@/types/user/base';

const AdminDashboard = () => {
  // Mock student data with proper UserRole enum
  const mockStudents = [
    {
      id: '1',
      name: 'Ravi Kumar',
      email: 'ravi@example.com',
      role: UserRole.Student,
      subscription: { type: 'pro', planType: 'Pro Monthly' },
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      studyStreak: 12,
      totalStudyHours: 45,
      averageScore: 78
    },
    {
      id: '2', 
      name: 'Priya Sharma',
      email: 'priya@example.com',
      role: UserRole.Student,
      subscription: { type: 'free', planType: 'Free' },
      joinDate: '2024-01-10',
      lastActive: '2024-01-19',
      studyStreak: 8,
      totalStudyHours: 32,
      averageScore: 85
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600">Comprehensive admin management system loaded.</p>
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900">Total Students</h3>
            <p className="text-2xl font-bold text-blue-600">{mockStudents.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-900">Active Users</h3>
            <p className="text-2xl font-bold text-green-600">{mockStudents.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-900">Features Available</h3>
            <p className="text-2xl font-bold text-purple-600">40+</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
