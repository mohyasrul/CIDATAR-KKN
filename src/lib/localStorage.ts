// Utility functions untuk localStorage
export const STORAGE_KEYS = {
  RT_LIST: 'banksampah_rt_list',
  WASTE_DEPOSITS: 'banksampah_waste_deposits',
  RT_SAVINGS: 'banksampah_rt_savings',
  TRANSACTIONS: 'banksampah_transactions',
  APP_SETTINGS: 'banksampah_app_settings',
  WASTE_PRICES: 'banksampah_waste_prices'
} as const;

// Generic localStorage helper functions
export const storage = {
  // Get data from localStorage with fallback
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return fallback;
    }
  },

  // Set data to localStorage
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key, value } }));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  },

  // Remove data from localStorage
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage key "${key}":`, error);
    }
  },

  // Clear all app data
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      this.remove(key);
    });
  }
};

// Specific helper functions for each data type
export const rtStorage = {
  get: () => storage.get(STORAGE_KEYS.RT_LIST, []),
  set: (data: any[]) => storage.set(STORAGE_KEYS.RT_LIST, data),
  add: (rt: any) => {
    const current = rtStorage.get();
    const updated = [...current, rt];
    rtStorage.set(updated);
    return updated;
  },
  update: (id: string, updatedRT: any) => {
    const current = rtStorage.get();
    const updated = current.map((rt: any) => rt.id === id ? updatedRT : rt);
    rtStorage.set(updated);
    return updated;
  },
  remove: (id: string) => {
    const current = rtStorage.get();
    const updated = current.filter((rt: any) => rt.id !== id);
    rtStorage.set(updated);
    return updated;
  }
};

export const wasteDepositStorage = {
  get: () => storage.get(STORAGE_KEYS.WASTE_DEPOSITS, []),
  set: (data: any[]) => storage.set(STORAGE_KEYS.WASTE_DEPOSITS, data),
  add: (deposit: any) => {
    const current = wasteDepositStorage.get();
    const updated = [deposit, ...current];
    wasteDepositStorage.set(updated);
    return updated;
  }
};

export const rtSavingsStorage = {
  get: () => storage.get(STORAGE_KEYS.RT_SAVINGS, []),
  set: (data: any[]) => storage.set(STORAGE_KEYS.RT_SAVINGS, data),
  updateBalance: (rtName: string, amount: number, isDeposit: boolean = true) => {
    const current = rtSavingsStorage.get();
    const existing = current.find((rt: any) => rt.rt === rtName);
    
    if (existing) {
      // Update existing RT savings
      const updated = current.map((rt: any) => {
        if (rt.rt === rtName) {
          return {
            ...rt,
            balance: isDeposit ? rt.balance + amount : rt.balance - amount,
            totalDeposits: isDeposit ? rt.totalDeposits + amount : rt.totalDeposits,
            totalWithdrawals: isDeposit ? rt.totalWithdrawals : rt.totalWithdrawals + amount,
            transactionCount: rt.transactionCount + 1,
            lastTransaction: new Date().toISOString().split('T')[0]
          };
        }
        return rt;
      });
      rtSavingsStorage.set(updated);
      return updated;
    } else if (isDeposit) {
      // Create new RT savings entry
      const newRTSaving = {
        id: Date.now().toString(),
        rt: rtName,
        balance: amount,
        totalDeposits: amount,
        totalWithdrawals: 0,
        transactionCount: 1,
        lastTransaction: new Date().toISOString().split('T')[0]
      };
      const updated = [...current, newRTSaving];
      rtSavingsStorage.set(updated);
      return updated;
    }
    return current;
  }
};

export const transactionStorage = {
  get: () => storage.get(STORAGE_KEYS.TRANSACTIONS, []),
  set: (data: any[]) => storage.set(STORAGE_KEYS.TRANSACTIONS, data),
  add: (transaction: any) => {
    const current = transactionStorage.get();
    const updated = [transaction, ...current];
    transactionStorage.set(updated);
    return updated;
  }
};

export const appSettingsStorage = {
  get: () => storage.get(STORAGE_KEYS.APP_SETTINGS, {
    autoBackup: true,
    notifications: true,
    emailReports: false,
    whatsappNotifications: true,
    dataRetentionDays: 365,
    rwName: "",
    contactPerson: "",
    contactPhone: "",
    address: ""
  }),
  set: (data: any) => storage.set(STORAGE_KEYS.APP_SETTINGS, data)
};

export const wastePricesStorage = {
  get: () => storage.get(STORAGE_KEYS.WASTE_PRICES, [
    { id: "plastik", name: "Plastik", pricePerKg: 5000, unit: "kg" },
    { id: "kertas", name: "Kertas", pricePerKg: 3000, unit: "kg" },
    { id: "logam", name: "Logam", pricePerKg: 8000, unit: "kg" },
    { id: "kaca", name: "Kaca", pricePerKg: 2000, unit: "kg" },
    { id: "kardus", name: "Kardus", pricePerKg: 2500, unit: "kg" }
  ]),
  set: (data: any[]) => storage.set(STORAGE_KEYS.WASTE_PRICES, data),
  update: (id: string, newPrice: number) => {
    const current = wastePricesStorage.get();
    const updated = current.map((waste: any) => 
      waste.id === id ? { ...waste, pricePerKg: newPrice } : waste
    );
    wastePricesStorage.set(updated);
    return updated;
  }
};
