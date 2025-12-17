// Hovednavigator - Styrer routing baseret på brugerens autentificeringsstatus og brugertype
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/FallbackAuthContext';
import AuthStack from './AuthStack';
import HaulierTabs from './HaulierTabs';
import ForwarderTabs from './ForwarderTabs';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { currentUser, userProfile, loading } = useAuth();

  // Viser loading-skærm mens autentificering tjekkes
  if (loading) {
    return <LoadingScreen />;
  }

  // Hvis bruger ikke er logget ind, vis autentificeringsskærm
  if (!currentUser) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Vælger korrekt app-interface baseret på brugerens type (haulier eller forwarder)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userProfile?.userType === 'haulier' ? (
          <Stack.Screen name="HaulierApp" component={HaulierTabs} />
        ) : (
          <Stack.Screen name="ForwarderApp" component={ForwarderTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
