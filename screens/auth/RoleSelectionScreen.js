import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { styles } from '../../styles/screens/RoleSelectionScreenStyles';
import { colors } from '../../styles/designSystem';

const RoleSelectionScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { updateUserProfile } = useAuth();

  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    
    try {
      await updateUserProfile({ userType: role });
      navigation.navigate('ProfileSetup');
    } catch (error) {
      Alert.alert('Error', 'Failed to save role selection');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select how you'll be using MyHaulier
        </Text>
      </View>

      <View style={styles.roleContainer}>
        <TouchableOpacity 
          style={[
            styles.roleCard,
            selectedRole === 'haulier' && styles.selectedRoleCard
          ]}
          onPress={() => handleRoleSelect('haulier')}
        >
          <View style={styles.roleIcon}>
            <Ionicons name="car" size={40} color={colors.primary} />
          </View>
          <Text style={styles.roleTitle}>Haulier</Text>
          <Text style={styles.roleDescription}>
            I transport goods and manage deliveries
          </Text>
          <View style={styles.roleFeatures}>
            <Text style={styles.featureText}>• Browse available jobs</Text>
            <Text style={styles.featureText}>• Apply to transport opportunities</Text>
            <Text style={styles.featureText}>• Track your applications</Text>
            <Text style={styles.featureText}>• Chat with forwarders</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.roleCard,
            selectedRole === 'forwarder' && styles.selectedRoleCard
          ]}
          onPress={() => handleRoleSelect('forwarder')}
        >
          <View style={styles.roleIcon}>
            <Ionicons name="business" size={40} color={colors.error} />
          </View>
          <Text style={styles.roleTitle}>Freight Forwarder</Text>
          <Text style={styles.roleDescription}>
            I coordinate shipments and manage logistics
          </Text>
          <View style={styles.roleFeatures}>
            <Text style={styles.featureText}>• Post transport jobs</Text>
            <Text style={styles.featureText}>• Review haulier applications</Text>
            <Text style={styles.featureText}>• Manage your postings</Text>
            <Text style={styles.featureText}>• Chat with hauliers</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You can change your role later in settings
        </Text>
      </View>
    </View>
  );
};

export default RoleSelectionScreen;
