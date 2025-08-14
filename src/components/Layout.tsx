import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  bottomNav?: ReactNode;
}

export const Layout = ({ children, sidebar, bottomNav }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-accent/30 flex">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:flex">
        {sidebar}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header - Only show on mobile */}
        <header className="lg:hidden bg-primary shadow-sm border-b">
          <div className="px-4 sm:px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-foreground p-2 rounded-lg">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-primary-foreground">CIDATAR</h1>
                  <p className="text-sm text-primary-foreground/80">Bank Sampah</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground">
                v2.0
              </Badge>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-auto pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation - Direct render, component has its own lg:hidden */}
      {bottomNav}
    </div>
  );
};