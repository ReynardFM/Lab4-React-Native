# Responsive Dashboard App - Lab 4

## Student Information

- **Name:** Reynard Fitzgerald Milson
- **Student ID:** N01691494
- **Course:** CPAN 213
- **Lab:** Lab 4 - Responsive Layouts with Flexbox
- **Date:** September 23, 2025

## Project Description

This responsive dashboard application demonstrates advanced Flexbox layout techniques,
responsive design patterns, and platform-specific styling in React Native.

## Features Implemented

- Responsive grid system with breakpoint detection
- Dashboard widgets with statistics and trends
- Orientation-aware layouts
- Platform-specific styling (iOS/Android)
- Pull-to-refresh functionality
- Performance-optimized StyleSheets

## Technologies Used

- React Native 0.72+
- React Native Orientation Locker
- React Native Vector Icons
- Platform-specific APIs

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Install iOS pods (macOS only): `cd ios && pod install`
4. Run on Android: `npx react-native run-android`
5. Run on iOS: `npx react-native run-ios`

## Project Structure

src/

├── components/

│ ├── DashboardHeader.js

│ ├── ResponsiveGrid.js

│ └── widgets/

│ ├── BaseWidget.js

│ └── StatisticWidget.js

├── screens/

│ └── DashboardScreen.js

├── styles/

│ └── theme.js

└── utils/

 └── responsive.js

## Responsive Breakpoints

- Small phones: < 350px
- Medium phones: 350-400px
- Large phones: 400-500px
- Tablets: 500-768px
- Large tablets: > 768px

## Grid Columns by Device

- Small: 1 column
- Medium: 2 columns
- Tablet Portrait: 2 columns
- Tablet Landscape: 3-4 columns

## Performance Notes

- All animations run at 60fps
- StyleSheet.create used for all styles
- Memoization applied where necessary
- Native driver enabled for animations

## Known Issues

- Application may experience minor lag or stuttering during screen orientation changes or when scrolling through a large number of widgets.

## Future Enhancements

[List potential improvements or features to add]
