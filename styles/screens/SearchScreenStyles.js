import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles, components } from '../designSystem';

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
  searchContainer: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing[2],
    fontSize: typography.sizes.base,
    color: colors.darkGray,
  },
  searchButton: {
    padding: spacing[2],
  },
  filtersContainer: {
    backgroundColor: colors.white,
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  filtersTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.darkGray,
    marginBottom: spacing[3],
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  filterLabel: {
    width: 120,
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
  },
  filterInput: {
    flex: 1,
    ...components.input,
  },
  clearFiltersButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    backgroundColor: colors.error,
    borderRadius: borderRadius.md,
  },
  clearFiltersText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  resultsContainer: {
    flex: 1,
    padding: spacing[4],
  },
  resultsTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.darkGray,
    marginBottom: spacing[3],
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    marginBottom: spacing[2],
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  resultName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.darkGray,
    flex: 1,
  },
  resultLocation: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
  },
  resultDescription: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    marginBottom: spacing[2],
  },
  resultTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultTag: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: typography.sizes.xs,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: 12,
    marginRight: spacing[1],
    marginBottom: spacing[1],
  },
  recentSearchesContainer: {
    flex: 1,
    padding: spacing[4],
  },
  recentTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.darkGray,
    marginBottom: spacing[3],
  },
  recentList: {
    flex: 1,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing[1],
  },
  recentText: {
    marginLeft: spacing[2],
    fontSize: typography.sizes.sm,
    color: colors.darkGray,
  },
  noRecentText: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    textAlign: 'center',
    marginTop: spacing[5],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[10],
  },
  emptyText: {
    fontSize: typography.sizes.lg,
    color: colors.mediumGray,
    marginTop: spacing[3],
  },
  emptySubtext: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    marginTop: spacing[1],
    textAlign: 'center',
  },
});

