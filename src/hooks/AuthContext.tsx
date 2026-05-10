import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AppRole = 'admin' | 'user';

interface AppUser {
  uid: string;
  email: string;
  name: string;
  role: AppRole;
}

interface AuthContextValue {
  user: AppUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_STORAGE_KEY = 'abubakar-arts-auth-user';
const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@abubakararts.com').trim().toLowerCase();
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '2268175';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as AppUser;
      setUser(parsed);
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const loginWithPassword = async (email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !password) {
      throw new Error('Email and password are required.');
    }

    const isAdmin = normalized === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    const appUser: AppUser = {
      uid: `local-${normalized}`,
      email: normalized,
      name: normalized.split('@')[0] || 'User',
      role: isAdmin ? 'admin' : 'user',
    };

    setUser(appUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(appUser));
  };

  const loginWithGoogle = async () => {
    const googleEmail = window.prompt('Enter your Google email:');
    const normalized = (googleEmail || '').trim().toLowerCase();
    if (!normalized) {
      throw new Error('Google login cancelled.');
    }
    const appUser: AppUser = {
      uid: `google-${normalized}`,
      email: normalized,
      name: normalized.split('@')[0] || 'User',
      role: normalized === ADMIN_EMAIL ? 'admin' : 'user',
    };
    setUser(appUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(appUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      loginWithPassword,
      loginWithGoogle,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
