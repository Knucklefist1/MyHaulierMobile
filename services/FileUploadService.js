import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

class FileUploadService {
  constructor() {
    this.maxImageSize = 5 * 1024 * 1024; // 5MB
    this.maxDocumentSize = 10 * 1024 * 1024; // 10MB
    this.allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    this.allowedDocumentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
  }

  // Request permissions
  async requestPermissions() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need camera roll permissions to upload images.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }

  // Pick image from gallery
  async pickImage() {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        
        // Check file size
        if (asset.fileSize > this.maxImageSize) {
          Alert.alert('File Too Large', 'Image must be smaller than 5MB');
          return null;
        }

        return {
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName || `image_${Date.now()}.jpg`,
          size: asset.fileSize,
          width: asset.width,
          height: asset.height,
        };
      }
      return null;
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
      return null;
    }
  }

  // Take photo with camera
  async takePhoto() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need camera permissions to take photos.');
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        
        // Check file size
        if (asset.fileSize > this.maxImageSize) {
          Alert.alert('File Too Large', 'Image must be smaller than 5MB');
          return null;
        }

        return {
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName || `photo_${Date.now()}.jpg`,
          size: asset.fileSize,
          width: asset.width,
          height: asset.height,
        };
      }
      return null;
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
      return null;
    }
  }

  // Pick document
  async pickDocument() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'text/plain'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        
        // Check file size
        if (asset.size > this.maxDocumentSize) {
          Alert.alert('File Too Large', 'Document must be smaller than 10MB');
          return null;
        }

        return {
          uri: asset.uri,
          type: asset.mimeType,
          name: asset.name,
          size: asset.size,
        };
      }
      return null;
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
      return null;
    }
  }

  // Upload file to mock storage (simulate Firebase Storage)
  async uploadFile(file, path = 'uploads') {
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock URL
      const mockUrl = `https://mock-storage.com/${path}/${Date.now()}_${file.name}`;
      
      return {
        url: mockUrl,
        path: `${path}/${file.name}`,
        size: file.size,
        type: file.type,
        name: file.name,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  // Upload multiple files
  async uploadFiles(files, path = 'uploads') {
    try {
      const uploadPromises = files.map(file => this.uploadFile(file, path));
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw new Error('Failed to upload files');
    }
  }

  // Get file info
  async getFileInfo(uri) {
    try {
      const info = await FileSystem.getInfoAsync(uri);
      return info;
    } catch (error) {
      console.error('Error getting file info:', error);
      return null;
    }
  }

  // Delete file (mock implementation)
  async deleteFile(url) {
    try {
      // Simulate delete delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  // Show file picker options
  showFilePickerOptions() {
    return new Promise((resolve) => {
      Alert.alert(
        'Select File',
        'Choose how you want to add a file',
        [
          {
            text: 'Camera',
            onPress: async () => {
              const result = await this.takePhoto();
              resolve(result);
            },
          },
          {
            text: 'Gallery',
            onPress: async () => {
              const result = await this.pickImage();
              resolve(result);
            },
          },
          {
            text: 'Document',
            onPress: async () => {
              const result = await this.pickDocument();
              resolve(result);
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(null),
          },
        ]
      );
    });
  }
}

// Create singleton instance
const fileUploadService = new FileUploadService();

export default fileUploadService;
