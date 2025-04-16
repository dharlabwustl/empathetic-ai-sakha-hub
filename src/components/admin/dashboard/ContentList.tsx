
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { ContentType } from "@/types/content";

interface ContentListProps {
  contentType: ContentType | 'all';
}

const mockContent = [
  {
    id: '1',
    title: 'Newton\'s Laws of Motion',
    type: 'concept_cards',
    subject: 'Physics',
    examGoal: 'JEE',
    createdAt: '2023-05-12',
    tags: ['mechanics', 'force', 'motion']
  },
  {
    id: '2',
    title: 'Periodic Table Elements',
    type: 'flashcards',
    subject: 'Chemistry',
    examGoal: 'NEET',
    createdAt: '2023-05-14',
    tags: ['elements', 'periodic table', 'chemistry basics']
  },
  {
    id: '3',
    title: 'Calculus Practice Test',
    type: 'practice_exams',
    subject: 'Mathematics',
    examGoal: 'JEE Advanced',
    createdAt: '2023-05-15',
    tags: ['calculus', 'practice', 'advanced']
  },
  {
    id: '4',
    title: 'Cell Structure and Function',
    type: 'study_materials',
    subject: 'Biology',
    examGoal: 'NEET',
    createdAt: '2023-05-16',
    tags: ['cell', 'biology', 'structure']
  },
  {
    id: '5',
    title: 'Quick Cell Biology Quiz',
    type: 'quizzes',
    subject: 'Biology',
    examGoal: 'NEET',
    createdAt: '2023-05-18',
    tags: ['quiz', 'cell', 'biology']
  }
];

const ContentList: React.FC<ContentListProps> = ({ contentType }) => {
  // Filter content based on contentType
  const filteredContent = contentType === 'all' 
    ? mockContent 
    : mockContent.filter(item => item.type === contentType);

  if (filteredContent.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No content found for this category.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Exam Goal</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContent.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {item.type.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>{item.subject}</TableCell>
              <TableCell>{item.examGoal}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentList;
