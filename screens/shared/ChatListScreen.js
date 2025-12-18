import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { styles } from '../../styles/screens/ChatListScreenStyles';
import { EmptyState } from '../../components/common';

const ChatListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { currentUser, userProfile } = useAuth();

  useEffect(() => {
    if (!currentUser?.uid) return;
    
    const mockChats = [
      {
        id: '1',
        title: 'Nordic Furniture',
        participants: [currentUser.uid, 'forwarder-1'],
        lastMessage: {
          content: 'Thank you for accepting the furniture delivery job!',
          senderId: 'forwarder-1',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
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
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        },
        unreadCount: {
          [currentUser.uid]: 1
        }
      }
    ];

    setChats(mockChats);
  }, [currentUser?.uid]);

  const renderChatItem = ({ item }) => {
    if (!currentUser?.uid) return null;
    
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
    <EmptyState
      icon="chatbubbles-outline"
      title="No Conversations"
      subtitle="Start a conversation by applying to jobs or posting new opportunities"
      iconSize={64}
    />
  );

  if (!currentUser?.uid) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="hourglass-outline"
          title="Loading..."
          iconSize={64}
        />
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

export default ChatListScreen;
