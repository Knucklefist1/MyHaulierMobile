// Matching-skærm - Finder og matcher forwarders med hauliers baseret på kriterier
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/MatchingScreenStyles';
import { EmptyState } from '../../components/common';
import { MatchCard, FilterModal } from '../../components/matching';
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

      const haulierProfiles = await availabilityService.getAvailableHauliers();

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

  const renderMatchItem = ({ item }) => (
    <MatchCard
      match={item}
      onViewProfile={handleViewProfile}
      onMakeOffer={handleMakeOffer}
      onContact={handleContactHaulier}
    />
  );

  const renderEmptyState = () => (
    <EmptyState
      icon="search"
      title="No Matches Found"
      subtitle="Try adjusting your filters or search criteria"
      iconSize={64}
    />
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
        ListEmptyComponent={!loading ? renderEmptyState() : null}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal
        visible={showFilters}
        filters={filters}
        onClose={() => setShowFilters(false)}
        onClear={clearFilters}
        onApply={applyFilters}
        onFilterChange={handleFilterChange}
        onMultiSelectFilter={handleMultiSelectFilter}
        countries={countries}
        truckTypes={truckTypes}
        trailerTypes={trailerTypes}
        certifications={certifications}
        languages={languages}
        specialEquipment={specialEquipment}
      />
    </View>
  );
};

export default MatchingScreen;