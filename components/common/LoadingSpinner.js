import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, textStyles, spacing } from '../../styles/designSystem';

const LoadingSpinner = ({ message = 'Loading...', size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  message: {
    ...textStyles.body,
    color: colors.mediumGray,
    marginTop: spacing[3],
  },
});

export default LoadingSpinner;

