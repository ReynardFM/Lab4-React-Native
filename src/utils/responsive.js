import { Dimensions, PixelRatio, Platform } from 'react-native';

/**
 * @file This file contains utility functions for creating responsive layouts in React Native.
 * It provides functions for scaling dimensions and fonts based on the screen size,
 * and for determining the device type and orientation.
 */

/**
 * Gets the current window dimensions.
 * @returns {{width: number, height: number}} The current window dimensions.
 */
export const getCurrentDimensions = () => {
    return Dimensions.get('window');
};

/**
 * Calculates a percentage of the screen width.
 * @param {number} percentage - The percentage of the screen width to calculate.
 * @returns {number} The calculated width in pixels.
 */
export const wp = (percentage) => {
    const { width } = getCurrentDimensions();
    const value = (percentage * width) / 100;
    return Math.round(PixelRatio.roundToNearestPixel(value));
};

/**
 * Calculates a percentage of the screen height.
 * @param {number} percentage - The percentage of the screen height to calculate.
 * @returns {number} The calculated height in pixels.
 */
export const hp = (percentage) => {
    const { height } = getCurrentDimensions();
    const value = (percentage * height) / 100;
    return Math.round(PixelRatio.roundToNearestPixel(value));
};

/**
 * Calculates a responsive font size based on the screen width.
 * @param {number} size - The base font size.
 * @returns {number} The calculated responsive font size.
 */
export const rf = (size) => {
    const screenData = getCurrentDimensions();
    const scale = screenData.width / 640;
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

/**
 * Subscribes to orientation changes and calls a callback function when the orientation changes.
 * @param {function} callback - The callback function to call on orientation change.
 * @returns {object} The event subscription.
 */
export const listenForOrientationChange = (callback) => {
    const subscription = Dimensions.addEventListener('change', () => {
        getCurrentDimensions();
        callback();
    });
    return subscription;
};

// Pre-calculated responsive spacing values.
export const spacing = {
    xs: wp('1%'),
    sm: wp('2%'),
    md: wp('4%'),
    lg: wp('6%'),
    xl: wp('8%'),
};

// Pre-calculated responsive typography sizes.
export const typography = {
    h1: rf(28),
    h2: rf(24),
    h3: rf(20),
    h4: rf(18),
    body: rf(16),
    caption: rf(14),
    small: rf(12),
};

// Breakpoints for different device sizes.
export const breakpoints = {
    small: 360,
    medium: 400,
    large: 500,
    tablet: 768,
    largeTablet: 1024,
};

/**
 * Determines the device type based on the screen width.
 * @param {number} [width] - An optional width to use for calculation.
 * @returns {string} The device type (e.g., 'smallPhone', 'tablet').
 */
export const getDeviceType = (width = null) => {
    const { width: screenWidth, height: screenHeight } = getCurrentDimensions();
    const currentWidth = width || screenWidth;
    
    // Use the smaller dimension to determine device type for better reliability on orientation change.
    const minDimension = Math.min(currentWidth, screenHeight);
    
    if (minDimension < breakpoints.tablet) {
        // It's a phone
        if (currentWidth < breakpoints.small) return 'smallPhone';
        if (currentWidth < breakpoints.medium) return 'mediumPhone';
        return 'largePhone';
    } else {
        // It's a tablet
        if (currentWidth < breakpoints.largeTablet) return 'tablet';
        return 'largeTablet';
    }
};

/**
 * Calculates the number of grid columns based on the device type and orientation.
 * @param {number} [width] - An optional width to use for calculation.
 * @returns {number} The number of columns for the grid.
 */
export const getGridColumns = (width = null) => {
    const { width: screenWidth, height: screenHeight } = getCurrentDimensions();
    const currentWidth = width || screenWidth;
    const isLandscape = currentWidth > screenHeight;
    const deviceType = getDeviceType(currentWidth);
    
    // This log is for debugging purposes to see how the grid columns are calculated.
    console.log('Grid Columns Calculation:', {
        width: currentWidth,
        height: screenHeight,
        isLandscape,
        deviceType
    });
    
    switch (deviceType) {
        case 'smallPhone':
        case 'mediumPhone':
        case 'largePhone':
            return isLandscape ? 2 : 1;
        case 'tablet':
            return isLandscape ? 4 : 2; // More columns for tablets
        case 'largeTablet':
            return isLandscape ? 5 : 3;
        default:
            return isLandscape ? 2 : 1;
    }
};

/**
 * Checks if the device is a tablet.
 * @param {number} [width] - An optional width to use for calculation.
 * @returns {boolean} True if the device is a tablet, false otherwise.
 */
export const isTablet = (width = null) => {
    const deviceType = getDeviceType(width);
    return deviceType === 'tablet' || deviceType === 'largeTablet';
};

/**
 * Gets an adaptive padding value based on the device type.
 * @returns {number} The adaptive padding value.
 */
export const getAdaptivePadding = () => {
    const deviceType = getDeviceType();
    switch (deviceType) {
        case 'smallPhone': return wp('4%');
        case 'mediumPhone': return wp('4%');
        case 'largePhone': return wp('6%');
        case 'tablet': return wp('8%');
        default: return wp('10%');
    }
};