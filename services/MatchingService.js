// Mock matching service for development
class MatchingService {
  findMatches(jobRequirements, haulierProfiles) {
    // Mock matching algorithm
    const matches = haulierProfiles.map(haulier => {
      const matchScore = this.calculateMatchScore(jobRequirements, haulier);
      const matchReasons = this.generateMatchReasons(jobRequirements, haulier, matchScore);
      
      return {
        haulier,
        matchScore,
        matchReasons
      };
    });

    // Sort by match score
    return matches.sort((a, b) => b.matchScore.totalScore - a.matchScore.totalScore);
  }

  calculateMatchScore(jobRequirements, haulier) {
    let score = 0;
    let maxScore = 0;

    // Availability match (30% weight)
    const availabilityScore = haulier.availability.isAvailable ? 1 : 0;
    score += availabilityScore * 0.3;
    maxScore += 0.3;

    // Fleet capacity match (25% weight)
    const fleetScore = Math.min(haulier.fleet.availableTrucks / 5, 1); // Normalize to 0-1
    score += fleetScore * 0.25;
    maxScore += 0.25;

    // Rating match (20% weight)
    const ratingScore = haulier.performance.rating / 5; // Normalize to 0-1
    score += ratingScore * 0.2;
    maxScore += 0.2;

    // Experience match (15% weight)
    const experienceScore = Math.min(haulier.performance.totalJobs / 100, 1); // Normalize to 0-1
    score += experienceScore * 0.15;
    maxScore += 0.15;

    // Price competitiveness (10% weight)
    const priceScore = Math.max(0, 1 - (haulier.pricing.baseRate - 5) / 10); // Lower price = higher score
    score += priceScore * 0.1;
    maxScore += 0.1;

    return {
      totalScore: maxScore > 0 ? score / maxScore : 0,
      availabilityScore,
      fleetScore,
      ratingScore,
      experienceScore,
      priceScore
    };
  }

  generateMatchReasons(jobRequirements, haulier, matchScore) {
    const reasons = [];

    if (matchScore.availabilityScore > 0) {
      reasons.push('Currently available for new partnerships');
    }

    if (matchScore.fleetScore > 0.5) {
      reasons.push(`Strong fleet capacity (${haulier.fleet.availableTrucks} trucks available)`);
    }

    if (matchScore.ratingScore > 0.8) {
      reasons.push(`Excellent rating (${haulier.performance.rating}/5)`);
    } else if (matchScore.ratingScore > 0.6) {
      reasons.push(`Good rating (${haulier.performance.rating}/5)`);
    }

    if (matchScore.experienceScore > 0.7) {
      reasons.push(`Experienced haulier (${haulier.performance.totalJobs} completed jobs)`);
    }

    if (matchScore.priceScore > 0.7) {
      reasons.push('Competitive pricing');
    }

    // Add specific capability matches
    if (haulier.capabilities.cargoTypes.includes('general')) {
      reasons.push('Handles general cargo');
    }

    if (haulier.operatingRegions.countries.length > 1) {
      reasons.push(`Multi-country operations (${haulier.operatingRegions.countries.join(', ')})`);
    }

    if (haulier.capabilities.certifications.length > 0) {
      reasons.push(`Certified (${haulier.capabilities.certifications.join(', ')})`);
    }

    return reasons.slice(0, 4); // Limit to 4 reasons
  }

  // Filter matches based on criteria
  filterMatches(matches, filters) {
    return matches.filter(match => {
      const haulier = match.haulier;

      // Country filter
      if (filters.countries.length > 0) {
        const hasMatchingCountry = filters.countries.some(country => 
          haulier.operatingRegions.countries.includes(country)
        );
        if (!hasMatchingCountry) return false;
      }

      // Truck type filter
      if (filters.truckTypes.length > 0) {
        const hasMatchingTruckType = filters.truckTypes.some(type => 
          haulier.fleet.truckTypes.includes(type.toLowerCase().replace(' ', '_'))
        );
        if (!hasMatchingTruckType) return false;
      }

      // Fleet size filter
      if (haulier.fleet.totalTrucks < filters.minTrucks || haulier.fleet.totalTrucks > filters.maxTrucks) {
        return false;
      }

      // Rating filter
      if (haulier.performance.rating < filters.minRating || haulier.performance.rating > filters.maxRating) {
        return false;
      }

      // Experience filter
      const experienceYears = haulier.performance.totalJobs / 10; // Rough estimate
      if (experienceYears < filters.minExperience || experienceYears > filters.maxExperience) {
        return false;
      }

      // Availability filter
      if (filters.availability === 'available' && !haulier.availability.isAvailable) {
        return false;
      }
      if (filters.availability === 'unavailable' && haulier.availability.isAvailable) {
        return false;
      }

      // Certification filter
      if (filters.certifications.length > 0) {
        const hasMatchingCert = filters.certifications.some(cert => 
          haulier.capabilities.certifications.includes(cert)
        );
        if (!hasMatchingCert) return false;
      }

      // Language filter
      if (filters.languages.length > 0) {
        const hasMatchingLanguage = filters.languages.some(lang => 
          haulier.capabilities.languages.includes(lang.toLowerCase().substring(0, 2))
        );
        if (!hasMatchingLanguage) return false;
      }

      // Special equipment filter
      if (filters.specialEquipment.length > 0) {
        const hasMatchingEquipment = filters.specialEquipment.some(equipment => 
          haulier.fleet.specialEquipment.includes(equipment.toLowerCase().replace(' ', '_'))
        );
        if (!hasMatchingEquipment) return false;
      }

      return true;
    });
  }
}

export default new MatchingService();