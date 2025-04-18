
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  User, Mail, Phone, MapPin, GraduationCap, Users,
  Calendar, RefreshCw, CheckCircle, XCircle, Upload, CreditCard
} from "lucide-react";
import { UserProfileType } from "@/types/user/base";
import { individualPlans } from "@/components/pricing/pricingData";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  examTarget: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional()
});

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userProfile, onUpdateProfile }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(userProfile.avatar || null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: userProfile.name || "",
      email: userProfile.email || "",
      phone: userProfile.phoneNumber || "",
      city: "",
      state: "",
      country: "",
      examTarget: userProfile.examPreparation || "",
      guardianName: "",
      guardianPhone: ""
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const updatedProfile: Partial<UserProfileType> = {
      name: data.fullName,
      phoneNumber: data.phone,
      examPreparation: data.examTarget
    };

    if (imageFile) {
      // In a real app, we would upload the file to a server
      // For now, we'll just use the preview as the avatar
      updatedProfile.avatar = imagePreview as string;
    }

    onUpdateProfile(updatedProfile);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditMode(false);
  };

  // For demonstration, we'll use the first plan as the current subscription
  const currentPlan = individualPlans[0];
  const today = new Date();
  const renewalDate = new Date(today.setMonth(today.getMonth() + 1));

  const handleUpgrade = () => {
    navigate("/pricing");
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Confirm Cancellation",
      description: "Please contact support to cancel your subscription.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Profile Details</h2>
          <p className="text-muted-foreground">Manage your account information and subscription</p>
        </div>
        {!isEditMode ? (
          <Button onClick={() => setIsEditMode(true)}>Edit Profile</Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditMode(false)}>Cancel</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditMode ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring">
                            <User className="ml-2 h-5 w-5 text-gray-400" />
                            <Input className="border-0 focus-visible:ring-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring">
                            <Mail className="ml-2 h-5 w-5 text-gray-400" />
                            <Input className="border-0 focus-visible:ring-0" {...field} disabled />
                          </div>
                        </FormControl>
                        <FormDescription>
                          You cannot change your email address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring">
                            <Phone className="ml-2 h-5 w-5 text-gray-400" />
                            <Input className="border-0 focus-visible:ring-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="examTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Target</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring">
                            <GraduationCap className="ml-2 h-5 w-5 text-gray-400" />
                            <Input className="border-0 focus-visible:ring-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator className="my-4" />
                  
                  <h3 className="text-lg font-medium mb-2">Parent/Guardian Details (Optional)</h3>
                  
                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring">
                            <Users className="ml-2 h-5 w-5 text-gray-400" />
                            <Input className="border-0 focus-visible:ring-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guardianPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Phone</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring">
                            <Phone className="ml-2 h-5 w-5 text-gray-400" />
                            <Input className="border-0 focus-visible:ring-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsEditMode(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{userProfile.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{userProfile.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{userProfile.phoneNumber || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{"Not provided"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Exam Target</p>
                        <p className="font-medium">{userProfile.examPreparation || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium mb-2">Parent/Guardian Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Guardian Name</p>
                        <p className="font-medium">{"Not provided"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Guardian Phone</p>
                        <p className="font-medium">{"Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile image</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              {isEditMode && (
                <label 
                  htmlFor="picture-upload" 
                  className="absolute bottom-0 right-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white cursor-pointer shadow-lg"
                >
                  <Upload size={16} />
                </label>
              )}
            </div>
            {isEditMode && (
              <div className="text-center">
                <input 
                  id="picture-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
                <label 
                  htmlFor="picture-upload" 
                  className="inline-block px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                >
                  Upload New Picture
                </label>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Subscription Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Manage your subscription details</CardDescription>
          </div>
          <CreditCard className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-gradient-to-r from-sky-500 to-indigo-500">{currentPlan.title}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {currentPlan.price}{currentPlan.period}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Billing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Billing Start Date</p>
                      <p className="font-medium">{format(new Date(), 'PPP')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Next Renewal</p>
                      <p className="font-medium">{format(renewalDate, 'PPP')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Plan Features</h3>
              <ul className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    {feature.included ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-300" />
                    )}
                    <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button onClick={handleUpgrade}>Upgrade Plan</Button>
                <Button variant="outline" onClick={handleCancelSubscription}>Cancel Subscription</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetails;
