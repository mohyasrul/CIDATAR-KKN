import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export const Layout = ({ children, sidebar }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-accent/30 flex">
      {/* Sidebar */}
      {sidebar}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Only show on mobile when no sidebar */}
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};