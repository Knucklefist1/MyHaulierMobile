import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: spacing[5],
  },
  loader: {
    marginVertical: spacing[5],
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.mediumGray,
    fontWeight: typography.weights.medium,
  },
});

