import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';

const STORAGE_KEY = 'partnerships';

const ManagePartnershipsScreen = ({ navigation }) => {
  const { currentUser, userProfile } = useAuth();
  const [partnerships, setPartnerships] = useState({});

  const load = useCallback(async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    setPartnerships(raw ? JSON.parse(raw) : {});
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation, load]);

  const save = async (obj) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    setPartnerships(obj);
    Alert.alert('Saved', 'Partnerships updated');
  };

  const handleAddPartnership = async () => {
    if (!currentUser) {
      Alert.alert('Not signed in', 'Please sign in to add partnerships.');
      return;
    }
    const id = `ps_${Date.now()}`;
    const company = userProfile?.userType === 'forwarder' ? 'Sample Haulier Co.' : 'Sample Forwarder Co.';
    const next = {
      ...partnerships,
      [id]: {
        id,
        forwarderId: currentUser.uid,
        forwarderName: userProfile?.name || 'Forwarder',
        haulierId: 'demo-haulier',
        haulierName: 'John Smith',
        haulierCompany: company,
        status: 'active',
        contractDuration: '12 months',
        trucksNeeded: { quantity: 1 },
        currentRate: 2.5,
        currency: 'EUR',
        operatingCountries: ['Denmark'],
        createdAt: new Date().toISOString()
      }
    };
    await save(next);
  };

  const handleAdjust = async () => {
    if (!currentUser) {
      Alert.alert('Not signed in', 'Please sign in to adjust partnerships.');
      return;
    }
    const list = Object.values(partnerships).filter(p => p.forwarderId === currentUser.uid && p.status === 'active');
    if (list.length === 0) {
      Alert.alert('No active partnerships', 'Add one first.');
      return;
    }
    const target = list[0];
    const updated = {
      ...partnerships,
      [target.id || Object.keys(partnerships).find(k => partnerships[k] === target)]: {
        ...target,
        trucksNeeded: { quantity: (target?.trucksNeeded?.quantity || 0) + 1 },
        currentRate: Number(((target.currentRate || 2.5) + 0.1).toFixed(2))
      }
    };
    await save(updated);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Manage Partnerships</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#2ecc71' }]} onPress={handleAddPartnership}>
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.btnText}>Add Partnership</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#3498db' }]} onPress={handleAdjust}>
          <Ionicons name="construct" size={20} color="#fff" />
          <Text style={styles.btnText}>Adjust Trucks/Rate</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Current (local) partnerships</Text>
      {Object.values(partnerships).length === 0 ? (
        <Text style={styles.empty}>No partnerships stored yet.</Text>
      ) : (
        Object.values(partnerships).map((p) => (
          <View key={p.id || p.createdAt} style={styles.card}>
            <Text style={styles.cardTitle}>{p.haulierCompany || p.haulierName}</Text>
            <Text style={styles.cardLine}>Status: {p.status}</Text>
            <Text style={styles.cardLine}>Agreed trucks: {p?.trucksNeeded?.quantity || 0}</Text>
            <Text style={styles.cardLine}>Rate: {p.currentRate}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10
  },
  btnText: {
    color: '#fff',
    fontWeight: '600'
  },
  section: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8
  },
  empty: {
    color: '#7f8c8d',
    marginBottom: 12
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 6
  },
  cardLine: {
    color: '#34495e',
    marginBottom: 2
  }
});

export default ManagePartnershipsScreen;


