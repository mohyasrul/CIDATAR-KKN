import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users,
  Scale,
  DollarSign,
  FileText,
  Mail,
  Smartphone,
  Target,
  Award
} from "lucide-react";
import { rtStorage, wasteDepositStorage, rtSavingsStorage, transactionStorage } from "@/lib/localStorage";

export const Reports = () => {
  // Generate current date range (current month)
  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    return {
      startDate: firstDay.toISOString().split('T')[0],
      endDate: lastDay.toISOString().split('T')[0]
    };
  };

  const [dateRange, setDateRange] = useState(getCurrentMonthRange());
  
  const [reportType, setReportType] = useState("monthly");

  // Initialize with empty data - will be calculated from localStorage
  const [monthlyStats, setMonthlyStats] = useState({
    totalDeposits: 0,
    totalValue: 0,
    activeRTs: 0,
    transactions: 0,
    averagePerRT: 0,
    growth: 0
  });

  const [wasteTypeData, setWasteTypeData] = useState<Array<{type: string, weight: number, value: number, percentage: number}>>([]);
  const [rtRanking, setRTRanking] = useState<Array<{rt: string, deposits: number, value: number, transactions: number, rank: number}>>([]);
  const [dailyTrend, setDailyTrend] = useState<Array<{date: string, deposits: number, value: number}>>([]);

  // Load and calculate data from localStorage
  useEffect(() => {
    calculateReportData();

    // Listen for storage changes
    const handleStorageChange = () => {
      calculateReportData();
    };

    window.addEventListener('localStorageUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageChange);
    };
  }, [dateRange, reportType]);

  const calculateReportData = () => {
    const rtList = rtStorage.get();
    const deposits = wasteDepositStorage.get();
    const savings = rtSavingsStorage.get();
    const transactions = transactionStorage.get();

    // Filter data based on date range
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    
    const filteredDeposits = deposits.filter((deposit: any) => {
      const depositDate = new Date(deposit.date);
      return depositDate >= startDate && depositDate <= endDate;
    });

    const filteredTransactions = transactions.filter((transaction: any) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    // Calculate monthly stats
    const totalDeposits = filteredDeposits.reduce((sum: number, deposit: any) => sum + deposit.weight, 0);
    const totalValue = filteredDeposits.reduce((sum: number, deposit: any) => sum + deposit.totalValue, 0);
    const activeRTs = [...new Set(filteredDeposits.map((d: any) => d.rt))].length;
    const totalTransactions = filteredTransactions.length;
    const averagePerRT = activeRTs > 0 ? totalDeposits / activeRTs : 0;

    setMonthlyStats({
      totalDeposits,
      totalValue,
      activeRTs,
      transactions: totalTransactions,
      averagePerRT,
      growth: 0 // Would calculate based on previous period in real implementation
    });

    // Calculate waste type distribution
    const wasteTypeMap = new Map();
    filteredDeposits.forEach((deposit: any) => {
      const existing = wasteTypeMap.get(deposit.wasteType) || { weight: 0, value: 0 };
      wasteTypeMap.set(deposit.wasteType, {
        weight: existing.weight + deposit.weight,
        value: existing.value + deposit.totalValue
      });
    });

    const wasteTypes = Array.from(wasteTypeMap.entries()).map(([type, data]: [string, any]) => ({
      type,
      weight: data.weight,
      value: data.value,
      percentage: totalDeposits > 0 ? (data.weight / totalDeposits) * 100 : 0
    }));
    setWasteTypeData(wasteTypes);

    // Calculate RT ranking
    const rtMap = new Map();
    filteredDeposits.forEach((deposit: any) => {
      const existing = rtMap.get(deposit.rt) || { deposits: 0, value: 0, transactions: 0 };
      rtMap.set(deposit.rt, {
        deposits: existing.deposits + deposit.weight,
        value: existing.value + deposit.totalValue,
        transactions: existing.transactions + 1
      });
    });

    const rtRankingData = Array.from(rtMap.entries())
      .map(([rt, data]: [string, any], index) => ({
        rt,
        deposits: data.deposits,
        value: data.value,
        transactions: data.transactions,
        rank: index + 1
      }))
      .sort((a, b) => b.deposits - a.deposits)
      .map((item, index) => ({ ...item, rank: index + 1 }));
    
    setRTRanking(rtRankingData);

    // Calculate daily trend (last 7 days)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayDeposits = deposits.filter((d: any) => d.date === dateStr);
      const dayWeight = dayDeposits.reduce((sum: number, d: any) => sum + d.weight, 0);
      const dayValue = dayDeposits.reduce((sum: number, d: any) => sum + d.totalValue, 0);
      
      last7Days.push({
        date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
        deposits: dayWeight,
        value: dayValue
      });
    }
    setDailyTrend(last7Days);
  };

  const handleExport = (format: string) => {
    const reportData = {
      dateRange,
      reportType,
      monthlyStats,
      wasteTypeData,
      rtRanking,
      dailyTrend,
      generatedAt: new Date().toISOString()
    };

    if (format === 'json') {
      const dataStr = JSON.stringify(reportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `laporan-banksampah-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else if (format === 'csv') {
      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Laporan Bank Sampah\n";
      csvContent += `Periode: ${dateRange.startDate} - ${dateRange.endDate}\n\n`;
      
      csvContent += "RT,Total Setoran (kg),Total Nilai (Rp),Jumlah Transaksi\n";
      rtRanking.forEach(rt => {
        csvContent += `${rt.rt},${rt.deposits},${rt.value},${rt.transactions}\n`;
      });
      
      const encodedUri = encodeURI(csvContent);
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', encodedUri);
      linkElement.setAttribute('download', `laporan-banksampah-${new Date().toISOString().split('T')[0]}.csv`);
      linkElement.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Laporan & Analitik</h2>
          <p className="text-muted-foreground">Analisis kinerja dan tren tabungan sampah</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleExport('json')}>
            <FileText className="mr-2 h-4 w-4" />
            Export JSON
          </Button>
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Laporan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Jenis Laporan</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="daily">Harian</SelectItem>
                  <SelectItem value="weekly">Mingguan</SelectItem>
                  <SelectItem value="monthly">Bulanan</SelectItem>
                  <SelectItem value="yearly">Tahunan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Tanggal Mulai</Label>
              <Input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tanggal Selesai</Label>
              <Input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              />
            </div>
            
            <div className="flex items-end">
              <Button className="w-full" onClick={calculateReportData}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Setoran</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.totalDeposits} kg</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+{monthlyStats.growth}%</span>
              <span className="text-muted-foreground">vs bulan lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Nilai</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {monthlyStats.totalValue.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">
              {monthlyStats.transactions > 0 ? `Rata-rata Rp ${Math.round(monthlyStats.totalValue / monthlyStats.transactions).toLocaleString('id-ID')}/transaksi` : 'Belum ada transaksi'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RT Aktif</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.activeRTs}</div>
            <p className="text-xs text-muted-foreground">dari 0 RT terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.transactions}</div>
            <p className="text-xs text-muted-foreground">
              {monthlyStats.activeRTs > 0 ? `Rata-rata ${Math.round(monthlyStats.averagePerRT)} kg/RT` : 'Belum ada data'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Distribusi Jenis Sampah</span>
            </CardTitle>
            <CardDescription>Breakdown setoran berdasarkan jenis sampah</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wasteTypeData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Belum Ada Data</h3>
                  <p className="text-sm">
                    Data distribusi sampah akan muncul setelah ada setoran
                  </p>
                </div>
              ) : (
                wasteTypeData.map((item, index) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.type}</span>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.weight} kg</p>
                        <p className="text-xs text-muted-foreground">Rp {item.value.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.percentage}% dari total</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* RT Ranking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Ranking RT</span>
            </CardTitle>
            <CardDescription>Performa setoran per RT bulan ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rtRanking.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Belum Ada Ranking</h3>
                  <p className="text-sm">
                    Ranking RT akan muncul setelah ada aktivitas setoran
                  </p>
                </div>
              ) : (
                rtRanking.map((rt) => (
                  <div key={rt.rt} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant={rt.rank <= 3 ? "default" : "secondary"} className="w-8 h-8 rounded-full flex items-center justify-center">
                        {rt.rank}
                      </Badge>
                      <div>
                        <p className="font-medium">{rt.rt}</p>
                        <p className="text-xs text-muted-foreground">{rt.transactions} transaksi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{rt.deposits} kg</p>
                      <p className="text-xs text-success">Rp {rt.value.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Tren Setoran Harian</span>
          </CardTitle>
          <CardDescription>Grafik setoran sampah 7 hari terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyTrend.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Belum Ada Data Tren</h3>
                <p className="text-sm">
                  Grafik tren akan muncul setelah ada data setoran harian
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-2">
                {dailyTrend.map((day, index) => {
                  const maxValue = Math.max(...dailyTrend.map(d => d.deposits));
                  const height = maxValue > 0 ? (day.deposits / maxValue) * 100 : 0;
                  
                  return (
                    <div key={day.date} className="text-center">
                      <div className="bg-muted rounded-lg p-2 mb-2 h-32 flex items-end justify-center">
                        <div 
                          className="bg-primary rounded-sm w-full transition-all"
                          style={{ height: `${height}%` }}
                          title={`${day.deposits} kg - Rp ${day.value.toLocaleString('id-ID')}`}
                        />
                      </div>
                      <p className="text-xs font-medium">{day.date}</p>
                      <p className="text-xs text-muted-foreground">{day.deposits} kg</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Share Options */}
      <Card>
        <CardHeader>
          <CardTitle>Bagikan Laporan</CardTitle>
          <CardDescription>Kirim laporan melalui berbagai platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <Smartphone className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};