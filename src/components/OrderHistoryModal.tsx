import React, { useEffect, useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertCircle,
  HardDrive,
  Users
} from 'lucide-react';
import { OrderRecord } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to calculate remaining time from SLA deadline
  const formatSlaRemaining = (deadlineIso: string) => {
    const deadline = new Date(deadlineIso).getTime();
    const now = Date.now();
    const diffMs = deadline - now;

    if (diffMs <= 0) {
      return 'SLA Dispatched / Verified';
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m remaining in 24h SLA`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-fade-in">
      <div className="glass-panel rounded-[36px] w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative text-left shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/60 hover:bg-white text-[#6B7280] hover:text-[#111827] border border-white/80 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-white/60 text-blue-600 border border-white/80 flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
              My Orders & Licenses
            </h2>
            <p className="text-xs text-[#6B7280]">
              Real-time Firestore records & 24-hour fulfillment tracking
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white/40 border border-white/60 backdrop-blur-md rounded-[28px] p-6">
            <ShoppingBag className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#111827]">No Orders Placed Yet</h3>
            <p className="text-xs text-[#6B7280] mt-1 max-w-sm mx-auto">
              Ready to elevate your Google AI Pro experience with 5 TB cloud storage? Click "Get AI Pro" to submit your order.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="p-5 rounded-[28px] bg-white/50 border border-white/80 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/60">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#111827]">
                      {order.id}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-white/70 text-[#111827] border border-white/80">
                      {order.paymentMethod}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <Clock className="w-3 h-3 text-amber-600" />
                    {formatSlaRemaining(order.slaDeadline)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Target Gmail:</div>
                    <div className="font-semibold text-[#111827]">{order.targetGmail}</div>
                  </div>

                  <div>
                    <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Inclusions:</div>
                    <div className="font-semibold text-blue-600">18-Month • 5 TB Storage • 5 Seats</div>
                  </div>

                  <div>
                    <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Amount Paid:</div>
                    <div className="font-bold text-[#111827]">{order.priceETB} ETB</div>
                  </div>

                  <div>
                    <div className="text-[#9CA3AF] text-[10px] uppercase font-bold">Transaction Ref:</div>
                    <div className="font-mono text-[#111827] flex items-center gap-1.5">
                      <span>{order.paymentReference}</span>
                      <button
                        onClick={() => handleCopy(order.paymentReference, order.id)}
                        className="text-[#9CA3AF] hover:text-[#111827] cursor-pointer"
                        title="Copy Reference"
                      >
                        {copiedId === order.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* SLA Fulfillment Warning */}
                <div className="p-2.5 rounded-xl bg-white/40 border border-white/60 text-[11px] text-[#6B7280] flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Your authorization redeem invite is dispatched directly to <strong>{order.targetGmail}</strong>. Remember to click accept within 24 hours of arrival.
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
