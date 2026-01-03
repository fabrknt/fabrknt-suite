/**
 * Email notifications for partnership matches
 * Uses Resend for sending transactional emails
 */

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.EMAIL_FROM || "partnerships@fabrknt.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fabrknt.com";

interface MatchNotificationData {
  userEmail: string;
  userName: string;
  userCompanyName: string;
  partnerCompanyName: string;
  partnerCompanySlug: string;
  partnerDescription?: string;
  matchScore?: number;
}

/**
 * Send email notification when a mutual match occurs
 */
export async function sendMatchNotification(
  data: MatchNotificationData
): Promise<{ success: boolean; error?: string }> {
  // Skip if Resend is not configured
  if (!resend) {
    console.warn("RESEND_API_KEY not configured - skipping email notification");
    return { success: false, error: "Email service not configured" };
  }

  const {
    userEmail,
    userName,
    userCompanyName,
    partnerCompanyName,
    partnerCompanySlug,
    partnerDescription,
    matchScore,
  } = data;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `It's a Match! ${partnerCompanyName} is interested in partnering with ${userCompanyName}`,
      html: generateMatchEmail({
        userName,
        userCompanyName,
        partnerCompanyName,
        partnerCompanySlug,
        partnerDescription,
        matchScore,
      }),
    });

    console.log(`Match notification sent to ${userEmail}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error sending match notification:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Generate HTML email for match notification
 */
function generateMatchEmail(data: {
  userName: string;
  userCompanyName: string;
  partnerCompanyName: string;
  partnerCompanySlug: string;
  partnerDescription?: string;
  matchScore?: number;
}): string {
  const {
    userName,
    userCompanyName,
    partnerCompanyName,
    partnerCompanySlug,
    partnerDescription,
    matchScore,
  } = data;

  const matchesUrl = `${SITE_URL}/partnerships/matches`;
  const partnerUrl = `${SITE_URL}/cindex/${partnerCompanySlug}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Partnership Match</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="font-size: 28px; font-weight: bold; color: #111827; margin: 0;">
        🎉 It's a Match!
      </h1>
    </div>

    <!-- Main Card -->
    <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 16px; color: #374151; margin: 0 0 24px 0;">
        Hi ${userName},
      </p>

      <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 24px 0;">
        Great news! <strong>${partnerCompanyName}</strong> is interested in partnering with <strong>${userCompanyName}</strong>. You both swiped right on each other!
      </p>

      ${
        matchScore
          ? `
      <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
        <div style="font-size: 48px; font-weight: bold; color: #6366f1; margin-bottom: 8px;">
          ${matchScore}
        </div>
        <div style="font-size: 14px; color: #6b7280;">
          Match Score
        </div>
      </div>
      `
          : ""
      }

      ${
        partnerDescription
          ? `
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin: 0 0 8px 0;">
          About ${partnerCompanyName}
        </h3>
        <p style="font-size: 14px; color: #374151; line-height: 1.6; margin: 0;">
          ${partnerDescription}
        </p>
      </div>
      `
          : ""
      }

      <div style="margin-top: 32px;">
        <a href="${matchesUrl}" style="display: inline-block; background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 16px;">
          View Match
        </a>
      </div>

      <p style="font-size: 14px; color: #6b7280; margin: 24px 0 0 0;">
        Want to learn more? <a href="${partnerUrl}" style="color: #6366f1; text-decoration: none;">View ${partnerCompanyName}'s full profile →</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px;">
      <p style="font-size: 12px; color: #9ca3af; margin: 0 0 8px 0;">
        This email was sent by Fabrknt Partnership Matching
      </p>
      <p style="font-size: 12px; color: #9ca3af; margin: 0;">
        <a href="${SITE_URL}/partnerships/matches" style="color: #6366f1; text-decoration: none;">View all your matches</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Send welcome email when user claims a profile
 */
export async function sendWelcomeEmail(data: {
  userEmail: string;
  userName: string;
  companyName: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn("RESEND_API_KEY not configured - skipping welcome email");
    return { success: false, error: "Email service not configured" };
  }

  const { userEmail, userName, companyName } = data;
  const discoverUrl = `${SITE_URL}/partnerships/discover`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: `Welcome to Fabrknt Partnership Matching - ${companyName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
      <h1 style="font-size: 24px; font-weight: bold; color: #111827; margin: 0 0 16px 0;">
        Welcome to Partnership Matching! 👋
      </h1>

      <p style="font-size: 16px; color: #374151; margin: 0 0 16px 0;">
        Hi ${userName},
      </p>

      <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 24px 0;">
        You've successfully claimed <strong>${companyName}</strong>. You can now discover AI-powered partnership opportunities with other Web3 companies.
      </p>

      <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h3 style="font-size: 14px; font-weight: 600; color: #111827; margin: 0 0 12px 0;">
          How it works:
        </h3>
        <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.8;">
          <li>Browse AI-matched partnership opportunities</li>
          <li>Swipe right on companies you're interested in</li>
          <li>When both companies swipe right, it's a match!</li>
          <li>Start conversations and build partnerships</li>
        </ol>
      </div>

      <div style="margin-top: 32px;">
        <a href="${discoverUrl}" style="display: inline-block; background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 16px;">
          Start Discovering Partnerships →
        </a>
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    });

    console.log(`Welcome email sent to ${userEmail}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return { success: false, error: error.message };
  }
}
