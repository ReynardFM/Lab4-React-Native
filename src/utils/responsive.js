import { Dimensions, PixelRatio, Platform } from 'react-native';

/**
 * @file This file contains utility functions for creating responsive layouts in React Native.
 * It provides functions for scaling dimensions and fonts based on the screen size,
 * and for determining the device type and orientation.
 */

/**
 * Gets the current window dimensions.
 * This is a wrapper around Dimensions.get('window') to ensure we are always getting the latest dimensions.
 * @returns {{width: number, height: number}} The current window dimensions.
 */
export const getCurrentDimensions = () => {
    return Dimensions.get('window');
};

/**
 * Calculates a percentage of the screen width.
 * This is useful for creating elements that scale with the screen size.
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
 * This is useful for creating elements that scale with the screen size.
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
 * This ensures that fonts are scaled appropriately on different screen sizes.
 * The scaling is based on a base width of 640 pixels.
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
        // Android fonts often appear slightly larger, so we subtract 2 to compensate.
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

/**
 * Subscribes to orientation changes and calls a callback function when the orientation changes.
 * This allows components to react to orientation changes.
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
// Using pre-calculated values can improve performance by avoiding repeated calculations.
export const spacing = {
    xs: wp('2%'),
    sm: wp('4%'),
    md: wp('8%'),
    lg: wp('12%'),
    xl: wp('16%'),
};

// Pre-calculated responsive typography sizes.
export const typography = {
    h1: rf(56),
    h2: rf(48),
    h3: rf(40),
    h4: rf(36),
    body: rf(32),
    caption: rf(28),
    small: rf(24),
};

// Breakpoints for different device sizes.
// These are used to determine the device type.
export const breakpoints = {
    small: 360,
    medium: 400,
    large: 500,
    tablet: 768,
    largeTablet: 1024,
};

/**
 * Determines the device type based on the screen width.
 * This is used to apply different layouts for different devices.
 * @param {number} [width] - An optional width to use for calculation.
 * @returns {string} The device type (e.g., 'smallPhone', 'tablet').
 */
export const getDeviceType = (width = null) => {
    const { width: screenWidth, height: screenHeight } = getCurrentDimensions();
    const currentWidth = width || screenWidth;
    
    // Use the smaller dimension to determine device type for better reliability on orientation change.
    // This prevents a tablet in portrait mode from being detected as a phone.
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
 * This is the core of the responsive grid system.
 * @param {number} [width] - An optional width to use for calculation.
 * @returns {number} The number of columns for the grid.
 */
export const getGridColumns = (width = null) => {
    const { width: screenWidth, height: screenHeight } = getCurrentDimensions();
    const currentWidth = width || screenWidth;
    const isLandscape = currentWidth > screenHeight;
    const deviceType = getDeviceType(currentWidth);
    
    // The number of columns changes based on the device type and orientation.
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
 * This is a helper function to easily check the device type.
 * @param {number} [width] - An optional width to use for calculation.
 * @returns {boolean} True if the device is a tablet, false otherwise.
 */
export const isTablet = (width = null) => {
    const deviceType = getDeviceType(width);
    return deviceType === 'tablet' || deviceType === 'largeTablet';
};

/**
 * Gets an adaptive padding value based on the device type.
 * This allows for more consistent spacing across different devices.
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
