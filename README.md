# MyHaulier Mobile App

A React Native/Expo mobile application for connecting hauliers and freight forwarders in the logistics industry. Built with Firebase backend services for real-time communication and data management.

## 🚛 Features

### For Hauliers
- Browse available transport jobs
- Apply to jobs with cover letters
- Track application status
- Real-time chat with forwarders
- Profile management

### For Freight Forwarders
- Post new transport jobs
- Manage job postings
- Review haulier applications
- Real-time chat with hauliers
- Analytics dashboard

### Shared Features
- Firebase Authentication
- Real-time chat system
- Push notifications
- File sharing capabilities
- Offline support

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation v6
- **Backend**: Firebase
  - Authentication
  - Firestore Database
  - Cloud Storage
  - Cloud Messaging
- **State Management**: React Context API
- **UI Components**: React Native Elements, React Native Paper

## 📱 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Firebase project setup

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd MyHaulierMobile
npm install
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication, Firestore, Storage, and Cloud Messaging

#### Configure Firebase
1. Update `config/firebase.js` with your Firebase configuration:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

#### Set up Firestore Security Rules
Deploy the security rules from `firestore.rules` to your Firebase project:
```bash
firebase deploy --only firestore:rules
```

### 3. Run the Application
```bash
# Start the development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

## 🗄 Database Structure

### Collections

#### Users
```javascript
users/{userId} {
  uid: string,
  email: string,
  name: string,
  userType: 'haulier' | 'forwarder',
  phone: string,
  company: string,
  licenseNumber: string, // for hauliers
  experience: string, // for hauliers
  profileImage: string,
  isVerified: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Jobs
```javascript
jobs/{jobId} {
  title: string,
  description: string,
  location: string,
  budget: number,
  deliveryDate: string,
  duration: string,
  requirements: string[],
  forwarderId: string,
  companyName: string,
  status: 'active' | 'completed' | 'cancelled',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Applications
```javascript
applications/{applicationId} {
  jobId: string,
  haulierId: string,
  forwarderId: string,
  coverLetter: string,
  status: 'pending' | 'accepted' | 'rejected',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Chats
```javascript
chats/{chatId} {
  participants: string[],
  title: string,
  lastMessage: {
    content: string,
    senderId: string,
    timestamp: timestamp
  },
  unreadCount: {
    [userId]: number
  },
  updatedAt: timestamp
}
```

#### Messages
```javascript
messages/{messageId} {
  chatId: string,
  senderId: string,
  content: string,
  type: 'text' | 'image' | 'document',
  timestamp: timestamp
}
```

## 🔐 Security Rules

The app includes comprehensive Firestore security rules that ensure:
- Users can only access their own data
- Hauliers can only apply to jobs
- Forwarders can only manage their own jobs
- Chat participants can only access their conversations

## 📱 App Structure

```
src/
├── components/          # Reusable components
├── contexts/           # React contexts (Auth, etc.)
├── navigation/         # Navigation configuration
├── screens/           # Screen components
│   ├── auth/         # Authentication screens
│   ├── haulier/      # Haulier-specific screens
│   ├── forwarder/    # Forwarder-specific screens
│   └── shared/       # Shared screens
├── config/            # Configuration files
└── styles/           # Global styles
```

## 🚀 Deployment

### Development
```bash
npx expo start
```

### Production Build
```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android
```

### App Store Deployment
1. Configure app.json with proper bundle identifiers
2. Build production versions
3. Submit to App Store and Google Play Store

## 🔧 Configuration

### Environment Variables
Create a `.env` file for sensitive configuration:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

### Push Notifications
Configure push notifications in `app.json`:
```json
{
  "expo": {
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#3498db"
    }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - Authentication system
  - Job posting and application
  - Real-time chat
  - Basic analytics

---

Built with ❤️ for the logistics industry