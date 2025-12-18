// Chat-skærm - Viser chat-konversation mellem to brugere
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useAuth } from '../../contexts/FallbackAuthContext';
import { MessageBubble, MessageInput } from '../../components/chat';
import { LoadingSpinner, EmptyState } from '../../components/common';
import { styles } from '../../styles/screens/ChatScreenStyles';

const ChatScreen = ({ route, navigation }) => {
  const { chatId, otherParticipant, chatTitle } = route.params;
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (currentUser !== undefined) {
      setAuthLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    navigation.setOptions({ title: chatTitle });
    
    const mockMessages = [
      {
        id: '1',
        chatId: chatId,
        senderId: otherParticipant,
        content: 'Hello! Thank you for your interest in the transport job.',
        type: 'text',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        chatId: chatId,
        senderId: currentUser?.uid || 'current-user',
        content: 'Hi! I have 5 years of experience in transport.',
        type: 'text',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    setMessages(mockMessages);
  }, [chatId, currentUser]);

  const markMessagesAsRead = async () => {
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    if (!currentUser || !currentUser.uid) {
      Alert.alert('Error', 'You must be signed in to send messages');
      return;
    }

    setLoading(true);
    try {
      const newMsg = {
        id: Date.now().toString(),
        chatId,
        senderId: currentUser.uid,
        content: newMessage.trim(),
        type: 'text',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isOwnMessage = currentUser && item.senderId === currentUser.uid;
    return <MessageBubble message={item} isOwnMessage={isOwnMessage} />;
  };

  const renderEmptyState = () => (
    <EmptyState
      icon="chatbubbles-outline"
      title="Start the conversation"
      iconSize={48}
    />
  );

  if (authLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Please sign in to access chat</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
        ListEmptyComponent={renderEmptyState}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <MessageInput
        value={newMessage}
        onChangeText={setNewMessage}
        onSend={sendMessage}
        loading={loading}
        disabled={!currentUser}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
