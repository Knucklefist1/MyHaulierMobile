import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing, borderRadius, components } from '../../styles/designSystem';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  style,
  textStyle,
  ...props 
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    style
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? colors.white : colors.primary} 
          size="small" 
        />
      ) : (
        <Text style={buttonTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...components.button.primary,
    minHeight: 44,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    ...components.button.secondary,
  },
  ghost: {
    ...components.button.ghost,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.darkGray,
  },
  ghostText: {
    color: colors.primary,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default Button;

