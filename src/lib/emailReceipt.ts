import { OrderRecord } from '../types';

/**
 * Generates an executive, Apple-grade HTML email receipt
 * designed for automated dispatch to the customer's provided Gmail.
 */
export function generateOrderReceiptHtml(order: OrderRecord | {
  id: string;
  targetGmail: string;
  productTitle: string;
  planDuration: string;
  priceETB: number;
  storageTB: number;
  seats: number;
  paymentMethod: string;
  paymentReference: string;
  createdAt?: string;
  slaDeadline?: string;
}): string {
  const orderDate = order.createdAt ? new Date(order.createdAt).toUTCString() : new Date().toUTCString();
  const deadlineDate = order.slaDeadline ? new Date(order.slaDeadline).toUTCString() : 'Within 24 hours of dispatch';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Amir Plus - Order Confirmation & 24h SLA Receipt</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F2F4F7;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #FFFFFF;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.06);
      border: 1px solid #E5E7EB;
    }
    .header {
      background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
      padding: 36px 32px;
      text-align: center;
      color: #FFFFFF;
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 12px;
      color: #93C5FD;
    }
    .title {
      font-size: 24px;
      font-weight: 800;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .subtitle {
      font-size: 13px;
      color: #94A3B8;
      margin-top: 6px;
    }
    .content {
      padding: 32px;
    }
    .sla-alert {
      background: #FFFBEB;
      border: 1px solid #FCD34D;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .sla-title {
      font-size: 14px;
      font-weight: 800;
      color: #92400E;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .sla-text {
      font-size: 13px;
      line-height: 1.6;
      color: #78350F;
      margin: 0;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      background: #F8FAFC;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #E2E8F0;
    }
    .details-table td {
      padding: 14px 18px;
      font-size: 13px;
      border-bottom: 1px solid #E2E8F0;
    }
    .details-table tr:last-child td {
      border-bottom: none;
    }
    .label {
      color: #64748B;
      font-weight: 600;
      width: 40%;
    }
    .value {
      color: #0F172A;
      font-weight: 700;
      text-align: right;
    }
    .price-value {
      color: #2563EB;
      font-size: 16px;
      font-weight: 800;
    }
    .footer {
      background: #F8FAFC;
      padding: 24px 32px;
      text-align: center;
      font-size: 12px;
      color: #64748B;
      border-top: 1px solid #E2E8F0;
    }
    .footer strong {
      color: #0F172A;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Official Confirmation Receipt</div>
      <h1 class="title">Google AI Pro (18-Month License)</h1>
      <div class="subtitle">Amir Plus Executive Fulfillment Engine • Order #${order.id}</div>
    </div>

    <div class="content">
      <!-- 24-Hour SLA Box -->
      <div class="sla-alert">
        <div class="sla-title">⚡ CRITICAL 24-HOUR FULFILLMENT & ACTIVATION SLA</div>
        <p class="sla-text">
          <strong>1. Dispatch Window:</strong> Your official redeem authorization link is being provisioned directly to <strong>${order.targetGmail}</strong> and will arrive within 24 hours.<br>
          <strong>2. Execution Window:</strong> You must click and authorize the redeem invite within <strong>24 hours</strong> of arrival.<br>
          <strong>3. Support Window:</strong> Any connection or activation support questions must be reported within 24 hours of dispatch for warranty review.
        </p>
      </div>

      <!-- Order Specification Summary -->
      <table class="details-table">
        <tr>
          <td class="label">Target Activation Gmail:</td>
          <td class="value">${order.targetGmail}</td>
        </tr>
        <tr>
          <td class="label">Product Plan:</td>
          <td class="value">Google AI Pro (18-Month Continuous)</td>
        </tr>
        <tr>
          <td class="label">Cloud Ecosystem Storage:</td>
          <td class="value">5 TB (5,000 GB) Drive, Photos & Gmail</td>
        </tr>
        <tr>
          <td class="label">Multi-Seat Allocation:</td>
          <td class="value">Up to 5 Individual Family/Team Seats</td>
        </tr>
        <tr>
          <td class="label">Amount Paid:</td>
          <td class="value price-value">${order.priceETB} ETB <span style="font-size: 11px; color: #10B981; font-weight: normal;">(Locked in before 649 ETB increase)</span></td>
        </tr>
        <tr>
          <td class="label">Payment Channel:</td>
          <td class="value" style="text-transform: uppercase;">${order.paymentMethod}</td>
        </tr>
        <tr>
          <td class="label">Transaction Reference:</td>
          <td class="value" style="font-family: monospace;">${order.paymentReference}</td>
        </tr>
        <tr>
          <td class="label">Order Timestamp:</td>
          <td class="value" style="font-size: 11px;">${orderDate}</td>
        </tr>
      </table>

      <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 12px; padding: 14px; margin-bottom: 20px; font-size: 12px; color: #166534; line-height: 1.5;">
        🔒 <strong>100% Privacy Guarantee:</strong> Your Google account credentials are never shared. The authorization invite is attached directly to your personal Google ecosystem with zero foreign credit card needed.
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px 0;"><strong>Amir Plus AI Systems</strong> • Addis Ababa, Ethiopia</p>
      <p style="margin: 0;">Automated Dispatch Server • Telegram Support: @AmirPlusAI • 24/7 Portal</p>
    </div>
  </div>
</body>
</html>
  `;
}
