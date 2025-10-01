import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
  Modal,
  ScrollView,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';
import matchingService from '../../services/MatchingService';
import availabilityService from '../../services/AvailabilityService';

const MatchingScreen = ({ navigation, route }) => {
  const { jobId } = route.params || {};
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    countries: [],
    truckTypes: [],
    trailerTypes: [],
    certifications: [],
    minTrucks: 0,
    maxTrucks: 100,
    minRating: 0,
    maxRating: 5,
    minExperience: 0,
    maxExperience: 20,
    availability: 'all', // 'all', 'available', 'unavailable'
    priceRange: { min: 0, max: 1000 },
    distance: 500, // km
    languages: [],
    specialEquipment: []
  });

  const countries = [
    'Denmark', 'Sweden', 'Norway', 'Finland', 'Germany', 'Netherlands', 
    'Belgium', 'Poland', 'France', 'UK', 'Spain', 'Italy'
  ];

  const truckTypes = [
    'Dry Van', 'Reefer', 'Flatbed', 'Container', 'Tanker', 'Car Carrier'
  ];

  const trailerTypes = [
    'Standard', 'Extendable', 'Curtain Side', 'Skeleton', 'Low Loader', 'Car Carrier'
  ];

  const certifications = [
    'ADR', 'ISO 9001', 'GDP', 'HACCP', 'TAPA', 'C-TPAT', 'AEO'
  ];

  const languages = [
    'English', 'Danish', 'Swedish', 'Norwegian', 'German', 'Dutch', 'French'
  ];

  const specialEquipment = [
    'Temperature Control', 'Crane', 'Forklift', 'Heavy Lifting', 
    'Furniture Handling', 'GPS Tracking', 'Security Features'
  ];

  useEffect(() => {
    loadMatches();
  }, [jobId]);

  const loadMatches = async () => {
    setLoading(true);
    try {
      // Mock job requirements
      const jobRequirements = {
        jobId: jobId || 'job-1',
        title: 'Find Haulier Partners',
        description: 'Looking for reliable haulier partners',
        forwarderId: 'forwarder-1',
        transport: {
          cargoType: 'general',
          weight: 2.5,
          dimensions: { length: 6, width: 2.4, height: 2.6 },
          specialRequirements: ['fragile'],
          handlingRequirements: ['special_equipment']
        },
        route: {
          pickupLocation: 'Copenhagen, Denmark',
          deliveryLocation: 'Aarhus, Denmark',
          countries: ['DK'],
          distance: 300,
          estimatedDuration: 4
        },
        timing: {
          pickupDate: '2024-01-15',
          deliveryDate: '2024-01-15',
          flexibility: 'strict',
          workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        budget: {
          maxBudget: 5000,
          currency: 'DKK',
          paymentTerms: 'net_30',
          fuelSurcharge: 'included'
        },
        haulierRequirements: {
          minRating: filters.minRating,
          minExperience: filters.minExperience,
          requiredCertifications: filters.certifications,
          requiredLanguages: filters.languages,
          preferredCountries: filters.countries,
          maxDistanceFromRoute: filters.distance
        }
      };

      // Get real haulier availability data
      const haulierProfiles = await availabilityService.getAvailableHauliers();

      // Add some mock data for demo purposes if no real data exists
      if (haulierProfiles.length === 0) {
        haulierProfiles.push(
          {
            uid: 'haulier-1',
            name: 'Lars Andersen',
            company: 'Nordic Transport A/S',
            phone: '+45 12 34 56 78',
            fleet: {
              totalTrucks: 15,
              availableTrucks: 3,
              truckTypes: ['dry_van', 'reefer'],
              trailerTypes: ['standard', 'extendable'],
              maxWeight: 24,
              maxLength: 13.6,
              maxHeight: 4.0,
              specialEquipment: ['crane', 'forklift']
            },
            operatingRegions: {
              countries: ['DK', 'SE', 'NO'],
              regions: ['Nordic'],
              specificRoutes: ['Copenhagen-Aarhus', 'Stockholm-Oslo']
            },
            capabilities: {
              cargoTypes: ['general', 'fragile', 'temperature_controlled'],
              industries: ['electronics', 'automotive'],
              certifications: ['ADR', 'ISO', 'GDP'],
              languages: ['en', 'da', 'sv']
            },
            availability: {
              isAvailable: true,
              availableTrucks: 3,
              workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
              workingHours: { start: '08:00', end: '17:00' },
              emergencyAvailable: true,
              weekendWork: false
            },
            performance: {
              rating: 4.8,
              totalJobs: 150,
              completedJobs: 148,
              onTimeDelivery: 96,
              customerSatisfaction: 94
            },
            pricing: {
              baseRate: 8.5,
              currency: 'DKK',
              fuelSurcharge: 0.15,
              tollIncluded: true
            }
          },
          {
            uid: 'haulier-2',
            name: 'Erik Hansen',
            company: 'Danish Logistics',
            phone: '+45 98 76 54 32',
            fleet: {
              totalTrucks: 8,
              availableTrucks: 2,
              truckTypes: ['dry_van'],
              trailerTypes: ['standard'],
              maxWeight: 20,
              maxLength: 13.6,
              maxHeight: 4.0,
              specialEquipment: []
            },
            operatingRegions: {
              countries: ['DK', 'DE'],
              regions: ['Nordic', 'Central Europe'],
              specificRoutes: ['Copenhagen-Hamburg', 'Aarhus-Berlin']
            },
            capabilities: {
              cargoTypes: ['general', 'furniture'],
              industries: ['furniture', 'textiles'],
              certifications: ['ADR'],
              languages: ['en', 'da', 'de']
            },
            availability: {
              isAvailable: true,
              availableTrucks: 2,
              workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
              workingHours: { start: '07:00', end: '18:00' },
              emergencyAvailable: false,
              weekendWork: false
            },
            performance: {
              rating: 4.2,
              totalJobs: 75,
              completedJobs: 73,
              onTimeDelivery: 92,
              customerSatisfaction: 88
            },
            pricing: {
              baseRate: 7.5,
              currency: 'DKK',
              fuelSurcharge: 0.12,
              tollIncluded: false
            }
          }
        );
      }

      // Find matches
      const matchResults = matchingService.findMatches(jobRequirements, haulierProfiles);
      setMatches(matchResults);
    } catch (error) {
      Alert.alert('Error', 'Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadMatches().finally(() => setRefreshing(false));
  };

  const handleContactHaulier = (haulier) => {
    Alert.alert(
      'Contact Haulier',
      `Would you like to contact ${haulier.name} at ${haulier.company}?`,
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

  const handleMakeOffer = (haulier) => {
    Alert.alert(
      'Make Partnership Offer',
      `Would you like to send a partnership offer to ${haulier.name} at ${haulier.company}?\n\nThis will create a formal partnership proposal with your requirements and terms.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Create Offer',
          onPress: () => {
            // Navigate to offer creation screen
            navigation.navigate('CreateOffer', { 
              haulier,
              haulierId: haulier.uid 
            });
          }
        }
      ]
    );
  };

  const handleViewProfile = (haulier) => {
    navigation.navigate('HaulierProfile', { haulier });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleMultiSelectFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const applyFilters = () => {
    setShowFilters(false);
    loadMatches();
  };

  const clearFilters = () => {
    setFilters({
      countries: [],
      truckTypes: [],
      trailerTypes: [],
      certifications: [],
      minTrucks: 0,
      maxTrucks: 100,
      minRating: 0,
      maxRating: 5,
      minExperience: 0,
      maxExperience: 20,
      availability: 'all',
      priceRange: { min: 0, max: 1000 },
      distance: 500,
      languages: [],
      specialEquipment: []
    });
  };

  const filteredMatches = matches.filter(match => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      match.haulier.name.toLowerCase().includes(query) ||
      match.haulier.company.toLowerCase().includes(query)
    );
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.haulier.performance.rating - a.haulier.performance.rating;
      case 'price':
        return a.haulier.pricing.baseRate - b.haulier.pricing.baseRate;
      case 'distance':
        return a.matchScore.totalScore - b.matchScore.totalScore;
      default:
        return b.matchScore.totalScore - a.matchScore.totalScore;
    }
  });

  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Text style={styles.modalCancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity onPress={clearFilters}>
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
                  onPress={() => handleMultiSelectFilter('countries', country)}
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
                  onPress={() => handleMultiSelectFilter('truckTypes', type)}
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
                  onPress={() => handleFilterChange('availability', option)}
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
                  onPress={() => handleMultiSelectFilter('certifications', cert)}
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
                  onPress={() => handleMultiSelectFilter('languages', lang)}
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
                  onPress={() => handleMultiSelectFilter('specialEquipment', equipment)}
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
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderMatchItem = ({ item }) => (
    <View style={styles.matchCard}>
      <View style={styles.matchHeader}>
        <View style={styles.haulierInfo}>
          <Text style={styles.haulierName}>{item.haulier.name}</Text>
          <Text style={styles.companyName}>{item.haulier.company}</Text>
        </View>
        <View style={styles.matchScore}>
          <Text style={styles.scoreText}>{Math.round(item.matchScore.totalScore * 100)}%</Text>
          <Text style={styles.scoreLabel}>Match</Text>
        </View>
      </View>

      <View style={styles.matchDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="star" size={16} color={colors.warning} />
          <Text style={styles.detailText}>
            {item.haulier.performance.rating}/5 rating
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="car" size={16} color={colors.primary} />
          <Text style={styles.detailText}>
            {item.haulier.fleet.availableTrucks} trucks available
            {item.haulier.availability.isAvailable ? ' (Available)' : ' (Not Available)'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color={colors.success} />
          <Text style={styles.detailText}>
            {item.haulier.operatingRegions.countries.join(', ')}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color={colors.primary} />
          <Text style={styles.detailText}>
            {item.haulier.pricing.baseRate} DKK/km
            {item.haulier.pricing.fuelSurcharge > 0 && ` + ${(item.haulier.pricing.fuelSurcharge * 100)}% fuel surcharge`}
          </Text>
        </View>

        {item.haulier.pricing.tollIncluded && (
          <View style={styles.detailRow}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.detailText}>Tolls included</Text>
          </View>
        )}
      </View>

      <View style={styles.rateSection}>
        <Text style={styles.rateTitle}>Rate Information</Text>
        <View style={styles.rateDetails}>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Base Rate:</Text>
            <Text style={styles.rateValue}>{item.haulier.pricing.baseRate} DKK/km</Text>
          </View>
          {item.haulier.pricing.fuelSurcharge > 0 && (
            <View style={styles.rateRow}>
              <Text style={styles.rateLabel}>Fuel Surcharge:</Text>
              <Text style={styles.rateValue}>+{(item.haulier.pricing.fuelSurcharge * 100)}%</Text>
            </View>
          )}
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Tolls:</Text>
            <Text style={styles.rateValue}>{item.haulier.pricing.tollIncluded ? 'Included' : 'Not included'}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Currency:</Text>
            <Text style={styles.rateValue}>{item.haulier.pricing.currency}</Text>
          </View>
        </View>
      </View>

      <View style={styles.matchReasons}>
        <Text style={styles.reasonsTitle}>Why this match:</Text>
        {item.matchReasons.map((reason, index) => (
          <Text key={index} style={styles.reasonText}>• {reason}</Text>
        ))}
      </View>

      <View style={styles.matchActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleViewProfile(item.haulier)}
        >
          <Text style={styles.actionButtonText}>View Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.offerButton]}
          onPress={() => handleMakeOffer(item.haulier)}
        >
          <Text style={[styles.actionButtonText, styles.offerButtonText]}>Make Offer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.primaryButton]}
          onPress={() => handleContactHaulier(item.haulier)}
        >
          <Text style={[styles.actionButtonText, styles.primaryButtonText]}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search" size={64} color={colors.mediumGray} />
      <Text style={styles.emptyTitle}>No Matches Found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your filters or search criteria
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search hauliers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="funnel" size={20} color={colors.primary} />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedMatches}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.haulier.uid}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={!loading ? renderEmptyState : null}
        showsVerticalScrollIndicator={false}
      />

      {renderFilterModal()}
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
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  searchInput: {
    flex: 1,
    ...components.input,
    marginRight: spacing[3],
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
  },
  filterButtonText: {
    ...textStyles.caption,
    color: colors.primary,
    marginLeft: spacing[1],
  },
  listContainer: {
    padding: spacing[4],
  },
  matchCard: {
    ...components.card,
    marginBottom: spacing[4],
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  haulierInfo: {
    flex: 1,
  },
  haulierName: {
    ...textStyles.h3,
    marginBottom: spacing[1],
  },
  companyName: {
    ...textStyles.caption,
  },
  matchScore: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.lg,
  },
  scoreText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  scoreLabel: {
    ...textStyles.caption,
    color: colors.primary,
  },
  matchDetails: {
    marginBottom: spacing[3],
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  detailText: {
    ...textStyles.caption,
    marginLeft: spacing[2],
  },
  matchReasons: {
    marginBottom: spacing[3],
  },
  reasonsTitle: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  reasonText: {
    ...textStyles.caption,
    marginBottom: spacing[1],
  },
  rateSection: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginBottom: spacing[3],
  },
  rateTitle: {
    ...textStyles.h4,
    color: colors.primary,
    marginBottom: spacing[2],
  },
  rateDetails: {
    gap: spacing[1],
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateLabel: {
    ...textStyles.caption,
    color: colors.darkGray,
  },
  rateValue: {
    ...textStyles.caption,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  matchActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    ...components.button.secondary,
    flex: 1,
    marginHorizontal: spacing[1],
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  offerButton: {
    backgroundColor: colors.warning,
  },
  actionButtonText: {
    ...textStyles.label,
    color: colors.darkGray,
  },
  primaryButtonText: {
    color: colors.white,
  },
  offerButtonText: {
    color: colors.white,
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
  // Modal styles
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
  modalCancel: {
    ...textStyles.label,
    color: colors.primary,
  },
  modalTitle: {
    ...textStyles.h3,
  },
  modalClear: {
    ...textStyles.label,
    color: colors.error,
  },
  modalContent: {
    flex: 1,
    padding: spacing[4],
  },
  filterSection: {
    marginBottom: spacing[6],
  },
  filterTitle: {
    ...textStyles.h4,
    marginBottom: spacing[3],
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeLabel: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    marginRight: spacing[2],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.white,
  },
  selectedRadio: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  radioText: {
    ...textStyles.caption,
    color: colors.darkGray,
  },
  selectedRadioText: {
    color: colors.white,
  },
  modalFooter: {
    padding: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  applyButton: {
    ...components.button.primary,
  },
  applyButtonText: {
    ...textStyles.button,
    color: colors.white,
  },
});

export default MatchingScreen;