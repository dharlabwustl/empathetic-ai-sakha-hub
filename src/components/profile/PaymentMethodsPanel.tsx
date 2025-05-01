
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
  DialogHeader, DialogFooter, DialogTrigger
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreditCard, Trash2, Plus, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "paypal";
  label: string;
  isDefault: boolean;
  lastDigits?: string;
  expiryDate?: string;
  cardType?: string;
  upiId?: string;
  email?: string;
}

const PaymentMethodsPanel: React.FC = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card-1",
      type: "card",
      label: "HDFC Bank",
      lastDigits: "4242",
      expiryDate: "04/25",
      cardType: "Visa",
      isDefault: true
    },
    {
      id: "upi-1",
      type: "upi",
      label: "Google Pay",
      upiId: "user@okaxis",
      isDefault: false
    }
  ]);
  
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [showAddUpiDialog, setShowAddUpiDialog] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    nickname: ""
  });
  
  const [newUpi, setNewUpi] = useState({
    upiId: "",
    nickname: ""
  });
  
  const handleNewCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard({
      ...newCard,
      [name]: value
    });
  };
  
  const handleNewUpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUpi({
      ...newUpi,
      [name]: value
    });
  };
  
  const handleAddCard = () => {
    // Basic validation
    if (!newCard.cardNumber || !newCard.cardholderName || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv) {
      toast({
        title: "Missing information",
        description: "Please fill out all required card fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send data to a payment processor
    const last4 = newCard.cardNumber.slice(-4);
    const expiryDate = `${newCard.expiryMonth}/${newCard.expiryYear.slice(-2)}`;
    
    const newPaymentMethod: PaymentMethod = {
      id: `card-${Date.now()}`,
      type: "card",
      label: newCard.nickname || `Card ending in ${last4}`,
      lastDigits: last4,
      expiryDate: expiryDate,
      cardType: "Visa", // This would be determined by the payment processor
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    
    toast({
      title: "Card added",
      description: "Your new payment method has been added successfully."
    });
    
    // Reset form and close dialog
    setNewCard({
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      nickname: ""
    });
    setShowAddCardDialog(false);
  };
  
  const handleAddUpi = () => {
    // Basic validation
    if (!newUpi.upiId) {
      toast({
        title: "Missing information",
        description: "Please enter a UPI ID.",
        variant: "destructive"
      });
      return;
    }
    
    const newPaymentMethod: PaymentMethod = {
      id: `upi-${Date.now()}`,
      type: "upi",
      label: newUpi.nickname || `UPI: ${newUpi.upiId}`,
      upiId: newUpi.upiId,
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    
    toast({
      title: "UPI added",
      description: "Your UPI ID has been added successfully."
    });
    
    // Reset form and close dialog
    setNewUpi({
      upiId: "",
      nickname: ""
    });
    setShowAddUpiDialog(false);
  };
  
  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated."
    });
  };
  
  const handleRemovePaymentMethod = (id: string) => {
    const methodToRemove = paymentMethods.find(method => method.id === id);
    
    if (methodToRemove?.isDefault && paymentMethods.length > 1) {
      toast({
        title: "Cannot remove default payment method",
        description: "Please set another payment method as default first.",
        variant: "destructive"
      });
      return;
    }
    
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully."
    });
  };
  
  // Helper function to mask card number
  const maskCardNumber = (lastDigits?: string) => {
    if (!lastDigits) return "••••";
    return `•••• •••• •••• ${lastDigits}`;
  };
  
  const getMonthOptions = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const month = i.toString().padStart(2, '0');
      months.push(
        <option key={month} value={month}>{month}</option>
      );
    }
    return months;
  };
  
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      const year = (currentYear + i).toString();
      years.push(
        <option key={year} value={year}>{year}</option>
      );
    }
    return years;
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Payment Methods</h2>
        <div className="flex gap-2">
          <Dialog open={showAddCardDialog} onOpenChange={setShowAddCardDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Payment Card</DialogTitle>
                <DialogDescription>
                  Add a new credit or debit card for subscription payments.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={newCard.cardNumber}
                    onChange={handleNewCardChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    name="cardholderName"
                    value={newCard.cardholderName}
                    onChange={handleNewCardChange}
                    placeholder="Name as it appears on card"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Expiry Month</Label>
                    <select
                      id="expiryMonth"
                      name="expiryMonth"
                      value={newCard.expiryMonth}
                      onChange={(e) => setNewCard({...newCard, expiryMonth: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="" disabled>Month</option>
                      {getMonthOptions()}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">Expiry Year</Label>
                    <select
                      id="expiryYear"
                      name="expiryYear"
                      value={newCard.expiryYear}
                      onChange={(e) => setNewCard({...newCard, expiryYear: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="" disabled>Year</option>
                      {getYearOptions()}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={newCard.cvv}
                      onChange={handleNewCardChange}
                      placeholder="123"
                      maxLength={4}
                      type="password"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nickname">Nickname (Optional)</Label>
                  <Input
                    id="nickname"
                    name="nickname"
                    value={newCard.nickname}
                    onChange={handleNewCardChange}
                    placeholder="e.g., Personal Card"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddCardDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCard}>
                  Add Card
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showAddUpiDialog} onOpenChange={setShowAddUpiDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add UPI
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add UPI ID</DialogTitle>
                <DialogDescription>
                  Add a UPI ID for subscription payments.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    name="upiId"
                    value={newUpi.upiId}
                    onChange={handleNewUpiChange}
                    placeholder="yourname@bankcode"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nickname">Nickname (Optional)</Label>
                  <Input
                    id="nickname"
                    name="nickname"
                    value={newUpi.nickname}
                    onChange={handleNewUpiChange}
                    placeholder="e.g., Google Pay"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddUpiDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUpi}>
                  Add UPI
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {paymentMethods.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No payment methods</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't added any payment methods yet.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddCardDialog(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Card
              </Button>
              <Button variant="outline" onClick={() => setShowAddUpiDialog(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add UPI
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <Card key={method.id} className={`${method.isDefault ? 'border-primary' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {method.type === 'card' ? (
                      <div className="h-12 w-16 bg-primary/10 rounded-md flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                    ) : (
                      <div className="h-12 w-16 bg-green-100 rounded-md flex items-center justify-center">
                        <span className="text-green-700 font-bold">UPI</span>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium">{method.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {method.type === 'card' 
                          ? `${method.cardType} ${maskCardNumber(method.lastDigits)}`
                          : method.upiId}
                      </p>
                      
                      {method.type === 'card' && method.expiryDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Expires: {method.expiryDate}
                        </p>
                      )}
                      
                      {method.isDefault && (
                        <div className="mt-1">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Default
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Set as default
                      </Button>
                    )}
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove this payment method?
                            {method.isDefault && " This is your default payment method."}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleRemovePaymentMethod(method.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsPanel;
