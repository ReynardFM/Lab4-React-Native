import React, { useState, useEffect, useCallback } from 'react';
import {
    ScrollView,
    View,
    RefreshControl,
    StyleSheet,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    Text,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DashboardHeader from '../components/DashboardHeader';
import ResponsiveGrid from '../components/ResponsiveGrid';
import StatisticWidget from '../components/widgets/StatisticWidget';
import BaseWidget from '../components/widgets/BaseWidget';
import { theme } from '../styles/theme';
import { isTablet, listenForOrientationChange } from '../utils/responsive';

/**
 * The main screen of the application, displaying the dashboard.
 * It includes a header, a grid of statistics, and a quick actions widget.
 * It also features pull-to-refresh functionality and handles orientation changes.
 */
const DashboardScreen = () => {
    // State for the pull-to-refresh indicator.
    const [refreshing, setRefreshing] = useState(false);
    // State to track the current device orientation.
    const [orientation, setOrientation] = useState('portrait');

    // Sample data for the dashboard widgets. In a real app, this would come from an API.
    const [dashboardData, setDashboardData] = useState({
        statistics: [
            {
                id: 1,
                title: 'Total Sales',
                value: '$24.5K',
                subtitle: 'This month',
                icon: 'trending-up',
                iconColor: theme.colors.semantic.success,
                trend: 'up',
                trendValue: '+12%',
            },
            {
                id: 2,
                title: 'New Users',
                value: '1,234',
                subtitle: 'This week',
                icon: 'people',
                iconColor: theme.colors.primary.main,
                trend: 'up',
                trendValue: '+8%',
            },
            {
                id: 3,
                title: 'Orders',
                value: '456',
                subtitle: 'Today',
                icon: 'shopping-cart',
                iconColor: theme.colors.secondary.main,
                trend: 'down',
                trendValue: '-3%',
            },
            {
                id: 4,
                title: 'Revenue',
                value: '$12.3K',
                subtitle: 'This week',
                icon: 'attach-money',
                iconColor: theme.colors.accent.main,
                trend: 'up',
                trendValue: '+15%',
            },
        ],
    });

    useEffect(() => {
        // This effect subscribes to orientation changes to update the UI accordingly.
        const subscription = listenForOrientationChange(() => {
            // When the orientation changes, we toggle the orientation state.
            setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
        });

        // Get the initial orientation when the component mounts.
        Orientation.getOrientation((orientation) => {
            setOrientation(orientation);
        });

        // Unsubscribe from the event listener when the component unmounts to prevent memory leaks.
        return () => {
            subscription?.remove();
        };
    }, []);

    /**
     * Handles the pull-to-refresh action.
     * It simulates fetching new data from a server.
     */
    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate a network request with a 2-second delay.
        setTimeout(() => {
            // Update the data (e.g., with new values from an API)
            setDashboardData(prev => ({
                ...prev,
                statistics: prev.statistics.map(stat => ({
                    ...stat,
                    value: stat.id === 1 ? '$25.2K' : stat.value, // Example of updating a single value
                })),
            }));
            setRefreshing(false);
        }, 2000);
    };

    /**
     * Renders a single statistic widget.
     * This function is memoized with useCallback to prevent unnecessary re-renders of the ResponsiveGrid.
     * @param {object} item - The data for the statistic widget.
     * @returns {React.ReactElement} The rendered StatisticWidget component.
     */
    const renderStatisticWidget = useCallback((item) => (
        <StatisticWidget
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
            iconColor={item.iconColor}
            trend={item.trend}
            trendValue={item.trendValue}
            onPress={() => Alert.alert(item.title, `Detailed view for ${item.title}`)}
        />
    ), []);

    // Check if the device is a tablet to apply different styles.
    const isTab = isTablet();
    // Check if the device is in landscape mode.
    const isLandscape = orientation === 'landscape';

    return (
        <SafeAreaView style={styles.container}>
            <DashboardHeader
                title="Dashboard"
                subtitle={`Welcome back, ${isTab ? 'tablet' : 'mobile'} user!`}
                onMenuPress={() => Alert.alert('Menu', 'Menu opened')}
                onNotificationPress={() => Alert.alert('Notifications', 'You have 3 notifications')}
                onProfilePress={() => Alert.alert('Profile', 'Profile opened')}
            />
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[theme.colors.primary.main]}
                        tintColor={theme.colors.primary.main}
                    />
                }>
                {/* Renders the grid of statistic widgets using the ResponsiveGrid component. */}
                <ResponsiveGrid
                    data={dashboardData.statistics}
                    renderItem={renderStatisticWidget}
                    spacing={theme.spacing.md}                    
                />
                {/* Renders the quick actions widget. */}
                <View style={styles.widgetsContainer}>
                    <BaseWidget
                        title="Quick Actions"
                        icon="flash-on"
                        iconColor={theme.colors.semantic.warning}>
                        <View style={styles.quickActions}>
                            {[
                                { title: 'Add Product', icon: 'add-box', color: theme.colors.primary.main },
                                {
                                    title: 'View Reports', icon: 'assessment', color:
                                        theme.colors.secondary.main
                                },
                                { title: 'Manage Users', icon: 'group', color: theme.colors.accent.main },
                                { title: 'Settings', icon: 'settings', color: theme.colors.neutral.gray600 },
                            ].map((action, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.quickAction}
                                    onPress={() => Alert.alert(action.title, `${action.title} pressed`)}>
                                    <View style={[styles.quickActionIcon, {
                                        backgroundColor:
                                            `${action.color}20` // Add opacity to the background color
                                    }]}>
                                        <Icon
                                            name={action.icon}
                                            size={24}
                                            color={action.color}
                                        />
                                    </View>
                                    <Text style={styles.quickActionText}>{action.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </BaseWidget>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.secondary,
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: theme.spacing.xl,
    },
    widgetsContainer: {
        paddingHorizontal: theme.spacing.md,
    },
    quickActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickAction: {
        alignItems: 'center',
        width: '22%',
        paddingVertical: theme.spacing.md,
    },
    quickActionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xs,
    },
    quickActionText: {
        marginTop: theme.spacing.xs,
        fontSize: theme.typography.small,
        textAlign: 'center',
        color: theme.colors.neutral.gray700,
    },
});

export default DashboardScreen;