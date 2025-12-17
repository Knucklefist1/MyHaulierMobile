import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, textStyles } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  headerTitle: {
    ...textStyles.h2,
    color: colors.darkGray,
  },
  findButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.lg,
  },
  findButtonText: {
    color: colors.white,
    ...textStyles.label,
    marginLeft: spacing[1],
  },
  listContainer: {
    padding: spacing[4],
    flexGrow: 1,
  },
  applicationCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    marginBottom: spacing[3],
    ...shadows.md,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  haulierInfo: {
    flex: 1,
    marginRight: spacing[3],
  },
  haulierName: {
    ...textStyles.h3,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  jobTitle: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.xl,
  },
  statusText: {
    ...textStyles.caption,
    fontWeight: typography.weights.bold,
    marginLeft: spacing[1],
  },
  coverLetter: {
    ...textStyles.body,
    color: colors.darkGray,
    lineHeight: 20,
    marginBottom: spacing[3],
  },
  applicationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing[2],
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  appliedDate: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: borderRadius.xl,
  },
  acceptButton: {
    backgroundColor: colors.successLight,
  },
  rejectButton: {
    backgroundColor: colors.errorLight,
  },
  acceptButtonText: {
    ...textStyles.caption,
    color: colors.success,
    fontWeight: typography.weights.bold,
    marginLeft: spacing[1],
  },
  rejectButtonText: {
    ...textStyles.caption,
    color: colors.error,
    fontWeight: typography.weights.bold,
    marginLeft: spacing[1],
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: borderRadius.xl,
  },
  chatButtonText: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: typography.weights.bold,
    marginLeft: spacing[1],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[16],
  },
  emptyTitle: {
    ...textStyles.h2,
    color: colors.darkGray,
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  emptySubtitle: {
    ...textStyles.caption,
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing[10],
  },
});

