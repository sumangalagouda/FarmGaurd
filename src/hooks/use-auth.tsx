
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
  signIn: (phoneNumber: string) => Promise<any>;
  confirmCode: (confirmationResult: any, code: string) => Promise<void>;
  logout: () => Promise<void>;
  setupRecaptcha: (elementId: string) => void;
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
  
  const setupRecaptcha = (elementId: string) => {
    // Mock function, does nothing
    console.log('Mock Recaptcha setup on:', elementId);
  }

  const signIn = async (phoneNumber: string) => {
    console.log('Simulating sign-in for:', phoneNumber);
    // Return a mock confirmation result
    return Promise.resolve({
        confirm: async (code: string) => {
            console.log('Simulating code confirmation');
            setLoading(true);
            await new Promise(res => setTimeout(res, 500));
            updateUser({...FAKE_USER, phoneNumber});
            setLoading(false);
        }
    });
  };
  
  const confirmCode = async (confirmationResult: any, code: string) => {
      console.log('Confirming code:', code);
      await confirmationResult.confirm(code);
  }

  const logout = async () => {
    console.log('Simulating logout');
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    updateUser(null);
    setLoading(false);
  };

  const value = { user, loading, signIn, confirmCode, logout, setupRecaptcha };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Keep the global declaration to avoid breaking other files if they reference it.
declare global {
    interface Window {
        recaptchaVerifier: any;
    }
}
