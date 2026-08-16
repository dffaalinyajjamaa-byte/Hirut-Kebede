import React from 'react';
import { 
  ShieldCheck, 
  HardDrive, 
  Users, 
  Lock, 
  CreditCard, 
  Globe2, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  FileText,
  Key,
  Layers
} from 'lucide-react';
import { GOOGLE_AI_PRO_TIER } from '../data/productData';

interface ProductSpecsCardProps {
  onOpenCheckout: () => void;
}

export const ProductSpecsCard: React.FC<ProductSpecsCardProps> = ({ onOpenCheckout }) => {
  return (
    <section id="specifications" className="py-12 px-4 max-w-7xl mx-auto w-full scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/50 border border-white/80 text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-3 backdrop-blur-md">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          Technical & Commercial Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
          Product Specifications
        </h2>
        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-900">
          <span>⚡ Price increases to 649 ETB next batch — Lock in 399 ETB now and save 250 ETB</span>
        </div>
        <p className="text-[#6B7280] mt-2 text-sm sm:text-base">
          Engineered for developers, designers, agencies, and families needing unrestricted AI power with massive cloud storage.
        </p>
      </div>

      {/* Specifications Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Spec 1: 18-Month Continuous Duration */}
        <div className="glass-panel rounded-[28px] p-6 sm:p-7 space-y-4 hover:shadow-lg transition-all text-left">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg shadow-xs">
            18M
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">18-Month Continuous License</h3>
            <p className="text-xs font-semibold text-blue-600 mt-0.5">Continuous uninterrupted access</p>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Full 18 months of uninterrupted Gemini Pro access. No monthly renewals, zero surprise charges, and guaranteed continuity throughout your entire license period.
          </p>
          <div className="pt-2 text-xs font-medium text-[#6B7280] border-t border-white/60 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> One-time 399 ETB payment
          </div>
        </div>

        {/* Spec 2: 5 TB Cloud Ecosystem */}
        <div className="glass-panel rounded-[28px] p-6 sm:p-7 space-y-4 hover:shadow-lg transition-all text-left">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">5 TB Cloud Ecosystem</h3>
            <p className="text-xs font-semibold text-indigo-600 mt-0.5">5,000 GB shared storage pool</p>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Massive 5 TB cloud storage unified across Google Drive, Google Photos (original 4K backups), and Gmail inbox. Easily store terabytes of 4K video, RAW files, and archives.
          </p>
          <div className="pt-2 text-xs font-medium text-[#6B7280] border-t border-white/60 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Original resolution storage
          </div>
        </div>

        {/* Spec 3: Multi-Seat Access */}
        <div className="glass-panel rounded-[28px] p-6 sm:p-7 space-y-4 hover:shadow-lg transition-all text-left">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-xs">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">Multi-Seat Access (Up to 5)</h3>
            <p className="text-xs font-semibold text-purple-600 mt-0.5">Family & Team member sharing</p>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Add up to 5 family members or team colleagues. Each member receives their own independent workspace and private cloud storage quota while sharing the 5 TB plan.
          </p>
          <div className="pt-2 text-xs font-medium text-[#6B7280] border-t border-white/60 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Independent member profiles
          </div>
        </div>

        {/* Spec 4: Privacy Guarantee */}
        <div className="glass-panel rounded-[28px] p-6 sm:p-7 space-y-4 hover:shadow-lg transition-all text-left">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">100% Private Instance</h3>
            <p className="text-xs font-semibold text-emerald-600 mt-0.5">Activated directly on your Gmail</p>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Activated directly onto your existing personal Google/Gmail account. No shared passwords, no temporary accounts. Only you have access to your documents and chats.
          </p>
          <div className="pt-2 text-xs font-medium text-[#6B7280] border-t border-white/60 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct Gmail Authorization
          </div>
        </div>

        {/* Spec 5: Frictionless Onboarding */}
        <div className="glass-panel rounded-[28px] p-6 sm:p-7 space-y-4 hover:shadow-lg transition-all text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">Frictionless Onboarding</h3>
            <p className="text-xs font-semibold text-amber-600 mt-0.5">No foreign credit card required</p>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Eliminates the hurdle of international credit cards, USD conversion limits, and PayPal blocks. Pay smoothly in Ethiopian Birr using TeleBirr, CBE, or Bank of Abyssinia.
          </p>
          <div className="pt-2 text-xs font-medium text-[#6B7280] border-t border-white/60 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Local Ethiopian Birr settlement
          </div>
        </div>

        {/* Spec 6: Global Provisioning */}
        <div className="glass-panel rounded-[28px] p-6 sm:p-7 space-y-4 hover:shadow-lg transition-all text-left">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shadow-xs">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">Global Provisioning</h3>
            <p className="text-xs font-semibold text-cyan-600 mt-0.5">Zero IP or VPN restrictions</p>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Operates worldwide seamlessly. Connect from Ethiopia, Africa, Europe, the Americas, or Asia with 100% native speeds and zero requirement for third-party VPN proxies.
          </p>
          <div className="pt-2 text-xs font-medium text-[#6B7280] border-t border-white/60 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Native low-latency connection
          </div>
        </div>
      </div>

      {/* Critical Fulfillment SLA & Commercial Policy Box */}
      <div id="sla" className="mt-8 glass-panel rounded-[32px] p-6 sm:p-8 border border-amber-200/80 bg-amber-50/40 relative overflow-hidden scroll-mt-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 text-left max-w-2xl">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Critical Fulfillment & Support SLA (24-Hour Policy + Automated Email Receipt)</span>
            </div>
            <p className="text-xs sm:text-sm text-[#111827] leading-relaxed">
              <strong>1. Instant Email Notification:</strong> An automated confirmation receipt is immediately sent to your provided Gmail with order details.<br />
              <strong>2. Activation Window:</strong> The official redeem authorization link must be executed within <span className="text-amber-800 font-bold">24 hours</span> of dispatch.<br />
              <strong>3. Support SLA:</strong> Any connection or activation issues must be reported within <span className="text-amber-800 font-bold">24 hours</span> for immediate review.<br />
              <strong>4. Policy:</strong> Commercial sales are provisioned on a non-warranty basis after the 24-hour verification window has passed.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenCheckout}
              className="clay-button w-full md:w-auto px-6 py-3 font-bold text-xs text-[#111827] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Accept Policy & Lock in 399 ETB</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
