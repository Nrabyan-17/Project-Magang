
import { BarChart3, TrendingUp, Truck, Package, CreditCard, Clock } from "lucide-react";
import { StatsCard } from "./StatsCard";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard
        title="Revenue This Month"
        value="$125,430"
        description="vs last month"
        icon={<BarChart3 className="h-5 w-5 text-primary" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Active Shipments"
        value="38"
        description="in transit"
        icon={<Truck className="h-5 w-5 text-primary" />}
        trend={{ value: 4, isPositive: true }}
      />
      <StatsCard
        title="Match Success Rate"
        value="93%"
        description="job match rate"
        icon={<TrendingUp className="h-5 w-5 text-primary" />}
        trend={{ value: 2, isPositive: true }}
      />
      <StatsCard
        title="Open Orders"
        value="24"
        description="to be fulfilled"
        icon={<Package className="h-5 w-5 text-primary" />}
        trend={{ value: 8, isPositive: false }}
      />
      <StatsCard
        title="Pending Payments"
        value="$48,290"
        description="awaiting clearance"
        icon={<CreditCard className="h-5 w-5 text-primary" />}
        trend={{ value: 5, isPositive: false }}
      />
      <StatsCard
        title="Avg. Delivery Time"
        value="2.3 days"
        description="fulfillment time"
        icon={<Clock className="h-5 w-5 text-primary" />}
        trend={{ value: 12, isPositive: true }}
      />
    </div>
  );
}
