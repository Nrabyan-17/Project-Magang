
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

// Define navigation item type
type NavItemType = {
  title: string;
  icon: React.ElementType;
  path: string;
  items?: { title: string; path: string; icon?: React.ElementType }[];
};

interface NavItemProps {
  item: NavItemType;
  collapsed: boolean;
}

export function NavItem({ item, collapsed }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const hasSubItems = item.items && item.items.length > 0;
  const IconComponent = item.icon;

  if (!hasSubItems) {
    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start px-3 py-2 h-10",
          collapsed ? "justify-center px-0" : ""
        )}
        asChild
      >
        <a href={item.path}>
          <IconComponent className="h-5 w-5 mr-2 shrink-0" />
          {!collapsed && <span>{item.title}</span>}
        </a>
      </Button>
    );
  }

  return (
    <Collapsible
      open={!collapsed && open}
      onOpenChange={collapsed ? undefined : setOpen}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-3 py-2 h-10",
            collapsed ? "justify-center px-0" : ""
          )}
        >
          <IconComponent className="h-5 w-5 mr-2 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-grow text-left">{item.title}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open ? "rotate-180" : "")} />
            </>
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-6 pb-1">
          {!collapsed &&
            item.items?.map((subItem, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start px-3 py-1 h-9 text-sm"
                asChild
              >
                <a href={subItem.path}>
                  {subItem.icon && (
                    <subItem.icon className="h-4 w-4 mr-2 shrink-0" />
                  )}
                  <span>{subItem.title}</span>
                </a>
              </Button>
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
