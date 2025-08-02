
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Building2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

// Sample data (in real app, this would come from an API)
const companies = [
  {
    id: 1,
    name: "Global Freight Solutions",
    type: "Freight Forwarding",
    area: "North America",
    membership: "premium",
    rating: 4.8,
    description: "Specialized in international freight forwarding and customs clearance",
    location: "New York, USA"
  },
  {
    id: 2,
    name: "FastTrack Logistics",
    type: "Trucking",
    area: "Europe",
    membership: "free",
    rating: 4.2,
    description: "Regional trucking and distribution services",
    location: "Berlin, Germany"
  },
  {
    id: 3,
    name: "SeaCargo Express",
    type: "Sea Freight",
    area: "Asia Pacific",
    membership: "premium",
    rating: 4.9,
    description: "Expert in sea freight and container shipping",
    location: "Singapore"
  }
];

export default function SearchPartners() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="h-screen" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Search Partners</h1>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={25} minSize={20}>
                <Card className="h-full">
                  <CardHeader>
                    <h2 className="text-lg font-semibold">Filters</h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Company Type</Label>
                      <RadioGroup defaultValue="all">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="all" />
                            <Label htmlFor="all">All Types</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="trucking" id="trucking" />
                            <Label htmlFor="trucking">Trucking</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="freight-forwarding" id="freight-forwarding" />
                            <Label htmlFor="freight-forwarding">Freight Forwarding</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sea-freight" id="sea-freight" />
                            <Label htmlFor="sea-freight">Sea Freight</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Area</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Areas</SelectItem>
                          <SelectItem value="north-america">North America</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>Membership</Label>
                      <RadioGroup defaultValue="all">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="membership-all" />
                            <Label htmlFor="membership-all">All</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="premium" id="premium" />
                            <Label htmlFor="premium">Premium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="free" id="free" />
                            <Label htmlFor="free">Free</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={75}>
                <div className="space-y-4 p-4">
                  {companies.map((company) => (
                    <Card key={company.id} className="hover:bg-accent/50 transition-colors">
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{company.name}</h3>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-sm">{company.rating}</span>
                              </div>
                              <Badge variant={company.membership === "premium" ? "default" : "secondary"}>
                                {company.membership}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{company.description}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {company.location}
                          </div>
                          <Badge variant="outline">{company.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
