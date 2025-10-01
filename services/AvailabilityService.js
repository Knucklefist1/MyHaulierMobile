// Availability Service
// Manages haulier availability data for matching

import AsyncStorage from '@react-native-async-storage/async-storage';

class AvailabilityService {
  constructor() {
    this.availabilityKey = 'haulier_availability';
  }

  // Save haulier availability
  async saveAvailability(haulierId, availabilityData) {
    try {
      const existingData = await this.getAllAvailability();
      existingData[haulierId] = {
        ...availabilityData,
        lastUpdated: new Date().toISOString(),
        haulierId: haulierId
      };
      
      await AsyncStorage.setItem(this.availabilityKey, JSON.stringify(existingData));
      return true;
    } catch (error) {
      console.error('Error saving availability:', error);
      return false;
    }
  }

  // Get all haulier availability data
  async getAllAvailability() {
    try {
      const data = await AsyncStorage.getItem(this.availabilityKey);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting availability:', error);
      return {};
    }
  }

  // Get specific haulier availability
  async getHaulierAvailability(haulierId) {
    try {
      const allData = await this.getAllAvailability();
      return allData[haulierId] || null;
    } catch (error) {
      console.error('Error getting haulier availability:', error);
      return null;
    }
  }

  // Get all available hauliers (for matching)
  async getAvailableHauliers() {
    try {
      const allData = await this.getAllAvailability();
      const availableHauliers = [];
      
      for (const [haulierId, availability] of Object.entries(allData)) {
        if (availability.isAvailable && availability.availableTrucks > 0) {
          // Convert availability data to haulier profile format
          const haulierProfile = this.convertAvailabilityToProfile(haulierId, availability);
          availableHauliers.push(haulierProfile);
        }
      }
      
      return availableHauliers;
    } catch (error) {
      console.error('Error getting available hauliers:', error);
      return [];
    }
  }

  // Convert availability data to haulier profile format
  convertAvailabilityToProfile(haulierId, availability) {
    return {
      uid: haulierId,
      name: availability.name || 'Demo Haulier',
      company: availability.company || 'Demo Transport Company',
      phone: availability.phone || '+45 12 34 56 78',
      fleet: {
        totalTrucks: availability.totalTrucks || 10,
        availableTrucks: availability.availableTrucks || 0,
        truckTypes: availability.truckTypes || ['dry_van'],
        trailerTypes: availability.trailerTypes || ['standard'],
        maxWeight: availability.maxWeight || 20,
        maxLength: availability.maxLength || 13.6,
        maxHeight: availability.maxHeight || 4.0,
        specialEquipment: availability.specialEquipment || []
      },
      operatingRegions: {
        countries: availability.operatingCountries || ['DK'],
        regions: availability.regions || ['Denmark'],
        specificRoutes: availability.specificRoutes || []
      },
      capabilities: {
        cargoTypes: availability.cargoTypes || ['general'],
        industries: availability.industries || ['general'],
        certifications: availability.certifications || ['ADR'],
        languages: availability.languages || ['en', 'da']
      },
      availability: {
        isAvailable: availability.isAvailable || false,
        availableTrucks: availability.availableTrucks || 0,
        workingDays: availability.workingDays || ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        workingHours: availability.workingHours || { start: '08:00', end: '17:00' },
        emergencyAvailable: availability.emergencyAvailable || false,
        weekendWork: availability.weekendWork || false,
        lastUpdated: availability.lastUpdated || new Date().toISOString()
      },
      performance: {
        rating: 4.5, // Default rating
        totalJobs: 50, // Default stats
        completedJobs: 48,
        onTimeDelivery: 95,
        customerSatisfaction: 90
      },
      pricing: {
        baseRate: availability.baseRate || 8.0,
        currency: availability.currency || 'DKK',
        fuelSurcharge: availability.fuelSurcharge || 0.15,
        tollIncluded: availability.tollIncluded || true
      }
    };
  }

  // Clear all availability data
  async clearAllAvailability() {
    try {
      await AsyncStorage.removeItem(this.availabilityKey);
      return true;
    } catch (error) {
      console.error('Error clearing availability:', error);
      return false;
    }
  }
}

export default new AvailabilityService();
