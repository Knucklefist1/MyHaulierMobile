import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, textStyles } from '../designSystem';

export const styles = StyleSheet.create({
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
    color: colors.darkGray,
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
    color: colors.darkGray,
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
  buttonPrimaryText: {
    ...textStyles.label,
    color: colors.white,
  },
  buttonSecondaryText: {
    ...textStyles.label,
    color: colors.darkGray,
  },
  buttonErrorText: {
    ...textStyles.label,
    color: colors.white,
  },
  errorButton: {
    backgroundColor: colors.error,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
});

