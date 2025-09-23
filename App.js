import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles/globalStyles';
import LandingScreen from './screens/LandingScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Landing');
  const [userRole, setUserRole] = useState(null);
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Pick up cargo from warehouse', status: 'pending', priority: 'high' },
    { id: '2', title: 'Deliver to customer A', status: 'in-progress', priority: 'medium' },
    { id: '3', title: 'Return empty container', status: 'completed', priority: 'low' },
    { id: '4', title: 'Fuel up truck', status: 'pending', priority: 'high' },
    { id: '5', title: 'Update delivery status', status: 'pending', priority: 'medium' },
  ]);
  const [profile, setProfile] = useState({
    name: 'John Driver',
    email: 'john.driver@myhaulier.com',
    phone: '+45 12 34 56 78',
    licenseNumber: 'DL123456789',
    experience: '5 years'
  });
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FF9800';
      case 'pending': return '#F44336';
      default: return '#666';
    }
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={[styles.taskStatus, { color: getStatusColor(item.status) }]}>
        Status: {item.status}
      </Text>
      <Text style={styles.taskPriority}>Priority: {item.priority}</Text>
    </View>
  );

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setCurrentScreen('Home');
    Alert.alert(
      'Welcome!', 
      `You've selected as a ${role === 'haulier' ? 'Haulier' : 'Freight Forwarder'}. Let's get started!`
    );
  };

  const renderHomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>MyHaulier Mobile</Text>
      <Text style={styles.subtitle}>
        Welcome, {userRole === 'haulier' ? 'Haulier' : 'Freight Forwarder'}!
      </Text>
      
      <View style={[styles.buttonContainer, { flexDirection: 'column', alignItems: 'center' }]}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => setCurrentScreen('TaskList')}
        >
          <Text style={styles.buttonText}>View Tasks</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentScreen('Profile')}
        >
          <Text style={styles.buttonText}>My Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.secondaryButton, { backgroundColor: '#e74c3c', marginTop: 10 }]}
          onPress={() => {
            setUserRole(null);
            setCurrentScreen('Landing');
          }}
        >
          <Text style={styles.buttonText}>Change Role</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTaskListScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => setCurrentScreen('Home')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfileScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      
      <View style={styles.profileContainer}>
        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profile.name}
              onChangeText={(text) => setProfile({...profile, name: text})}
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.name}</Text>
          )}
        </View>

        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profile.email}
              onChangeText={(text) => setProfile({...profile, email: text})}
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.email}</Text>
          )}
        </View>

        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Phone:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profile.phone}
              onChangeText={(text) => setProfile({...profile, phone: text})}
            />
          ) : (
            <Text style={styles.fieldValue}>{profile.phone}</Text>
          )}
        </View>

        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>License Number:</Text>
          <Text style={styles.fieldValue}>{profile.licenseNumber}</Text>
        </View>

        <View style={styles.profileField}>
          <Text style={styles.fieldLabel}>Experience:</Text>
          <Text style={styles.fieldValue}>{profile.experience}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={isEditing ? styles.saveButton : styles.editButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentScreen('Home')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {currentScreen === 'Landing' && <LandingScreen onRoleSelect={handleRoleSelect} />}
      {currentScreen === 'Home' && renderHomeScreen()}
      {currentScreen === 'TaskList' && renderTaskListScreen()}
      {currentScreen === 'Profile' && renderProfileScreen()}
    </View>
  );
}
