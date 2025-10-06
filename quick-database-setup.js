// Quick Firebase Database Setup - Bulk Import Script
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyA3hOpBze0kzl2smF7LDEb7En2u0MZla-w",
  authDomain: "myhauliermobile.firebaseapp.com",
  databaseURL: "https://myhauliermobile-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myhauliermobile",
  storageBucket: "myhauliermobile.firebasestorage.app",
  messagingSenderId: "865446996761",
  appId: "1:865446996761:web:e7d45e9bc68b5bff143388",
  measurementId: "G-Z0SCTE3VVL"
};

async function quickSetup() {
  try {
    console.log('🚀 Quick Firebase Database Setup Starting...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // 1. Create Users
    console.log('👥 Creating users...');
    const users = [
      {
        uid: 'demo-haulier',
        email: 'haulier@example.com',
        name: 'John Smith',
        userType: 'haulier',
        phone: '+1234567890',
        company: 'Smith Transport Ltd',
        licenseNumber: 'LT123456',
        experience: '10 years',
        profileImage: '',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fleet: {
          totalTrucks: 5,
          availableTrucks: 3,
          truckTypes: ['Semi-trailer', 'Box truck'],
          trailerTypes: ['Dry van', 'Refrigerated'],
          maxWeight: 40000,
          maxLength: 13.6,
          maxHeight: 4.0,
          specialEquipment: ['Forklift', 'Crane']
        },
        operatingRegions: {
          countries: ['Germany', 'France', 'Netherlands'],
          regions: ['North Rhine-Westphalia', 'Bavaria'],
          specificRoutes: ['Berlin-Munich', 'Hamburg-Frankfurt']
        },
        capabilities: {
          cargoTypes: ['General cargo', 'Refrigerated goods'],
          industries: ['Automotive', 'Food & Beverage'],
          certifications: ['ADR', 'HACCP'],
          languages: ['English', 'German']
        },
        availability: {
          isAvailable: true,
          availableTrucks: 3,
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          workingHours: { start: '08:00', end: '18:00' },
          emergencyAvailable: true,
          weekendWork: false,
          lastUpdated: new Date().toISOString()
        },
        performance: {
          rating: 4.8,
          totalJobs: 150,
          completedJobs: 148,
          onTimeDelivery: 96,
          customerSatisfaction: 4.7
        },
        pricing: {
          baseRate: 2.50,
          currency: 'EUR',
          fuelSurcharge: 0.15,
          tollIncluded: false
        }
      },
      {
        uid: 'demo-forwarder',
        email: 'forwarder@example.com',
        name: 'Maria Garcia',
        userType: 'forwarder',
        phone: '+1234567891',
        company: 'Garcia Logistics GmbH',
        licenseNumber: 'FL987654',
        experience: '8 years',
        profileImage: '',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        clientBase: {
          totalClients: 25,
          activeClients: 20,
          industries: ['Automotive', 'Electronics', 'Fashion'],
          regions: ['Europe', 'Asia', 'North America']
        },
        services: {
          freightForwarding: true,
          customsClearance: true,
          warehousing: true,
          lastMileDelivery: false
        },
        operatingRegions: {
          countries: ['Germany', 'France', 'Italy', 'Spain'],
          regions: ['Central Europe', 'Southern Europe'],
          specificRoutes: ['Munich-Milan', 'Frankfurt-Paris']
        },
        capabilities: {
          cargoTypes: ['General cargo', 'Hazardous goods', 'Oversized cargo'],
          industries: ['Automotive', 'Electronics', 'Fashion'],
          certifications: ['IATA', 'FIATA'],
          languages: ['English', 'German', 'Spanish', 'French']
        },
        performance: {
          rating: 4.9,
          totalShipments: 500,
          completedShipments: 495,
          onTimeDelivery: 98,
          customerSatisfaction: 4.8
        },
        pricing: {
          baseRate: 1.80,
          currency: 'EUR',
          fuelSurcharge: 0.10,
          tollIncluded: true
        }
      }
    ];
    
    for (const user of users) {
      await setDoc(doc(db, 'users', user.uid), user);
      console.log(`✅ Created user: ${user.name} (${user.userType})`);
    }
    
    // 2. Create Partnerships
    console.log('🤝 Creating partnerships...');
    const partnerships = [
      {
        forwarderId: 'demo-forwarder',
        forwarderName: 'Maria Garcia',
        forwarderCompany: 'Garcia Logistics GmbH',
        haulierId: 'demo-haulier',
        haulierName: 'John Smith',
        haulierCompany: 'Smith Transport Ltd',
        status: 'active',
        contractDuration: '12 months',
        trucksNeeded: {
          types: ['Semi-trailer', 'Box truck'],
          quantity: 2,
          specialRequirements: ['ADR certification', 'Refrigerated capability']
        },
        operatingCountries: ['Germany', 'France', 'Netherlands'],
        currentRate: 2.50,
        currency: 'EUR',
        contactPerson: {
          name: 'Maria Garcia',
          email: 'maria@garcialogistics.com',
          phone: '+1234567891'
        },
        location: {
          latitude: 52.5200,
          longitude: 13.4050,
          address: 'Berlin, Germany'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        forwarderId: 'demo-forwarder',
        forwarderName: 'Maria Garcia',
        forwarderCompany: 'Garcia Logistics GmbH',
        haulierId: null,
        haulierName: null,
        haulierCompany: null,
        status: 'seeking_partners',
        contractDuration: '6 months',
        trucksNeeded: {
          types: ['Refrigerated truck'],
          quantity: 1,
          specialRequirements: ['Temperature control', 'HACCP certification']
        },
        operatingCountries: ['France', 'Italy'],
        currentRate: 3.20,
        currency: 'EUR',
        contactPerson: {
          name: 'Maria Garcia',
          email: 'maria@garcialogistics.com',
          phone: '+1234567891'
        },
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          address: 'Paris, France'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    for (const partnership of partnerships) {
      await addDoc(collection(db, 'partnerships'), partnership);
      console.log(`✅ Created partnership: ${partnership.forwarderName} - ${partnership.haulierName || 'Available'}`);
    }
    
    // 3. Create Jobs
    console.log('💼 Creating jobs...');
    const jobs = [
      {
        title: 'Electronics Transport Route',
        description: 'Regular transport of electronics from Copenhagen to Stockholm',
        forwarderId: 'demo-forwarder',
        forwarderName: 'Maria Garcia',
        status: 'open',
        location: {
          pickup: 'Copenhagen, Denmark',
          delivery: 'Stockholm, Sweden',
          coordinates: { latitude: 55.6761, longitude: 12.5683 }
        },
        requirements: {
          truckTypes: ['dry_van', 'reefer'],
          specialEquipment: ['temperature_control'],
          certifications: ['ADR'],
          experience: '2+ years'
        },
        trucksNeeded: {
          types: ['Dry Van', 'Reefer'],
          quantity: '5-8 trucks',
          specialRequirements: ['Temperature Control', 'GPS Tracking']
        },
        operatingCountries: ['Denmark', 'Sweden', 'Norway'],
        rate: 2.50,
        currency: 'EUR',
        contractDuration: '12 months',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    for (const job of jobs) {
      await addDoc(collection(db, 'jobs'), job);
      console.log(`✅ Created job: ${job.title}`);
    }
    
    // 4. Create Applications
    console.log('📝 Creating applications...');
    const applications = [
      {
        haulierId: 'demo-haulier',
        haulierName: 'John Smith',
        haulierCompany: 'Smith Transport Ltd',
        forwarderId: 'demo-forwarder',
        forwarderName: 'Maria Garcia',
        forwarderCompany: 'Garcia Logistics GmbH',
        jobId: null,
        status: 'pending',
        message: 'Interested in this partnership opportunity. We have 3 available trucks and extensive experience in electronics transport.',
        proposedRate: 2.30,
        currency: 'EUR',
        availableTrucks: 3,
        estimatedStartDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    for (const application of applications) {
      await addDoc(collection(db, 'applications'), application);
      console.log(`✅ Created application: ${application.haulierName} → ${application.forwarderName}`);
    }
    
    // 5. Create Chat
    console.log('💬 Creating chat...');
    const chat = {
      participants: ['demo-haulier', 'demo-forwarder'],
      lastMessage: 'Thank you for your interest in our partnership opportunity. Let\'s discuss the details.',
      lastMessageTime: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const chatRef = await addDoc(collection(db, 'chats'), chat);
    console.log(`✅ Created chat: ${chatRef.id}`);
    
    // 6. Create Messages
    console.log('📨 Creating messages...');
    const messages = [
      {
        chatId: chatRef.id,
        senderId: 'demo-haulier',
        senderName: 'John Smith',
        content: 'Hello Maria, I\'m interested in your partnership opportunity. We have 3 available trucks and extensive experience in electronics transport.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        type: 'text'
      },
      {
        chatId: chatRef.id,
        senderId: 'demo-forwarder',
        senderName: 'Maria Garcia',
        content: 'Thank you for your interest, John. Let\'s schedule a call to discuss the details. What\'s your availability this week?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        type: 'text'
      }
    ];
    
    for (const message of messages) {
      await addDoc(collection(db, 'messages'), message);
      console.log(`✅ Created message: ${message.senderName}`);
    }
    
    console.log('🎉 Database setup completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Partnerships: ${partnerships.length}`);
    console.log(`   - Jobs: ${jobs.length}`);
    console.log(`   - Applications: ${applications.length}`);
    console.log(`   - Chats: 1`);
    console.log(`   - Messages: ${messages.length}`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    return false;
  }
}

// Run the setup
quickSetup();
