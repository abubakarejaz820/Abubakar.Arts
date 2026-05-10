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
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string }) => void;
          }) => { requestAccessToken: (options?: { prompt?: string }) => void };
        };
      };
    };
  }
}

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

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || window.google?.accounts?.oauth2) return;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
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
    if (GOOGLE_CLIENT_ID && window.google?.accounts?.oauth2) {
      const accessToken = await new Promise<string>((resolve, reject) => {
        const tokenClient = window.google?.accounts?.oauth2?.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'openid email profile',
          callback: (response) => {
            if (response.error || !response.access_token) {
              reject(new Error('Google login failed.'));
              return;
            }
            resolve(response.access_token);
          },
        });

        if (!tokenClient) {
          reject(new Error('Google login not available.'));
          return;
        }
        tokenClient.requestAccessToken({ prompt: 'consent' });
      });

      const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!profileRes.ok) {
        throw new Error('Failed to load Google profile.');
      }
      const profile = (await profileRes.json()) as { email?: string; name?: string; sub?: string };
      const normalized = (profile.email || '').trim().toLowerCase();
      if (!normalized) {
        throw new Error('Google account email not found.');
      }
      const appUser: AppUser = {
        uid: profile.sub || `google-${normalized}`,
        email: normalized,
        name: profile.name || normalized.split('@')[0] || 'User',
        role: normalized === ADMIN_EMAIL ? 'admin' : 'user',
      };
      setUser(appUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(appUser));
      return;
    }

    const fallbackEmail = window.prompt('Google auth not configured. Enter your Google email:');
    const normalized = (fallbackEmail || '').trim().toLowerCase();
    if (!normalized) throw new Error('Google login cancelled.');
    const appUser: AppUser = {
      uid: `google-fallback-${normalized}`,
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
