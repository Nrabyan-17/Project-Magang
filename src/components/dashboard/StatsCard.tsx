
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("logistics-card logistics-card-hover", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {trend && (
            <span
              className={cn(
                "flex items-center text-xs",
                trend.isPositive ? "text-logistics-success" : "text-destructive"
              )}
            >
              <span className="mr-1">
                {trend.isPositive ? "↑" : "↓"}
              </span>
              {trend.value}%
            </span>
          )}
          {description && (
            <p className="text-xs text-muted-foreground ml-1">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
