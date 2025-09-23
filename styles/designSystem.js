// MyHaulier Design System
// Matching the website design system

export const colors = {
  // Primary Colors
  primary: '#1E3A8A',        // Deep blue
  primaryHover: '#1E40AF',   // Darker blue
  skyBlue: '#3B82F6',        // Bright blue
  
  // Status Colors
  success: '#10B981',        // Green
  warning: '#F59E0B',        // Orange
  error: '#EF4444',          // Red
  
  // Neutral Colors
  darkGray: '#1F2937',       // Primary text
  mediumGray: '#6B7280',     // Secondary text
  lightGray: '#F3F4F6',     // Background
  borderGray: '#E5E7EB',    // Borders
  white: '#FFFFFF',
  
  // Light variants
  successLight: '#ECFDF5',
  warningLight: '#FEF3C7',
  errorLight: '#FEF2F2',
  primaryLight: '#EFF6FF'
};

export const typography = {
  fontFamily: 'Inter',
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
};

export const spacing = {
  1: 4,    // 4px
  2: 8,    // 8px
  3: 12,   // 12px
  4: 16,   // 16px
  5: 20,   // 20px
  6: 24,   // 24px
  8: 32,   // 32px
  10: 40,  // 40px
  12: 48,  // 48px
  16: 64,  // 64px
  20: 80   // 80px
};

export const borderRadius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  }
};

// Component Styles
export const components = {
  // Card styles
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.md,
  },
  
  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[6],
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44, // Touch-friendly
    },
    secondary: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.borderGray,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[6],
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    },
    ghost: {
      backgroundColor: 'transparent',
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[6],
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    }
  },
  
  // Input styles
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    fontSize: typography.sizes.base,
    color: colors.darkGray,
    minHeight: 44,
  },
  
  // Tab bar styles
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
    paddingTop: spacing[2],
    paddingBottom: spacing[4],
    height: 60,
  },
  
  // Header styles
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderTopColor: colors.borderGray,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  }
};

// Text styles
export const textStyles = {
  h1: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    lineHeight: 40,
  },
  h2: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    color: colors.darkGray,
    lineHeight: 32,
  },
  h3: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.darkGray,
    lineHeight: 28,
  },
  body: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.normal,
    color: colors.darkGray,
    lineHeight: 24,
  },
  caption: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.normal,
    color: colors.mediumGray,
    lineHeight: 20,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.darkGray,
    lineHeight: 20,
  }
};

// Layout styles
export const layout = {
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
};

// Role-specific colors
export const roleColors = {
  haulier: {
    primary: colors.primary,
    light: colors.primaryLight,
    accent: colors.skyBlue,
  },
  forwarder: {
    primary: colors.error,
    light: colors.errorLight,
    accent: '#F87171',
  }
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  textStyles,
  layout,
  roleColors
};