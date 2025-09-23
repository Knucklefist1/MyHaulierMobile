import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [job.id]);

  const fetchApplications = async () => {
    try {
      const applicationsRef = collection(db, 'applications');
      const q = query(
        applicationsRef,
        where('jobId', '==', job.id)
      );
      
      const querySnapshot = await getDocs(q);
      const applicationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(applicationsData);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleJobStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const jobRef = doc(db, 'jobs', job.id);
      await updateDoc(jobRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      Alert.alert('Success', `Job status updated to ${newStatus}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update job status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#27ae60';
      case 'completed': return '#3498db';
      case 'cancelled': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const renderApplicationItem = ({ item }) => (
    <View style={styles.applicationCard}>
      <View style={styles.applicationHeader}>
        <Text style={styles.haulierName}>{item.haulierName || 'Haulier'}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <Text style={styles.coverLetter} numberOfLines={2}>
        {item.coverLetter}
      </Text>
      
      <Text style={styles.appliedDate}>
        Applied {item.createdAt?.toDate ? 
          new Date(item.createdAt.toDate()).toLocaleDateString() : 
          'Recently'
        }
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(job.status) }]}>
            {job.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        {job.requirements?.map((requirement, index) => (
          <View key={index} style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={16} color="#27ae60" />
            <Text style={styles.requirementText}>{requirement}</Text>
          </View>
        ))}
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailCard}>
          <Ionicons name="location" size={24} color="#3498db" />
          <Text style={styles.detailLabel}>Location</Text>
          <Text style={styles.detailValue}>{job.location}</Text>
        </View>

        <View style={styles.detailCard}>
          <Ionicons name="cash" size={24} color="#27ae60" />
          <Text style={styles.detailLabel}>Budget</Text>
          <Text style={styles.detailValue}>${job.budget}</Text>
        </View>

        <View style={styles.detailCard}>
          <Ionicons name="calendar" size={24} color="#e74c3c" />
          <Text style={styles.detailLabel}>Delivery Date</Text>
          <Text style={styles.detailValue}>{job.deliveryDate}</Text>
        </View>

        <View style={styles.detailCard}>
          <Ionicons name="time" size={24} color="#f39c12" />
          <Text style={styles.detailLabel}>Duration</Text>
          <Text style={styles.detailValue}>{job.duration}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Applications ({applications.length})
        </Text>
        
        {applications.length > 0 ? (
          <View style={styles.applicationsList}>
            {applications.map((application) => (
              <View key={application.id} style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <Text style={styles.haulierName}>{application.haulierName || 'Haulier'}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(application.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(application.status) }]}>
                      {application.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.coverLetter} numberOfLines={2}>
                  {application.coverLetter}
                </Text>
                
                <Text style={styles.appliedDate}>
                  Applied {application.createdAt?.toDate ? 
                    new Date(application.createdAt.toDate()).toLocaleDateString() : 
                    'Recently'
                  }
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyApplications}>
            <Ionicons name="document-outline" size={48} color="#bdc3c7" />
            <Text style={styles.emptyText}>No applications yet</Text>
            <Text style={styles.emptySubtext}>
              Applications from hauliers will appear here
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actionSection}>
        <Text style={styles.sectionTitle}>Job Actions</Text>
        
        {job.status === 'active' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.completeButton]}
              onPress={() => handleJobStatusChange('completed')}
              disabled={loading}
            >
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text style={styles.actionButtonText}>Mark as Completed</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleJobStatusChange('cancelled')}
              disabled={loading}
            >
              <Ionicons name="close-circle" size={20} color="white" />
              <Text style={styles.actionButtonText}>Cancel Job</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {job.status === 'completed' && (
          <View style={styles.completedInfo}>
            <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
            <Text style={styles.completedText}>This job has been completed</Text>
          </View>
        )}
        
        {job.status === 'cancelled' && (
          <View style={styles.cancelledInfo}>
            <Ionicons name="close-circle" size={24} color="#e74c3c" />
            <Text style={styles.cancelledText}>This job has been cancelled</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 8,
    flex: 1,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  detailCard: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  applicationsList: {
    marginTop: 12,
  },
  applicationCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  haulierName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  coverLetter: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 8,
  },
  appliedDate: {
    fontSize: 12,
    color: '#95a5a6',
  },
  emptyApplications: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  actionSection: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  completeButton: {
    backgroundColor: '#27ae60',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  completedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
  },
  completedText: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cancelledInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdeaea',
    padding: 16,
    borderRadius: 8,
  },
  cancelledText: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default JobDetailsScreen;
