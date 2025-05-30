import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreditPack } from '@/types/academic';
import { useToast } from '@/hooks/use-toast';

const PlansManagement = () => {
  const [creditPacks, setCreditPacks] = useState<CreditPack[]>([]);
  const [newPack, setNewPack] = useState<CreditPack>({
    id: '',
    name: '',
    credits: 0,
    price: 0,
    description: '',
  });
  const [editingPackId, setEditingPackId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load credit packs from local storage on component mount
    const storedPacks = localStorage.getItem('creditPacks');
    if (storedPacks) {
      setCreditPacks(JSON.parse(storedPacks));
    }
  }, []);

  useEffect(() => {
    // Save credit packs to local storage whenever they change
    localStorage.setItem('creditPacks', JSON.stringify(creditPacks));
  }, [creditPacks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPack(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPack(prev => ({ ...prev, [name]: Number(value) }));
  };

  const addCreditPack = () => {
    if (!newPack.name || !newPack.description || !newPack.credits || !newPack.price) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newId = Date.now().toString();
    const packToAdd: CreditPack = { ...newPack, id: newId };
    setCreditPacks(prev => [...prev, packToAdd]);
    setNewPack({ id: '', name: '', credits: 0, price: 0, description: '' });

    toast({
      title: "Success",
      description: "Credit pack added successfully.",
    });
  };

  const startEditing = (packId: string) => {
    setEditingPackId(packId);
    const packToEdit = creditPacks.find(pack => pack.id === packId);
    if (packToEdit) {
      setNewPack({ ...packToEdit });
    }
  };

  const cancelEditing = () => {
    setEditingPackId(null);
    setNewPack({ id: '', name: '', credits: 0, price: 0, description: '' });
  };

  const updateCreditPack = () => {
    if (!newPack.name || !newPack.description || !newPack.credits || !newPack.price) {
       toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedPacks = creditPacks.map(pack =>
      pack.id === newPack.id ? { ...newPack } : pack
    );
    setCreditPacks(updatedPacks);
    setEditingPackId(null);
    setNewPack({ id: '', name: '', credits: 0, price: 0, description: '' });

    toast({
      title: "Success",
      description: "Credit pack updated successfully.",
    });
  };

  const deleteCreditPack = (packId: string) => {
    setCreditPacks(prev => prev.filter(pack => pack.id !== packId));

    toast({
      title: "Success",
      description: "Credit pack deleted successfully.",
    });
  };

  const renderCreditPackCard = (pack: CreditPack) => {
    return (
      <div key={pack.id} className="premium-card p-4">
        <h3 className="font-semibold">{pack.name}</h3>
        <p className="text-sm text-gray-600">{pack.description}</p>
        <div className="mt-2">
          <span className="text-lg font-bold">${pack.price}</span>
          <span className="text-sm text-gray-500"> / {pack.credits} credits</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Credit Packs Management</h2>

      {/* Add/Edit Credit Pack Form */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">{editingPackId ? 'Edit Credit Pack' : 'Add New Credit Pack'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={newPack.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="credits">Credits</Label>
            <Input
              type="number"
              id="credits"
              name="credits"
              value={newPack.credits.toString()}
              onChange={handleNumberInputChange}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={newPack.price.toString()}
              onChange={handleNumberInputChange}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={newPack.description}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        <div className="mt-4">
          {editingPackId ? (
            <>
              <Button type="button" onClick={updateCreditPack} className="mr-2">
                Update Credit Pack
              </Button>
              <Button type="button" variant="ghost" onClick={cancelEditing}>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="button" onClick={addCreditPack}>
              Add Credit Pack
            </Button>
          )}
        </div>
      </div>

      {/* Credit Packs List */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Credit Packs</h3>
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditPacks.map((pack) => (
              <TableRow key={pack.id}>
                <TableCell>{pack.name}</TableCell>
                <TableCell>{pack.credits}</TableCell>
                <TableCell>${pack.price}</TableCell>
                <TableCell>{pack.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => startEditing(pack.id)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteCreditPack(pack.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PlansManagement;
