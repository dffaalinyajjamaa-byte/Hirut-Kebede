import React, { useState } from 'react';
import { HardDrive, Users, Check, Sparkles, PieChart, Image, Mail, FolderArchive } from 'lucide-react';

interface StorageSeatCalculatorProps {
  onOpenCheckout: () => void;
}

export const StorageSeatCalculator: React.FC<StorageSeatCalculatorProps> = ({ onOpenCheckout }) => {
  const [seats, setSeats] = useState<number>(5);
  const totalStorageTB = 5;
  const totalStorageGB = 5000;
  const storagePerSeatGB = Math.floor(totalStorageGB / seats);
  const pricePerSeatETB = (399 / seats).toFixed(1);
  const pricePerSeatPerMonthETB = (399 / seats / 18).toFixed(1);

  return (
    <section id="storage" className="py-12 px-4 max-w-7xl mx-auto w-full scroll-mt-24">
      <div className="glass-panel rounded-[40px] p-6 sm:p-10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/50 border border-white/80 text-blue-600 text-xs font-bold uppercase tracking-widest mb-2 backdrop-blur-md">
                <HardDrive className="w-3.5 h-3.5" />
                5 TB Ecosystem Simulator
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Simulate Your 5 TB & 5-Seat Workspace
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-2 leading-relaxed">
                Google AI Pro includes 5,000 GB shared storage. Allocate private capacities across your family members, designers, or development squad.
              </p>
            </div>

            {/* Slider: Select Number of Seats */}
            <div className="p-5 bg-white/50 border border-white/80 rounded-[28px] space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-600" /> Active Team/Family Seats
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-100/80 text-purple-800 text-xs font-bold font-mono">
                  {seats} Member{seats > 1 ? 's' : ''}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="w-full h-2 bg-slate-200/80 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-[11px] font-semibold text-[#9CA3AF]">
                <span>1 Seat (Solo)</span>
                <span>2 Seats</span>
                <span>3 Seats</span>
                <span>4 Seats</span>
                <span>5 Seats (Max Team)</span>
              </div>
            </div>

            {/* Live Per-Seat Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-md">
                <div className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-wider">Quota Per Member</div>
                <div className="text-lg font-black text-[#111827] mt-0.5">{storagePerSeatGB} GB</div>
                <div className="text-[10px] text-[#6B7280] font-medium">Original 4K / RAW storage</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-md">
                <div className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-wider">Cost Per Seat</div>
                <div className="text-lg font-black text-blue-600 mt-0.5">{pricePerSeatETB} ETB</div>
                <div className="text-[10px] text-[#6B7280] font-medium">For full 18 months</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-md col-span-2 sm:col-span-1">
                <div className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-wider">Monthly / Member</div>
                <div className="text-lg font-black text-emerald-600 mt-0.5">{pricePerSeatPerMonthETB} ETB</div>
                <div className="text-[10px] text-[#6B7280] font-medium">Unbeatable Ethiopian value</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Ecosystem Canvas */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-7 rounded-[32px] space-y-5 text-left border border-white/80">
              <div className="flex items-center justify-between pb-3 border-b border-white/60">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-[#111827] text-sm">5,000 GB Ecosystem Distribution</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50/80 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                  100% Private Per Seat
                </span>
              </div>

              {/* Visual Multi-Segment Bar */}
              <div className="space-y-2">
                <div className="h-4 w-full rounded-full bg-slate-200/60 overflow-hidden flex shadow-inner">
                  <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: '45%' }} title="Google Drive Files (45%)" />
                  <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: '35%' }} title="Google Photos RAW/4K (35%)" />
                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: '20%' }} title="Gmail & Workspace (20%)" />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    <div>
                      <span className="font-bold text-[#111827]">Google Drive</span>
                      <p className="text-[10px] text-[#9CA3AF]">~2,250 GB Files</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                    <div>
                      <span className="font-bold text-[#111827]">Google Photos</span>
                      <p className="text-[10px] text-[#9CA3AF]">~1,750 GB Media</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <span className="font-bold text-[#111827]">Gmail & Attach</span>
                      <p className="text-[10px] text-[#9CA3AF]">~1,000 GB Mail</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-seat member avatar visualization */}
              <div className="pt-3 space-y-2">
                <div className="text-xs font-bold text-[#111827]">Member Allocations ({seats}/5 Configured):</div>
                <div className="space-y-1.5">
                  {Array.from({ length: seats }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-2.5 rounded-2xl bg-white/50 border border-white/80 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                          M{index + 1}
                        </div>
                        <span className="font-semibold text-[#111827]">
                          {index === 0 ? 'Primary License Holder (You)' : `Member ${index + 1} (Family / Colleague)`}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-blue-600 bg-white/90 px-2 py-0.5 rounded-full border border-white shadow-2xs">
                        {storagePerSeatGB} GB Quota
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenCheckout}
                className="clay-button w-full py-3 font-bold text-xs text-[#111827] cursor-pointer mt-2"
              >
                <span>Deploy 5 TB Plan for 399 ETB</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
