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

const ApplicationsScreen = ({ navigation }) => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Mock data for haulier's connection requests and partnerships
    const mockConnections = [
      {
        id: '1',
        forwarderName: 'TechCorp Denmark',
        forwarderCompany: 'TechCorp Denmark A/S',
        industry: 'Electronics',
        partnershipType: 'Long-term Partnership',
        status: 'pending',
        message: 'We are interested in establishing a long-term partnership for our electronics transport needs.',
        createdAt: new Date('2024-01-15T10:00:00Z').toISOString(),
        forwarderId: 'forwarder-1',
        partnershipBenefits: [
          'Monthly guaranteed volume',
          'Competitive rates',
          'Priority booking',
          'Long-term contract'
        ],
        operatingCountries: ['Denmark', 'Sweden', 'Norway'],
        currentRate: 8.5,
        currency: 'DKK'
      },
      {
        id: '2',
        forwarderName: 'Nordic Furniture',
        forwarderCompany: 'Nordic Furniture Group',
        industry: 'Furniture',
        partnershipType: 'Dedicated Partnership',
        status: 'accepted',
        message: 'Partnership established! Welcome to our network of trusted hauliers.',
        createdAt: new Date('2024-01-12T14:30:00Z').toISOString(),
        forwarderId: 'forwarder-2',
        partnershipBenefits: [
          'Exclusive partnership',
          'Flexible scheduling',
          'Premium rates',
          'Growth opportunities'
        ],
        operatingCountries: ['Denmark', 'Germany', 'Netherlands'],
        currentRate: 7.2,
        currency: 'DKK'
      },
      {
        id: '3',
        forwarderName: 'Scandinavian Logistics',
        forwarderCompany: 'Scandinavian Logistics AB',
        industry: 'Logistics',
        partnershipType: 'International Partnership',
        status: 'rejected',
        message: 'Thank you for your interest. We have decided to work with another partner for our international transport needs.',
        createdAt: new Date('2024-01-10T09:15:00Z').toISOString(),
        forwarderId: 'forwarder-3',
        partnershipBenefits: [],
        operatingCountries: ['Denmark', 'Sweden', 'Norway', 'Germany', 'Poland'],
        currentRate: 9.0,
        currency: 'DKK'
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setConnections(mockConnections);
      setLoading(false);
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setConnections(mockConnections); // In a real app, this would fetch from Firebase
      setRefreshing(false);
    }, 1000);
  };

  const handleViewForwarderProfile = (forwarderId) => {
    // In a real app, fetch forwarder profile by ID
    const forwarder = {
      uid: forwarderId,
      name: 'TechCorp Denmark',
      company: 'TechCorp Denmark A/S',
      industry: 'Electronics',
      location: 'Copenhagen, Denmark',
      companySize: 'Large (500+ employees)',
      partnershipType: 'Regular Routes',
      description: 'Leading electronics distributor with 20+ years of experience.',
      requirements: {
        truckTypes: ['dry_van', 'reefer'],
        specialEquipment: ['temperature_control'],
        certifications: ['ADR'],
        experience: '2+ years'
      },
      partnershipBenefits: [
        'Regular monthly contracts',
        'Competitive rates',
        'Long-term relationship',
        'Priority booking'
      ]
    };
    // Navigate to forwarder profile screen
    navigation.navigate('ForwarderProfile', { forwarder });
  };

  const handleContactForwarder = (connection) => {
    Alert.alert(
      'Contact Forwarder',
      `Would you like to contact ${connection.forwarderName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Message',
          onPress: () => {
            navigation.navigate('Chat', {
              screen: 'ChatConversation',
              params: {
                chatId: `chat_${connection.forwarderId}`,
                otherParticipant: connection.forwarderId,
                chatTitle: `Chat with ${connection.forwarderName}`
              }
            });
          }
        }
      ]
    );
  };

  const renderConnectionItem = ({ item }) => (
    <View style={styles.connectionCard}>
      <View style={styles.connectionHeader}>
        <Text style={styles.forwarderName}>{item.forwarderName}</Text>
        <View style={[styles.statusBadge, styles[item.status]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.forwarderCompany}>{item.forwarderCompany}</Text>
      <Text style={styles.industry}>{item.industry} • {item.partnershipType}</Text>
      <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
      <Text style={styles.date}>Requested: {new Date(item.createdAt).toLocaleDateString()}</Text>

      {item.partnershipBenefits.length > 0 && (
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Partnership Benefits:</Text>
          <View style={styles.benefitsList}>
            {item.partnershipBenefits.map((benefit, index) => (
              <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
            ))}
          </View>
        </View>
      )}

      <View style={styles.countriesContainer}>
        <Text style={styles.countriesLabel}>Operating Countries:</Text>
        <View style={styles.countriesList}>
          {item.operatingCountries.map((country, index) => (
            <View key={index} style={styles.countryTag}>
              <Text style={styles.countryText}>{country}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.rateContainer}>
        <Text style={styles.rateLabel}>Current Rate:</Text>
        <Text style={styles.rateValue}>
          {item.currentRate} {item.currency}/km
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleViewForwarderProfile(item.forwarderId)}
        >
          <Text style={styles.actionButtonText}>View Profile</Text>
        </TouchableOpacity>
        
        {item.status === 'accepted' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => handleContactForwarder(item)}
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
        <Text style={styles.loadingText}>Loading Partnership Connections...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Partnership Connections</Text>
        <Text style={styles.headerSubtitle}>Manage your forwarder connections and partnership opportunities</Text>
      </View>
      
      <FlatList
        data={connections}
        renderItem={renderConnectionItem}
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
            <Text style={styles.emptyTitle}>No Connections Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start connecting with forwarders to build your transport partnership network.
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
  connectionCard: {
    ...components.card,
    marginBottom: spacing[4],
  },
  connectionHeader: {
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
  pending: {
    backgroundColor: colors.warning,
  },
  accepted: {
    backgroundColor: colors.success,
  },
  rejected: {
    backgroundColor: colors.error,
  },
  forwarderCompany: {
    ...textStyles.body,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  industry: {
    ...textStyles.caption,
    color: colors.primary,
    marginBottom: spacing[2],
  },
  message: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[2],
  },
  date: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[3],
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
    paddingTop: spacing[3],
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
  countriesContainer: {
    marginTop: spacing[3],
  },
  countriesLabel: {
    ...textStyles.label,
    marginBottom: spacing[2],
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
  rateContainer: {
    marginTop: spacing[3],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: spacing[3],
    borderRadius: borderRadius.md,
  },
  rateLabel: {
    ...textStyles.label,
    color: colors.darkGray,
  },
  rateValue: {
    ...textStyles.h4,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
});

export default ApplicationsScreen;