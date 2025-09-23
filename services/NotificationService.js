import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  constructor() {
    this.expoPushToken = null;
    this.notificationListener = null;
    this.responseListener = null;
  }

  // Initialize push notifications
  async initialize() {
    try {
      // Check if device supports push notifications
      if (!Device.isDevice) {
        console.log('Must use physical device for Push Notifications');
        return false;
      }

      // Register for push notifications
      const token = await this.registerForPushNotificationsAsync();
      this.expoPushToken = token;
      
      // Set up notification listeners
      this.setupNotificationListeners();
      
      return true;
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return false;
    }
  }

  // Register for push notifications
  async registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    return token;
  }

  // Set up notification listeners
  setupNotificationListeners() {
    // Handle notifications received while app is running
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
      this.handleNotificationReceived(notification);
    });

    // Handle notification responses (when user taps notification)
    this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      this.handleNotificationResponse(response);
    });
  }

  // Handle notification received
  handleNotificationReceived(notification) {
    const { title, body, data } = notification.request.content;
    
    // You can customize how notifications are handled here
    console.log('Received notification:', { title, body, data });
  }

  // Handle notification response (user tapped notification)
  handleNotificationResponse(response) {
    const { notification } = response;
    const { data } = notification.request.content;
    
    // Navigate based on notification data
    if (data?.type === 'job_application') {
      // Navigate to applications screen
      console.log('Navigate to applications');
    } else if (data?.type === 'new_message') {
      // Navigate to chat screen
      console.log('Navigate to chat');
    } else if (data?.type === 'job_update') {
      // Navigate to jobs screen
      console.log('Navigate to jobs');
    }
  }

  // Send local notification
  async sendLocalNotification(title, body, data = {}) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger: null, // Show immediately
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  }

  // Schedule notification for later
  async scheduleNotification(title, body, triggerDate, data = {}) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: triggerDate,
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  // Get push token
  getPushToken() {
    return this.expoPushToken;
  }

  // Clean up listeners
  cleanup() {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;

// Notification types for the app
export const NOTIFICATION_TYPES = {
  JOB_APPLICATION: 'job_application',
  NEW_MESSAGE: 'new_message',
  JOB_UPDATE: 'job_update',
  APPLICATION_STATUS: 'application_status',
  SYSTEM_UPDATE: 'system_update'
};

// Helper functions for common notifications
export const NotificationHelpers = {
  // Notify about new job application
  async notifyNewApplication(forwarderName, jobTitle) {
    await notificationService.sendLocalNotification(
      'New Job Application',
      `${forwarderName} applied for "${jobTitle}"`,
      { type: NOTIFICATION_TYPES.JOB_APPLICATION }
    );
  },

  // Notify about new message
  async notifyNewMessage(senderName, messagePreview) {
    await notificationService.sendLocalNotification(
      `New message from ${senderName}`,
      messagePreview,
      { type: NOTIFICATION_TYPES.NEW_MESSAGE }
    );
  },

  // Notify about application status change
  async notifyApplicationStatus(jobTitle, status) {
    await notificationService.sendLocalNotification(
      'Application Update',
      `Your application for "${jobTitle}" has been ${status}`,
      { type: NOTIFICATION_TYPES.APPLICATION_STATUS }
    );
  },

  // Notify about new job posting
  async notifyNewJob(jobTitle, location) {
    await notificationService.sendLocalNotification(
      'New Job Available',
      `${jobTitle} in ${location}`,
      { type: NOTIFICATION_TYPES.JOB_UPDATE }
    );
  }
};
