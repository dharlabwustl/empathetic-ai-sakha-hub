
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Home, 
  MapPin, 
  Wifi, 
  Volume2, 
  Lightbulb, 
  Plus, 
  Edit, 
  Trash2,
  Heart,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Influence {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  category: 'family' | 'friends' | 'environment' | 'technology' | 'other';
  title: string;
  description: string;
  impact: number; // 1-10 scale
  frequency: 'daily' | 'weekly' | 'occasionally' | 'rarely';
}

const SurroundingInfluencesSection: React.FC = () => {
  const { toast } = useToast();
  const [influences, setInfluences] = useState<Influence[]>([
    {
      id: '1',
      type: 'positive',
      category: 'family',
      title: 'Family Support',
      description: 'My family encourages my studies and provides a quiet environment',
      impact: 8,
      frequency: 'daily'
    },
    {
      id: '2',
      type: 'negative',
      category: 'technology',
      title: 'Social Media Distraction',
      description: 'Instagram and TikTok often distract me during study time',
      impact: 6,
      frequency: 'daily'
    }
  ]);

  const [editingInfluence, setEditingInfluence] = useState<Influence | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddInfluence = (newInfluence: Omit<Influence, 'id'>) => {
    const influence: Influence = {
      ...newInfluence,
      id: Date.now().toString()
    };
    setInfluences([...influences, influence]);
    setIsAddingNew(false);
    toast({
      title: "Influence Added",
      description: "New surrounding influence has been recorded"
    });
  };

  const handleUpdateInfluence = (updatedInfluence: Influence) => {
    setInfluences(influences.map(inf => 
      inf.id === updatedInfluence.id ? updatedInfluence : inf
    ));
    setEditingInfluence(null);
    toast({
      title: "Influence Updated",
      description: "Influence details have been updated"
    });
  };

  const handleDeleteInfluence = (id: string) => {
    setInfluences(influences.filter(inf => inf.id !== id));
    toast({
      title: "Influence Removed",
      description: "Influence has been removed from your list"
    });
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 8) return 'text-red-600';
    if (impact >= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'positive': return <Heart className="h-4 w-4 text-green-500" />;
      case 'negative': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'family': return <Users className="h-4 w-4" />;
      case 'friends': return <Users className="h-4 w-4" />;
      case 'environment': return <Home className="h-4 w-4" />;
      case 'technology': return <Wifi className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const InfluenceForm: React.FC<{
    influence?: Influence;
    onSubmit: (influence: Influence | Omit<Influence, 'id'>) => void;
    onCancel: () => void;
  }> = ({ influence, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      type: influence?.type || 'neutral' as const,
      category: influence?.category || 'other' as const,
      title: influence?.title || '',
      description: influence?.description || '',
      impact: influence?.impact || 5,
      frequency: influence?.frequency || 'occasionally' as const
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (influence) {
        onSubmit({ ...influence, ...formData });
      } else {
        onSubmit(formData);
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {influence ? 'Edit Influence' : 'Add New Influence'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="family">Family</option>
                  <option value="friends">Friends</option>
                  <option value="environment">Environment</option>
                  <option value="technology">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="impact">Impact Level (1-10)</Label>
                <Input
                  id="impact"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.impact}
                  onChange={(e) => setFormData({...formData, impact: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <select
                  id="frequency"
                  value={formData.frequency}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value as any})}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="occasionally">Occasionally</option>
                  <option value="rarely">Rarely</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {influence ? 'Update' : 'Add'} Influence
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Surrounding Influences
            </CardTitle>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Influence
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="negative">Negative</TabsTrigger>
              <TabsTrigger value="neutral">Neutral</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              {influences.map((influence) => (
                <Card key={influence.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(influence.type)}
                          {getCategoryIcon(influence.category)}
                          <h3 className="font-medium">{influence.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {influence.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{influence.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`font-medium ${getImpactColor(influence.impact)}`}>
                            Impact: {influence.impact}/10
                          </span>
                          <span className="text-gray-500">
                            Frequency: {influence.frequency}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingInfluence(influence)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteInfluence(influence.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="positive" className="space-y-4 mt-4">
              {influences.filter(inf => inf.type === 'positive').map((influence) => (
                <Card key={influence.id} className="border-l-4 border-l-green-500">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(influence.type)}
                          {getCategoryIcon(influence.category)}
                          <h3 className="font-medium">{influence.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {influence.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{influence.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`font-medium ${getImpactColor(influence.impact)}`}>
                            Impact: {influence.impact}/10
                          </span>
                          <span className="text-gray-500">
                            Frequency: {influence.frequency}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingInfluence(influence)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteInfluence(influence.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="negative" className="space-y-4 mt-4">
              {influences.filter(inf => inf.type === 'negative').map((influence) => (
                <Card key={influence.id} className="border-l-4 border-l-red-500">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(influence.type)}
                          {getCategoryIcon(influence.category)}
                          <h3 className="font-medium">{influence.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {influence.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{influence.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`font-medium ${getImpactColor(influence.impact)}`}>
                            Impact: {influence.impact}/10
                          </span>
                          <span className="text-gray-500">
                            Frequency: {influence.frequency}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingInfluence(influence)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteInfluence(influence.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="neutral" className="space-y-4 mt-4">
              {influences.filter(inf => inf.type === 'neutral').map((influence) => (
                <Card key={influence.id} className="border-l-4 border-l-gray-500">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(influence.type)}
                          {getCategoryIcon(influence.category)}
                          <h3 className="font-medium">{influence.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {influence.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{influence.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`font-medium ${getImpactColor(influence.impact)}`}>
                            Impact: {influence.impact}/10
                          </span>
                          <span className="text-gray-500">
                            Frequency: {influence.frequency}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingInfluence(influence)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteInfluence(influence.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isAddingNew && (
        <InfluenceForm
          onSubmit={handleAddInfluence}
          onCancel={() => setIsAddingNew(false)}
        />
      )}

      {editingInfluence && (
        <InfluenceForm
          influence={editingInfluence}
          onSubmit={handleUpdateInfluence}
          onCancel={() => setEditingInfluence(null)}
        />
      )}
    </div>
  );
};

export default SurroundingInfluencesSection;
