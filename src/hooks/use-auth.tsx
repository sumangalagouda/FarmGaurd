
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Mock User type to avoid Firebase dependency
interface MockUser {
  uid: string;
  phoneNumber: string | null;
  displayName?: string | null;
  location?: string;
  experience?: string;
  role?: 'farmer' | 'company' | 'veterinarian';
  username?: string; // Added for vet/company login
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signIn: (username: string, password?: string, extraData?: Partial<MockUser>) => Promise<void>;
  updateUser: (user: MockUser | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_USER: MockUser = { uid: 'mock-user-id', phoneNumber: '+2348012345678', displayName: 'Farm Owner', location: 'Jos, Plateau State', experience: '2-5', role: 'farmer' };

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

  const signIn = async (username: string, password?: string, extraData?: Partial<MockUser>) => {
    console.log('Simulating sign-in for user:', username);
    setLoading(true);
    // In a real app, you'd validate username and password
    await new Promise(res => setTimeout(res, 500));
    if(password === 'wrong') { // a little mock for error case
        setLoading(false);
        throw new Error('Invalid credentials');
    }
    
    const role = extraData?.role || 'farmer';
    let baseUser: MockUser;

    switch(role) {
        case 'company':
            baseUser = { uid: 'mock-company-id', phoneNumber: null, displayName: username, username, role: 'company' };
            break;
        case 'veterinarian':
            baseUser = { uid: 'mock-vet-id', phoneNumber: null, displayName: extraData?.displayName || username, username, role: 'veterinarian' };
            break;
        default:
            baseUser = { ...FAKE_USER, username };
    }

    updateUser({...baseUser, ...extraData});
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
