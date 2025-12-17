import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  backButton: {
    padding: spacing[1],
  },
  headerTitle: {
    ...textStyles.h3,
    color: colors.darkGray,
  },
  placeholder: {
    width: 24,
  },
  haulierInfo: {
    backgroundColor: colors.white,
    padding: spacing[4],
    marginBottom: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  haulierName: {
    ...textStyles.h3,
    marginBottom: spacing[1],
  },
  companyName: {
    ...textStyles.body,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  haulierRate: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  form: {
    padding: spacing[4],
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    marginBottom: spacing[4],
    ...shadows.sm,
  },
  sectionTitle: {
    ...textStyles.h4,
    marginBottom: spacing[4],
    color: colors.darkGray,
  },
  inputGroup: {
    marginBottom: spacing[4],
  },
  label: {
    ...textStyles.label,
    marginBottom: spacing[2],
    color: colors.darkGray,
  },
  input: {
    ...components.input,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  currencyInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
    paddingHorizontal: spacing[3],
  },
  rateInput: {
    flex: 1,
    height: 50,
    ...textStyles.body,
    color: colors.darkGray,
  },
  currencyLabel: {
    ...textStyles.body,
    color: colors.mediumGray,
    marginLeft: spacing[2],
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  toggleLabel: {
    ...textStyles.body,
    color: colors.darkGray,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.borderGray,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  pickerOption: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.white,
  },
  pickerOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pickerOptionText: {
    ...textStyles.caption,
    color: colors.darkGray,
  },
  pickerOptionTextSelected: {
    color: colors.white,
  },
  submitButton: {
    ...components.button.primary,
    marginTop: spacing[4],
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
    opacity: 0.7,
  },
  submitButtonText: {
    ...textStyles.buttonText,
  },
});

