
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { BookOpen, ArrowLeft, Check, Share2, Bookmark, ChevronRight, FileText, Lightbulb, ExternalLink, AtomIcon, Beaker, Calculator, Brain, FlaskConical } from 'lucide-react';
import PracticeProblemDrawer from '@/components/dashboard/student/concepts/PracticeProblemDrawer';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// Mock for concept card data
import { conceptCardsData } from '@/data/mock/conceptCardsData';
import MoleculesVisualizer from '@/components/dashboard/student/concepts/MoleculesVisualizer';
import FormulaVisualizer from '@/components/dashboard/student/concepts/FormulaVisualizer';

interface PracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Subtopic {
  id: string;
  title: string;
  content: string;
  examples?: string[];
  questions?: PracticeQuestion[];
}

const ConceptCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isPracticeProblemDrawerOpen, setIsPracticeProblemDrawerOpen] = useState(false);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const { speakMessage, voiceSettings } = useVoiceAnnouncer({});
  
  // Find the concept card data
  const conceptCard = conceptCardsData.find(card => card.id === id);
  
  // If card not found
  if (!conceptCard) {
    return (
      <SharedPageLayout
        title="Concept Not Found"
        subtitle="We couldn't find the concept you're looking for"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Concept Card Not Found</h2>
          <p className="mb-6">The concept card you requested could not be found. It may have been moved or deleted.</p>
          <Button asChild>
            <Link to="/dashboard/student/concepts">Return to Concept Cards</Link>
          </Button>
        </div>
      </SharedPageLayout>
    );
  }
  
  // Handle speaking the content
  const handleSpeakContent = (content: string) => {
    if (voiceSettings.enabled && !voiceSettings.muted) {
      speakMessage(`${conceptCard.title}. ${content}`);
      
      toast({
        title: "Reading Content",
        description: "The concept is being read aloud. Click the voice button again to stop.",
      });
    } else {
      toast({
        title: "Voice Assistant Disabled",
        description: "Please enable the voice assistant from settings to use this feature.",
        variant: "destructive",
      });
    }
  };

  // Handle bookmark
  const handleBookmark = () => {
    toast({
      title: "Concept Bookmarked",
      description: "This concept has been added to your bookmarks.",
    });
  };
  
  // Handle share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "The link to this concept card has been copied to your clipboard.",
    });
  };
  
  // Handle practice problem selection
  const handlePracticeProblemClick = (index: number) => {
    setSelectedProblemIndex(index);
    setIsPracticeProblemDrawerOpen(true);
  };
  
  // Mock data for practice problems
  const practiceProblems: PracticeQuestion[] = [
    {
      id: 1,
      question: "What is the major difference between aldehydes and ketones?",
      options: [
        "Aldehydes have a -CHO group while ketones have a -CO- group",
        "Aldehydes have lower boiling points than ketones",
        "Aldehydes are more reactive towards nucleophilic addition",
        "All of the above"
      ],
      correctAnswer: "All of the above",
      explanation: "Aldehydes have a -CHO group while ketones have a -CO- group. Additionally, aldehydes have lower boiling points than ketones of comparable molecular weight. Aldehydes are also more reactive towards nucleophilic addition reactions because the carbonyl carbon in aldehydes is more electrophilic due to the presence of only one alkyl group compared to two in ketones.",
      difficulty: 'medium'
    },
    {
      id: 2,
      question: "Which of the following is a test for aldehydes but not for ketones?",
      options: [
        "Fehling's test",
        "Brady's reagent test",
        "Iodoform test",
        "None of the above"
      ],
      correctAnswer: "Fehling's test",
      explanation: "Fehling's test is specific for aldehydes. Aldehydes can be oxidized to carboxylic acids and thus give a positive result with Fehling's solution (forming a red precipitate of Cu₂O), while ketones do not react. Brady's reagent tests for both aldehydes and ketones, and the Iodoform test is positive for methyl ketones and acetaldehyde.",
      difficulty: 'medium'
    },
    {
      id: 3,
      question: "Which of the following statements about the carbonyl group is incorrect?",
      options: [
        "The carbonyl carbon has sp² hybridization",
        "The C=O bond has a partial ionic character due to electronegativity differences",
        "The carbonyl group undergoes primarily electrophilic addition reactions",
        "The carbonyl oxygen can act as a nucleophile"
      ],
      correctAnswer: "The carbonyl group undergoes primarily electrophilic addition reactions",
      explanation: "The carbonyl group undergoes primarily nucleophilic addition reactions, not electrophilic addition reactions. The carbonyl carbon has a partial positive charge due to the electronegativity difference with oxygen, making it an electrophile that can be attacked by nucleophiles.",
      difficulty: 'hard'
    },
    {
      id: 4,
      question: "Which reagent can be used to distinguish between acetaldehyde and acetone?",
      options: [
        "2,4-dinitrophenylhydrazine",
        "Tollen's reagent",
        "Sodium hydroxide",
        "Hydrogen cyanide"
      ],
      correctAnswer: "Tollen's reagent",
      explanation: "Tollen's reagent (silver nitrate in ammonia) reacts with aldehydes to form a silver mirror, but does not react with ketones. This is because aldehydes can be oxidized to carboxylic acids, while ketones cannot be oxidized without breaking the carbon chain.",
      difficulty: 'easy'
    },
    {
      id: 5,
      question: "What product is formed when acetaldehyde undergoes aldol condensation?",
      options: [
        "Acetone",
        "Crotonaldehyde",
        "2-hydroxybutanal",
        "Butanal"
      ],
      correctAnswer: "Crotonaldehyde",
      explanation: "When acetaldehyde undergoes aldol condensation, the initial product is 3-hydroxybutanal (aldol), which then undergoes dehydration to form crotonaldehyde (but-2-enal).",
      difficulty: 'hard'
    }
  ];
  
  // Mock subtopics data
  const conceptSubtopics: Subtopic[] = [
    {
      id: 'structure',
      title: 'Structure and Properties',
      content: `Aldehydes and ketones are organic compounds that contain a carbonyl group (C=O). In aldehydes, the carbonyl group is attached to at least one hydrogen atom, with the general formula R-CHO. In ketones, the carbonyl group is bonded to two carbon atoms, with the general formula R-CO-R'.

The carbonyl group consists of a carbon atom double-bonded to an oxygen atom. The carbon exhibits sp² hybridization, and the C=O bond is polar due to oxygen's higher electronegativity. This polarity makes the carbonyl carbon electrophilic (positive) and the oxygen nucleophilic (negative).

Physical properties of aldehydes and ketones include:
1. Lower boiling points than alcohols of similar molecular weight due to lack of hydrogen bonding
2. Higher boiling points than alkanes due to dipole-dipole interactions
3. The smaller molecules are soluble in water due to hydrogen bonding with water
4. Pleasant aromas, especially in larger molecules`,
      examples: [
        'Formaldehyde (HCHO) - the simplest aldehyde, used in preservatives',
        'Acetone (CH₃COCH₃) - the simplest ketone, used as a solvent',
        'Benzaldehyde (C₆H₅CHO) - has an almond-like odor, used in flavorings'
      ]
    },
    {
      id: 'reactivity',
      title: 'Reactivity Patterns',
      content: `The carbonyl group in aldehydes and ketones is highly reactive, especially toward nucleophilic addition reactions. The partial positive charge on the carbon atom makes it susceptible to attack by nucleophiles.

Aldehydes are generally more reactive than ketones because:
1. The alkyl groups in ketones provide steric hindrance
2. Alkyl groups are electron-donating, reducing the electrophilicity of the carbonyl carbon
3. Aldehydes have less steric hindrance with only one R group

Common reactions include:
1. Nucleophilic addition reactions
2. Oxidation and reduction reactions
3. Aldol condensation
4. Formation of hemiacetals and acetals

Aldehydes can be oxidized to carboxylic acids, but ketones require breaking of carbon-carbon bonds for oxidation.`,
      examples: [
        'Addition of HCN forms cyanohydrins',
        'Reaction with alcohols forms hemiacetals and acetals',
        'Reduction with NaBH₄ produces alcohols'
      ]
    },
    {
      id: 'identification',
      title: 'Chemical Tests and Identification',
      content: `Several chemical tests can distinguish between aldehydes and ketones:

1. Tollens' Test (Silver Mirror Test):
   - Aldehydes reduce Tollens' reagent (ammoniacal silver nitrate) to form a silver mirror
   - Ketones do not react

2. Fehling's Test:
   - Aldehydes reduce the blue Fehling's solution to form a red precipitate of Cu₂O
   - Ketones give a negative result

3. Benedict's Test:
   - Similar to Fehling's test, aldehydes form a red precipitate
   - Ketones do not react

4. 2,4-Dinitrophenylhydrazine Test (Brady's Reagent):
   - Both aldehydes and ketones form orange/yellow precipitates
   - Used to confirm the presence of a carbonyl group

5. Iodoform Test:
   - Positive for methyl ketones and acetaldehyde
   - Forms yellow precipitate of iodoform (CHI₃)`,
      examples: [
        'Formaldehyde gives a positive Tollens' test',
        'Acetophenone gives a negative Fehling's test',
        'Acetone gives a positive iodoform test'
      ]
    },
    {
      id: 'applications',
      title: 'Biological and Industrial Importance',
      content: `Aldehydes and ketones have numerous biological and industrial applications:

Biological Importance:
1. Glucose contains an aldehyde group (in its open chain form)
2. Fructose contains a ketone group
3. Pyruvate, a ketone, is a key molecule in cellular metabolism
4. Many hormones contain ketone groups (e.g., steroids)
5. Many flavor and fragrance molecules are aldehydes or ketones

Industrial Applications:
1. Formaldehyde is used in the production of resins and plastics
2. Acetone is a common solvent in laboratories and industries
3. Benzaldehyde is used in perfumery and as a flavoring agent
4. Vanillin (an aldehyde) is the primary component of vanilla flavor
5. Ketones are used as solvents for paints, coatings, and adhesives
6. Many pharmaceutical compounds contain aldehyde or ketone functional groups`,
      examples: [
        'Cinnamaldehyde gives cinnamon its characteristic flavor',
        'Acetophenone is used in perfumery',
        'Camphor (a ketone) is used in medicinal preparations'
      ]
    }
  ];
  
  return (
    <SharedPageLayout
      title={conceptCard.title}
      subtitle={conceptCard.description}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Header section with badges and actions */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300">
              {conceptCard.subject}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-300">
              {conceptCard.chapter}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300">
              Difficulty: {conceptCard.difficulty}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleSpeakContent(conceptCard.content)}>
              <BookOpen className="h-4 w-4 mr-2" />
              Read Aloud
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBookmark}>
              <Bookmark className="h-4 w-4 mr-2" />
              Bookmark
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        {/* Progress section */}
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex-grow">
              <p className="text-sm text-muted-foreground mb-1">Mastery Progress</p>
              <Progress value={conceptCard.progress} className="h-2" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg">{conceptCard.progress}%</span>
              <Badge variant={conceptCard.progress >= 80 ? "default" : "outline"}>
                {conceptCard.progress >= 80 ? (
                  <><Check className="h-3 w-3 mr-1" /> Mastered</>
                ) : (
                  'In Progress'
                )}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        {/* Main content tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visual">Visual Aids</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="notes">My Notes</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 pt-4">
            {/* Main concept explanation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                  Core Concept: {conceptCard.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="mb-4 whitespace-pre-line">{conceptCard.content}</p>
                  
                  <h4 className="text-lg font-medium mb-2">Key Points:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {conceptCard.keyPoints?.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {/* Subtopics accordion */}
            {conceptSubtopics.map((subtopic) => (
              <motion.div
                key={subtopic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {subtopic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">{subtopic.content}</p>
                    
                    {subtopic.examples && subtopic.examples.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-base font-medium mb-2">Examples:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {subtopic.examples.map((example, i) => (
                            <li key={i}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* Related concepts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {conceptCard.relatedConcepts?.map((related, index) => (
                    <Link 
                      key={index} 
                      to={`/dashboard/student/concepts/${related.id}`}
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        {related.subject === 'Chemistry' ? (
                          <Beaker className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        ) : related.subject === 'Physics' ? (
                          <AtomIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        ) : (
                          <Brain className="h-4 w-4 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{related.title}</p>
                        <p className="text-xs text-muted-foreground">{related.subject}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Reference section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">References & Further Reading</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Morrison, R. T., & Boyd, R. N. (2011). Organic Chemistry, 7th Edition. Prentice-Hall.",
                    "Clayden, J., Greeves, N., & Warren, S. (2012). Organic Chemistry, 2nd Edition. Oxford University Press.",
                    "NCERT Chemistry Textbook for Class XII, Chapter 12: Aldehydes, Ketones and Carboxylic Acids"
                  ].map((ref, index) => (
                    <li key={index} className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <span className="text-sm">{ref}</span>
                    </li>
                  ))}
                  
                  {/* Online resources */}
                  <li className="pt-2">
                    <Separator className="mb-2" />
                    <p className="text-sm font-medium mb-2">Online Resources:</p>
                    <div className="space-y-2">
                      {[
                        { title: "Khan Academy: Aldehydes and Ketones", url: "https://www.khanacademy.org/science/organic-chemistry/aldehydes-ketones" },
                        { title: "Royal Society of Chemistry: Carbonyl Compounds", url: "https://edu.rsc.org/functional-groups/carbonyl-compounds/2020177.article" }
                      ].map((resource, i) => (
                        <div key={i} className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2 text-blue-500" />
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {resource.title}
                          </a>
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Visual Aids Tab */}
          <TabsContent value="visual" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Molecular Structures</CardTitle>
              </CardHeader>
              <CardContent>
                <MoleculesVisualizer conceptId={id || ''} type="aldehydes-ketones" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Reaction Mechanisms</CardTitle>
              </CardHeader>
              <CardContent>
                <FormulaVisualizer conceptId={id || ''} mode="reaction" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Properties Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 bg-gray-50 dark:bg-gray-800">Property</th>
                        <th className="text-left p-3 bg-gray-50 dark:bg-gray-800">Aldehydes</th>
                        <th className="text-left p-3 bg-gray-50 dark:bg-gray-800">Ketones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">General Formula</td>
                        <td className="p-3">R-CHO</td>
                        <td className="p-3">R-CO-R'</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Boiling Point</td>
                        <td className="p-3">Lower than comparable ketones</td>
                        <td className="p-3">Higher than comparable aldehydes</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Reactivity</td>
                        <td className="p-3">More reactive</td>
                        <td className="p-3">Less reactive</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Oxidation</td>
                        <td className="p-3">Easily oxidized to carboxylic acids</td>
                        <td className="p-3">Resistant to oxidation</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Fehling's Test</td>
                        <td className="p-3 text-green-600 dark:text-green-400">Positive (red precipitate)</td>
                        <td className="p-3 text-red-600 dark:text-red-400">Negative</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Practice Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {practiceProblems.map((problem, index) => (
                    <div 
                      key={problem.id} 
                      className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors"
                      onClick={() => handlePracticeProblemClick(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Question {index + 1}</h3>
                        <Badge variant={
                          problem.difficulty === 'easy' 
                            ? 'outline' 
                            : problem.difficulty === 'medium' 
                              ? 'secondary' 
                              : 'destructive'
                        }>
                          {problem.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm">{problem.question}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button className="w-full">
                  Take a Full Quiz on {conceptCard.title}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Formulas and equations section */}
            <Card>
              <CardHeader>
                <CardTitle>Key Reactions and Equations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium mb-2">Aldehyde Oxidation</h4>
                    <p className="text-center font-mono p-2 bg-white dark:bg-gray-900 rounded border mb-2">
                      R-CHO + [O] → R-COOH
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Aldehydes are oxidized to carboxylic acids by various oxidizing agents like KMnO₄, K₂Cr₂O₇, etc.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium mb-2">Aldol Condensation</h4>
                    <p className="text-center font-mono p-2 bg-white dark:bg-gray-900 rounded border mb-2">
                      2 CH₃CHO → CH₃CH(OH)CH₂CHO → CH₃CH=CHCHO + H₂O
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Two aldehyde molecules combine in presence of a base to form a β-hydroxy aldehyde, which can dehydrate to form an α,β-unsaturated aldehyde.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium mb-2">Nucleophilic Addition</h4>
                    <p className="text-center font-mono p-2 bg-white dark:bg-gray-900 rounded border mb-2">
                      R₂C=O + H-Z → R₂C(OH)-Z
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Nucleophiles attack the carbonyl carbon to form addition products. Examples include the addition of HCN, NaHSO₃, Grignard reagents, etc.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>My Notes on {conceptCard.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-dashed flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">You haven't created any notes for this concept yet.</p>
                    <Button>Create New Note</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Formula Sheet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div>
                    <h3 className="font-medium">Boiling Point Trend</h3>
                    <p className="text-sm mt-1 font-mono p-2 bg-white dark:bg-gray-900 rounded border text-center">
                      Carboxylic Acids > Alcohols > Aldehydes ≈ Ketones > Ethers > Alkanes
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium">Oxidation of Aldehydes</h3>
                    <p className="text-sm mt-1 font-mono p-2 bg-white dark:bg-gray-900 rounded border text-center">
                      R-CHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → R-COO⁻ + 2Ag + 2NH₃ + 2H₂O
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium">Iodoform Test</h3>
                    <p className="text-sm mt-1 font-mono p-2 bg-white dark:bg-gray-900 rounded border text-center">
                      R-CO-CH₃ + 3I₂ + 4OH⁻ → R-COO⁻ + CHI₃ + 3I⁻ + 3H₂O
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Practice problem drawer */}
        <PracticeProblemDrawer
          isOpen={isPracticeProblemDrawerOpen}
          onClose={() => setIsPracticeProblemDrawerOpen(false)}
          problem={practiceProblems[selectedProblemIndex]}
          problemIndex={selectedProblemIndex}
          totalProblems={practiceProblems.length}
          onNext={() => {
            if (selectedProblemIndex < practiceProblems.length - 1) {
              setSelectedProblemIndex(selectedProblemIndex + 1);
            } else {
              setIsPracticeProblemDrawerOpen(false);
              toast({
                title: "Great job!",
                description: "You've completed all the practice problems for this concept.",
              });
            }
          }}
        />
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetail;
