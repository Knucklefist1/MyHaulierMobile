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
import { useAuth } from '../../contexts/FallbackAuthContext';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/ForwarderApplicationsScreenStyles';
import { EmptyState } from '../../components/common';

const ApplicationsScreen = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const mockApplications = [];
    setApplications(mockApplications);
    setLoading(false);
  }, [currentUser?.uid]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleApplicationAction = async (applicationId, action) => {
    Alert.alert(
      'Success',
      `Application ${action === 'accepted' ? 'accepted' : 'rejected'} successfully`
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return colors.success;
      case 'rejected': return colors.error;
      case 'pending': return colors.warning;
      default: return colors.mediumGray;
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
    <View style={styles.applicationCard}>
      <View style={styles.applicationHeader}>
        <View style={styles.haulierInfo}>
          <Text style={styles.haulierName}>{item.haulierName || 'Haulier'}</Text>
          <Text style={styles.jobTitle}>{item.jobTitle || 'Job Application'}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '33' }]}>
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
          Applied {item.createdAt?.toDate ? 
            new Date(item.createdAt.toDate()).toLocaleDateString() : 
            'Recently'
          }
        </Text>
        
        {item.status === 'pending' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleApplicationAction(item.id, 'rejected')}
            >
              <Ionicons name="close" size={16} color={colors.error} />
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.acceptButton]}
              onPress={() => handleApplicationAction(item.id, 'accepted')}
            >
              <Ionicons name="checkmark" size={16} color={colors.success} />
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {item.status === 'accepted' && (
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => navigation.navigate('ChatConversation', { 
              chatId: item.chatId,
              otherParticipant: item.haulierId,
              chatTitle: `Chat with ${item.haulierName || 'Haulier'}`
            })}
          >
            <Ionicons name="chatbubble" size={16} color={colors.primary} />
            <Text style={styles.chatButtonText}>Start Chat</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <EmptyState
      icon="document-outline"
      title="No Applications Yet"
      subtitle="Applications from hauliers will appear here when they apply to your jobs"
      iconSize={64}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Applications</Text>
        <TouchableOpacity 
          style={styles.findButton}
          onPress={() => navigation.navigate('Find')}
        >
          <Ionicons name="search" size={20} color={colors.white} />
          <Text style={styles.findButtonText}>Find Hauliers</Text>
        </TouchableOpacity>
      </View>
      
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

export default ApplicationsScreen;
