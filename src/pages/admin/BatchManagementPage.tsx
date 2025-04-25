
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BatchManagementPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Batch Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Manage existing student batches</p>
            <div className="border rounded-lg divide-y">
              {[1, 2, 3].map((batch) => (
                <div key={batch} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Batch #{batch}</h3>
                    <p className="text-sm text-gray-500">20 students</p>
                  </div>
                  <button className="text-blue-500 hover:text-blue-700 font-medium">
                    Manage
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Create New Batch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Create a new batch of students</p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Batch Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter batch name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter batch description"
                  rows={3}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              >
                Create Batch
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Batch Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-1">Total Batches</h3>
                <p className="text-3xl font-bold">3</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-1">Total Students</h3>
                <p className="text-3xl font-bold">65</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-1">Average Performance</h3>
                <p className="text-3xl font-bold">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BatchManagementPage;
