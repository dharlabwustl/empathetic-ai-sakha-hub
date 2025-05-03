
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe2, Users } from 'lucide-react';

interface BatchDetailsProps {
  planType: 'individual' | 'group' | 'school' | 'corporate';
  currentUserRole: 'leader' | 'member' | 'school_admin' | 'corporate_admin';
}

const BatchDetails: React.FC<BatchDetailsProps> = ({ planType, currentUserRole }) => {
  // Plan features based on plan type
  const getPlanFeatures = () => {
    switch (planType) {
      case 'group':
        return {
          title: 'Group Plan',
          description: 'Create and manage study groups with your peers',
          maxMembers: 10,
          features: [
            'Up to 10 members per batch',
            'Shared study materials',
            'Group analytics & progress tracking',
            'Batch leader management tools',
            'AI-generated practice tests sharing'
          ]
        };
      case 'school':
        return {
          title: 'School Plan',
          description: 'Perfect for educational institutions',
          maxMembers: 100,
          features: [
            'Up to 100 students per school',
            'Multiple batch creation',
            'Teacher admin controls',
            'School analytics dashboard',
            'Curriculum integration tools',
            'School-wide performance insights'
          ]
        };
      case 'corporate':
        return {
          title: 'Corporate Plan',
          description: 'Ideal for corporate training programs',
          maxMembers: 50,
          features: [
            'Up to 50 employees per organization',
            'Advanced analytics & reporting',
            'Skill-gap analysis',
            'Custom learning paths',
            'Training effectiveness metrics',
            'Integration with HR systems'
          ]
        };
      default:
        return {
          title: 'Individual Plan',
          description: 'Join batches created by others',
          maxMembers: 1,
          features: [
            'Join up to 5 batches',
            'Access shared materials',
            'View batch analytics',
            'Participate in group activities',
            'Join group study sessions'
          ]
        };
    }
  };

  const planFeatures = getPlanFeatures();
  
  // Role-specific capabilities
  const getRoleCapabilities = () => {
    switch (currentUserRole) {
      case 'leader':
        return {
          title: 'Batch Leader',
          capabilities: [
            'Create and manage batches',
            'Invite new members',
            'Remove members',
            'Share study materials',
            'Create group study sessions',
            'Access batch analytics'
          ]
        };
      case 'school_admin':
        return {
          title: 'School Administrator',
          capabilities: [
            'Create and manage multiple batches',
            'Add/remove teachers and students',
            'Monitor school-wide performance',
            'Configure school settings',
            'Generate comprehensive reports',
            'Integrate with school curriculum'
          ]
        };
      case 'corporate_admin':
        return {
          title: 'Corporate Administrator',
          capabilities: [
            'Manage employee learning groups',
            'Track training completion rates',
            'Monitor skill development',
            'Configure learning paths',
            'Generate ROI reports',
            'Integrate with HR systems'
          ]
        };
      default:
        return {
          title: 'Batch Member',
          capabilities: [
            'Join batches via invitation',
            'Access shared study materials',
            'Participate in group activities',
            'Track personal progress within batch',
            'Collaborate with batch members'
          ]
        };
    }
  };

  const roleCapabilities = getRoleCapabilities();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{planFeatures.title}</CardTitle>
            <CardDescription>{planFeatures.description}</CardDescription>
          </div>
          <div className="p-2 bg-primary/10 text-primary rounded-full">
            {planType === 'individual' ? <Globe2 size={20} /> : <Users size={20} />}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-sm mb-2">Plan Features</h3>
          <ul className="space-y-1">
            {planFeatures.features.map((feature, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-2">Your Role: {roleCapabilities.title}</h3>
          <ul className="space-y-1">
            {roleCapabilities.capabilities.map((capability, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {planType !== 'individual' && (
          <div className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>Maximum members:</strong> {planFeatures.maxMembers}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BatchDetails;
