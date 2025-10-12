// NEW FEATURE: Notifications Screen - Added for Assignment 2
// This screen allows users to view and manage their notifications
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { OfflineStorage } from '../../utils/storage';

const NotificationsScreen = ({ navigation }) => {
  const { userProfile } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, read

  // NEW FEATURE: Load notifications from AsyncStorage instead of hardcoded data
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      // For now, we'll create mock notifications and save them to AsyncStorage
      // In a real app, these would come from a server
      const mockNotifications = [
        {
          id: '1',
          title: 'New Partnership Opportunity',
          message: 'Nordic Furniture is looking for hauliers in your area',
          type: 'partnership',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          isRead: false,
          priority: 'high'
        },
        {
          id: '2',
          title: 'Message Received',
          message: 'You have a new message from TechCorp Denmark',
          type: 'message',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          isRead: true,
          priority: 'medium'
        },
        {
          id: '3',
          title: 'Job Application Status',
          message: 'Your application for Electronics Transport has been approved',
          type: 'application',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          isRead: true,
          priority: 'high'
        },
        {
          id: '4',
          title: 'System Update',
          message: 'New features available in the latest app update',
          type: 'system',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          isRead: false,
          priority: 'low'
        }
      ];

      // Save to AsyncStorage
      await OfflineStorage.saveChats(mockNotifications);
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  // NEW FEATURE: Mark notification as read using AsyncStorage
  const markAsRead = async (notificationId) => {
    try {
      const updatedNotifications = notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      );
      
      await OfflineStorage.saveChats(updatedNotifications);
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // NEW FEATURE: Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const updatedNotifications = notifications.map(notification => ({
        ...notification,
        isRead: true
      }));
      
      await OfflineStorage.saveChats(updatedNotifications);
      setNotifications(updatedNotifications);
      Alert.alert('Success', 'All notifications marked as read');
    } catch (error) {
      console.error('Error marking all as read:', error);
      Alert.alert('Error', 'Failed to mark all as read');
    }
  };

  // NEW FEATURE: Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const updatedNotifications = notifications.filter(
        notification => notification.id !== notificationId
      );
      
      await OfflineStorage.saveChats(updatedNotifications);
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(notification => !notification.isRead);
      case 'read':
        return notifications.filter(notification => notification.isRead);
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'partnership':
        return 'business';
      case 'message':
        return 'chatbubble';
      case 'application':
        return 'document-text';
      case 'system':
        return 'settings';
      default:
        return 'notifications';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#95a5a6';
      default:
        return '#3498db';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationLeft}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: getPriorityColor(item.priority) + '20' }
        ]}>
          <Ionicons
            name={getNotificationIcon(item.type)}
            size={20}
            color={getPriorityColor(item.priority)}
          />
        </View>
        <View style={styles.notificationContent}>
          <Text style={[
            styles.notificationTitle,
            !item.isRead && styles.unreadText
          ]}>
            {item.title}
          </Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {item.message}
          </Text>
          <Text style={styles.timestamp}>
            {formatTimestamp(item.timestamp)}
          </Text>
        </View>
      </View>
      <View style={styles.notificationRight}>
        {!item.isRead && <View style={styles.unreadDot} />}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNotification(item.id)}
        >
          <Ionicons name="trash" size={16} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = (filterType, label) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === filterType && styles.activeFilterButton
      ]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[
        styles.filterButtonText,
        filter === filterType && styles.activeFilterButtonText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>
          {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </Text>
      </View>

      <View style={styles.filterContainer}>
        {renderFilterButton('all', 'All')}
        {renderFilterButton('unread', 'Unread')}
        {renderFilterButton('read', 'Read')}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={markAllAsRead}
        >
          <Ionicons name="checkmark-done" size={16} color="#3498db" />
          <Text style={styles.actionButtonText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getFilteredNotifications()}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off" size={48} color="#bdc3c7" />
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f1f2f6',
  },
  activeFilterButton: {
    backgroundColor: '#3498db',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#ffffff',
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    backgroundColor: '#f8f9fa',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#95a5a6',
  },
  notificationRight: {
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3498db',
    marginBottom: 8,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 8,
  },
});

export default NotificationsScreen;
