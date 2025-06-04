
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, BookOpen, Target } from 'lucide-react';

const FormulaPracticePage = () => {
  return (
    <SharedPageLayout
      title="Formula Practice"
      subtitle="Master formulas through interactive practice sessions"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Formula Practice Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <BookOpen className="h-8 w-8 mb-2 text-blue-600" />
                  <h3 className="font-semibold mb-2">Physics Formulas</h3>
                  <p className="text-sm text-gray-600 mb-4">Practice mechanics, waves, and thermodynamics formulas</p>
                  <Button className="w-full">Start Practice</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <Target className="h-8 w-8 mb-2 text-green-600" />
                  <h3 className="font-semibold mb-2">Chemistry Formulas</h3>
                  <p className="text-sm text-gray-600 mb-4">Master chemical equations and reaction formulas</p>
                  <Button className="w-full">Start Practice</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <Calculator className="h-8 w-8 mb-2 text-purple-600" />
                  <h3 className="font-semibold mb-2">Mathematics</h3>
                  <p className="text-sm text-gray-600 mb-4">Practice calculus, algebra, and geometry formulas</p>
                  <Button className="w-full">Start Practice</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default FormulaPracticePage;
