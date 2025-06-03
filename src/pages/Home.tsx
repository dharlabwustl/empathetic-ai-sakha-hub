
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Brain, Target, Users } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {t('home.getStarted')}
            </Button>
            <Button size="lg" variant="outline">
              {t('home.learnMore')}
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">{t('home.features')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600 text-sm">Personalized study plans adapted to your learning style</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">Goal-Oriented</h3>
              <p className="text-gray-600 text-sm">Track progress towards your NEET 2026 goals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold mb-2">Comprehensive Content</h3>
              <p className="text-gray-600 text-sm">Complete Physics, Chemistry, and Biology coverage</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <h3 className="font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">24/7 AI tutor and academic advisor assistance</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
