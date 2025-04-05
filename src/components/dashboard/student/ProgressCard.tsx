
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const subjects = [
  { name: "Physics", progress: 75 },
  { name: "Mathematics", progress: 60 },
  { name: "Chemistry", progress: 40 },
  { name: "Biology", progress: 25 }
];

export default function ProgressCard() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Your Learning Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-6">
          {subjects.map((subject) => (
            <div key={subject.name}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{subject.name}</h3>
                <span className="text-sm text-gray-500">{subject.progress}% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sakha-blue rounded-full" 
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <Button>View Detailed Analytics</Button>
        </div>
      </CardContent>
    </Card>
  );
}
