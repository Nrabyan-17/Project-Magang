
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar } from "@/components/ui/calendar";
import { PopoverContent, PopoverTrigger, Popover } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Filter, X, Plus, ArrowRight } from "lucide-react";

// Sample data (in a real app, this would come from an API)
const jobs = [
  {
    id: "job-001",
    title: "Need Reefer Truck for Seafood Delivery",
    category: "Trucking",
    status: "Open",
    origin: "Boston Harbor, MA",
    destination: "New York, NY",
    deadline: "2025-05-15",
    budget: "$1,500",
    budgetType: "Fixed"
  },
  {
    id: "job-002",
    title: "LCL Consolidation Services Needed",
    category: "Freight Forwarding",
    status: "In Bid",
    origin: "Shanghai, China",
    destination: "Los Angeles, CA",
    deadline: "2025-05-20",
    budget: "Open to Bid",
    budgetType: "Bidding"
  },
  {
    id: "job-003",
    title: "Warehouse Storage for Electronics (30 days)",
    category: "Warehouse",
    status: "Open",
    origin: "Chicago, IL",
    destination: "Chicago, IL",
    deadline: "2025-06-01",
    budget: "$2,000-$3,000",
    budgetType: "Range"
  },
  {
    id: "job-004",
    title: "Customs Brokerage for Medical Equipment",
    category: "Customs",
    status: "Closed",
    origin: "Frankfurt, Germany",
    destination: "Atlanta, GA",
    deadline: "2025-04-30",
    budget: "$800",
    budgetType: "Fixed"
  },
  {
    id: "job-005",
    title: "Express Air Freight for Automotive Parts",
    category: "Air Freight",
    status: "In Bid",
    origin: "Detroit, MI",
    destination: "Mexico City, Mexico",
    deadline: "2025-05-10",
    budget: "Open to Bid",
    budgetType: "Bidding"
  }
];

// Get status badge variant based on job status
const getStatusVariant = (status: string) => {
  switch (status) {
    case "Open":
      return "default";
    case "In Bid":
      return "secondary";
    case "Closed":
      return "outline";
    default:
      return "default";
  }
};

export default function JobList() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [budgetRange, setBudgetRange] = useState([1000, 5000]);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="h-screen" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Job & Service Requests</h1>
                <p className="text-muted-foreground">Browse and filter available logistics requests</p>
              </div>
              <Button asChild>
                <Link to="/jobs/post">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Link>
              </Button>
            </div>
            
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={70} minSize={50}>
                <div className="space-y-4 p-4">
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full grid grid-cols-4 mb-4">
                      <TabsTrigger value="all">All Jobs</TabsTrigger>
                      <TabsTrigger value="open">Open</TabsTrigger>
                      <TabsTrigger value="in-bid">In Bid</TabsTrigger>
                      <TabsTrigger value="closed">Closed</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  {jobs.map((job) => (
                    <Link to={`/jobs/${job.id}`} key={job.id}>
                      <Card className="hover:bg-accent/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <span>{job.origin}</span>
                                <ArrowRight className="w-3 h-3" />
                                <span>{job.destination}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{job.category}</Badge>
                              <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4 text-sm">
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                              <span>Deadline: {job.deadline}</span>
                            </div>
                            <div className="font-medium">
                              {job.budget}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={30} minSize={25}>
                <Card className="h-full rounded-none border-0 border-l">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Filter Jobs</CardTitle>
                      <Button variant="ghost" size="sm">
                        <X className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <div className="space-y-2">
                        {["Trucking", "Freight Forwarding", "Warehouse", "Customs", "Air Freight"].map((category) => (
                          <div className="flex items-center space-x-2" key={category}>
                            <Checkbox id={`category-${category.toLowerCase()}`} />
                            <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <div className="grid gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateRange.from ? (
                                dateRange.to ? (
                                  <>
                                    {format(dateRange.from, "LLL dd, y")} -{" "}
                                    {format(dateRange.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(dateRange.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Select date range</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              selected={dateRange}
                              onSelect={(range) => setDateRange(range as any)}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <div className="grid gap-2">
                        <div className="space-y-2">
                          <Label className="text-xs">Pickup</Label>
                          <div className="relative">
                            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-8" placeholder="Enter pickup location" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Delivery</Label>
                          <div className="relative">
                            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-8" placeholder="Enter delivery location" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Cargo Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cargo type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Cargo</SelectItem>
                          <SelectItem value="refrigerated">Refrigerated</SelectItem>
                          <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                          <SelectItem value="oversized">Oversized</SelectItem>
                          <SelectItem value="fragile">Fragile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Budget Range</Label>
                        <span className="text-sm text-muted-foreground">
                          ${budgetRange[0]} - ${budgetRange[1]}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[1000, 5000]}
                        max={10000}
                        step={100}
                        onValueChange={(values) => setBudgetRange(values)}
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Filter className="w-4 h-4 mr-2" />
                      Apply Filters
                    </Button>
                  </CardContent>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
