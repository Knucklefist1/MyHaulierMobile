import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { styles } from '../styles/globalStyles';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: 'John Driver',
    email: 'john.driver@myhaulier.com',
    phone: '+45 12 34 56 78',
    licenseNumber: 'DL123456789',
    experience: '5 years'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
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
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
