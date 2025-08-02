
import { MessageSquare, ExternalLink, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Example request data
const requests = [
  {
    id: "REQ-2201",
    title: "Warehouse Space Needed",
    company: "FastShip Inc.",
    location: "Atlanta, GA",
    type: "Storage",
    timeRemaining: "Expires in 2 days",
    status: "New",
  },
  {
    id: "REQ-2198",
    title: "LTL Capacity for Electronics",
    company: "TechLogistics",
    location: "Dallas to Phoenix",
    type: "Transport",
    timeRemaining: "Expires in 5 days",
    status: "Reviewed",
  },
  {
    id: "REQ-2195",
    title: "Temperature-Controlled Transport",
    company: "PharmaShip",
    location: "Boston to New York",
    type: "Specialized",
    timeRemaining: "Expires in 12 hours",
    status: "Urgent",
  },
];

export function RequestsWidget() {
  return (
    <Card className="logistics-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Open Requests</CardTitle>
            <CardDescription>Collaboration requests from other companies</CardDescription>
          </div>
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3">
          {requests.map((request) => (
            <div 
              key={request.id} 
              className="flex flex-col gap-1 rounded-md border p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{request.title}</span>
                  {request.status === "Urgent" && (
                    <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
                      URGENT
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{request.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{request.company}</span>
                <Badge variant="outline" className="text-xs h-5">
                  {request.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">{request.location}</span>
                <Badge 
                  variant={
                    request.status === "New" 
                      ? "secondary" 
                      : request.status === "Urgent" 
                        ? "destructive" 
                        : "outline"
                  } 
                  className="text-xs h-5"
                >
                  {request.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {request.timeRemaining}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href="/marketplace/requests">
            View all requests
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
