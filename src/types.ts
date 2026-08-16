export type PaymentMethod = 'telebirr' | 'cbe' | 'abyssinia';

export interface PaymentAccountDetails {
  id: PaymentMethod;
  name: string;
  shortCode: string;
  accountNumber: string;
  accountName: string;
  badge: string;
  instructions: string;
  icon: string;
  accentColor: string;
}

export interface ProductTier {
  id: string;
  title: string;
  subTitle: string;
  durationMonths: number;
  durationLabel: string;
  priceETB: number;
  originalPriceUSD: number;
  savingsPercentage: number;
  storageTB: number;
  seats: number;
  features: string[];
  slaHours: number;
  policyNotes: string[];
}

export interface OrderRecord {
  id: string;
  userId: string;
  userEmail: string;
  targetGmail: string;
  productTitle: string;
  planDuration: string;
  priceETB: number;
  storageTB: number;
  seats: number;
  paymentMethod: PaymentMethod;
  paymentReference: string;
  senderPhone?: string;
  status: 'pending_verification' | 'dispatching' | 'activated' | 'expired';
  createdAt: string;
  redeemLink?: string;
  slaDeadline: string; // ISO String for 24h timer
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'amir';
  text: string;
  timestamp: string;
  suggestions?: string[];
  mockupSnippet?: {
    title: string;
    description: string;
    tier: string;
    features: string[];
  };
  actionType?: 'open_checkout' | 'show_payment' | 'show_storage_calculator' | 'show_policy';
}

export interface MockupPreset {
  id: string;
  title: string;
  role: string;
  badge: string;
  description: string;
  gradient: string;
  highlightStat: string;
  previewPrompt: string;
  previewOutput: string;
  keySpecs: string[];
}
