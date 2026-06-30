import { Resend } from 'resend';
import dotenv from 'dotenv';
import { liftEmail } from '../emails/templates/lift.js';
import { triangleEmail } from '../emails/templates/triangle.js';
import { rectangleEmail } from '../emails/templates/rectangle.js';

dotenv.config();

const resend = new Resend(process.env.THREADLINE_RESEND_API_KEY);

// Map FitIDs to email template functions
const emailTemplates = {
  Lift: liftEmail,
  Triangle: triangleEmail,
  Rectangle: rectangleEmail,
};

export async function sendFitIDEmail(email, firstName, fitId) {
  try {
    // Get the template function for this FitID
    const templateFn = emailTemplates[fitId];
    
    if (!templateFn) {
      throw new Error(`No email template found for FitID: ${fitId}`);
    }

    // Generate the HTML using the template
    const html = templateFn({ firstName });

    const response = await resend.emails.send({
      from: 'Threadline <fitid@threadline.work>',
      to: email,
      subject: `Your Threadline FitID: ${fitId}`,
      html: html,
    });

    console.log(`✅ Email sent to ${email} for FitID: ${fitId}`);
    return { success: true, data: response };
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
}