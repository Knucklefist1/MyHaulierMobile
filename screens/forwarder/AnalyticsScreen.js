// Analytics-skærm for forwarders - Viser statistikker og indsigt i forretningsperformance
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { styles } from '../../styles/screens/AnalyticsScreenStyles';

const AnalyticsScreen = ({ navigation }) => {
  const [analytics, setAnalytics] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    totalApplications: 0,
    acceptedApplications: 0
  });
  const [companyStats, setCompanyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      fetchAnalytics();
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      if (currentUser && currentUser.uid) fetchAnalytics();
    });
    return unsubscribe;
  }, [navigation, currentUser]);

  // Henter analytics-data fra AsyncStorage og beregner statistikker
  const fetchAnalytics = async () => {
    try {
      // Henter alle partnerskaber fra lokal lagring
      const raw = await AsyncStorage.getItem('partnerships');
      const partnershipsObj = raw ? JSON.parse(raw) : {};
      const partnerships = Object.values(partnershipsObj || {});

      // Filtrerer kun aktive partnerskaber for denne forwarder
      const activePartnerships = partnerships.filter(p => p && p.status === 'active' && p.forwarderId === currentUser.uid);

      // Beregner metrics pr. virksomhed
      const companyIdToMetrics = {};
      for (const p of activePartnerships) {
        const companyName = p.haulierCompany || p.haulierName || 'Unknown Company';
        const key = companyName;
        if (!companyIdToMetrics[key]) {
          companyIdToMetrics[key] = {
            company: companyName,
            totalTrucksAgreed: 0,
            rates: [],
            contracts: 0,
            countries: new Set(),
          };
        }
        const bucket = companyIdToMetrics[key];
        const qty = typeof p?.trucksNeeded?.quantity === 'number' ? p.trucksNeeded.quantity : 0;
        bucket.totalTrucksAgreed += qty;
        if (typeof p?.currentRate === 'number') bucket.rates.push(p.currentRate);
        bucket.contracts += 1;
        if (Array.isArray(p?.operatingCountries)) {
          p.operatingCountries.forEach(c => bucket.countries.add(c));
        }
      }

      const companies = Object.values(companyIdToMetrics).map(item => ({
        company: item.company,
        totalTrucksAgreed: item.totalTrucksAgreed,
        averageRate: item.rates.length ? (item.rates.reduce((a, b) => a + b, 0) / item.rates.length) : 0,
        contracts: item.contracts,
        operatingCountries: Array.from(item.countries),
      }));

      
      const totalJobs = 0;
      const activeJobs = 0;
      const completedJobs = 0;
      const totalApplications = 0;
      const acceptedApplications = 0;

      setCompanyStats(companies);
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
      <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Text onPress={() => navigation.navigate('ManagePartnerships')} style={{ color: '#2980b9', fontWeight: '600' }}>Manage Partnerships</Text>
        </View>
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

      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>Company Overview</Text>
        {companyStats.length === 0 && (
          <Text style={styles.insightText}>No active contracts yet.</Text>
        )}
        {companyStats.map((c) => (
          <View key={c.company} style={styles.insightCard}>
            <Ionicons name="briefcase" size={20} color="#2c3e50" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#2c3e50' }}>{c.company}</Text>
              <Text style={styles.insightText}>Contracts: {c.contracts}</Text>
              <Text style={styles.insightText}>Agreed trucks: {c.totalTrucksAgreed}</Text>
              <Text style={styles.insightText}>Avg rate: {c.averageRate.toFixed(2)}</Text>
              {c.operatingCountries.length > 0 && (
                <Text style={styles.insightText}>Countries: {c.operatingCountries.join(', ')}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;
