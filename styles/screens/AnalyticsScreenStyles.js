import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles, shadows } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  loadingText: {
    fontSize: typography.sizes.base,
    color: colors.mediumGray,
  },
  header: {
    backgroundColor: colors.white,
    padding: spacing[5],
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
  },
  statsGrid: {
    padding: spacing[4],
    gap: spacing[3],
  },
  statCard: {
    backgroundColor: colors.white,
    padding: spacing[5],
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    ...shadows.md,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  statTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginLeft: spacing[2],
  },
  statValue: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    marginBottom: spacing[1],
  },
  statSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.mediumGray,
  },
  insightsSection: {
    backgroundColor: colors.white,
    margin: spacing[4],
    padding: spacing[5],
    borderRadius: borderRadius.md,
    ...shadows.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[4],
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[4],
    paddingBottom: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  insightText: {
    fontSize: typography.sizes.sm,
    color: colors.darkGray,
    lineHeight: 20,
    marginLeft: spacing[3],
    flex: 1,
  },
});

