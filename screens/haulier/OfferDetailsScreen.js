import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';

const OfferDetailsScreen = ({ navigation, route }) => {
  const { offer } = route.params;
  const [loading, setLoading] = useState(false);

  const handleAcceptOffer = () => {
    Alert.alert(
      'Accept Partnership Offer',
      `Accept partnership offer from ${offer.forwarderName}?\n\nRate: ${offer.ratePerKm} ${offer.currency}/km\nContract Duration: ${offer.contractDuration} months\nPayment Terms: ${offer.paymentTerms.replace('_', ' ').toUpperCase()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: () => {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
              setLoading(false);
              Alert.alert(
                'Partnership Accepted!',
                'You have successfully accepted the partnership offer. You can now start working with this forwarder.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                  }
                ]
              );
            }, 1500);
          }
        }
      ]
    );
  };

  const handleRejectOffer = () => {
    Alert.alert(
      'Reject Partnership Offer',
      `Reject partnership offer from ${offer.forwarderName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          onPress: () => {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
              setLoading(false);
              Alert.alert(
                'Offer Rejected',
                'The partnership offer has been rejected.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                  }
                ]
              );
            }, 1000);
          }
        }
      ]
    );
  };

  const handleContactForwarder = () => {
    Alert.alert(
      'Contact Forwarder',
      `Would you like to contact ${offer.forwarderName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Message',
          onPress: () => {
            navigation.getParent()?.navigate('Chat', {
              screen: 'ChatConversation',
              params: {
                chatId: `chat_${offer.forwarderId}`,
                otherParticipant: offer.forwarderId,
                chatTitle: `Chat with ${offer.forwarderName}`
              }
            });
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'accepted': return colors.success;
      case 'rejected': return colors.error;
      case 'expired': return colors.mediumGray;
      default: return colors.mediumGray;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Your Response';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partnership Offer</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.offerHeader}>
          <Text style={styles.forwarderName}>{offer.forwarderName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(offer.status) }]}>
            <Text style={styles.statusText}>{getStatusText(offer.status)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rate Information</Text>
          <View style={styles.rateGrid}>
            <View style={styles.rateItem}>
              <Text style={styles.rateLabel}>Rate per KM</Text>
              <Text style={styles.rateValue}>{offer.ratePerKm} {offer.currency}</Text>
            </View>
            <View style={styles.rateItem}>
              <Text style={styles.rateLabel}>Fuel Surcharge</Text>
              <Text style={styles.rateValue}>{offer.fuelSurcharge}%</Text>
            </View>
            <View style={styles.rateItem}>
              <Text style={styles.rateLabel}>Minimum Charge</Text>
              <Text style={styles.rateValue}>{offer.minimumCharge} {offer.currency}</Text>
            </View>
            <View style={styles.rateItem}>
              <Text style={styles.rateLabel}>Tolls</Text>
              <Text style={styles.rateValue}>{offer.tollIncluded ? 'Included' : 'Not included'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contract Terms</Text>
          <View style={styles.termsList}>
            <View style={styles.termRow}>
              <Ionicons name="time" size={20} color={colors.primary} />
              <View style={styles.termContent}>
                <Text style={styles.termLabel}>Contract Duration</Text>
                <Text style={styles.termValue}>{offer.contractDuration} months</Text>
              </View>
            </View>
            <View style={styles.termRow}>
              <Ionicons name="card" size={20} color={colors.primary} />
              <View style={styles.termContent}>
                <Text style={styles.termLabel}>Payment Terms</Text>
                <Text style={styles.termValue}>{offer.paymentTerms.replace('_', ' ').toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.termRow}>
              <Ionicons name="calendar" size={20} color={colors.primary} />
              <View style={styles.termContent}>
                <Text style={styles.termLabel}>Offer Expires</Text>
                <Text style={styles.termValue}>{new Date(offer.expiresAt).toLocaleDateString()}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Message from Forwarder</Text>
          <Text style={styles.messageText}>{offer.message}</Text>
        </View>

        {offer.specialConditions && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Conditions</Text>
            <Text style={styles.messageText}>{offer.specialConditions}</Text>
          </View>
        )}

        {offer.status === 'pending' && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[components.button.secondary, styles.actionButton]}
              onPress={handleContactForwarder}
            >
              <Text style={components.button.secondaryText}>Contact Forwarder</Text>
            </TouchableOpacity>
            
            <View style={styles.decisionActions}>
              <TouchableOpacity
                style={[components.button.error, styles.decisionButton]}
                onPress={handleRejectOffer}
                disabled={loading}
              >
                <Text style={components.button.errorText}>
                  {loading ? 'Processing...' : 'Reject Offer'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[components.button.primary, styles.decisionButton]}
                onPress={handleAcceptOffer}
                disabled={loading}
              >
                <Text style={components.button.primaryText}>
                  {loading ? 'Processing...' : 'Accept Offer'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {offer.status === 'accepted' && (
          <View style={styles.actions}>
            <View style={styles.successMessage}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.successText}>Partnership Accepted!</Text>
            </View>
            <TouchableOpacity
              style={[components.button.primary, styles.actionButton]}
              onPress={handleContactForwarder}
            >
              <Text style={components.button.primaryText}>Contact Forwarder</Text>
            </TouchableOpacity>
          </View>
        )}

        {offer.status === 'rejected' && (
          <View style={styles.actions}>
            <View style={styles.rejectedMessage}>
              <Ionicons name="close-circle" size={24} color={colors.error} />
              <Text style={styles.rejectedText}>Partnership Rejected</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  backButton: {
    padding: spacing[1],
  },
  headerTitle: {
    ...textStyles.h3,
    color: colors.textBlack,
  },
  placeholder: {
    width: 24,
  },
  content: {
    padding: spacing[4],
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[4],
  },
  forwarderName: {
    ...textStyles.h2,
    flex: 1,
    marginRight: spacing[2],
  },
  statusBadge: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.lg,
  },
  statusText: {
    ...textStyles.caption,
    color: colors.white,
    fontWeight: typography.weights.bold,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    marginBottom: spacing[4],
    ...shadows.sm,
  },
  sectionTitle: {
    ...textStyles.h4,
    marginBottom: spacing[3],
    color: colors.textBlack,
  },
  rateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  rateItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.primaryLight,
    padding: spacing[3],
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  rateLabel: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[1],
  },
  rateValue: {
    ...textStyles.h4,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  termsList: {
    gap: spacing[3],
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termContent: {
    flex: 1,
    marginLeft: spacing[3],
  },
  termLabel: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[1],
  },
  termValue: {
    ...textStyles.body,
    color: colors.darkGray,
    fontWeight: typography.weights.bold,
  },
  messageText: {
    ...textStyles.body,
    color: colors.darkGray,
    lineHeight: 24,
  },
  actions: {
    marginTop: spacing[4],
  },
  actionButton: {
    marginBottom: spacing[3],
  },
  decisionActions: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  decisionButton: {
    flex: 1,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing[4],
    borderRadius: borderRadius.md,
    marginBottom: spacing[3],
  },
  successText: {
    ...textStyles.body,
    color: colors.success,
    fontWeight: typography.weights.bold,
    marginLeft: spacing[2],
  },
  rejectedMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorLight,
    padding: spacing[4],
    borderRadius: borderRadius.md,
  },
  rejectedText: {
    ...textStyles.body,
    color: colors.error,
    fontWeight: typography.weights.bold,
    marginLeft: spacing[2],
  },
});

export default OfferDetailsScreen;
