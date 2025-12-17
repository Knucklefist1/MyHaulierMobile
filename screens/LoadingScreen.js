import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from '../styles/screens/LoadingScreenStyles';
import { colors } from '../styles/designSystem';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyHaulier</Text>
      <ActivityIndicator size={40} color={colors.primary} style={styles.loader} />
      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
