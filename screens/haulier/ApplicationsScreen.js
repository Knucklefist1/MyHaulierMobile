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
import { styles } from '../../styles/screens/ApplicationsScreenStyles';
import { EmptyState, LoadingSpinner } from '../../components/common';

const ApplicationsScreen = ({ navigation }) => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
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

    setTimeout(() => {
      setConnections(mockConnections);
      setLoading(false);
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setConnections(mockConnections);
      setRefreshing(false);
    }, 1000);
  };

  const handleViewForwarderProfile = (forwarderId) => {
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
    return <LoadingSpinner message="Loading Partnership Connections..." />;
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
        ListEmptyComponent={() => (
          <EmptyState
            icon="handshake-outline"
            title="No Connections Yet"
            subtitle="Start connecting with forwarders to build your transport partnership network."
            iconSize={64}
          />
        )}
      />
    </View>
  );
};

export default ApplicationsScreen;