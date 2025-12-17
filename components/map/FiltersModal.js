import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/MapScreenStyles';

const FiltersModal = ({ visible, onClose, filters, onFilterChange }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.filtersContainer}>
        <View style={styles.filtersHeader}>
          <Text style={styles.filtersTitle}>Filter Partnerships</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.filtersContent}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Maximum Distance (km)</Text>
            <TextInput
              style={styles.filterInput}
              value={filters.maxDistance.toString()}
              onChangeText={(text) => onFilterChange('maxDistance', parseInt(text) || 500)}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Minimum Rating</Text>
            <TextInput
              style={styles.filterInput}
              value={filters.minRating.toString()}
              onChangeText={(text) => onFilterChange('minRating', parseInt(text) || 0)}
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
        
        <View style={styles.filtersFooter}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={onClose}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FiltersModal;

