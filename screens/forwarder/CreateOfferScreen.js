import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/CreateOfferScreenStyles';

const CreateOfferScreen = ({ navigation, route }) => {
  const { haulier, haulierId } = route.params;
  const { currentUser, userProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    ratePerKm: '',
    currency: 'DKK',
    fuelSurcharge: '',
    tollIncluded: false,
    minimumCharge: '',
    paymentTerms: 'net_30',
    contractDuration: '12', // months
    message: '',
    specialConditions: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmitOffer = async () => {
    if (!formData.ratePerKm || !formData.message) {
      Alert.alert('Error', 'Please fill in the rate per km and message fields');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const offer = {
        id: `offer-${Date.now()}`,
        forwarderId: currentUser.uid,
        forwarderName: userProfile?.name || 'Unknown Forwarder',
        forwarderCompany: userProfile?.company || 'Unknown Company',
        haulierId: haulierId,
        haulierName: haulier.name,
        haulierCompany: haulier.company,
        ratePerKm: parseFloat(formData.ratePerKm),
        currency: formData.currency,
        fuelSurcharge: formData.fuelSurcharge ? parseFloat(formData.fuelSurcharge) : 0,
        tollIncluded: formData.tollIncluded,
        minimumCharge: formData.minimumCharge ? parseFloat(formData.minimumCharge) : 0,
        paymentTerms: formData.paymentTerms,
        contractDuration: parseInt(formData.contractDuration),
        message: formData.message,
        specialConditions: formData.specialConditions,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      };

      Alert.alert(
        'Offer Sent!',
        `Your partnership offer has been sent to ${haulier.name} at ${haulier.company}. They will review your offer and respond within 7 days.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send offer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.darkGray} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Partnership Offer</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.haulierInfo}>
          <Text style={styles.haulierName}>{haulier.name}</Text>
          <Text style={styles.companyName}>{haulier.company}</Text>
          <Text style={styles.haulierRate}>Current Rate: {haulier.pricing.baseRate} {haulier.pricing.currency}/km</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rate Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Rate per KM *</Text>
              <View style={styles.currencyInput}>
                <TextInput
                  style={styles.rateInput}
                  placeholder="8.50"
                  value={formData.ratePerKm}
                  onChangeText={(value) => handleInputChange('ratePerKm', value)}
                  keyboardType="numeric"
                  autoComplete="off"
                />
                <Text style={styles.currencyLabel}>{formData.currency}</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fuel Surcharge (%)</Text>
              <TextInput
                style={styles.input}
                placeholder="15"
                value={formData.fuelSurcharge}
                onChangeText={(value) => handleInputChange('fuelSurcharge', value)}
                keyboardType="numeric"
                autoComplete="off"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Minimum Charge</Text>
              <TextInput
                style={styles.input}
                placeholder="500"
                value={formData.minimumCharge}
                onChangeText={(value) => handleInputChange('minimumCharge', value)}
                keyboardType="numeric"
                autoComplete="off"
              />
            </View>

            <TouchableOpacity
              style={styles.toggleContainer}
              onPress={() => handleInputChange('tollIncluded', !formData.tollIncluded)}
            >
              <Text style={styles.toggleLabel}>Tolls Included</Text>
              <View style={[styles.toggle, formData.tollIncluded && styles.toggleActive]}>
                <View style={[styles.toggleThumb, formData.tollIncluded && styles.toggleThumbActive]} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contract Terms</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Payment Terms</Text>
              <View style={styles.pickerContainer}>
                {['net_15', 'net_30', 'net_45', 'net_60'].map((term) => (
                  <TouchableOpacity
                    key={term}
                    style={[
                      styles.pickerOption,
                      formData.paymentTerms === term && styles.pickerOptionSelected
                    ]}
                    onPress={() => handleInputChange('paymentTerms', term)}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      formData.paymentTerms === term && styles.pickerOptionTextSelected
                    ]}>
                      {term.replace('_', ' ').toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contract Duration (months)</Text>
              <TextInput
                style={styles.input}
                placeholder="12"
                value={formData.contractDuration}
                onChangeText={(value) => handleInputChange('contractDuration', value)}
                keyboardType="numeric"
                autoComplete="off"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Message & Conditions</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message to Haulier *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Explain your partnership proposal, requirements, and why you'd like to work with this haulier..."
                value={formData.message}
                onChangeText={(value) => handleInputChange('message', value)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                autoComplete="off"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Special Conditions</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Any special terms, requirements, or conditions for this partnership..."
                value={formData.specialConditions}
                onChangeText={(value) => handleInputChange('specialConditions', value)}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                autoComplete="off"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmitOffer}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Sending Offer...' : 'Send Partnership Offer'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateOfferScreen;
