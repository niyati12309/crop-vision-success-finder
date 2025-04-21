
import { useState } from "react";
import { Bell, MessageSquare } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits",
  }),
  cropType: z.string().min(1, {
    message: "Please select a crop type",
  }),
});

interface SmsAlertSystemProps {
  location: string;
}

export function SmsAlertSystem({ location }: SmsAlertSystemProps) {
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      cropType: "wheat",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send the data to a server
    console.log("SMS Alert Registration:", values);
    
    // Show success toast
    toast({
      title: "SMS Alerts Activated",
      description: `You will receive alerts for ${values.cropType} in ${location}.`,
    });
    
    setIsRegistered(true);
  }

  return (
    <Card className="border-agriculture-200 shadow-md">
      <CardHeader className="bg-agriculture-50 pb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-agriculture-700" />
          <CardTitle className="text-lg text-agriculture-800">SMS Weather Alerts</CardTitle>
        </div>
        <CardDescription>
          Receive instant alerts about sudden rain or hailstorms in your area
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {isRegistered ? (
          <div className="bg-green-50 p-4 rounded-md text-center">
            <p className="text-green-700 font-medium mb-2">Alert Service Activated</p>
            <p className="text-sm text-green-600">
              You will receive SMS alerts when adverse weather conditions are detected in {location}.
            </p>
            <Button 
              variant="outline" 
              className="mt-4 border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => setIsRegistered(false)}
            >
              Update Registration
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex">
                      <MessageSquare className="h-5 w-5 mr-2 text-agriculture-600 mt-2.5" />
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                    </div>
                    <FormDescription>
                      We'll only send alerts about important weather changes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
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
                    <FormDescription>
                      We'll tailor alerts with advice specific to your crop.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-agriculture-700 hover:bg-agriculture-800">
                Activate SMS Alerts
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
