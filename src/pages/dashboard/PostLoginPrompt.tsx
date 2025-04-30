
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight, LayoutDashboard, History } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const PostLoginPrompt = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lastPage = searchParams.get('returnTo') || '/dashboard/student/today';
  
  const goToDashboard = () => {
    navigate('/dashboard/student');
  };
  
  const goToLastPage = () => {
    const lastPagePath = lastPage === 'lastPage' 
      ? localStorage.getItem('lastVisitedPage') || '/dashboard/student/today'
      : lastPage;
    navigate(lastPagePath);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <PrepzrLogo width={60} height={60} />
          </div>
          <CardTitle className="text-xl font-bold">Welcome back to PREPZR</CardTitle>
          <CardDescription>Where would you like to go?</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 pt-4">
          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-auto py-4 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={goToDashboard}
          >
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mr-4">
                <LayoutDashboard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Dashboard</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Go to your main dashboard overview
                </p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto text-blue-600 dark:text-blue-400" />
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-auto py-4 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            onClick={goToLastPage}
          >
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full mr-4">
                <History className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">Resume Where You Left Off</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Continue from your last activity
                </p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto text-purple-600 dark:text-purple-400" />
            </div>
          </Button>
        </CardContent>
        
        <CardFooter className="flex justify-center pt-2 pb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} PREPZR. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostLoginPrompt;
