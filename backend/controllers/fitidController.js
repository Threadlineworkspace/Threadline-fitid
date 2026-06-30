import User from '../models/User.js';
import { calculateFitID } from '../services/fitidEngine.js';
import { sendFitIDEmail } from '../services/emailService.js';
import { validateFitIDSubmission } from '../middleware/validation.js';

/**
 * Submit FitID questionnaire
 * POST /api/fitid/submit
 */
export const submitFitID = async (req, res) => {
  try {
    // Validate request body
    const validationError = validateFitIDSubmission(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const {
      email,
      firstName,
      country,
      trouserSize,
      trouserSizeOther,
      trouserFit,
      fitIssues,
      fitIssuesOther,
      bodyDistribution,
      workType,
      workTypeOther,
      movements,
      movementsOther,
      fitPreference,
      bodyScanInterest,
      smartphone,
      consent
    } = req.body;

    // Calculate FitID
    const fitId = calculateFitID(fitIssues, movements);

    // Prepare user data
    const userData = {
      email: email.toLowerCase().trim(),
      firstName: firstName?.trim(),
      country,
      trouserSize,
      trouserSizeOther: trouserSize === 'Other' ? trouserSizeOther : undefined,
      trouserFit,
      fitIssues: fitIssues || [],
      fitIssuesOther: fitIssues?.includes('Other') ? fitIssuesOther : undefined,
      bodyDistribution,
      workType,
      workTypeOther: workType === 'Other' ? workTypeOther : undefined,
      movements: movements || [],
      movementsOther: movements?.includes('Other') ? movementsOther : undefined,
      fitPreference,
      bodyScanInterest,
      smartphone,
      consent: consent === true || consent === 'true',
      fitId,
      userAgent: req.get('user-agent'),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    // Check if user exists (upsert - update if exists, create if not)
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    
    let user;
    let isNew = false;
    
    if (existingUser) {
      // Update existing user
      user = await User.findOneAndUpdate(
        { email: email.toLowerCase().trim() },
        { 
          ...userData,
          emailStatus: 'PENDING', // Reset email status for resend
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );
      console.log(`🔄 Updated existing user: ${email}`);
    } else {
      // Create new user
      user = new User(userData);
      await user.save();
      isNew = true;
      console.log(`✅ Created new user: ${email}`);
    }

    // Send email
    const emailResult = await sendFitIDEmail(email, firstName, fitId);
    
    // Update email status
    user.emailStatus = emailResult.success ? 'SENT' : 'FAILED';
    if (emailResult.success) {
      user.emailSentAt = new Date();
    }
    await user.save();

    // Return response
    res.status(201).json({
      success: true,
      data: {
        fitId: user.fitId,
        email: user.email,
        firstName: user.firstName,
        emailStatus: user.emailStatus,
        isNewUser: isNew,
        message: emailResult.success 
          ? 'FitID calculated and email sent successfully!'
          : 'FitID calculated but email sending failed.'
      }
    });

  } catch (error) {
    console.error('❌ Submit error:', error);
    res.status(500).json({ 
      error: 'Failed to process submission',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get user by email (for testing)
 * GET /api/fitid/user/:email
 */
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};