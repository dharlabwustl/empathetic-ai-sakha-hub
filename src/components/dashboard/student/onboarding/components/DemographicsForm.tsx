
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

// Institute names for dropdown
const institutes = [
  "Allen Career Institute",
  "Aakash Institute",
  "FIITJEE",
  "Resonance",
  "Vidyamandir Classes",
  "Career Point",
  "Narayana IIT Academy",
  "Sri Chaitanya",
  "BASE Educational Services",
  "Brilliant Tutorials",
  "Motion Education",
  "Bansal Classes",
  "Other"
];

interface DemographicsFormProps {
  form: any;
  onNext: () => void;
}

const DemographicsForm: React.FC<DemographicsFormProps> = ({ form, onNext }) => {
  const [customInstitute, setCustomInstitute] = useState(false);
  
  const handleInstituteSelect = (value: string) => {
    if (value === "Other") {
      setCustomInstitute(true);
      form.setValue("institute", "");
    } else {
      setCustomInstitute(false);
      form.setValue("institute", value);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your age" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="prefer-not-to-say" />
                    </FormControl>
                    <FormLabel className="font-normal">Prefer not to say</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute (Optional)</FormLabel>
              <FormControl>
                {customInstitute ? (
                  <Input 
                    placeholder="Enter your institute name" 
                    {...field}
                  />
                ) : (
                  <Select onValueChange={handleInstituteSelect} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your institute" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutes.map(institute => (
                        <SelectItem key={institute} value={institute}>
                          {institute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormDescription>
                Select your coaching institute (if applicable)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="border-t pt-4">
        <FormField
          control={form.control}
          name="shareDataConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I allow my anonymized study data to be used to improve the platform
                </FormLabel>
                <FormDescription>
                  This helps us provide better recommendations and study plans
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DemographicsForm;
