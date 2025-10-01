// MyHaulier Matching Service
// Intelligent matching between hauliers and freight forwarders

class MatchingService {
  constructor() {
    this.matchCache = new Map();
    this.matchPreferences = new Map();
  }

  // Enhanced haulier profile structure
  createHaulierProfile(profileData) {
    return {
      // Basic info
      uid: profileData.uid,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      company: profileData.company,
      
      // Fleet information
      fleet: {
        totalTrucks: profileData.fleet?.totalTrucks || 0,
        availableTrucks: profileData.fleet?.availableTrucks || 0,
        truckTypes: profileData.fleet?.truckTypes || [], // ['dry_van', 'reefer', 'flatbed', 'container']
        trailerTypes: profileData.fleet?.trailerTypes || [], // ['standard', 'extendable', 'low_loader']
        maxWeight: profileData.fleet?.maxWeight || 0, // in tons
        maxLength: profileData.fleet?.maxLength || 0, // in meters
        maxHeight: profileData.fleet?.maxHeight || 0, // in meters
        specialEquipment: profileData.fleet?.specialEquipment || [] // ['crane', 'forklift', 'ramp']
      },
      
      // Operating regions
      operatingRegions: {
        countries: profileData.operatingRegions?.countries || [], // ['DK', 'SE', 'NO', 'DE']
        regions: profileData.operatingRegions?.regions || [], // ['Nordic', 'EU', 'Scandinavia']
        specificRoutes: profileData.operatingRegions?.specificRoutes || [] // ['Copenhagen-Aarhus', 'Stockholm-Oslo']
      },
      
      // Capabilities and specializations
      capabilities: {
        cargoTypes: profileData.capabilities?.cargoTypes || [], // ['general', 'fragile', 'hazardous', 'temperature_controlled']
        industries: profileData.capabilities?.industries || [], // ['automotive', 'food', 'electronics', 'furniture']
        certifications: profileData.capabilities?.certifications || [], // ['ADR', 'ISO', 'GDP']
        languages: profileData.capabilities?.languages || ['en'] // ['en', 'da', 'sv', 'no', 'de']
      },
      
      // Availability and preferences
      availability: {
        isAvailable: profileData.availability?.isAvailable || true,
        availableTrucks: profileData.availability?.availableTrucks || 0,
        workingDays: profileData.availability?.workingDays || ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        workingHours: profileData.availability?.workingHours || { start: '08:00', end: '17:00' },
        emergencyAvailable: profileData.availability?.emergencyAvailable || false,
        weekendWork: profileData.availability?.weekendWork || false,
        lastUpdated: profileData.availability?.lastUpdated || new Date().toISOString()
      },
      
      // Performance metrics
      performance: {
        rating: profileData.performance?.rating || 0,
        totalJobs: profileData.performance?.totalJobs || 0,
        completedJobs: profileData.performance?.completedJobs || 0,
        onTimeDelivery: profileData.performance?.onTimeDelivery || 0, // percentage
        customerSatisfaction: profileData.performance?.customerSatisfaction || 0 // percentage
      },
      
      // Pricing
      pricing: {
        baseRate: profileData.pricing?.baseRate || 0, // per km
        currency: profileData.pricing?.currency || 'DKK',
        fuelSurcharge: profileData.pricing?.fuelSurcharge || 0,
        tollIncluded: profileData.pricing?.tollIncluded || false
      },
      
      // Contact preferences
      contactPreferences: {
        preferredContactMethod: profileData.contactPreferences?.preferredContactMethod || 'phone',
        responseTime: profileData.contactPreferences?.responseTime || 'within_24h',
        timeZone: profileData.contactPreferences?.timeZone || 'Europe/Copenhagen'
      },
      
      // Timestamps
      createdAt: profileData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
  }

  // Enhanced job requirements structure
  createJobRequirements(jobData) {
    return {
      // Basic job info
      jobId: jobData.jobId,
      title: jobData.title,
      description: jobData.description,
      forwarderId: jobData.forwarderId,
      
      // Transport requirements
      transport: {
        cargoType: jobData.transport?.cargoType || 'general',
        weight: jobData.transport?.weight || 0, // in tons
        dimensions: {
          length: jobData.transport?.dimensions?.length || 0,
          width: jobData.transport?.dimensions?.width || 0,
          height: jobData.transport?.dimensions?.height || 0
        },
        specialRequirements: jobData.transport?.specialRequirements || [], // ['temperature_controlled', 'hazardous', 'fragile']
        handlingRequirements: jobData.transport?.handlingRequirements || [] // ['crane', 'forklift', 'special_equipment']
      },
      
      // Route requirements
      route: {
        pickupLocation: jobData.route?.pickupLocation || '',
        deliveryLocation: jobData.route?.deliveryLocation || '',
        countries: jobData.route?.countries || [], // ['DK', 'SE']
        distance: jobData.route?.distance || 0, // in km
        estimatedDuration: jobData.route?.estimatedDuration || 0 // in hours
      },
      
      // Timing requirements
      timing: {
        pickupDate: jobData.timing?.pickupDate || '',
        deliveryDate: jobData.timing?.deliveryDate || '',
        flexibility: jobData.timing?.flexibility || 'strict', // 'strict', 'flexible', 'very_flexible'
        workingDays: jobData.timing?.workingDays || ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      },
      
      // Budget and pricing
      budget: {
        maxBudget: jobData.budget?.maxBudget || 0,
        currency: jobData.budget?.currency || 'DKK',
        paymentTerms: jobData.budget?.paymentTerms || 'net_30',
        fuelSurcharge: jobData.budget?.fuelSurcharge || 'included'
      },
      
      // Haulier requirements
      haulierRequirements: {
        minRating: jobData.haulierRequirements?.minRating || 0,
        minExperience: jobData.haulierRequirements?.minExperience || 0, // in years
        requiredCertifications: jobData.haulierRequirements?.requiredCertifications || [],
        requiredLanguages: jobData.haulierRequirements?.requiredLanguages || ['en'],
        preferredCountries: jobData.haulierRequirements?.preferredCountries || [],
        maxDistanceFromRoute: jobData.haulierRequirements?.maxDistanceFromRoute || 50 // in km
      },
      
      // Timestamps
      createdAt: jobData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Intelligent matching algorithm
  findMatches(jobRequirements, haulierProfiles) {
    const matches = [];
    
    for (const haulier of haulierProfiles) {
      const matchScore = this.calculateMatchScore(jobRequirements, haulier);
      
      if (matchScore.totalScore > 0) {
        matches.push({
          haulier,
          matchScore,
          matchReasons: this.getMatchReasons(jobRequirements, haulier),
          compatibility: this.calculateCompatibility(jobRequirements, haulier)
        });
      }
    }
    
    // Sort by match score (highest first)
    return matches.sort((a, b) => b.matchScore.totalScore - a.matchScore.totalScore);
  }

  // Calculate comprehensive match score
  calculateMatchScore(jobRequirements, haulier) {
    const scores = {
      fleet: this.calculateFleetScore(jobRequirements, haulier),
      location: this.calculateLocationScore(jobRequirements, haulier),
      capabilities: this.calculateCapabilitiesScore(jobRequirements, haulier),
      availability: this.calculateAvailabilityScore(jobRequirements, haulier),
      performance: this.calculatePerformanceScore(jobRequirements, haulier),
      pricing: this.calculatePricingScore(jobRequirements, haulier)
    };
    
    // Weighted total score
    const weights = {
      fleet: 0.25,      // 25% - Most important
      location: 0.20,   // 20% - Very important
      capabilities: 0.20, // 20% - Very important
      availability: 0.15, // 15% - Important
      performance: 0.15,  // 15% - Important
      pricing: 0.05      // 5% - Nice to have
    };
    
    const totalScore = Object.keys(scores).reduce((total, key) => {
      return total + (scores[key] * weights[key]);
    }, 0);
    
    return {
      totalScore: Math.round(totalScore * 100) / 100,
      breakdown: scores,
      weights
    };
  }

  // Fleet matching score
  calculateFleetScore(jobRequirements, haulier) {
    let score = 0;
    const { transport } = jobRequirements;
    const { fleet } = haulier;
    
    // Check if haulier is available and has trucks
    if (haulier.availability.isAvailable && fleet.availableTrucks > 0) {
      score += 0.4; // Higher weight for availability
    } else if (!haulier.availability.isAvailable) {
      return 0; // No match if not available
    } else {
      score += 0.1; // Partial match if no trucks available
    }
    
    // Check weight capacity
    if (fleet.maxWeight >= transport.weight) {
      score += 0.3;
    } else {
      score += 0.1; // Partial match
    }
    
    // Check dimensions
    const dimensionMatch = this.checkDimensions(transport.dimensions, fleet);
    score += dimensionMatch * 0.2;
    
    // Check special equipment
    const equipmentMatch = this.checkSpecialEquipment(transport.specialRequirements, fleet.specialEquipment);
    score += equipmentMatch * 0.2;
    
    return Math.min(score, 1);
  }

  // Location matching score
  calculateLocationScore(jobRequirements, haulier) {
    let score = 0;
    const { route } = jobRequirements;
    const { operatingRegions } = haulier;
    
    // Check country coverage
    const countryMatch = this.checkCountryCoverage(route.countries, operatingRegions.countries);
    score += countryMatch * 0.4;
    
    // Check specific routes
    const routeMatch = this.checkRouteCoverage(route, operatingRegions.specificRoutes);
    score += routeMatch * 0.3;
    
    // Check distance from route
    const distanceScore = this.calculateDistanceScore(route, haulier);
    score += distanceScore * 0.3;
    
    return Math.min(score, 1);
  }

  // Capabilities matching score
  calculateCapabilitiesScore(jobRequirements, haulier) {
    let score = 0;
    const { transport } = jobRequirements;
    const { capabilities } = haulier;
    const { haulierRequirements } = jobRequirements;
    
    // Check cargo type capabilities
    const cargoMatch = this.checkCargoCapabilities(transport.cargoType, capabilities.cargoTypes);
    score += cargoMatch * 0.3;
    
    // Check required certifications
    const certMatch = this.checkCertifications(haulierRequirements.requiredCertifications, capabilities.certifications);
    score += certMatch * 0.3;
    
    // Check language requirements
    const languageMatch = this.checkLanguages(haulierRequirements.requiredLanguages, capabilities.languages);
    score += languageMatch * 0.2;
    
    // Check industry experience
    const industryMatch = this.checkIndustryExperience(transport.cargoType, capabilities.industries);
    score += industryMatch * 0.2;
    
    return Math.min(score, 1);
  }

  // Availability matching score
  calculateAvailabilityScore(jobRequirements, haulier) {
    let score = 0;
    const { timing } = jobRequirements;
    const { availability } = haulier;
    
    // Check working days
    const dayMatch = this.checkWorkingDays(timing.workingDays, availability.workingDays);
    score += dayMatch * 0.4;
    
    // Check working hours
    const hourMatch = this.checkWorkingHours(timing, availability);
    score += hourMatch * 0.3;
    
    // Check emergency availability
    if (timing.flexibility === 'strict' && availability.emergencyAvailable) {
      score += 0.3;
    }
    
    return Math.min(score, 1);
  }

  // Performance matching score
  calculatePerformanceScore(jobRequirements, haulier) {
    let score = 0;
    const { haulierRequirements } = jobRequirements;
    const { performance } = haulier;
    
    // Check minimum rating
    if (performance.rating >= haulierRequirements.minRating) {
      score += 0.4;
    }
    
    // Check experience
    if (performance.totalJobs >= haulierRequirements.minExperience * 10) { // Rough estimate
      score += 0.3;
    }
    
    // Check on-time delivery
    if (performance.onTimeDelivery >= 90) {
      score += 0.3;
    }
    
    return Math.min(score, 1);
  }

  // Pricing matching score
  calculatePricingScore(jobRequirements, haulier) {
    let score = 0;
    const { budget } = jobRequirements;
    const { pricing } = haulier;
    
    // Check if pricing is within budget
    const estimatedCost = this.estimateJobCost(jobRequirements, haulier);
    if (estimatedCost <= budget.maxBudget) {
      score += 0.6;
    } else if (estimatedCost <= budget.maxBudget * 1.1) {
      score += 0.3; // Within 10% of budget
    }
    
    // Check currency match
    if (pricing.currency === budget.currency) {
      score += 0.4;
    }
    
    return Math.min(score, 1);
  }

  // Helper methods
  checkDimensions(jobDimensions, fleet) {
    if (fleet.maxLength >= jobDimensions.length && 
        fleet.maxHeight >= jobDimensions.height) {
      return 1;
    }
    return 0.5; // Partial match
  }

  checkSpecialEquipment(requiredEquipment, availableEquipment) {
    if (requiredEquipment.length === 0) return 1;
    
    const matches = requiredEquipment.filter(req => 
      availableEquipment.includes(req)
    ).length;
    
    return matches / requiredEquipment.length;
  }

  checkCountryCoverage(requiredCountries, availableCountries) {
    if (requiredCountries.length === 0) return 1;
    
    const matches = requiredCountries.filter(country => 
      availableCountries.includes(country)
    ).length;
    
    return matches / requiredCountries.length;
  }

  checkRouteCoverage(route, specificRoutes) {
    if (specificRoutes.length === 0) return 0.5; // Neutral
    
    const routeString = `${route.pickupLocation}-${route.deliveryLocation}`;
    return specificRoutes.includes(routeString) ? 1 : 0.3;
  }

  calculateDistanceScore(route, haulier) {
    // Simplified distance calculation
    // In a real app, you'd use geolocation services
    return 0.8; // Placeholder
  }

  checkCargoCapabilities(requiredCargoType, availableCargoTypes) {
    return availableCargoTypes.includes(requiredCargoType) ? 1 : 0.5;
  }

  checkCertifications(requiredCerts, availableCerts) {
    if (requiredCerts.length === 0) return 1;
    
    const matches = requiredCerts.filter(cert => 
      availableCerts.includes(cert)
    ).length;
    
    return matches / requiredCerts.length;
  }

  checkLanguages(requiredLanguages, availableLanguages) {
    if (requiredLanguages.length === 0) return 1;
    
    const matches = requiredLanguages.filter(lang => 
      availableLanguages.includes(lang)
    ).length;
    
    return matches / requiredLanguages.length;
  }

  checkIndustryExperience(cargoType, industries) {
    // Map cargo types to industries
    const cargoToIndustry = {
      'automotive': 'automotive',
      'food': 'food',
      'electronics': 'electronics',
      'furniture': 'furniture'
    };
    
    const industry = cargoToIndustry[cargoType];
    return industries.includes(industry) ? 1 : 0.5;
  }

  checkWorkingDays(requiredDays, availableDays) {
    if (requiredDays.length === 0) return 1;
    
    const matches = requiredDays.filter(day => 
      availableDays.includes(day)
    ).length;
    
    return matches / requiredDays.length;
  }

  checkWorkingHours(timing, availability) {
    // Simplified time checking
    return 0.8; // Placeholder
  }

  estimateJobCost(jobRequirements, haulier) {
    const { route, transport } = jobRequirements;
    const { pricing } = haulier;
    
    // Simple cost estimation
    const baseCost = route.distance * pricing.baseRate;
    const weightMultiplier = transport.weight > 10 ? 1.2 : 1.0;
    
    return baseCost * weightMultiplier;
  }

  getMatchReasons(jobRequirements, haulier) {
    const reasons = [];
    
    if (haulier.fleet.availableTrucks > 0) {
      reasons.push(`${haulier.fleet.availableTrucks} trucks available`);
    }
    
    if (haulier.operatingRegions.countries.length > 0) {
      reasons.push(`Operates in ${haulier.operatingRegions.countries.join(', ')}`);
    }
    
    if (haulier.performance.rating > 4) {
      reasons.push(`High rating (${haulier.performance.rating}/5)`);
    }
    
    return reasons;
  }

  calculateCompatibility(jobRequirements, haulier) {
    return {
      fleet: haulier.fleet.availableTrucks > 0 ? 'excellent' : 'poor',
      location: haulier.operatingRegions.countries.length > 0 ? 'good' : 'fair',
      performance: haulier.performance.rating > 4 ? 'excellent' : 'good'
    };
  }

  // Get matching preferences for a user
  getMatchingPreferences(userId) {
    return this.matchPreferences.get(userId) || {
      maxDistance: 100,
      minRating: 3.0,
      preferredCountries: [],
      maxPrice: 10000
    };
  }

  // Save matching preferences
  saveMatchingPreferences(userId, preferences) {
    this.matchPreferences.set(userId, preferences);
  }

  // Get match history
  getMatchHistory(userId) {
    return this.matchCache.get(userId) || [];
  }

  // Save match result
  saveMatchResult(userId, matchResult) {
    const history = this.getMatchHistory(userId);
    history.unshift({
      ...matchResult,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 matches
    if (history.length > 50) {
      history.splice(50);
    }
    
    this.matchCache.set(userId, history);
  }
}

// Create singleton instance
const matchingService = new MatchingService();

export default matchingService;
