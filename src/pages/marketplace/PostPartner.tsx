
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Building2,
  MapPin, 
  Globe, 
  Mail, 
  Phone,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PostPartner() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formStep, setFormStep] = useState("basic");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Partner profile created",
      description: "Your logistics company profile has been submitted successfully.",
    });
    navigate("/marketplace/search");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="h-screen" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/marketplace/search")}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Partners
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Create Logistics Partner Profile</h1>
                <p className="text-muted-foreground">Showcase your logistics services to potential clients</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <Tabs value={formStep} onValueChange={setFormStep} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="locations">Locations</TabsTrigger>
                  <TabsTrigger value="contact">Contact & Verification</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company-name">Company Name</Label>
                          <Input id="company-name" placeholder="Enter your logistics company name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-type">Company Type</Label>
                          <Select>
                            <SelectTrigger id="company-type">
                              <SelectValue placeholder="Select company type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="freight-forwarding">Freight Forwarding</SelectItem>
                              <SelectItem value="trucking">Trucking</SelectItem>
                              <SelectItem value="sea-freight">Sea Freight</SelectItem>
                              <SelectItem value="air-freight">Air Freight</SelectItem>
                              <SelectItem value="warehousing">Warehousing</SelectItem>
                              <SelectItem value="customs">Customs Broker</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company-description">Company Description</Label>
                        <Textarea
                          id="company-description"
                          placeholder="Describe your logistics services and specialties"
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="founded-year">Year Founded</Label>
                          <Input id="founded-year" type="number" placeholder="e.g. 2010" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-size">Company Size</Label>
                          <Select>
                            <SelectTrigger id="company-size">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-500">201-500 employees</SelectItem>
                              <SelectItem value="501+">501+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="website" className="pl-8" placeholder="https://yourlogistics.com" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setFormStep("services")}>
                      Next: Services
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="services" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Services & Expertise</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Primary Services</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Trucking", "Sea Freight", "Air Freight", "Warehousing",
                            "Customs Clearance", "Last Mile Delivery", "Value-Added Services", 
                            "Refrigerated Transport", "Oversized Cargo", "Hazardous Materials"
                          ].map((service) => (
                            <div key={service} className="flex items-center space-x-2 border rounded-md p-2">
                              <input type="checkbox" id={`service-${service}`} className="rounded text-primary" />
                              <Label htmlFor={`service-${service}`} className="cursor-pointer">{service}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service-description">Detailed Service Description</Label>
                        <Textarea
                          id="service-description"
                          placeholder="Provide detailed information about your services and expertise"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Certifications & Compliance</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "ISO 9001", "ISO 14001", "CTPAT", "AEO", "IATA",
                            "FIATA", "GDP", "TAPA"
                          ].map((cert) => (
                            <div key={cert} className="flex items-center space-x-2 border rounded-md p-2">
                              <input type="checkbox" id={`cert-${cert}`} className="rounded text-primary" />
                              <Label htmlFor={`cert-${cert}`} className="cursor-pointer">{cert}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setFormStep("basic")}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setFormStep("locations")}>
                      Next: Locations
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="locations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Service Areas & Locations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Service Regions</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "North America", "South America", "Europe", "Asia",
                            "Africa", "Australia/Oceania", "Middle East"
                          ].map((region) => (
                            <div key={region} className="flex items-center space-x-2 border rounded-md p-2">
                              <input type="checkbox" id={`region-${region}`} className="rounded text-primary" />
                              <Label htmlFor={`region-${region}`} className="cursor-pointer">{region}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="headquarters">Headquarters Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input id="headquarters" className="pl-8" placeholder="City, Country" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Branch Offices</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="relative flex-1">
                              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-8" placeholder="Branch location" />
                            </div>
                            <Button type="button" variant="outline" size="sm">Add</Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              New York, USA <Button variant="ghost" size="sm" className="h-4 w-4 p-0">×</Button>
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              London, UK <Button variant="ghost" size="sm" className="h-4 w-4 p-0">×</Button>
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setFormStep("services")}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setFormStep("contact")}>
                      Next: Contact
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact & Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contact-name">Contact Person</Label>
                          <Input id="contact-name" placeholder="Full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-title">Job Title</Label>
                          <Input id="contact-title" placeholder="e.g. Logistics Manager" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contact-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="contact-email" className="pl-8" type="email" placeholder="contact@company.com" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-phone">Phone</Label>
                          <div className="relative">
                            <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="contact-phone" className="pl-8" placeholder="+1 234 567 8900" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="membership">Membership Type</Label>
                        <Select>
                          <SelectTrigger id="membership">
                            <SelectValue placeholder="Select membership" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setFormStep("locations")}>
                      Back
                    </Button>
                    <Button type="submit">Submit Profile</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
