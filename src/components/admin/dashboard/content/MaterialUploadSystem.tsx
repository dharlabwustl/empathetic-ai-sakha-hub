
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, Image, Video, Download, Eye, Trash2, Edit } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface UploadedMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'image' | 'audio' | 'document';
  subject: string;
  examType: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  size: string;
  uploadDate: string;
  status: 'active' | 'pending' | 'archived';
  downloads: number;
  views: number;
}

const MaterialUploadSystem: React.FC = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    examType: '',
    topic: '',
    difficulty: 'medium' as const,
    tags: '',
    description: ''
  });

  const [materials, setMaterials] = useState<UploadedMaterial[]>([
    {
      id: '1',
      name: 'NEET Biology Chapter 1 Notes.pdf',
      type: 'pdf',
      subject: 'Biology',
      examType: 'NEET',
      topic: 'Cell Biology',
      difficulty: 'medium',
      tags: ['notes', 'theory', 'ncert'],
      size: '4.2 MB',
      uploadDate: '2024-01-15',
      status: 'active',
      downloads: 245,
      views: 567
    },
    {
      id: '2',
      name: 'Physics Formula Derivation Video.mp4',
      type: 'video',
      subject: 'Physics',
      examType: 'JEE',
      topic: 'Mechanics',
      difficulty: 'hard',
      tags: ['video', 'derivation', 'concepts'],
      size: '125 MB',
      uploadDate: '2024-01-14',
      status: 'active',
      downloads: 189,
      views: 423
    },
    {
      id: '3',
      name: 'Chemistry Reaction Mechanisms.pdf',
      type: 'pdf',
      subject: 'Chemistry',
      examType: 'NEET',
      topic: 'Organic Chemistry',
      difficulty: 'hard',
      tags: ['mechanisms', 'organic', 'reactions'],
      size: '8.7 MB',
      uploadDate: '2024-01-12',
      status: 'pending',
      downloads: 78,
      views: 156
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!formData.name || !formData.subject || !formData.examType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before uploading.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Add new material to list
          const newMaterial: UploadedMaterial = {
            id: `material_${Date.now()}`,
            name: file.name,
            type: file.type.includes('pdf') ? 'pdf' : 
                  file.type.includes('video') ? 'video' :
                  file.type.includes('image') ? 'image' : 'document',
            subject: formData.subject,
            examType: formData.examType,
            topic: formData.topic,
            difficulty: formData.difficulty,
            tags: formData.tags.split(',').map(tag => tag.trim()),
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'pending',
            downloads: 0,
            views: 0
          };

          setMaterials(prev => [newMaterial, ...prev]);
          
          // Reset form
          setFormData({
            name: '',
            subject: '',
            examType: '',
            topic: '',
            difficulty: 'medium',
            tags: '',
            description: ''
          });

          toast({
            title: "Upload Successful",
            description: `${file.name} has been uploaded and is pending review.`,
          });

          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (materialId: string, newStatus: 'active' | 'pending' | 'archived') => {
    setMaterials(prev => prev.map(material => 
      material.id === materialId ? { ...material, status: newStatus } : material
    ));
    
    toast({
      title: "Status Updated",
      description: `Material status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Study Material
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="materialName">Material Name *</Label>
              <Input
                id="materialName"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., NEET Biology Chapter 1 Notes"
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="General Studies">General Studies</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="examType">Exam Type *</Label>
              <Select value={formData.examType} onValueChange={(value) => setFormData(prev => ({ ...prev, examType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEET">NEET</SelectItem>
                  <SelectItem value="JEE">JEE</SelectItem>
                  <SelectItem value="CAT">CAT</SelectItem>
                  <SelectItem value="UPSC">UPSC</SelectItem>
                  <SelectItem value="GATE">GATE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="topic">Topic/Chapter</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="e.g., Cell Biology, Mechanics"
              />
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={formData.difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setFormData(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="e.g., notes, theory, ncert"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the material content..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="fileUpload">Choose File</Label>
            <Input
              id="fileUpload"
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mp3,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && (
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Exam</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(material.type)}
                        <div>
                          <div className="font-medium">{material.name}</div>
                          <div className="text-sm text-gray-500">{material.size} • {material.uploadDate}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{material.subject}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{material.examType}</Badge>
                    </TableCell>
                    <TableCell>{material.topic}</TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(material.difficulty)}>
                        {material.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(material.status)}>
                        {material.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{material.views} views</div>
                        <div>{material.downloads} downloads</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        {material.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(material.id, 'active')}
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialUploadSystem;
