import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from './designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: spacing[4],
    paddingTop: spacing[16],
  },
  title: {
    ...textStyles.h1,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  subtitle: {
    ...textStyles.body,
    color: colors.mediumGray,
    textAlign: 'center',
    marginBottom: spacing[8],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing[5],
  },
  primaryButton: {
    ...components.button.primary,
    minWidth: 120,
  },
  secondaryButton: {
    ...components.button.secondary,
    minWidth: 120,
  },
  editButton: {
    ...components.button.primary,
    backgroundColor: colors.warning,
    minWidth: 120,
  },
  saveButton: {
    ...components.button.primary,
    backgroundColor: colors.success,
    minWidth: 120,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  },
  list: {
    flex: 1,
    marginVertical: spacing[5],
  },
  taskItem: {
    ...components.card,
    marginVertical: spacing[1],
  },
  taskTitle: {
    ...textStyles.h3,
    marginBottom: spacing[1],
  },
  taskStatus: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing[1],
  },
  taskPriority: {
    ...textStyles.caption,
  },
  profileContainer: {
    ...components.card,
    marginVertical: spacing[5],
  },
  profileField: {
    marginBottom: spacing[4],
  },
  fieldLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  fieldValue: {
    ...textStyles.body,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.sm,
  },
  input: {
    ...components.input,
  },
});
