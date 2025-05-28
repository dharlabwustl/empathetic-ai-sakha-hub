
import { PersonalizationProfile, DashboardWidget, PersonalizedDashboardLayout } from '@/types/personalization';
import { MoodType } from '@/types/user/base';

class PersonalizationService {
  generatePersonalizedDashboard(profile: PersonalizationProfile): PersonalizedDashboardLayout {
    const widgets = this.generateSmartWidgets(profile);
    const prioritizedWidgets = this.prioritizeWidgets(widgets, profile);
    
    return {
      widgets: prioritizedWidgets,
      theme: this.getAdaptiveTheme(profile.moodPatterns.current),
      layout: this.getOptimalLayout(profile.learningStyle),
      priorityOrder: prioritizedWidgets.map(w => w.id)
    };
  }

  private generateSmartWidgets(profile: PersonalizationProfile): DashboardWidget[] {
    const baseWidgets: DashboardWidget[] = [];
    
    // Performance-based widgets
    if (profile.performanceLevel === 'beginner') {
      baseWidgets.push({
        id: 'confidence-builder',
        type: 'action',
        title: 'Quick Win Challenges',
        priority: 10,
        visibility: true,
        position: { row: 0, col: 0 },
        size: 'medium',
        content: { type: 'easy-concepts', count: 3 }
      });
    } else if (profile.performanceLevel === 'advanced') {
      baseWidgets.push({
        id: 'challenge-problems',
        type: 'action',
        title: 'Advanced Challenges',
        priority: 9,
        visibility: true,
        position: { row: 0, col: 0 },
        size: 'medium',
        content: { type: 'difficult-problems', count: 5 }
      });
    }

    // Weak subject focus
    if (profile.weakSubjects.length > 0) {
      baseWidgets.push({
        id: 'weak-subject-focus',
        type: 'content',
        title: `Strengthen ${profile.weakSubjects[0]}`,
        priority: 8,
        visibility: true,
        position: { row: 0, col: 1 },
        size: 'large',
        content: { 
          subject: profile.weakSubjects[0],
          recommendedTime: 45,
          concepts: this.getWeakConceptsForSubject(profile.weakSubjects[0])
        }
      });
    }

    // Time-based widgets
    const currentHour = new Date().getHours();
    const startHour = parseInt(profile.studyPreferences.preferredTimeStart.split(':')[0]);
    const endHour = parseInt(profile.studyPreferences.preferredTimeEnd.split(':')[0]);
    
    if (currentHour >= startHour && currentHour <= endHour) {
      baseWidgets.push({
        id: 'optimal-study-time',
        type: 'action',
        title: 'Perfect Time to Study!',
        priority: 9,
        visibility: true,
        position: { row: 1, col: 0 },
        size: 'medium',
        content: { 
          message: 'This is your optimal study time',
          suggestedDuration: profile.studyPreferences.sessionDuration
        }
      });
    }

    // Exam-specific widgets
    baseWidgets.push(...this.getExamSpecificWidgets(profile.examType));

    return baseWidgets;
  }

  private prioritizeWidgets(widgets: DashboardWidget[], profile: PersonalizationProfile): DashboardWidget[] {
    return widgets
      .sort((a, b) => b.priority - a.priority)
      .map((widget, index) => ({
        ...widget,
        position: this.calculateOptimalPosition(index, profile.learningStyle)
      }));
  }

  private getAdaptiveTheme(currentMood: string): string {
    switch (currentMood) {
      case MoodType.STRESSED:
        return 'calm-blue';
      case MoodType.MOTIVATED:
        return 'energetic-orange';
      case MoodType.FOCUSED:
        return 'focused-green';
      default:
        return 'default';
    }
  }

  private getOptimalLayout(learningStyle: string): 'grid' | 'list' | 'masonry' {
    switch (learningStyle) {
      case 'visual':
        return 'masonry';
      case 'auditory':
        return 'list';
      case 'kinesthetic':
        return 'grid';
      default:
        return 'grid';
    }
  }

  private getExamSpecificWidgets(examType: string): DashboardWidget[] {
    const examWidgets: Record<string, DashboardWidget[]> = {
      'JEE': [{
        id: 'jee-specific',
        type: 'kpi',
        title: 'JEE Preparation Progress',
        priority: 7,
        visibility: true,
        position: { row: 2, col: 0 },
        size: 'large',
        content: {
          subjects: ['Physics', 'Chemistry', 'Mathematics'],
          focusAreas: ['Problem Solving', 'Speed', 'Accuracy'],
          targetScore: 250
        }
      }],
      'NEET': [{
        id: 'neet-specific',
        type: 'kpi',
        title: 'NEET Preparation Progress',
        priority: 7,
        visibility: true,
        position: { row: 2, col: 0 },
        size: 'large',
        content: {
          subjects: ['Physics', 'Chemistry', 'Biology'],
          focusAreas: ['Memorization', 'Concepts', 'Application'],
          targetScore: 650
        }
      }]
    };

    return examWidgets[examType] || [];
  }

  private calculateOptimalPosition(index: number, learningStyle: string): { row: number; col: number } {
    // Visual learners prefer scattered layout
    if (learningStyle === 'visual') {
      return { row: Math.floor(index / 3), col: index % 3 };
    }
    // Auditory learners prefer linear layout
    if (learningStyle === 'auditory') {
      return { row: index, col: 0 };
    }
    // Kinesthetic learners prefer grid layout
    return { row: Math.floor(index / 2), col: index % 2 };
  }

  private getWeakConceptsForSubject(subject: string): string[] {
    const concepts: Record<string, string[]> = {
      'Physics': ['Newton\'s Laws', 'Thermodynamics', 'Electromagnetism'],
      'Chemistry': ['Organic Chemistry', 'Chemical Bonding', 'Periodic Table'],
      'Mathematics': ['Calculus', 'Algebra', 'Trigonometry'],
      'Biology': ['Cell Biology', 'Genetics', 'Ecology']
    };
    return concepts[subject] || [];
  }

  adaptForTimeContext(profile: PersonalizationProfile, currentTime: Date): DashboardWidget[] {
    const hour = currentTime.getHours();
    const widgets: DashboardWidget[] = [];

    if (this.isStudyTime(profile, hour)) {
      widgets.push({
        id: 'study-session',
        type: 'action',
        title: 'Start Study Session',
        priority: 10,
        visibility: true,
        position: { row: 0, col: 0 },
        size: 'large',
        content: { 
          type: 'study-start',
          duration: profile.studyPreferences.sessionDuration
        }
      });
    } else if (this.isBreakTime(profile, hour)) {
      widgets.push({
        id: 'wellness-break',
        type: 'content',
        title: 'Wellness Break',
        priority: 8,
        visibility: true,
        position: { row: 0, col: 0 },
        size: 'medium',
        content: { 
          type: 'wellness',
          activities: ['Meditation', 'Quick Walk', 'Breathing Exercise']
        }
      });
    }

    return widgets;
  }

  private isStudyTime(profile: PersonalizationProfile, hour: number): boolean {
    const startHour = parseInt(profile.studyPreferences.preferredTimeStart.split(':')[0]);
    const endHour = parseInt(profile.studyPreferences.preferredTimeEnd.split(':')[0]);
    return hour >= startHour && hour <= endHour;
  }

  private isBreakTime(profile: PersonalizationProfile, hour: number): boolean {
    // Breaks are outside study time but during reasonable hours
    return hour >= 8 && hour <= 22 && !this.isStudyTime(profile, hour);
  }
}

export const personalizationService = new PersonalizationService();
