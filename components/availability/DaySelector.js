import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/screens/AvailabilityScreenStyles';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const DaySelector = ({ selectedDays, onToggleDay }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Working Days</Text>
      <View style={styles.daySelector}>
        {DAYS.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                isSelected && styles.dayButtonActive
              ]}
              onPress={() => onToggleDay(day)}
            >
              <Text style={[
                styles.dayButtonText,
                isSelected && styles.dayButtonTextActive
              ]}>
                {day.charAt(0).toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default DaySelector;

