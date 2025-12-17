import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles, components } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  headerTitle: {
    ...textStyles.h2,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  headerSubtitle: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  form: {
    padding: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...textStyles.h4,
    marginBottom: spacing[3],
  },
  input: {
    ...components.input,
    marginBottom: spacing[3],
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing[3],
  },
  optionButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    marginRight: spacing[2],
    marginBottom: spacing[2],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.white,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    ...textStyles.caption,
    color: colors.darkGray,
  },
  selectedOptionText: {
    color: colors.white,
  },
  submitButton: {
    ...components.button.primary,
    marginTop: spacing[4],
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
  },
  submitButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
});

