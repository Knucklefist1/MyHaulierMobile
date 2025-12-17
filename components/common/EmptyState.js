import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, textStyles, spacing } from '../../styles/designSystem';
import Button from './Button';

const EmptyState = ({ 
  icon = 'alert-circle-outline', 
  title, 
  subtitle, 
  actionLabel,
  onAction,
  iconSize = 64,
  iconColor = colors.mediumGray
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={iconSize} color={iconColor} />
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[16],
    paddingHorizontal: spacing[4],
  },
  title: {
    ...textStyles.h2,
    marginTop: spacing[4],
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  subtitle: {
    ...textStyles.caption,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  button: {
    marginTop: spacing[2],
  },
});

export default EmptyState;

