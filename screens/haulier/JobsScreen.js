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

const JobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Mock data for development
    const mockJobs = [
      {
        id: '1',
        title: 'Transport Electronics from Copenhagen to Aarhus',
        description: 'Urgent delivery of electronic components. Must be handled with care.',
        location: 'Copenhagen to Aarhus',
        budget: 1200,
        deliveryDate: '2024-01-15',
        companyName: 'TechCorp Denmark',
        status: 'active',
        createdAt: new Date().toISOString(),
        requirements: ['Valid driver license', 'Experience with fragile goods', 'Insurance coverage']
      },
      {
        id: '2',
        title: 'Furniture Delivery - Odense to Aalborg',
        description: 'Large furniture items need to be transported safely.',
        location: 'Odense to Aalborg',
        budget: 800,
        deliveryDate: '2024-01-18',
        companyName: 'Nordic Furniture',
        status: 'active',
        createdAt: new Date().toISOString(),
        requirements: ['Large vehicle', 'Furniture handling experience']
      },
      {
        id: '3',
        title: 'Food Products Transport - Esbjerg to Herning',
        description: 'Temperature-controlled transport of food products.',
        location: 'Esbjerg to Herning',
        budget: 600,
        deliveryDate: '2024-01-20',
        companyName: 'Fresh Foods A/S',
        status: 'active',
        createdAt: new Date().toISOString(),
        requirements: ['Refrigerated vehicle', 'Food safety certificate']
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // The real-time listener will automatically update the data
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    >
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <View style={styles.jobStatus}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.jobDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#7f8c8d" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color="#7f8c8d" />
          <Text style={styles.detailText}>${item.budget}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#7f8c8d" />
          <Text style={styles.detailText}>{item.deliveryDate}</Text>
        </View>
      </View>
      
      <View style={styles.jobFooter}>
        <Text style={styles.companyName}>{item.companyName}</Text>
        <Text style={styles.postedDate}>
          Posted {item.createdAt ? 
            new Date(item.createdAt).toLocaleDateString() : 
            'Recently'
          }
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="briefcase-outline" size={64} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>No Jobs Available</Text>
      <Text style={styles.emptySubtitle}>
        Check back later for new transport opportunities
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
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
    flexGrow: 1,
  },
  jobCard: {
    ...components.card,
    marginBottom: spacing[3],
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  jobTitle: {
    ...textStyles.h3,
    flex: 1,
    marginRight: spacing[2],
  },
  jobStatus: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.xl,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    color: colors.success,
    fontWeight: typography.weights.semibold,
  },
  jobDescription: {
    ...textStyles.caption,
    marginBottom: spacing[3],
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing[3],
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing[4],
    marginBottom: spacing[1],
  },
  detailText: {
    ...textStyles.caption,
    marginLeft: spacing[1],
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing[2],
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  companyName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.darkGray,
  },
  postedDate: {
    ...textStyles.caption,
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

export default JobsScreen;
