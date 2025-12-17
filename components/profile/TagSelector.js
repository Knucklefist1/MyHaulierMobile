import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/HaulierProfileSetupScreenStyles';

const TagSelector = ({ 
  label, 
  options, 
  selectedValues, 
  onToggle,
  iconKey = null 
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.tagContainer}>
        {options.map((option) => {
          const value = option.id || option.value || option;
          const label = option.label || option.name || option;
          const isSelected = selectedValues.includes(value);
          const icon = iconKey && option[iconKey];
          
          return (
            <TouchableOpacity
              key={value}
              style={[
                styles.tag,
                isSelected && styles.selectedTag
              ]}
              onPress={() => onToggle(value)}
            >
              {icon && (
                <Ionicons 
                  name={icon} 
                  size={16} 
                  color={isSelected ? colors.white : colors.primary} 
                />
              )}
              <Text style={[
                styles.tagText,
                isSelected && styles.selectedTagText
              ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TagSelector;

