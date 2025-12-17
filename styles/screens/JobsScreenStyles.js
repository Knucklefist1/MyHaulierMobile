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
  forwarderCard: {
    ...components.card,
    marginBottom: spacing[4],
  },
  forwarderHeader: {
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
  seeking_partners: {
    backgroundColor: colors.success,
  },
  industry: {
    ...textStyles.label,
    color: colors.primary,
    marginBottom: spacing[1],
  },
  forwarderLocation: {
    ...textStyles.body,
    color: colors.darkGray,
    marginBottom: spacing[2],
  },
  forwarderDescription: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[3],
  },
  forwarderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    ...textStyles.caption,
    marginLeft: spacing[1],
  },
  requirementsContainer: {
    marginBottom: spacing[3],
  },
  requirementsTitle: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  requirementsList: {
    marginLeft: spacing[2],
  },
  requirementItem: {
    ...textStyles.caption,
    marginBottom: spacing[1],
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
  connectButton: {
    ...components.button.primary,
    marginTop: spacing[2],
  },
  connectButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
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
  trucksNeededContainer: {
    marginBottom: spacing[3],
  },
  trucksInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  truckTypesContainer: {
    flex: 1,
    marginRight: spacing[3],
  },
  truckTypesLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  truckTypesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  truckTypeTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    marginRight: spacing[1],
    marginBottom: spacing[1],
  },
  truckTypeText: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  quantityContainer: {
    alignItems: 'flex-end',
  },
  quantityLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  quantityValue: {
    fontSize: typography.sizes.xl,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  specialRequirementsContainer: {
    marginTop: spacing[2],
  },
  specialRequirementsLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  specialRequirementsList: {
    marginLeft: spacing[2],
  },
  specialRequirementItem: {
    ...textStyles.caption,
    color: colors.warning,
    marginBottom: spacing[1],
  },
  operatingCountriesContainer: {
    marginBottom: spacing[3],
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
});

