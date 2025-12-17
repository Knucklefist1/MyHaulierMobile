import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/designSystem';

const MessageBubble = ({ message, isOwnMessage }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Now';
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View style={[
      styles.messageContainer,
      isOwnMessage ? styles.ownMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble,
        isOwnMessage ? styles.ownBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.messageText,
          isOwnMessage ? styles.ownMessageText : styles.otherMessageText
        ]}>
          {message.content}
        </Text>
        <Text style={[
          styles.messageTime,
          isOwnMessage ? styles.ownMessageTime : styles.otherMessageTime
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: spacing[3],
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: 20,
  },
  ownBubble: {
    backgroundColor: colors.skyBlue,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    ...shadows.sm,
  },
  messageText: {
    fontSize: typography.sizes.base,
    lineHeight: 20,
  },
  ownMessageText: {
    color: colors.white,
  },
  otherMessageText: {
    color: colors.darkGray,
  },
  messageTime: {
    fontSize: typography.sizes.xs,
    marginTop: spacing[1],
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: colors.mediumGray,
  },
});

export default MessageBubble;

