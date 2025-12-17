// Haulier navigation - Definerer tab-navigation og stack-navigators for haulier-brugere
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/designSystem';

import JobsScreen from '../screens/haulier/JobsScreen';
import ApplicationsScreen from '../screens/haulier/ApplicationsScreen';
import OffersScreen from '../screens/haulier/OffersScreen';
import AvailabilityScreen from '../screens/haulier/AvailabilityScreen';
import ChatListScreen from '../screens/shared/ChatListScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';
import OfferDetailsScreen from '../screens/haulier/OfferDetailsScreen';
import ChatScreen from '../screens/shared/ChatScreen';
import MapScreen from '../screens/shared/MapScreen';
// NEW FEATURE: Added for Assignment 2 - New screens for better user experience
import SettingsScreen from '../screens/shared/SettingsScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';
import SearchScreen from '../screens/shared/SearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="JobsList" 
      component={JobsScreen}
      options={{ title: 'Find Partners' }}
    />
  </Stack.Navigator>
);

const ApplicationsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ApplicationsList" 
      component={ApplicationsScreen}
      options={{ title: 'My Applications' }}
    />
  </Stack.Navigator>
);

const OffersStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="OffersList" 
      component={OffersScreen}
      options={{ title: 'Partnership Opportunities' }}
    />
    <Stack.Screen 
      name="OfferDetails" 
      component={OfferDetailsScreen}
      options={{ title: 'Offer Details' }}
    />
  </Stack.Navigator>
);

const ChatStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ChatList" 
      component={ChatListScreen}
      options={{ title: 'Messages' }}
    />
    <Stack.Screen 
      name="ChatConversation" 
      component={ChatScreen}
      options={{ title: 'Chat' }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileMain" 
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
    {/* NEW FEATURE: Added for Assignment 2 - New screens accessible from Profile */}
    <Stack.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
    <Stack.Screen 
      name="Notifications" 
      component={NotificationsScreen}
      options={{ title: 'Notifications' }}
    />
    <Stack.Screen 
      name="Search" 
      component={SearchScreen}
      options={{ title: 'Search Partners' }}
    />
    <Stack.Screen 
      name="MapMain" 
      component={MapScreen}
      options={{ title: 'Partnership Map' }}
    />
    <Stack.Screen 
      name="AvailabilityMain" 
      component={AvailabilityScreen}
      options={{ title: 'My Availability' }}
    />
  </Stack.Navigator>
);

const HaulierTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Find') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Connections') {
            iconName = focused ? 'handshake' : 'handshake-outline';
          } else if (route.name === 'Offers') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mediumGray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Find" component={JobsStack} />
      <Tab.Screen name="Connections" component={ApplicationsStack} />
      <Tab.Screen name="Offers" component={OffersStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default HaulierTabs;
