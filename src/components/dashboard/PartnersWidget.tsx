
import { Star, ExternalLink, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Example partner data
const partners = [
  {
    id: 1,
    name: "FastFreight Logistics",
    avatar: "FF",
    rating: 4.9,
    ordersCompleted: 128,
    onTimeDelivery: "98%",
    deliveryTime: "On-time",
  },
  {
    id: 2,
    name: "Global Trucking Co.",
    avatar: "GT",
    rating: 4.8,
    ordersCompleted: 97,
    onTimeDelivery: "96%",
    deliveryTime: "On-time",
  },
  {
    id: 3,
    name: "Express Ship Forwarding",
    avatar: "ES",
    rating: 4.7,
    ordersCompleted: 85,
    onTimeDelivery: "93%",
    deliveryTime: "On-time",
  },
];

export function PartnersWidget() {
  return (
    <Card className="logistics-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Top Performing Partners</CardTitle>
            <CardDescription>Partners with highest ratings this month</CardDescription>
          </div>
          <Star className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium shrink-0">
                {partner.avatar}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{partner.name}</h4>
                  <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 text-logistics-orange fill-logistics-orange mr-1" />
                    <span className="font-medium">{partner.rating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div>
                    <div className="text-muted-foreground">Orders</div>
                    <div className="font-medium text-foreground">{partner.ordersCompleted}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">On Time</div>
                    <div className="font-medium text-foreground">{partner.onTimeDelivery}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Delivery</div>
                    <div className="font-medium text-foreground">{partner.deliveryTime}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href="/vendors/verified">
            View all partners
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
