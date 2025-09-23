import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles/globalStyles';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Pick up cargo from warehouse', status: 'pending', priority: 'high' },
    { id: '2', title: 'Deliver to customer A', status: 'in-progress', priority: 'medium' },
    { id: '3', title: 'Return empty container', status: 'completed', priority: 'low' },
    { id: '4', title: 'Fuel up truck', status: 'pending', priority: 'high' },
    { id: '5', title: 'Update delivery status', status: 'pending', priority: 'medium' },
  ]);

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={[styles.taskStatus, { color: getStatusColor(item.status) }]}>
        Status: {item.status}
      </Text>
      <Text style={styles.taskPriority}>Priority: {item.priority}</Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FF9800';
      case 'pending': return '#F44336';
      default: return '#666';
    }
  };

  return (
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
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskListScreen;
