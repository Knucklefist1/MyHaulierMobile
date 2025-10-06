import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  TextInput,
  Switch,
  Dimensions
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [partnerships, setPartnerships] = useState([]);
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    truckTypes: [],
    countries: [],
    partnershipTypes: [],
    maxDistance: 500, // km
    minRating: 0,
    maxRating: 5
  });
  const mapRef = useRef(null);

  // Mock freight forwarder partnership opportunities for hauliers
  const mockPartnerships = [
    {
      id: '1',
      title: 'TechCorp Denmark',
      description: 'Electronics transport partnership - seeking reliable hauliers',
      coordinate: { latitude: 55.6761, longitude: 12.5683 }, // Copenhagen
      type: 'forwarder',
      industry: 'Electronics',
      partnershipType: 'Long-term Contract',
      contractDuration: '12 months',
      trucksNeeded: {
        types: ['Dry Van', 'Reefer'],
        quantity: '8-12 trucks',
        specialRequirements: ['Temperature Control', 'GPS Tracking', 'Security Features']
      },
      operatingCountries: ['Denmark', 'Sweden', 'Norway'],
      currentRate: '€2.50/km',
      currency: 'EUR',
      rating: 4.8,
      distance: 0,
      status: 'seeking_partners',
      contactPerson: 'Lars Andersen',
      phone: '+45 12 34 56 78',
      email: 'lars@techcorp.dk'
    },
    {
      id: '2',
      title: 'Nordic Furniture',
      description: 'Furniture transport partnership - dedicated routes',
      coordinate: { latitude: 55.4038, longitude: 10.4024 }, // Odense
      type: 'forwarder',
      industry: 'Furniture',
      partnershipType: 'Dedicated Routes',
      contractDuration: '6 months',
      trucksNeeded: {
        types: ['Dry Van'],
        quantity: '5-8 trucks',
        specialRequirements: ['Careful Handling', 'Furniture Protection']
      },
      operatingCountries: ['Denmark', 'Germany', 'Netherlands'],
      currentRate: '€2.20/km',
      currency: 'EUR',
      rating: 4.6,
      distance: 0,
      status: 'seeking_partners',
      contactPerson: 'Maria Nielsen',
      phone: '+45 23 45 67 89',
      email: 'maria@nordicfurniture.dk'
    },
    {
      id: '3',
      title: 'Scandinavian Logistics',
      description: 'International logistics partnership - cross-border transport',
      coordinate: { latitude: 56.1572, longitude: 10.2107 }, // Aarhus
      type: 'forwarder',
      industry: 'Logistics',
      partnershipType: 'International Routes',
      contractDuration: '24 months',
      trucksNeeded: {
        types: ['Flatbed', 'Dry Van', 'Low Loader'],
        quantity: '15-20 trucks',
        specialRequirements: ['International Permits', 'Multi-language Drivers', 'Customs Experience']
      },
      operatingCountries: ['Denmark', 'Sweden', 'Norway', 'Germany', 'Netherlands'],
      currentRate: '€3.10/km',
      currency: 'EUR',
      rating: 4.9,
      distance: 0,
      status: 'seeking_partners',
      contactPerson: 'Erik Johansson',
      phone: '+45 34 56 78 90',
      email: 'erik@scandinavianlogistics.dk'
    },
    {
      id: '4',
      title: 'Danish Food Distribution',
      description: 'Food transport partnership - temperature controlled',
      coordinate: { latitude: 55.6050, longitude: 13.0038 }, // Malmö
      type: 'forwarder',
      industry: 'Food & Beverage',
      partnershipType: 'Temperature Controlled',
      contractDuration: '18 months',
      trucksNeeded: {
        types: ['Reefer', 'Multi-temperature'],
        quantity: '10-15 trucks',
        specialRequirements: ['HACCP Certification', 'Temperature Monitoring', 'Food Safety Training']
      },
      operatingCountries: ['Denmark', 'Sweden', 'Norway', 'Germany'],
      currentRate: '€2.80/km',
      currency: 'EUR',
      rating: 4.7,
      distance: 0,
      status: 'seeking_partners',
      contactPerson: 'Anna Lindberg',
      phone: '+45 45 67 89 01',
      email: 'anna@danishfood.dk'
    },
    {
      id: '5',
      title: 'Nordic Construction',
      description: 'Construction materials transport - heavy loads',
      coordinate: { latitude: 55.6761, longitude: 12.5683 }, // Copenhagen
      type: 'forwarder',
      industry: 'Construction',
      partnershipType: 'Heavy Transport',
      contractDuration: '36 months',
      trucksNeeded: {
        types: ['Flatbed', 'Low Loader', 'Crane Truck'],
        quantity: '6-10 trucks',
        specialRequirements: ['Heavy Load Experience', 'Construction Site Access', 'Safety Certifications']
      },
      operatingCountries: ['Denmark', 'Sweden', 'Norway'],
      currentRate: '€3.50/km',
      currency: 'EUR',
      rating: 4.5,
      distance: 0,
      status: 'seeking_partners',
      contactPerson: 'Michael Hansen',
      phone: '+45 56 78 90 12',
      email: 'michael@nordicconstruction.dk'
    }
  ];

  useEffect(() => {
    console.log('Setting partnerships:', mockPartnerships.length);
    getCurrentLocation();
    setPartnerships(mockPartnerships);
  }, []);

  // Update partnerships when location changes
  useEffect(() => {
    if (location) {
      const updatedPartnerships = mockPartnerships.map(partnership => ({
        ...partnership,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          partnership.coordinate.latitude,
          partnership.coordinate.longitude
        )
      }));
      setPartnerships(updatedPartnerships);
    }
  }, [location]);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Error getting location');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };


  const getMarkerColor = (type, status) => {
    if (type === 'forwarder') {
      return status === 'seeking_partners' ? colors.error : colors.mediumGray;
    } else {
      return status === 'available' ? colors.success : colors.mediumGray;
    }
  };

  const getMarkerIcon = (type) => {
    return type === 'forwarder' ? 'business' : 'truck';
  };

  const handleMarkerPress = (partnership) => {
    setSelectedPartnership(partnership);
  };

  const handleConnect = (partnership) => {
    Alert.alert(
      'Connect',
      `Connect with ${partnership.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Connect',
          onPress: () => {
            Alert.alert('Success', 'Connection request sent!');
            setSelectedPartnership(null);
          }
        }
      ]
    );
  };

  const filteredPartnerships = partnerships.filter(partnership => {
    const matchesSearch = partnership.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partnership.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistance = (partnership.distance || 0) <= filters.maxDistance;
    const matchesRating = partnership.rating >= filters.minRating && partnership.rating <= filters.maxRating;
    
    const matches = matchesSearch && matchesDistance && matchesRating;
    console.log('Partnership filter:', partnership.title, {
      matchesSearch,
      matchesDistance,
      matchesRating,
      distance: partnership.distance,
      matches
    });
    
    return matches;
  });
  
  console.log('Total partnerships:', partnerships.length, 'Filtered:', filteredPartnerships.length);
  
  // For debugging, let's use partnerships directly if filteredPartnerships is empty
  const displayPartnerships = filteredPartnerships.length > 0 ? filteredPartnerships : partnerships;

  const renderPartnershipCallout = (partnership) => (
    <Callout style={styles.callout}>
      <View style={styles.calloutContent}>
        <Text style={styles.calloutTitle}>{partnership.title}</Text>
        <Text style={styles.calloutDescription}>{partnership.description}</Text>
        <View style={styles.calloutDetails}>
          <Text style={styles.calloutDetail}>
            <Ionicons name="star" size={12} color={colors.warning} /> {partnership.rating}/5
          </Text>
          <Text style={styles.calloutDetail}>
            <Ionicons name="location" size={12} color={colors.primary} /> {Math.round(partnership.distance)}km
          </Text>
        </View>
        <TouchableOpacity
          style={styles.calloutButton}
          onPress={() => handleMarkerPress(partnership)}
        >
          <Text style={styles.calloutButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </Callout>
  );

  const renderFiltersModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.filtersContainer}>
        <View style={styles.filtersHeader}>
          <Text style={styles.filtersTitle}>Filter Partnerships</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.filtersContent}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Maximum Distance (km)</Text>
            <TextInput
              style={styles.filterInput}
              value={filters.maxDistance.toString()}
              onChangeText={(text) => setFilters({...filters, maxDistance: parseInt(text) || 500})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Minimum Rating</Text>
            <TextInput
              style={styles.filterInput}
              value={filters.minRating.toString()}
              onChangeText={(text) => setFilters({...filters, minRating: parseInt(text) || 0})}
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
        
        <View style={styles.filtersFooter}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderPartnershipModal = () => (
    <Modal
      visible={selectedPartnership !== null}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setSelectedPartnership(null)}
    >
      {selectedPartnership && (
        <View style={styles.partnershipModal}>
          <View style={styles.partnershipHeader}>
            <Text style={styles.partnershipTitle}>{selectedPartnership.title}</Text>
            <TouchableOpacity onPress={() => setSelectedPartnership(null)}>
              <Ionicons name="close" size={24} color={colors.darkGray} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.partnershipContent}>
            <Text style={styles.partnershipDescription}>{selectedPartnership.description}</Text>
            
            <View style={styles.partnershipDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="business" size={16} color={colors.primary} />
                <Text style={styles.detailText}>{selectedPartnership.industry}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Ionicons name="star" size={16} color={colors.warning} />
                <Text style={styles.detailText}>{selectedPartnership.rating}/5 rating</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Ionicons name="location" size={16} color={colors.primary} />
                <Text style={styles.detailText}>{Math.round(selectedPartnership.distance)}km away</Text>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contract Details:</Text>
              <View style={styles.detailRow}>
                <Ionicons name="document-text" size={16} color={colors.primary} />
                <Text style={styles.detailText}>{selectedPartnership.partnershipType}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time" size={16} color={colors.primary} />
                <Text style={styles.detailText}>Duration: {selectedPartnership.contractDuration}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="cash" size={16} color={colors.success} />
                <Text style={styles.detailText}>Rate: {selectedPartnership.currentRate}</Text>
              </View>
            </View>
            
            {selectedPartnership.trucksNeeded && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trucks Needed:</Text>
                <View style={styles.trucksInfo}>
                  <View style={styles.truckTypesContainer}>
                    <Text style={styles.truckTypesLabel}>Types:</Text>
                    <View style={styles.tagsContainer}>
                      {selectedPartnership.trucksNeeded.types.map((truck, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{truck}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>Quantity:</Text>
                    <Text style={styles.quantityValue}>{selectedPartnership.trucksNeeded.quantity}</Text>
                  </View>
                </View>
                {selectedPartnership.trucksNeeded.specialRequirements.length > 0 && (
                  <View style={styles.specialRequirementsContainer}>
                    <Text style={styles.specialRequirementsLabel}>Special Requirements:</Text>
                    <View style={styles.specialRequirementsList}>
                      {selectedPartnership.trucksNeeded.specialRequirements.map((req, index) => (
                        <Text key={index} style={styles.specialRequirementItem}>• {req}</Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Operating Countries Needed:</Text>
              <View style={styles.tagsContainer}>
                {selectedPartnership.operatingCountries.map((country, index) => (
                  <View key={index} style={[styles.tag, styles.countryTag]}>
                    <Text style={[styles.tagText, styles.countryTagText]}>{country}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information:</Text>
              <View style={styles.detailRow}>
                <Ionicons name="person" size={16} color={colors.primary} />
                <Text style={styles.detailText}>{selectedPartnership.contactPerson}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="call" size={16} color={colors.primary} />
                <Text style={styles.detailText}>{selectedPartnership.phone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="mail" size={16} color={colors.primary} />
                <Text style={styles.detailText}>{selectedPartnership.email}</Text>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.partnershipFooter}>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => handleConnect(selectedPartnership)}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={getCurrentLocation}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Default region for Denmark/Scandinavia
  const defaultRegion = {
    latitude: 55.6761,
    longitude: 12.5683,
    latitudeDelta: 3.0,
    longitudeDelta: 3.0,
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={defaultRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {displayPartnerships.map((partnership) => (
          <Marker
            key={partnership.id}
            coordinate={partnership.coordinate}
            pinColor={getMarkerColor(partnership.type, partnership.status)}
            onPress={() => handleMarkerPress(partnership)}
          >
            {renderPartnershipCallout(partnership)}
          </Marker>
        ))}
      </MapView>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.mediumGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search partnerships..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      
      {/* Debug info */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>
          Partnerships: {displayPartnerships.length} | Total: {partnerships.length} | Filtered: {filteredPartnerships.length} | Location: {location ? 'Found' : 'Loading...'}
        </Text>
      </View>
      
      {renderFiltersModal()}
      {renderPartnershipModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    marginRight: spacing[2],
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing[2],
    ...textStyles.body,
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: spacing[3],
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  callout: {
    width: 200,
    padding: spacing[2],
  },
  calloutContent: {
    alignItems: 'center',
  },
  calloutTitle: {
    ...textStyles.h4,
    marginBottom: spacing[1],
  },
  calloutDescription: {
    ...textStyles.caption,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  calloutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spacing[2],
  },
  calloutDetail: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  calloutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.sm,
  },
  calloutButtonText: {
    ...textStyles.caption,
    color: colors.white,
    fontWeight: typography.weights.medium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  errorText: {
    ...textStyles.h3,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.md,
  },
  retryButtonText: {
    ...textStyles.button,
    color: colors.white,
  },
  filtersContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  filtersTitle: {
    ...textStyles.h3,
  },
  filtersContent: {
    flex: 1,
    padding: spacing[4],
  },
  filterSection: {
    marginBottom: spacing[4],
  },
  filterLabel: {
    ...textStyles.label,
    marginBottom: spacing[2],
  },
  filterInput: {
    ...components.input,
  },
  filtersFooter: {
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
  partnershipModal: {
    flex: 1,
    backgroundColor: colors.white,
  },
  partnershipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  partnershipTitle: {
    ...textStyles.h3,
  },
  partnershipContent: {
    flex: 1,
    padding: spacing[4],
  },
  partnershipDescription: {
    ...textStyles.body,
    marginBottom: spacing[4],
  },
  partnershipDetails: {
    marginBottom: spacing[4],
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  detailText: {
    ...textStyles.body,
    marginLeft: spacing[2],
  },
  section: {
    marginBottom: spacing[4],
  },
  sectionTitle: {
    ...textStyles.h4,
    marginBottom: spacing[2],
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    marginRight: spacing[2],
    marginBottom: spacing[1],
  },
  tagText: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  countryTag: {
    backgroundColor: colors.successLight,
  },
  countryTagText: {
    color: colors.success,
  },
  partnershipFooter: {
    padding: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  connectButton: {
    ...components.button.primary,
  },
  connectButtonText: {
    ...textStyles.button,
    color: colors.white,
  },
  debugContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: spacing[2],
    borderRadius: borderRadius.sm,
  },
  debugText: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
  },
  trucksInfo: {
    marginBottom: spacing[2],
  },
  truckTypesContainer: {
    marginBottom: spacing[2],
  },
  truckTypesLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  quantityLabel: {
    ...textStyles.label,
    marginRight: spacing[2],
  },
  quantityValue: {
    ...textStyles.body,
    fontWeight: typography.weights.medium,
    color: colors.primary,
  },
  specialRequirementsContainer: {
    marginTop: spacing[2],
  },
  specialRequirementsLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  specialRequirementsList: {
    marginLeft: spacing[2],
  },
  specialRequirementItem: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[1],
  },
});

export default MapScreen;
