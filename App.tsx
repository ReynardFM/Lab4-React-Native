import React from 'react';
import { StatusBar } from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen';

/**
 * The main entry point of the application.
 * @returns {React.ReactElement} The root component of the application.
 */
const App = () => {
  return (
    <>
      {/* The StatusBar component controls the appearance of the status bar on the device. */}
      <StatusBar barStyle="light-content" backgroundColor="#3498db" />
      {/* The DashboardScreen is the main screen of the application. */}
      <DashboardScreen />
    </>
  );
};

export default App;