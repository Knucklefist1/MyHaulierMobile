import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';

const OffersScreen = ({ navigation }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    setLoading(true);
    try {
      // Mock offers data
      const mockOffers = [
        {
          id: 'offer-1',
          forwarderId: 'forwarder-1',
          forwarderName: 'TechCorp Denmark A/S',
          forwarderCompany: 'TechCorp Denmark A/S',
          ratePerKm: 8.5,
          currency: 'DKK',
          fuelSurcharge: 15,
          tollIncluded: true,
          minimumCharge: 500,
          paymentTerms: 'net_30',
          contractDuration: 12,
          message: 'We are looking for a reliable haulier for our electronics distribution network. We need temperature-controlled transport and high security standards.',
          specialConditions: 'Must have ADR certification and GPS tracking on all vehicles.',
          operatingCountries: ['Denmark', 'Sweden', 'Norway'],
          status: 'pending', // 'pending', 'accepted', 'rejected', 'expired'
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        },
        {
          id: 'offer-2',
          forwarderId: 'forwarder-2',
          forwarderName: 'Nordic Furniture Group',
          forwarderCompany: 'Nordic Furniture Group',
          ratePerKm: 7.2,
          currency: 'DKK',
          fuelSurcharge: 12,
          tollIncluded: false,
          minimumCharge: 400,
          paymentTerms: 'net_15',
          contractDuration: 24,
          message: 'We need a dedicated haulier for furniture deliveries. Looking for someone with experience in furniture handling and specialized equipment.',
          specialConditions: 'Must have furniture handling equipment and proof of delivery system.',
          operatingCountries: ['Denmark', 'Germany', 'Netherlands'],
          status: 'pending',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
        },
        {
          id: 'offer-3',
          forwarderId: 'forwarder-3',
          forwarderName: 'Fresh Foods Logistics',
          forwarderCompany: 'Fresh Foods Logistics',
          ratePerKm: 9.0,
          currency: 'DKK',
          fuelSurcharge: 18,
          tollIncluded: true,
          minimumCharge: 600,
          paymentTerms: 'net_30',
          contractDuration: 18,
          message: 'Daily temperature-controlled transport of fresh produce. We need a haulier with HACCP certification and reliable cold chain management.',
          specialConditions: 'HACCP certification required. Daily availability needed. Temperature monitoring system required.',
          operatingCountries: ['Denmark', 'Sweden', 'Norway', 'Germany', 'Poland'],
          status: 'accepted',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // expired
        }
      ];

      setTimeout(() => {
        setOffers(mockOffers);
        setLoading(false);
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to load offers');
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadOffers().finally(() => setRefreshing(false));
  };

  const handleAcceptOffer = (offer) => {
    Alert.alert(
      'Accept Offer',
      `Accept partnership offer from ${offer.forwarderName}?\n\nRate: ${offer.ratePerKm} ${offer.currency}/km\nContract: ${offer.contractDuration} months`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: () => {
            // Update offer status
            setOffers(prev => prev.map(o => 
              o.id === offer.id ? { ...o, status: 'accepted' } : o
            ));
            Alert.alert('Success', 'Partnership offer accepted! You can now start working with this forwarder.');
          }
        }
      ]
    );
  };

  const handleRejectOffer = (offer) => {
    Alert.alert(
      'Reject Offer',
      `Reject partnership offer from ${offer.forwarderName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          onPress: () => {
            // Update offer status
            setOffers(prev => prev.map(o => 
              o.id === offer.id ? { ...o, status: 'rejected' } : o
            ));
            Alert.alert('Offer Rejected', 'The partnership offer has been rejected.');
          }
        }
      ]
    );
  };

  const handleViewOfferDetails = (offer) => {
    navigation.navigate('OfferDetails', { offer });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'accepted': return colors.success;
      case 'rejected': return colors.error;
      case 'expired': return colors.mediumGray;
      default: return colors.mediumGray;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  };

  const renderOfferItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.offerCard}
      onPress={() => handleViewOfferDetails(item)}
    >
      <View style={styles.offerHeader}>
        <View style={styles.forwarderInfo}>
          <Text style={styles.forwarderName}>{item.forwarderName}</Text>
          <Text style={styles.offerRate}>{item.ratePerKm} {item.currency}/km</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <Text style={styles.message} numberOfLines={2}>{item.message}</Text>

      <View style={styles.offerDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color={colors.mediumGray} />
          <Text style={styles.detailText}>
            {item.contractDuration} months contract
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="card" size={16} color={colors.mediumGray} />
          <Text style={styles.detailText}>
            Payment: {item.paymentTerms.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color={colors.mediumGray} />
          <Text style={styles.detailText}>
            Expires: {new Date(item.expiresAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="globe" size={16} color={colors.mediumGray} />
          <Text style={styles.detailText}>
            Countries: {item.operatingCountries.join(', ')}
          </Text>
        </View>
      </View>

      {item.status === 'pending' && (
        <View style={styles.offerActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleRejectOffer(item)}
          >
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => handleAcceptOffer(item)}
          >
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="document-text-outline" size={64} color={colors.mediumGray} />
      <Text style={styles.emptyTitle}>No Partnership Offers</Text>
      <Text style={styles.emptySubtitle}>
        Partnership opportunities from forwarders will appear here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={offers}
        renderItem={renderOfferItem}
        keyExtractor={(item) => item.id}
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
  listContainer: {
    padding: spacing[4],
  },
  offerCard: {
    ...components.card,
    marginBottom: spacing[4],
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  forwarderInfo: {
    flex: 1,
  },
  forwarderName: {
    ...textStyles.h4,
    marginBottom: spacing[1],
  },
  offerRate: {
    ...textStyles.body,
    color: colors.primary,
    fontWeight: typography.weights.bold,
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
  message: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[3],
  },
  offerDetails: {
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
    color: colors.mediumGray,
  },
  offerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
    paddingTop: spacing[3],
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing[3],
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginHorizontal: spacing[1],
  },
  rejectButton: {
    backgroundColor: colors.errorLight,
  },
  acceptButton: {
    backgroundColor: colors.success,
  },
  rejectButtonText: {
    ...textStyles.label,
    color: colors.error,
  },
  acceptButtonText: {
    ...textStyles.label,
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

export default OffersScreen;
