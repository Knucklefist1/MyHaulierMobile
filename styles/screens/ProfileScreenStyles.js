import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[5],
    marginBottom: spacing[2],
  },
  avatarContainer: {
    marginBottom: spacing[4],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  role: {
    fontSize: typography.sizes.base,
    color: colors.mediumGray,
    marginBottom: spacing[2],
  },
  email: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
  },
  section: {
    backgroundColor: colors.white,
    marginBottom: spacing[2],
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[5],
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[4],
  },
  field: {
    marginBottom: spacing[4],
  },
  fieldLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[2],
  },
  fieldValue: {
    fontSize: typography.sizes.base,
    color: colors.darkGray,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.md,
  },
  input: {
    fontSize: typography.sizes.base,
    color: colors.darkGray,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: borderRadius.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  settingText: {
    fontSize: typography.sizes.base,
    color: colors.darkGray,
    marginLeft: spacing[4],
    flex: 1,
  },
  buttonContainer: {
    padding: spacing[5],
  },
  button: {
    paddingVertical: spacing[4],
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  editButton: {
    backgroundColor: colors.skyBlue,
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  cancelButton: {
    backgroundColor: colors.mediumGray,
  },
  logoutButton: {
    backgroundColor: colors.error,
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
});

