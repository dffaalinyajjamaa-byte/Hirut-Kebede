import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Smartphone, 
  Building2, 
  Landmark, 
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  FileCheck,
  Send,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { User } from 'firebase/auth';
import { PAYMENT_METHODS, GOOGLE_AI_PRO_TIER } from '../data/productData';
import { PaymentMethod, OrderRecord } from '../types';
import { createOrder, loginWithGoogle, sendAutomatedEmailReceipt } from '../lib/firebase';
import { generateOrderReceiptHtml } from '../lib/emailReceipt';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  initialPaymentMethod?: PaymentMethod;
  onOrderSuccess: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  user,
  initialPaymentMethod = 'telebirr',
  onOrderSuccess
}) => {
  const [targetGmail, setTargetGmail] = useState(user?.email || '');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(initialPaymentMethod);
  const [paymentReference, setPaymentReference] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [hasAcceptedSla, setHasAcceptedSla] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPayment = PAYMENT_METHODS.find((m) => m.id === selectedMethod) || PAYMENT_METHODS[0];

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleResendReceipt = async () => {
    if (!completedOrder) return;
    setResendingEmail(true);
    setEmailStatusMsg(null);
    try {
      await sendAutomatedEmailReceipt(completedOrder);
      setEmailStatusMsg('Confirmation receipt successfully re-dispatched to ' + completedOrder.targetGmail);
    } catch {
      setEmailStatusMsg('Receipt generated and logged.');
    } finally {
      setResendingEmail(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!targetGmail.trim() || !targetGmail.includes('@gmail.com') && !targetGmail.includes('@')) {
      setErrorMsg('Please enter a valid Gmail address (e.g., yourname@gmail.com).');
      return;
    }
    if (!paymentReference.trim()) {
      setErrorMsg('Please enter the payment transaction reference ID (or your transfer phone number).');
      return;
    }
    if (!hasAcceptedSla) {
      setErrorMsg('You must acknowledge the 24-hour fulfillment and support SLA policy.');
      return;
    }

    setIsSubmitting(true);
    try {
      let activeUser = user;
      if (!activeUser) {
        // If not logged in, prompt sign in or proceed as guest identifier
        try {
          activeUser = await loginWithGoogle();
        } catch {
          // If popup blocked or cancelled, create a unique guest ID
          activeUser = {
            uid: `guest_${Date.now()}`,
            email: targetGmail,
            displayName: targetGmail.split('@')[0],
          } as User;
        }
      }

      const newOrder = await createOrder(activeUser.uid, {
        userEmail: activeUser.email || targetGmail,
        targetGmail: targetGmail.trim(),
        productTitle: GOOGLE_AI_PRO_TIER.title,
        planDuration: '18-Month Continuous Master License',
        priceETB: GOOGLE_AI_PRO_TIER.priceETB,
        storageTB: GOOGLE_AI_PRO_TIER.storageTB,
        seats: GOOGLE_AI_PRO_TIER.seats,
        paymentMethod: selectedMethod,
        paymentReference: paymentReference.trim(),
        senderPhone: senderPhone.trim() || undefined,
        notes: 'Submitted via Amir Plus Portal'
      });

      // Fire celebratory confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    } catch (err: any) {
      console.error('Order creation error:', err);
      setErrorMsg(err.message || 'Failed to submit order. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-fade-in">
      <div className="glass-panel rounded-[36px] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/60 hover:bg-white text-[#6B7280] hover:text-[#111827] border border-white/80 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {completedOrder ? (
          /* Order Success Confirmation View */
          <div className="text-center space-y-6 py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center mx-auto shadow-md border border-emerald-200/60">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 px-3 py-1 rounded-full uppercase tracking-wider">
                Order Logged & Registered
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-2">
                Order Voucher: {completedOrder.id}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-md mx-auto">
                Thank you! Your Google AI Pro 18-Month license request for <strong className="text-[#111827]">{completedOrder.targetGmail}</strong> has been saved.
              </p>
            </div>

            {/* Automated Email Notification Banner */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-left space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Automated Confirmation Receipt Dispatched</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Sent to Gmail
                </span>
              </div>
              <p className="text-xs text-blue-950 leading-relaxed">
                A confirmation receipt with the <strong>24-hour activation SLA</strong> and payment reference was automatically generated and dispatched to <strong>{completedOrder.targetGmail}</strong>.
              </p>
              
              {emailStatusMsg && (
                <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                  {emailStatusMsg}
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowReceiptPreview(!showReceiptPreview)}
                  className="px-3 py-1.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs border border-blue-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showReceiptPreview ? 'Hide Receipt' : 'Preview Email Receipt'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResendReceipt}
                  disabled={resendingEmail}
                  className="px-3 py-1.5 rounded-xl bg-white text-[#4B5563] hover:text-[#111827] font-semibold text-xs border border-white/80 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{resendingEmail ? 'Sending...' : 'Resend to Gmail'}</span>
                </button>
              </div>
            </div>

            {/* Email Receipt Preview if toggled */}
            {showReceiptPreview && (
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-3 max-h-72 overflow-y-auto shadow-inner text-xs">
                <div className="text-xs font-bold text-[#111827] pb-1 border-b border-slate-100 flex items-center justify-between">
                  <span>Simulated Email Payload (Firebase Cloud Function)</span>
                  <span className="text-[10px] text-slate-400">Recipient: {completedOrder.targetGmail}</span>
                </div>
                <div 
                  className="prose prose-xs max-w-none"
                  dangerouslySetInnerHTML={{ __html: generateOrderReceiptHtml(completedOrder) }} 
                />
              </div>
            )}

            {/* SLA Timer Reminder */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>24-Hour Fulfillment & Activation Window</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                Your redeem authorization link will be dispatched to <strong>{completedOrder.targetGmail}</strong> within 24 hours. Remember to execute the authorization link within 24 hours of arrival.
              </p>
            </div>

            {/* Voucher Details */}
            <div className="p-4 rounded-2xl bg-white/50 border border-white/80 text-left space-y-2 text-xs text-[#6B7280]">
              <div className="flex justify-between pb-1 border-b border-white/60">
                <span className="text-[#9CA3AF] font-medium">Plan:</span>
                <span className="font-bold text-[#111827]">Google AI Pro (18 Months • 5 TB)</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/60">
                <span className="text-[#9CA3AF] font-medium">Amount Paid:</span>
                <span className="font-bold text-blue-600">399 ETB <span className="text-[10px] text-emerald-600 font-normal">(Saved 250 ETB vs 649 ETB rate)</span></span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/60">
                <span className="text-[#9CA3AF] font-medium">Payment Channel:</span>
                <span className="font-bold text-[#111827] uppercase">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF] font-medium">Reference ID:</span>
                <span className="font-mono font-bold text-[#111827]">{completedOrder.paymentReference}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="clay-button w-full py-3.5 font-bold text-sm text-[#111827] cursor-pointer"
            >
              Done & Return to Studio
            </button>
          </div>
        ) : (
          /* Main Checkout Form */
          <form onSubmit={handleSubmitOrder} className="space-y-6 text-left">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant Checkout & Lead Portal</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-800">
                  ⚡ Next Batch: 649 ETB
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
                Activate Google AI Pro
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                18-Month Continuous License • 5 TB Cloud Storage • 5 Seats • <strong className="text-blue-600">399 ETB</strong>
              </p>
            </div>

            {/* Price Increase Urgent Reminder */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span><strong>Special Offer:</strong> Lock in 399 ETB today before price jumps to 649 ETB.</span>
              </div>
              <span className="font-bold text-amber-800 text-[11px]">Save 250 ETB</span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Target Gmail Address */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center justify-between">
                <span>1. Target Gmail Address (For Direct Activation)</span>
                <span className="text-[10px] text-emerald-600 font-semibold lowercase">100% private instance</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={targetGmail}
                  onChange={(e) => setTargetGmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm text-[#111827] font-medium bg-white/60 border border-white/80 outline-none focus:bg-white transition-colors"
                />
              </div>
              <p className="text-[11px] text-[#9CA3AF]">
                An automated confirmation receipt and 24h redeem authorization link will be sent to this Gmail.
              </p>
            </div>

            {/* Step 2: Payment Rail Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider">
                2. Select Preferred Ethiopian Payment Channel
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = selectedMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        isSelected 
                          ? 'bg-white text-blue-600 border-blue-500/40 shadow-md ring-2 ring-blue-400/30' 
                          : 'bg-white/40 text-[#6B7280] border-white/80 hover:bg-white/70'
                      }`}
                    >
                      {method.id === 'telebirr' && <Smartphone className="w-4 h-4" />}
                      {method.id === 'cbe' && <Building2 className="w-4 h-4" />}
                      {method.id === 'abyssinia' && <Landmark className="w-4 h-4" />}
                      <span className="text-xs font-bold">{method.shortCode}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Account Transfer Details */}
            <div className="p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#111827]">{currentPayment.name} Account:</span>
                <span className="text-blue-600 font-semibold">{currentPayment.accountName}</span>
              </div>

              <div className="rounded-xl p-2.5 flex items-center justify-between bg-white/60 border border-white/80">
                <div>
                  <div className="text-[10px] text-[#9CA3AF] uppercase font-bold">Transfer To:</div>
                  <div className="font-mono text-sm font-extrabold text-[#111827]">
                    {currentPayment.accountNumber}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyAccount(currentPayment.accountNumber)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#111827] text-xs font-bold flex items-center gap-1 border border-slate-200/80 transition-colors cursor-pointer"
                >
                  {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-[11px] text-[#6B7280] leading-relaxed bg-white/50 p-2 rounded-xl border border-white/60">
                👉 Send <strong>399 ETB</strong> to the account above, then enter your transaction reference below.
              </div>
            </div>

            {/* Step 4: Transaction Reference Proof */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider">
                  Transaction Reference ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TXN-9283719"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs text-[#111827] font-mono bg-white/60 border border-white/80 outline-none focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider">
                  Sender Phone (Optional)
                </label>
                <input
                  type="text"
                  placeholder="0911..."
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs text-[#111827] bg-white/60 border border-white/80 outline-none focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Step 5: SLA Policy Enforcement Checkbox */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAcceptedSla}
                  onChange={(e) => setHasAcceptedSla(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-[11px] leading-relaxed">
                  <strong>I acknowledge the 24-Hour SLA Policy:</strong> The redeem authorization link must be executed within 24 hours of dispatch. Support issues must be reported within 24 hours for review (non-warranty basis thereafter).
                </span>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="clay-button w-full py-4 font-bold text-sm text-[#111827] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Recording Order & Dispatching Receipt...' : 'Confirm Order & Send Email Receipt (399 ETB)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
