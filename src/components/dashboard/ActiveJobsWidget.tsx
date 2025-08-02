
import { Package, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Example job data
const activeJobs = [
  {
    id: "JOB-1234",
    title: "Full Truckload Transport Required",
    company: "Global Shipping Co.",
    type: "Trucking",
    status: "Pending Offers",
    location: "New York → Chicago",
    deadline: "24h remaining",
    urgent: true,
  },
  {
    id: "JOB-5678",
    title: "LCL Container Consolidation",
    company: "Acme Logistics",
    type: "Freight",
    status: "8 Offers",
    location: "Los Angeles → Hong Kong",
    deadline: "3d remaining",
    urgent: false,
  },
  {
    id: "JOB-9101",
    title: "Last Mile Delivery Partner",
    company: "FastShip Inc.",
    type: "Delivery",
    status: "5 Offers",
    location: "Miami Metropolitan Area",
    deadline: "2d remaining",
    urgent: false,
  },
];

export function ActiveJobsWidget() {
  return (
    <Card className="logistics-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Job Posts</CardTitle>
            <CardDescription>Recent jobs posted by your company</CardDescription>
          </div>
          <Package className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3">
          {activeJobs.map((job) => (
            <div key={job.id} className="flex flex-col gap-1 rounded-md border p-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{job.title}</span>
                  {job.urgent && (
                    <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
                      URGENT
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{job.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{job.company}</span>
                <Badge variant="outline" className="text-xs h-5">
                  {job.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">{job.location}</span>
                <Badge variant="secondary" className="text-xs h-5">
                  {job.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {job.deadline}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href="/marketplace/jobs">
            View all jobs
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
