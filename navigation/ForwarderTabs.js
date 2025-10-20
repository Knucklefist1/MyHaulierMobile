import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/designSystem';

import MyJobsScreen from '../screens/forwarder/MyJobsScreen';
import PostJobScreen from '../screens/forwarder/PostJobScreen';
import ApplicationsScreen from '../screens/forwarder/ApplicationsScreen';
import MatchingScreen from '../screens/forwarder/MatchingScreen';
import CreateOfferScreen from '../screens/forwarder/CreateOfferScreen';
import ChatListScreen from '../screens/shared/ChatListScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';
import ChatScreen from '../screens/shared/ChatScreen';
import AnalyticsScreen from '../screens/forwarder/AnalyticsScreen';
import ManagePartnershipsScreen from '../screens/forwarder/ManagePartnershipsScreen';
import HaulierProfileScreen from '../screens/shared/HaulierProfileScreen';
import MapScreen from '../screens/shared/MapScreen';
// NEW FEATURE: Added for Assignment 2 - New screens for better user experience
import SettingsScreen from '../screens/shared/SettingsScreen';
import NotificationsScreen from '../screens/shared/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MyJobsList" 
      component={MyJobsScreen}
      options={{ title: 'My Partnerships' }}
    />
    <Stack.Screen 
      name="PostJob" 
      component={PostJobScreen}
      options={{ title: 'Post Partnership Opportunity' }}
    />
  </Stack.Navigator>
);

const ApplicationsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ApplicationsList" 
      component={ApplicationsScreen}
      options={{ title: 'Applications' }}
    />
    <Stack.Screen 
      name="Matching" 
      component={MatchingScreen}
      options={{ title: 'Find Hauliers' }}
    />
    <Stack.Screen 
      name="HaulierProfile" 
      component={HaulierProfileScreen}
      options={{ title: 'Haulier Profile' }}
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

const PostStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="PostJob" 
      component={PostJobScreen}
      options={{ title: 'Post Partnership Opportunity' }}
    />
  </Stack.Navigator>
);

const AnalyticsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="AnalyticsMain" 
      component={AnalyticsScreen}
      options={{ title: 'Analytics' }}
    />
    <Stack.Screen 
      name="ManagePartnerships" 
      component={ManagePartnershipsScreen}
      options={{ title: 'Manage Partnerships' }}
    />
  </Stack.Navigator>
);

const FindStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MatchingMain" 
      component={MatchingScreen}
      options={{ title: 'Find Hauliers' }}
    />
    <Stack.Screen 
      name="HaulierProfile" 
      component={HaulierProfileScreen}
      options={{ title: 'Haulier Profile' }}
    />
    <Stack.Screen 
      name="CreateOffer" 
      component={CreateOfferScreen}
      options={{ title: 'Create Partnership Opportunity' }}
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
  </Stack.Navigator>
);

const MapStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MapMain" 
      component={MapScreen}
      options={{ title: 'Partnership Map' }}
    />
  </Stack.Navigator>
);

const ForwarderTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Partnerships') {
            iconName = focused ? 'handshake' : 'handshake-outline';
          } else if (route.name === 'Find') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.error,
        tabBarInactiveTintColor: colors.mediumGray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Partnerships" component={JobsStack} />
      <Tab.Screen name="Find" component={FindStack} />
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Post" component={PostStack} />
      <Tab.Screen name="Analytics" component={AnalyticsStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default ForwarderTabs;
