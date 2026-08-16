import React, { useState } from 'react';
import { X, Shield, Sparkles, Loader2, CheckCircle2, Lock } from 'lucide-react';
import { loginWithGoogle, loginAsGuest } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message || 'Google sign-in popup was cancelled or blocked.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginAsGuest();
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Guest login error:', err);
      setError('Unable to initialize guest session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-fade-in">
      <div className="glass-panel rounded-[36px] w-full max-w-md p-6 sm:p-8 relative text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/60 hover:bg-white text-[#6B7280] hover:text-[#111827] border border-white/80 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] flex items-center justify-center mx-auto shadow-md mb-4">
          <Sparkles className="w-7 h-7 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-[#111827]">
          Sign In to Amir Plus
        </h2>
        <p className="text-xs text-[#6B7280] mt-1 max-w-xs mx-auto">
          Authenticate securely via Google to track your 18-month license, 5 TB storage quota, and 24h SLA orders in Firestore.
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="clay-button w-full py-3.5 px-4 font-bold text-xs text-[#111827] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          <button
            onClick={handleGuestSignIn}
            disabled={loading}
            className="w-full py-3 px-4 rounded-full text-[#6B7280] hover:text-[#111827] text-xs font-semibold hover:bg-white/60 transition-colors cursor-pointer"
          >
            Continue as Guest VIP
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-white/60 flex items-center justify-center gap-1.5 text-[11px] text-[#9CA3AF]">
          <Lock className="w-3.5 h-3.5" />
          <span>Protected by Firebase Auth & Firestore ABAC Rules</span>
        </div>
      </div>
    </div>
  );
};
