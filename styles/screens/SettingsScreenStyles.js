import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    padding: spacing[5],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.mediumGray,
  },
  section: {
    marginTop: spacing[5],
    backgroundColor: colors.white,
    marginHorizontal: spacing[4],
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.darkGray,
    padding: spacing[4],
    backgroundColor: colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: spacing[3],
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.darkGray,
    marginBottom: spacing[0.5],
  },
  settingSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
  },
});

