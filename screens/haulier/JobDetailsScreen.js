import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const { currentUser } = useAuth();
  const [application, setApplication] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkExistingApplication();
  }, []);

  const checkExistingApplication = async () => {
    // Mock check - simulate no existing application
    setApplication(null);
  };

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      Alert.alert('Error', 'Please write a cover letter');
      return;
    }

    setLoading(true);
    try {
      // Mock application submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Application Submitted',
        'Your application has been submitted successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return '#27ae60';
      case 'rejected': return '#e74c3c';
      case 'pending': return '#f39c12';
      default: return '#7f8c8d';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <View style={styles.companyInfo}>
          <Ionicons name="business" size={16} color="#7f8c8d" />
          <Text style={styles.companyName}>{job.companyName}</Text>
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

      {application ? (
        <View style={styles.applicationStatus}>
          <Text style={styles.statusTitle}>Application Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(application.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(application.status) }]}>
              {application.status.toUpperCase()}
            </Text>
          </View>
          {application.coverLetter && (
            <View style={styles.coverLetterSection}>
              <Text style={styles.coverLetterLabel}>Your Cover Letter:</Text>
              <Text style={styles.coverLetterText}>{application.coverLetter}</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.applySection}>
          <Text style={styles.sectionTitle}>Apply for this Job</Text>
          <TextInput
            style={styles.coverLetterInput}
            placeholder="Write your cover letter here..."
            value={coverLetter}
            onChangeText={setCoverLetter}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={[styles.applyButton, loading && styles.disabledButton]}
            onPress={handleApply}
            disabled={loading}
          >
            <Text style={styles.applyButtonText}>
              {loading ? 'Applying...' : 'Submit Application'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyName: {
    fontSize: 16,
    color: '#7f8c8d',
    marginLeft: 8,
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
  applicationStatus: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  coverLetterSection: {
    marginTop: 12,
  },
  coverLetterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  coverLetterText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  applySection: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 8,
  },
  coverLetterInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
    backgroundColor: '#f8f9fa',
    marginBottom: 16,
    minHeight: 100,
  },
  applyButton: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetailsScreen;
