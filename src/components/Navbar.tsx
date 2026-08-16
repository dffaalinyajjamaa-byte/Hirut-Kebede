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
      <div className="liquid-glass rounded-3xl px-5 py-3 flex items-center justify-between shadow-sm">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl gemini-gradient-bg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900">Amir Plus</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full gemini-badge text-indigo-700">
                AI Pro Specialist
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Google AI Pro • 18-Month Master Tier</p>
          </div>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <a href="#specifications" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-colors">
            Specifications
          </a>
          <a href="#storage" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-colors">
            5 TB Storage
          </a>
          <a href="#mockups" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-colors">
            UI Studio
          </a>
          <a href="#payments" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-colors">
            Local Payments
          </a>
          <a href="#sla" className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/70 transition-colors">
            24h SLA
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* AI Sales Chat Button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200/60 transition-all cursor-pointer"
            title="Ask Amir Plus AI Specialist"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Specialist</span>
          </button>

          {/* User Orders Button if has orders or logged in */}
          {user && (
            <button
              onClick={onOpenOrders}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-all cursor-pointer"
              title="My Orders & License Keys"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Orders</span>
              {orderCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {orderCount}
                </span>
              )}
            </button>
          )}

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2 pl-1">
              <div className="flex items-center gap-1.5 bg-slate-100/80 rounded-full py-1 px-2.5 border border-slate-200/60">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4 text-slate-600" />
                )}
                <span className="text-xs font-medium text-slate-700 max-w-[100px] truncate hidden md:inline">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="text-slate-400 hover:text-rose-600 p-0.5 rounded-full transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="clay-pill px-3.5 py-1.5 text-xs font-semibold text-slate-800 flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sign In</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={onOpenCheckout}
            className="px-4 py-2 rounded-full text-xs font-bold text-white gemini-gradient-bg shadow-md hover:opacity-95 hover:shadow-lg active:scale-98 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Get AI Pro</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px] font-mono">399 ETB</span>
          </button>
        </div>
      </div>
    </header>
  );
};
