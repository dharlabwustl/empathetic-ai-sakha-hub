
import { Feature, FeatureAccess, FeatureAccessLevel, SubscriptionPlan, PlanType, SubscriptionInterval } from '@/types/features';
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

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    const { data, error } = await this.supabase
      .from('subscription_plans')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async updateSubscriptionPlan(plan: SubscriptionPlan): Promise<SubscriptionPlan> {
    const { data, error } = await this.supabase
      .from('subscription_plans')
      .upsert(plan)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  async toggleFeaturePremium(title: string, isPremium: boolean): Promise<void> {
    const { error } = await this.supabase
      .from('features')
      .update({ is_premium: isPremium })
      .eq('title', title);
    
    if (error) throw error;
  }
  
  async updateFeature(feature: Feature): Promise<void> {
    const { error } = await this.supabase
      .from('features')
      .update({
        title: feature.title,
        description: feature.description,
        path: feature.path,
        is_premium: feature.isPremium,
        access_level: feature.accessLevel,
        allowed_plans: feature.allowedPlans,
        free_access_limit_type: feature.freeAccessLimit?.type,
        free_access_limit_value: feature.freeAccessLimit?.limit
      })
      .eq('id', feature.id);
    
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
      [PlanType.Group]: 'premium',
      [PlanType.Institute]: 'enterprise',
      [PlanType.Corporate]: 'enterprise'
    };

    const userAccessLevel = subscriptionLevels[userSubscription];
    const requiredLevel = feature.accessLevel;

    const accessLevelOrder: FeatureAccessLevel[] = ['free', 'basic', 'premium', 'enterprise'];
    const userLevelIndex = accessLevelOrder.indexOf(userAccessLevel);
    const requiredLevelIndex = accessLevelOrder.indexOf(requiredLevel);

    return userLevelIndex >= requiredLevelIndex;
  }
}

export const featureService = new FeatureService();
export { PlanType, SubscriptionInterval };
export type { SubscriptionPlan, Feature };
