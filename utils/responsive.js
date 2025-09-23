import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 12 Pro)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Responsive scaling functions
export const scale = (size) => {
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
  const scaleFactor = Math.min(scaleWidth, scaleHeight);
  return Math.ceil(PixelRatio.roundToNearestPixel(size * scaleFactor));
};

export const verticalScale = (size) => {
  const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
  return Math.ceil(PixelRatio.roundToNearestPixel(size * scaleHeight));
};

export const horizontalScale = (size) => {
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  return Math.ceil(PixelRatio.roundToNearestPixel(size * scaleWidth));
};

// Font scaling
export const fontScale = (size) => {
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  return Math.ceil(PixelRatio.roundToNearestPixel(size * scaleWidth));
};

// Screen size categories
export const isSmallScreen = () => SCREEN_WIDTH < 375;
export const isMediumScreen = () => SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeScreen = () => SCREEN_WIDTH >= 414;
export const isTablet = () => SCREEN_WIDTH >= 768;

// Responsive padding/margin
export const getResponsivePadding = () => {
  if (isSmallScreen()) return scale(12);
  if (isMediumScreen()) return scale(16);
  if (isLargeScreen()) return scale(20);
  return scale(24);
};

// Responsive font sizes
export const getResponsiveFontSize = (baseSize) => {
  if (isSmallScreen()) return fontScale(baseSize * 0.9);
  if (isMediumScreen()) return fontScale(baseSize);
  if (isLargeScreen()) return fontScale(baseSize * 1.1);
  return fontScale(baseSize * 1.2);
};

// Responsive spacing
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  xxl: scale(24),
  xxxl: scale(32),
};

// Responsive font sizes
export const fontSize = {
  xs: fontScale(10),
  sm: fontScale(12),
  md: fontScale(14),
  lg: fontScale(16),
  xl: fontScale(18),
  xxl: fontScale(20),
  xxxl: fontScale(24),
  title: fontScale(28),
  largeTitle: fontScale(32),
};

// Responsive dimensions
export const dimensions = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  isSmallScreen: isSmallScreen(),
  isMediumScreen: isMediumScreen(),
  isLargeScreen: isLargeScreen(),
  isTablet: isTablet(),
};

// Responsive button sizes
export const getButtonSize = (size = 'md') => {
  const sizes = {
    sm: {
      paddingVertical: verticalScale(8),
      paddingHorizontal: horizontalScale(16),
      fontSize: fontSize.sm,
    },
    md: {
      paddingVertical: verticalScale(12),
      paddingHorizontal: horizontalScale(20),
      fontSize: fontSize.md,
    },
    lg: {
      paddingVertical: verticalScale(16),
      paddingHorizontal: horizontalScale(24),
      fontSize: fontSize.lg,
    },
  };
  return sizes[size] || sizes.md;
};

// Responsive card dimensions
export const getCardDimensions = () => {
  const padding = getResponsivePadding();
  return {
    marginHorizontal: padding,
    marginVertical: spacing[2],
    padding: padding,
    borderRadius: scale(12),
  };
};

// Responsive grid columns
export const getGridColumns = () => {
  if (isTablet()) return 3;
  if (isLargeScreen()) return 2;
  return 1;
};

// Responsive image dimensions
export const getImageDimensions = (aspectRatio = 1) => {
  const maxWidth = SCREEN_WIDTH - (getResponsivePadding() * 2);
  const width = maxWidth;
  const height = width / aspectRatio;
  
  return {
    width: Math.floor(width),
    height: Math.floor(height),
  };
};

// Responsive modal dimensions
export const getModalDimensions = () => {
  const maxHeight = SCREEN_HEIGHT * 0.9;
  const maxWidth = SCREEN_WIDTH * 0.95;
  
  return {
    maxHeight,
    maxWidth,
    width: maxWidth,
  };
};

// Responsive input dimensions
export const getInputDimensions = () => {
  return {
    height: verticalScale(48),
    fontSize: fontSize.md,
    paddingHorizontal: horizontalScale(16),
  };
};

// Responsive tab bar dimensions
export const getTabBarDimensions = () => {
  return {
    height: verticalScale(60),
    paddingBottom: verticalScale(8),
  };
};

// Responsive header dimensions
export const getHeaderDimensions = () => {
  return {
    height: verticalScale(60),
    paddingTop: verticalScale(10),
  };
};

export default {
  scale,
  verticalScale,
  horizontalScale,
  fontScale,
  spacing,
  fontSize,
  dimensions,
  getButtonSize,
  getCardDimensions,
  getGridColumns,
  getImageDimensions,
  getModalDimensions,
  getInputDimensions,
  getTabBarDimensions,
  getHeaderDimensions,
  getResponsivePadding,
  getResponsiveFontSize,
};
