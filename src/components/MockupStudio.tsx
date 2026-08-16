import React, { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  Laptop, 
  Palette, 
  Briefcase, 
  Code2, 
  Check, 
  ArrowRight,
  Send,
  Loader2,
  HardDrive
} from 'lucide-react';
import { MOCKUP_PRESETS } from '../data/productData';
import { MockupPreset } from '../types';

interface MockupStudioProps {
  onOpenCheckout: () => void;
}

export const MockupStudio: React.FC<MockupStudioProps> = ({ onOpenCheckout }) => {
  const [activePreset, setActivePreset] = useState<MockupPreset>(MOCKUP_PRESETS[0]);
  const [customRole, setCustomRole] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customResult, setCustomResult] = useState<{
    title: string;
    summary: string;
    samplePrompt: string;
    sampleOutput: string;
    storageAllocation: string;
  } | null>(null);

  const handleGenerateCustomMockup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRole.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-mockup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: customRole, useCase: customGoal })
      });
      const data = await response.json();
      setCustomResult(data);
    } catch (error) {
      console.error('Failed to generate mockup:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="mockups" className="py-12 px-4 max-w-7xl mx-auto w-full scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/50 border border-white/80 text-blue-600 text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
          <Laptop className="w-3.5 h-3.5" />
          Frosted Glass Studio
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
          Aesthetic Workflow Mockups
        </h2>
        <p className="text-[#6B7280] mt-2 text-sm sm:text-base">
          Preview how Google AI Pro transforms software engineering, visual arts, and enterprise teams with Apple-grade Liquid Glass clarity.
        </p>
      </div>

      {/* Preset Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {MOCKUP_PRESETS.map((preset) => {
          const isActive = activePreset.id === preset.id && !customResult;
          return (
            <button
              key={preset.id}
              onClick={() => {
                setActivePreset(preset);
                setCustomResult(null);
              }}
              className={`clay-button min-h-[44px] px-5 py-2.5 text-xs font-bold transition-all cursor-pointer select-none active:scale-95 flex items-center gap-2 ${
                isActive 
                  ? 'border-blue-500/40 text-blue-700 bg-white/80 shadow-md ring-2 ring-blue-400/30' 
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {preset.id === 'fullstack-dev' && <Code2 className="w-3.5 h-3.5" />}
              {preset.id === 'creative-director' && <Palette className="w-3.5 h-3.5" />}
              {preset.id === 'executive-team' && <Briefcase className="w-3.5 h-3.5" />}
              <span>{preset.role}</span>
            </button>
          );
        })}
      </div>

      {/* Main Glass Studio Container */}
      <div className="glass-panel rounded-[40px] p-6 sm:p-10 relative overflow-hidden">
        {/* macOS Style Ceramic Header Bar */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400/80 shadow-2xs" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-2xs" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-2xs" />
            <span className="text-xs font-bold text-[#6B7280] font-mono ml-2">
              amir-plus-studio // {customResult ? customResult.title : activePreset.title}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50/80 border border-blue-200/60 px-3 py-1 rounded-full">
              {customResult ? 'Custom AI Studio' : activePreset.badge}
            </span>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          {/* Left: Role Specification & Storage Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#111827]">
                {customResult ? customResult.title : activePreset.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-2 leading-relaxed">
                {customResult ? customResult.summary : activePreset.description}
              </p>
            </div>

            {/* Storage & Specs Box */}
            <div className="p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
                <span className="flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-blue-600" /> Storage Architecture
                </span>
                <span className="text-blue-600 font-mono">
                  {customResult ? customResult.storageAllocation : '5 TB Unified (5,000 GB)'}
                </span>
              </div>

              {!customResult && (
                <div className="space-y-1.5 pt-1">
                  {activePreset.keySpecs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-[#6B7280] font-medium">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">✓</div>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Mockup Generator Form */}
            <form onSubmit={handleGenerateCustomMockup} className="p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-md space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827]">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Generate Custom Role Studio with AI:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Role (e.g. Architect)"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-white/60 border border-white/80 text-[#111827] placeholder-[#9CA3AF] outline-none w-full focus:bg-white"
                />
                <input
                  type="text"
                  placeholder="Main Goal (e.g. 3D Render)"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-white/60 border border-white/80 text-[#111827] placeholder-[#9CA3AF] outline-none w-full focus:bg-white"
                />
              </div>
              <button
                type="submit"
                disabled={isGenerating || !customRole.trim()}
                className="clay-button w-full py-2.5 font-bold text-xs text-[#111827] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{isGenerating ? 'Synthesizing Glass UI...' : 'Synthesize Custom Mockup'}</span>
              </button>
            </form>
          </div>

          {/* Right: Live Prompt Terminal Simulation */}
          <div className="lg:col-span-7 space-y-4">
            {/* Liquid Glass Terminal Box */}
            <div className="p-5 rounded-[28px] bg-white/60 border border-white/80 backdrop-blur-md space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-[#9CA3AF] text-[11px] pb-2 border-b border-white/60">
                <span className="flex items-center gap-1.5 text-blue-600 font-semibold">
                  <Terminal className="w-3.5 h-3.5" /> Prompt Studio Preview
                </span>
                <span>Gemini 2.5 Flash Engine</span>
              </div>

              {/* Input Prompt Box */}
              <div className="p-3.5 rounded-2xl bg-white/50 border border-white/60 text-[#111827] leading-relaxed">
                <div className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider mb-1 font-sans">
                  User Prompt Executed:
                </div>
                "{customResult ? customResult.samplePrompt : activePreset.previewPrompt}"
              </div>

              {/* AI Output Box */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/50 text-[#111827] leading-relaxed relative overflow-hidden">
                <div className="text-[10px] text-blue-600 uppercase font-bold tracking-wider mb-1 font-sans flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Gemini Pro Reasoning Output:
                </div>
                <p className="font-sans text-xs text-[#111827] leading-relaxed font-medium">
                  {customResult ? customResult.sampleOutput : activePreset.previewOutput}
                </p>
              </div>
            </div>

            {/* Quick Checkout Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-md">
              <div>
                <div className="text-xs font-bold text-[#111827]">Experience this speed on your Gmail</div>
                <div className="text-[11px] text-[#6B7280]">Includes 5 TB Cloud Storage & 5 Seats</div>
              </div>
              <button
                onClick={onOpenCheckout}
                className="clay-button min-h-[44px] px-5 py-2.5 font-bold text-xs text-[#111827] flex items-center gap-1.5 cursor-pointer select-none active:scale-95 w-full sm:w-auto justify-center"
              >
                <span>Get 18M Tier (649 ETB)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
