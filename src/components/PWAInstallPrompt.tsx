import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Smartphone, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { pwaManager, isPWAInstalled, isPWAInstallable, promptPWAInstall, requestNotifications } from "@/lib/pwa";

export const PWAInstallPrompt = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initial check
    setIsInstalled(isPWAInstalled());
    setIsInstallable(isPWAInstallable());

    // Listen for PWA events
    const handleInstallable = () => {
      setIsInstallable(true);
      setShowPrompt(true);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowPrompt(false);
      toast({
        title: "Aplikasi Terinstall",
        description: "Bank Sampah berhasil diinstall di perangkat Anda",
      });
    };

    const handleUpdateAvailable = () => {
      toast({
        title: "Update Tersedia",
        description: "Versi baru aplikasi sudah tersedia. Refresh halaman untuk update.",
      });
    };

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);
    window.addEventListener('pwa-update-available', handleUpdateAvailable);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
    };
  }, [toast]);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await promptPWAInstall();
      if (success) {
        // Request notification permission after install
        await requestNotifications();
        setShowPrompt(false);
      }
    } catch (error) {
      console.error('Install failed:', error);
      toast({
        title: "Install Gagal",
        description: "Terjadi kesalahan saat menginstall aplikasi",
        variant: "destructive"
      });
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Show again after 24 hours
    localStorage.setItem('pwa-dismissed', Date.now().toString());
  };

  // Don't show if already installed or not installable
  if (isInstalled || !isInstallable || !showPrompt) {
    return null;
  }

  // Check if dismissed recently (24 hours)
  const dismissed = localStorage.getItem('pwa-dismissed');
  if (dismissed && Date.now() - parseInt(dismissed) < 24 * 60 * 60 * 1000) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-sm shadow-lg border-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Install Aplikasi</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-sm">
          Install Bank Sampah di perangkat Anda untuk akses lebih cepat dan fitur offline
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              <Check className="h-3 w-3 mr-1" />
              Akses Offline
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Check className="h-3 w-3 mr-1" />
              Notifikasi
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Check className="h-3 w-3 mr-1" />
              Akses Cepat
            </Badge>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleInstall} 
              disabled={isInstalling}
              className="flex-1"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              {isInstalling ? 'Installing...' : 'Install'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDismiss}
              size="sm"
            >
              Nanti
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const PWAStatus = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setIsInstalled(isPWAInstalled());

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isInstalled && isOnline) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-40">
      {isInstalled && (
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Smartphone className="h-3 w-3 mr-1" />
          PWA
        </Badge>
      )}
      {!isOnline && (
        <Badge variant="destructive" className="ml-2">
          Offline
        </Badge>
      )}
    </div>
  );
};
