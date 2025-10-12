import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider as FallbackAuthProvider } from './contexts/FallbackAuthContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <FallbackAuthProvider>
        <AppNavigator />
      </FallbackAuthProvider>
    </SafeAreaProvider>
  );
}
