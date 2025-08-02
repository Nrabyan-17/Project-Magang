
import { Star, ThumbsUp, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function FeedbackWidget() {
  // Example feedback data
  const ratings = {
    averageRating: 4.6,
    total: 248,
    breakdown: [
      { stars: 5, count: 178, percentage: 72 },
      { stars: 4, count: 48, percentage: 19 },
      { stars: 3, count: 12, percentage: 5 },
      { stars: 2, count: 6, percentage: 2 },
      { stars: 1, count: 4, percentage: 2 },
    ],
    categories: [
      { name: "Delivery Speed", rating: 4.8 },
      { name: "Communication", rating: 4.7 },
      { name: "Service Quality", rating: 4.5 },
      { name: "Problem Resolution", rating: 4.3 },
    ],
  };

  return (
    <Card className="logistics-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Ratings & Feedback</CardTitle>
            <CardDescription>Customer feedback summary</CardDescription>
          </div>
          <ThumbsUp className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Overall rating */}
          <div className="flex flex-col items-center justify-center w-full sm:w-auto">
            <div className="text-4xl font-bold">{ratings.averageRating}</div>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(ratings.averageRating) ? 'text-logistics-orange fill-logistics-orange' : 'text-muted'}`} 
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {ratings.total} ratings
            </div>
          </div>

          {/* Rating breakdown */}
          <div className="flex-1 w-full">
            <div className="space-y-2">
              {ratings.breakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <div className="w-12 text-sm flex items-center">
                    <span>{item.stars}</span>
                    <Star className="h-3 w-3 ml-1" />
                  </div>
                  <Progress value={item.percentage} className="h-2 flex-1" />
                  <div className="w-10 text-sm text-right">{item.percentage}%</div>
                </div>
              ))}
            </div>

            {/* Category ratings */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {ratings.categories.map((category) => (
                <div key={category.name} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{category.name}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">{category.rating}</span>
                      <Star className="h-3 w-3 text-logistics-orange fill-logistics-orange" />
                    </div>
                  </div>
                  <Progress value={category.rating * 20} className="h-1 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href="/analytics/feedback">
            View detailed feedback
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
