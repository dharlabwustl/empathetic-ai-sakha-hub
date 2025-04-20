-- Create enum for feature access levels
CREATE TYPE feature_access_level AS ENUM ('free', 'basic', 'premium', 'enterprise');
CREATE TYPE subscription_interval AS ENUM ('monthly', 'yearly');
CREATE TYPE plan_type AS ENUM ('free', 'basic', 'premium', 'group', 'institute', 'corporate');

-- Features table
CREATE TABLE IF NOT EXISTS public.features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  path TEXT,
  is_premium BOOLEAN DEFAULT false,
  access_level feature_access_level DEFAULT 'free',
  allowed_plans plan_type[],
  free_access_limit_type TEXT,
  free_access_limit_value INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Subscription plans table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type plan_type NOT NULL,
  price INTEGER NOT NULL,
  interval subscription_interval NOT NULL,
  description TEXT,
  features TEXT[],
  max_users INTEGER,
  trial_days INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Feature access tracking
CREATE TABLE IF NOT EXISTS public.feature_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_id UUID REFERENCES public.features(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  access_level feature_access_level DEFAULT 'free',
  usage_count INTEGER DEFAULT 0,
  last_accessed TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(feature_id, user_id)
);

-- Enable RLS
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Public features are viewable by everyone"
  ON public.features FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify features"
  ON public.features FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view their own feature access"
  ON public.feature_access FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage feature access"
  ON public.feature_access FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public subscription plans are viewable by everyone"
  ON public.subscription_plans FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify subscription plans"
  ON public.subscription_plans FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create function to update usage count
CREATE OR REPLACE FUNCTION increment_feature_usage()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.feature_access
  SET usage_count = usage_count + 1,
      updated_at = now()
  WHERE feature_id = NEW.feature_id AND user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for usage tracking
CREATE TRIGGER track_feature_usage
  AFTER INSERT ON public.feature_access
  FOR EACH ROW
  EXECUTE FUNCTION increment_feature_usage();
