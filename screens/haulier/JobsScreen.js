import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/JobsScreenStyles';
import { OfflineStorage } from '../../utils/storage';

const JobsScreen = ({ navigation }) => {
  const [forwarders, setForwarders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadForwarders();
  }, []);

  const loadForwarders = async () => {
    try {
      const savedForwarders = await OfflineStorage.getJobs();
      
      if (savedForwarders && savedForwarders.length > 0) {
        setForwarders(savedForwarders);
      } else {
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

export default JobsScreen;