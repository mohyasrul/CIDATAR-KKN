import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Eye, 
  Download,
  TrendingUp,
  DollarSign,
  History,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { rtSavingsStorage, transactionStorage } from "@/lib/localStorage";

interface RTSavings {
  id: string;
  rt: string;
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  transactionCount: number;
  lastTransaction: string;
}

interface Transaction {
  id: string;
  rt: string;
  type: "deposit" | "withdrawal";
  amount: number;
  description: string;
  date: string;
  balance: number;
}

export const Savings = () => {
  const { toast } = useToast();
  const [selectedRT, setSelectedRT] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  
  // Load data from localStorage
  const [rtSavings, setRTSavings] = useState<RTSavings[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load data on component mount and listen for changes
  useEffect(() => {
    const loadSavingsData = () => {
      const savedSavings = rtSavingsStorage.get();
      const savedTransactions = transactionStorage.get();
      
      setRTSavings(savedSavings);
      setTransactions(savedTransactions);
    };

    // Initial load
    loadSavingsData();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadSavingsData();
    };

    window.addEventListener('localStorageUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageChange);
    };
  }, []);

  const totalSavings = rtSavings.reduce((sum, rt) => sum + rt.balance, 0);
  const totalDeposits = rtSavings.reduce((sum, rt) => sum + rt.totalDeposits, 0);
  const totalWithdrawals = rtSavings.reduce((sum, rt) => sum + rt.totalWithdrawals, 0);

  const selectedRTData = rtSavings.find(rt => rt.rt === selectedRT);

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    
    if (!selectedRT || !amount || amount <= 0) {
      toast({
        title: "Error",
        description: "Pilih RT dan masukkan jumlah penarikan yang valid",
        variant: "destructive"
      });
      return;
    }

    if (!selectedRTData || amount > selectedRTData.balance) {
      toast({
        title: "Error", 
        description: "Saldo tidak mencukupi untuk penarikan ini",
        variant: "destructive"
      });
      return;
    }

    // Update RT balance in localStorage
    const updatedSavings = rtSavingsStorage.updateBalance(selectedRT, amount, false);
    setRTSavings(updatedSavings);

    // Add transaction record
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      rt: selectedRT,
      type: "withdrawal",
      amount: amount,
      description: "Penarikan tabungan",
      date: new Date().toISOString(),
      balance: selectedRTData.balance - amount
    };

    const updatedTransactions = transactionStorage.add(newTransaction);
    setTransactions(updatedTransactions);

    toast({
      title: "Penarikan Berhasil!",
      description: `${selectedRT} berhasil menarik Rp ${amount.toLocaleString('id-ID')}`,
    });

    setWithdrawalAmount("");
    setSelectedRT("");
    setIsWithdrawDialogOpen(false);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold">Manajemen Tabungan</h2>
          <p className="text-sm lg:text-base text-muted-foreground">Kelola tabungan RT dan riwayat transaksi</p>
        </div>
        
        <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full lg:w-auto">
              <ArrowDownRight className="mr-2 h-4 w-4" />
              Penarikan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] mx-4">
            <DialogHeader>
              <DialogTitle className="text-lg">Penarikan Tabungan</DialogTitle>
              <DialogDescription className="text-sm">
                Proses penarikan tabungan RT
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rt-select" className="text-sm font-medium">Pilih RT</Label>
                <select 
                  id="rt-select"
                  className="w-full p-3 border border-input rounded-md bg-background text-sm"
                  value={selectedRT}
                  onChange={(e) => setSelectedRT(e.target.value)}
                >
                  <option value="">Pilih RT</option>
                  {rtSavings.length === 0 ? (
                    <option disabled>Belum ada RT dengan tabungan</option>
                  ) : (
                    rtSavings.map((rt) => (
                      <option key={rt.id} value={rt.rt}>
                        {rt.rt} - Saldo: Rp {rt.balance.toLocaleString('id-ID')}
                      </option>
                    ))
                  )}
                </select>
              </div>
              
              {selectedRTData && (
                <div className="bg-accent/30 p-3 rounded-lg">
                  <p className="text-sm font-medium">Saldo Tersedia</p>
                  <p className="text-lg font-bold text-success">Rp {selectedRTData.balance.toLocaleString('id-ID')}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="withdrawal-amount" className="text-sm font-medium">Jumlah Penarikan</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="withdrawal-amount"
                    type="number"
                    placeholder="0"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="pl-10 h-10 lg:h-12 text-sm lg:text-base"
                  />
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-2 lg:space-x-2 lg:gap-0">
                <Button onClick={handleWithdrawal} className="flex-1 h-10 lg:h-12 text-sm lg:text-base">
                  Proses Penarikan
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 lg:flex-none h-10 lg:h-12 text-sm lg:text-base"
                  onClick={() => {
                    setIsWithdrawDialogOpen(false);
                    setSelectedRT("");
                    setWithdrawalAmount("");
                  }}
                >
                  Batal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Total Tabungan</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 lg:px-6">
            <div className="text-lg lg:text-2xl font-bold text-success">Rp {totalSavings.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Saldo keseluruhan RW</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Total Setoran</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent className="px-3 lg:px-6">
            <div className="text-lg lg:text-2xl font-bold">Rp {totalDeposits.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Akumulasi setoran sampah</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Total Penarikan</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent className="px-3 lg:px-6">
            <div className="text-lg lg:text-2xl font-bold">Rp {totalWithdrawals.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">Total yang sudah ditarik</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* RT Savings List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
              <Target className="h-4 lg:h-5 w-4 lg:w-5" />
              <span>Tabungan per RT</span>
            </CardTitle>
            <CardDescription className="text-sm">Saldo dan aktivitas setiap RT</CardDescription>
          </CardHeader>
          <CardContent className="px-3 lg:px-6">
            <div className="space-y-3">
              {rtSavings.length === 0 ? (
                <div className="text-center py-6 lg:py-8 text-muted-foreground">
                  <Wallet className="h-10 lg:h-12 w-10 lg:w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Belum Ada Tabungan</h3>
                  <p className="text-sm">
                    Tabungan akan muncul setelah ada setoran sampah dari RT
                  </p>
                </div>
              ) : (
                rtSavings.map((rt) => (
                  <div key={rt.id} className="flex items-center justify-between p-3 lg:p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors">
                    <div>
                      <p className="font-medium text-sm lg:text-base">{rt.rt}</p>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 text-xs text-muted-foreground mt-1 space-y-1 lg:space-y-0">
                        <span>{rt.transactionCount} transaksi</span>
                        <span>Terakhir: {new Date(rt.lastTransaction).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success text-sm lg:text-base">Rp {rt.balance.toLocaleString('id-ID')}</p>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2 text-xs text-muted-foreground mt-1 space-y-1 lg:space-y-0">
                        <span className="flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1 text-success" />
                          {rt.totalDeposits.toLocaleString('id-ID')}
                        </span>
                        <span className="flex items-center">
                          <ArrowDownRight className="h-3 w-3 mr-1 text-warning" />
                          {rt.totalWithdrawals.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
              <History className="h-4 lg:h-5 w-4 lg:w-5" />
              <span>Riwayat Transaksi</span>
            </CardTitle>
            <CardDescription className="text-sm">Aktivitas terbaru tabungan</CardDescription>
          </CardHeader>
          <CardContent className="px-3 lg:px-6">
            <div className="space-y-3">
              {transactions.length === 0 ? (
                <div className="text-center py-6 lg:py-8 text-muted-foreground">
                  <History className="h-10 lg:h-12 w-10 lg:w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Belum Ada Transaksi</h3>
                  <p className="text-sm">
                    Riwayat transaksi akan muncul setelah ada aktivitas tabungan
                  </p>
                </div>
              ) : (
                transactions.slice(0, 8).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 lg:p-3 border-l-4 border-l-primary/20 bg-accent/20 rounded-r-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'deposit' 
                          ? 'bg-success/10' 
                          : 'bg-warning/10'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowUpRight className="h-4 w-4 text-success" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.rt}</p>
                        <p className="text-xs text-muted-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium text-sm ${
                        transaction.type === 'deposit' ? 'text-success' : 'text-warning'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}Rp {transaction.amount.toLocaleString('id-ID')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Saldo: Rp {transaction.balance.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};