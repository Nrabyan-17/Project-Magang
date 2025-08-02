
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Calendar,
  Clock,
  FileText,
  MapPin,
  Package,
  ShieldCheck,
  TruckIcon,
  DollarSign,
  MessageSquare,
  User,
  Phone,
  Mail,
  Building,
  ArrowLeft,
  Paperclip,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample job data (in a real app, you would fetch this from an API)
const sampleJobs = {
  "job-001": {
    id: "job-001",
    title: "Need Reefer Truck for Seafood Delivery",
    category: "Trucking",
    status: "Open",
    priority: "High",
    description: "Looking for refrigerated transport for fresh seafood delivery from Boston Harbor to distributors in New York. Requires temperature control at -2°C to 0°C throughout transport. Product is time-sensitive and needs to reach destination within 8 hours of pickup for optimal freshness.",
    company: {
      name: "Atlantic Seafood Distributors",
      logo: "/placeholder.svg",
      contact: {
        name: "Michael Roberts",
        phone: "+1 (617) 555-8900",
        email: "m.roberts@atlanticseafood.example"
      }
    },
    route: {
      pickup: {
        location: "Boston Harbor Seafood Terminal, Boston, MA",
        date: "2025-05-10",
        time: "06:00 AM"
      },
      delivery: {
        location: "Manhattan Food Distribution Center, New York, NY",
        date: "2025-05-10",
        time: "02:00 PM"
      }
    },
    cargo: {
      type: "Refrigerated Perishable",
      weight: "2,800 kg",
      volume: "12 cubic meters",
      handling: "Requires careful handling. Temperature-sensitive products. Stack no more than 2 containers high."
    },
    requirements: {
      insurance: "Required - $100,000 minimum coverage",
      equipment: "Reefer truck with temperature logging capability",
      certifications: "FDA Food Transport Compliance"
    },
    budget: {
      amount: "$1,500",
      bidding: {
        allowed: true,
        deadline: "2025-05-05"
      },
      payment: "Net 15 via ACH Transfer"
    },
    documents: [
      { name: "Seafood_Handling_Instructions.pdf", size: "1.2 MB" },
      { name: "Temperature_Requirements.pdf", size: "850 KB" }
    ]
  },
  "job-002": {
    id: "job-002",
    title: "LCL Consolidation Services Needed",
    category: "Freight Forwarding",
    status: "In Bid",
    priority: "Medium",
    description: "Seeking freight forwarding partner for LCL shipment from Shanghai to Los Angeles. Multiple consignments of consumer electronics and accessories need to be consolidated for efficient shipping. Looking for a comprehensive service including pickup from multiple suppliers, consolidation, ocean freight, customs clearance, and delivery to our warehouse.",
    company: {
      name: "GlobalTech Imports",
      logo: "/placeholder.svg",
      contact: {
        name: "Sarah Chen",
        phone: "+1 (310) 555-2345",
        email: "s.chen@globaltechimports.example"
      }
    },
    route: {
      pickup: {
        location: "Multiple suppliers in Shanghai, China",
        date: "2025-05-15 to 2025-05-20",
        time: "Business hours"
      },
      delivery: {
        location: "GlobalTech Warehouse, Los Angeles, CA",
        date: "By June 15, 2025",
        time: "Business hours"
      }
    },
    cargo: {
      type: "Consumer Electronics",
      weight: "4,500 kg (estimated)",
      volume: "18 cubic meters (estimated)",
      handling: "Standard handling for electronics. Non-hazardous cargo."
    },
    requirements: {
      insurance: "Required - $250,000 coverage",
      equipment: "Standard containers with appropriate securing",
      certifications: "Licensed freight forwarder with FMC certification"
    },
    budget: {
      amount: "Open to Bid",
      bidding: {
        allowed: true,
        deadline: "2025-05-01"
      },
      payment: "50% on booking confirmation, 50% on delivery"
    },
    documents: [
      { name: "Shipping_Requirements.pdf", size: "2.3 MB" },
      { name: "Supplier_Locations.xlsx", size: "1.1 MB" }
    ]
  }
};

