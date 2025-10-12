import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';
// NEW FEATURE: Added for Assignment 2 - AsyncStorage for data persistence
import { OfflineStorage } from '../../utils/storage';

const JobsScreen = ({ navigation }) => {
  const [forwarders, setForwarders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // NEW FEATURE: Load data from AsyncStorage instead of hardcoded values
  useEffect(() => {
    loadForwarders();
  }, []);

  const loadForwarders = async () => {
    try {
      // Try to load from AsyncStorage first
      const savedForwarders = await OfflineStorage.getJobs();
      
      if (savedForwarders && savedForwarders.length > 0) {
        setForwarders(savedForwarders);
      } else {
        // If no saved data, load mock data and save it
        const mockForwarders = [
      {
        id: '1',
        name: 'TechCorp Denmark',
        description: 'Leading electronics distributor seeking reliable haulier partners for regular routes.',
        location: 'Copenhagen, Denmark',
        industry: 'Electronics',
        partnershipType: 'Regular Routes',
        companySize: 'Large (500+ employees)',
        status: 'seeking_partners',
        forwarderId: 'forwarder-1',
        createdAt: new Date('2024-01-10T10:00:00Z').toISOString(),
        requirements: {
          truckTypes: ['dry_van', 'reefer'],
          specialEquipment: ['temperature_control'],
          certifications: ['ADR'],
          experience: '2+ years'
        },
        trucksNeeded: {
          types: ['Dry Van', 'Reefer'],
          quantity: '5-8 trucks',
          specialRequirements: ['Temperature Control', 'GPS Tracking', 'Security Features']
        },
        operatingCountries: ['Denmark', 'Sweden', 'Norway', 'Germany'],
        partnershipBenefits: [
          'Regular monthly contracts',
          'Competitive rates',
          'Long-term relationship',
          'Priority booking'
        ]
      },
      {
        id: '2',
        name: 'Nordic Furniture',
        description: 'Premium furniture company looking for dedicated haulier partners.',
        location: 'Odense, Denmark',
        industry: 'Furniture',
        partnershipType: 'Dedicated Partnership',
        companySize: 'Medium (100-500 employees)',
        status: 'seeking_partners',
        forwarderId: 'forwarder-2',
        createdAt: new Date('2024-01-12T14:30:00Z').toISOString(),
        requirements: {
          truckTypes: ['dry_van'],
          specialEquipment: ['furniture_handling'],
          certifications: [],
          experience: '1+ years'
        },
        trucksNeeded: {
          types: ['Dry Van'],
          quantity: '3-5 trucks',
          specialRequirements: ['Furniture Handling Equipment', 'Careful Loading Systems']
        },
        operatingCountries: ['Denmark', 'Germany', 'Netherlands', 'Belgium'],
        partnershipBenefits: [
          'Exclusive partnership opportunity',
          'Flexible scheduling',
          'Premium rates',
          'Growth potential'
        ]
      },
      {
        id: '3',
        name: 'Scandinavian Logistics',
        description: 'International logistics company seeking experienced haulier partners.',
        location: 'Aarhus, Denmark',
        industry: 'Logistics',
        partnershipType: 'International Routes',
        companySize: 'Large (500+ employees)',
        status: 'seeking_partners',
        forwarderId: 'forwarder-3',
        createdAt: new Date('2024-01-14T09:15:00Z').toISOString(),
        requirements: {
          truckTypes: ['flatbed', 'dry_van'],
          specialEquipment: ['crane', 'heavy_lifting'],
          certifications: ['ADR', 'Heavy_Transport'],
          experience: '3+ years'
        },
        trucksNeeded: {
          types: ['Flatbed', 'Dry Van', 'Low Loader'],
          quantity: '10-15 trucks',
          specialRequirements: ['Crane Equipment', 'Heavy Lifting', 'International Permits']
        },
        operatingCountries: ['Denmark', 'Sweden', 'Norway', 'Germany', 'Poland', 'Netherlands'],
        partnershipBenefits: [
          'International exposure',
          'High-value contracts',
          'Professional development',
          'Stable income'
        ]
      }
        ];

        // Save mock data to AsyncStorage for future use
        await OfflineStorage.saveJobs(mockForwarders);
        setForwarders(mockForwarders);
      }
    } catch (error) {
      console.error('Error loading forwarders:', error);
      Alert.alert('Error', 'Failed to load forwarders data');
    } finally {
      setLoading(false);
    }
  };

  // NEW FEATURE: Refresh data from AsyncStorage
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadForwarders();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleConnectWithForwarder = (forwarder) => {
    Alert.alert(
      'Connect with Forwarder',
      `Are you interested in partnering with "${forwarder.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Connect',
          onPress: () => {
            // In a real app, this would initiate a connection request
            Alert.alert('Success', 'Connection request sent! The forwarder will review your profile.');
          }
        }
      ]
    );
  };

  const renderForwarderItem = ({ item }) => (
    <TouchableOpacity style={styles.forwarderCard} onPress={() => handleConnectWithForwarder(item)}>
      <View style={styles.forwarderHeader}>
        <Text style={styles.forwarderName}>{item.name}</Text>
        <View style={[styles.statusBadge, styles[item.status]]}>
          <Text style={styles.statusText}>Seeking Partners</Text>
        </View>
      </View>
      
      <Text style={styles.industry}>{item.industry}</Text>
      <Text style={styles.forwarderLocation}>{item.location}</Text>
      <Text style={styles.forwarderDescription} numberOfLines={2}>{item.description}</Text>
      
      <View style={styles.forwarderDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="business-outline" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{item.companySize}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="handshake-outline" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{item.partnershipType}</Text>
        </View>
      </View>

      <View style={styles.trucksNeededContainer}>
        <Text style={styles.sectionTitle}>Trucks Needed:</Text>
        <View style={styles.trucksInfo}>
          <View style={styles.truckTypesContainer}>
            <Text style={styles.truckTypesLabel}>Types:</Text>
            <View style={styles.truckTypesList}>
              {item.trucksNeeded.types.map((type, index) => (
                <View key={index} style={styles.truckTypeTag}>
                  <Text style={styles.truckTypeText}>{type}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <Text style={styles.quantityValue}>{item.trucksNeeded.quantity}</Text>
          </View>
        </View>
        {item.trucksNeeded.specialRequirements.length > 0 && (
          <View style={styles.specialRequirementsContainer}>
            <Text style={styles.specialRequirementsLabel}>Special Requirements:</Text>
            <View style={styles.specialRequirementsList}>
              {item.trucksNeeded.specialRequirements.map((req, index) => (
                <Text key={index} style={styles.specialRequirementItem}>• {req}</Text>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.operatingCountriesContainer}>
        <Text style={styles.sectionTitle}>Operating Countries Needed:</Text>
        <View style={styles.countriesList}>
          {item.operatingCountries.map((country, index) => (
            <View key={index} style={styles.countryTag}>
              <Text style={styles.countryText}>{country}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>Partnership Requirements:</Text>
        <View style={styles.requirementsList}>
          <Text style={styles.requirementItem}>• Truck Types: {item.requirements.truckTypes.join(', ')}</Text>
          {item.requirements.specialEquipment.length > 0 && (
            <Text style={styles.requirementItem}>• Equipment: {item.requirements.specialEquipment.join(', ')}</Text>
          )}
          {item.requirements.certifications.length > 0 && (
            <Text style={styles.requirementItem}>• Certifications: {item.requirements.certifications.join(', ')}</Text>
          )}
          <Text style={styles.requirementItem}>• Experience: {item.requirements.experience}</Text>
        </View>
      </View>

      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Partnership Benefits:</Text>
        <View style={styles.benefitsList}>
          {item.partnershipBenefits.map((benefit, index) => (
            <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect & Partner</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Finding Forwarder Partners...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Forwarder Partners</Text>
        <Text style={styles.headerSubtitle}>See what trucks and countries forwarders need for partnerships</Text>
      </View>
      
      <FlatList
        data={forwarders}
        renderItem={renderForwarderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="business-outline" size={64} color={colors.mediumGray} />
            <Text style={styles.emptyTitle}>No Forwarders Available</Text>
            <Text style={styles.emptySubtitle}>
              Check back later for new partnership opportunities.
            </Text>
          </View>
        }
      />
    </View>
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
    color: colors.textBlack,
    marginBottom: spacing[1],
  },
  headerSubtitle: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  listContainer: {
    padding: spacing[4],
  },
  forwarderCard: {
    ...components.card,
    marginBottom: spacing[4],
  },
  forwarderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  forwarderName: {
    ...textStyles.h3,
    flex: 1,
    marginRight: spacing[2],
  },
  statusBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
  },
  statusText: {
    ...textStyles.caption,
    color: colors.white,
    textTransform: 'capitalize',
  },
  seeking_partners: {
    backgroundColor: colors.success,
  },
  industry: {
    ...textStyles.label,
    color: colors.primary,
    marginBottom: spacing[1],
  },
  forwarderLocation: {
    ...textStyles.body,
    color: colors.darkGray,
    marginBottom: spacing[2],
  },
  forwarderDescription: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[3],
  },
  forwarderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    ...textStyles.caption,
    marginLeft: spacing[1],
  },
  requirementsContainer: {
    marginBottom: spacing[3],
  },
  requirementsTitle: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  requirementsList: {
    marginLeft: spacing[2],
  },
  requirementItem: {
    ...textStyles.caption,
    marginBottom: spacing[1],
  },
  benefitsContainer: {
    marginBottom: spacing[3],
  },
  benefitsTitle: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  benefitsList: {
    marginLeft: spacing[2],
  },
  benefitItem: {
    ...textStyles.caption,
    color: colors.success,
    marginBottom: spacing[1],
  },
  connectButton: {
    ...components.button.primary,
    marginTop: spacing[2],
  },
  connectButtonText: {
    ...textStyles.button,
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  loadingText: {
    ...textStyles.h3,
    color: colors.mediumGray,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[16],
  },
  emptyTitle: {
    ...textStyles.h2,
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  emptySubtitle: {
    ...textStyles.caption,
    textAlign: 'center',
  },
  trucksNeededContainer: {
    marginBottom: spacing[3],
  },
  trucksInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  truckTypesContainer: {
    flex: 1,
    marginRight: spacing[3],
  },
  truckTypesLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  truckTypesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  truckTypeTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    marginRight: spacing[1],
    marginBottom: spacing[1],
  },
  truckTypeText: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  quantityContainer: {
    alignItems: 'flex-end',
  },
  quantityLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  quantityValue: {
    ...textStyles.h4,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  specialRequirementsContainer: {
    marginTop: spacing[2],
  },
  specialRequirementsLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  specialRequirementsList: {
    marginLeft: spacing[2],
  },
  specialRequirementItem: {
    ...textStyles.caption,
    color: colors.warning,
    marginBottom: spacing[1],
  },
  operatingCountriesContainer: {
    marginBottom: spacing[3],
  },
  countriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  countryTag: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    marginRight: spacing[2],
    marginBottom: spacing[1],
  },
  countryText: {
    ...textStyles.caption,
    color: colors.success,
    fontWeight: typography.weights.medium,
  },
});

export default JobsScreen;