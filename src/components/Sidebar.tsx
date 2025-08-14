import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Home, 
  Users, 
  Scale, 
  Wallet, 
  BarChart3, 
  Settings,
  LogOut,
  User,
  Shield,
  UserCog,
  ChevronLeft,
  ChevronRight,
  Leaf
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarContent = ({ 
  activeTab, 
  onTabChange, 
  onClose,
  isCollapsed = false 
}: { 
  activeTab: string; 
  onTabChange: (tab: string) => void;
  onClose?: () => void;
  isCollapsed?: boolean;
}) => {
  const { user, logout, isAdmin } = useAuth();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "rt-management", label: "Kelola RT", icon: Users },
    { id: "waste-deposit", label: "Input Setoran", icon: Scale },
    { id: "savings", label: "Tabungan", icon: Wallet },
    { id: "reports", label: "Laporan", icon: BarChart3 },
    { id: "settings", label: "Pengaturan", icon: Settings },
    ...(isAdmin ? [{ id: "user-management", label: "Kelola User", icon: UserCog }] : [])
  ];

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout();
    }
  };

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    onClose?.();
  };

  const NavButton = ({ item }: { item: typeof navItems[0] }) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    
    const button = (
      <Button
        variant={isActive ? "default" : "ghost"}
        size="sm"
        onClick={() => handleTabChange(item.id)}
        className={cn(
          "justify-start h-10 transition-all duration-200",
          isCollapsed ? "w-10 px-0" : "w-full space-x-3",
          isActive && "bg-primary text-primary-foreground shadow-md"
        )}
      >
        <Icon className="h-4 w-4" />
        {!isCollapsed && <span>{item.label}</span>}
      </Button>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={cn("p-4 border-b transition-all duration-200", isCollapsed && "p-2")}>
        <div className={cn(
          "flex items-center space-x-3 mb-4",
          isCollapsed && "justify-center space-x-0"
        )}>
          <div className="bg-primary p-2 rounded-lg">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold">CIDATAR</h1>
              <p className="text-xs text-muted-foreground">Bank Sampah</p>
            </div>
          )}
        </div>
        
        {/* User Info */}
        {!isCollapsed && (
          <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
            <div className="bg-primary p-2 rounded-full">
              {user?.role === 'admin' ? (
                <Shield className="h-4 w-4 text-primary-foreground" />
              ) : (
                <User className="h-4 w-4 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user?.name}</p>
              <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                {user?.role === 'admin' ? 'Admin' : 'Operator'}
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className={cn("flex-1 p-3 space-y-1", isCollapsed && "p-2")}>
        {navItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
      </nav>

      {/* Logout Button */}
      <div className={cn("p-3 border-t", isCollapsed && "p-2")}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className={cn(
                  "text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200",
                  isCollapsed ? "w-10 px-0" : "w-full justify-start space-x-3"
                )}
              >
                <LogOut className="h-4 w-4" />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Persist sidebar state in localStorage
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Save sidebar state to localStorage when it changes
  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState));
  };

  return (
    <>
      {/* Desktop Sidebar Only */}
      <div className="hidden lg:flex relative">
        <div className={cn(
          "bg-background border-r transition-all duration-300 ease-in-out flex flex-col shadow-sm",
          isCollapsed ? "w-16" : "w-64"
        )}>
          <SidebarContent 
            activeTab={activeTab} 
            onTabChange={onTabChange} 
            isCollapsed={isCollapsed}
          />
        </div>
        
        {/* Toggle Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleCollapsed}
          className={cn(
            "absolute -right-3 top-6 z-50 h-6 w-6 p-0 border bg-background shadow-md hover:shadow-lg transition-all duration-200",
            "rounded-full"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>
    </>
  );
};
