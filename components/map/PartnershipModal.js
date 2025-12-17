import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/MapScreenStyles';

const PartnershipModal = ({ partnership, visible, onClose, onConnect }) => {
  if (!partnership) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.partnershipModal}>
        <View style={styles.partnershipHeader}>
          <Text style={styles.partnershipTitle}>{partnership.title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.partnershipContent}>
          <Text style={styles.partnershipDescription}>{partnership.description}</Text>
          
          <View style={styles.partnershipDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="business" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{partnership.industry}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={styles.detailText}>{partnership.rating}/5 rating</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="location" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{Math.round(partnership.distance)}km away</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contract Details:</Text>
            <View style={styles.detailRow}>
              <Ionicons name="document-text" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{partnership.partnershipType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="time" size={16} color={colors.primary} />
              <Text style={styles.detailText}>Duration: {partnership.contractDuration}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="cash" size={16} color={colors.success} />
              <Text style={styles.detailText}>Rate: {partnership.currentRate}</Text>
            </View>
          </View>
          
          {partnership.trucksNeeded && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trucks Needed:</Text>
              <View style={styles.trucksInfo}>
                <View style={styles.truckTypesContainer}>
                  <Text style={styles.truckTypesLabel}>Types:</Text>
                  <View style={styles.tagsContainer}>
                    {partnership.trucksNeeded.types.map((truck, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{truck}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity:</Text>
                  <Text style={styles.quantityValue}>{partnership.trucksNeeded.quantity}</Text>
                </View>
              </View>
              {partnership.trucksNeeded.specialRequirements?.length > 0 && (
                <View style={styles.specialRequirementsContainer}>
                  <Text style={styles.specialRequirementsLabel}>Special Requirements:</Text>
                  <View style={styles.specialRequirementsList}>
                    {partnership.trucksNeeded.specialRequirements.map((req, index) => (
                      <Text key={index} style={styles.specialRequirementItem}>• {req}</Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Operating Countries Needed:</Text>
            <View style={styles.tagsContainer}>
              {partnership.operatingCountries.map((country, index) => (
                <View key={index} style={[styles.tag, styles.countryTag]}>
                  <Text style={[styles.tagText, styles.countryTagText]}>{country}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information:</Text>
            <View style={styles.detailRow}>
              <Ionicons name="person" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{partnership.contactPerson}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="call" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{partnership.phone}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="mail" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{partnership.email}</Text>
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.partnershipFooter}>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => onConnect(partnership)}
          >
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PartnershipModal;

