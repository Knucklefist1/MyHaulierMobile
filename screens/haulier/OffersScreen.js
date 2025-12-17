import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { styles } from '../../styles/screens/OffersScreenStyles';
import { colors } from '../../styles/designSystem';
import { EmptyState, LoadingSpinner } from '../../components/common';

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

  if (loading) {
    return <LoadingSpinner message="Loading offers..." />;
  }

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
        ListEmptyComponent={() => (
          <EmptyState
            icon="document-text-outline"
            title="No Partnership Offers"
            subtitle="Partnership opportunities from forwarders will appear here"
            iconSize={64}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OffersScreen;
