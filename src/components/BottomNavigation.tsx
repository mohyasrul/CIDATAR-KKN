import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  Scale, 
  Wallet, 
  BarChart3, 
  Settings,
  UserCog,
  Menu
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { vibrate } from "@/lib/mobile";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMenuOpen: () => void;
}

export const BottomNavigation = ({ activeTab, onTabChange, onMenuOpen }: BottomNavigationProps) => {
  const { isAdmin } = useAuth();

  // Main navigation items for bottom nav (most used)
  const mainNavItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "waste-deposit", label: "Setoran", icon: Scale },
    { id: "savings", label: "Tabungan", icon: Wallet },
    { id: "reports", label: "Laporan", icon: BarChart3 },
  ];

  // Additional items will be in the hamburger menu
  const additionalItems = [
    { id: "rt-management", label: "Kelola RT", icon: Users },
    { id: "settings", label: "Pengaturan", icon: Settings },
    ...(isAdmin ? [{ id: "user-management", label: "Kelola User", icon: UserCog }] : [])
  ];

  // Check if current active tab is in additional items
  const isAdditionalActive = additionalItems.some(item => item.id === activeTab);

  const handleTabChange = (tab: string) => {
    vibrate(50); // Light haptic feedback
    onTabChange(tab);
  };

  const handleMenuOpen = () => {
    vibrate([50, 50]); // Double tap feedback
    onMenuOpen();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 border-t shadow-lg lg:hidden bottom-nav-blur">
      <div className="flex items-center justify-around px-1 py-1 safe-area-pb">
        {/* Main Navigation Items */}
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => handleTabChange(item.id)}
              className={cn(
                "flex flex-col items-center space-y-1 h-auto py-2 px-1 min-w-0 flex-1 rounded-lg transition-all duration-200 active:scale-95",
                isActive && "text-primary bg-primary/10 scale-105"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-transform duration-200", 
                isActive && "text-primary scale-110"
              )} />
              <span className={cn(
                "text-xs leading-tight font-medium transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Button>
          );
        })}

        {/* Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMenuOpen}
          className={cn(
            "flex flex-col items-center space-y-1 h-auto py-2 px-1 min-w-0 flex-1 relative rounded-lg transition-all duration-200 active:scale-95",
            isAdditionalActive && "text-primary bg-primary/10 scale-105"
          )}
        >
          <div className="relative">
            <Menu className={cn(
              "h-5 w-5 transition-transform duration-200", 
              isAdditionalActive && "text-primary scale-110"
            )} />
            {isAdditionalActive && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
          </div>
          <span className={cn(
            "text-xs leading-tight font-medium transition-colors duration-200",
            isAdditionalActive ? "text-primary" : "text-muted-foreground"
          )}>
            Menu
          </span>
        </Button>
      </div>
    </div>
  );
};
