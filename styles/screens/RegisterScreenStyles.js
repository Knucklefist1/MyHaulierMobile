import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, textStyles } from '../designSystem';

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
  registerButton: {
    backgroundColor: colors.success,
    paddingVertical: spacing[3.5],
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing[2],
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
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
  loginButton: {
    paddingVertical: spacing[3.5],
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
});

