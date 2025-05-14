import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Flame, Droplets, Leaf, Users, ShieldCheck, XCircle, CheckCircle, AlertTriangle, AlertOctagon, Info, HelpCircle, MessageSquare, Mail, Phone, MapPin, Edit, BookOpen, Book, GraduationCap, Brain, Heart, Clock, Shield, Trophy, User, Calendar, LineChart, ArrowRight, ArrowUpRight, ArrowLeft, ArrowDown, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, MoreVertical, Plus, Minus, X, Menu, Search, Settings, Volume2, VolumeX, Volume, Mic, MicOff, Globe, Loader2, CalendarDays, CalendarCheck, ListChecks, ListOrdered, ListUnordered, ListTree, ListEnd, ListMinus, ListPlus, ListX, List, ListOrderedOl, ListUnorderedUl, ListTreeUl, ListEndUl, ListMinusUl, ListPlusUl, ListXUl, ListUl, ListOrderedLi, ListUnorderedLi, ListTreeLi, ListEndLi, ListMinusLi, ListPlusLi, ListXLi, ListLi, ListOrderedOlLi, ListUnorderedUlLi, ListTreeUlLi, ListEndUlLi, ListMinusUlLi, ListPlusUlLi, ListXUlLi, ListUlLi, ListOrderedOlLiLi, ListUnorderedUlLiLi, ListTreeUlLiLi, ListEndUlLiLi, ListMinusUlLiLi, ListPlusUlLiLi, ListXUlLiLi, ListUlLiLi, ListOrderedOlLiLiLi, ListUnorderedUlLiLiLi, ListTreeUlLiLiLi, ListEndUlLiLiLi, ListMinusUlLiLiLi, ListPlusUlLiLiLi, ListXUlLiLiLi, ListUlLiLiLi, ListOrderedOlLiLiLiLi, ListUnorderedUlLiLiLiLi, ListTreeUlLiLiLiLi, ListEndUlLiLiLiLi, ListMinusUlLiLiLiLi, ListPlusUlLiLiLiLi, ListXUlLiLiLiLi, ListUlLiLiLiLi, ListOrderedOlLiLiLiLiLi, ListUnorderedUlLiLiLiLiLi, ListTreeUlLiLiLiLiLi, ListEndUlLiLiLiLiLi, ListMinusUlLiLiLiLiLi, ListPlusUlLiLiLiLiLi, ListXUlLiLiLiLiLi, ListUlLiLiLiLiLi, ListOrderedOlLiLiLiLiLiLi, ListUnorderedUlLiLiLiLiLiLi, ListTreeUlLiLiLiLiLiLi, ListEndUlLiLiLiLiLiLi, ListMinusUlLiLiLiLiLiLi, ListPlusUlLiLiLiLiLiLi, ListXUlLiLiLiLiLiLi, ListUlLiLiLiLiLiLi, ListOrderedOlLiLiLiLiLiLiLi, ListUnorderedUlLiLiLiLiLiLiLi, ListTreeUlLiLiLiLiLiLiLi, ListEndUlLiLiLiLiLiLiLi, ListMinusUlLiLiLiLiLiLiLi, ListPlusUlLiLiLiLiLiLiLi, ListXUlLiLiLiLiLiLiLi, ListUlLiLiLiLiLiLiLi, ListOrderedOlLiLiLiLiLiLiLiLi, ListUnorderedUlLiLiLiLiLiLiLiLi, ListTreeUlLiLiLiLiLiLiLiLi, ListEndUlLiLiLiLiLiLiLiLi, ListMinusUlLiLiLiLiLiLiLiLi, ListPlusUlLiLiLiLiLiLiLiLi, ListXUlLiLiLiLiLiLiLiLi, ListUlLiLiLiLiLiLiLiLi } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed,
}: SurroundingInfluencesSectionProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [environmentalFactors, setEnvironmentalFactors] = React.useState({
    noiseLevel: 0.3,
    lighting: 0.7,
    temperature: 0.5,
    airQuality: 0.6,
  });

  const [socialFactors, setSocialFactors] = React.useState({
    familySupport: 0.8,
    peerInfluence: 0.4,
    teacherSupport: 0.7,
    studyGroupEffectiveness: 0.6,
  });

  const [personalFactors, setPersonalFactors] = React.useState({
    stressLevel: 0.4,
    motivationLevel: 0.9,
    sleepQuality: 0.6,
    focusLevel: 0.7,
  });

  const [techInfluences, setTechInfluences] = React.useState({
    socialMediaDistraction: 0.5,
    onlineLearningResources: 0.8,
    digitalEyeStrain: 0.3,
    techSupportAvailability: 0.7,
  });

  const [noiseLevelDescription, setNoiseLevelDescription] = React.useState("Moderate");
  const [lightingDescription, setLightingDescription] = React.useState("Optimal");
  const [temperatureDescription, setTemperatureDescription] = React.useState("Comfortable");
  const [airQualityDescription, setAirQualityDescription] = React.useState("Good");
  const [familySupportDescription, setFamilySupportDescription] = React.useState("High");
  const [peerInfluenceDescription, setPeerInfluenceDescription] = React.useState("Neutral");
  const [teacherSupportDescription, setTeacherSupportDescription] = React.useState("High");
  const [studyGroupEffectivenessDescription, setStudyGroupEffectivenessDescription] = React.useState("Effective");
  const [stressLevelDescription, setStressLevelDescription] = React.useState("Manageable");
  const [motivationLevelDescription, setMotivationLevelDescription] = React.useState("Very High");
  const [sleepQualityDescription, setSleepQualityDescription] = React.useState("Adequate");
  const [focusLevelDescription, setFocusLevelDescription] = React.useState("Good");
  const [socialMediaDistractionDescription, setSocialMediaDistractionDescription] = React.useState("Moderate");
  const [onlineLearningResourcesDescription, setOnlineLearningResourcesDescription] = React.useState("Excellent");
  const [digitalEyeStrainDescription, setDigitalEyeStrainDescription] = React.useState("Low");
  const [techSupportAvailabilityDescription, setTechSupportAvailabilityDescription] = React.useState("High");

  const handleEnvironmentalFactorChange = (factor: string, value: number) => {
    setEnvironmentalFactors({ ...environmentalFactors, [factor]: value });
    switch (factor) {
      case "noiseLevel":
        if (value <= 0.25) setNoiseLevelDescription("Very Quiet");
        else if (value <= 0.5) setNoiseLevelDescription("Moderate");
        else if (value <= 0.75) setNoiseLevelDescription("Noisy");
        else setNoiseLevelDescription("Very Noisy");
        break;
      case "lighting":
        if (value <= 0.25) setLightingDescription("Dim");
        else if (value <= 0.5) setLightingDescription("Average");
        else if (value <= 0.75) setLightingDescription("Bright");
        else setLightingDescription("Optimal");
        break;
      case "temperature":
        if (value <= 0.25) setTemperatureDescription("Cold");
        else if (value <= 0.5) setTemperatureDescription("Comfortable");
        else if (value <= 0.75) setTemperatureDescription("Warm");
        else setTemperatureDescription("Hot");
        break;
      case "airQuality":
        if (value <= 0.25) setAirQualityDescription("Poor");
        else if (value <= 0.5) setAirQualityDescription("Average");
        else if (value <= 0.75) setAirQualityDescription("Good");
        else setAirQualityDescription("Excellent");
        break;
      default:
        break;
    }
  };

  const handleSocialFactorChange = (factor: string, value: number) => {
    setSocialFactors({ ...socialFactors, [factor]: value });
    switch (factor) {
      case "familySupport":
        if (value <= 0.25) setFamilySupportDescription("Low");
        else if (value <= 0.5) setFamilySupportDescription("Moderate");
        else if (value <= 0.75) setFamilySupportDescription("High");
        else setFamilySupportDescription("Very High");
        break;
      case "peerInfluence":
        if (value <= 0.25) setPeerInfluenceDescription("Negative");
        else if (value <= 0.5) setPeerInfluenceDescription("Neutral");
        else if (value <= 0.75) setPeerInfluenceDescription("Positive");
        else setPeerInfluenceDescription("Very Positive");
        break;
      case "teacherSupport":
        if (value <= 0.25) setTeacherSupportDescription("Low");
        else if (value <= 0.5) setTeacherSupportDescription("Moderate");
        else if (value <= 0.75) setTeacherSupportDescription("High");
        else setTeacherSupportDescription("Very High");
        break;
      case "studyGroupEffectiveness":
        if (value <= 0.25) setStudyGroupEffectivenessDescription("Ineffective");
        else if (value <= 0.5) setStudyGroupEffectivenessDescription("Average");
        else if (value <= 0.75) setStudyGroupEffectivenessDescription("Effective");
        else setStudyGroupEffectivenessDescription("Very Effective");
        break;
      default:
        break;
    }
  };

  const handlePersonalFactorChange = (factor: string, value: number) => {
    setPersonalFactors({ ...personalFactors, [factor]: value });
    switch (factor) {
      case "stressLevel":
        if (value <= 0.25) setStressLevelDescription("Low");
        else if (value <= 0.5) setStressLevelDescription("Manageable");
        else if (value <= 0.75) setStressLevelDescription("High");
        else setStressLevelDescription("Very High");
        break;
      case "motivationLevel":
        if (value <= 0.25) setMotivationLevelDescription("Low");
        else if (value <= 0.5) setMotivationLevelDescription("Average");
        else if (value <= 0.75) setMotivationLevelDescription("High");
        else setMotivationLevelDescription("Very High");
        break;
      case "sleepQuality":
        if (value <= 0.25) setSleepQualityDescription("Poor");
        else if (value <= 0.5) setSleepQualityDescription("Adequate");
        else if (value <= 0.75) setSleepQualityDescription("Good");
        else setSleepQualityDescription("Excellent");
        break;
      case "focusLevel":
        if (value <= 0.25) setFocusLevelDescription("Low");
        else if (value <= 0.5) setFocusLevelDescription("Average");
        else if (value <= 0.75) setFocusLevelDescription("Good");
        else setFocusLevelDescription("Excellent");
        break;
      default:
        break;
    }
  };

  const handleTechInfluenceChange = (factor: string, value: number) => {
    setTechInfluences({ ...techInfluences, [factor]: value });
    switch (factor) {
      case "socialMediaDistraction":
        if (value <= 0.25) setSocialMediaDistractionDescription("Low");
        else if (value <= 0.5) setSocialMediaDistractionDescription("Moderate");
        else if (value <= 0.75) setSocialMediaDistractionDescription("High");
        else setSocialMediaDistractionDescription("Very High");
        break;
      case "onlineLearningResources":
        if (value <= 0.25) setOnlineLearningResourcesDescription("Limited");
        else if (value <= 0.5) setOnlineLearningResourcesDescription("Average");
        else if (value <= 0.75) setOnlineLearningResourcesDescription("Excellent");
        else setOnlineLearningResourcesDescription("Comprehensive");
        break;
      case "digitalEyeStrain":
        if (value <= 0.25) setDigitalEyeStrainDescription("Low");
        else if (value <= 0.5) setDigitalEyeStrainDescription("Moderate");
        else if (value <= 0.75) setDigitalEyeStrainDescription("High");
        else setDigitalEyeStrainDescription("Severe");
        break;
      case "techSupportAvailability":
        if (value <= 0.25) setTechSupportAvailabilityDescription("Limited");
        else if (value <= 0.5) setTechSupportAvailabilityDescription("Average");
        else if (value <= 0.75) setTechSupportAvailabilityDescription("Good");
        else setTechSupportAvailabilityDescription("Excellent");
        break;
      default:
        break;
    }
  };

  const calculateOverallInfluence = () => {
    const environmentalScore =
      (environmentalFactors.noiseLevel +
        environmentalFactors.lighting +
        environmentalFactors.temperature +
        environmentalFactors.airQuality) /
      4;
    const socialScore =
      (socialFactors.familySupport +
        socialFactors.peerInfluence +
        socialFactors.teacherSupport +
        socialFactors.studyGroupEffectiveness) /
      4;
    const personalScore =
      (personalFactors.stressLevel +
        personalFactors.motivationLevel +
        personalFactors.sleepQuality +
        personalFactors.focusLevel) /
      4;
    const techScore =
      (techInfluences.socialMediaDistraction +
        techInfluences.onlineLearningResources +
        techInfluences.digitalEyeStrain +
        techInfluences.techSupportAvailability) /
      4;

    return (
      (environmentalScore + socialScore + personalScore + techScore) / 4
    );
  };

  const overallInfluence = calculateOverallInfluence();
  const overallInfluencePercentage = Math.round(overallInfluence * 100);

  const getInfluenceDescription = () => {
    if (overallInfluencePercentage >= 75) {
      return "Your surrounding influences are highly conducive to effective learning and well-being.";
    } else if (overallInfluencePercentage >= 50) {
      return "Your surrounding influences are moderately supportive, but there's room for improvement.";
    } else if (overallInfluencePercentage >= 25) {
      return "Your surrounding influences present challenges that may hinder your learning and well-being.";
    } else {
      return "Your surrounding influences pose significant obstacles to effective learning and well-being.";
    }
  };

  const influenceDescription = getInfluenceDescription();

  const handleResetSettings = () => {
    setEnvironmentalFactors({
      noiseLevel: 0.3,
      lighting: 0.7,
      temperature: 0.5,
      airQuality: 0.6,
    });
    setSocialFactors({
      familySupport: 0.8,
      peerInfluence: 0.4,
      teacherSupport: 0.7,
      studyGroupEffectiveness: 0.6,
    });
    setPersonalFactors({
      stressLevel: 0.4,
      motivationLevel: 0.9,
      sleepQuality: 0.6,
      focusLevel: 0.7,
    });
    setTechInfluences({
      socialMediaDistraction: 0.5,
      onlineLearningResources: 0.8,
      digitalEyeStrain: 0.3,
      techSupportAvailability: 0.7,
    });
    setNoiseLevelDescription("Moderate");
    setLightingDescription("Optimal");
    setTemperatureDescription("Comfortable");
    setAirQualityDescription("Good");
    setFamilySupportDescription("High");
    setPeerInfluenceDescription("Neutral");
    setTeacherSupportDescription("High");
    setStudyGroupEffectivenessDescription("Effective");
    setStressLevelDescription("Manageable");
    setMotivationLevelDescription("Very High");
    setSleepQualityDescription("Adequate");
    setFocusLevelDescription("Good");
    setSocialMediaDistractionDescription("Moderate");
    setOnlineLearningResourcesDescription("Excellent");
    setDigitalEyeStrainDescription("Low");
    setTechSupportAvailabilityDescription("High");

    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <Card className="border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Surrounding Influences
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
        >
          {influenceMeterCollapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
          <span className="sr-only">
            {influenceMeterCollapsed ? "Expand" : "Collapse"}
          </span>
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        {influenceMeterCollapsed ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    Overall Influence:
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {influenceDescription}
                </p>
              </div>
              <div className="text-4xl font-bold">
                {overallInfluencePercentage}%
              </div>
            </div>
            <Progress value={overallInfluencePercentage} className="h-2" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">
                      Overall Influence:
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {influenceDescription}
                  </p>
                </div>
                <div className="text-4xl font-bold">
                  {overallInfluencePercentage}%
                </div>
              </div>
              <Progress value={overallInfluencePercentage} className="h-2" />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Environmental Factors</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Noise Level</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {noiseLevelDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[environmentalFactors.noiseLevel]}
                      onValueChange={(value) =>
                        handleEnvironmentalFactorChange("noiseLevel", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Lighting</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {lightingDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[environmentalFactors.lighting]}
                      onValueChange={(value) =>
                        handleEnvironmentalFactorChange("lighting", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Temperature</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {temperatureDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[environmentalFactors.temperature]}
                      onValueChange={(value) =>
                        handleEnvironmentalFactorChange("temperature", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Leaf className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Air Quality</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {airQualityDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[environmentalFactors.airQuality]}
                      onValueChange={(value) =>
                        handleEnvironmentalFactorChange("airQuality", value[0])
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Social Factors</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Family Support</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {familySupportDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[socialFactors.familySupport]}
                      onValueChange={(value) =>
                        handleSocialFactorChange("familySupport", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Peer Influence</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {peerInfluenceDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[socialFactors.peerInfluence]}
                      onValueChange={(value) =>
                        handleSocialFactorChange("peerInfluence", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Teacher Support</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {teacherSupportDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[socialFactors.teacherSupport]}
                      onValueChange={(value) =>
                        handleSocialFactorChange("teacherSupport", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Study Group Effectiveness</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {studyGroupEffectivenessDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[socialFactors.studyGroupEffectiveness]}
                      onValueChange={(value) =>
                        handleSocialFactorChange("studyGroupEffectiveness", value[0])
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Personal Factors</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <AlertOctagon className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Stress Level</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stressLevelDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[personalFactors.stressLevel]}
                      onValueChange={(value) =>
                        handlePersonalFactorChange("stressLevel", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-rose-500" />
                      <span className="text-sm">Motivation Level</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {motivationLevelDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[personalFactors.motivationLevel]}
                      onValueChange={(value) =>
                        handlePersonalFactorChange("motivationLevel", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Sleep Quality</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {sleepQualityDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[personalFactors.sleepQuality]}
                      onValueChange={(value) =>
                        handlePersonalFactorChange("sleepQuality", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Brain className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Focus Level</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {focusLevelDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[personalFactors.focusLevel]}
                      onValueChange={(value) =>
                        handlePersonalFactorChange("focusLevel", value[0])
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Tech Influences</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Social Media Distraction</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {socialMediaDistractionDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[techInfluences.socialMediaDistraction]}
                      onValueChange={(value) =>
                        handleTechInfluenceChange("socialMediaDistraction", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Online Learning Resources</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {onlineLearningResourcesDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[techInfluences.onlineLearningResources]}
                      onValueChange={(value) =>
                        handleTechInfluenceChange("onlineLearningResources", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Digital Eye Strain</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {digitalEyeStrainDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[techInfluences.digitalEyeStrain]}
                      onValueChange={(value) =>
                        handleTechInfluenceChange("digitalEyeStrain", value[0])
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Tech Support Availability</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {techSupportAvailabilityDescription}
                    </p>
                  </div>
                  <div className="w-3/5">
                    <Slider
                      min={0}
                      max={1}
                      step={0.05}
                      defaultValue={[techInfluences.techSupportAvailability]}
                      onValueChange={(value) =>
                        handleTechInfluenceChange("techSupportAvailability", value[0])
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleResetSettings}
            >
              Reset Settings
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SurroundingInfluencesSection;
