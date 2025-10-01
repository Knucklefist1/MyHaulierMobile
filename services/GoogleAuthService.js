import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

class GoogleAuthService {
  constructor() {
    this.configureGoogleSignIn();
  }

  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: '865446996761-your-web-client-id.apps.googleusercontent.com', // TODO: Replace with your actual web client ID from Firebase Console
      offlineAccess: true,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
    });
  }

  async signInWithGoogle() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      const userCredential = await signInWithCredential(auth, googleCredential);
      
      return {
        success: true,
        user: userCredential.user,
        error: null
      };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      return {
        success: false,
        user: null,
        error: error.message
      };
    }
  }

  async signOut() {
    try {
      await GoogleSignin.signOut();
      return { success: true, error: null };
    } catch (error) {
      console.error('Google Sign-Out Error:', error);
      return { success: false, error: error.message };
    }
  }

  async isSignedIn() {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      return isSignedIn;
    } catch (error) {
      console.error('Check Sign-In Status Error:', error);
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      return userInfo;
    } catch (error) {
      console.error('Get Current User Error:', error);
      return null;
    }
  }
}

export default new GoogleAuthService();
