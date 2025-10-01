import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';

const { width } = Dimensions.get('window');

const HaulierProfileScreen = ({ navigation, route }) => {
  const { haulier } = route.params;
  const [activeTab, setActiveTab] = useState('overview');

  const handleContact = () => {
    Alert.alert(
      'Contact Haulier',
      `Would you like to contact ${haulier.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => {
            Alert.alert('Calling', `Calling ${haulier.phone}`);
          }
        },
        { 
          text: 'Message', 
          onPress: () => {
            // Navigate to the Chat tab and then to the conversation
            navigation.getParent()?.navigate('Chat', {
              screen: 'ChatConversation',
              params: {
                chatId: `chat_${haulier.uid}`,
                otherParticipant: haulier.uid,
                chatTitle: `Chat with ${haulier.name}`
              }
            });
          }
        }
      ]
    );
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Company:</Text>
          <Text style={styles.infoValue}>{haulier.company}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Contact:</Text>
          <Text style={styles.infoValue}>{haulier.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Languages:</Text>
          <Text style={styles.infoValue}>{haulier.capabilities.languages.join(', ')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.performanceGrid}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{haulier.performance.rating}</Text>
            <Text style={styles.performanceLabel}>Rating</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{haulier.performance.completedJobs}</Text>
            <Text style={styles.performanceLabel}>Jobs Completed</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{haulier.performance.onTimeDelivery}%</Text>
            <Text style={styles.performanceLabel}>On Time</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{haulier.performance.customerSatisfaction}%</Text>
            <Text style={styles.performanceLabel}>Satisfaction</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderFleet = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fleet Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Trucks:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.totalTrucks}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Available:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.availableTrucks}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Max Weight:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.maxWeight} tons</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Max Length:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.maxLength}m</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Max Height:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.maxHeight}m</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Truck Types</Text>
        <View style={styles.tagContainer}>
          {haulier.fleet.truckTypes.map((type, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{type.replace('_', ' ')}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Equipment</Text>
        <View style={styles.tagContainer}>
          {haulier.fleet.specialEquipment.map((equipment, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{equipment}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderCoverage = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Operating Countries</Text>
        <View style={styles.tagContainer}>
          {haulier.operatingRegions.countries.map((country, index) => (
            <View key={index} style={[styles.tag, styles.countryTag]}>
              <Text style={styles.tagText}>{country}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regions</Text>
        <View style={styles.tagContainer}>
          {haulier.operatingRegions.regions.map((region, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{region}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specific Routes</Text>
        <View style={styles.routeList}>
          {haulier.operatingRegions.specificRoutes.map((route, index) => (
            <View key={index} style={styles.routeItem}>
              <Ionicons name="location" size={16} color={colors.primary} />
              <Text style={styles.routeText}>{route}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderCapabilities = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cargo Types</Text>
        <View style={styles.tagContainer}>
          {haulier.capabilities.cargoTypes.map((type, index) => (
            <View key={index} style={[styles.tag, styles.capabilityTag]}>
              <Text style={styles.tagText}>{type.replace('_', ' ')}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Industries</Text>
        <View style={styles.tagContainer}>
          {haulier.capabilities.industries.map((industry, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{industry}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        <View style={styles.tagContainer}>
          {haulier.capabilities.certifications.map((cert, index) => (
            <View key={index} style={[styles.tag, styles.certificationTag]}>
              <Text style={styles.tagText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPricing = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pricing Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Base Rate:</Text>
          <Text style={styles.infoValue}>{haulier.pricing.baseRate} {haulier.pricing.currency}/km</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fuel Surcharge:</Text>
          <Text style={styles.infoValue}>{haulier.pricing.fuelSurcharge} {haulier.pricing.currency}/km</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Toll Included:</Text>
          <Text style={styles.infoValue}>{haulier.pricing.tollIncluded ? 'Yes' : 'No'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Availability</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Working Days:</Text>
          <Text style={styles.infoValue}>{haulier.availability.workingDays.join(', ')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Working Hours:</Text>
          <Text style={styles.infoValue}>{haulier.availability.workingHours.start} - {haulier.availability.workingHours.end}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Emergency Available:</Text>
          <Text style={styles.infoValue}>{haulier.availability.emergencyAvailable ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Weekend Work:</Text>
          <Text style={styles.infoValue}>{haulier.availability.weekendWork ? 'Yes' : 'No'}</Text>
        </View>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'fleet':
        return renderFleet();
      case 'coverage':
        return renderCoverage();
      case 'capabilities':
        return renderCapabilities();
      case 'pricing':
        return renderPricing();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Haulier Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {haulier.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{haulier.name}</Text>
            <Text style={styles.profileCompany}>{haulier.company}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={styles.ratingText}>{haulier.performance.rating}/5</Text>
              <Text style={styles.ratingCount}>({haulier.performance.completedJobs} jobs)</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'fleet', label: 'Fleet' },
              { key: 'coverage', label: 'Coverage' },
              { key: 'capabilities', label: 'Capabilities' },
              { key: 'pricing', label: 'Pricing' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  activeTab === tab.key && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {renderTabContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <Text style={styles.contactButtonText}>Contact Haulier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  headerTitle: {
    ...textStyles.h3,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  avatarText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...textStyles.h3,
    marginBottom: spacing[1],
  },
  profileCompany: {
    ...textStyles.caption,
    marginBottom: spacing[2],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...textStyles.label,
    marginLeft: spacing[1],
  },
  ratingCount: {
    ...textStyles.caption,
    marginLeft: spacing[1],
  },
  tabContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  tab: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...textStyles.label,
    color: colors.mediumGray,
  },
  activeTabText: {
    color: colors.primary,
  },
  tabContent: {
    padding: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...textStyles.h3,
    marginBottom: spacing[3],
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  infoLabel: {
    ...textStyles.label,
    flex: 1,
  },
  infoValue: {
    ...textStyles.body,
    flex: 1,
    textAlign: 'right',
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  performanceItem: {
    width: (width - spacing[8] * 2) / 2,
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.lg,
    marginBottom: spacing[2],
  },
  performanceValue: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  performanceLabel: {
    ...textStyles.caption,
    textAlign: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.xl,
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  countryTag: {
    backgroundColor: colors.successLight,
  },
  capabilityTag: {
    backgroundColor: colors.warningLight,
  },
  certificationTag: {
    backgroundColor: colors.errorLight,
  },
  tagText: {
    ...textStyles.caption,
    color: colors.darkGray,
    textTransform: 'capitalize',
  },
  routeList: {
    marginTop: spacing[2],
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  routeText: {
    ...textStyles.body,
    marginLeft: spacing[2],
  },
  footer: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  contactButton: {
    ...components.button.primary,
    paddingVertical: spacing[4],
  },
  contactButtonText: {
    ...textStyles.label,
    color: colors.white,
  },
});

export default HaulierProfileScreen;
