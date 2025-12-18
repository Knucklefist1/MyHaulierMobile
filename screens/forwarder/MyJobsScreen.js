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
import { styles } from '../../styles/screens/MyJobsScreenStyles';

const MyJobsScreen = ({ navigation }) => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const mockPartnerships = [
      {
        id: '1',
        haulierName: 'Lars Andersen',
        haulierCompany: 'Nordic Transport A/S',
        industry: 'Electronics',
        partnershipType: 'Long-term Partnership',
        status: 'active',
        message: 'Partnership established for electronics transport. Excellent service and reliability.',
        createdAt: new Date('2024-01-10T10:00:00Z').toISOString(),
        haulierId: 'haulier-1',
        partnershipDetails: {
          contractType: 'Long-term',
          frequency: 'Regular',
          volume: 'High',
          reliability: '98%',
          rating: 4.8,
          specialties: ['Electronics', 'Temperature Control', 'Security'],
          countries: ['Denmark', 'Sweden', 'Norway'],
          currentRate: 8.5,
          currency: 'DKK'
        }
      },
      {
        id: '2',
        haulierName: 'Erik Hansen',
        haulierCompany: 'Danish Logistics',
        industry: 'Furniture',
        partnershipType: 'Dedicated Partnership',
        status: 'active',
        message: 'Dedicated partner for furniture transport. Specialized equipment and handling.',
        createdAt: new Date('2024-01-08T14:30:00Z').toISOString(),
        haulierId: 'haulier-2',
        partnershipDetails: {
          contractType: 'Dedicated',
          frequency: 'Regular',
          volume: 'Medium',
          reliability: '95%',
          rating: 4.6,
          specialties: ['Furniture', 'Specialized Equipment', 'Careful Handling'],
          countries: ['Denmark', 'Germany', 'Netherlands'],
          currentRate: 7.2,
          currency: 'DKK'
        }
      },
      {
        id: '3',
        haulierName: 'Mads Jensen',
        haulierCompany: 'Global Freight',
        industry: 'Logistics',
        partnershipType: 'International Partnership',
        status: 'pending',
        message: 'Partnership request under review for international transport capabilities.',
        createdAt: new Date('2024-01-12T09:15:00Z').toISOString(),
        haulierId: 'haulier-3',
        partnershipDetails: {
          contractType: 'International',
          frequency: 'On-demand',
          volume: 'High',
          reliability: 'TBD',
          rating: 4.9,
          specialties: ['International', 'Cross-border', 'Customs'],
          countries: ['Denmark', 'Sweden', 'Norway', 'Germany', 'Poland'],
          currentRate: 9.0,
          currency: 'DKK'
        }
      }
    ];

    setTimeout(() => {
      setPartnerships(mockPartnerships);
      setLoading(false);
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPartnerships(mockPartnerships);
      setRefreshing(false);
    }, 1000);
  };

  const handleViewHaulierProfile = (haulierId) => {
    const haulier = {
      uid: haulierId,
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
    };
    navigation.navigate('Find', { screen: 'HaulierProfile', params: { haulier } });
  };

  const handleContactHaulier = (partnership) => {
    Alert.alert(
      'Contact Haulier',
      `Would you like to contact ${partnership.haulierName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Message',
          onPress: () => {
            navigation.navigate('Chat', {
              screen: 'ChatConversation',
              params: {
                chatId: `chat_${partnership.haulierId}`,
                otherParticipant: partnership.haulierId,
                chatTitle: `Chat with ${partnership.haulierName}`
              }
            });
          }
        }
      ]
    );
  };

  const renderPartnershipItem = ({ item }) => (
    <View style={styles.partnershipCard}>
      <View style={styles.partnershipHeader}>
        <Text style={styles.haulierName}>{item.haulierName}</Text>
        <View style={[styles.statusBadge, styles[item.status]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.haulierCompany}>{item.haulierCompany}</Text>
      <Text style={styles.industry}>{item.industry} • {item.partnershipType}</Text>
      <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
      <Text style={styles.date}>Partnership: {new Date(item.createdAt).toLocaleDateString()}</Text>

      <View style={styles.partnershipDetails}>
        <Text style={styles.detailsTitle}>Partnership Details:</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Contract Type:</Text>
            <Text style={styles.detailValue}>{item.partnershipDetails.contractType}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Frequency:</Text>
            <Text style={styles.detailValue}>{item.partnershipDetails.frequency}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Volume:</Text>
            <Text style={styles.detailValue}>{item.partnershipDetails.volume}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Reliability:</Text>
            <Text style={styles.detailValue}>{item.partnershipDetails.reliability}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rating:</Text>
            <Text style={styles.detailValue}>{item.partnershipDetails.rating}/5</Text>
          </View>
        </View>
        <View style={styles.specialtiesContainer}>
          <Text style={styles.specialtiesLabel}>Specialties:</Text>
          <View style={styles.specialtiesList}>
            {item.partnershipDetails.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.countriesContainer}>
          <Text style={styles.countriesLabel}>Operating Countries:</Text>
          <View style={styles.countriesList}>
            {item.partnershipDetails.countries.map((country, index) => (
              <View key={index} style={styles.countryTag}>
                <Text style={styles.countryText}>{country}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.rateContainer}>
          <Text style={styles.rateLabel}>Current Rate:</Text>
          <Text style={styles.rateValue}>
            {item.partnershipDetails.currentRate} {item.partnershipDetails.currency}/km
          </Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleViewHaulierProfile(item.haulierId)}
        >
          <Text style={styles.actionButtonText}>View Profile</Text>
        </TouchableOpacity>
        
        {item.status === 'active' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => handleContactHaulier(item)}
          >
            <Text style={[styles.actionButtonText, styles.primaryButtonText]}>Contact</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Haulier Partnerships...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Haulier Partnerships</Text>
        <Text style={styles.headerSubtitle}>Manage your haulier connections and established partnerships</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.findButton}
            onPress={() => navigation.navigate('Find')}
          >
            <Ionicons name="search" size={20} color="#ffffff" />
            <Text style={styles.findButtonText}>Find More Hauliers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => navigation.navigate('PostJob')}
          >
            <Ionicons name="add-circle" size={20} color="#ffffff" />
            <Text style={styles.postButtonText}>Post Opportunity</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={partnerships}
        renderItem={renderPartnershipItem}
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
            <Ionicons name="handshake-outline" size={64} color={colors.mediumGray} />
            <Text style={styles.emptyTitle}>No Partnerships Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start building your haulier network by finding and connecting with reliable transport partners.
            </Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={() => navigation.navigate('Find')}
            >
              <Text style={styles.emptyStateButtonText}>Find Hauliers</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default MyJobsScreen;