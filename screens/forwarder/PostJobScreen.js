import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';
import { useAuth } from '../../contexts/FallbackAuthContext';

const PostJobScreen = ({ navigation }) => {
  const { currentUser, userProfile } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    partnershipType: '',
    description: '',
    location: '',
    requirements: {
      truckTypes: [],
      specialEquipment: [],
      certifications: [],
      experience: '',
      routes: []
    },
    partnershipBenefits: [],
    contactInfo: {
      email: '',
      phone: '',
      website: ''
    }
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.industry || !formData.partnershipType || !formData.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would save to Firebase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Partnership Opportunity Posted',
        'Your partnership opportunity has been posted successfully! Hauliers can now find and connect with you.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to post partnership opportunity');
    } finally {
      setLoading(false);
    }
  };

  const partnershipTypes = [
    'Regular Routes',
    'Dedicated Partnership',
    'International Routes',
    'Seasonal Partnership',
    'Emergency Backup',
    'Specialized Transport'
  ];

  const industries = [
    'Electronics',
    'Furniture',
    'Food & Beverage',
    'Automotive',
    'Pharmaceuticals',
    'Textiles',
    'Machinery',
    'Other'
  ];

  const truckTypes = [
    'Dry Van',
    'Reefer',
    'Flatbed',
    'Container',
    'Tanker',
    'Car Carrier'
  ];

  const specialEquipment = [
    'Temperature Control',
    'Crane',
    'Forklift',
    'Heavy Lifting',
    'Furniture Handling',
    'ADR Certified',
    'GPS Tracking',
    'Security Features'
  ];

  const certifications = [
    'ADR',
    'ISO 9001',
    'GDP',
    'HACCP',
    'TAPA',
    'C-TPAT',
    'Other'
  ];

  const renderMultiSelect = (title, options, selectedItems, onToggle) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedItems.includes(option) && styles.selectedOption
            ]}
            onPress={() => onToggle(option)}
          >
            <Text style={[
              styles.optionText,
              selectedItems.includes(option) && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Post Partnership Opportunity</Text>
          <Text style={styles.headerSubtitle}>
            Find reliable haulier partners for your business needs
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Company Information *</Text>
            <TextInput
              style={styles.input}
              placeholder="Company Name"
              value={formData.companyName}
              onChangeText={(value) => handleInputChange('companyName', value)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Industry *</Text>
            <View style={styles.optionsContainer}>
              {industries.map((industry, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    formData.industry === industry && styles.selectedOption
                  ]}
                  onPress={() => handleInputChange('industry', industry)}
                >
                  <Text style={[
                    styles.optionText,
                    formData.industry === industry && styles.selectedOptionText
                  ]}>
                    {industry}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Partnership Type *</Text>
            <View style={styles.optionsContainer}>
              {partnershipTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    formData.partnershipType === type && styles.selectedOption
                  ]}
                  onPress={() => handleInputChange('partnershipType', type)}
                >
                  <Text style={[
                    styles.optionText,
                    formData.partnershipType === type && styles.selectedOptionText
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your partnership opportunity, routes, and requirements..."
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="City, Country"
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
            />
          </View>

          {renderMultiSelect(
            'Required Truck Types',
            truckTypes,
            formData.requirements.truckTypes,
            (option) => {
              const newTruckTypes = formData.requirements.truckTypes.includes(option)
                ? formData.requirements.truckTypes.filter(item => item !== option)
                : [...formData.requirements.truckTypes, option];
              handleInputChange('requirements.truckTypes', newTruckTypes);
            }
          )}

          {renderMultiSelect(
            'Special Equipment',
            specialEquipment,
            formData.requirements.specialEquipment,
            (option) => {
              const newEquipment = formData.requirements.specialEquipment.includes(option)
                ? formData.requirements.specialEquipment.filter(item => item !== option)
                : [...formData.requirements.specialEquipment, option];
              handleInputChange('requirements.specialEquipment', newEquipment);
            }
          )}

          {renderMultiSelect(
            'Required Certifications',
            certifications,
            formData.requirements.certifications,
            (option) => {
              const newCertifications = formData.requirements.certifications.includes(option)
                ? formData.requirements.certifications.filter(item => item !== option)
                : [...formData.requirements.certifications, option];
              handleInputChange('requirements.certifications', newCertifications);
            }
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience Required</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 2+ years, 5+ years, etc."
              value={formData.requirements.experience}
              onChangeText={(value) => handleInputChange('requirements.experience', value)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Partnership Benefits</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="List the benefits of partnering with your company (e.g., Regular contracts, Competitive rates, Growth opportunities...)"
              value={formData.partnershipBenefits.join(', ')}
              onChangeText={(value) => handleInputChange('partnershipBenefits', value.split(', ').filter(item => item.trim()))}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.contactInfo.email}
              onChangeText={(value) => handleInputChange('contactInfo.email', value)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={formData.contactInfo.phone}
              onChangeText={(value) => handleInputChange('contactInfo.phone', value)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Website (optional)"
              value={formData.contactInfo.website}
              onChangeText={(value) => handleInputChange('contactInfo.website', value)}
              keyboardType="url"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Posting...' : 'Post Partnership Opportunity'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  headerTitle: {
    ...textStyles.h2,
    color: colors.textBlack,
    marginBottom: spacing[1],
  },
  headerSubtitle: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  form: {
    padding: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...textStyles.h4,
    marginBottom: spacing[3],
  },
  input: {
    ...components.input,
    marginBottom: spacing[3],
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing[3],
  },
  optionButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    marginRight: spacing[2],
    marginBottom: spacing[2],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.white,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    ...textStyles.caption,
    color: colors.darkGray,
  },
  selectedOptionText: {
    color: colors.white,
  },
  submitButton: {
    ...components.button.primary,
    marginTop: spacing[4],
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
  },
  submitButtonText: {
    ...textStyles.button,
    color: colors.white,
  },
});

export default PostJobScreen;