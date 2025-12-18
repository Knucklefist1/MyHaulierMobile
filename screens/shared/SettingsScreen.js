import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { SettingsStorage } from '../../utils/storage';
import { styles } from '../../styles/screens/SettingsScreenStyles';
import { colors } from '../../styles/designSystem';

const SettingsScreen = ({ navigation }) => {
  const { userProfile, updateUserProfile } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    autoSync: true,
    locationTracking: true
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await SettingsStorage.getSettings();
      setSettings(savedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await SettingsStorage.saveSettings(newSettings);
      setSettings(newSettings);
      Alert.alert('Success', 'Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    saveSettings(newSettings);
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Language',
      'Select your preferred language',
      [
        { text: 'English', onPress: () => saveSettings({ ...settings, language: 'en' }) },
        { text: 'Danish', onPress: () => saveSettings({ ...settings, language: 'da' }) },
        { text: 'German', onPress: () => saveSettings({ ...settings, language: 'de' }) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const renderSettingItem = (title, subtitle, icon, onPress, rightComponent) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={colors.primary} />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your MyHaulier experience</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {renderSettingItem(
          'Push Notifications',
          'Receive alerts for new jobs and messages',
          'notifications',
          () => handleToggle('notifications'),
          <Switch
            value={settings.notifications}
            onValueChange={() => handleToggle('notifications')}
            trackColor={{ false: colors.mediumGray, true: colors.primary }}
            thumbColor={settings.notifications ? colors.white : colors.lightGray}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        {renderSettingItem(
          'Dark Mode',
          'Switch between light and dark themes',
          'moon',
          () => handleToggle('darkMode'),
          <Switch
            value={settings.darkMode}
            onValueChange={() => handleToggle('darkMode')}
            trackColor={{ false: '#767577', true: '#3498db' }}
            thumbColor={settings.darkMode ? '#ffffff' : '#f4f3f4'}
          />
        )}
        {renderSettingItem(
          'Language',
          `Current: ${settings.language === 'en' ? 'English' : settings.language === 'da' ? 'Danish' : 'German'}`,
          'language',
          handleLanguageChange,
          <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Location</Text>
        {renderSettingItem(
          'Location Tracking',
          'Allow app to track your location for better matching',
          'location',
          () => handleToggle('locationTracking'),
          <Switch
            value={settings.locationTracking}
            onValueChange={() => handleToggle('locationTracking')}
            trackColor={{ false: '#767577', true: '#3498db' }}
            thumbColor={settings.locationTracking ? '#ffffff' : '#f4f3f4'}
          />
        )}
        {renderSettingItem(
          'Auto Sync',
          'Automatically sync data when connected',
          'sync',
          () => handleToggle('autoSync'),
          <Switch
            value={settings.autoSync}
            onValueChange={() => handleToggle('autoSync')}
            trackColor={{ false: '#767577', true: '#3498db' }}
            thumbColor={settings.autoSync ? '#ffffff' : '#f4f3f4'}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {renderSettingItem(
          'Profile Information',
          'Update your personal details',
          'person',
          () => navigation.navigate('Profile'),
          <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
        )}
        {renderSettingItem(
          'Sign Out',
          'Sign out of your account',
          'log-out',
          () => {
            Alert.alert(
              'Sign Out',
              'Are you sure you want to sign out?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Out', style: 'destructive', onPress: () => navigation.navigate('Login') }
              ]
            );
          },
          <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
        )}
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
