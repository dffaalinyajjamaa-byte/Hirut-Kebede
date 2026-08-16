import React from 'react';
import { Sparkles, Shield, User as UserIcon, LogOut, ShoppingBag, MessageSquareText } from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  user: User | null;
  orderCount: number;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenOrders: () => void;
  onOpenChat: () => void;
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  orderCount,
  onOpenAuth,
  onLogout,
  onOpenOrders,
  onOpenChat,
  onOpenCheckout,
}) => {
  return (
    <header className="sticky top-0 z-50 px-4 py-3 max-w-7xl mx-auto w-full transition-all">
      <div className="glass-panel rounded-3xl px-5 py-3 flex items-center justify-between shadow-sm">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-[#111827]">Amir Plus</span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                AI Pro Specialist
              </span>
            </div>
            <p className="text-xs text-[#6B7280] font-medium">Google AI Pro • 18-Month Master Tier</p>
          </div>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#4B5563]">
          <a href="#specifications" className="px-3 py-1.5 rounded-full hover:text-[#111827] hover:bg-white/60 transition-colors">
            Specifications
          </a>
          <a href="#storage" className="px-3 py-1.5 rounded-full hover:text-[#111827] hover:bg-white/60 transition-colors">
            5 TB Storage
          </a>
          <a href="#mockups" className="px-3 py-1.5 rounded-full hover:text-[#111827] hover:bg-white/60 transition-colors">
            UI Studio
          </a>
          <a href="#payments" className="px-3 py-1.5 rounded-full hover:text-[#111827] hover:bg-white/60 transition-colors">
            Local Payments
          </a>
          <a href="#sla" className="px-3 py-1.5 rounded-full hover:text-[#111827] hover:bg-white/60 transition-colors">
            24h SLA
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Price Increase Warning Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Price jumps to 649 ETB soon!</span>
          </div>

          {/* AI Sales Chat Button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-blue-700 bg-blue-50/90 hover:bg-blue-100 border border-blue-200/60 transition-all cursor-pointer"
            title="Ask Amir Plus AI Specialist"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Specialist</span>
          </button>

          {/* User Orders Button if has orders or logged in */}
          {user && (
            <button
              onClick={onOpenOrders}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#111827] bg-white/80 hover:bg-white border border-white shadow-xs transition-all cursor-pointer"
              title="My Orders & License Keys"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#4B5563]" />
              <span className="hidden sm:inline">Orders</span>
              {orderCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {orderCount}
                </span>
              )}
            </button>
          )}

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2 pl-1">
              <div className="flex items-center gap-1.5 bg-white/60 rounded-full py-1 px-2.5 border border-white/80">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4 text-[#4B5563]" />
                )}
                <span className="text-xs font-medium text-[#111827] max-w-[100px] truncate hidden md:inline">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="text-[#9CA3AF] hover:text-rose-600 p-0.5 rounded-full transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="clay-button px-3.5 py-1.5 text-xs font-bold text-[#111827] flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Sign In</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={onOpenCheckout}
            className="clay-button px-4 py-2 text-xs font-bold text-[#111827] flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50"
          >
            <span>Get AI Pro</span>
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-xs">
              399 ETB
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
