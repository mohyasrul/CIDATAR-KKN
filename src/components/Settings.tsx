import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Save, 
  RefreshCw, 
  Database, 
  DollarSign,
  Bell,
  Shield,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { appSettingsStorage, wastePricesStorage, storage, rtStorage, wasteDepositStorage, rtSavingsStorage, transactionStorage } from "@/lib/localStorage";

interface WastePrice {
  id: string;
  name: string;
  pricePerKg: number;
  unit: string;
}

export const Settings = () => {
  const { toast } = useToast();
  
  // Waste prices settings
  const [wastePrices, setWastePrices] = useState<WastePrice[]>([]);

  // App settings
  const [appSettings, setAppSettings] = useState({
    autoBackup: true,
    notifications: true,
    emailReports: false,
    whatsappNotifications: true,
    dataRetentionDays: 365,
    rwName: "",
    contactPerson: "",
    contactPhone: "",
    address: ""
  });

  const [systemStats, setSystemStats] = useState({
    totalRT: 0,
    totalTransactions: 0,
    databaseSize: 0
  });

  // Load data from localStorage on component mount and listen for changes
  useEffect(() => {
    const loadSettingsData = () => {
      const savedSettings = appSettingsStorage.get();
      const savedWastePrices = wastePricesStorage.get();
      
      setAppSettings(savedSettings);
      setWastePrices(savedWastePrices);

      // Calculate system stats
      const rtList = rtStorage.get();
      const transactions = transactionStorage.get();
      const deposits = wasteDepositStorage.get();
      const savings = rtSavingsStorage.get();
      
      // Rough calculation of storage size (in KB)
      const dataSize = JSON.stringify({rtList, transactions, deposits, savings}).length / 1024;
      
      setSystemStats({
        totalRT: rtList.length,
        totalTransactions: transactions.length + deposits.length,
        databaseSize: Math.round(dataSize * 10) / 10
      });
    };

    // Initial load
    loadSettingsData();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadSettingsData();
    };

    window.addEventListener('localStorageUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageChange);
    };
  }, []);

  const handlePriceUpdate = (id: string, newPrice: number) => {
    const updated = wastePrices.map(waste => 
      waste.id === id ? { ...waste, pricePerKg: newPrice } : waste
    );
    setWastePrices(updated);
    wastePricesStorage.set(updated);
    
    toast({
      title: "Berhasil",
      description: "Harga sampah berhasil diperbarui"
    });
  };
  
  const handleSaveSettings = () => {
    appSettingsStorage.set(appSettings);
    toast({
      title: "Pengaturan Disimpan",
      description: "Semua perubahan telah berhasil disimpan",
    });
  };

  const handleBackupData = () => {
    // Create backup object with all data
    const backupData = {
      rtList: rtStorage.get(),
      wasteDeposits: wasteDepositStorage.get(),
      rtSavings: rtSavingsStorage.get(),
      transactions: transactionStorage.get(),
      appSettings: appSettingsStorage.get(),
      wastePrices: wastePricesStorage.get(),
      timestamp: new Date().toISOString()
    };
    
    // Create download link
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `banksampah-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Backup Berhasil",
      description: "Data telah di-backup ke file lokal",
    });
  };

  const handleRestoreData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const backupData = JSON.parse(e.target?.result as string);
            
            // Restore all data
            if (backupData.rtList) rtStorage.set(backupData.rtList);
            if (backupData.wasteDeposits) wasteDepositStorage.set(backupData.wasteDeposits);
            if (backupData.rtSavings) rtSavingsStorage.set(backupData.rtSavings);
            if (backupData.transactions) transactionStorage.set(backupData.transactions);
            if (backupData.appSettings) appSettingsStorage.set(backupData.appSettings);
            if (backupData.wastePrices) wastePricesStorage.set(backupData.wastePrices);
            
            // Refresh local state
            setAppSettings(appSettingsStorage.get());
            setWastePrices(wastePricesStorage.get());
            
            toast({
              title: "Data Dipulihkan",
              description: "Data berhasil dipulihkan dari backup",
            });
          } catch (error) {
            toast({
              title: "Error",
              description: "File backup tidak valid",
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleResetData = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.")) {
      storage.clearAll();
      
      // Reset all states to default
      setWastePrices(wastePricesStorage.get());
      setAppSettings(appSettingsStorage.get());
      setSystemStats({
        totalRT: 0,
        totalTransactions: 0,
        databaseSize: 0
      });
      
      toast({
        title: "Data Direset",
        description: "Semua data telah dikembalikan ke pengaturan awal",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold">Pengaturan Sistem</h2>
        <p className="text-sm lg:text-base text-muted-foreground">Konfigurasi aplikasi dan pengaturan operasional</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Waste Prices Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
              <DollarSign className="h-4 lg:h-5 w-4 lg:w-5" />
              <span>Harga Sampah</span>
            </CardTitle>
            <CardDescription className="text-sm">Atur harga per kilogram untuk setiap jenis sampah</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-3 lg:px-6">
            {wastePrices.map((waste) => (
              <div key={waste.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm lg:text-base">{waste.name}</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">per {waste.unit}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs lg:text-sm">Rp</span>
                  <Input
                    type="number"
                    value={waste.pricePerKg}
                    onChange={(e) => handlePriceUpdate(waste.id, parseInt(e.target.value))}
                    className="w-20 lg:w-24 text-right h-8 lg:h-10 text-sm"
                  />
                </div>
              </div>
            ))}
            <Button onClick={handleSaveSettings} className="w-full h-10 lg:h-11">
              <Save className="mr-2 h-4 w-4" />
              Simpan Harga
            </Button>
          </CardContent>
        </Card>

        {/* App Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
              <SettingsIcon className="h-4 lg:h-5 w-4 lg:w-5" />
              <span>Konfigurasi Aplikasi</span>
            </CardTitle>
            <CardDescription className="text-sm">Pengaturan umum aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-3 lg:px-6">
            <div className="space-y-2">
              <Label htmlFor="rw-name" className="text-sm font-medium">Nama RW</Label>
              <Input
                id="rw-name"
                value={appSettings.rwName}
                onChange={(e) => setAppSettings({ ...appSettings, rwName: e.target.value })}
                className="h-10 lg:h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-person" className="text-sm font-medium">Penanggung Jawab</Label>
              <Input
                id="contact-person"
                value={appSettings.contactPerson}
                onChange={(e) => setAppSettings({ ...appSettings, contactPerson: e.target.value })}
                className="h-10 lg:h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone" className="text-sm font-medium">No. Telepon</Label>
              <Input
                id="contact-phone"
                value={appSettings.contactPhone}
                onChange={(e) => setAppSettings({ ...appSettings, contactPhone: e.target.value })}
                className="h-10 lg:h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">Alamat</Label>
              <Input
                id="address"
                value={appSettings.address}
                onChange={(e) => setAppSettings({ ...appSettings, address: e.target.value })}
                className="h-10 lg:h-11"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
            <Bell className="h-4 lg:h-5 w-4 lg:w-5" />
            <span>Pengaturan Notifikasi</span>
          </CardTitle>
          <CardDescription className="text-sm">Kelola notifikasi dan pemberitahuan</CardDescription>
        </CardHeader>
        <CardContent className="px-3 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm lg:text-base">Notifikasi Push</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Pemberitahuan dalam aplikasi</p>
                </div>
                <Switch
                  checked={appSettings.notifications}
                  onCheckedChange={(checked) => setAppSettings({ ...appSettings, notifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm lg:text-base">Laporan Email</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Kirim laporan bulanan via email</p>
                </div>
                <Switch
                  checked={appSettings.emailReports}
                  onCheckedChange={(checked) => setAppSettings({ ...appSettings, emailReports: checked })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm lg:text-base">WhatsApp Notifikasi</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Pemberitahuan via WhatsApp</p>
                </div>
                <Switch
                  checked={appSettings.whatsappNotifications}
                  onCheckedChange={(checked) => setAppSettings({ ...appSettings, whatsappNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm lg:text-base">Auto Backup</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Backup otomatis harian</p>
                </div>
                <Switch
                  checked={appSettings.autoBackup}
                  onCheckedChange={(checked) => setAppSettings({ ...appSettings, autoBackup: checked })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
            <Database className="h-4 lg:h-5 w-4 lg:w-5" />
            <span>Manajemen Data</span>
          </CardTitle>
          <CardDescription className="text-sm">Backup, restore, dan pengelolaan data</CardDescription>
        </CardHeader>
        <CardContent className="px-3 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
            <Button variant="outline" onClick={handleBackupData} className="flex flex-col h-16 lg:h-20 space-y-1 lg:space-y-2">
              <Download className="h-4 lg:h-5 w-4 lg:w-5" />
              <span className="text-xs lg:text-sm">Backup Data</span>
            </Button>

            <Button variant="outline" onClick={handleRestoreData} className="flex flex-col h-16 lg:h-20 space-y-1 lg:space-y-2">
              <Upload className="h-4 lg:h-5 w-4 lg:w-5" />
              <span className="text-xs lg:text-sm">Restore Data</span>
            </Button>

            <Button variant="outline" className="flex flex-col h-16 lg:h-20 space-y-1 lg:space-y-2">
              <RefreshCw className="h-4 lg:h-5 w-4 lg:w-5" />
              <span className="text-xs lg:text-sm">Sinkronisasi</span>
            </Button>

            <Button variant="destructive" onClick={handleResetData} className="flex flex-col h-16 lg:h-20 space-y-1 lg:space-y-2">
              <Trash2 className="h-4 lg:h-5 w-4 lg:w-5" />
              <span className="text-xs lg:text-sm">Reset Data</span>
            </Button>
          </div>

          <Separator className="my-4 lg:my-6" />

          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-0">
              <div>
                <p className="font-medium text-sm lg:text-base">Retensi Data</p>
                <p className="text-xs lg:text-sm text-muted-foreground">Data akan dihapus otomatis setelah periode ini</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={appSettings.dataRetentionDays}
                  onChange={(e) => setAppSettings({ ...appSettings, dataRetentionDays: parseInt(e.target.value) })}
                  className="w-16 lg:w-20 h-8 lg:h-10 text-sm"
                />
                <span className="text-xs lg:text-sm">hari</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
            <Shield className="h-4 lg:h-5 w-4 lg:w-5" />
            <span>Informasi Sistem</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="space-y-2">
              <p className="text-xs lg:text-sm font-medium">Versi Aplikasi</p>
              <Badge variant="secondary" className="text-xs">v1.0.0</Badge>
            </div>

            <div className="space-y-2">
              <p className="text-xs lg:text-sm font-medium">Database</p>
              <Badge variant="outline" className="text-xs">IndexedDB</Badge>
            </div>

            <div className="space-y-2">
              <p className="text-xs lg:text-sm font-medium">Status</p>
              <Badge className="bg-success text-success-foreground text-xs">Online</Badge>
            </div>

            <div className="space-y-2">
              <p className="text-xs lg:text-sm font-medium">Total RT</p>
              <p className="text-lg lg:text-2xl font-bold">{systemStats.totalRT}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs lg:text-sm font-medium">Total Transaksi</p>
              <p className="text-lg lg:text-2xl font-bold">{systemStats.totalTransactions}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs lg:text-sm font-medium">Ukuran Database</p>
              <p className="text-lg lg:text-2xl font-bold">{systemStats.databaseSize} KB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save All Settings */}
      <div className="flex flex-col lg:flex-row justify-end gap-2 lg:space-x-4 lg:gap-0">
        <Button variant="outline" className="w-full lg:w-auto h-10 lg:h-11">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset ke Default
        </Button>
        <Button onClick={handleSaveSettings} className="w-full lg:w-auto h-10 lg:h-11">
          <Save className="mr-2 h-4 w-4" />
          Simpan Semua Pengaturan
        </Button>
      </div>
    </div>
  );
};