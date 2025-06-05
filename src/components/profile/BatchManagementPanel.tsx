
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Crown } from 'lucide-react';

interface BatchManagementPanelProps {
  userProfile: any;
  onCreateBatch: () => void;
  canCreateBatch: boolean;
  isBatchLeader: boolean;
}

export const BatchManagementPanel = ({ 
  userProfile, 
  onCreateBatch, 
  canCreateBatch, 
  isBatchLeader 
}: BatchManagementPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Batch Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {userProfile.batch ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{userProfile.batch.name}</h3>
                <p className="text-gray-600">Your current batch</p>
              </div>
              {isBatchLeader && (
                <Badge variant="default">
                  <Crown className="h-3 w-3 mr-1" />
                  Leader
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">Members:</span>
                <span className="ml-2 text-sm">{userProfile.batch.memberCount || 1}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Created:</span>
                <span className="ml-2 text-sm">
                  {new Date(userProfile.batch.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {isBatchLeader && (
              <Button variant="outline" className="mt-4">
                Manage Batch
              </Button>
            )}
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">You are not part of any batch yet.</p>
            {canCreateBatch ? (
              <Button onClick={onCreateBatch}>
                <Plus className="h-4 w-4 mr-2" />
                Create Batch
              </Button>
            ) : (
              <p className="text-sm text-gray-500">
                Upgrade your subscription to create or join a batch.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
