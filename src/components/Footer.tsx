import React from 'react';
import { Sparkles, ShieldCheck, Clock, Lock, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCheckout: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCheckout, onOpenChat }) => {
  return (
    <footer className="mt-20 border-t border-white/60 bg-white/20 backdrop-blur-xl py-12 px-4 z-10 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Tier CTA & Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="text-left">
              <div className="font-bold text-[#111827] text-lg tracking-tight">
                Amir<span className="text-[#6B7280] font-medium">Plus</span>
              </div>
              <p className="text-xs text-[#6B7280]">Google AI Pro (Gemini Advanced 18-Month Master License)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenChat}
              className="clay-button px-5 py-2.5 text-xs font-bold text-[#6B7280] hover:text-[#111827] cursor-pointer"
            >
              Consult AI Specialist
            </button>
            <button
              onClick={onOpenCheckout}
              className="px-6 py-2.5 rounded-full gemini-gradient-bg text-white text-xs font-bold shadow-md hover:opacity-95 cursor-pointer"
            >
              Subscribe (399 ETB)
            </button>
          </div>
        </div>

        {/* Commercial Fulfillment & SLA Legal Disclaimer */}
        <div className="p-6 rounded-[28px] bg-white/40 border border-white/60 text-left space-y-3 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Commercial Terms & Fulfillment SLA Guidelines</span>
          </div>
          <p className="text-[11px] text-[#6B7280] leading-relaxed">
            • <strong>Activation Policy:</strong> The redeem authorization link must be executed within 24 hours of delivery.<br />
            • <strong>Support Protocol:</strong> Connection and activation queries must be submitted within 24 hours for official review. Reissues or renewals are not available after the 24-hour delivery window has elapsed.<br />
            • <strong>Privacy & Security:</strong> All licenses are private instances activated onto personal Google accounts with zero credential sharing.<br />
            • <strong>Warranty:</strong> Delivered on a non-warranty basis following verified 24-hour activation. Global provisioning available without IP restrictions.
          </p>
        </div>

        {/* Bottom Credits & SLA Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#6B7280] font-medium pt-2">
          <div className="flex gap-8 text-left">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Activation Window</span>
              <span className="text-xs font-semibold text-[#111827]">24 Hours Post-Dispatch</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Privacy SLA</span>
              <span className="text-xs font-semibold text-[#111827]">100% Private Instance</span>
            </div>
          </div>

          <p className="text-[11px] text-[#6B7280] sm:text-right max-w-sm">
            © {new Date().getFullYear()} Amir Plus Digital Systems. Non-warranty basis. Reporting window: 24h.
          </p>
        </div>
      </div>
    </footer>
  );
};
