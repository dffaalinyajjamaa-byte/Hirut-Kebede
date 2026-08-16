import { PaymentAccountDetails, ProductTier, MockupPreset } from '../types';

export const GOOGLE_AI_PRO_TIER: ProductTier = {
  id: 'google-ai-pro-18m',
  title: 'Google AI Pro (Gemini Advanced)',
  subTitle: '18-Month Master License • 5 TB Cloud Ecosystem • 5 Multi-Seats',
  durationMonths: 18,
  durationLabel: '18-Month Continuous Access',
  priceETB: 649,
  upcomingPriceETB: 649,
  priceIncreaseNotice: '⚡ Verified Pricing: 649 ETB for full 18-month access (Save 98% vs $360 standard billing).',
  originalPriceUSD: 360, // $19.99/mo * 18 = ~$360
  savingsPercentage: 98,
  storageTB: 5,
  seats: 5,
  features: [
    'Gemini 3.1 Pro & 3.7 Flash Advanced Reasoner access',
    '5 TB (5,000 GB) unified Cloud Storage (Drive, Photos, Gmail)',
    'Family & Team multi-seat sharing for up to 5 individual members',
    '100% Private Instance — activated directly onto your personal Gmail',
    'Frictionless Onboarding — zero foreign credit card or billing verification required',
    'Global Provisioning — works worldwide with zero IP or VPN restrictions',
    'Direct integration with Google Docs, Gmail, Sheets, Slides, and Workspace AI',
    'High-resolution Gemini image generation and multi-modal canvas code sandbox'
  ],
  slaHours: 24,
  policyNotes: [
    'Fulfillment SLA: The redeem authorization link must be executed within 24 hours of dispatch.',
    'Support SLA: Any connection or activation queries must be reported within 24 hours for review.',
    'Commercial Basis: Non-warranty basis after successful 24-hour delivery & authorization.',
    'Privacy Guarantee: Your data remains private on your personal Google Account.',
    'Official Price: 649 ETB one-time payment for 18-month duration with 5TB & 5 seats.'
  ]
};

export const PAYMENT_METHODS: PaymentAccountDetails[] = [
  {
    id: 'telebirr',
    name: 'TeleBirr',
    shortCode: 'TELEBIRR',
    accountNumber: '0911223344',
    accountName: 'Amir Plus Digital Services',
    badge: 'Instant Automated Receipt',
    instructions: 'Open your TeleBirr App -> Send Money -> Enter 0911223344 -> Amount: 649 ETB -> Copy transaction reference or screenshot.',
    icon: 'Smartphone',
    accentColor: '#0EA5E9'
  },
  {
    id: 'cbe',
    name: 'Commercial Bank of Ethiopia (CBE Birr)',
    shortCode: 'CBE',
    accountNumber: '1000492837192',
    accountName: 'Amir Plus Solutions',
    badge: 'Official Commercial Account',
    instructions: 'Use CBE Mobile App or CBE Birr -> Transfer to Account: 1000492837192 -> Amount: 649 ETB -> Enter your target Gmail as reference remarks.',
    icon: 'Building2',
    accentColor: '#8B5CF6'
  },
  {
    id: 'abyssinia',
    name: 'Bank of Abyssinia',
    shortCode: 'BOA',
    accountNumber: '849201948',
    accountName: 'Amir Plus Global',
    badge: 'Direct Bank Settlement',
    instructions: 'Transfer via BoA Mobile Banking or BOApay -> Account: 849201948 -> Amount: 649 ETB -> Submit the reference number upon transfer.',
    icon: 'Landmark',
    accentColor: '#F59E0B'
  }
];

