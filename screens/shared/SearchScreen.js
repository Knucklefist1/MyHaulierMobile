// NEW FEATURE: Search Screen - Added for Assignment 2
// This screen provides advanced search functionality using mobile capabilities
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { OfflineStorage } from '../../utils/storage';
import { styles } from '../../styles/screens/SearchScreenStyles';
import { colors } from '../../styles/designSystem';
import { EmptyState } from '../../components/common';

const SearchScreen = ({ navigation }) => {
  const { userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    industry: '',
    partnershipType: '',
    companySize: ''
  });

  // NEW FEATURE: Load recent searches from AsyncStorage
  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const savedSearches = await OfflineStorage.getChats(); // Reusing storage key
      if (savedSearches && Array.isArray(savedSearches)) {
        setRecentSearches(savedSearches.slice(0, 5)); // Keep only last 5 searches
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  // NEW FEATURE: Save search to AsyncStorage
  const saveSearch = async (query) => {
    try {
      const newSearch = {
        id: Date.now().toString(),
        query,
        timestamp: new Date().toISOString()
      };
      
      const updatedSearches = [newSearch, ...recentSearches].slice(0, 10);
      await OfflineStorage.saveChats(updatedSearches);
      setRecentSearches(updatedSearches.slice(0, 5));
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  // NEW FEATURE: Advanced search with filters
  const performSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Search Required', 'Please enter a search term');
      return;
    }

    setIsSearching(true);
    
    try {
      // Save search to recent searches
      await saveSearch(searchQuery);
      
      // Load all forwarders from AsyncStorage
      const allForwarders = await OfflineStorage.getJobs();
      
      // Apply search filters
      const filteredResults = allForwarders.filter(forwarder => {
        const matchesQuery = forwarder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           forwarder.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           forwarder.industry.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesLocation = !searchFilters.location || 
                               forwarder.location.toLowerCase().includes(searchFilters.location.toLowerCase());
        
        const matchesIndustry = !searchFilters.industry || 
                               forwarder.industry.toLowerCase().includes(searchFilters.industry.toLowerCase());
        
        const matchesPartnershipType = !searchFilters.partnershipType || 
                                      forwarder.partnershipType.toLowerCase().includes(searchFilters.partnershipType.toLowerCase());
        
        const matchesCompanySize = !searchFilters.companySize || 
                                 forwarder.companySize.toLowerCase().includes(searchFilters.companySize.toLowerCase());
        
        return matchesQuery && matchesLocation && matchesIndustry && 
               matchesPartnershipType && matchesCompanySize;
      });
      
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error performing search:', error);
      Alert.alert('Search Error', 'Failed to perform search');
    } finally {
      setIsSearching(false);
    }
  };

  // NEW FEATURE: Clear search filters
  const clearFilters = () => {
    setSearchFilters({
      location: '',
      industry: '',
      partnershipType: '',
      companySize: ''
    });
  };

  // NEW FEATURE: Use recent search
  const useRecentSearch = (query) => {
    setSearchQuery(query);
    performSearch();
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        Alert.alert(
          'Forwarder Details',
          `${item.name}\n\n${item.description}\n\nLocation: ${item.location}\nIndustry: ${item.industry}`,
          [
            { text: 'Close', style: 'cancel' },
            { text: 'Connect', onPress: () => {
              Alert.alert('Success', `Connection request sent to ${item.name}`);
            }}
          ]
        );
      }}
    >
      <View style={styles.resultHeader}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultLocation}>{item.location}</Text>
      </View>
      <Text style={styles.resultDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.resultTags}>
        <Text style={styles.resultTag}>{item.industry}</Text>
        <Text style={styles.resultTag}>{item.partnershipType}</Text>
        <Text style={styles.resultTag}>{item.companySize}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity
      style={styles.recentItem}
      onPress={() => useRecentSearch(item.query)}
    >
      <Ionicons name="time" size={16} color={colors.mediumGray} />
      <Text style={styles.recentText}>{item.query}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Partners</Text>
        <Text style={styles.subtitle}>Find the perfect business partners</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.mediumGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search companies, industries, locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={performSearch}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={performSearch}
            disabled={isSearching}
          >
            <Ionicons 
              name={isSearching ? "hourglass" : "search"} 
              size={20} 
              color={isSearching ? colors.mediumGray : colors.primary} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Filters</Text>
        
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Location:</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="e.g., Copenhagen"
            value={searchFilters.location}
            onChangeText={(text) => setSearchFilters({...searchFilters, location: text})}
          />
        </View>
        
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Industry:</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="e.g., Electronics"
            value={searchFilters.industry}
            onChangeText={(text) => setSearchFilters({...searchFilters, industry: text})}
          />
        </View>
        
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Partnership Type:</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="e.g., Regular Routes"
            value={searchFilters.partnershipType}
            onChangeText={(text) => setSearchFilters({...searchFilters, partnershipType: text})}
          />
        </View>
        
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Company Size:</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="e.g., Large"
            value={searchFilters.companySize}
            onChangeText={(text) => setSearchFilters({...searchFilters, companySize: text})}
          />
        </View>
        
        <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
          <Text style={styles.clearFiltersText}>Clear All Filters</Text>
        </TouchableOpacity>
      </ScrollView>

      {searchResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
          </Text>
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={item => item.id}
            style={styles.resultsList}
          />
        </View>
      ) : searchQuery ? (
        <EmptyState
          icon="search"
          title="No results found"
          subtitle="Try adjusting your search terms or filters"
          iconSize={48}
        />
      ) : (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.recentTitle}>Recent Searches</Text>
          {recentSearches.length > 0 ? (
            <FlatList
              data={recentSearches}
              renderItem={renderRecentSearch}
              keyExtractor={item => item.id}
              style={styles.recentList}
            />
          ) : (
            <Text style={styles.noRecentText}>No recent searches</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
