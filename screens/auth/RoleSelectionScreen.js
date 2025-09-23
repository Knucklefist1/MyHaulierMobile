import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

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
            <Ionicons name="car" size={40} color="#3498db" />
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
            <Ionicons name="business" size={40} color="#e74c3c" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  roleCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRoleCard: {
    borderColor: '#3498db',
    backgroundColor: '#f8f9ff',
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  roleFeatures: {
    alignSelf: 'stretch',
  },
  featureText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
    textAlign: 'left',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
  },
});

export default RoleSelectionScreen;
