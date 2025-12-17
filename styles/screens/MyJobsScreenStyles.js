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
    marginBottom: spacing[3],
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing[2],
    flexWrap: 'wrap',
  },
  findButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
  },
  findButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.white,
    marginLeft: spacing[1],
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
  },
  postButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.white,
    marginLeft: spacing[1],
  },
  listContainer: {
    padding: spacing[4],
  },
  partnershipCard: {
    ...components.card,
    marginBottom: spacing[4],
  },
  partnershipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  haulierName: {
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
  active: {
    backgroundColor: colors.success,
  },
  pending: {
    backgroundColor: colors.warning,
  },
  inactive: {
    backgroundColor: colors.mediumGray,
  },
  haulierCompany: {
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
  partnershipDetails: {
    marginBottom: spacing[3],
  },
  detailsTitle: {
    ...textStyles.label,
    marginBottom: spacing[2],
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    marginBottom: spacing[2],
  },
  detailLabel: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  detailValue: {
    ...textStyles.caption,
    color: colors.darkGray,
    fontWeight: typography.weights.medium,
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
    marginBottom: spacing[4],
  },
  emptyStateButton: {
    ...components.button.primary,
    marginTop: spacing[2],
  },
  emptyStateButtonText: {
    ...textStyles.label,
    color: colors.white,
  },
  specialtiesContainer: {
    marginTop: spacing[3],
  },
  specialtiesLabel: {
    ...textStyles.label,
    marginBottom: spacing[2],
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    marginRight: spacing[2],
    marginBottom: spacing[1],
  },
  specialtyText: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: typography.weights.medium,
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
    fontSize: typography.sizes.xl,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
});

