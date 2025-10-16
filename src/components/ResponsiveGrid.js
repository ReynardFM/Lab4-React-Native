import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
    getGridColumns,
    listenForOrientationChange,
    getAdaptivePadding,
    isTablet,
} from '../utils/responsive';
import { theme } from '../styles/theme';

/**
 * A grid component that automatically adjusts the number of columns based on screen size and orientation.
 * It can also accept a fixed number of columns.
 *
 * @param {object} props - The component's properties.
 * @param {Array<object>} [props.data=[]] - The array of data items to render in the grid.
 * @param {function} props.renderItem - A function that takes an item from the data array and returns a rendered component.
 * @param {number} [props.numColumns] - A fixed number of columns. If not provided, columns are calculated automatically.
 * @param {number} [props.spacing] - The spacing between grid items.
 * @param {object} [props.contentContainerStyle] - Custom styles for the grid container.
 */
const ResponsiveGrid = ({
    data = [],
    renderItem,
    numColumns,
    spacing = theme.spacing.sm,
    contentContainerStyle,
}) => {
    const [columns, setColumns] = useState(numColumns || getGridColumns());
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        // This effect handles the dynamic calculation of columns when the screen orientation changes.
        const updateLayout = () => {
            const { width, height } = Dimensions.get('window');
            setScreenWidth(width);

            // Only auto-calculate columns if a fixed number isn't provided.
            if (!numColumns) {
                const newColumns = getGridColumns(width);
                setColumns(newColumns);
            }
        };

        // Initial calculation
        updateLayout();

        // Subscribe to dimension changes
        const subscription = Dimensions.addEventListener('change', updateLayout);

        // Unsubscribe on component unmount
        return () => {
            subscription?.remove();
        };
    }, [numColumns]);

    // This effect updates the columns if the numColumns prop changes.
    useEffect(() => {
        if (numColumns) {
            setColumns(numColumns);
        }
    }, [numColumns]);

    const renderRow = (rowData, rowIndex) => {
        console.log("Render Again");
        return (
            <View key={rowIndex} style={[styles.row, { marginHorizontal: spacing / 2 }]}>
                {rowData.map((item, itemIndex) => {
                    // If an item is null, render an empty view to maintain the grid structure.
                    if (!item) {
                        return <View key={itemIndex} style={[styles.item, { flex: 1 }]} />;
                    }
                    return (
                        <View
                            key={`empty-${rowIndex}-${itemIndex}`}
                            style={[
                                styles.item,
                                {
                                    
                                    marginHorizontal: spacing / 2,
                                    marginBottom: spacing,
                                },
                            ]}>
                            {renderItem(item, itemIndex)}
                        </View>
                    );
                })}
            </View>
        );
    };

    // Group data into rows based on the number of columns.
    // This is necessary to create a grid layout with rows and columns.
    const groupedData = [];
    for (let i = 0; i < data.length; i += columns) {
        const row = data.slice(i, i + columns);
        // If the last row is not full, fill it with null values to maintain the grid structure.
        while (row.length < columns) {
            row.push(null);
        }
        groupedData.push(row);
    }

    return (
        <View style={[styles.container, contentContainerStyle]}>
            {groupedData.map((rowData, rowIndex) => renderRow(rowData, rowIndex))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: getAdaptivePadding(),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    item: {
        
        flex:1, 
        width:"auto",
        height:"25%",   
    },
});
export default ResponsiveGrid;