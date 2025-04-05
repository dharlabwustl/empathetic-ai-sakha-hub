
import { UserProfileType } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, GraduationCap, Briefcase, Stethoscope, Rocket } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProfileCardProps {
  profile: UserProfileType;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const getRoleIcon = () => {
    switch (profile.role) {
      case "Student":
        return <GraduationCap className="text-sakha-blue" size={18} />;
      case "Employee":
        return <Briefcase className="text-sakha-blue" size={18} />;
      case "Doctor":
        return <Stethoscope className="text-sakha-blue" size={18} />;
      case "Founder":
        return <Rocket className="text-sakha-blue" size={18} />;
      default:
        return <GraduationCap className="text-sakha-blue" size={18} />;
    }
  };

  const joinedDate = new Date(profile.joinDate);
  const joinedTimeAgo = formatDistanceToNow(joinedDate, { addSuffix: true });

  const getRoleSpecificDetails = () => {
    switch (profile.role) {
      case "Student":
        const studentProfile = profile as any;
        return (
          <>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Education:</span> {studentProfile.educationLevel}
            </p>
            {studentProfile.examPreparation && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Preparing for:</span> {studentProfile.examPreparation}
              </p>
            )}
          </>
        );
      case "Employee":
        const employeeProfile = profile as any;
        return (
          <>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Job Title:</span> {employeeProfile.jobTitle}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Industry:</span> {employeeProfile.industry}
            </p>
          </>
        );
      case "Doctor":
        const doctorProfile = profile as any;
        return (
          <>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Specialization:</span> {doctorProfile.specialization}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Institution:</span> {doctorProfile.institution}
            </p>
          </>
        );
      case "Founder":
        const founderProfile = profile as any;
        return (
          <>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Startup:</span> {founderProfile.startupName}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Stage:</span> {founderProfile.startupStage}
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Your Profile</span>
          <Badge variant={profile.subscription === "Premium" ? "default" : "outline"}>
            {profile.subscription} Plan
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-sakha-blue/20 flex items-center justify-center text-sakha-blue text-xl font-bold">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              {getRoleIcon()}
              <span className="ml-1">{profile.role}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <CalendarIcon size={12} className="mr-1" />
              <span>Joined {joinedTimeAgo}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Personality Type</h4>
            <Badge variant="outline" className="bg-sakha-lavender/10">
              {profile.personalityType}
            </Badge>
          </div>

          {getRoleSpecificDetails()}

          <div>
            <h4 className="text-sm font-medium mb-2">Areas of Interest</h4>
            <div className="flex flex-wrap gap-2">
              {profile.areasOfInterest.map((interest) => (
                <Badge key={interest.id} variant="outline" className="bg-sakha-light-blue/10">
                  {interest.name} ({interest.level})
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Goals</h4>
            <div className="space-y-2">
              {profile.goals.slice(0, 2).map((goal) => (
                <div key={goal.id} className="bg-gray-50 p-2 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium">{goal.title}</p>
                    <span className="text-xs text-gray-500">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sakha-blue rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
