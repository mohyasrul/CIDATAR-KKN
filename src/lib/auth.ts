export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'operator';
  createdAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Default users - in production, this should be in a secure database
const DEFAULT_USERS: (User & { password: string })[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    username: 'operator',
    password: 'operator123',
    name: 'Operator Bank Sampah',
    role: 'operator',
    createdAt: new Date().toISOString()
  }
];

const AUTH_STORAGE_KEY = 'bank_sampah_auth';
const USERS_STORAGE_KEY = 'bank_sampah_users';

// Initialize default users if not exists
export const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (!existingUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
  }
};

// Get all users
export const getUsers = (): (User & { password: string })[] => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : DEFAULT_USERS;
};

// Login function
export const login = (credentials: LoginCredentials): { success: boolean; user?: User; error?: string } => {
  const users = getUsers();
  const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    return { success: true, user: userWithoutPassword };
  }
  
  return { success: false, error: 'Username atau password salah' };
};

// Logout function
export const logout = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

// Get current user
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(AUTH_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Check if user has admin role
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

// Add new user (admin only)
export const addUser = (userData: Omit<User & { password: string }, 'id' | 'createdAt'>): boolean => {
  if (!isAdmin()) return false;
  
  const users = getUsers();
  const newUser = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return true;
};

// Update user (admin only)
export const updateUser = (id: string, updates: Partial<User & { password?: string }>): boolean => {
  if (!isAdmin()) return false;
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) return false;
  
  users[userIndex] = { ...users[userIndex], ...updates };
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return true;
};

// Delete user (admin only)
export const deleteUser = (id: string): boolean => {
  if (!isAdmin()) return false;
  
  const users = getUsers();
  const filteredUsers = users.filter(u => u.id !== id);
  
  if (filteredUsers.length === users.length) return false;
  
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filteredUsers));
  return true;
};
