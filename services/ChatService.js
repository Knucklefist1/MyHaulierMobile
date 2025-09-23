import { OfflineStorage } from '../utils/storage';
import notificationService, { NotificationHelpers } from './NotificationService';

class ChatService {
  constructor() {
    this.chats = new Map();
    this.messages = new Map();
    this.listeners = new Map();
    this.isOnline = true;
  }

  // Initialize chat service
  async initialize() {
    try {
      // Load offline chats
      const offlineChats = await OfflineStorage.getChats();
      offlineChats.forEach(chat => {
        this.chats.set(chat.id, chat);
      });
      
      return true;
    } catch (error) {
      console.error('Error initializing chat service:', error);
      return false;
    }
  }

  // Create or get existing chat
  async createChat(participants, title = null) {
    try {
      const chatId = this.generateChatId(participants);
      
      if (this.chats.has(chatId)) {
        return this.chats.get(chatId);
      }

      const newChat = {
        id: chatId,
        participants,
        title: title || this.generateChatTitle(participants),
        lastMessage: null,
        unreadCount: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Initialize unread count for each participant
      participants.forEach(participantId => {
        newChat.unreadCount[participantId] = 0;
      });

      this.chats.set(chatId, newChat);
      await this.saveChatsOffline();
      
      return newChat;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  }

  // Send message
  async sendMessage(chatId, senderId, content, type = 'text', attachments = []) {
    try {
      const message = {
        id: this.generateMessageId(),
        chatId,
        senderId,
        content,
        type,
        attachments,
        timestamp: new Date(),
        status: 'sent',
      };

      // Add message to chat
      if (!this.messages.has(chatId)) {
        this.messages.set(chatId, []);
      }
      this.messages.get(chatId).push(message);

      // Update chat
      const chat = this.chats.get(chatId);
      if (chat) {
        chat.lastMessage = {
          content,
          senderId,
          timestamp: message.timestamp,
        };
        chat.updatedAt = new Date();
        
        // Increment unread count for other participants
        chat.participants.forEach(participantId => {
          if (participantId !== senderId) {
            chat.unreadCount[participantId] = (chat.unreadCount[participantId] || 0) + 1;
          }
        });

        this.chats.set(chatId, chat);
      }

      // Save offline
      await this.saveChatsOffline();
      await this.saveMessagesOffline(chatId);

      // Send push notification to other participants
      await this.sendMessageNotification(chat, message);

      // Notify listeners
      this.notifyListeners(chatId, 'message', message);

      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Get messages for a chat
  async getMessages(chatId, limit = 50) {
    try {
      if (!this.messages.has(chatId)) {
        return [];
      }

      const messages = this.messages.get(chatId);
      return messages.slice(-limit);
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }

  // Get all chats for a user
  async getUserChats(userId) {
    try {
      const userChats = Array.from(this.chats.values())
        .filter(chat => chat.participants.includes(userId))
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      return userChats;
    } catch (error) {
      console.error('Error getting user chats:', error);
      return [];
    }
  }

  // Mark messages as read
  async markMessagesAsRead(chatId, userId) {
    try {
      const chat = this.chats.get(chatId);
      if (chat) {
        chat.unreadCount[userId] = 0;
        this.chats.set(chatId, chat);
        await this.saveChatsOffline();
        
        this.notifyListeners(chatId, 'read', { userId });
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }

  // Listen to chat updates
  listenToChat(chatId, callback) {
    if (!this.listeners.has(chatId)) {
      this.listeners.set(chatId, []);
    }
    this.listeners.get(chatId).push(callback);

    // Return unsubscribe function
    return () => {
      const chatListeners = this.listeners.get(chatId);
      if (chatListeners) {
        const index = chatListeners.indexOf(callback);
        if (index > -1) {
          chatListeners.splice(index, 1);
        }
      }
    };
  }

  // Notify listeners
  notifyListeners(chatId, event, data) {
    const chatListeners = this.listeners.get(chatId);
    if (chatListeners) {
      chatListeners.forEach(callback => {
        try {
          callback(event, data);
        } catch (error) {
          console.error('Error in chat listener:', error);
        }
      });
    }
  }

  // Send message notification
  async sendMessageNotification(chat, message) {
    try {
      // Get sender name (in real app, this would come from user data)
      const senderName = 'User';
      
      // Send notification to other participants
      chat.participants.forEach(participantId => {
        if (participantId !== message.senderId) {
          NotificationHelpers.notifyNewMessage(senderName, message.content);
        }
      });
    } catch (error) {
      console.error('Error sending message notification:', error);
    }
  }

  // Save chats offline
  async saveChatsOffline() {
    try {
      const chatsArray = Array.from(this.chats.values());
      await OfflineStorage.saveChats(chatsArray);
    } catch (error) {
      console.error('Error saving chats offline:', error);
    }
  }

  // Save messages offline
  async saveMessagesOffline(chatId) {
    try {
      if (this.messages.has(chatId)) {
        // In a real app, you'd save messages to a specific storage key
        // For now, we'll just log it
        console.log('Saving messages offline for chat:', chatId);
      }
    } catch (error) {
      console.error('Error saving messages offline:', error);
    }
  }

  // Generate chat ID
  generateChatId(participants) {
    const sortedParticipants = participants.sort();
    return `chat_${sortedParticipants.join('_')}`;
  }

  // Generate chat title
  generateChatTitle(participants) {
    // In a real app, you'd get user names from user data
    return `Chat with ${participants.length} participants`;
  }

  // Generate message ID
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get unread count for user
  async getUnreadCount(userId) {
    try {
      const userChats = await this.getUserChats(userId);
      let totalUnread = 0;
      
      userChats.forEach(chat => {
        totalUnread += chat.unreadCount[userId] || 0;
      });
      
      return totalUnread;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  }

  // Search messages
  async searchMessages(query, chatId = null) {
    try {
      let messagesToSearch = [];
      
      if (chatId) {
        messagesToSearch = this.messages.get(chatId) || [];
      } else {
        // Search all messages
        for (const chatMessages of this.messages.values()) {
          messagesToSearch.push(...chatMessages);
        }
      }
      
      const results = messagesToSearch.filter(message =>
        message.content.toLowerCase().includes(query.toLowerCase())
      );
      
      return results;
    } catch (error) {
      console.error('Error searching messages:', error);
      return [];
    }
  }

  // Delete message
  async deleteMessage(chatId, messageId) {
    try {
      if (this.messages.has(chatId)) {
        const messages = this.messages.get(chatId);
        const messageIndex = messages.findIndex(msg => msg.id === messageId);
        
        if (messageIndex > -1) {
          messages.splice(messageIndex, 1);
          await this.saveMessagesOffline(chatId);
          this.notifyListeners(chatId, 'message_deleted', { messageId });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error deleting message:', error);
      return false;
    }
  }

  // Set online/offline status
  setOnlineStatus(isOnline) {
    this.isOnline = isOnline;
  }

  // Get online status
  getOnlineStatus() {
    return this.isOnline;
  }
}

// Create singleton instance
const chatService = new ChatService();

export default chatService;
