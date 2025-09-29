
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Mock User type to avoid Firebase dependency
interface MockUser {
  uid: string;
  phoneNumber: string | null;
  displayName?: string | null;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signIn: (username: string, password?: string) => Promise<void>;
  updateUser: (user: MockUser | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_USER: MockUser = { uid: 'mock-user-id', phoneNumber: '+2348012345678', displayName: 'Farm Owner' };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('farmguard-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
    setLoading(false);
  }, []);

  const updateUser = (newUser: MockUser | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('farmguard-user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('farmguard-user');
    }
  }

  const signIn = async (username: string, password?: string) => {
    console.log('Simulating sign-in for user:', username);
    setLoading(true);
    // In a real app, you'd validate username and password
    await new Promise(res => setTimeout(res, 500));
    if(password === 'wrong') { // a little mock for error case
        setLoading(false);
        throw new Error('Invalid credentials');
    }
    updateUser({...FAKE_USER, displayName: username});
    setLoading(false);
  };

  const logout = async () => {
    console.log('Simulating logout');
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    updateUser(null);
    setLoading(false);
  };

  const value = { user, loading, signIn, updateUser, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
