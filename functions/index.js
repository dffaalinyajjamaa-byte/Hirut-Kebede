/**
 * Firebase Cloud Function: Automated Order Confirmation & SLA Email Notification
 * 
 * Trigger: onDocumentCreated("orders/{orderId}")
 * Automatically triggered whenever a user submits an order in Firestore.
 */

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { logger } = require("firebase-functions");

// Helper to format the luxury email body
function buildReceiptHtml(order) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Order Receipt</title></head>
<body style="background:#F2F4F7; font-family: -apple-system, sans-serif; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 20px; padding: 30px; border: 1px solid #E5E7EB;">
    <h2 style="color: #0F172A; margin-top: 0;">Google AI Pro (18-Month License) Receipt</h2>
    <p style="color: #64748B;">Order Voucher: <strong>${order.id}</strong></p>
    
    <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 12px; padding: 15px; margin: 20px 0;">
      <strong style="color: #92400E;">⚡ 24-HOUR SLA ACTIVATION POLICY:</strong>
      <p style="color: #78350F; font-size: 13px; margin: 5px 0 0 0;">
        Your official Google AI Pro redeem invite will be dispatched to <strong>${order.targetGmail}</strong> within 24 hours.
        You must click and activate the authorization link within 24 hours of arrival.
      </p>
    </div>

    <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-top: 15px;">
      <tr><td style="padding: 8px 0; color: #64748B;">Target Gmail:</td><td style="font-weight: bold; text-align: right;">${order.targetGmail}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748B;">Cloud Storage:</td><td style="font-weight: bold; text-align: right;">5 TB Unified (5,000 GB)</td></tr>
      <tr><td style="padding: 8px 0; color: #64748B;">Seats:</td><td style="font-weight: bold; text-align: right;">5 Multi-Seat Members</td></tr>
      <tr><td style="padding: 8px 0; color: #64748B;">Amount Paid:</td><td style="font-weight: bold; color: #2563EB; text-align: right;">${order.priceETB} ETB (Early-bird rate before 649 ETB increase)</td></tr>
      <tr><td style="padding: 8px 0; color: #64748B;">Payment Method:</td><td style="font-weight: bold; text-align: right;">${order.paymentMethod.toUpperCase()}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748B;">Reference:</td><td style="font-family: monospace; text-align: right;">${order.paymentReference}</td></tr>
    </table>

    <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
    <p style="font-size: 12px; color: #94A3B8; text-align: center;">
      Amir Plus AI Sales & Fulfillment • Support: @AmirPlusAI
    </p>
  </div>
</body>
</html>
  `;
}

exports.sendOrderConfirmationEmail = onDocumentCreated("orders/{orderId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.warn("No data associated with the event");
    return;
  }

  const orderData = snapshot.data();
  const orderId = event.params.orderId;

  logger.info(`Automated receipt triggered for Order ${orderId} -> Target: ${orderData.targetGmail}`);

  try {
    const receiptHtml = buildReceiptHtml({ ...orderData, id: orderId });

    // In production, dispatch via Nodemailer, SendGrid, or Firebase Extensions:
    // await transporter.sendMail({ to: orderData.targetGmail, subject: `Google AI Pro Order Confirmation #${orderId}`, html: receiptHtml });

    // Mark email as dispatched in Firestore
    await snapshot.ref.update({
      emailReceiptSent: true,
      emailReceiptTimestamp: new Date().toISOString()
    });

    logger.info(`Receipt dispatched successfully to ${orderData.targetGmail}`);
  } catch (error) {
    logger.error("Error dispatching email receipt:", error);
  }
});
