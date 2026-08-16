import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set. AI interactions will use fallback luxury responses.');
    }
    aiClient = new GoogleGenAI({ apiKey: apiKey || '' });
  }
  return aiClient;
}

const AMIR_PLUS_SYSTEM_PROMPT = `
You are "Amir Plus", a luxury-tier AI sales interface, product specialist, and technical advisor designed with an Apple-grade Liquid Glass and Claymorphic aesthetic mindset. 

Your mission:
- Assist users with supreme politeness, precision, and executive clarity.
- Showcase the Google AI Pro (Gemini Advanced 18-Month License) catalog specifications.
- Help users understand how to save 98% compared to standard international pricing.
- Guide users on local Ethiopian payment rails (TeleBirr, CBE Birr, Bank of Abyssinia).
- Clearly explain the 24-Hour Fulfillment SLA and privacy guarantees.
- Encourage prompt checkout by answering any technical or commercial questions.

PRODUCT CATALOG SPECIFICATIONS:
- Product Title: Google AI Pro (Gemini Advanced / 18-Month License)
- Retail Price: 399 ETB (One-time payment for the full 18-month duration!)
- Duration: 18 Months continuous full access
- Storage: 5 TB (5,000 GB) unified Cloud Storage (Google Drive, Google Photos, Gmail)
- Multi-Seat Sharing: Add up to 5 family or team members with individual private allocations
- Privacy: 100% private instance activated directly on the user's personal Gmail account
- Frictionless: No foreign credit card, USD balance, or PayPal required
- Global Provisioning: Operates worldwide with zero IP or VPN restrictions
- Model Access: Top-tier Gemini 3.1 Pro and 3.7 Flash Advanced Reasoner, multi-modal code execution, 1M+ context window, image creation
- Policy: Non-warranty basis

FULFILLMENT SLA:
- Activation Window: The redeem authorization link must be executed within 24 hours of dispatch.
- Support SLA: Connection or activation queries must be reported within 24 hours for review. No renewals/reissues after 24 hours.

LOCAL PAYMENT OPTIONS:
- TeleBirr (Instant transfer to 0911223344)
- Commercial Bank of Ethiopia (CBE Account: 1000492837192)
- Bank of Abyssinia (BoA Account: 849201948)

COMMUNICATION STYLE:
- Tone: Executive, warm, Apple-grade sophistication, transparent, and direct.
- Formatting: Use clean markdown bullet points, bold key terms, and short scannable sections. Avoid cluttered text walls.
- When the user asks how to buy or order, provide clear 3-step checkout guidance: 1) Enter target Gmail, 2) Select payment method (TeleBirr/CBE/BoA) and transfer 399 ETB, 3) Submit reference to receive the 24h dispatch link.
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Amir Plus AI Sales Engine',
    timestamp: new Date().toISOString()
  });
});

// Chat with Amir Plus AI Sales Specialist
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userEmail } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const lastMessage = messages[messages.length - 1]?.text || '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback luxury response if key is pending in preview
      return res.json({
        reply: `Greetings! I am Amir Plus, your Google AI Pro product specialist.\n\nOur flagship **Google AI Pro (Gemini Advanced 18-Month License)** is currently available for just **399 ETB**.\n\n✨ **Core Highlights:**\n• **18 Months Continuous Access** (Full duration)\n• **5 TB Cloud Ecosystem** across Drive, Photos, & Gmail\n• **Multi-Seat Access:** Add up to 5 family/team members\n• **100% Private Instance:** Activated directly on your personal Gmail\n• **Zero Foreign Card Needed:** Paid conveniently via TeleBirr, CBE, or Bank of Abyssinia.\n\nWould you like me to guide you through instant activation or calculate your team storage breakdown?`,
        suggestions: [
          'How does the 18-Month license work?',
          'What are the payment options?',
          'How do 5 team members share 5 TB?',
          'Start 399 ETB Checkout'
        ]
      });
    }

    const ai = getGeminiClient();
    const formattedContents = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: formattedContents,
      config: {
        systemInstruction: AMIR_PLUS_SYSTEM_PROMPT + (userEmail ? `\nUser's logged-in email is: ${userEmail}` : ''),
        temperature: 0.7,
      }
    });

    const replyText = response.text || 'I am delighted to assist you with Google AI Pro. How may I guide your workflow today?';

    // Generate context-aware suggestions
    let suggestions = [
      'Show 5 TB storage distribution',
      'Explain 24-hour fulfillment SLA',
      'Payment details for TeleBirr & CBE',
      'Proceed to 399 ETB Checkout'
    ];

    if (lastMessage.toLowerCase().includes('telebirr') || lastMessage.toLowerCase().includes('pay')) {
      suggestions = ['How to verify CBE Birr', 'TeleBirr payment steps', 'Start Instant Order', 'Is it 100% private?'];
    } else if (lastMessage.toLowerCase().includes('storage') || lastMessage.toLowerCase().includes('seat')) {
      suggestions = ['How to invite 5 family members', 'Does Drive sync automatically?', 'Proceed to Checkout', 'Compare with ChatGPT'];
    }

    res.json({
      reply: replyText,
      suggestions
    });
  } catch (error) {
    console.error('Gemini Chat API Error:', error);
    res.status(500).json({
      error: 'Failed to process AI consultation',
      fallback: 'Amir Plus is ready to assist you. You can purchase the 18-Month Google AI Pro license for 399 ETB with 5TB storage and 5 multi-seats directly in the checkout section below.'
    });
  }
});

// Generate Custom UI & Workflow Mockup Preview
app.post('/api/generate-mockup', async (req, res) => {
  try {
    const { role, useCase } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        title: `${role || 'Professional'} Gemini Pro Studio`,
        summary: `Tailored 18-Month workspace configuration with 5TB shared cloud storage for ${useCase || 'advanced productivity'}.`,
        samplePrompt: `Analyze complex domain tasks for ${role || 'user'} and execute high-speed reasoning with 1M token context.`,
        sampleOutput: `✓ Processing completed with Gemini 3.7 Flash Reasoning engine • Ingested multi-modal files • Zero latency.`,
        storageAllocation: '1,000 GB Primary + 4,000 GB Team pool'
      });
    }

    const ai = getGeminiClient();
    const prompt = `Generate an Apple-grade, high-aesthetic executive summary for a professional role using Google AI Pro (Gemini Advanced 18-Month License + 5TB Cloud Storage + 5 Seats).
Role: ${role || 'Senior Architect'}
Use Case: ${useCase || 'Full stack design and strategy'}

Return a JSON object with:
- title (string): Ultra-clean title
- summary (string): 2-sentence value description
- samplePrompt (string): A sophisticated prompt demonstrating Gemini Pro capabilities
- sampleOutput (string): Concise, impressive result string
- storageAllocation (string): How 5TB is ideally divided for this workflow
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error) {
    console.error('Mockup Generator Error:', error);
    res.json({
      title: `${req.body.role || 'VIP'} Gemini Pro Studio`,
      summary: 'Ultra-fast reasoning engine with 5TB cloud storage and multi-seat access.',
      samplePrompt: 'Synthesize research data and generate production-ready assets.',
      sampleOutput: '✓ High-precision output generated in 0.8s.',
      storageAllocation: '1 TB Personal + 4 TB Cloud Shared Pool'
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Amir Plus Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
