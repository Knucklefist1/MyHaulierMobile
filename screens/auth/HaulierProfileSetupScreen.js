import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';

const HaulierProfileSetupScreen = ({ navigation, route }) => {
  const { userData } = route.params || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    // Basic info
    name: userData?.name || '',
    company: '',
    phone: '',
    
    // Fleet information
    fleet: {
      totalTrucks: '',
      availableTrucks: '',
      truckTypes: [],
      trailerTypes: [],
      maxWeight: '',
      maxLength: '',
      maxHeight: '',
      specialEquipment: []
    },
    
    // Operating regions
    operatingRegions: {
      countries: [],
      regions: [],
      specificRoutes: []
    },
    
    // Capabilities
    capabilities: {
      cargoTypes: [],
      industries: [],
      certifications: [],
      languages: ['en']
    },
    
    // Availability
    availability: {
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      workingHours: { start: '08:00', end: '17:00' },
      emergencyAvailable: false,
      weekendWork: false
    },
    
    // Pricing
    pricing: {
      baseRate: '',
      currency: 'DKK',
      fuelSurcharge: '',
      tollIncluded: false
    }
  });

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Company and contact details' },
    { number: 2, title: 'Fleet', description: 'Trucks and equipment' },
    { number: 3, title: 'Coverage', description: 'Operating regions' },
    { number: 4, title: 'Capabilities', description: 'Services and certifications' },
    { number: 5, title: 'Pricing', description: 'Rates and availability' }
  ];

  const truckTypes = [
    { id: 'dry_van', label: 'Dry Van', icon: 'cube' },
    { id: 'reefer', label: 'Reefer', icon: 'snow' },
    { id: 'flatbed', label: 'Flatbed', icon: 'car' },
    { id: 'container', label: 'Container', icon: 'archive' }
  ];

  const trailerTypes = [
    { id: 'standard', label: 'Standard' },
    { id: 'extendable', label: 'Extendable' },
    { id: 'low_loader', label: 'Low Loader' }
  ];

  const cargoTypes = [
    { id: 'general', label: 'General Cargo' },
    { id: 'fragile', label: 'Fragile Goods' },
    { id: 'hazardous', label: 'Hazardous Materials' },
    { id: 'temperature_controlled', label: 'Temperature Controlled' }
  ];

  const industries = [
    { id: 'automotive', label: 'Automotive' },
    { id: 'food', label: 'Food & Beverage' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'furniture', label: 'Furniture' }
  ];

  const certifications = [
    { id: 'ADR', label: 'ADR (Dangerous Goods)' },
    { id: 'ISO', label: 'ISO 9001' },
    { id: 'GDP', label: 'GDP (Good Distribution Practice)' }
  ];

  const countries = [
    { id: 'DK', label: 'Denmark' },
    { id: 'SE', label: 'Sweden' },
    { id: 'NO', label: 'Norway' },
    { id: 'DE', label: 'Germany' },
    { id: 'NL', label: 'Netherlands' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // In a real app, this would save to Firebase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Profile Created!',
        'Your haulier profile has been created successfully. You can now start receiving job matches!',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('HaulierTabs')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const toggleArrayItem = (section, field, itemId) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].includes(itemId)
          ? prev[section][field].filter(id => id !== itemId)
          : [...prev[section][field], itemId]
      }
    }));
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step) => (
        <View key={step.number} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step.number && styles.activeStepCircle
          ]}>
            <Text style={[
              styles.stepNumber,
              currentStep >= step.number && styles.activeStepNumber
            ]}>
              {step.number}
            </Text>
          </View>
          <Text style={[
            styles.stepTitle,
            currentStep >= step.number && styles.activeStepTitle
          ]}>
            {step.title}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderBasicInfo = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepDescription}>
        Tell us about your company and how to reach you
      </Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Company Name *</Text>
        <TextInput
          style={components.input}
          value={formData.company}
          onChangeText={(value) => updateFormData('', 'company', value)}
          placeholder="Enter your company name"
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Phone Number *</Text>
        <TextInput
          style={components.input}
          value={formData.phone}
          onChangeText={(value) => updateFormData('', 'phone', value)}
          placeholder="+45 12 34 56 78"
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );

  const renderFleetInfo = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepDescription}>
        Describe your fleet and equipment
      </Text>
      
      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Total Trucks *</Text>
          <TextInput
            style={components.input}
            value={formData.fleet.totalTrucks}
            onChangeText={(value) => updateFormData('fleet', 'totalTrucks', value)}
            placeholder="10"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Available Now</Text>
          <TextInput
            style={components.input}
            value={formData.fleet.availableTrucks}
            onChangeText={(value) => updateFormData('fleet', 'availableTrucks', value)}
            placeholder="3"
            keyboardType="numeric"
          />
        </View>
      </View>
      
      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Max Weight (tons)</Text>
          <TextInput
            style={components.input}
            value={formData.fleet.maxWeight}
            onChangeText={(value) => updateFormData('fleet', 'maxWeight', value)}
            placeholder="24"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Max Length (m)</Text>
          <TextInput
            style={components.input}
            value={formData.fleet.maxLength}
            onChangeText={(value) => updateFormData('fleet', 'maxLength', value)}
            placeholder="13.6"
            keyboardType="numeric"
          />
        </View>
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Truck Types</Text>
        <View style={styles.tagContainer}>
          {truckTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.tag,
                formData.fleet.truckTypes.includes(type.id) && styles.selectedTag
              ]}
              onPress={() => toggleArrayItem('fleet', 'truckTypes', type.id)}
            >
              <Ionicons 
                name={type.icon} 
                size={16} 
                color={formData.fleet.truckTypes.includes(type.id) ? colors.white : colors.primary} 
              />
              <Text style={[
                styles.tagText,
                formData.fleet.truckTypes.includes(type.id) && styles.selectedTagText
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderCoverageInfo = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepDescription}>
        Where do you operate?
      </Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Operating Countries</Text>
        <View style={styles.tagContainer}>
          {countries.map((country) => (
            <TouchableOpacity
              key={country.id}
              style={[
                styles.tag,
                formData.operatingRegions.countries.includes(country.id) && styles.selectedTag
              ]}
              onPress={() => toggleArrayItem('operatingRegions', 'countries', country.id)}
            >
              <Text style={[
                styles.tagText,
                formData.operatingRegions.countries.includes(country.id) && styles.selectedTagText
              ]}>
                {country.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderCapabilitiesInfo = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepDescription}>
        What can you transport?
      </Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Cargo Types</Text>
        <View style={styles.tagContainer}>
          {cargoTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.tag,
                formData.capabilities.cargoTypes.includes(type.id) && styles.selectedTag
              ]}
              onPress={() => toggleArrayItem('capabilities', 'cargoTypes', type.id)}
            >
              <Text style={[
                styles.tagText,
                formData.capabilities.cargoTypes.includes(type.id) && styles.selectedTagText
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Industries</Text>
        <View style={styles.tagContainer}>
          {industries.map((industry) => (
            <TouchableOpacity
              key={industry.id}
              style={[
                styles.tag,
                formData.capabilities.industries.includes(industry.id) && styles.selectedTag
              ]}
              onPress={() => toggleArrayItem('capabilities', 'industries', industry.id)}
            >
              <Text style={[
                styles.tagText,
                formData.capabilities.industries.includes(industry.id) && styles.selectedTagText
              ]}>
                {industry.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Certifications</Text>
        <View style={styles.tagContainer}>
          {certifications.map((cert) => (
            <TouchableOpacity
              key={cert.id}
              style={[
                styles.tag,
                formData.capabilities.certifications.includes(cert.id) && styles.selectedTag
              ]}
              onPress={() => toggleArrayItem('capabilities', 'certifications', cert.id)}
            >
              <Text style={[
                styles.tagText,
                formData.capabilities.certifications.includes(cert.id) && styles.selectedTagText
              ]}>
                {cert.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPricingInfo = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepDescription}>
        Set your rates and availability
      </Text>
      
      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Base Rate (DKK/km)</Text>
          <TextInput
            style={components.input}
            value={formData.pricing.baseRate}
            onChangeText={(value) => updateFormData('pricing', 'baseRate', value)}
            placeholder="8.50"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Fuel Surcharge</Text>
          <TextInput
            style={components.input}
            value={formData.pricing.fuelSurcharge}
            onChangeText={(value) => updateFormData('pricing', 'fuelSurcharge', value)}
            placeholder="0.15"
            keyboardType="numeric"
          />
        </View>
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Working Days</Text>
        <View style={styles.tagContainer}>
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.tag,
                formData.availability.workingDays.includes(day) && styles.selectedTag
              ]}
              onPress={() => toggleArrayItem('availability', 'workingDays', day)}
            >
              <Text style={[
                styles.tagText,
                formData.availability.workingDays.includes(day) && styles.selectedTagText
              ]}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderFleetInfo();
      case 3:
        return renderCoverageInfo();
      case 4:
        return renderCapabilitiesInfo();
      case 5:
        return renderPricingInfo();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Complete Your Profile</Text>
        <Text style={styles.headerSubtitle}>
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
        </Text>
      </View>

      {renderStepIndicator()}

      <ScrollView style={styles.content}>
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.nextButton, loading && styles.disabledButton]} 
          onPress={handleNext}
          disabled={loading}
        >
          <Text style={styles.nextButtonText}>
            {loading ? 'Saving...' : currentStep === steps.length ? 'Complete' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  headerTitle: {
    ...textStyles.h2,
    marginBottom: spacing[1],
  },
  headerSubtitle: {
    ...textStyles.caption,
  },
  stepIndicator: {
    flexDirection: 'row',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  activeStepCircle: {
    backgroundColor: colors.primary,
  },
  stepNumber: {
    ...textStyles.label,
    color: colors.mediumGray,
  },
  activeStepNumber: {
    color: colors.white,
  },
  stepTitle: {
    ...textStyles.caption,
    textAlign: 'center',
    color: colors.mediumGray,
  },
  activeStepTitle: {
    color: colors.primary,
  },
  content: {
    flex: 1,
    padding: spacing[4],
  },
  stepContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.md,
  },
  stepDescription: {
    ...textStyles.body,
    marginBottom: spacing[4],
    color: colors.mediumGray,
  },
  inputGroup: {
    marginBottom: spacing[4],
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.xl,
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  selectedTag: {
    backgroundColor: colors.primary,
  },
  tagText: {
    ...textStyles.caption,
    marginLeft: spacing[1],
    color: colors.darkGray,
  },
  selectedTagText: {
    color: colors.white,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  previousButton: {
    ...components.button.secondary,
    flex: 1,
    marginRight: spacing[2],
  },
  nextButton: {
    ...components.button.primary,
    flex: 1,
    marginLeft: spacing[2],
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
  },
  previousButtonText: {
    ...textStyles.label,
    color: colors.darkGray,
  },
  nextButtonText: {
    ...textStyles.label,
    color: colors.white,
  },
});

export default HaulierProfileSetupScreen;
