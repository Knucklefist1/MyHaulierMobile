import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';
import availabilityService from '../../services/AvailabilityService';

const AvailabilityScreen = ({ navigation }) => {
  const [availability, setAvailability] = useState({
    isAvailable: true,
    availableTrucks: 3,
    operatingCountries: ['DK', 'SE', 'NO'],
    truckTypes: ['dry_van', 'reefer'],
    trailerTypes: ['standard', 'extendable'],
    maxWeight: 24,
    maxLength: 13.6,
    maxHeight: 4.0,
    specialEquipment: ['crane', 'forklift'],
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    workingHours: { start: '08:00', end: '17:00' },
    emergencyAvailable: true,
    weekendWork: false,
    baseRate: 8.5,
    currency: 'DKK',
    fuelSurcharge: 0.15,
    tollIncluded: true,
    notes: ''
  });

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showTruckTypeModal, setShowTruckTypeModal] = useState(false);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  const countryOptions = [
    { code: 'DK', name: 'Denmark' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'FI', name: 'Finland' },
    { code: 'DE', name: 'Germany' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'FR', name: 'France' },
    { code: 'PL', name: 'Poland' }
  ];

  const truckTypeOptions = [
    { value: 'dry_van', label: 'Dry Van' },
    { value: 'reefer', label: 'Reefer' },
    { value: 'flatbed', label: 'Flatbed' },
    { value: 'container', label: 'Container' },
    { value: 'tanker', label: 'Tanker' }
  ];

  const equipmentOptions = [
    'crane', 'forklift', 'pallet_jack', 'loading_ramp', 
    'temperature_control', 'security_system', 'gps_tracking'
  ];

  const handleSaveAvailability = async () => {
    try {
      // Save to AvailabilityService
      const success = await availabilityService.saveAvailability('demo-haulier-1', {
        ...availability,
        name: 'Demo Haulier',
        company: 'Demo Transport Company',
        phone: '+45 12 34 56 78',
        totalTrucks: 10,
        regions: ['Denmark'],
        specificRoutes: ['Copenhagen-Aarhus'],
        cargoTypes: ['general', 'fragile'],
        industries: ['general'],
        certifications: ['ADR'],
        languages: ['en', 'da']
      });
      
      if (success) {
        Alert.alert('Success', 'Your availability has been updated!');
      } else {
        Alert.alert('Error', 'Failed to save availability');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save availability');
    }
  };

  const toggleCountry = (countryCode) => {
    const currentCountries = availability.operatingCountries;
    if (currentCountries.includes(countryCode)) {
      setAvailability({
        ...availability,
        operatingCountries: currentCountries.filter(c => c !== countryCode)
      });
    } else {
      setAvailability({
        ...availability,
        operatingCountries: [...currentCountries, countryCode]
      });
    }
  };

  const toggleTruckType = (truckType) => {
    const currentTypes = availability.truckTypes;
    if (currentTypes.includes(truckType)) {
      setAvailability({
        ...availability,
        truckTypes: currentTypes.filter(t => t !== truckType)
      });
    } else {
      setAvailability({
        ...availability,
        truckTypes: [...currentTypes, truckType]
      });
    }
  };

  const toggleEquipment = (equipment) => {
    const currentEquipment = availability.specialEquipment;
    if (currentEquipment.includes(equipment)) {
      setAvailability({
        ...availability,
        specialEquipment: currentEquipment.filter(e => e !== equipment)
      });
    } else {
      setAvailability({
        ...availability,
        specialEquipment: [...currentEquipment, equipment]
      });
    }
  };

  const renderCountryModal = () => (
    <Modal
      visible={showCountryModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Operating Countries</Text>
          <TouchableOpacity onPress={() => setShowCountryModal(false)}>
            <Ionicons name="close" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalContent}>
          {countryOptions.map((country) => (
            <TouchableOpacity
              key={country.code}
              style={styles.optionItem}
              onPress={() => toggleCountry(country.code)}
            >
              <Text style={styles.optionText}>{country.name}</Text>
              {availability.operatingCountries.includes(country.code) && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  const renderTruckTypeModal = () => (
    <Modal
      visible={showTruckTypeModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Truck Types</Text>
          <TouchableOpacity onPress={() => setShowTruckTypeModal(false)}>
            <Ionicons name="close" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalContent}>
          {truckTypeOptions.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={styles.optionItem}
              onPress={() => toggleTruckType(type.value)}
            >
              <Text style={styles.optionText}>{type.label}</Text>
              {availability.truckTypes.includes(type.value) && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  const renderEquipmentModal = () => (
    <Modal
      visible={showEquipmentModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Special Equipment</Text>
          <TouchableOpacity onPress={() => setShowEquipmentModal(false)}>
            <Ionicons name="close" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalContent}>
          {equipmentOptions.map((equipment) => (
            <TouchableOpacity
              key={equipment}
              style={styles.optionItem}
              onPress={() => toggleEquipment(equipment)}
            >
              <Text style={styles.optionText}>{equipment.replace('_', ' ')}</Text>
              {availability.specialEquipment.includes(equipment) && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Availability Status</Text>
            <Switch
              value={availability.isAvailable}
              onValueChange={(value) => setAvailability({ ...availability, isAvailable: value })}
              trackColor={{ false: colors.borderGray, true: colors.primaryLight }}
              thumbColor={availability.isAvailable ? colors.primary : colors.mediumGray}
            />
          </View>
          <Text style={styles.sectionSubtitle}>
            {availability.isAvailable 
              ? 'You are currently available for new jobs' 
              : 'You are not available for new jobs'
            }
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fleet Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Available Trucks</Text>
            <TextInput
              style={styles.numberInput}
              value={availability.availableTrucks.toString()}
              onChangeText={(text) => setAvailability({ ...availability, availableTrucks: parseInt(text) || 0 })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Operating Countries</Text>
            <TouchableOpacity 
              style={styles.selectorButton}
              onPress={() => setShowCountryModal(true)}
            >
              <Text style={styles.selectorText}>
                {availability.operatingCountries.length} countries selected
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.mediumGray} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Truck Types</Text>
            <TouchableOpacity 
              style={styles.selectorButton}
              onPress={() => setShowTruckTypeModal(true)}
            >
              <Text style={styles.selectorText}>
                {availability.truckTypes.length} types selected
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.mediumGray} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Special Equipment</Text>
            <TouchableOpacity 
              style={styles.selectorButton}
              onPress={() => setShowEquipmentModal(true)}
            >
              <Text style={styles.selectorText}>
                {availability.specialEquipment.length} equipment selected
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.mediumGray} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Capacity</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Max Weight (tons)</Text>
            <TextInput
              style={styles.numberInput}
              value={availability.maxWeight.toString()}
              onChangeText={(text) => setAvailability({ ...availability, maxWeight: parseFloat(text) || 0 })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Max Length (m)</Text>
            <TextInput
              style={styles.numberInput}
              value={availability.maxLength.toString()}
              onChangeText={(text) => setAvailability({ ...availability, maxLength: parseFloat(text) || 0 })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Max Height (m)</Text>
            <TextInput
              style={styles.numberInput}
              value={availability.maxHeight.toString()}
              onChangeText={(text) => setAvailability({ ...availability, maxHeight: parseFloat(text) || 0 })}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Working Schedule</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Working Days</Text>
            <View style={styles.daySelector}>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    availability.workingDays.includes(day) && styles.dayButtonActive
                  ]}
                  onPress={() => {
                    const currentDays = availability.workingDays;
                    if (currentDays.includes(day)) {
                      setAvailability({
                        ...availability,
                        workingDays: currentDays.filter(d => d !== day)
                      });
                    } else {
                      setAvailability({
                        ...availability,
                        workingDays: [...currentDays, day]
                      });
                    }
                  }}
                >
                  <Text style={[
                    styles.dayButtonText,
                    availability.workingDays.includes(day) && styles.dayButtonTextActive
                  ]}>
                    {day.charAt(0).toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Emergency Available</Text>
            <Switch
              value={availability.emergencyAvailable}
              onValueChange={(value) => setAvailability({ ...availability, emergencyAvailable: value })}
              trackColor={{ false: colors.borderGray, true: colors.primaryLight }}
              thumbColor={availability.emergencyAvailable ? colors.primary : colors.mediumGray}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weekend Work</Text>
            <Switch
              value={availability.weekendWork}
              onValueChange={(value) => setAvailability({ ...availability, weekendWork: value })}
              trackColor={{ false: colors.borderGray, true: colors.primaryLight }}
              thumbColor={availability.weekendWork ? colors.primary : colors.mediumGray}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Base Rate (DKK/km)</Text>
            <TextInput
              style={styles.numberInput}
              value={availability.baseRate.toString()}
              onChangeText={(text) => setAvailability({ ...availability, baseRate: parseFloat(text) || 0 })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Fuel Surcharge (DKK/km)</Text>
            <TextInput
              style={styles.numberInput}
              value={availability.fuelSurcharge.toString()}
              onChangeText={(text) => setAvailability({ ...availability, fuelSurcharge: parseFloat(text) || 0 })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Toll Included</Text>
            <Switch
              value={availability.tollIncluded}
              onValueChange={(value) => setAvailability({ ...availability, tollIncluded: value })}
              trackColor={{ false: colors.borderGray, true: colors.primaryLight }}
              thumbColor={availability.tollIncluded ? colors.primary : colors.mediumGray}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={styles.textArea}
            value={availability.notes}
            onChangeText={(text) => setAvailability({ ...availability, notes: text })}
            placeholder="Any additional information about your availability..."
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAvailability}>
          <Text style={styles.saveButtonText}>Save Availability</Text>
        </TouchableOpacity>
      </View>

      {renderCountryModal()}
      {renderTruckTypeModal()}
      {renderEquipmentModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.white,
    marginBottom: spacing[2],
    padding: spacing[4],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  sectionTitle: {
    ...textStyles.h3,
    marginBottom: spacing[3],
  },
  sectionSubtitle: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  inputGroup: {
    marginBottom: spacing[4],
  },
  inputLabel: {
    ...textStyles.label,
    marginBottom: spacing[2],
  },
  numberInput: {
    ...components.input,
  },
  textArea: {
    ...components.input,
    height: 100,
    textAlignVertical: 'top',
  },
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  selectorText: {
    ...textStyles.body,
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonActive: {
    backgroundColor: colors.primary,
  },
  dayButtonText: {
    ...textStyles.label,
    color: colors.mediumGray,
  },
  dayButtonTextActive: {
    color: colors.white,
  },
  footer: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  saveButton: {
    ...components.button.primary,
    paddingVertical: spacing[4],
  },
  saveButtonText: {
    ...textStyles.label,
    color: colors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  modalTitle: {
    ...textStyles.h3,
  },
  modalContent: {
    flex: 1,
    padding: spacing[4],
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  optionText: {
    ...textStyles.body,
  },
});

export default AvailabilityScreen;
