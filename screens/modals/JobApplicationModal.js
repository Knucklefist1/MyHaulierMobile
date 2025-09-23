import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, textStyles, components } from '../../styles/designSystem';

const JobApplicationModal = ({ visible, onClose, job, onSubmit }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!coverLetter.trim()) {
      Alert.alert('Error', 'Please write a cover letter');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        jobId: job.id,
        coverLetter: coverLetter.trim(),
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      
      Alert.alert(
        'Application Submitted',
        'Your application has been submitted successfully!',
        [{ text: 'OK', onPress: onClose }]
      );
      setCoverLetter('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.title}>Apply for Job</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{job?.title}</Text>
            <Text style={styles.companyName}>{job?.companyName}</Text>
            <Text style={styles.jobDescription}>{job?.description}</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Cover Letter</Text>
            <Text style={styles.sectionSubtitle}>
              Tell the forwarder why you're the right fit for this job
            </Text>
            
            <TextInput
              style={styles.coverLetterInput}
              placeholder="Write your cover letter here..."
              value={coverLetter}
              onChangeText={setCoverLetter}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              maxLength={1000}
            />
            
            <Text style={styles.characterCount}>
              {coverLetter.length}/1000 characters
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  closeButton: {
    padding: spacing[2],
  },
  title: {
    ...textStyles.h3,
  },
  placeholder: {
    width: spacing[10],
  },
  content: {
    flex: 1,
    padding: spacing[5],
  },
  jobInfo: {
    ...components.card,
    marginBottom: spacing[5],
  },
  jobTitle: {
    ...textStyles.h3,
    marginBottom: spacing[2],
  },
  companyName: {
    ...textStyles.caption,
    marginBottom: spacing[3],
  },
  jobDescription: {
    ...textStyles.body,
  },
  formSection: {
    ...components.card,
  },
  sectionTitle: {
    ...textStyles.h3,
    marginBottom: spacing[1],
  },
  sectionSubtitle: {
    ...textStyles.caption,
    marginBottom: spacing[4],
  },
  coverLetterInput: {
    ...components.input,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    ...textStyles.caption,
    textAlign: 'right',
    marginTop: spacing[2],
  },
  footer: {
    padding: spacing[5],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  submitButton: {
    ...components.button.primary,
    paddingVertical: spacing[4],
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
});

export default JobApplicationModal;
