
import { useState } from "react";
import { Droplet, Wheat } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  cropType: z.string().min(1, {
    message: "Please select a crop type",
  }),
  areaSize: z.string().transform(val => Number(val)),
  growthStage: z.string().min(1, {
    message: "Please select a growth stage",
  }),
});

// Simplified crop water coefficients (Kc values) by growth stage
const cropWaterNeeds = {
  wheat: { initial: 0.3, development: 0.7, middle: 1.15, late: 0.4 },
  corn: { initial: 0.3, development: 0.7, middle: 1.2, late: 0.6 },
  rice: { initial: 1.05, development: 1.2, middle: 1.3, late: 0.9 },
  cotton: { initial: 0.35, development: 0.7, middle: 1.2, late: 0.7 },
  sugarcane: { initial: 0.4, development: 0.9, middle: 1.25, late: 0.75 },
  soybean: { initial: 0.4, development: 0.8, middle: 1.15, late: 0.5 },
};

export function WaterRequirementCalculator() {
  const [waterRequirement, setWaterRequirement] = useState<number | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: "wheat",
      areaSize: "1",
      growthStage: "initial",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Basic water requirement calculation (simplified model)
    // Real calculations would include more factors like temperature, soil type, etc.
    const crop = values.cropType as keyof typeof cropWaterNeeds;
    const stage = values.growthStage as keyof typeof cropWaterNeeds.wheat;
    const coefficient = cropWaterNeeds[crop][stage];
    
    // Base water need in liters per square meter per day
    const baseWaterNeed = 5; 
    
    // Calculate water requirement
    const calculatedRequirement = baseWaterNeed * coefficient * values.areaSize;
    setWaterRequirement(Math.round(calculatedRequirement));
  }

  return (
    <Card className="border-agriculture-200 shadow-md">
      <CardHeader className="bg-agriculture-50 pb-4">
        <div className="flex items-center gap-2">
          <Droplet className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-lg text-agriculture-800">Water Requirement Calculator</CardTitle>
        </div>
        <CardDescription>
          Estimate the daily water needs for your crops based on type and growth stage
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cropType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop Type</FormLabel>
                  <div className="flex">
                    <Wheat className="h-5 w-5 mr-2 text-agriculture-600 mt-2.5" />
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        <option value="wheat">Wheat</option>
                        <option value="corn">Corn</option>
                        <option value="rice">Rice</option>
                        <option value="cotton">Cotton</option>
                        <option value="sugarcane">Sugarcane</option>
                        <option value="soybean">Soybean</option>
                      </select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="areaSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Size (hectares)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0.1" step="0.1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the size of your field in hectares
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="growthStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Growth Stage</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option value="initial">Initial Stage</option>
                      <option value="development">Development Stage</option>
                      <option value="middle">Middle Season</option>
                      <option value="late">Late Season</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    Different growth stages require different amounts of water
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Calculate Water Requirement
            </Button>
          </form>
        </Form>
      </CardContent>
      
      {waterRequirement !== null && (
        <CardFooter className="flex flex-col p-4 bg-blue-50 border-t border-blue-100">
          <h4 className="text-lg font-medium text-blue-800 mb-2">Estimated Water Requirement</h4>
          <div className="flex items-center justify-center w-full bg-white p-4 rounded-md shadow-inner">
            <Droplet className="h-6 w-6 text-blue-500 mr-2" />
            <span className="text-2xl font-bold text-blue-700">{waterRequirement.toLocaleString()}</span>
            <span className="ml-2 text-blue-600">liters per day</span>
          </div>
          <p className="text-xs text-blue-600 mt-3 text-center">
            This is an estimate based on typical crop water needs. Actual requirements may vary 
            based on local climate conditions, soil type, and irrigation method.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
