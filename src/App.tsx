import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Sparkles, MessageSquareText, Shield, ArrowUp } from 'lucide-react';
import { auth, subscribeToUserOrders, logoutUser, testFirestoreConnection } from './lib/firebase';
import { OrderRecord, PaymentMethod } from './types';

// Subcomponents
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductSpecsCard } from './components/ProductSpecsCard';
import { StorageSeatCalculator } from './components/StorageSeatCalculator';
import { MockupStudio } from './components/MockupStudio';
import { ComparisonTable } from './components/ComparisonTable';
import { PaymentRailsCard } from './components/PaymentRailsCard';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { AiConsultantDrawer } from './components/AiConsultantDrawer';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('telebirr');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize Firebase Auth listener & test Firestore connection
  useEffect(() => {
    testFirestoreConnection();

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore orders when user is authenticated
  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const unsubscribeOrders = subscribeToUserOrders(user.uid, (fetchedOrders) => {
      setOrders(fetchedOrders);
    });

    return () => unsubscribeOrders();
  }, [user]);

  // Handle window scroll for floating controls
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenCheckoutWithPayment = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: OrderRecord) => {
    // Add to local state immediately if in guest mode
    if (!user) {
      setOrders((prev) => [newOrder, ...prev]);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] text-[#111827] relative selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Decorative Frosted Ambient Gemini Glows */}
      <div className="gemini-glow top-[-100px] right-[-100px]" />
      <div className="gemini-glow top-[40%] left-[-150px] opacity-70" />
      <div className="gemini-glow bottom-[-100px] right-[10%] opacity-60" />

      {/* Top Navbar */}
      <Navbar
        user={user}
        orderCount={orders.length}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={logoutUser}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Main Content Layout */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onOpenCheckout={() => setIsCheckoutOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
        />

        {/* 2. Product Architecture Specifications & 24h SLA */}
        <ProductSpecsCard
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />

        {/* 3. 5 TB Storage & 5 Multi-Seat Simulator */}
        <StorageSeatCalculator
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />

        {/* 4. Aesthetic Liquid Glass Mockup Studio */}
        <MockupStudio
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />

        {/* 5. Benchmark Comparison Table */}
        <ComparisonTable
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />

        {/* 6. Ethiopian Local Payment Channels */}
        <PaymentRailsCard
          onSelectPayment={handleOpenCheckoutWithPayment}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Floating Action Button: Amir Plus AI Specialist */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white text-slate-700 shadow-lg border border-slate-200/80 hover:bg-slate-50 transition-all cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => setIsChatOpen(true)}
          className="clay-pill px-5 py-3.5 bg-white text-slate-900 font-extrabold text-xs shadow-xl flex items-center gap-2.5 border border-white hover:border-indigo-200 transition-all cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-xl gemini-gradient-bg flex items-center justify-center text-white shadow-xs group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-indigo-600 uppercase font-bold tracking-wider leading-none">
              AI Sales Assistant
            </div>
            <div className="text-xs font-black text-slate-900 leading-tight">
              Talk to Amir Plus
            </div>
          </div>
        </button>
      </div>

      {/* Modals & Drawers */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        user={user}
        initialPaymentMethod={selectedPaymentMethod}
        onOrderSuccess={handleOrderSuccess}
      />

      <AiConsultantDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        user={user}
        onOpenCheckout={() => {
          setIsChatOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
