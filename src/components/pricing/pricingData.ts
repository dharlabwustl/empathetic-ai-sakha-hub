export const individualPlans = [
  {
    title: "Free Trial",
    price: "₹0",
    period: "for 7 days",
    subtitle: "Try essential features",
    description: "Experience Sakha AI for 7 days",
    features: [
      { name: "Limited AI conversation (5 queries/day)", included: true },
      { name: "Basic personalized dashboard", included: true },
      { name: "Limited access to study tools", included: true },
      { name: "3 academic goals", included: true },
      { name: "Limited video content", included: true },
      { name: "Email support", included: true },
      { name: "Advanced personalization", included: false },
      { name: "Full content library", included: false },
      { name: "Emotional intelligence features", included: false },
      { name: "Weekly insights report", included: false },
    ],
    recommended: false,
    color: "gray",
    trial: true
  },
  {
    title: "Basic",
    price: "₹499",
    period: "/month",
    subtitle: "Expanded learning tools",
    description: "For serious students who want more features",
    features: [
      { name: "Unlimited AI conversations", included: true },
      { name: "Personalized dashboard", included: true },
      { name: "Full access to study tools", included: true },
      { name: "Unlimited academic goals", included: true },
      { name: "Expanded video library", included: true },
      { name: "Priority email support", included: true },
      { name: "Basic personalization", included: true },
      { name: "Smart notifications", included: true },
      { name: "Emotional intelligence features", included: false },
      { name: "Weekly insights report", included: false },
    ],
    recommended: false,
    color: "blue"
  },
  {
    title: "Premium",
    price: "₹999",
    period: "/month",
    subtitle: "Complete AI companion",
    description: "Unlock the full potential of Sakha AI",
    features: [
      { name: "Unlimited AI conversations", included: true },
      { name: "Advanced personalized dashboard", included: true },
      { name: "Full access to all tools & features", included: true },
      { name: "Unlimited goals with advanced tracking", included: true },
      { name: "Complete video & content library", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Advanced AI personalization", included: true },
      { name: "Emotional intelligence coaching", included: true },
      { name: "Mental health support tools", included: true },
      { name: "Weekly insights & progress reports", included: true },
    ],
    recommended: true,
    color: "purple"
  },
];

export const groupPlans = [
  {
    title: "Group",
    price: "₹3,999",
    period: "/month",
    subtitle: "For small study groups",
    description: "Shared access for 5 users",
    features: [
      { name: "All Basic plan features", included: true },
      { name: "5 user accounts", included: true },
      { name: "Group progress tracking", included: true },
      { name: "Collaborative study tools", included: true },
      { name: "Shared resource library", included: true },
      { name: "Group chat support", included: true },
    ],
    icon: "users",
    color: "green"
  },
  {
    title: "Institute",
    price: "₹19,999",
    period: "/month",
    subtitle: "For educational institutes",
    description: "For up to 50 students",
    features: [
      { name: "All Premium plan features", included: true },
      { name: "50 student accounts", included: true },
      { name: "Admin dashboard", included: true },
      { name: "Performance analytics", included: true },
      { name: "Custom content integration", included: true },
      { name: "Dedicated account manager", included: true },
    ],
    icon: "building2",
    color: "amber"
  },
  {
    title: "Corporate",
    price: "₹49,999",
    period: "/month",
    subtitle: "For employee families",
    description: "For up to 100 users",
    features: [
      { name: "All Premium plan features", included: true },
      { name: "100 user accounts", included: true },
      { name: "Family account grouping", included: true },
      { name: "Advanced admin controls", included: true },
      { name: "Custom branding options", included: true },
      { name: "API access", included: true },
    ],
    icon: "building",
    color: "blue"
  },
];

export const faq = [
  {
    question: "How do free access limits work?",
    answer: "Free plans provide limited access to features. For example, you may be limited to 5 AI tutor questions per day, 3 study plans, or access to only 20-50% of certain content. You'll see these limits clearly marked when using the features."
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to premium features. If you downgrade, you'll continue to have premium access until the end of your current billing cycle."
  },
  {
    question: "How do group plans work?",
    answer: "Our group plans allow multiple users to access premium features at a discounted rate. The group admin can invite members, and each member gets their own personalized dashboard and tracking while sharing access to premium features."
  },
  {
    question: "Do you offer discounts for students?",
    answer: "Yes, we offer a 50% discount on our Basic plan for students with a valid student ID. Please contact our support team after signing up to verify your student status."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI, and net banking in India. For Institute and Corporate plans, we also offer invoice-based payments."
  }
];
