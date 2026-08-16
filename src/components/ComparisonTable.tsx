import React from 'react';
import { Check, X, Shield, Sparkles, Scale } from 'lucide-react';
import { COMPARISON_DATA } from '../data/productData';

interface ComparisonTableProps {
  onOpenCheckout: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onOpenCheckout }) => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto w-full scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/50 border border-white/80 text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 backdrop-blur-md">
          <Scale className="w-3.5 h-3.5" />
          Transparent Tier Benchmark
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
          Amir Plus vs Standard Options
        </h2>
        <p className="text-[#6B7280] mt-2 text-sm sm:text-base">
          See why professionals and families choose the Amir Plus 18-Month Google AI Pro master license.
        </p>
      </div>

      <div className="glass-panel rounded-[36px] p-4 sm:p-8 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-white/60">
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#9CA3AF] w-1/3">
                Feature / Inclusion
              </th>
              <th className="py-4 px-4 text-sm font-bold text-blue-600 bg-blue-50/50 rounded-t-2xl border-x border-t border-blue-100/60 w-1/3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Amir Plus (Google AI Pro)</span>
                </div>
                <div className="text-[11px] font-normal text-blue-600 mt-0.5">399 ETB (18 Months)</div>
              </th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#6B7280] w-1/6">
                Standard Google AI
                <div className="text-[10px] font-normal text-[#9CA3AF]">$19.99/mo USD</div>
              </th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#6B7280] w-1/6">
                ChatGPT Plus
                <div className="text-[10px] font-normal text-[#9CA3AF]">$20/mo USD</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/60 text-xs">
            {COMPARISON_DATA.map((row, index) => (
              <tr key={index} className="hover:bg-white/30 transition-colors">
                <td className="py-4 px-4 font-semibold text-[#111827]">
                  {row.feature}
                </td>
                <td className="py-4 px-4 font-semibold text-[#111827] bg-blue-50/20 border-x border-blue-100/30">
                  <span className="inline-flex items-center gap-1.5 text-blue-900">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
                    {row.amirPlus}
                  </span>
                </td>
                <td className="py-4 px-4 text-[#6B7280] font-medium">
                  {row.standardGoogle}
                </td>
                <td className="py-4 px-4 text-[#6B7280] font-medium">
                  {row.chatGptPlus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 pt-4 border-t border-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#6B7280] font-medium text-center sm:text-left">
            ⚡ Save over 35,000 ETB with single Ethiopian local payment settlement.
          </div>
          <button
            onClick={onOpenCheckout}
            className="clay-button px-6 py-2.5 font-bold text-xs text-[#111827] flex items-center gap-2 cursor-pointer"
          >
            <span>Activate for 399 ETB</span>
          </button>
        </div>
      </div>
    </section>
  );
};
