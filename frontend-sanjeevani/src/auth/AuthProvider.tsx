import type { User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { subscribeAuth } from './firebase';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return subscribeAuth(u => {
      setUser(u);
      setLoading(false);
    });
  }, []);
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}