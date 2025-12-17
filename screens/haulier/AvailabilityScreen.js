import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/AvailabilityScreenStyles';
import availabilityService from '../../services/AvailabilityService';
import { SelectionModal, SwitchRow, NumberInput, DaySelector } from '../../components/availability';

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

  const handleToggleDay = (day) => {
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
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability Status</Text>
          <SwitchRow
            label="Available for Jobs"
            value={availability.isAvailable}
            onValueChange={(value) => setAvailability({ ...availability, isAvailable: value })}
            subtitle={availability.isAvailable 
              ? 'You are currently available for new jobs' 
              : 'You are not available for new jobs'
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fleet Information</Text>
          
          <NumberInput
            label="Available Trucks"
            value={availability.availableTrucks}
            onChangeText={(text) => setAvailability({ ...availability, availableTrucks: parseInt(text) || 0 })}
          />

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
          
          <NumberInput
            label="Max Weight (tons)"
            value={availability.maxWeight}
            onChangeText={(text) => setAvailability({ ...availability, maxWeight: parseFloat(text) || 0 })}
          />

          <NumberInput
            label="Max Length (m)"
            value={availability.maxLength}
            onChangeText={(text) => setAvailability({ ...availability, maxLength: parseFloat(text) || 0 })}
          />

          <NumberInput
            label="Max Height (m)"
            value={availability.maxHeight}
            onChangeText={(text) => setAvailability({ ...availability, maxHeight: parseFloat(text) || 0 })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Working Schedule</Text>
          
          <DaySelector
            selectedDays={availability.workingDays}
            onToggleDay={handleToggleDay}
          />

          <SwitchRow
            label="Emergency Available"
            value={availability.emergencyAvailable}
            onValueChange={(value) => setAvailability({ ...availability, emergencyAvailable: value })}
          />

          <SwitchRow
            label="Weekend Work"
            value={availability.weekendWork}
            onValueChange={(value) => setAvailability({ ...availability, weekendWork: value })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          
          <NumberInput
            label="Base Rate (DKK/km)"
            value={availability.baseRate}
            onChangeText={(text) => setAvailability({ ...availability, baseRate: parseFloat(text) || 0 })}
          />

          <NumberInput
            label="Fuel Surcharge (DKK/km)"
            value={availability.fuelSurcharge}
            onChangeText={(text) => setAvailability({ ...availability, fuelSurcharge: parseFloat(text) || 0 })}
          />

          <SwitchRow
            label="Toll Included"
            value={availability.tollIncluded}
            onValueChange={(value) => setAvailability({ ...availability, tollIncluded: value })}
          />
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

      <SelectionModal
        visible={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        title="Operating Countries"
        options={countryOptions}
        selectedValues={availability.operatingCountries}
        onToggle={toggleCountry}
        formatLabel={(country) => country.name}
      />

      <SelectionModal
        visible={showTruckTypeModal}
        onClose={() => setShowTruckTypeModal(false)}
        title="Truck Types"
        options={truckTypeOptions}
        selectedValues={availability.truckTypes}
        onToggle={toggleTruckType}
        formatLabel={(type) => type.label}
      />

      <SelectionModal
        visible={showEquipmentModal}
        onClose={() => setShowEquipmentModal(false)}
        title="Special Equipment"
        options={equipmentOptions}
        selectedValues={availability.specialEquipment}
        onToggle={toggleEquipment}
        formatLabel={(equipment) => equipment.replace('_', ' ')}
      />
    </View>
  );
};

export default AvailabilityScreen;
