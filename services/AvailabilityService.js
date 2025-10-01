// Mock availability service for development
class AvailabilityService {
  async getAvailableHauliers() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return empty array for now - will be populated by mock data in MatchingScreen
    return [];
  }

  async getHaulierAvailability(haulierId) {
    // Mock haulier availability data
    return {
      isAvailable: true,
      availableTrucks: 3,
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      workingHours: { start: '08:00', end: '17:00' },
      emergencyAvailable: true,
      weekendWork: false,
      lastUpdated: new Date().toISOString()
    };
  }

  async updateHaulierAvailability(haulierId, availabilityData) {
    // Mock update availability
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  }
}

export default new AvailabilityService();