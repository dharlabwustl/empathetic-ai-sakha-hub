import React from 'react';
import { SubjectProgress } from "@/types/user";

interface SubjectOverviewProps {
  subject: SubjectProgress;
}

const SubjectOverview: React.FC<SubjectOverviewProps> = ({ subject }) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-800 mb-4">{subject.name} Overview</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          <li>
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Overall Progress
                </p>
                <p className="text-sm text-gray-500">
                  {subject.progress}%
                </p>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${subject.progress}%` }}></div>
              </div>
            </div>
          </li>
          <li>
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Last Week Progress
                </p>
                <p className="text-sm text-gray-500">
                  {subject.lastWeekProgress}%
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="px-4 py-5 sm:px-6">
              <p className="text-sm font-medium text-gray-900">
                Topics Covered
              </p>
              <ul className="mt-2 divide-y divide-gray-200">
                {subject.topics.map((topic) => (
                  <li key={topic.id} className="py-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-700">{topic.name}</p>
                      <p className="text-sm text-gray-500">{topic.completed ? 'Completed' : 'In Progress'}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubjectOverview;
