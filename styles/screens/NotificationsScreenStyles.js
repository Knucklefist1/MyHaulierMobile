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
  filterContainer: {
    flexDirection: 'row',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  filterButton: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: 20,
    marginRight: spacing[2],
    backgroundColor: colors.lightGray,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    fontWeight: typography.weights.medium,
  },
  activeFilterButtonText: {
    color: colors.white,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    backgroundColor: colors.lightGray,
  },
  actionButtonText: {
    marginLeft: spacing[1],
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  listContainer: {
    padding: spacing[4],
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing[2],
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: colors.lightGray,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.darkGray,
    marginBottom: spacing[1],
  },
  unreadText: {
    fontWeight: typography.weights.bold,
  },
  notificationMessage: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    marginBottom: spacing[1],
  },
  timestamp: {
    fontSize: typography.sizes.xs,
    color: colors.mediumGray,
  },
  notificationRight: {
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginBottom: spacing[2],
  },
  deleteButton: {
    padding: spacing[1],
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing[10],
  },
  emptyText: {
    fontSize: typography.sizes.base,
    color: colors.mediumGray,
    marginTop: spacing[2],
  },
});

