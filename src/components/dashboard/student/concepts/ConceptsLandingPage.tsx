
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Star, Sparkles, Filter } from "lucide-react";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import ConceptCard from './ConceptCard';

const ConceptsLandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  // Sample concepts data - in a real app, this would come from an API
  const conceptCards = [
    {
      id: "concept-1",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      description: "The three fundamental laws that define the relationship between an object's motion and the forces acting on it.",
      difficulty: "medium" as const,
      timeEstimate: "25 mins",
      isBookmarked: true,
      tags: ["Classical Mechanics", "Dynamics"],
      progress: 80,
      mastery: 65,
      thumbnailUrl: "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png",
    },
    {
      id: "concept-2",
      title: "Periodic Table & Elements",
      subject: "Chemistry",
      description: "Organization and patterns of elements, their properties, and chemical behaviors.",
      difficulty: "easy" as const,
      timeEstimate: "20 mins",
      isBookmarked: false,
      tags: ["Periodic Table", "Elements"],
      progress: 50,
      mastery: 45,
      thumbnailUrl: "/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png",
    },
    {
      id: "concept-3",
      title: "Cell Division & Mitosis",
      subject: "Biology",
      description: "The process by which a single cell divides into two identical daughter cells.",
      difficulty: "hard" as const,
      timeEstimate: "30 mins",
      isBookmarked: true,
      tags: ["Cell Biology", "Reproduction"],
      progress: 30,
      mastery: 25,
      thumbnailUrl: "/lovable-uploads/fdc1cebd-e35f-4f08-a45b-e839964fd590.png",
    },
    {
      id: "concept-4",
      title: "Integration Techniques",
      subject: "Mathematics",
      description: "Methods for calculating integrals, including substitution, parts, and partial fractions.",
      difficulty: "hard" as const,
      timeEstimate: "40 mins",
      isBookmarked: false,
      tags: ["Calculus", "Integration"],
      progress: 20,
      mastery: 15,
      thumbnailUrl: "/lovable-uploads/d5f87c4f-6021-49b2-9e4d-ab83c4cb55c9.png",
    },
    {
      id: "concept-5",
      title: "Electromagnetic Waves",
      subject: "Physics",
      description: "Waves of coupled electric and magnetic fields that propagate through space.",
      difficulty: "hard" as const,
      timeEstimate: "35 mins",
      isBookmarked: false,
      tags: ["Electromagnetism", "Waves"],
      progress: 10,
      mastery: 5,
      thumbnailUrl: "/lovable-uploads/63143d4f-73cd-4fca-a1dd-82e6a5313142.png",
    },
    {
      id: "concept-6",
      title: "Organic Compounds",
      subject: "Chemistry",
      description: "Carbon-containing compounds, their structures, properties, and reactions.",
      difficulty: "medium" as const,
      timeEstimate: "25 mins",
      isBookmarked: false,
      tags: ["Organic Chemistry", "Compounds"],
      progress: 0,
      mastery: 0,
      thumbnailUrl: "/lovable-uploads/d1a1ba73-9bf2-452a-9132-2b32e9c969d5.png",
    },
  ];
  
  // Filtered concepts based on search and active tab
  const filteredConcepts = conceptCards.filter((concept) => {
    const matchesSearch = concept.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         concept.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'bookmarked') return matchesSearch && concept.isBookmarked;
    if (activeTab === 'inProgress') return matchesSearch && concept.progress > 0 && concept.progress < 100;
    if (activeTab === 'completed') return matchesSearch && concept.progress === 100;
    if (activeTab === 'notStarted') return matchesSearch && concept.progress === 0;
    
    return matchesSearch && concept.subject.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts and fundamentals"
    >
      <div className="space-y-6">
        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search concepts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
        
        {/* Tabs for filtering */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
            <TabsTrigger value="mathematics">Math</TabsTrigger>
            <TabsTrigger value="bookmarked">
              <Star className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Concept cards grid */}
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map((concept) => (
                <ConceptCard 
                  key={concept.id}
                  id={concept.id}
                  title={concept.title}
                  description={concept.description}
                  subject={concept.subject}
                  difficulty={concept.difficulty}
                  progress={concept.progress}
                  mastery={concept.mastery}
                  timeEstimate={concept.timeEstimate}
                  tags={concept.tags}
                  isBookmarked={concept.isBookmarked}
                />
              ))}
              
              {filteredConcepts.length === 0 && (
                <div className="col-span-full py-10 text-center">
                  <Sparkles className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No matching concepts found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptsLandingPage;
