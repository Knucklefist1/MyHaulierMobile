import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { styles } from '../../styles/screens/AvailabilityScreenStyles';

const NumberInput = ({ label, value, onChangeText, keyboardType = 'numeric' }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.numberInput}
        value={value.toString()}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default NumberInput;

