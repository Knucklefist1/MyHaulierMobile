import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows, components } from '../../styles/designSystem';

const Card = ({ children, style, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...components.card,
  },
});

export default Card;

