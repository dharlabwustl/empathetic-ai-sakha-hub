
import React from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";

const DoodleTab = () => {
  return (
    <TabsContent value="doodle" className="space-y-4 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-2">Express yourself through doodles</h3>
        <p className="text-sm text-muted-foreground mb-4">Release stress by creating simple drawings or doodles</p>
        
        {/* Doodle canvas would go here */}
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg h-60 flex items-center justify-center">
          <p className="text-muted-foreground">Doodle canvas coming soon</p>
        </div>
        
        {/* Daily Winner Section */}
        <div className="mt-4 border-t pt-4">
          <h4 className="font-medium text-sm mb-2">🏆 Today's Doodle Winner</h4>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white">
              RS
            </div>
            <div>
              <p className="text-sm font-medium">Rahul Singh</p>
              <p className="text-xs text-muted-foreground">Voted Most Creative by the community</p>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default DoodleTab;
