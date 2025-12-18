import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/MapScreenStyles';
import { PartnershipCallout, FiltersModal, PartnershipModal } from '../../components/map';

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

  const mockPartnerships = [
    {
      id: '1',
      title: 'TechCorp Denmark',
      description: 'Electronics transport partnership - seeking reliable hauliers',
      coordinate: { latitude: 55.6761, longitude: 12.5683 },
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
      coordinate: { latitude: 55.4038, longitude: 10.4024 },
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
      coordinate: { latitude: 56.1572, longitude: 10.2107 },
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
      coordinate: { latitude: 55.6050, longitude: 13.0038 },
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
      coordinate: { latitude: 55.6761, longitude: 12.5683 },
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
    const R = 6371;
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
  
  const displayPartnerships = filteredPartnerships.length > 0 ? filteredPartnerships : partnerships;

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

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
            <PartnershipCallout
              partnership={partnership}
              onPress={handleMarkerPress}
            />
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
      
      <FiltersModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <PartnershipModal
        partnership={selectedPartnership}
        visible={selectedPartnership !== null}
        onClose={() => setSelectedPartnership(null)}
        onConnect={handleConnect}
      />
    </View>
  );
};

export default MapScreen;
