// NEW FEATURE: Search Screen - Added for Assignment 2
// This screen provides advanced search functionality using mobile capabilities
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { OfflineStorage } from '../../utils/storage';

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
      <Ionicons name="time" size={16} color="#7f8c8d" />
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
          <Ionicons name="search" size={20} color="#7f8c8d" />
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
              color={isSearching ? "#bdc3c7" : "#3498db"} 
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
        <View style={styles.emptyState}>
          <Ionicons name="search" size={48} color="#bdc3c7" />
          <Text style={styles.emptyText}>No results found</Text>
          <Text style={styles.emptySubtext}>Try adjusting your search terms or filters</Text>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#2c3e50',
  },
  searchButton: {
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterLabel: {
    width: 120,
    fontSize: 14,
    color: '#7f8c8d',
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#2c3e50',
  },
  clearFiltersButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },
  clearFiltersText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  resultLocation: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  resultDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  resultTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultTag: {
    backgroundColor: '#3498db',
    color: '#ffffff',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  recentSearchesContainer: {
    flex: 1,
    padding: 16,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  recentList: {
    flex: 1,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 4,
  },
  recentText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2c3e50',
  },
  noRecentText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default SearchScreen;
