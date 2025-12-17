import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/HaulierProfileScreenStyles';

const HaulierProfileScreen = ({ navigation, route }) => {
  const { haulier } = route.params;
  const [activeTab, setActiveTab] = useState('overview');

  const handleContact = () => {
    Alert.alert(
      'Contact Haulier',
      `Would you like to contact ${haulier.name}?`,
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

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Company:</Text>
          <Text style={styles.infoValue}>{haulier.company}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Contact:</Text>
          <Text style={styles.infoValue}>{haulier.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Languages:</Text>
          <Text style={styles.infoValue}>{haulier.capabilities.languages.join(', ')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.performanceGrid}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{haulier.performance.rating}</Text>
            <Text style={styles.performanceLabel}>Rating</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{haulier.performance.completedJobs}</Text>
            <Text style={styles.performanceLabel}>Jobs Completed</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{haulier.performance.onTimeDelivery}%</Text>
            <Text style={styles.performanceLabel}>On Time</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>{haulier.performance.customerSatisfaction}%</Text>
            <Text style={styles.performanceLabel}>Satisfaction</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderFleet = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fleet Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Trucks:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.totalTrucks}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Available:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.availableTrucks}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Max Weight:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.maxWeight} tons</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Max Length:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.maxLength}m</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Max Height:</Text>
          <Text style={styles.infoValue}>{haulier.fleet.maxHeight}m</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Truck Types</Text>
        <View style={styles.tagContainer}>
          {haulier.fleet.truckTypes.map((type, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{type.replace('_', ' ')}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Equipment</Text>
        <View style={styles.tagContainer}>
          {haulier.fleet.specialEquipment.map((equipment, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{equipment}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderCoverage = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Operating Countries</Text>
        <View style={styles.tagContainer}>
          {haulier.operatingRegions.countries.map((country, index) => (
            <View key={index} style={[styles.tag, styles.countryTag]}>
              <Text style={styles.tagText}>{country}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regions</Text>
        <View style={styles.tagContainer}>
          {haulier.operatingRegions.regions.map((region, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{region}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specific Routes</Text>
        <View style={styles.routeList}>
          {haulier.operatingRegions.specificRoutes.map((route, index) => (
            <View key={index} style={styles.routeItem}>
              <Ionicons name="location" size={16} color={colors.primary} />
              <Text style={styles.routeText}>{route}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderCapabilities = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cargo Types</Text>
        <View style={styles.tagContainer}>
          {haulier.capabilities.cargoTypes.map((type, index) => (
            <View key={index} style={[styles.tag, styles.capabilityTag]}>
              <Text style={styles.tagText}>{type.replace('_', ' ')}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Industries</Text>
        <View style={styles.tagContainer}>
          {haulier.capabilities.industries.map((industry, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{industry}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        <View style={styles.tagContainer}>
          {haulier.capabilities.certifications.map((cert, index) => (
            <View key={index} style={[styles.tag, styles.certificationTag]}>
              <Text style={styles.tagText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPricing = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pricing Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Base Rate:</Text>
          <Text style={styles.infoValue}>{haulier.pricing.baseRate} {haulier.pricing.currency}/km</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fuel Surcharge:</Text>
          <Text style={styles.infoValue}>{haulier.pricing.fuelSurcharge} {haulier.pricing.currency}/km</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Toll Included:</Text>
          <Text style={styles.infoValue}>{haulier.pricing.tollIncluded ? 'Yes' : 'No'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Availability</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Working Days:</Text>
          <Text style={styles.infoValue}>{haulier.availability.workingDays.join(', ')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Working Hours:</Text>
          <Text style={styles.infoValue}>{haulier.availability.workingHours.start} - {haulier.availability.workingHours.end}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Emergency Available:</Text>
          <Text style={styles.infoValue}>{haulier.availability.emergencyAvailable ? 'Yes' : 'No'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Weekend Work:</Text>
          <Text style={styles.infoValue}>{haulier.availability.weekendWork ? 'Yes' : 'No'}</Text>
        </View>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'fleet':
        return renderFleet();
      case 'coverage':
        return renderCoverage();
      case 'capabilities':
        return renderCapabilities();
      case 'pricing':
        return renderPricing();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Haulier Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {haulier.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{haulier.name}</Text>
            <Text style={styles.profileCompany}>{haulier.company}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={styles.ratingText}>{haulier.performance.rating}/5</Text>
              <Text style={styles.ratingCount}>({haulier.performance.completedJobs} jobs)</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'fleet', label: 'Fleet' },
              { key: 'coverage', label: 'Coverage' },
              { key: 'capabilities', label: 'Capabilities' },
              { key: 'pricing', label: 'Pricing' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  activeTab === tab.key && styles.activeTab
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {renderTabContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <Text style={styles.contactButtonText}>Contact Haulier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HaulierProfileScreen;
