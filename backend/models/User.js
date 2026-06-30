import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Basic Details
  email: {
    type: String,
    required: true,
    // Remove unique: true from here - it's defined in indexes below
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    enum: ['UK', 'USA', 'Europe', 'Australia/NZ', 'Other'],
    required: true
  },
  
  // Current Size
  trouserSize: {
    type: String,
    enum: [
      'UK 6 (US 2)',
      'UK 8 (US 4)',
      'UK 10 (US 6)',
      'UK 12 (US 8)',
      'UK 14 (US 10)',
      'UK 16 (US 12)',
      'UK 18 (US 14)',
      'UK 20 (US 16)',
      'UK 22 (US 18)',
      'Other'
    ],
    required: true
  },
  trouserSizeOther: {
    type: String,
    trim: true
  },
  trouserFit: {
    type: String,
    enum: ['Too tight', 'Too loose', 'Fit in some areas but not others', 'Fit well'],
    required: true
  },
  
  // Fit Issues (up to 3)
  fitIssues: [{
    type: String,
    enum: [
      'Waist too loose',
      'Waist too tight',
      'Tight in thighs',
      'Tight in hips',
      'Tight in crotch when moving',
      'Fall down when bending or squatting',
      'Wear out between thighs',
      'No major issues',
      'Knee doesn\'t sit in the right place',
      'Other'
    ]
  }],
  fitIssuesOther: {
    type: String,
    trim: true
  },
  
  // Body Distribution
  bodyDistribution: {
    type: String,
    enum: ['More in hips', 'More in thighs', 'Evenly distributed', 'Not sure'],
    required: true
  },
  
  // Movement
  workType: {
    type: String,
    enum: [
      'Painting and decorating',
      'Construction',
      'Electrical',
      'Plumbing',
      'Welding',
      'Gardening and landscaping',
      'DIY',
      'Other'
    ],
    required: true
  },
  workTypeOther: {
    type: String,
    trim: true
  },
  movements: [{
    type: String,
    enum: [
      'Squatting',
      'Kneeling',
      'Climbing',
      'Crawling',
      'Walking long distances',
      'Bending or lifting',
      'Other'
    ]
  }],
  movementsOther: {
    type: String,
    trim: true
  },
  
  // What Works
  fitPreference: {
    type: String,
    enum: [
      'Stretch fabric',
      'High waist',
      'Loose fit',
      'Specific brand',
      'Nothing ever fits properly'
    ],
    required: true
  },
  
  // Body Scanning
  bodyScanInterest: {
    type: String,
    enum: ['Yes', 'Maybe - depending how it works', 'No'],
    required: true
  },
  smartphone: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  
  // Consent
  consent: {
    type: Boolean,
    required: true,
    default: false
  },
  
  // FitID Result
  fitId: {
    type: String,
    enum: ['Lift', 'Triangle', 'Rectangle'],
    required: true
  },
  
  // Email Status
  emailStatus: {
    type: String,
    enum: ['PENDING', 'SENT', 'FAILED'],
    default: 'PENDING'
  },
  emailSentAt: {
    type: Date
  },
  
  // Metadata
  userAgent: {
    type: String
  },
  ipAddress: {
    type: String
  },
  
}, {
  timestamps: true
});

// Indexes for performance - define once here
userSchema.index({ email: 1 }, { unique: true }); // Added unique here
userSchema.index({ fitId: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ country: 1 });

const User = mongoose.model('User', userSchema);

export default User;