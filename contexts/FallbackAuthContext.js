import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

// Fallback AuthContext that works without Firebase
const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock sign up function
  const signup = async (email, password, userData) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const mockUser = {
        uid: 'mock-user-' + Date.now(),
        email: email,
        displayName: userData.name
      };
      
      const mockProfile = {
        uid: mockUser.uid,
        email: email,
        name: userData.name,
        userType: userData.userType || 'haulier',
        phone: userData.phone || '',
        company: userData.company || '',
        licenseNumber: userData.licenseNumber || '',
        experience: userData.experience || '',
        profileImage: '',
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setCurrentUser(mockUser);
      setUserProfile(mockProfile);
      
      return { user: mockUser };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock sign in function
  const signin = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user login
      const mockUser = {
        uid: 'mock-user-' + Date.now(),
        email: email,
        displayName: 'Demo User'
      };
      
      const mockProfile = {
        uid: mockUser.uid,
        email: email,
        name: 'Demo User',
        userType: 'haulier', // Default to haulier for demo
        phone: '+45 12 34 56 78',
        company: 'Demo Transport Company',
        licenseNumber: 'DL123456789',
        experience: '5 years',
        profileImage: '',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setCurrentUser(mockUser);
      setUserProfile(mockProfile);
      
      return { user: mockUser };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock sign out function
  const logout = async () => {
    setCurrentUser(null);
    setUserProfile(null);
  };

  // Mock update user profile
  const updateUserProfile = async (updates) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...updates };
      setUserProfile(updatedProfile);
    }
  };

  // Mock get user profile
  const getUserProfile = async (uid) => {
    return userProfile;
  };

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    signin,
    logout,
    updateUserProfile,
    getUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
