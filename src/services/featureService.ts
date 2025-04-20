
import { Feature, FeatureAccess, FeatureAccessLevel } from '@/types/features';
import { PlanType } from '@/types/subscription';
import { createClient } from '@supabase/supabase-js';

class FeatureService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_ANON_KEY || ''
    );
  }

  async getAllFeatures(): Promise<Feature[]> {
    const { data, error } = await this.supabase
      .from('features')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async getFeatureAccess(featureId: string, userId: string): Promise<FeatureAccess | null> {
    const { data, error } = await this.supabase
      .from('feature_access')
      .select('*')
      .eq('feature_id', featureId)
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateFeatureAccess(
    featureId: string, 
    userId: string, 
    accessLevel: FeatureAccessLevel
  ): Promise<void> {
    const { error } = await this.supabase
      .from('feature_access')
      .upsert({
        feature_id: featureId,
        user_id: userId,
        access_level: accessLevel,
        last_accessed: new Date().toISOString()
      });
    
    if (error) throw error;
  }

  async isFeatureAccessible(
    feature: Feature,
    userSubscription: PlanType,
    userId: string
  ): Promise<boolean> {
    // Free features are always accessible
    if (!feature.isPremium) return true;

    // Check if feature is allowed for user's subscription plan
    if (feature.allowedPlans && !feature.allowedPlans.includes(userSubscription)) {
      return false;
    }

    // Check feature access level against subscription
    const subscriptionLevels: Record<PlanType, FeatureAccessLevel> = {
      [PlanType.Free]: 'free',
      [PlanType.Basic]: 'basic',
      [PlanType.Premium]: 'premium',
      [PlanType.Enterprise]: 'enterprise'
    };

    const userAccessLevel = subscriptionLevels[userSubscription];
    const requiredLevel = feature.accessLevel;

    const accessLevelOrder: FeatureAccessLevel[] = ['free', 'basic', 'premium', 'enterprise'];
    const userLevelIndex = accessLevelOrder.indexOf(userAccessLevel);
    const requiredLevelIndex = accessLevelOrder.indexOf(requiredLevel);

    // User's subscription level must be equal or higher than feature's required level
    return userLevelIndex >= requiredLevelIndex;
  }
}

export const featureService = new FeatureService();
