// Autentificeringscontext - Håndterer brugerlogin, signup og profil uden Firebase
// Bruger AsyncStorage til lokal lagring af brugerdata
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (email, password, userData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

  const signin = async (email, password) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isForwarder = email === 'forwarder@example.com';
      const isHaulier = email === 'haulier@example.com';
      
      if (!isForwarder && !isHaulier) {
        throw new Error('Invalid credentials. Use forwarder@example.com or haulier@example.com');
      }
      
      const userType = isForwarder ? 'forwarder' : 'haulier';
      const displayName = isForwarder ? 'Demo Forwarder' : 'Demo Haulier';
      const company = isForwarder ? 'Demo Freight Forwarder' : 'Demo Transport Company';
      const licenseNumber = isForwarder ? 'FF123456789' : 'DL123456789';
      
      const mockUser = {
        uid: 'mock-user-' + Date.now(),
        email: email,
        displayName: displayName
      };
      
      const mockProfile = {
        uid: mockUser.uid,
        email: email,
        name: displayName,
        userType: userType,
        phone: '+45 12 34 56 78',
        company: company,
        licenseNumber: licenseNumber,
        experience: '5 years',
        profileImage: '',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fleet: {
          totalTrucks: 0,
          availableTrucks: 0,
          truckTypes: [],
          trailerTypes: [],
          maxWeight: 0,
          maxLength: 0,
          maxHeight: 0,
          specialEquipment: []
        },
        operatingRegions: {
          countries: [],
          regions: [],
          specificRoutes: []
        },
        capabilities: {
          cargoTypes: [],
          industries: [],
          certifications: [],
          languages: []
        },
        availability: {
          isAvailable: false,
          availableTrucks: 0,
          workingDays: [],
          workingHours: { start: '', end: '' },
          emergencyAvailable: false,
          weekendWork: false,
          lastUpdated: new Date().toISOString()
        },
        performance: {
          rating: 0,
          totalJobs: 0,
          completedJobs: 0,
          onTimeDelivery: 0,
          customerSatisfaction: 0
        },
        pricing: {
          baseRate: 0,
          currency: '',
          fuelSurcharge: 0,
          tollIncluded: false
        }
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

  const logout = async () => {
    setCurrentUser(null);
    setUserProfile(null);
  };

  const updateUserProfile = async (updates) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...updates };
      setUserProfile(updatedProfile);
    }
  };

  const getUserProfile = async (uid) => {
    return userProfile;
  };

  useEffect(() => {
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
