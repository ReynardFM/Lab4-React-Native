import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BaseWidget from './BaseWidget';
import { theme } from '../../styles/theme';
import { isTablet } from '../../utils/responsive';

/**
 * A widget to display a single statistic, including a title, value, and trend indicator.
 * It is built on top of the BaseWidget component.
 *
 * @param {object} props - The component's properties.
 * @param {string} props.title - The title of the statistic.
 * @param {string} props.value - The main value of the statistic.
 * @param {string} [props.subtitle] - An optional subtitle for additional context.
 * @param {string} props.icon - The name of the Material Icon to display.
 * @param {string} [props.iconColor] - The color of the icon.
 * @param {'up' | 'down'} [props.trend] - The direction of the trend.
 * @param {string} [props.trendValue] - The value of the trend (e.g., '+12%').
 * @param {function} [props.onPress] - A callback function to handle press events on the widget.
 */
const StatisticWidget = ({
    title,
    value,
    subtitle,
    icon,
    iconColor,
    trend,
    trendValue,
    onPress,
}) => {
    const isTab = isTablet();
    const isPositiveTrend = trend === 'up';
    const trendColor = isPositiveTrend
        ? theme.colors.semantic.success
        : theme.colors.semantic.error;
    return (
        <BaseWidget
            title={title}
            icon={icon}
            iconColor={iconColor}
            onPress={onPress}
            showArrow={!!onPress}>
            <View style={styles.statisticContainer}>
                {/* Main Value */}
                <Text style={[styles.value, isTab && styles.tabletValue]}>
                    {value}
                </Text>
                {/* Subtitle */}
                {subtitle && (
                    <Text style={[styles.subtitle, isTab && styles.tabletSubtitle]}>
                        {subtitle}
                    </Text>
                )}
                {/* Trend Indicator */}
                {trend && trendValue && (
                    <View style={styles.trendContainer}>
                        <Icon
                            name={trend === 'up' ? 'trending-up' : 'trending-down'}
                            size={isTab ? 18 : 16}
                            color={trendColor}
                            style={styles.trendIcon}
                        />
                        <Text style={[styles.trendValue, { color: trendColor }]}>
                            {trendValue}
                        </Text>
                    </View>
                )}
            </View>
        </BaseWidget>
    );
};
const styles = StyleSheet.create({
    statisticContainer: {
        alignItems: 'center',
    },
    value: {
        fontSize: theme.typography.h1,
        fontWeight: 'bold',
        color: theme.colors.neutral.gray800,
        marginBottom: theme.spacing.xs,
    },
    tabletValue: {
        fontSize: theme.typography.h1 * 1.2,
    },
    subtitle: {
        fontSize: theme.typography.caption,
        color: theme.colors.neutral.gray600,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    tabletSubtitle: {
        fontSize: theme.typography.body,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendIcon: {
        marginRight: theme.spacing.xs,
    },
    trendValue: {
        fontSize: theme.typography.caption,
        fontWeight: 'bold',
    },
});
export default StatisticWidget;