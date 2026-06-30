/**
 * FitID Classification Engine
 * 
 * Priority Order:
 * 1. Lift
 * 2. Triangle
 * 3. Rectangle
 * 
 * This replicates the exact Airtable logic.
 */
export function calculateFitID(fitIssues = [], movements = []) {
  // Rule 1: Lift
  // If ANY of these are present:
  // - Waist too loose
  // - Tight in thighs
  // - Tight in hips
  if (
    fitIssues.includes('Waist too loose') ||
    fitIssues.includes('Tight in thighs') ||
    fitIssues.includes('Tight in hips')
  ) {
    return 'Lift';
  }
  
  // Rule 2: Triangle
  // Check ONLY if Lift is FALSE
  // If ANY of these are present:
  // - Tight in crotch when moving
  // - Fall down when bending or squatting
  // - Squatting (movement)
  if (
    fitIssues.includes('Tight in crotch when moving') ||
    fitIssues.includes('Fall down when bending or squatting') ||
    movements.includes('Squatting')
  ) {
    return 'Triangle';
  }
  
  // Rule 3: Rectangle
  // If neither Lift nor Triangle conditions are met
  return 'Rectangle';
}

export function isValidFitID(fitId) {
  return ['Lift', 'Triangle', 'Rectangle'].includes(fitId);
}

export function getFitIDDescription(fitId) {
  const descriptions = {
    'Lift': 'You have a waist-to-hip differential that requires more room in the hip and thigh area.',
    'Triangle': 'You have movement-based fit challenges related to crotch and rise mechanics.',
    'Rectangle': 'You have a balanced body proportion with standard fit requirements.'
  };
  return descriptions[fitId] || 'Unknown FitID';
}