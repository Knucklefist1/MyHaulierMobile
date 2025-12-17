import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/screens/LandingScreenStyles';

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

export default LandingScreen;
