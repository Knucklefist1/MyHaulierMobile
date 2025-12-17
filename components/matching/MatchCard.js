import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, textStyles, components } from '../../styles/designSystem';
import { Button } from '../common';

const MatchCard = ({ match, onViewProfile, onMakeOffer, onContact }) => {
  const { haulier, matchScore, matchReasons } = match;

  return (
    <View style={styles.matchCard}>
      <View style={styles.matchHeader}>
        <View style={styles.haulierInfo}>
          <Text style={styles.haulierName}>{haulier.name}</Text>
          <Text style={styles.companyName}>{haulier.company}</Text>
        </View>
        <View style={styles.matchScore}>
          <Text style={styles.scoreText}>{Math.round(matchScore.totalScore * 100)}%</Text>
          <Text style={styles.scoreLabel}>Match</Text>
        </View>
      </View>

      <View style={styles.matchDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="star" size={16} color={colors.warning} />
          <Text style={styles.detailText}>
            {haulier.performance.rating}/5 rating
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="car" size={16} color={colors.primary} />
          <Text style={styles.detailText}>
            {haulier.fleet.availableTrucks} trucks available
            {haulier.availability.isAvailable ? ' (Available)' : ' (Not Available)'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color={colors.success} />
          <Text style={styles.detailText}>
            {haulier.operatingRegions.countries.join(', ')}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color={colors.primary} />
          <Text style={styles.detailText}>
            {haulier.pricing.baseRate} DKK/km
            {haulier.pricing.fuelSurcharge > 0 && ` + ${(haulier.pricing.fuelSurcharge * 100)}% fuel surcharge`}
          </Text>
        </View>

        {haulier.pricing.tollIncluded && (
          <View style={styles.detailRow}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.detailText}>Tolls included</Text>
          </View>
        )}
      </View>

      <View style={styles.rateSection}>
        <Text style={styles.rateTitle}>Rate Information</Text>
        <View style={styles.rateDetails}>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Base Rate:</Text>
            <Text style={styles.rateValue}>{haulier.pricing.baseRate} DKK/km</Text>
          </View>
          {haulier.pricing.fuelSurcharge > 0 && (
            <View style={styles.rateRow}>
              <Text style={styles.rateLabel}>Fuel Surcharge:</Text>
              <Text style={styles.rateValue}>+{(haulier.pricing.fuelSurcharge * 100)}%</Text>
            </View>
          )}
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Tolls:</Text>
            <Text style={styles.rateValue}>{haulier.pricing.tollIncluded ? 'Included' : 'Not included'}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Currency:</Text>
            <Text style={styles.rateValue}>{haulier.pricing.currency}</Text>
          </View>
        </View>
      </View>

      <View style={styles.matchReasons}>
        <Text style={styles.reasonsTitle}>Why this match:</Text>
        {matchReasons.map((reason, index) => (
          <Text key={index} style={styles.reasonText}>• {reason}</Text>
        ))}
      </View>

      <View style={styles.matchActions}>
        <Button
          title="View Profile"
          onPress={() => onViewProfile(haulier)}
          variant="secondary"
          style={styles.actionButton}
        />
        <Button
          title="Make Offer"
          onPress={() => onMakeOffer(haulier)}
          variant="secondary"
          style={[styles.actionButton, styles.offerButton]}
        />
        <Button
          title="Contact"
          onPress={() => onContact(haulier)}
          variant="primary"
          style={styles.actionButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  matchCard: {
    ...components.card,
    marginBottom: spacing[4],
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  haulierInfo: {
    flex: 1,
  },
  haulierName: {
    ...textStyles.h3,
    marginBottom: spacing[1],
  },
  companyName: {
    ...textStyles.body,
    color: colors.mediumGray,
  },
  matchScore: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
  },
  scoreText: {
    ...textStyles.h2,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  scoreLabel: {
    ...textStyles.caption,
    color: colors.primary,
  },
  matchDetails: {
    marginBottom: spacing[3],
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  detailText: {
    ...textStyles.body,
    marginLeft: spacing[2],
  },
  rateSection: {
    marginBottom: spacing[3],
    padding: spacing[3],
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.md,
  },
  rateTitle: {
    ...textStyles.label,
    marginBottom: spacing[2],
  },
  rateDetails: {
    marginLeft: spacing[2],
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[1],
  },
  rateLabel: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  rateValue: {
    ...textStyles.caption,
    fontWeight: typography.weights.medium,
  },
  matchReasons: {
    marginBottom: spacing[3],
  },
  reasonsTitle: {
    ...textStyles.label,
    marginBottom: spacing[2],
  },
  reasonText: {
    ...textStyles.caption,
    marginBottom: spacing[1],
    marginLeft: spacing[2],
  },
  matchActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing[2],
  },
  actionButton: {
    flex: 1,
  },
  offerButton: {
    backgroundColor: colors.warning,
  },
});

export default MatchCard;

