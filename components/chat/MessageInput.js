import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../styles/designSystem';

const MessageInput = ({ value, onChangeText, onSend, loading, disabled }) => {
  const canSend = value.trim() && !loading && !disabled;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder="Type a message..."
        placeholderTextColor={colors.mediumGray}
        multiline
        maxLength={500}
      />
      <TouchableOpacity
        style={[styles.sendButton, !canSend && styles.disabledButton]}
        onPress={onSend}
        disabled={!canSend}
      >
        <Ionicons 
          name="send" 
          size={20} 
          color={canSend ? colors.skyBlue : colors.mediumGray} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 20,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    marginRight: spacing[3],
    maxHeight: 100,
    fontSize: typography.sizes.base,
    color: colors.darkGray,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.borderGray,
  },
});

export default MessageInput;

