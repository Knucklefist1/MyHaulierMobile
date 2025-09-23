import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

const ApplicationsScreen = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Mock applications data for development
    const mockApplications = [
      {
        id: '1',
        jobTitle: 'Transport Electronics from Copenhagen to Aarhus',
        companyName: 'TechCorp Denmark',
        coverLetter: 'I have 5 years of experience in handling fragile electronics and have proper insurance coverage.',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
      },
      {
        id: '2',
        jobTitle: 'Furniture Delivery - Odense to Aalborg',
        companyName: 'Nordic Furniture',
        coverLetter: 'I specialize in furniture transport with a large van and proper equipment.',
        status: 'accepted',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setApplications(mockApplications);
      setLoading(false);
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return '#27ae60';
      case 'rejected': return '#e74c3c';
      case 'pending': return '#f39c12';
      default: return '#7f8c8d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return 'checkmark-circle';
      case 'rejected': return 'close-circle';
      case 'pending': return 'time';
      default: return 'help-circle';
    }
  };

  const renderApplicationItem = ({ item }) => (
    <TouchableOpacity style={styles.applicationCard}>
      <View style={styles.applicationHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.jobTitle || 'Job Application'}</Text>
          <Text style={styles.companyName}>{item.companyName || 'Company'}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Ionicons 
            name={getStatusIcon(item.status)} 
            size={16} 
            color={getStatusColor(item.status)} 
          />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.coverLetter} numberOfLines={3}>
        {item.coverLetter}
      </Text>

      <View style={styles.applicationFooter}>
        <Text style={styles.appliedDate}>
          Applied {item.createdAt ? 
            new Date(item.createdAt).toLocaleDateString() : 
            'Recently'
          }
        </Text>
        {item.status === 'accepted' && (
          <TouchableOpacity style={styles.chatButton}>
            <Ionicons name="chatbubble" size={16} color="#3498db" />
            <Text style={styles.chatButtonText}>Start Chat</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="document-outline" size={64} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>No Applications Yet</Text>
      <Text style={styles.emptySubtitle}>
        Apply to jobs to see your applications here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={applications}
        renderItem={renderApplicationItem}
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
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  applicationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  coverLetter: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 12,
  },
  applicationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  appliedDate: {
    fontSize: 12,
    color: '#95a5a6',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chatButtonText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
  },
});

export default ApplicationsScreen;
