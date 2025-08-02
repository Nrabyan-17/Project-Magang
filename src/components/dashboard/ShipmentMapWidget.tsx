
import { MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ShipmentMapWidget() {
  return (
    <Card className="logistics-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Shipments</CardTitle>
            <CardDescription>Current shipments in transit</CardDescription>
          </div>
          <MapPin className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Map placeholder - in a real application this would use a mapping library */}
        <div className="relative h-[300px] bg-muted/30 flex items-center justify-center overflow-hidden rounded-md mx-6">
          {/* Simplified map visualization */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmOGY5ZmEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBIMHYzMGgzMFYzMHpNNjAgMzBIMzB2MzBoMzBWMzB6TTMwIDBIMHYzMGgzMFYwek02MCAwSDMwdjMwaDMwVjB6IiBmaWxsLW9wYWNpdHk9Ii4wNSIgZmlsbD0iIzIxMmYzZCIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg==')] opacity-25"></div>
          
          {/* Shipment routes visualization */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Route 1 */}
            <path d="M100,150 C200,50 400,250 500,150" stroke="rgba(14, 165, 233, 0.5)" strokeWidth="3" strokeDasharray="5,5" />
            <circle cx="100" cy="150" r="6" fill="#1A4D8C" />
            <circle cx="500" cy="150" r="6" fill="#F97316" />
            
            {/* Route 2 */}
            <path d="M150,250 C250,200 350,200 450,100" stroke="rgba(249, 115, 22, 0.5)" strokeWidth="3" strokeDasharray="5,5" />
            <circle cx="150" cy="250" r="6" fill="#1A4D8C" />
            <circle cx="450" cy="100" r="6" fill="#F97316" />
            
            {/* Route 3 */}
            <path d="M100,80 C150,150 400,120 500,200" stroke="rgba(14, 165, 233, 0.5)" strokeWidth="3" strokeDasharray="5,5" />
            <circle cx="100" cy="80" r="6" fill="#1A4D8C" />
            <circle cx="500" cy="200" r="6" fill="#F97316" />
            
            {/* Animated vehicle - truck on route 1 */}
            <circle cx="300" cy="150" r="5" fill="#F97316">
              <animate attributeName="cx" from="100" to="500" dur="10s" repeatCount="indefinite" />
              <animate attributeName="cy" values="150;100;150" dur="10s" repeatCount="indefinite" />
            </circle>

            {/* Animated vehicle - truck on route 3 */}
            <circle cx="250" cy="120" r="5" fill="#F97316">
              <animate attributeName="cx" from="100" to="500" dur="15s" repeatCount="indefinite" />
              <animate attributeName="cy" values="80;120;200" dur="15s" repeatCount="indefinite" />
            </circle>
          </svg>
          
          {/* Map legend */}
          <div className="absolute bottom-3 left-3 bg-background/90 p-2 rounded-md border text-xs space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-logistics-blue mr-2"></div>
              <span>Origin</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-logistics-orange mr-2"></div>
              <span>Destination</span>
            </div>
            <div className="flex items-center">
              <div className="h-[2px] w-8 bg-logistics-teal mr-2 my-1 opacity-70"></div>
              <span>Route</span>
            </div>
          </div>
        </div>
        
        {/* Active shipments */}
        <div className="px-6 pt-4 space-y-2">
          <h4 className="text-sm font-medium">Active Shipments</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex justify-between items-center p-2 rounded-md border text-sm hover:bg-muted/50 transition-colors">
              <div className="flex flex-col">
                <span className="font-medium">NYC → Chicago</span>
                <span className="text-xs text-muted-foreground">Order #LN-7829</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">On Schedule</Badge>
            </div>
            <div className="flex justify-between items-center p-2 rounded-md border text-sm hover:bg-muted/50 transition-colors">
              <div className="flex flex-col">
                <span className="font-medium">LA → Hong Kong</span>
                <span className="text-xs text-muted-foreground">Order #LN-6721</span>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Delayed 1d</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href="/tracking/map">
            View detailed tracking
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
