import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Landmark, 
  Copy, 
  Check, 
  QrCode, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PAYMENT_METHODS } from '../data/productData';
import { PaymentMethod } from '../types';

interface PaymentRailsCardProps {
  onSelectPayment: (method: PaymentMethod) => void;
}

export const PaymentRailsCard: React.FC<PaymentRailsCardProps> = ({ onSelectPayment }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="payments" className="py-12 px-4 max-w-7xl mx-auto w-full scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/50 border border-white/80 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
          <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
          Frictionless Local Rails
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
          Accepted Ethiopian Payment Gateways
        </h2>
        <p className="text-[#6B7280] mt-2 text-sm sm:text-base">
          No foreign cards or international exchange needed. Pay 649 ETB securely via your favorite local Ethiopian provider.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PAYMENT_METHODS.map((method) => {
          const isCopied = copiedId === method.id;

          return (
            <div 
              key={method.id}
              className="glass-panel p-6 sm:p-7 rounded-[32px] flex flex-col justify-between hover:shadow-xl transition-all text-left"
            >
              <div className="space-y-4">
                {/* Header with Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: `${method.accentColor}15`, color: method.accentColor }}
                  >
                    {method.id === 'telebirr' && <Smartphone className="w-6 h-6" />}
                    {method.id === 'cbe' && <Building2 className="w-6 h-6" />}
                    {method.id === 'abyssinia' && <Landmark className="w-6 h-6" />}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/70 border border-white/80 text-[#6B7280]">
                    {method.shortCode}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#111827]">{method.name}</h3>
                  <p className="text-xs text-[#6B7280] font-medium">{method.accountName}</p>
                </div>

                {/* Account Number Box with Click-To-Copy */}
                <div className="rounded-2xl p-3.5 border border-white/80 bg-white/50 flex items-center justify-between backdrop-blur-md">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#9CA3AF]">Account / Phone</div>
                    <div className="font-mono text-base font-extrabold text-[#111827] tracking-wider">
                      {method.accountNumber}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(method.accountNumber, method.id)}
                    className="min-w-[40px] min-h-[40px] p-2 rounded-xl bg-white hover:bg-slate-50 active:scale-90 text-slate-700 border border-slate-200/80 transition-all cursor-pointer shadow-2xs flex items-center justify-center select-none"
                    title="Copy Account Number"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  </button>
                </div>

                {/* Instructions */}
                <div className="space-y-1.5 text-xs text-[#6B7280]">
                  <div className="font-bold text-[#111827] text-[11px] uppercase tracking-wide">Quick Steps:</div>
                  <p className="text-[11px] leading-relaxed text-[#6B7280] bg-white/40 p-2.5 rounded-xl border border-white/60">
                    {method.instructions}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/60 mt-4 space-y-2">
                <button
                  onClick={() => onSelectPayment(method.id)}
                  className="clay-button min-h-[48px] w-full py-3.5 font-bold text-xs text-[#111827] flex items-center justify-center gap-2 cursor-pointer select-none active:scale-95"
                >
                  <span>Pay with {method.shortCode} (649 ETB)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                <div className="text-center text-[10px] text-[#9CA3AF] font-medium">
                  Instant receipt & 24h SLA dispatch
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verification Notice */}
      <div className="mt-8 p-4 rounded-[24px] bg-white/40 border border-white/60 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280] max-w-4xl mx-auto text-center sm:text-left">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <span>After sending 649 ETB, simply paste your Transaction Reference ID in the checkout window for automated order matching.</span>
        </div>
      </div>
    </section>
  );
};
