import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../common';
import { styles } from '../../styles/screens/MatchingScreenStyles';

const FilterModal = ({
  visible,
  filters,
  onClose,
  onClear,
  onApply,
  onFilterChange,
  onMultiSelectFilter,
  countries,
  truckTypes,
  trailerTypes,
  certifications,
  languages,
  specialEquipment,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalCancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity onPress={onClear}>
            <Text style={styles.modalClear}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Countries Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Operating Countries</Text>
            <View style={styles.optionsContainer}>
              {countries.map((country, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    filters.countries.includes(country) && styles.selectedOption
                  ]}
                  onPress={() => onMultiSelectFilter('countries', country)}
                >
                  <Text style={[
                    styles.optionText,
                    filters.countries.includes(country) && styles.selectedOptionText
                  ]}>
                    {country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Truck Types Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Truck Types</Text>
            <View style={styles.optionsContainer}>
              {truckTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    filters.truckTypes.includes(type) && styles.selectedOption
                  ]}
                  onPress={() => onMultiSelectFilter('truckTypes', type)}
                >
                  <Text style={[
                    styles.optionText,
                    filters.truckTypes.includes(type) && styles.selectedOptionText
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Fleet Size Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Fleet Size</Text>
            <View style={styles.rangeContainer}>
              <Text style={styles.rangeLabel}>Min Trucks: {filters.minTrucks}</Text>
              <Text style={styles.rangeLabel}>Max Trucks: {filters.maxTrucks}</Text>
            </View>
          </View>

          {/* Rating Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Rating</Text>
            <View style={styles.rangeContainer}>
              <Text style={styles.rangeLabel}>Min Rating: {filters.minRating}</Text>
              <Text style={styles.rangeLabel}>Max Rating: {filters.maxRating}</Text>
            </View>
          </View>

          {/* Experience Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Experience (Years)</Text>
            <View style={styles.rangeContainer}>
              <Text style={styles.rangeLabel}>Min: {filters.minExperience}</Text>
              <Text style={styles.rangeLabel}>Max: {filters.maxExperience}</Text>
            </View>
          </View>

          {/* Availability Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Availability</Text>
            <View style={styles.radioContainer}>
              {['all', 'available', 'unavailable'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.radioButton,
                    filters.availability === option && styles.selectedRadio
                  ]}
                  onPress={() => onFilterChange('availability', option)}
                >
                  <Text style={[
                    styles.radioText,
                    filters.availability === option && styles.selectedRadioText
                  ]}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Certifications Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Certifications</Text>
            <View style={styles.optionsContainer}>
              {certifications.map((cert, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    filters.certifications.includes(cert) && styles.selectedOption
                  ]}
                  onPress={() => onMultiSelectFilter('certifications', cert)}
                >
                  <Text style={[
                    styles.optionText,
                    filters.certifications.includes(cert) && styles.selectedOptionText
                  ]}>
                    {cert}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Languages Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Languages</Text>
            <View style={styles.optionsContainer}>
              {languages.map((lang, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    filters.languages.includes(lang) && styles.selectedOption
                  ]}
                  onPress={() => onMultiSelectFilter('languages', lang)}
                >
                  <Text style={[
                    styles.optionText,
                    filters.languages.includes(lang) && styles.selectedOptionText
                  ]}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Special Equipment Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Special Equipment</Text>
            <View style={styles.optionsContainer}>
              {specialEquipment.map((equipment, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    filters.specialEquipment.includes(equipment) && styles.selectedOption
                  ]}
                  onPress={() => onMultiSelectFilter('specialEquipment', equipment)}
                >
                  <Text style={[
                    styles.optionText,
                    filters.specialEquipment.includes(equipment) && styles.selectedOptionText
                  ]}>
                    {equipment}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <Button
            title="Apply Filters"
            onPress={onApply}
            variant="primary"
            style={styles.applyButton}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

