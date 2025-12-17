import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  listContainer: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing[3],
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.error,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  chatTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    flex: 1,
  },
  timestamp: {
    fontSize: typography.sizes.xs,
    color: colors.mediumGray,
  },
  lastMessage: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
  },
  unreadMessage: {
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
  },
  unreadCount: {
    backgroundColor: colors.error,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing[2],
  },
  unreadCountText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[16],
  },
  emptyTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  emptySubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing[10],
  },
});

