import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LandingScreen = ({ onRoleSelect }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MyHaulier</Text>
        <Text style={styles.subtitle}>Your Logistics Partner</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to MyHaulier</Text>
        <Text style={styles.description}>
          Choose your role to get started with the right experience
        </Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity 
            style={styles.roleCard}
            onPress={() => onRoleSelect('haulier')}
          >
            <View style={styles.roleIcon}>
              <Text style={styles.iconText}>🚛</Text>
            </View>
            <Text style={styles.roleTitle}>Haulier</Text>
            <Text style={styles.roleDescription}>
              I transport goods and manage deliveries
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.roleCard}
            onPress={() => onRoleSelect('freight_forwarder')}
          >
            <View style={styles.roleIcon}>
              <Text style={styles.iconText}>📦</Text>
            </View>
            <Text style={styles.roleTitle}>Freight Forwarder</Text>
            <Text style={styles.roleDescription}>
              I coordinate shipments and manage logistics
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Connect • Transport • Deliver
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  roleContainer: {
    gap: 20,
  },
  roleCard: {
    backgroundColor: '#ffffff',
    padding: 25,
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
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconText: {
    fontSize: 36,
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
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#95a5a6',
    fontWeight: '500',
  },
});

export default LandingScreen;
