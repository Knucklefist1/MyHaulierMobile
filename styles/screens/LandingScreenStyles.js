import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing[20],
    paddingBottom: spacing[10],
    backgroundColor: colors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...shadows.sm,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[2],
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.mediumGray,
    fontWeight: typography.weights.medium,
  },
  content: {
    flex: 1,
    padding: spacing[5],
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: spacing[2.5],
  },
  description: {
    fontSize: typography.sizes.base,
    color: colors.mediumGray,
    textAlign: 'center',
    marginBottom: spacing[10],
    lineHeight: 22,
  },
  roleContainer: {
    gap: spacing[5],
  },
  roleCard: {
    backgroundColor: colors.white,
    padding: spacing[6.25],
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3.75],
  },
  iconText: {
    fontSize: 36,
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
    lineHeight: 20,
  },
  footer: {
    padding: spacing[5],
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    textAlign: 'center',
  },
});

