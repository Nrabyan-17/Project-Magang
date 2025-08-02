
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ActiveJobsWidget } from "@/components/dashboard/ActiveJobsWidget";
import { RequestsWidget } from "@/components/dashboard/RequestsWidget";
import { PartnersWidget } from "@/components/dashboard/PartnersWidget";
import { ShipmentMapWidget } from "@/components/dashboard/ShipmentMapWidget";
import { FeedbackWidget } from "@/components/dashboard/FeedbackWidget";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Filter } from "lucide-react";

const Index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 p-6 md:p-8 overflow-auto bg-muted/10">
          <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back, here's what's happening today
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleRefresh}
                  className={cn(isRefreshing && "animate-spin")}
                >
                  <RefreshCw className={cn("h-4 w-4", isRefreshing ? "animate-spin" : "mr-2")} />
                  {!isRefreshing && "Refresh"}
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Job
                </Button>
              </div>
            </div>

            {/* Dashboard Stats */}
            <section className="logistics-section">
              <DashboardStats />
            </section>

            {/* Shipment Map and Active Jobs */}
            <section className="logistics-section">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <ShipmentMapWidget />
                </div>
                <div>
                  <ActiveJobsWidget />
                </div>
              </div>
            </section>

            {/* Open Requests and Partners */}
            <section className="logistics-section">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <RequestsWidget />
                </div>
                <div className="lg:col-span-2">
                  <FeedbackWidget />
                </div>
              </div>
            </section>

            {/* Partners Performance */}
            <section className="logistics-section">
              <PartnersWidget />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
