import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles, components } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  listContainer: {
    padding: spacing[4],
  },
  offerCard: {
    ...components.card,
    marginBottom: spacing[4],
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  forwarderInfo: {
    flex: 1,
  },
  forwarderName: {
    ...textStyles.h4,
    marginBottom: spacing[1],
  },
  offerRate: {
    ...textStyles.body,
    color: colors.primary,
    fontWeight: typography.weights.bold,
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
  message: {
    ...textStyles.caption,
    color: colors.mediumGray,
    marginBottom: spacing[3],
  },
  offerDetails: {
    marginBottom: spacing[3],
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  detailText: {
    ...textStyles.caption,
    marginLeft: spacing[2],
    color: colors.mediumGray,
  },
  offerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
    paddingTop: spacing[3],
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing[3],
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginHorizontal: spacing[1],
  },
  rejectButton: {
    backgroundColor: colors.errorLight,
  },
  acceptButton: {
    backgroundColor: colors.success,
  },
  rejectButtonText: {
    ...textStyles.label,
    color: colors.error,
  },
  acceptButtonText: {
    ...textStyles.label,
    color: colors.white,
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
});

