import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

const AnalyticsScreen = () => {
  const [analytics, setAnalytics] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    totalApplications: 0,
    acceptedApplications: 0
  });
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Get jobs analytics
      const jobsQuery = query(
        collection(db, 'jobs'),
        where('forwarderId', '==', currentUser.uid)
      );
      const jobsSnapshot = await getDocs(jobsQuery);
      
      const jobsData = jobsSnapshot.docs.map(doc => doc.data());
      const totalJobs = jobsData.length;
      const activeJobs = jobsData.filter(job => job.status === 'active').length;
      const completedJobs = jobsData.filter(job => job.status === 'completed').length;

      // Get applications analytics
      const applicationsQuery = query(
        collection(db, 'applications'),
        where('forwarderId', '==', currentUser.uid)
      );
      const applicationsSnapshot = await getDocs(applicationsQuery);
      
      const applicationsData = applicationsSnapshot.docs.map(doc => doc.data());
      const totalApplications = applicationsData.length;
      const acceptedApplications = applicationsData.filter(app => app.status === 'accepted').length;

      setAnalytics({
        totalJobs,
        activeJobs,
        completedJobs,
        totalApplications,
        acceptedApplications
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading analytics...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Dashboard</Text>
        <Text style={styles.subtitle}>Track your business performance</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Total Jobs"
          value={analytics.totalJobs}
          icon="briefcase"
          color="#3498db"
          subtitle="All time"
        />
        
        <StatCard
          title="Active Jobs"
          value={analytics.activeJobs}
          icon="play-circle"
          color="#27ae60"
          subtitle="Currently posted"
        />
        
        <StatCard
          title="Completed Jobs"
          value={analytics.completedJobs}
          icon="checkmark-circle"
          color="#f39c12"
          subtitle="Successfully delivered"
        />
        
        <StatCard
          title="Total Applications"
          value={analytics.totalApplications}
          icon="document-text"
          color="#9b59b6"
          subtitle="All applications received"
        />
        
        <StatCard
          title="Accepted Applications"
          value={analytics.acceptedApplications}
          icon="thumbs-up"
          color="#e74c3c"
          subtitle="Applications you accepted"
        />
      </View>

      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>Key Insights</Text>
        
        <View style={styles.insightCard}>
          <Ionicons name="trending-up" size={20} color="#27ae60" />
          <Text style={styles.insightText}>
            {analytics.totalJobs > 0 ? 
              `You've posted ${analytics.totalJobs} jobs with a ${Math.round((analytics.acceptedApplications / analytics.totalApplications) * 100) || 0}% acceptance rate` :
              'Start posting jobs to see your performance metrics'
            }
          </Text>
        </View>

        <View style={styles.insightCard}>
          <Ionicons name="time" size={20} color="#f39c12" />
          <Text style={styles.insightText}>
            {analytics.activeJobs > 0 ? 
              `You have ${analytics.activeJobs} active jobs waiting for applications` :
              'No active jobs. Consider posting new opportunities'
            }
          </Text>
        </View>

        <View style={styles.insightCard}>
          <Ionicons name="people" size={20} color="#3498db" />
          <Text style={styles.insightText}>
            {analytics.totalApplications > 0 ? 
              `You've received ${analytics.totalApplications} applications from hauliers` :
              'No applications yet. Make sure your job descriptions are detailed'
            }
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  statsGrid: {
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  insightsSection: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  insightText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
  },
});

export default AnalyticsScreen;
