import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
// import { ref, onValue, off } from 'firebase/database';
// import { rtdb } from '../../config/firebase';

const ChatListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { currentUser, userProfile } = useAuth();

  useEffect(() => {
    if (!currentUser?.uid) return; // Wait for currentUser to be available
    
    // Mock chats data for now (Firebase disabled due to auth issues)
    const mockChats = [
      {
        id: '1',
        title: 'Nordic Furniture',
        participants: [currentUser.uid, 'forwarder-1'],
        lastMessage: {
          content: 'Thank you for accepting the furniture delivery job!',
          senderId: 'forwarder-1',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        },
        unreadCount: {
          [currentUser.uid]: 0
        }
      },
      {
        id: '2',
        title: 'TechCorp Denmark',
        participants: [currentUser.uid, 'forwarder-2'],
        lastMessage: {
          content: 'When can you start the electronics transport?',
          senderId: 'forwarder-2',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        },
        unreadCount: {
          [currentUser.uid]: 1
        }
      }
    ];

    setChats(mockChats);
  }, [currentUser?.uid]);

  const renderChatItem = ({ item }) => {
    if (!currentUser?.uid) return null; // Don't render if no currentUser
    
    const otherParticipant = item.participants.find(id => id !== currentUser.uid);
    const isUnread = item.unreadCount && item.unreadCount[currentUser.uid] > 0;

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatConversation', { 
          chatId: item.id,
          otherParticipant: otherParticipant,
          chatTitle: item.title || 'Chat'
        })}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color="#7f8c8d" />
          </View>
          {isUnread && <View style={styles.unreadBadge} />}
        </View>

        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle} numberOfLines={1}>
              {item.title || 'Chat'}
            </Text>
            <Text style={styles.timestamp}>
              {item.lastMessage?.timestamp ? 
                new Date(item.lastMessage.timestamp).toLocaleDateString() : 
                'Now'
              }
            </Text>
          </View>
          
          <Text 
            style={[styles.lastMessage, isUnread && styles.unreadMessage]} 
            numberOfLines={1}
          >
            {item.lastMessage?.content || 'No messages yet'}
          </Text>
        </View>

        {isUnread && (
          <View style={styles.unreadCount}>
            <Text style={styles.unreadCountText}>
              {item.unreadCount[currentUser.uid]}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="chatbubbles-outline" size={64} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>No Conversations</Text>
      <Text style={styles.emptySubtitle}>
        Start a conversation by applying to jobs or posting new opportunities
      </Text>
    </View>
  );

  // Show loading state if currentUser is not available yet
  if (!currentUser?.uid) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e74c3c',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: '#95a5a6',
  },
  lastMessage: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  unreadCount: {
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
  },
});

export default ChatListScreen;
