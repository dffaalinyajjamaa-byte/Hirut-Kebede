import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  HardDrive, 
  Users, 
  Globe2, 
  Clock, 
  CreditCard, 
  Zap, 
  ChevronRight,
  Lock,
  ArrowRight
} from 'lucide-react';
import { GOOGLE_AI_PRO_TIER } from '../data/productData';

interface HeroSectionProps {
  onOpenCheckout: () => void;
  onOpenChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCheckout, onOpenChat }) => {
  return (
    <section className="relative pt-6 pb-16 px-4 max-w-7xl mx-auto w-full">
      {/* Decorative Ambient Iridescent Glow Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Glass Hero Stage */}
      <div className="glass-panel rounded-[40px] p-6 sm:p-10 md:p-14 relative overflow-hidden">
        {/* Holographic Top Banner Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-wide text-blue-900">
              ⚡ Google AI Pro (Gemini Advanced) Master Subscription • 649 ETB
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] bg-white/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>24h SLA • Instant Email Receipt to Gmail</span>
          </div>
        </div>

        {/* Hero Header & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Copy & Commercials */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Google AI Pro Master Subscription</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111827] leading-[1.1]">
                Google AI Pro <br className="hidden sm:block" />
                <span className="iridescent-text italic">Premium Access</span>
              </h1>
              <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl font-normal pt-1">
                High-tier Google Gemini Advanced subscription for Ethiopia. Professional infrastructure, simplified fulfillment with <strong className="text-[#111827] font-semibold">5 TB unified cloud storage</strong>, <strong className="text-[#111827] font-semibold">5 multi-seat family/team allocations</strong>, and activation directly on your personal Gmail.
              </p>
            </div>

            {/* Frosted Glass Value Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 bg-white/40 border border-white/60 rounded-2xl backdrop-blur-md transition-all hover:bg-white/60">
                <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-bold block mb-1">Access</span>
                <span className="text-sm font-bold text-[#111827]">18-Month Plan</span>
              </div>

              <div className="p-4 bg-white/40 border border-white/60 rounded-2xl backdrop-blur-md transition-all hover:bg-white/60">
                <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-bold block mb-1">Storage</span>
                <span className="text-sm font-bold text-[#111827]">5 TB Ecosystem</span>
              </div>

              <div className="p-4 bg-white/40 border border-white/60 rounded-2xl backdrop-blur-md transition-all hover:bg-white/60 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-bold block mb-1">Privacy SLA</span>
                <span className="text-sm font-bold text-[#111827]">100% Personal Gmail</span>
              </div>
            </div>

            {/* CTA & Pricing Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenCheckout}
                className="clay-button min-h-[52px] px-8 py-4 text-slate-900 font-bold text-base flex items-center justify-center gap-3 cursor-pointer select-none active:scale-95 group"
              >
                <span>Subscribe Now</span>
                <span className="gemini-gradient-bg text-white px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-sm">
                  649 ETB
                </span>
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenChat}
                className="min-h-[52px] p-4 bg-white/50 border border-white/80 hover:bg-white/80 rounded-full text-[#111827] font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-md shadow-xs select-none active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Ask AI Specialist</span>
              </button>
            </div>

            {/* Quick Micro-Trust Guarantee */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#6B7280] pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> No foreign card required
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-blue-600" /> TeleBirr • CBE • BoA
              </span>
              <span className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-purple-600" /> Global (No VPN)
              </span>
            </div>
          </div>

          {/* Right Column: Luxury Interactive Pricing Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="glass-panel w-full max-w-[420px] p-8 rounded-[40px] relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-[#111827]">649 ETB</h3>
                    <span className="text-xs text-[#9CA3AF] line-through font-medium">~36,000 ETB</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5">All-inclusive fixed rate (18 Months)</p>
                  <div className="mt-1.5 inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-bold text-emerald-800">
                    Save ~35,350 ETB vs standard monthly billing
                  </div>
                </div>
                <div className="px-3.5 py-1.5 bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/20 rounded-full">
                  <span className="text-[11px] font-bold text-[#3B82F6] uppercase tracking-wider">BEST VALUE</span>
                </div>
              </div>

              {/* Feature Items */}
              <div className="space-y-3.5 mb-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50/80 border border-blue-100 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#111827]">Add up to 5 family/team members</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50/80 border border-blue-100 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#111827]">5 TB Unified Cloud Storage</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50/80 border border-blue-100 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#111827]">No foreign billing required</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50/80 border border-blue-100 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#111827]">Activation on personal Gmail</span>
                </div>
              </div>

              {/* Payment Badges in Card */}
              <div className="mb-6 text-left">
                <p className="text-[11px] text-[#9CA3AF] uppercase font-bold tracking-widest mb-2.5">
                  Accepted Payment Rails
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="px-3 py-2 bg-white/70 rounded-xl shadow-xs border border-white flex items-center justify-center font-bold text-[11px] text-amber-700">
                    TeleBirr
                  </div>
                  <div className="px-3 py-2 bg-white/70 rounded-xl shadow-xs border border-white flex items-center justify-center font-bold text-[11px] text-blue-800">
                    CBE Birr
                  </div>
                  <div className="px-3 py-2 bg-white/70 rounded-xl shadow-xs border border-white flex items-center justify-center font-bold text-[11px] text-rose-700">
                    BoA
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenCheckout}
                className="clay-button min-h-[50px] w-full py-4 font-bold text-base text-[#111827] cursor-pointer select-none active:scale-95"
              >
                Proceed to Order (649 ETB)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
