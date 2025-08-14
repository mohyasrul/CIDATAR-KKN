import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  Users, 
  Settings,
  LogOut,
  User,
  Shield,
  UserCog,
  Leaf
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MobileMenu = ({ isOpen, onClose, activeTab, onTabChange }: MobileMenuProps) => {
  const { user, logout, isAdmin } = useAuth();

  const menuItems = [
    { id: "rt-management", label: "Kelola RT", icon: Users, description: "Manajemen data RT" },
    { id: "settings", label: "Pengaturan", icon: Settings, description: "Konfigurasi sistem" },
    ...(isAdmin ? [{
      id: "user-management", 
      label: "Kelola User", 
      icon: UserCog, 
      description: "Manajemen pengguna"
    }] : [])
  ];

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      logout();
    }
  };

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
        <SheetHeader className="text-left">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <SheetTitle className="text-lg">CIDATAR Bank Sampah</SheetTitle>
              <p className="text-sm text-muted-foreground">Menu Tambahan</p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col space-y-6 mt-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 p-4 bg-accent rounded-lg">
            <div className="bg-primary p-3 rounded-full">
              {user?.role === 'admin' ? (
                <Shield className="h-5 w-5 text-primary-foreground" />
              ) : (
                <User className="h-5 w-5 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{user?.name}</p>
              <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                {user?.role === 'admin' ? 'Administrator' : 'Operator'}
              </Badge>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Menu Lainnya</h3>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="lg"
                  onClick={() => handleTabChange(item.id)}
                  className={cn(
                    "w-full justify-start h-auto p-4 text-left",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{item.label}</p>
                      <p className={cn(
                        "text-xs",
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Logout Section */}
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleLogout}
              className="w-full justify-start h-auto p-4 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Logout</p>
                  <p className="text-xs text-muted-foreground">Keluar dari aplikasi</p>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