// Bid form schema
const bidFormSchema = z.object({
  price: z.string().min(1, { message: "Bid amount is required" }),
  message: z.string().min(10, { message: "Please provide details about your bid" }),
  estimatedDelivery: z.string().min(1, { message: "Estimated delivery date is required" })
});

export default function JobDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("description");
  
  // In a real application, you would fetch this data from an API
  const job = id ? sampleJobs[id as keyof typeof sampleJobs] : null;
  
  const form = useForm<z.infer<typeof bidFormSchema>>({
    resolver: zodResolver(bidFormSchema),
    defaultValues: {
      price: "",
      message: "",
      estimatedDelivery: ""
    }
  });
  
  const onSubmitBid = (values: z.infer<typeof bidFormSchema>) => {
    // In a real app, you would submit this data to an API
    console.log(values);
    toast({
      title: "Bid Submitted",
      description: "Your bid has been submitted successfully.",
    });
  };
  
  if (!job) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="h-screen" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 p-8 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-center">Job Not Found</CardTitle>
                <CardDescription className="text-center">
                  The job you're looking for does not exist or has been removed.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild>
                  <Link to="/jobs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Jobs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{job.title}</CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-2">
                          <Badge variant="outline">{job.category}</Badge>
                          <Badge variant={job.status === "Open" ? "default" : job.status === "In Bid" ? "secondary" : "outline"}>
                            {job.status}
                          </Badge>
                          
                          {job.priority === "High" && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              High Priority
                            </Badge>
                          )}
                        </CardDescription>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Submit Offer</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Submit Your Bid</DialogTitle>
                            <DialogDescription>
                              Please provide your bid details for "{job.title}"
                            </DialogDescription>
                          </DialogHeader>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmitBid)} className="space-y-4">
                              <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Your Bid Amount</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-8" placeholder="Enter amount" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="estimatedDelivery"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Estimated Delivery Date</FormLabel>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Describe your offer details, capabilities, and any questions you have"
                                        className="min-h-[120px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Include any special services or value-adds you can provide.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <DialogFooter>
                                <Button type="submit">Submit Bid</Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-5 w-full">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="route">Route</TabsTrigger>
                        <TabsTrigger value="cargo">Cargo</TabsTrigger>
                        <TabsTrigger value="requirements">Requirements</TabsTrigger>
                        <TabsTrigger value="budget">Budget</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="description" className="pt-4">
                        <div className="space-y-4">
                          <div className="text-sm leading-6 text-muted-foreground">
                            <FileText className="h-4 w-4 inline-block mr-2 text-primary" />
                            <span className="font-medium text-foreground">Description:</span>
                          </div>
                          <p className="text-sm leading-6">{job.description}</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="route" className="pt-4">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Pickup Location</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="flex items-start">
                                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                  <span className="text-sm">{job.route.pickup.location}</span>
                                </div>
                                <div className="flex items-start">
                                  <Calendar className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                  <span className="text-sm">{job.route.pickup.date}</span>
                                </div>
                                <div className="flex items-start">
                                  <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                  <span className="text-sm">{job.route.pickup.time}</span>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Delivery Location</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="flex items-start">
                                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                  <span className="text-sm">{job.route.delivery.location}</span>
                                </div>
                                <div className="flex items-start">
                                  <Calendar className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                  <span className="text-sm">{job.route.delivery.date}</span>
                                </div>
                                <div className="flex items-start">
                                  <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                                  <span className="text-sm">{job.route.delivery.time}</span>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="cargo" className="pt-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <div className="text-sm font-medium flex items-center">
                                <Package className="h-4 w-4 mr-2 text-primary" />
                                Cargo Type
                              </div>
                              <p className="text-sm">{job.cargo.type}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm font-medium flex items-center">
                                <TruckIcon className="h-4 w-4 mr-2 text-primary" />
                                Weight
                              </div>
                              <p className="text-sm">{job.cargo.weight}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm font-medium flex items-center">
                                <Package className="h-4 w-4 mr-2 text-primary" />
                                Volume
                              </div>
                              <p className="text-sm">{job.cargo.volume}</p>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Handling Instructions</div>
                            <p className="text-sm">{job.cargo.handling}</p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="requirements" className="pt-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center">
                                  <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                                  Insurance
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm">{job.requirements.insurance}</p>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center">
                                  <TruckIcon className="h-4 w-4 mr-2 text-primary" />
                                  Equipment
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm">{job.requirements.equipment}</p>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-primary" />
                                  Certifications
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm">{job.requirements.certifications}</p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="budget" className="pt-4">
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <DollarSign className="h-5 w-5 mr-2 text-primary" />
                              <span className="font-medium">Budget:</span>
                            </div>
                            <span className="text-xl font-semibold">{job.budget.amount}</span>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Bid Information</h4>
                              <div className="text-sm space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Accepting Bids:</span>
                                  <Badge variant={job.budget.bidding.allowed ? "default" : "outline"}>
                                    {job.budget.bidding.allowed ? "Yes" : "No"}
                                  </Badge>
                                </div>
                                {job.budget.bidding.allowed && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Bid Deadline:</span>
                                    <span>{job.budget.bidding.deadline}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Payment Information</h4>
                              <p className="text-sm">{job.budget.payment}</p>
                            </div>
                          </div>
                          
                          {job.budget.bidding.allowed && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full">
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Submit Your Bid
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Submit Your Bid</DialogTitle>
                                  <DialogDescription>
                                    Please provide your bid details for "{job.title}"
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <Form {...form}>
                                  <form onSubmit={form.handleSubmit(onSubmitBid)} className="space-y-4">
                                    <FormField
                                      control={form.control}
                                      name="price"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Your Bid Amount</FormLabel>
                                          <FormControl>
                                            <div className="relative">
                                              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                              <Input className="pl-8" placeholder="Enter amount" {...field} />
                                            </div>
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <FormField
                                      control={form.control}
                                      name="estimatedDelivery"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Estimated Delivery Date</FormLabel>
                                          <FormControl>
                                            <Input type="date" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <FormField
                                      control={form.control}
                                      name="message"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Message</FormLabel>
                                          <FormControl>
                                            <Textarea
                                              placeholder="Describe your offer details, capabilities, and any questions you have"
                                              className="min-h-[120px]"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormDescription>
                                            Include any special services or value-adds you can provide.
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <DialogFooter>
                                      <Button type="submit">Submit Bid</Button>
                                    </DialogFooter>
                                  </form>
                                </Form>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                {job.documents.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Attached Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {job.documents.map((doc, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-center">
                              <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-muted-foreground mr-3">{doc.size}</span>
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Sidebar - 1/3 width */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Posted by</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={job.company.logo} alt={job.company.name} />
                        <AvatarFallback>
                          {job.company.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{job.company.name}</h3>
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="contact">
                        <AccordionTrigger className="text-sm">
                          Contact Information
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{job.company.contact.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{job.company.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{job.company.contact.email}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="flex flex-col gap-2">
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Poster
                      </Button>
                      <Button variant="secondary">
                        <Building className="mr-2 h-4 w-4" />
                        View Company Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Job Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant={job.status === "Open" ? "default" : job.status === "In Bid" ? "secondary" : "outline"}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <Badge variant="outline">{job.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Priority</span>
                        <Badge variant={job.priority === "High" ? "destructive" : job.priority === "Medium" ? "default" : "secondary"}>
                          {job.priority}
                        </Badge>
                      </div>
                      <Separator />
                      {job.budget.bidding.allowed && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Bid Deadline</span>
                            <span className="text-sm font-medium">{job.budget.bidding.deadline}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Budget</span>
                            <span className="text-sm font-medium">{job.budget.amount}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
