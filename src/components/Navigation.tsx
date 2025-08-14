import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  Scale, 
  Wallet, 
  BarChart3, 
  Settings,
  ArrowLeft,
  LogOut,
  User,
  Shield,
  UserCog
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
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

  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-col space-y-4">
        {/* User Info */}
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-full">
              {user?.role === 'admin' ? (
                <Shield className="h-4 w-4 text-white" />
              ) : (
                <User className="h-4 w-4 text-white" />
              )}
            </div>
            <div>
              <p className="font-medium text-sm">{user?.name}</p>
              <div className="flex items-center space-x-2">
                <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                  {user?.role === 'admin' ? 'Administrator' : 'Operator'}
                </Badge>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "outline"}
                size="sm"
                onClick={() => onTabChange(item.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};