import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles, components } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.white,
    marginBottom: spacing[2],
    padding: spacing[4],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  sectionTitle: {
    ...textStyles.h3,
    marginBottom: spacing[3],
  },
  sectionSubtitle: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  inputGroup: {
    marginBottom: spacing[4],
  },
  inputLabel: {
    ...textStyles.label,
    marginBottom: spacing[2],
  },
  numberInput: {
    ...components.input,
  },
  textArea: {
    ...components.input,
    height: 100,
    textAlignVertical: 'top',
  },
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  selectorText: {
    ...textStyles.body,
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonActive: {
    backgroundColor: colors.primary,
  },
  dayButtonText: {
    ...textStyles.label,
    color: colors.mediumGray,
  },
  dayButtonTextActive: {
    color: colors.white,
  },
  footer: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  saveButton: {
    ...components.button.primary,
    paddingVertical: spacing[4],
  },
  saveButtonText: {
    ...textStyles.label,
    color: colors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  modalTitle: {
    ...textStyles.h3,
  },
  modalCancel: {
    ...textStyles.label,
    color: colors.primary,
  },
  modalDone: {
    ...textStyles.label,
    color: colors.primary,
  },
  modalContent: {
    flex: 1,
    padding: spacing[4],
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  optionText: {
    ...textStyles.body,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  switchLabel: {
    ...textStyles.body,
    flex: 1,
  },
});

