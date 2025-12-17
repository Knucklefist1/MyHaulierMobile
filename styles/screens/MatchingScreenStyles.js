import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles, components } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  searchInput: {
    flex: 1,
    ...components.input,
    marginRight: spacing[3],
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
  },
  filterButtonText: {
    ...textStyles.caption,
    color: colors.primary,
    marginLeft: spacing[1],
  },
  listContainer: {
    padding: spacing[4],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[16],
  },
  emptyTitle: {
    ...textStyles.h2,
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  emptySubtitle: {
    ...textStyles.caption,
    textAlign: 'center',
  },
  // Modal styles
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
  modalCancel: {
    ...textStyles.label,
    color: colors.primary,
  },
  modalTitle: {
    ...textStyles.h3,
  },
  modalClear: {
    ...textStyles.label,
    color: colors.error,
  },
  modalContent: {
    flex: 1,
    padding: spacing[4],
  },
  filterSection: {
    marginBottom: spacing[6],
  },
  filterTitle: {
    ...textStyles.h4,
    marginBottom: spacing[3],
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    backgroundColor: colors.lightGray,
    marginRight: spacing[2],
    marginBottom: spacing[2],
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  selectedOption: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  optionText: {
    ...textStyles.caption,
    color: colors.darkGray,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing[2],
  },
  rangeLabel: {
    ...textStyles.caption,
    color: colors.mediumGray,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  radioButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  selectedRadio: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  radioText: {
    ...textStyles.caption,
    color: colors.darkGray,
  },
  selectedRadioText: {
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  modalFooter: {
    padding: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
    backgroundColor: colors.white,
  },
  applyButton: {
    ...components.button.primary,
  },
  applyButtonText: {
    ...textStyles.label,
    color: colors.white,
  },
});

