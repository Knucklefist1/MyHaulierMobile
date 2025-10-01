import React, { createContext, useContext, useState, useEffect } from 'react';
import { TokenStorage, ProfileStorage, clearAllData } from '../utils/storage';

// Development AuthContext that works without Firebase
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
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user creation
    const mockUser = {
      uid: 'mock-user-id',
      email: email,
      displayName: userData.name
    };
    
    const mockProfile = {
      uid: 'mock-user-id',
      email: email,
      name: userData.name,
      userType: userData.userType,
      phone: userData.phone || '',
      company: userData.company || '',
      licenseNumber: userData.licenseNumber || '',
      experience: userData.experience || '',
      profileImage: '',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setCurrentUser(mockUser);
    setUserProfile(mockProfile);
    
    return { user: mockUser };
  };

  // Mock sign in function
  const signin = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determine user type based on email
    const isForwarder = email === 'forwarder@example.com';
    const userType = isForwarder ? 'forwarder' : 'haulier';
    const displayName = isForwarder ? 'Demo Forwarder' : 'Demo Haulier';
    const company = isForwarder ? 'Demo Freight Forwarder' : 'Demo Transport Company';
    
    // Mock user login
    const mockUser = {
      uid: 'mock-user-id',
      email: email,
      displayName: displayName
    };
    
    const mockProfile = {
      uid: 'mock-user-id',
      email: email,
      name: displayName,
      userType: userType,
      phone: '+45 12 34 56 78',
      company: company,
      licenseNumber: isForwarder ? 'FF123456789' : 'DL123456789',
      experience: '5 years',
      profileImage: '',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Save to local storage
    await TokenStorage.setToken('mock-token');
    await ProfileStorage.saveProfile(mockProfile);
    
    setCurrentUser(mockUser);
    setUserProfile(mockProfile);
    
    return { user: mockUser };
  };

  // Mock sign out function
  const logout = async () => {
    // Clear local storage
    await TokenStorage.removeToken();
    await ProfileStorage.clearProfile();
    await clearAllData();
    
    setCurrentUser(null);
    setUserProfile(null);
  };

  // Mock update user profile
  const updateUserProfile = async (updates) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...updates };
      setUserProfile(updatedProfile);
      await ProfileStorage.saveProfile(updatedProfile);
    }
  };

  // Mock get user profile
  const getUserProfile = async (uid) => {
    return userProfile;
  };

  useEffect(() => {
    // Check for existing session
    const checkExistingSession = async () => {
      setLoading(true);
      try {
        const token = await TokenStorage.getToken();
        const profile = await ProfileStorage.getProfile();
        
        if (token && profile) {
          setCurrentUser({ uid: profile.uid, email: profile.email, displayName: profile.name });
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkExistingSession();
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    signin,
    logout,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};