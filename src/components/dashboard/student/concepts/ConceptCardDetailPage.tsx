
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useConceptCards } from '@/hooks/useConceptCards';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, File, FileText, MessageSquare, CheckCircle } from 'lucide-react';
import ConceptNotes from './ConceptNotes';
import ConceptQuiz from './ConceptQuiz';
import ConceptDiscussion from './ConceptDiscussion';
import ConceptExamples from './ConceptExamples';
import ConceptBackButton from './ConceptBackButton';

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { getConceptCardById, loading } = useConceptCards();
  const [concept, setConcept] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  useEffect(() => {
    if (conceptId) {
      const fetchConcept = async () => {
        const data = await getConceptCardById(conceptId);
        setConcept(data);
      };
      
      fetchConcept();
    }
  }, [conceptId, getConceptCardById]);
  
  if (loading || !concept) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <ConceptBackButton />
        </div>
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-8 w-1/4 mb-4" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }
  
  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} | ${concept.difficulty} | ${concept.estimatedTime} min`}
      showBackButton={false}
    >
      <div className="mb-4">
        <ConceptBackButton />
      </div>
      
      <div className="mb-6">
        <Card className="p-4 md:p-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center gap-1">
                <FileText className="h-4 w-4" /> Examples
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" /> Practice
              </TabsTrigger>
              <TabsTrigger value="discussion" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" /> Discussion
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Description</h3>
                <p>{concept.description}</p>
                
                {concept.keyPoints && concept.keyPoints.length > 0 && (
                  <>
                    <h3>Key Points</h3>
                    <ul>
                      {concept.keyPoints.map((point: string, idx: number) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                {concept.formulas && concept.formulas.length > 0 && (
                  <>
                    <h3>Formulas</h3>
                    <ul>
                      {concept.formulas.map((formula: any, idx: number) => (
                        <li key={idx}>
                          <strong>{formula.name}:</strong> {formula.expression}
                          {formula.explanation && <p className="text-sm">{formula.explanation}</p>}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                <ConceptNotes conceptId={concept.id} initialNotes={concept.notes || []} />
              </div>
            </TabsContent>
            
            <TabsContent value="examples">
              <ConceptExamples examples={concept.examples || []} />
            </TabsContent>
            
            <TabsContent value="practice">
              <ConceptQuiz conceptId={concept.id} questions={concept.questions || []} />
            </TabsContent>
            
            <TabsContent value="discussion">
              <ConceptDiscussion conceptId={concept.id} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" className="flex items-center gap-2" onClick={() => {}}>
          <File className="h-4 w-4" /> View Related Flashcards
        </Button>
        
        <Button className="bg-gradient-to-r from-blue-600 to-violet-600" onClick={() => {}}>
          Study This Concept
        </Button>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;
