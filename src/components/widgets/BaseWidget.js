import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../styles/theme';
import { isTablet } from '../../utils/responsive';

/**
 * A foundational, reusable widget component that provides a consistent card-like structure.
 * It includes a header with an optional icon and title, and a content area.
 *
 * @param {object} props - The component's properties.
 * @param {string} props.title - The title displayed in the widget's header.
 * @param {string} [props.icon] - The name of the Material Icon to display in the header.
 * @param {string} [props.iconColor] - The color of the header icon.
 * @param {React.ReactNode} props.children - The content to be rendered inside the widget.
 * @param {function} [props.onPress] - If provided, wraps the widget in a TouchableOpacity.
 * @param {object} [props.style] - Custom styles for the widget container.
 * @param {object} [props.headerStyle] - Custom styles for the header container.
 * @param {boolean} [props.showArrow=false] - If true, displays a chevron arrow in the header, indicating it's pressable.
 */
const BaseWidget = ({
    title,
    icon,
    iconColor,
    children,
    onPress,
    style,
    headerStyle,
    showArrow = false,
}) => {
    const isTab = isTablet();
    const content = (
        <View style={[styles.container, isTab && styles.tabletContainer, style]}>
            {/* Widget Header */}
            <View style={[styles.header, headerStyle]}>
                <View style={styles.headerLeft}>
                    {icon && (
                        <Icon
                            name={icon}
                            size={isTab ? 24 : 20}
                            color={iconColor || theme.colors.primary.main}
                            style={styles.headerIcon}
                        />
                    )}
                    <Text style={[styles.title, isTab && styles.tabletTitle]}>
                        {title}
                    </Text>
                </View>
                {showArrow && (
                    <Icon
                        name="chevron-right"
                        size={isTab ? 24 : 20}
                        color={theme.colors.neutral.gray500}
                    />
                )}
            </View>
            {/* Widget Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`${title} widget`}>
                {content}
            </TouchableOpacity>
        );
    }
    return content;
};
const styles = StyleSheet.create({
    container: {
        ...theme.card,
        marginBottom: theme.spacing.md,
    },
    tabletContainer: {
        padding: theme.spacing.lg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.md,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    headerIcon: {
        marginRight: theme.spacing.sm,
    },
    title: {
        fontSize: theme.typography.h4,
        fontWeight: 'bold',
        color: theme.colors.neutral.gray800,
        flex: 1,
    },
    tabletTitle: {
        fontSize: theme.typography.h3,
    },
    content: {
        flex: 1,
    },
});
export default BaseWidget;