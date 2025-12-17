import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, textStyles } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: spacing[5],
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing[16],
    paddingBottom: spacing[10],
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing[5],
  },
  roleCard: {
    backgroundColor: colors.white,
    padding: spacing[6],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRoleCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  roleTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[2],
  },
  roleDescription: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    textAlign: 'center',
    marginBottom: spacing[4],
    lineHeight: 20,
  },
  roleFeatures: {
    alignSelf: 'stretch',
  },
  featureText: {
    fontSize: typography.sizes.xs,
    color: colors.mediumGray,
    marginBottom: spacing[1],
    textAlign: 'left',
  },
  footer: {
    padding: spacing[5],
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.sizes.xs,
    color: colors.mediumGray,
    textAlign: 'center',
  },
});

