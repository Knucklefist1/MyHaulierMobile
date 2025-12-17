import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../designSystem';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    marginRight: spacing[2],
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing[2],
    ...textStyles.body,
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: spacing[3],
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  callout: {
    width: 200,
    padding: spacing[2],
  },
  calloutContent: {
    alignItems: 'center',
  },
  calloutTitle: {
    ...textStyles.h4,
    marginBottom: spacing[1],
  },
  calloutDescription: {
    ...textStyles.caption,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  calloutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spacing[2],
  },
  calloutDetail: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  calloutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.sm,
  },
  calloutButtonText: {
    ...textStyles.caption,
    color: colors.white,
    fontWeight: typography.weights.medium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  errorText: {
    ...textStyles.h3,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.md,
  },
  retryButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
  filtersContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  filtersTitle: {
    ...textStyles.h3,
  },
  filtersContent: {
    flex: 1,
    padding: spacing[4],
  },
  filterSection: {
    marginBottom: spacing[4],
  },
  filterLabel: {
    ...textStyles.label,
    marginBottom: spacing[2],
  },
  filterInput: {
    ...components.input,
  },
  filtersFooter: {
    padding: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  applyButton: {
    ...components.button.primary,
  },
  applyButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
  partnershipModal: {
    flex: 1,
    backgroundColor: colors.white,
  },
  partnershipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  partnershipTitle: {
    ...textStyles.h3,
  },
  partnershipContent: {
    flex: 1,
    padding: spacing[4],
  },
  partnershipDescription: {
    ...textStyles.body,
    marginBottom: spacing[4],
  },
  partnershipDetails: {
    marginBottom: spacing[4],
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
  section: {
    marginBottom: spacing[4],
  },
  sectionTitle: {
    ...textStyles.h4,
    marginBottom: spacing[2],
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    marginRight: spacing[2],
    marginBottom: spacing[1],
  },
  tagText: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  countryTag: {
    backgroundColor: colors.successLight,
  },
  countryTagText: {
    color: colors.success,
  },
  partnershipFooter: {
    padding: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  connectButton: {
    ...components.button.primary,
  },
  connectButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
  debugContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: spacing[2],
    borderRadius: borderRadius.sm,
  },
  debugText: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
  },
  trucksInfo: {
    marginBottom: spacing[2],
  },
  truckTypesContainer: {
    marginBottom: spacing[2],
  },
  truckTypesLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  quantityLabel: {
    ...textStyles.label,
    marginRight: spacing[2],
  },
  quantityValue: {
    ...textStyles.body,
    fontWeight: typography.weights.medium,
    color: colors.primary,
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
    color: colors.mediumGray,
    marginBottom: spacing[1],
  },
  actionButton: {
    ...components.button.primary,
    marginTop: spacing[3],
  },
  actionButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
});

