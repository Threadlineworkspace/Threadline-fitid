/**
 * Validate FitID submission data
 */
export const validateFitIDSubmission = (data) => {
  const {
    email,
    firstName,
    country,
    trouserSize,
    trouserFit,
    fitIssues,
    bodyDistribution,
    workType,
    movements,
    fitPreference,
    bodyScanInterest,
    smartphone,
    consent
  } = data;

  // Required fields
  if (!email) return 'Email is required';
  if (!isValidEmail(email)) return 'Invalid email format';
  
  if (!country) return 'Country is required';
  if (!trouserSize) return 'Trouser size is required';
  if (!trouserFit) return 'Trouser fit is required';
  if (!bodyDistribution) return 'Body distribution is required';
  if (!workType) return 'Work type is required';
  if (!fitPreference) return 'Fit preference is required';
  if (!bodyScanInterest) return 'Body scan interest is required';
  if (!smartphone) return 'Smartphone question is required';
  if (!consent || consent === 'false') return 'Consent is required';

  // Validate fit issues (max 3)
  if (fitIssues && fitIssues.length > 3) {
    return 'Maximum 3 fit issues allowed';
  }

  // Validate movements
  if (movements && movements.length > 7) {
    return 'Invalid movements selected';
  }

  return null; // No errors
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate login credentials
 */
export const validateLogin = (data) => {
  const { email, password } = data;
  
  if (!email) return 'Email is required';
  if (!isValidEmail(email)) return 'Invalid email format';
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  
  return null;
};