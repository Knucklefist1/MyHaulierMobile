import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl
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
  const [sortBy, setSortBy] = useState('score'); // 'score', 'rating', 'price', 'distance'

  useEffect(() => {
    loadMatches();
  }, [jobId]);

  const loadMatches = async () => {
    setLoading(true);
    try {
      // Mock job requirements
      const jobRequirements = {
        jobId: jobId || 'job-1',
        title: 'Transport Electronics from Copenhagen to Aarhus',
        description: 'Urgent delivery of electronic components',
        forwarderId: 'forwarder-1',
        transport: {
          cargoType: 'electronics',
          weight: 2.5,
          dimensions: { length: 6, width: 2.4, height: 2.6 },
          specialRequirements: ['fragile', 'temperature_controlled'],
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
          minRating: 4.0,
          minExperience: 2,
          requiredCertifications: ['ADR'],
          requiredLanguages: ['en', 'da'],
          preferredCountries: ['DK'],
          maxDistanceFromRoute: 50
        }
      };

      // Get real haulier availability data
      const haulierProfiles = await availabilityService.getAvailableHauliers();
      
      // Add some mock data for demo purposes if no real data exists
      if (haulierProfiles.length === 0) {
        haulierProfiles.push({
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
        });
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
            // In a real app, this would initiate a phone call
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

  const handleViewProfile = (haulier) => {
    navigation.navigate('HaulierProfile', { haulier });
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
        return a.matchScore.totalScore - b.matchScore.totalScore; // Simplified
      default:
        return b.matchScore.totalScore - a.matchScore.totalScore;
    }
  });

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
          </Text>
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
        Try adjusting your job requirements or search criteria
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
        
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="funnel" size={20} color={colors.primary} />
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
  sortButton: {
    padding: spacing[2],
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
  actionButtonText: {
    ...textStyles.label,
    color: colors.darkGray,
  },
  primaryButtonText: {
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
});

export default MatchingScreen;
