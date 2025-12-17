import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../styles/designSystem';
import { styles as screenStyles } from '../../styles/screens/AvailabilityScreenStyles';

const SelectionModal = ({ 
  visible, 
  onClose, 
  title, 
  options, 
  selectedValues, 
  onToggle,
  formatLabel = (item) => item.label || item.name || item
}) => {
  const isSelected = (value) => {
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(value);
    }
    return selectedValues === value;
  };

  const getValue = (item) => {
    return item.value || item.code || item.id || item;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={screenStyles.modalContainer}>
        <View style={screenStyles.modalHeader}>
          <Text style={screenStyles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        <ScrollView style={screenStyles.modalContent}>
          {options.map((option) => {
            const value = getValue(option);
            const selected = isSelected(value);
            return (
              <TouchableOpacity
                key={value}
                style={screenStyles.optionItem}
                onPress={() => onToggle(value)}
              >
                <Text style={screenStyles.optionText}>{formatLabel(option)}</Text>
                {selected && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SelectionModal;

