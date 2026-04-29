/**
 * Message Generator Service
 * Generates referral request messages using a fixed template
 */

/**
 * Generates a referral message based on job and profile information
 * @param {Object} jobData - Job information (companyName, jobLink)
 * @param {Object} profileData - User profile (name, email, phone)
 * @param {String} contactName - Name of the contact person
 * @returns {String} - Generated message
 */
export const generateReferralMessage = (jobData, profileData, contactName) => {
  // Fixed template - DO NOT modify this structure
  const template = `Hi ${contactName},

I found a role at ${jobData.companyName} that fits my profile and was wondering if you could help with a referral 🙂

Name: ${profileData.name}

Email: ${profileData.email}

Phone: ${profileData.phone}

Job Link: ${jobData.jobLink}

I've attached my resume here. Happy to share anything else if needed.

Thanks a lot!`;

  return template;
};
