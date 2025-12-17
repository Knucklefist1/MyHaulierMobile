import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing, borderRadius, textStyles, components } from '../designSystem';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
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
  headerTitle: {
    ...textStyles.h3,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  avatarText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...textStyles.h3,
    marginBottom: spacing[1],
  },
  profileCompany: {
    ...textStyles.caption,
    marginBottom: spacing[2],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...textStyles.label,
    marginLeft: spacing[1],
  },
  ratingCount: {
    ...textStyles.caption,
    marginLeft: spacing[1],
  },
  tabContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  tab: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...textStyles.label,
    color: colors.mediumGray,
  },
  activeTabText: {
    color: colors.primary,
  },
  tabContent: {
    padding: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...textStyles.h3,
    marginBottom: spacing[3],
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  infoLabel: {
    ...textStyles.label,
    flex: 1,
  },
  infoValue: {
    ...textStyles.body,
    flex: 1,
    textAlign: 'right',
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  performanceItem: {
    width: (width - spacing[8] * 2) / 2,
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.lg,
    marginBottom: spacing[2],
  },
  performanceValue: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  performanceLabel: {
    ...textStyles.caption,
    textAlign: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.xl,
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  countryTag: {
    backgroundColor: colors.successLight,
  },
  capabilityTag: {
    backgroundColor: colors.warningLight,
  },
  certificationTag: {
    backgroundColor: colors.errorLight,
  },
  tagText: {
    ...textStyles.caption,
    color: colors.darkGray,
    textTransform: 'capitalize',
  },
  routeList: {
    marginTop: spacing[2],
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  routeText: {
    ...textStyles.body,
    marginLeft: spacing[2],
  },
  footer: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  contactButton: {
    ...components.button.primary,
    paddingVertical: spacing[4],
  },
  contactButtonText: {
    ...textStyles.label,
    color: colors.white,
  },
});