export const MOCKUP_PRESETS: MockupPreset[] = [
  {
    id: 'fullstack-dev',
    title: 'Developer Cloud Studio',
    role: 'Full-Stack Software Engineer',
    badge: 'Code Sandbox & 1M Token Context',
    description: 'Debug massive microservice architectures, refactor TypeScript codebases, and ingest entire repositories in one single prompt.',
    gradient: 'from-blue-500/20 via-indigo-500/20 to-cyan-500/20',
    highlightStat: '1,000,000 Token Window',
    previewPrompt: 'Analyze this full-stack repo, optimize database indexing for PostgreSQL, and generate zero-downtime migration scripts.',
    previewOutput: '✓ Analyzed 48 source files • Identified 3 indexing bottlenecks • Generated safe migration DDL with rollback hooks in 1.4s.',
    keySpecs: ['Full codebase ingest', 'Multi-file code synthesis', 'Native terminal execution']
  },
  {
    id: 'creative-director',
    title: 'Visual Arts & Creative Suite',
    role: 'Art Director & Visual Designer',
    badge: 'Photorealistic Multi-Modal Canvas',
    description: 'Generate 4K cinematic product renders, Apple-grade design tokens, and luxury brand moodboards directly from sketches.',
    gradient: 'from-purple-500/20 via-pink-500/20 to-amber-500/20',
    highlightStat: '4K Ultra-Res Output',
    previewPrompt: 'Render a claymorphic Apple White glass perfume flacon hovering over a ceramic podium with soft caustic lighting.',
    previewOutput: '✓ Generated 4K photorealistic lighting render • Extracted color hex palette • Exported CSS backdrop-filter tokens.',
    keySpecs: ['Style consistency', 'Infinite aspect ratios', 'Raw prompt iterations']
  },
  {
    id: 'executive-team',
    title: 'Enterprise Team & Family Ecosystem',
    role: 'Team Lead & Workspace Admin',
    badge: '5 TB Storage + 5 Independent Seats',
    description: 'Equip your family or startup core team with independent private Gemini Pro instances and unified 5,000 GB Google Drive storage.',
    gradient: 'from-emerald-500/20 via-teal-500/20 to-blue-500/20',
    highlightStat: '5 TB Cloud & 5 Seats',
    previewPrompt: 'Distribute 5TB storage across 5 seats and generate quarterly strategy executive synthesis from 200 Google Docs.',
    previewOutput: '✓ 5 Seats configured privately • Zero data cross-leak • 45-page executive summary synthesized in 2.1s.',
    keySpecs: ['100% private per Gmail', 'Zero card needed', 'Instant 24h dispatch']
  }
];

export const COMPARISON_DATA = [
  {
    feature: 'Monthly Cost (ETB Equiv.)',
    amirPlus: '649 ETB (~36 ETB/month for 18 Months!)',
    standardGoogle: '~$20/mo (~2,400+ ETB/month)',
    chatGptPlus: '~$20/mo (~2,400+ ETB/month)'
  },
  {
    feature: 'Total 18-Month Cost',
    amirPlus: '649 ETB (One-time payment for 18 Months)',
    standardGoogle: '~43,200 ETB ($360 total)',
    chatGptPlus: '~43,200 ETB ($360 total)'
  },
  {
    feature: 'Continuous License Duration',
    amirPlus: '18 Months Full Access',
    standardGoogle: '1 Month Recurring',
    chatGptPlus: '1 Month Recurring'
  },
  {
    feature: 'Cloud Storage Included',
    amirPlus: '5 TB (5,000 GB) Drive & Photos',
    standardGoogle: '2 TB (Standard)',
    chatGptPlus: '0 GB Cloud Storage'
  },
  {
    feature: 'Multi-Seat / Family Sharing',
    amirPlus: 'Up to 5 Family / Team Members',
    standardGoogle: 'Single User (Usually)',
    chatGptPlus: 'Single User'
  },
  {
    feature: 'Foreign Payment Card Requirement',
    amirPlus: 'NONE (TeleBirr, CBE, Abyssinia Accepted)',
    standardGoogle: 'Requires US/Intl Credit Card',
    chatGptPlus: 'Requires Intl Credit Card'
  },
  {
    feature: 'Privacy & Instance Type',
    amirPlus: '100% Private on your personal Gmail',
    standardGoogle: 'Personal Google Account',
    chatGptPlus: 'OpenAI Account'
  },
  {
    feature: 'Global Provisioning & IP Freedom',
    amirPlus: 'Worldwide with 0 VPN or IP restrictions',
    standardGoogle: 'Region restricted',
    chatGptPlus: 'Region restricted'
  }
];
