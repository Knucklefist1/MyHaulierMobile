import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { styles } from '../../styles/screens/ProfileScreenStyles';

const ProfileScreen = ({ navigation }) => {
  const { currentUser, userProfile, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
    company: userProfile?.company || '',
    licenseNumber: userProfile?.licenseNumber || '',
    experience: userProfile?.experience || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isHaulier = userProfile?.userType === 'haulier';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#7f8c8d" />
          </View>
        </View>
        <Text style={styles.name}>{userProfile?.name || 'User'}</Text>
        <Text style={styles.role}>
          {isHaulier ? 'Haulier' : 'Freight Forwarder'}
        </Text>
        <Text style={styles.email}>{userProfile?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          ) : (
            <Text style={styles.fieldValue}>{userProfile?.name || 'Not set'}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Phone</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.fieldValue}>{userProfile?.phone || 'Not set'}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Company</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.company}
              onChangeText={(value) => handleInputChange('company', value)}
            />
          ) : (
            <Text style={styles.fieldValue}>{userProfile?.company || 'Not set'}</Text>
          )}
        </View>

        {isHaulier && (
          <>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>License Number</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.licenseNumber}
                  onChangeText={(value) => handleInputChange('licenseNumber', value)}
                />
              ) : (
                <Text style={styles.fieldValue}>{userProfile?.licenseNumber || 'Not set'}</Text>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Experience</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={formData.experience}
                  onChangeText={(value) => handleInputChange('experience', value)}
                />
              ) : (
                <Text style={styles.fieldValue}>{userProfile?.experience || 'Not set'}</Text>
              )}
            </View>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings" size={24} color="#7f8c8d" />
          <Text style={styles.settingText}>App Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications" size={24} color="#7f8c8d" />
          <Text style={styles.settingText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search" size={24} color="#7f8c8d" />
          <Text style={styles.settingText}>Search Partners</Text>
          <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('MapMain')}
        >
          <Ionicons name="map" size={24} color="#7f8c8d" />
          <Text style={styles.settingText}>Partnership Map</Text>
          <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
        </TouchableOpacity>

        {isHaulier && (
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('AvailabilityMain')}
          >
            <Ionicons name="calendar" size={24} color="#7f8c8d" />
            <Text style={styles.settingText}>My Availability</Text>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="shield-checkmark" size={24} color="#7f8c8d" />
          <Text style={styles.settingText}>Privacy Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
        </TouchableOpacity>

        {!isHaulier && (
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('Analytics')}
          >
            <Ionicons name="analytics" size={24} color="#7f8c8d" />
            <Text style={styles.settingText}>Analytics Dashboard</Text>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.saveButton, loading && styles.disabledButton]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setIsEditing(false);
                setFormData({
                  name: userProfile?.name || '',
                  phone: userProfile?.phone || '',
                  company: userProfile?.company || '',
                  licenseNumber: userProfile?.licenseNumber || '',
                  experience: userProfile?.experience || ''
                });
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
