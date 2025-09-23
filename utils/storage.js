import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_PROFILE: 'user_profile',
  OFFLINE_JOBS: 'offline_jobs',
  OFFLINE_APPLICATIONS: 'offline_applications',
  OFFLINE_CHATS: 'offline_chats',
  SETTINGS: 'app_settings'
};

// Token management
export const TokenStorage = {
  async setToken(token) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  async getToken() {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  async removeToken() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }
};

// User profile management
export const ProfileStorage = {
  async saveProfile(profile) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  },

  async getProfile() {
    try {
      const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  },

  async clearProfile() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    } catch (error) {
      console.error('Error clearing profile:', error);
    }
  }
};

// Offline data management
export const OfflineStorage = {
  async saveJobs(jobs) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_JOBS, JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving jobs offline:', error);
    }
  },

  async getJobs() {
    try {
      const jobs = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_JOBS);
      return jobs ? JSON.parse(jobs) : [];
    } catch (error) {
      console.error('Error getting offline jobs:', error);
      return [];
    }
  },

  async saveApplications(applications) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_APPLICATIONS, JSON.stringify(applications));
    } catch (error) {
      console.error('Error saving applications offline:', error);
    }
  },

  async getApplications() {
    try {
      const applications = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_APPLICATIONS);
      return applications ? JSON.parse(applications) : [];
    } catch (error) {
      console.error('Error getting offline applications:', error);
      return [];
    }
  },

  async saveChats(chats) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_CHATS, JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chats offline:', error);
    }
  },

  async getChats() {
    try {
      const chats = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_CHATS);
      return chats ? JSON.parse(chats) : [];
    } catch (error) {
      console.error('Error getting offline chats:', error);
      return [];
    }
  }
};

// App settings management
export const SettingsStorage = {
  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },

  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        notifications: true,
        darkMode: false,
        language: 'en'
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        notifications: true,
        darkMode: false,
        language: 'en'
      };
    }
  }
};

// Clear all data
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_TOKEN,
      STORAGE_KEYS.USER_PROFILE,
      STORAGE_KEYS.OFFLINE_JOBS,
      STORAGE_KEYS.OFFLINE_APPLICATIONS,
      STORAGE_KEYS.OFFLINE_CHATS,
      STORAGE_KEYS.SETTINGS
    ]);
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};
