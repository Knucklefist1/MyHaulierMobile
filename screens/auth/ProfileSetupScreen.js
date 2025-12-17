import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { styles } from '../../styles/screens/ProfileSetupScreenStyles';
import { colors } from '../../styles/designSystem';

const ProfileSetupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    phone: '',
    company: '',
    licenseNumber: '',
    experience: ''
  });
  const [loading, setLoading] = useState(false);
  const { userProfile, updateUserProfile } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await updateUserProfile({
        phone: formData.phone,
        company: formData.company,
        licenseNumber: formData.licenseNumber,
        experience: formData.experience,
        isVerified: false
      });
      Alert.alert(
        'Welcome to MyHaulier!',
        'Your profile has been set up successfully. You can now start using the app.',
        [{ text: 'Get Started', onPress: () => {} }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile information');
    } finally {
      setLoading(false);
    }
  };

  const isHaulier = userProfile?.userType === 'haulier';

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Help us personalize your {isHaulier ? 'haulier' : 'forwarder'} experience
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="business-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={isHaulier ? "Company/Transport Company" : "Company Name"}
              value={formData.company}
              onChangeText={(value) => handleInputChange('company', value)}
              autoCapitalize="words"
            />
          </View>

          {isHaulier && (
            <>
              <View style={styles.inputContainer}>
                <Ionicons name="card-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Driver License Number"
                  value={formData.licenseNumber}
                  onChangeText={(value) => handleInputChange('licenseNumber', value)}
                  autoCapitalize="characters"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="time-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Years of Experience"
                  value={formData.experience}
                  onChangeText={(value) => handleInputChange('experience', value)}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.completeButton, loading && styles.disabledButton]}
            onPress={handleComplete}
            disabled={loading}
          >
            <Text style={styles.completeButtonText}>
              {loading ? 'Setting Up...' : 'Complete Setup'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleComplete}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileSetupScreen;
