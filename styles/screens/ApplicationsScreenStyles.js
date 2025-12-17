import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles, components } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  headerTitle: {
    ...textStyles.h2,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  headerSubtitle: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  listContainer: {
    padding: spacing[4],
  },
  connectionCard: {
    ...components.card,
    marginBottom: spacing[4],
  },
  connectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  forwarderName: {
    ...textStyles.h3,
    flex: 1,
    marginRight: spacing[2],
  },
  statusBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
  },
  statusText: {
    ...textStyles.caption,
    color: colors.white,
    textTransform: 'capitalize',
  },
  pending: {
    backgroundColor: colors.warning,
  },
  accepted: {
    backgroundColor: colors.success,
  },
  rejected: {
    backgroundColor: colors.error,
  },
  forwarderCompany: {
    ...textStyles.body,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  industry: {
    ...textStyles.caption,
    color: colors.primary,
    marginBottom: spacing[2],
  },
  message: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[2],
  },
  date: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[3],
  },
  benefitsContainer: {
    marginBottom: spacing[3],
  },
  benefitsTitle: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  benefitsList: {
    marginLeft: spacing[2],
  },
  benefitItem: {
    ...textStyles.caption,
    color: colors.success,
    marginBottom: spacing[1],
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
    paddingTop: spacing[3],
  },
  actionButton: {
    ...components.button.secondary,
    flex: 1,
    marginHorizontal: spacing[1],
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    ...textStyles.label,
    color: colors.darkGray,
  },
  primaryButtonText: {
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  loadingText: {
    ...textStyles.h3,
    color: colors.mediumGray,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[16],
  },
  emptyTitle: {
    ...textStyles.h2,
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  emptySubtitle: {
    ...textStyles.caption,
    textAlign: 'center',
  },
  countriesContainer: {
    marginTop: spacing[3],
  },
  countriesLabel: {
    ...textStyles.label,
    marginBottom: spacing[2],
  },
  countriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  countryTag: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    marginRight: spacing[2],
    marginBottom: spacing[1],
  },
  countryText: {
    ...textStyles.caption,
    color: colors.success,
    fontWeight: typography.weights.medium,
  },
  rateContainer: {
    marginTop: spacing[3],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: spacing[3],
    borderRadius: borderRadius.md,
  },
  rateLabel: {
    ...textStyles.label,
    color: colors.darkGray,
  },
  rateValue: {
    ...textStyles.h4,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
});

