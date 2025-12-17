// Genbrugelig Input-komponent - Standardiseret tekstinput med design system styling
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, components } from '../../styles/designSystem';

const Input = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.mediumGray}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    ...components.input,
  },
});

export default Input;

