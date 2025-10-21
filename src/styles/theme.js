import { Platform } from 'react-native';
import { wp, hp, rf, spacing as responsiveSpacing, typography as responsiveTypography } from '../utils/responsive';

/**
 * @file This file defines the visual theme for the application.
 * It includes color palettes, shadow styles, border radii, and common component styles.
 */

// The main color palette for the application.
export const colors = {
    primary: {
        main: '#3498db',
        light: '#85c1e9',
        dark: '#2980b9',
        contrast: '#ffffff',
    },
    secondary: {
        main: '#2ecc71',
        light: '#82e0aa',
        dark: '#27ae60',
        contrast: '#ffffff',
    },
    accent: {
        main: '#e74c3c',
        light: '#f1948a',
        dark: '#c0392b',
        contrast: '#ffffff',
    },
    neutral: {
        white: '#ffffff',
        gray100: '#f8f9fa',
        gray200: '#e9ecef',
        gray300: '#dee2e6',
        gray400: '#ced4da',
        gray500: '#adb5bd',
        gray600: '#6c757d',
        gray700: '#495057',
        gray800: '#343a40',
        gray900: '#212529',
        black: '#000000',
    },
    semantic: {
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545',
        info: '#17a2b8',
    },
    background: {
        primary: '#ffffff',
        secondary: '#f8f9fa',
        tertiary: '#e9ecef',
    },
};

// Platform-specific shadow styles.
// This uses Platform.select to provide different styles for iOS and Android.
export const shadows = {
    small: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    medium: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    large: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 8,
            },
        }),
    },
};

// Consistent border radii for use throughout the application.
export const borderRadius = {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
    round: 50,
};

// The main theme object that combines all the theme properties.
// This object is imported into components to provide consistent styling.
export const theme = {
    colors,
    spacing: responsiveSpacing,
    typography: responsiveTypography,
    shadows,
    borderRadius,
    // Common component styles that can be reused across the application.
    card: {
        backgroundColor: colors.background.primary,
        borderRadius: borderRadius.large,
        padding: responsiveSpacing.md,
        margin: responsiveSpacing.sm,
        ...shadows.medium,
    },
    button: {
        primary: {
            backgroundColor: colors.primary.main,
            paddingVertical: responsiveSpacing.md,
            paddingHorizontal: responsiveSpacing.lg,
            borderRadius: borderRadius.medium,
            alignItems: 'center',
            justifyContent: 'center',
            ...shadows.small,
        },
        secondary: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: colors.primary.main,
            paddingVertical: responsiveSpacing.md,
            paddingHorizontal: responsiveSpacing.lg,
            borderRadius: borderRadius.medium,
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    text: {
        primary: {
            color: colors.neutral.gray800,
            fontSize: responsiveTypography.body,
        },
        secondary: {
            color: colors.neutral.gray600,
            fontSize: responsiveTypography.body,
        },
        heading: {
            color: colors.neutral.gray900,
            fontWeight: 'bold',
        },
    },
};