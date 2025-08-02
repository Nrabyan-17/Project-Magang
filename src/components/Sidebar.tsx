
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavItem } from "@/components/NavItem";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  FileText,
  Truck,
  MapPin,
  MessageSquare,
  CreditCard,
  Bell,
  Settings,
  Search,
  PlusCircle,
  Reply,
  Package,
  CheckCircle,
  History,
  AlertCircle,
  LineChart,
  BarChart,
} from "lucide-react";

// Define navigation item type
type NavItemType = {
  title: string;
  icon: React.ElementType;
  path: string;
  items?: { title: string; path: string; icon?: React.ElementType }[];
};

// Main navigation items
const mainNavItems: NavItemType[] = [
  {
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Marketplace",
    icon: Search,
    path: "/marketplace",
    items: [
      { title: "Search Partners", path: "/marketplace/search", icon: Search },
      { title: "Post Job / Service", path: "/marketplace/post", icon: PlusCircle },
      { title: "Respond to Offers", path: "/marketplace/respond", icon: Reply },
    ],
  },
  {
    title: "Freight Matching",
    icon: Truck,
    path: "/freight",
    items: [
      { title: "Trucking Needs", path: "/freight/trucking", icon: Truck },
      { title: "Forwarding Needs", path: "/freight/forwarding", icon: Package },
      { title: "LCL/FCL Offers", path: "/freight/consolidation", icon: Package },
    ],
  },
  {
    title: "Vendor Directory",
    icon: Users,
    path: "/vendors",
    items: [
      { title: "Verified Vendors", path: "/vendors/verified", icon: CheckCircle },
      { title: "Add New Partner", path: "/vendors/add", icon: PlusCircle },
    ],
  },
  {
    title: "Order Management",
    icon: FileText,
    path: "/orders",
    items: [
      { title: "Active Orders", path: "/orders/active", icon: FileText },
      { title: "Order History", path: "/orders/history", icon: History },
      { title: "Dispute Resolution", path: "/orders/disputes", icon: AlertCircle },
    ],
  },
  {
    title: "Shipment Tracking",
    icon: MapPin,
    path: "/tracking",
    items: [
      { title: "Live Tracking Map", path: "/tracking/map", icon: MapPin },
      { title: "ETA & Status", path: "/tracking/status", icon: Clock },
    ],
  },
  {
    title: "Documents & Compliance",
    icon: FileText,
    path: "/documents",
    items: [
      { title: "Upload Contracts & PO", path: "/documents/upload", icon: FileText },
      { title: "SLA Templates", path: "/documents/templates", icon: FileText },
      { title: "Customs & Legal Docs", path: "/documents/legal", icon: FileText },
    ],
  },
  {
    title: "Messaging Center",
    icon: MessageSquare,
    path: "/messages",
    items: [
      { title: "Direct Messages", path: "/messages/direct", icon: MessageSquare },
      { title: "Group Chats", path: "/messages/group", icon: Users },
    ],
  },
  {
    title: "Invoicing & Payment",
    icon: CreditCard,
    path: "/invoicing",
    items: [
      { title: "Pending Invoices", path: "/invoicing/pending", icon: FileText },
      { title: "Payment Status", path: "/invoicing/status", icon: CreditCard },
      { title: "Virtual Wallet", path: "/invoicing/wallet", icon: CreditCard },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    title: "Analytics & Reports",
    icon: BarChart,
    path: "/analytics",
    items: [
      { title: "Order Volume", path: "/analytics/volume", icon: BarChart },
      { title: "Partner Performance", path: "/analytics/partners", icon: Users },
      { title: "Fulfillment Time", path: "/analytics/fulfillment", icon: LineChart },
    ],
  },
  {
    title: "Account & Settings",
    icon: Settings,
    path: "/settings",
    items: [
      { title: "Company Profile", path: "/settings/profile", icon: Users },
      { title: "Role Management", path: "/settings/roles", icon: Users },
      { title: "API & Integration", path: "/settings/api", icon: Settings },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
        className
      )}
    >
      <div className="flex h-16 items-center px-4 border-b">
        {!collapsed ? (
          <div className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">LogisticsNexus</span>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <Truck className="h-8 w-8 text-primary" />
          </div>
        )}
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          {mainNavItems.map((item, index) => (
            <NavItem 
              key={index}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="h-16 border-t flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}

// Missing import
function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
