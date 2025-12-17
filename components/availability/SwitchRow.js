import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { colors, spacing } from '../../styles/designSystem';
import { styles } from '../../styles/screens/AvailabilityScreenStyles';

const SwitchRow = ({ label, value, onValueChange, subtitle }) => {
  return (
    <View style={styles.inputGroup}>
      <View style={styles.switchRow}>
        <Text style={styles.inputLabel}>{label}</Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.borderGray, true: colors.primaryLight }}
          thumbColor={value ? colors.primary : colors.mediumGray}
        />
      </View>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  );
};

export default SwitchRow;

