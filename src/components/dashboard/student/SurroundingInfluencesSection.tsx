<lov-code>
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, CheckCircle2, Flame, Hotel, Lamp, Moon, Music2, Pizza, Smile, Speaker, Sun, Utensils } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn as className } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { isDate } from 'date-fns';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [activeData, setActiveData] = useState({
    sleepRoutine: [{ value: 70, label: "Good" }],
    studyEnvironment: [{ value: 80, label: "Excellent" }],
    nutrition: [{ value: 60, label: "Okay" }],
    stressLevels: [{ value: 40, label: "Low" }],
    socialInteractions: [{ value: 90, label: "High" }],
    screenTime: [{ value: 50, label: "Moderate" }],
    physicalActivity: [{ value: 75, label: "Active" }],
    musicExposure: [{ value: 65, label: "Average" }],
    noisePollution: [{ value: 35, label: "Low" }],
    hydrationLevels: [{ value: 85, label: "Optimal" }],
    lightExposure: [{ value: 55, label: "Balanced" }],
    ergonomics: [{ value: 45, label: "Poor" }],
    digitalDistractions: [{ value: 95, label: "Minimal" }],
    mindfulnessPractices: [{ value: 25, label: "Rare" }],
    studyBreaks: [{ value: 60, label: "Regular" }],
    learningResources: [{ value: 70, label: "Good" }],
    timeManagement: [{ value: 80, label: "Efficient" }],
    goalSetting: [{ value: 90, label: "Clear" }],
    feedbackMechanisms: [{ value: 50, label: "Average" }],
    positiveAffirmations: [{ value: 30, label: "Occasional" }],
    peerInteractions: [{ value: 75, label: "Supportive" }],
    familySupport: [{ value: 85, label: "Strong" }],
    mentorGuidance: [{ value: 65, label: "Available" }],
    culturalInfluences: [{ value: 40, label: "Moderate" }],
    financialStability: [{ value: 95, label: "Secure" }],
    accessToTechnology: [{ value: 25, label: "Limited" }],
    communityInvolvement: [{ value: 60, label: "Active" }],
    environmentalFactors: [{ value: 70, label: "Favorable" }],
    personalInterests: [{ value: 80, label: "Engaging" }],
    emotionalWellbeing: [{ value: 90, label: "Positive" }],
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(50);
  const [editLabel, setEditLabel] = useState<string>("");
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<{ category: string; text: string }[]>([]);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalDeadline, setGoalDeadline] = useState<Date | null>(null);
  const [goals, setGoals] = useState<{ title: string; description: string; deadline: Date | null }[]>([]);
  const [isAddReflectionModalOpen, setIsAddReflectionModalOpen] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [reflections, setReflections] = useState<{ category: string; text: string }[]>([]);
  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);
  const [habitTitle, setHabitTitle] = useState("");
  const [habitFrequency, setHabitFrequency] = useState<string>("daily");
  const [habits, setHabits] = useState<{ title: string; frequency: string }[]>([]);
  const [isAddGratitudeModalOpen, setIsAddGratitudeModalOpen] = useState(false);
  const [gratitudeText, setGratitudeText] = useState("");
  const [gratitudes, setGratitudes] = useState<string[]>([]);
  const [isAddAffirmationModalOpen, setIsAddAffirmationModalOpen] = useState(false);
  const [affirmationText, setAffirmationText] = useState("");
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [isAddChallengeModalOpen, setIsAddChallengeModalOpen] = useState(false);
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [challenges, setChallenges] = useState<{ title: string; description: string }[]>([]);
  const [isAddRewardModalOpen, setIsAddRewardModalOpen] = useState(false);
  const [rewardTitle, setRewardTitle] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [rewards, setRewards] = useState<{ title: string; description: string }[]>([]);
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [resources, setResources] = useState<{ title: string; link: string }[]>([]);
  const [isAddSupportModalOpen, setIsAddSupportModalOpen] = useState(false);
  const [supportTitle, setSupportTitle] = useState("");
  const [supportContact, setSupportContact] = useState("");
  const [supportResources, setSupportResources] = useState<{ title: string; contact: string }[]>([]);
  const [isAddStrategyModalOpen, setIsAddStrategyModalOpen] = useState(false);
  const [strategyTitle, setStrategyTitle] = useState("");
  const [strategyDescription, setStrategyDescription] = useState("");
  const [strategies, setStrategies] = useState<{ title: string; description: string }[]>([]);
  const [isAddInsightModalOpen, setIsAddInsightModalOpen] = useState(false);
  const [insightTitle, setInsightTitle] = useState("");
  const [insightDescription, setInsightDescription] = useState("");
  const [insights, setInsights] = useState<{ title: string; description: string }[]>([]);
  const [isAddExperimentModalOpen, setIsAddExperimentModalOpen] = useState(false);
  const [experimentTitle, setExperimentTitle] = useState("");
  const [experimentDescription, setExperimentDescription] = useState("");
  const [experiments, setExperiments] = useState<{ title: string; description: string }[]>([]);
  const [isAddObservationModalOpen, setIsAddObservationModalOpen] = useState(false);
  const [observationTitle, setObservationTitle] = useState("");
  const [observationDescription, setObservationDescription] = useState("");
  const [observations, setObservations] = useState<{ title: string; description: string }[]>([]);
  const [isAddActionModalOpen, setIsAddActionModalOpen] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [actionDescription, setActionDescription] = useState("");
  const [actions, setActions] = useState<{ title: string; description: string }[]>([]);
  const [isAddReflectionPointModalOpen, setIsAddReflectionPointModalOpen] = useState(false);
  const [reflectionPointTitle, setReflectionPointTitle] = useState("");
  const [reflectionPointDescription, setReflectionPointDescription] = useState("");
  const [reflectionPoints, setReflectionPoints] = useState<{ title: string; description: string }[]>([]);
  const [isAddLearningModalOpen, setIsAddLearningModalOpen] = useState(false);
  const [learningTitle, setLearningTitle] = useState("");
  const [learningDescription, setLearningDescription] = useState("");
  const [learnings, setLearnings] = useState<{ title: string; description: string }[]>([]);
  const [isAddProgressModalOpen, setIsAddProgressModalOpen] = useState(false);
  const [progressTitle, setProgressTitle] = useState("");
  const [progressDescription, setProgressDescription] = useState("");
  const [progressUpdates, setProgressUpdates] = useState<{ title: string; description: string }[]>([]);
  const [isAddInsightfulQuestionModalOpen, setIsAddInsightfulQuestionModalOpen] = useState(false);
  const [insightfulQuestionTitle, setInsightfulQuestionTitle] = useState("");
  const [insightfulQuestionDescription, setInsightfulQuestionDescription] = useState("");
  const [insightfulQuestions, setInsightfulQuestions] = useState<{ title: string; description: string }[]>([]);
  const [isAddSuccessModalOpen, setIsAddSuccessModalOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successDescription, setSuccessDescription] = useState("");
  const [successStories, setSuccessStories] = useState<{ title: string; description: string }[]>([]);
  const [isAddChallengeFacedModalOpen, setIsAddChallengeFacedModalOpen] = useState(false);
  const [challengeFacedTitle, setChallengeFacedTitle] = useState("");
  const [challengeFacedDescription, setChallengeFacedDescription] = useState("");
  const [challengesFaced, setChallengesFaced] = useState<{ title: string; description: string }[]>([]);
  const [isAddSolutionModalOpen, setIsAddSolutionModalOpen] = useState(false);
  const [solutionTitle, setSolutionTitle] = useState("");
  const [solutionDescription, setSolutionDescription] = useState("");
  const [solutions, setSolutions] = useState<{ title: string; description: string }[]>([]);
  const [isAddLessonLearnedModalOpen, setIsAddLessonLearnedModalOpen] = useState(false);
  const [lessonLearnedTitle, setLessonLearnedTitle] = useState("");
  const [lessonLearnedDescription, setLessonLearnedDescription] = useState("");
  const [lessonsLearned, setLessonsLearned] = useState<{ title: string; description: string }[]>([]);
  const [isAddOpportunityModalOpen, setIsAddOpportunityModalOpen] = useState(false);
  const [opportunityTitle, setOpportunityTitle] = useState("");
  const [opportunityDescription, setOpportunityDescription] = useState("");
  const [opportunities, setOpportunities] = useState<{ title: string; description: string }[]>([]);
  const [isAddResourceUsedModalOpen, setIsAddResourceUsedModalOpen] = useState(false);
  const [resourceUsedTitle, setResourceUsedTitle] = useState("");
  const [resourceUsedDescription, setResourceUsedDescription] = useState("");
  const [resourcesUsed, setResourcesUsed] = useState<{ title: string; description: string }[]>([]);
  const [isAddStrategyUsedModalOpen, setIsAddStrategyUsedModalOpen] = useState(false);
  const [strategyUsedTitle, setStrategyUsedTitle] = useState("");
  const [strategyUsedDescription, setStrategyUsedDescription] = useState("");
  const [strategiesUsed, setStrategiesUsed] = useState<{ title: string; description: string }[]>([]);
  const [isAddToolUsedModalOpen, setIsAddToolUsedModalOpen] = useState(false);
  const [toolUsedTitle, setToolUsedTitle] = useState("");
  const [toolUsedDescription, setToolUsedDescription] = useState("");
  const [toolsUsed, setToolsUsed] = useState<{ title: string; description: string }[]>([]);
  const [isAddSkillDevelopedModalOpen, setIsAddSkillDevelopedModalOpen] = useState(false);
  const [skillDevelopedTitle, setSkillDevelopedTitle] = useState("");
  const [skillDevelopedDescription, setSkillDevelopedDescription] = useState("");
  const [skillsDeveloped, setSkillsDeveloped] = useState<{ title: string; description: string }[]>([]);
  const [isAddAreaImprovedModalOpen, setIsAddAreaImprovedModalOpen] = useState(false);
  const [areaImprovedTitle, setAreaImprovedTitle] = useState("");
  const [areaImprovedDescription, setAreaImprovedDescription] = useState("");
  const [areasImproved, setAreasImproved] = useState<{ title: string; description: string }[]>([]);
  const [isAddAreaToImproveModalOpen, setIsAddAreaToImproveModalOpen] = useState(false);
  const [areaToImproveTitle, setAreaToImproveTitle] = useState("");
  const [areaToImproveDescription, setAreaToImproveDescription] = useState("");
  const [areasToImprove, setAreasToImprove] = useState<{ title: string; description: string }[]>([]);
  const [isAddActionTakenModalOpen, setIsAddActionTakenModalOpen] = useState(false);
  const [actionTakenTitle, setActionTakenTitle] = useState("");
  const [actionTakenDescription, setActionTakenDescription] = useState("");
  const [actionsTaken, setActionsTaken] = useState<{ title: string; description: string }[]>([]);
  const [isAddResultAchievedModalOpen, setIsAddResultAchievedModalOpen] = useState(false);
  const [resultAchievedTitle, setResultAchievedTitle] = useState("");
  const [resultAchievedDescription, setResultAchievedDescription] = useState("");
  const [resultsAchieved, setResultsAchieved] = useState<{ title: string; description: string }[]>([]);
  const [isAddNextStepModalOpen, setIsAddNextStepModalOpen] = useState(false);
  const [nextStepTitle, setNextStepTitle] = useState("");
  const [nextStepDescription, setNextStepDescription] = useState("");
  const [nextSteps, setNextSteps] = useState<{ title: string; description: string }[]>([]);
  const [isAddResourceNeededModalOpen, setIsAddResourceNeededModalOpen] = useState(false);
  const [resourceNeededTitle, setResourceNeededTitle] = useState("");
  const [resourceNeededDescription, setResourceNeededDescription] = useState("");
  const [resourcesNeeded, setResourcesNeeded] = useState<{ title: string; description: string }[]>([]);
  const [isAddSupportNeededModalOpen, setIsAddSupportNeededModalOpen] = useState(false);
  const [supportNeededTitle, setSupportNeededTitle] = useState("");
  const [supportNeededDescription, setSupportNeededDescription] = useState("");
  const [supportsNeeded, setSupportsNeeded] = useState<{ title: string; description: string }[]>([]);
  const [isAddStrategyToUseModalOpen, setIsAddStrategyToUseModalOpen] = useState(false);
  const [strategyToUseTitle, setStrategyToUseTitle] = useState("");
  const [strategyToUseDescription, setStrategyToUseDescription] = useState("");
  const [strategiesToUse, setStrategiesToUse] = useState<{ title: string; description: string }[]>([]);
  const [isAddToolToUseModalOpen, setIsAddToolToUseModalOpen] = useState(false);
  const [toolToUseTitle, setToolToUseTitle] = useState("");
  const [toolToUseDescription, setToolToUseDescription] = useState("");
  const [toolsToUse, setToolsToUse] = useState<{ title: string; description: string }[]>([]);
  const [isAddSkillToDevelopModalOpen, setIsAddSkillToDevelopModalOpen] = useState(false);
  const [skillToDevelopTitle, setSkillToDevelopTitle] = useState("");
  const [skillToDevelopDescription, setSkillToDevelopDescription] = useState("");
  const [skillsToDevelop, setSkillsToDevelop] = useState<{ title: string; description: string }[]>([]);
  const [isAddAreaToFocusOnModalOpen, setIsAddAreaToFocusOnModalOpen] = useState(false);
  const [areaToFocusOnTitle, setAreaToFocusOnTitle] = useState("");
  const [areaToFocusOnDescription, setAreaToFocusOnDescription] = useState("");
  const [areasToFocusOn, setAreasToFocusOn] = useState<{ title: string; description: string }[]>([]);
  const [isAddChallengeToOvercomeModalOpen, setIsAddChallengeToOvercomeModalOpen] = useState(false);
  const [challengeToOvercomeTitle, setChallengeToOvercomeTitle] = useState("");
  const [challengeToOvercomeDescription, setChallengeToOvercomeDescription] = useState("");
  const [challengesToOvercome, setChallengesToOvercome] = useState<{ title: string; description: string }[]>([]);
  const [isAddOpportunityToPursueModalOpen, setIsAddOpportunityToPursueModalOpen] = useState(false);
  const [opportunityToPursueTitle, setOpportunityToPursueTitle] = useState("");
  const [opportunityToPursueDescription, setOpportunityToPursueDescription] = useState("");
  const [opportunitiesToPursue, setOpportunitiesToPursue] = useState<{ title: string; description: string }[]>([]);
  const [isAddGoalToAchieveModalOpen, setIsAddGoalToAchieveModalOpen] = useState(false);
  const [goalToAchieveTitle, setGoalToAchieveTitle] = useState("");
  const [goalToAchieveDescription, setGoalToAchieveDescription] = useState("");
  const [goalsToAchieve, setGoalsToAchieve] = useState<{ title: string; description: string }[]>([]);
  const [isAddHabitToDevelopModalOpen, setIsAddHabitToDevelopModalOpen] = useState(false);
  const [habitToDevelopTitle, setHabitToDevelopTitle] = useState("");
  const [habitToDevelopDescription, setHabitToDevelopDescription] = useState("");
  const [habitsToDevelop, setHabitsToDevelop] = useState<{ title: string; description: string }[]>([]);
  const [isAddMindsetToCultivateModalOpen, setIsAddMindsetToCultivateModalOpen] = useState(false);
  const [mindsetToCultivateTitle, setMindsetToCultivateTitle] = useState("");
  const [mindsetToCultivateDescription, setMindsetToCultivateDescription] = useState("");
  const [mindsetsToCultivate, setMindsetsToCultivate] = useState<{ title: string; description: string }[]>([]);
  const [isAddBeliefToAdoptModalOpen, setIsAddBeliefToAdoptModalOpen] = useState(false);
  const [beliefToAdoptTitle, setBeliefToAdoptTitle] = useState("");
  const [beliefToAdoptDescription, setBeliefToAdoptDescription] = useState("");
  const [beliefsToAdopt, setBeliefsToAdopt] = useState<{ title: string; description: string }[]>([]);
  const [isAddValueToEmbraceModalOpen, setIsAddValueToEmbraceModalOpen] = useState(false);
  const [valueToEmbraceTitle, setValueToEmbraceTitle] = useState("");
  const [valueToEmbraceDescription, setValueToEmbraceDescription] = useState("");
  const [valuesToEmbrace, setValuesToEmbrace] = useState<{ title: string; description: string }[]>([]);
  const [isAddAttitudeToDevelopModalOpen, setIsAddAttitudeToDevelopModalOpen] = useState(false);
  const [attitudeToDevelopTitle, setAttitudeToDevelopTitle] = useState("");
  const [attitudeToDevelopDescription, setAttitudeToDevelopDescription] = useState("");
  const [attitudesToDevelop, setAttitudesToDevelop] = useState<{ title: string; description: string }[]>([]);
  const [isAddPerspectiveToConsiderModalOpen, setIsAddPerspectiveToConsiderModalOpen] = useState(false);
  const [perspectiveToConsiderTitle, setPerspectiveToConsiderTitle] = useState("");
  const [perspectiveToConsiderDescription, setPerspectiveToConsiderDescription] = useState("");
  const [perspectivesToConsider, setPerspectivesToConsider] = useState<{ title: string; description: string }[]>([]);
  const [isAddRelationshipToNurtureModalOpen, setIsAddRelationshipToNurtureModalOpen] = useState(false);
  const [relationshipToNurtureTitle, setRelationshipToNurtureTitle] = useState("");
  const [relationshipToNurtureDescription, setRelationshipToNurtureDescription] = useState("");
  const [relationshipsToNurture, setRelationshipsToNurture] = useState<{ title: string; description: string }[]>([]);
  const [isAddEnvironmentToCreateModalOpen, setIsAddEnvironmentToCreateModalOpen] = useState(false);
  const [environmentToCreateTitle, setEnvironmentToCreateTitle] = useState("");
  const [environmentToCreateDescription, setEnvironmentToCreateDescription] = useState("");
  const [environmentsToCreate, setEnvironmentsToCreate] = useState<{ title: string; description: string }[]>([]);
  const [isAddSystemToImplementModalOpen, setIsAddSystemToImplementModalOpen] = useState(false);
  const [systemToImplementTitle, setSystemToImplementTitle] = useState("");
  const [systemToImplementDescription, setSystemToImplementDescription] = useState("");
  const [systemsToImplement, setSystemsToImplement] = useState<{ title: string; description: string }[]>([]);
  const [isAddRoutineToEstablishModalOpen, setIsAddRoutineToEstablishModalOpen] = useState(false);
  const [routineToEstablishTitle, setRoutineToEstablishTitle] = useState("");
  const [routineToEstablishDescription, setRoutineToEstablishDescription] = useState("");
  const [routinesToEstablish, setRoutinesToEstablish] = useState<{ title: string; description: string }[]>([]);
  const [isAddPracticeToIncorporateModalOpen, setIsAddPracticeToIncorporateModalOpen] = useState(false);
  const [practiceToIncorporateTitle, setPracticeToIncorporateTitle] = useState("");
  const [practiceToIncorporateDescription, setPracticeToIncorporateDescription] = useState("");
  const [practicesToIncorporate, setPracticesToIncorporate] = useState<{ title: string; description: string }[]>([]);
  const [isAddSkillToMasterModalOpen, setIsAddSkillToMasterModalOpen] = useState(false);
  const [skillToMasterTitle, setSkillToMasterTitle] = useState("");
  const [skillToMasterDescription, setSkillToMasterDescription] = useState("");
  const [skillsToMaster, setSkillsToMaster] = useState<{ title: string; description: string }[]>([]);
  const [isAddAreaToExploreModalOpen, setIsAddAreaToExploreModalOpen] = useState(false);
  const [areaToExploreTitle, setAreaToExploreTitle] = useState("");
  const [areaToExploreDescription, setAreaToExploreDescription] = useState("");
  const [areasToExplore, setAreasToExplore] = useState<{ title: string; description: string }[]>([]);
  const [isAddResourceToUtilizeModalOpen, setIsAddResourceToUtilizeModalOpen] = useState(false);
  const [resourceToUtilizeTitle, setResourceToUtilizeTitle] = useState("");
  const [resourceToUtilizeDescription, setResourceToUtilizeDescription] = useState("");
  const [resourcesToUtilize, setResourcesToUtilize] = useState<{ title: string; description: string }[]>([]);
  const [isAddSupportToSeekModalOpen, setIsAddSupportToSeekModalOpen] = useState(false);
  const [supportToSeekTitle, setSupportToSeekTitle] = useState("");
  const [supportToSeekDescription, setSupportToSeekDescription] = useState("");
  const [supportsToSeek, setSupportsToSeek] = useState<{ title: string; description: string }[]>([]);
  const [isAddStrategyToApplyModalOpen, setIsAddStrategyToApplyModalOpen] = useState(false);
  const [strategyToApplyTitle, setStrategyToApplyTitle] = useState("");
  const [strategyToApplyDescription, setStrategyToApplyDescription] = useState("");
  const [strategiesToApply, setStrategiesToApply] = useState<{ title: string; description: string }[]>([]);
  const [isAddToolToEmployModalOpen, setIsAddToolToEmployModalOpen] = useState(false);
  const [toolToEmployTitle, setToolToEmployTitle] = useState("");
  const [toolToEmployDescription, setToolToEmployDescription] = useState("");
  const [toolsToEmploy, setToolsToEmploy] = useState<{ title: string; description: string }[]>([]);
  const [isAddSkillToHoneModalOpen, setIsAddSkillToHoneModalOpen] = useState(false);
  const [skillToHoneTitle, setSkillToHoneTitle] = useState("");
  const [skillToHoneDescription, setSkillToHoneDescription] = useState("");
  const [skillsToHone, setSkillsToHone] = useState<{ title: string; description: string }[]>([]);
  const [isAddAreaToRefineModalOpen, setIsAddAreaToRefineModalOpen] = useState(false);
  const [areaToRefineTitle, setAreaToRefineTitle] = useState("");
  const [areaToRefineDescription, setAreaToRefineDescription] = useState("");
  const [areasToRefine, setAreasToRefine] = useState<{ title: string; description: string }[]>([]);
  const [isAddChallengeToAddressModalOpen, setIsAddChallengeToAddressModalOpen] = useState(false);
  const [challengeToAddressTitle, setChallengeToAddressTitle] = useState("");
  const [challengeToAddressDescription, setChallengeToAddressDescription] = useState("");
  const [challengesToAddress, setChallengesToAddress] = useState<{ title: string; description: string }[]>([]);
  const [isAddOpportunityToSeizeModalOpen, setIsAddOpportunityToSeizeModalOpen] = useState(false);
  const [opportunityToSeizeTitle, setOpportunityToSeizeTitle] = useState("");
  const [opportunityToSeizeDescription, setOpportunityToSeizeDescription] = useState("");
  const [opportunitiesToSeize, setOpportunitiesToSeize] = useState<{ title: string; description: string }[]>([]);
  const [isAddGoalToPursueModalOpen, setIsAddGoalToPursueModalOpen] = useState(false);
  const [goalToPursueTitle, setGoalToPursueTitle] = useState("");
  const [goalToPursueDescription, setGoalToPursueDescription] = useState("");
  const [goalsToPursue, setGoalsToPursue] = useState<{ title: string; description: string }[]>([]);
  const [isAddHabitToEstablishModalOpen, setIsAddHabitToEstablishModalOpen] = useState(false);
  const [habitToEstablishTitle, setHabitToEstablishTitle] = useState("");
  const [habitToEstablishDescription, setHabitToEstablishDescription] = useState("");
  const [habitsToEstablish, setHabitsToEstablish] = useState<{ title: string; description: string }[]>([]);
  const [isAddMindsetToDevelopModalOpen, setIsAddMindsetToDevelopModalOpen] = useState(false);
  const [mindsetToDevelopTitle, setMindsetToDevelopTitle] = useState("");
  const [mindsetToDevelopDescription, setMindsetToDevelopDescription] = useState("");
  const [mindsetsToDevelop, setMindsetsToDevelop] = useState<{ title: string; description: string }[]>([]);
  const [isAddBeliefToCultivateModalOpen, setIsAddBeliefToCultivateModalOpen] = useState(false);
  const [beliefToCultivateTitle, setBeliefToCultivateTitle] = useState("");
  const [beliefToCultivateDescription, setBeliefToCultivateDescription] = useState("");
  const [beliefsToCultivate, setBeliefsToCultivate] = useState<{ title: string; description: string }[]>([]);
  const [isAddValueToUpholdModalOpen, setIsAddValueToUpholdModalOpen] = useState(false);
  const [valueToUpholdTitle, setValueToUpholdTitle] = useState("");
  const [valueToUpholdDescription, setValueToUpholdDescription] = useState("");
  const [valuesToUphold, setValuesToUphold] = useState<{ title: string; description: string }[]>([]);
  const [isAddAttitudeToEmbraceModalOpen, setIsAddAttitudeToEmbraceModalOpen] = useState(false);
  const [attitudeToEmbraceTitle, setAttitudeToEmbraceTitle] = useState("");
  const [attitudeToEmbraceDescription, setAttitudeToEmbraceDescription] = useState("");
  const [attitudesToEmbrace, setAttitudesToEmbrace] = useState<{ title: string; description: string }[]>([]);
  const [isAddPerspectiveToAdoptModalOpen, setIsAddPerspectiveToAdoptModalOpen] = useState(false);
  const [perspectiveToAdoptTitle, setPerspectiveToAdoptTitle] = useState("");
  const [perspectiveToAdoptDescription, setPerspectiveToAdoptDescription] = useState("");
  const [perspectivesToAdopt, setPerspectivesToAdopt] = useState<{ title: string; description: string }[]>([]);
  const [isAddRelationshipToStrengthenModalOpen, setIsAddRelationshipToStrengthenModalOpen] = useState(false);
  const [relationshipToStrengthenTitle, setRelationshipToStrengthenTitle] = useState("");
  const [relationshipToStrengthenDescription, setRelationshipToStrengthenDescription] = useState("");
  const [relationshipsToStrengthen, setRelationshipsToStrengthen] = useState<{ title: string; description: string }[]>([]);
  const [isAddEnvironmentToFosterModalOpen, setIsAddEnvironmentToFosterModalOpen] = useState(false);
  const [environmentToFosterTitle, setEnvironmentToFosterTitle] = useState("");
  const [environmentToFosterDescription, setEnvironmentToFosterDescription] = useState("");
  const [environmentsToFoster, setEnvironmentsToFoster] = useState<{ title: string; description: string }[]>([]);
  const [isAddSystemToOptimizeModalOpen, setIsAddSystemToOptimizeModalOpen] = useState(false);
  const [systemToOptimizeTitle, setSystemToOptimizeTitle] = useState("");
  const [systemToOptimizeDescription, setSystemToOptimizeDescription] = useState("");
  const [systemsToOptimize, setSystemsToOptimize] = useState<{ title: string; description: string }[]>([]);
  const [isAddRoutineToEnhanceModalOpen, setIsAddRoutineToEnhanceModalOpen] = useState(false);
  const [routineToEnhanceTitle, setRoutineToEnhanceTitle] = useState("");
  const [routineToEnhanceDescription, setRoutineToEnhanceDescription] = useState("");
  const [routinesToEnhance, setRoutinesToEnhance] = useState<{ title: string; description: string }[]>([]);
  const [isAddPracticeToRefineModalOpen, setIsAddPracticeToRefineModalOpen] = useState(false);
  const [practiceToRefineTitle, setPracticeToRefineTitle] = useState("");
  const [practiceToRefineDescription, setPracticeToRefineDescription] = useState("");
  const [practicesToRefine, setPracticesToRefine] = useState<{ title: string; description: string }[]>([]);
  const [isAddSkillToPerfectModalOpen, setIsAddSkillToPerfectModalOpen] = useState(false);
  const [skillToPerfectTitle, setSkillToPerfectTitle] = useState("");
  const [skillToPerfectDescription, setSkillToPerfectDescription] = useState("");
  const [skillsToPerfect, setSkillsToPerfect] = useState<{ title: string; description: string }[]>([]);
  const [isAddAreaToMasterModalOpen, setIsAddAreaToMasterModalOpen] = useState(false);
  const [areaToMasterTitle, setAreaToMasterTitle] = useState("");
  const [areaToMasterDescription, setAreaToMasterDescription] = useState("");
  const [areasToMaster, setAreasToMaster] = useState<{ title: string; description: string }[]>([]);
  const [isAddResourceToMaximizeModalOpen, setIsAddResourceToMaximizeModalOpen] = useState(false);
  const [resourceToMaximizeTitle, setResourceToMaximizeTitle] = useState("");
  const [resourceToMaximizeDescription, setResourceToMaximizeDescription] = useState("");
  const [resourcesToMaximize, setResourcesToMaximize] = useState<{ title: string; description: string }[]>([]);
  const [isAddSupportToLeverageModalOpen, setIsAddSupportToLeverageModalOpen] = useState(false);
  const [supportToLeverageTitle, setSupportToLeverageTitle] = useState("");
  const [supportToLeverageDescription, setSupportToLeverageDescription] = useState("");
  const [supportsToLeverage, setSupportsToLeverage] = useState<{ title: string; description: string }[]>([]);
  const [isAddStrategyToOptimizeModalOpen, setIsAddStrategyToOptimizeModalOpen] = useState(false);
  const [strategyToOptimizeTitle, setStrategyToOptimizeTitle] = useState("");
  const [strategyToOptimizeDescription, setStrategyToOptimizeDescription] = useState("");
  const [strategiesToOptimize, setStrategiesToOptimize] = useState<{ title: string; description: string }[]>([]);
  const [isAddToolToMasterModalOpen, setIsAddToolToMasterModalOpen] = useState(false);
  const [toolToMasterTitle, setToolToMasterTitle] = useState("");
  const [toolToMasterDescription, setToolToMasterDescription] = useState("");
  const [toolsToMaster, setToolsToMaster] = useState<{ title: string; description: string }[]>([]);
  const [isAddSkillToExcelModalOpen, setIsAddSkillToExcelModalOpen] = useState(false);
  const [skillToExcelTitle, setSkillToExcelTitle] = useState("");
  const [skillToExcelDescription, setSkillToExcelDescription] = useState("");
  const [skillsToExcel, setSkillsToExcel] =
