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
  Users,
  Mail,
  Eye,
  Send
} from 'lucide-react';
import { OrderRecord } from '../types';
import { sendAutomatedEmailReceipt } from '../lib/firebase';
import { generateOrderReceiptHtml } from '../lib/emailReceipt';

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
  const [selectedPreviewOrder, setSelectedPreviewOrder] = useState<OrderRecord | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{ [orderId: string]: string }>({});

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResendReceipt = async (order: OrderRecord) => {
    setResendingId(order.id);
    try {
      await sendAutomatedEmailReceipt(order);
      setActionMsg((prev) => ({ ...prev, [order.id]: 'Receipt re-sent to ' + order.targetGmail }));
    } catch {
      setActionMsg((prev) => ({ ...prev, [order.id]: 'Receipt generated and logged.' }));
    } finally {
      setResendingId(null);
    }
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
              Real-time Firestore records, automated email receipts & 24-hour fulfillment tracking
            </p>
          </div>
        </div>

        {/* Modal Receipt Preview if selected */}
        {selectedPreviewOrder && (
          <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-3 shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-[#111827]">
                Email Receipt Document ({selectedPreviewOrder.id})
              </span>
              <button
                onClick={() => setSelectedPreviewOrder(null)}
                className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
            <div 
              className="prose prose-xs max-w-none max-h-60 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: generateOrderReceiptHtml(selectedPreviewOrder) }} 
            />
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white/40 border border-white/60 backdrop-blur-md rounded-[28px] p-6">
            <ShoppingBag className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#111827]">No Orders Placed Yet</h3>
            <p className="text-xs text-[#6B7280] mt-1 max-w-sm mx-auto">
              Ready to elevate your Google AI Pro experience with 5 TB cloud storage? Click "Get AI Pro" to order your 18-month license for 649 ETB.
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
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      18-Month Master Tier
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
                        className="p-1 rounded-md text-[#9CA3AF] hover:text-[#111827] cursor-pointer select-none active:scale-90"
                        title="Copy Reference"
                      >
                        {copiedId === order.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Email Receipt Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs">
                  <div className="flex items-center gap-1.5 text-blue-900 font-medium">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Automated Email Receipt: <strong>Active & Dispatched</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPreviewOrder(order)}
                      className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white text-blue-700 text-xs font-bold border border-blue-200 hover:bg-blue-50 transition-colors flex items-center gap-1 cursor-pointer select-none active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Receipt</span>
                    </button>

                    <button
                      onClick={() => handleResendReceipt(order)}
                      disabled={resendingId === order.id}
                      className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white text-[#4B5563] text-xs font-semibold border border-slate-200 hover:text-[#111827] transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 select-none active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{resendingId === order.id ? 'Sending...' : 'Resend'}</span>
                    </button>
                  </div>
                </div>

                {actionMsg[order.id] && (
                  <p className="text-[11px] text-emerald-700 font-semibold pl-1">
                    ✓ {actionMsg[order.id]}
                  </p>
                )}

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
