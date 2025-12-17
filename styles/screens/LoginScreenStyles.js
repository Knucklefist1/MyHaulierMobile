import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing[5],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing[10],
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
  form: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    ...shadows.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: borderRadius.md,
    marginBottom: spacing[4],
    paddingHorizontal: spacing[3],
    backgroundColor: colors.lightGray,
  },
  inputIcon: {
    marginRight: spacing[3],
  },
  input: {
    flex: 1,
    paddingVertical: spacing[3],
    fontSize: typography.sizes.base,
    color: colors.darkGray,
  },
  eyeIcon: {
    padding: spacing[1],
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing[3.5],
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing[2],
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
  googleButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing[3.5],
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing[2],
    borderWidth: 1,
    borderColor: colors.borderGray,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: spacing[2],
  },
  googleButtonText: {
    color: colors.darkGray,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[6],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderGray,
  },
  dividerText: {
    marginHorizontal: spacing[4],
    color: colors.mediumGray,
    fontSize: typography.sizes.sm,
  },
  registerButton: {
    paddingVertical: spacing[3.5],
    alignItems: 'center',
  },
  registerButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  demoCredentials: {
    marginTop: spacing[6],
    padding: spacing[4],
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  demoTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[3],
  },
  demoAccount: {
    marginBottom: spacing[2],
  },
  demoLabel: {
    fontSize: typography.sizes.xs,
    color: colors.mediumGray,
    marginBottom: spacing[0.5],
  },
  demoText: {
    fontSize: typography.sizes.sm,
    color: colors.darkGray,
    fontWeight: typography.weights.medium,
  },
  demoPassword: {
    fontSize: typography.sizes.xs,
    color: colors.mediumGray,
    marginTop: spacing[2],
    fontStyle: 'italic',
  },
});

