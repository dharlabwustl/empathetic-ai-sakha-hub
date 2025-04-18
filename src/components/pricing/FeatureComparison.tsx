
import React from "react";
import { Check, X } from "lucide-react";

const features = [
  {
    name: "24/7 AI Tutor",
    free: "5 questions/day",
    basic: "Unlimited",
    premium: "Unlimited + Priority"
  },
  {
    name: "Flashcards & Revision",
    free: "50% content",
    basic: "Full access",
    premium: "Full access + Advanced"
  },
  {
    name: "Video Library",
    free: "20% content",
    basic: "Full access",
    premium: "Full access"
  },
  {
    name: "Concept Cards",
    free: "40% content",
    basic: "Full access",
    premium: "Full access"
  },
  {
    name: "Mood Tracker",
    free: false,
    basic: false,
    premium: true
  },
  {
    name: "Surrounding Influence",
    free: false,
    basic: false,
    premium: true
  },
  {
    name: "Profile Analytics",
    free: "Basic",
    basic: "Standard",
    premium: "Advanced"
  }
];

const FeatureComparison = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-display font-bold mb-4">Feature Access by Plan</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Free</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Basic</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {features.map((feature, index) => (
                <tr key={index}>
                  <td className="py-3 text-sm font-medium">{feature.name}</td>
                  <td className="py-3 text-sm">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check className="text-green-500" size={16} />
                      ) : (
                        <X className="text-red-500" size={16} />
                      )
                    ) : (
                      feature.free
                    )}
                  </td>
                  <td className="py-3 text-sm">
                    {typeof feature.basic === "boolean" ? (
                      feature.basic ? (
                        <Check className="text-green-500" size={16} />
                      ) : (
                        <X className="text-red-500" size={16} />
                      )
                    ) : (
                      feature.basic
                    )}
                  </td>
                  <td className="py-3 text-sm">
                    {typeof feature.premium === "boolean" ? (
                      feature.premium ? (
                        <Check className="text-green-500" size={16} />
                      ) : (
                        <X className="text-red-500" size={16} />
                      )
                    ) : (
                      feature.premium
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison;

