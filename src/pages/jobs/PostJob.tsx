
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  CalendarIcon,
  Check,
  CheckCircle,
  ChevronRight,
  FileText,
  HelpCircle,
  MapPin,
  Package,
  Truck,
  ShieldCheck,
  DollarSign,
  Users,
  Upload,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

// Form schema
const jobFormSchema = z.object({
  basicInfo: z.object({
    title: z.string().min(10, {
      message: "Job title must be at least 10 characters",
    }),
    category: z.string({
      required_error: "Please select a category",
    }),
    description: z.string().min(30, {
      message: "Job description must be at least 30 characters",
    }),
    priority: z.enum(["high", "medium", "low"], {
      required_error: "Please select a priority level",
    }),
  }),
  routeDetails: z.object({
    pickupLocation: z.string().min(1, {
      message: "Pickup location is required",
    }),
    deliveryLocation: z.string().min(1, {
      message: "Delivery location is required",
    }),
    pickupDate: z.date({
      required_error: "Pickup date is required",
    }),
    deliveryDeadline: z.date({
      required_error: "Delivery deadline is required",
    }),
  }),
  cargoInfo: z.object({
    cargoType: z.string({
      required_error: "Please select a cargo type",
    }),
    weight: z.string().min(1, {
      message: "Weight is required",
    }),
    volume: z.string().min(1, {
      message: "Volume is required",
    }),
    specialHandling: z.string().optional(),
  }),
  serviceNeeds: z.object({
    needsInsurance: z.boolean().default(false),
    insuranceValue: z.string().optional(),
    needsTracking: z.boolean().default(false),
    needsCustoms: z.boolean().default(false),
    additionalRequirements: z.string().optional(),
  }),
  budgetInfo: z.object({
    budget: z.string().min(1, {
      message: "Budget estimate is required",
    }),
    openToBidding: z.boolean().default(true),
    biddingDeadline: z.date().optional(),
    paymentTerms: z.string({
      required_error: "Please select payment terms",
    }),
  }),
  contactInfo: z.object({
    contactName: z.string().min(1, {
      message: "Contact name is required",
    }),
    contactPhone: z.string().min(1, {
      message: "Contact phone is required",
    }),
    contactEmail: z.string().email({
      message: "Invalid email address",
    }),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  }),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

export default function PostJob() {
  const [activeStep, setActiveStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const steps = [
    { id: "basicInfo", label: "Basic Info" },
    { id: "routeDetails", label: "Route Details" },
    { id: "cargoInfo", label: "Cargo Info" },
    { id: "serviceNeeds", label: "Service Needs" },
    { id: "budgetInfo", label: "Budget & Bidding" },
    { id: "contactInfo", label: "Contact & Submit" },
  ];
  
  // Default form values
  const defaultValues: JobFormValues = {
    basicInfo: {
      title: "",
      category: "",
      description: "",
      priority: "medium",
    },
    routeDetails: {
      pickupLocation: "",
      deliveryLocation: "",
      pickupDate: new Date(),
      deliveryDeadline: new Date(),
    },
    cargoInfo: {
      cargoType: "",
      weight: "",
      volume: "",
      specialHandling: "",
    },
    serviceNeeds: {
      needsInsurance: false,
      insuranceValue: "",
      needsTracking: false,
      needsCustoms: false,
      additionalRequirements: "",
    },
    budgetInfo: {
      budget: "",
      openToBidding: true,
      biddingDeadline: undefined,
      paymentTerms: "",
    },
    contactInfo: {
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      termsAccepted: false,
    },
  };
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
    mode: "onChange",
  });
  
  const onSubmit = (data: JobFormValues) => {
    // In a real app, you would submit this data to an API
    console.log(data);
    toast({
      title: "Job Posted Successfully",
      description: "Your job request has been submitted and is now visible to partners.",
    });
    navigate("/jobs");
  };
  
  const nextStep = async () => {
    const currentStepId = steps[activeStep].id as keyof JobFormValues;
    
    // Validate the current step before proceeding
    const result = await form.trigger(currentStepId as any);
    
    if (result) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };
  
  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="h-screen" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="flex items-center mb-6">
              <Button variant="ghost" asChild className="mr-2">
                <Link to="/jobs">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Jobs
                </Link>
              </Button>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">Post a New Job / Service Request</h1>
              <p className="text-muted-foreground mb-8">
                Complete the form below to post your logistics service request to our partner network.
              </p>
              
              <div className="mb-8">
                <Tabs value={steps[activeStep].id} onValueChange={(value) => {
                  const index = steps.findIndex(step => step.id === value);
                  setActiveStep(index);
                }}>
                  <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full h-auto p-0 bg-transparent">
                    {steps.map((step, index) => (
                      <TabsTrigger
                        key={step.id}
                        value={step.id}
                        disabled={index > activeStep}
                        className={cn(
                          "flex flex-col items-center justify-center p-2 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative",
                          index < activeStep && "bg-muted text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border mb-1">
                          {index < activeStep ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <span className="text-xs hidden md:inline">{step.label}</span>
                        {index < steps.length - 1 && (
                          <ChevronRight className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              
              <Form {...form}>
                <form className="space-y-6">
                  <Card className="border-t-4 border-t-primary">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        {activeStep === 0 && <FileText className="w-5 h-5 mr-2 text-primary" />}
                        {activeStep === 1 && <MapPin className="w-5 h-5 mr-2 text-primary" />}
                        {activeStep === 2 && <Package className="w-5 h-5 mr-2 text-primary" />}
                        {activeStep === 3 && <Truck className="w-5 h-5 mr-2 text-primary" />}
                        {activeStep === 4 && <DollarSign className="w-5 h-5 mr-2 text-primary" />}
                        {activeStep === 5 && <Users className="w-5 h-5 mr-2 text-primary" />}
                        <h2 className="text-xl font-bold">{steps[activeStep].label}</h2>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {/* Basic Info */}
                      {activeStep === 0 && (
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="basicInfo.title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Need Reefer Truck for Seafood Delivery" {...field} />
                                </FormControl>
                                <FormDescription>
                                  A clear, descriptive title helps partners understand your needs quickly.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="basicInfo.category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Service Category</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="trucking">Trucking</SelectItem>
                                    <SelectItem value="freight_forwarding">Freight Forwarding</SelectItem>
                                    <SelectItem value="air_freight">Air Freight</SelectItem>
                                    <SelectItem value="sea_freight">Sea Freight</SelectItem>
                                    <SelectItem value="rail_freight">Rail Freight</SelectItem>
                                    <SelectItem value="warehouse">Warehousing</SelectItem>
                                    <SelectItem value="customs">Customs Brokerage</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="basicInfo.description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe your logistics needs in detail..."
                                    className="min-h-[120px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Include key details about your requirements, special instructions, or any additional context.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="basicInfo.priority"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Priority Level</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                  >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="high" id="high" />
                                      </FormControl>
                                      <FormLabel className="font-normal flex items-center" htmlFor="high">
                                        <AlertTriangle className="w-4 h-4 mr-1 text-destructive" />
                                        High
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="medium" id="medium" />
                                      </FormControl>
                                      <FormLabel className="font-normal" htmlFor="medium">
                                        Medium
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="low" id="low" />
                                      </FormControl>
                                      <FormLabel className="font-normal" htmlFor="low">
                                        Low
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                      
                      {/* Route Details */}
                      {activeStep === 1 && (
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="routeDetails.pickupLocation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pickup Location</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-8" placeholder="Enter full address" {...field} />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Include city, state/province, and country
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="routeDetails.deliveryLocation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Delivery Location</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-8" placeholder="Enter full address" {...field} />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Include city, state/province, and country
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="routeDetails.pickupDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Pickup Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date()
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="routeDetails.deliveryDeadline"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Delivery Deadline</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < form.getValues().routeDetails.pickupDate
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Cargo Information */}
                      {activeStep === 2 && (
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="cargoInfo.cargoType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cargo Type</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select cargo type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="general">General Cargo</SelectItem>
                                    <SelectItem value="refrigerated">Refrigerated</SelectItem>
                                    <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                                    <SelectItem value="oversized">Oversized</SelectItem>
                                    <SelectItem value="fragile">Fragile</SelectItem>
                                    <SelectItem value="perishable">Perishable</SelectItem>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="vehicles">Vehicles</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="cargoInfo.weight"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Weight</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 2,000 kg" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Include unit (kg, tons, lbs)
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cargoInfo.volume"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Volume</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 10 cubic meters" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Include unit (cubic meters, cubic feet)
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="cargoInfo.specialHandling"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Special Handling Instructions</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any specific handling requirements or precautions..."
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Include any temperature requirements, stacking limitations, etc.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="bg-muted/50 p-4 rounded-md flex items-start space-x-2">
                            <Upload className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">Upload cargo photos or documentation</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                Optional: Add photos or specifications to help service providers understand your needs better.
                              </p>
                              <Button size="sm" variant="outline" className="mt-2">
                                Upload Files
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Service Needs */}
                      {activeStep === 3 && (
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="serviceNeeds.needsInsurance"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    Insurance Required
                                  </FormLabel>
                                  <FormDescription>
                                    Provider must include cargo insurance in their service
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          {form.watch("serviceNeeds.needsInsurance") && (
                            <FormField
                              control={form.control}
                              name="serviceNeeds.insuranceValue"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Required Insurance Value</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-8" placeholder="e.g., $50,000" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormDescription>
                                    Minimum insurance coverage required
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          
                          <FormField
                            control={form.control}
                            name="serviceNeeds.needsTracking"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Tracking Integration</FormLabel>
                                  <FormDescription>
                                    Provider must offer real-time shipment tracking
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="serviceNeeds.needsCustoms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Customs Handling</FormLabel>
                                  <FormDescription>
                                    Provider must handle customs clearance and documentation
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="serviceNeeds.additionalRequirements"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Service Requirements</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any other service requirements or certifications needed..."
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Include any special equipment, certifications, or additional services needed
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                      
                      {/* Budget & Bidding */}
                      {activeStep === 4 && (
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="budgetInfo.budget"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Budget Estimate</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-8" placeholder="Enter amount or range" {...field} />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  You can specify a fixed amount (e.g., $1,500) or a range (e.g., $1,000-$1,500)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="budgetInfo.openToBidding"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Open for Bidding</FormLabel>
                                  <FormDescription>
                                    Allow service providers to submit their own price offers
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          {form.watch("budgetInfo.openToBidding") && (
                            <FormField
                              control={form.control}
                              name="budgetInfo.biddingDeadline"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Bidding Deadline</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date()
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormDescription>
                                    Last day for service providers to submit bids
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          
                          <FormField
                            control={form.control}
                            name="budgetInfo.paymentTerms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Payment Terms</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select payment terms" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="net15">Net 15</SelectItem>
                                    <SelectItem value="net30">Net 30</SelectItem>
                                    <SelectItem value="net45">Net 45</SelectItem>
                                    <SelectItem value="net60">Net 60</SelectItem>
                                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                                    <SelectItem value="advance">50% Advance, 50% on Completion</SelectItem>
                                    <SelectItem value="escrow">Escrow</SelectItem>
                                    <SelectItem value="other">Other (specify in notes)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  How and when payment will be processed
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                      
                      {/* Contact & Submission */}
                      {activeStep === 5 && (
                        <div className="space-y-6">
                          <div className="bg-muted/50 border p-4 rounded-md mb-6">
                            <h3 className="text-sm font-medium mb-2">Job Summary</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Title:</span>
                                <span className="font-medium">{form.watch("basicInfo.title") || "Not specified"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Category:</span>
                                <span className="font-medium capitalize">{form.watch("basicInfo.category").replace('_', ' ') || "Not specified"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Priority:</span>
                                <span className="font-medium capitalize">{form.watch("basicInfo.priority") || "Not specified"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Budget:</span>
                                <span className="font-medium">{form.watch("budgetInfo.budget") || "Not specified"}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="contactInfo.contactName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Contact Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your full name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="contactInfo.contactPhone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Contact Phone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your phone number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="contactInfo.contactEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Your email address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="contactInfo.termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    I agree to the terms of service and privacy policy
                                  </FormLabel>
                                  <FormDescription>
                                    By submitting this job request, you agree to our platform's terms and conditions.
                                  </FormDescription>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="bg-muted/30 p-4 rounded-md flex items-start space-x-2">
                            <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">Need help?</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                If you have any questions about posting a job, contact our support team for assistance.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={activeStep === 0}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={nextStep}
                    >
                      {activeStep === steps.length - 1 ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Submit Job
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
