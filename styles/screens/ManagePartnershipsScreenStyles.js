import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: spacing[4],
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[3],
  },
  actions: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.lg,
  },
  btnText: {
    color: colors.white,
    fontWeight: typography.weights.semibold,
  },
  section: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.darkGray,
    marginBottom: spacing[2],
  },
  empty: {
    color: colors.mediumGray,
    marginBottom: spacing[3],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing[3.5],
    marginBottom: spacing[3],
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[1.5],
  },
  cardLine: {
    color: colors.darkGray,
    marginBottom: spacing[0.5],
  },
});

