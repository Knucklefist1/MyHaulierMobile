import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  headerTitle: {
    ...textStyles.h2,
    marginBottom: spacing[1],
  },
  headerSubtitle: {
    ...textStyles.caption,
  },
  stepIndicator: {
    flexDirection: 'row',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  activeStepCircle: {
    backgroundColor: colors.primary,
  },
  stepNumber: {
    ...textStyles.label,
    color: colors.mediumGray,
  },
  activeStepNumber: {
    color: colors.white,
  },
  stepTitle: {
    ...textStyles.caption,
    textAlign: 'center',
    color: colors.mediumGray,
  },
  activeStepTitle: {
    color: colors.primary,
  },
  content: {
    flex: 1,
    padding: spacing[4],
  },
  stepContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.md,
  },
  stepDescription: {
    ...textStyles.body,
    marginBottom: spacing[4],
    color: colors.mediumGray,
  },
  inputGroup: {
    marginBottom: spacing[4],
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    ...textStyles.label,
    marginBottom: spacing[1],
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.xl,
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  selectedTag: {
    backgroundColor: colors.primary,
  },
  tagText: {
    ...textStyles.caption,
    marginLeft: spacing[1],
    color: colors.darkGray,
  },
  selectedTagText: {
    color: colors.white,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  previousButton: {
    ...components.button.secondary,
    flex: 1,
    marginRight: spacing[2],
  },
  nextButton: {
    ...components.button.primary,
    flex: 1,
    marginLeft: spacing[2],
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
  },
  previousButtonText: {
    ...textStyles.label,
    color: colors.darkGray,
  },
  nextButtonText: {
    ...textStyles.label,
    color: colors.white,
  },
});

