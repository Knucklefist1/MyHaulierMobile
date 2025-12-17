import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Callout } from 'react-native-maps';
import { colors } from '../../styles/designSystem';
import { styles } from '../../styles/screens/MapScreenStyles';

const PartnershipCallout = ({ partnership, onPress }) => {
  return (
    <Callout style={styles.callout}>
      <View style={styles.calloutContent}>
        <Text style={styles.calloutTitle}>{partnership.title}</Text>
        <Text style={styles.calloutDescription}>{partnership.description}</Text>
        <View style={styles.calloutDetails}>
          <Text style={styles.calloutDetail}>
            <Ionicons name="star" size={12} color={colors.warning} /> {partnership.rating}/5
          </Text>
          <Text style={styles.calloutDetail}>
            <Ionicons name="location" size={12} color={colors.primary} /> {Math.round(partnership.distance)}km
          </Text>
        </View>
        <TouchableOpacity
          style={styles.calloutButton}
          onPress={() => onPress(partnership)}
        >
          <Text style={styles.calloutButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </Callout>
  );
};

export default PartnershipCallout;

