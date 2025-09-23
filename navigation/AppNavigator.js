import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import AuthStack from './AuthStack';
import HaulierTabs from './HaulierTabs';
import ForwarderTabs from './ForwarderTabs';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { currentUser, userProfile, loading, signin } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MyHaulier</Text>
        <Text style={styles.subtitle}>Welcome to MyHaulier Mobile</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => signin('demo@example.com', 'password')}
        >
          <Text style={styles.buttonText}>Sign In (Demo)</Text>
        </TouchableOpacity>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppNavigator;
