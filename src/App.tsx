import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Sparkles, 
  TrendingUp, 
  CloudSun, 
  ArrowRight, 
  ShieldAlert, 
  Building2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { LiveTicker } from './components/LiveTicker';
import { CropDoctor } from './components/CropDoctor';
import { MandiTracker } from './components/MandiTracker';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { AboutUs } from './components/AboutUs';
import { AgriChatModal } from './components/AgriChatModal';
import { Footer } from './components/Footer';
import { Language, MandiItem } from './types';
import { TRANSLATIONS } from './data/translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mandiData, setMandiData] = useState<MandiItem[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLang];

  // Fetch initial Mandi rates
  useEffect(() => {
    fetch('/api/mandi-rates')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setMandiData(json.data);
      })
      .catch((err) => console.error('Failed to load mandi data', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7faf7] text-[#0f2417] selection:bg-[#a7f3d0] selection:text-[#064e3b]">
      {/* Navigation with Primary Green theme and sharp edges */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenHelp={() => setIsChatOpen(true)}
      />

      {/* Live Scrolling Mandi Ticker */}
      <LiveTicker
        mandiData={mandiData}
        onOpenMandi={() => setActiveTab('mandi')}
      />

      {/* Prominent Global Advisory Note: AI can make mistakes */}
      <div className="bg-[#fefce8] border-b-2 border-[#f59e0b] text-[#92400e] px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-xs">
        <ShieldAlert className="w-4 h-4 text-[#b45309] shrink-0" />
        <span>
          <strong>Note: AI can make mistakes.</strong> Please cross-verify critical pesticide dosages with agricultural officers or your local KVK.
        </span>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-16 pb-16">
            {/* Hero Section (Vibrant Primary Green Theme) */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#064e3b] via-[#047857] to-[#064e3b] text-white py-16 sm:py-24 border-b-4 border-[#10b981]">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6ee7b7_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-[#022c22] border-2 border-[#10b981] text-[#a7f3d0] px-3.5 py-1.5 text-xs font-black tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
                      <span>KrishiLoka Studio AI • Created by Akshay Ramappa Nerli, AMBIT</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display leading-[1.12] text-white">
                      {t.heroTitle}
                    </h1>

                    <p className="text-sm sm:text-lg text-[#ecfdf5] max-w-2xl leading-relaxed font-medium">
                      {t.heroSubtitle}
                    </p>

                    {/* Sharp Animated Action Buttons in Green / Gold */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveTab('doctor')}
                        className="btn-sharp btn-green-accent text-xs sm:text-sm px-6 py-3.5 shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 uppercase tracking-wider"
                      >
                        <Sparkles className="w-4 h-4 text-[#064e3b]" />
                        <span>{t.scanLeafBtn}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('mandi')}
                        className="btn-sharp bg-[#022c22] hover:bg-[#034e3f] text-[#ecfdf5] border-2 border-[#34d399] font-bold text-xs sm:text-sm px-6 py-3.5 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                      >
                        <TrendingUp className="w-4 h-4 text-[#34d399]" />
                        <span>{t.checkMandiBtn}</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('about')}
                        className="btn-sharp bg-black/30 hover:bg-black/50 text-[#a7f3d0] font-bold text-xs sm:text-sm px-5 py-3.5 border border-[#10b981] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                      >
                        <Info className="w-4 h-4 text-[#34d399]" />
                        <span>About AMBIT</span>
                      </button>
                    </div>

                    {/* Metrics Banner */}
                    <div className="pt-6 border-t border-[#059669]/60 grid grid-cols-3 gap-4 text-left">
                      <div>
                        <div className="text-xl sm:text-2xl font-black font-mono text-[#a7f3d0]">
                          96%+
                        </div>
                        <p className="text-[11px] text-[#d1fae5] font-medium">AI Pathology Match</p>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-black font-mono text-white">
                          450+
                        </div>
                        <p className="text-[11px] text-[#d1fae5] font-medium">APMC Mandis Live</p>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-black font-mono text-[#34d399]">
                          24/7
                        </div>
                        <p className="text-[11px] text-[#d1fae5] font-medium">Krishi Mitr Support</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Hero Card: Quick Action Visual Hub (Green Theme & Sharp Edges) */}
                  <div className="lg:col-span-5">
                    <div className="bg-[#022c22]/90 border-2 border-[#10b981] p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#059669]/40 text-xs">
                        <span className="text-[#a7f3d0] font-black uppercase tracking-wider flex items-center gap-1.5">
                          <Sprout className="w-4 h-4 text-[#34d399]" />
                          Today's Smart Agri Brief
                        </span>
                        <span className="text-[10px] bg-[#064e3b] text-[#6ee7b7] font-mono font-bold px-2 py-0.5 border border-[#10b981]">
                          AMBIT Intel
                        </span>
                      </div>

                      {/* Quick Crop Doctor preview card */}
                      <div
                        onClick={() => setActiveTab('doctor')}
                        className="bg-white p-4 text-[#0f2417] cursor-pointer hover:bg-[#ecfdf5] border-2 border-transparent hover:border-[#10b981] transition-all shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#064e3b] uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
                            AI Crop Doctor
                          </span>
                          <span className="text-[10px] bg-[#dc2626] text-white font-black px-1.5 py-0.2 uppercase">
                            Instant Scan
                          </span>
                        </div>
                        <p className="text-xs font-black text-[#0f2417] mt-1">
                          Diagnose Leaf Blight, Rust, or Bollworm
                        </p>
                        <p className="text-[11px] text-[#065f46] mt-0.5 font-medium">
                          Get bio-fungicide dosages and spray timings calibrated by plant pathology guidelines.
                        </p>
                      </div>

                      {/* Live Mandi Snapshot card */}
                      <div
                        onClick={() => setActiveTab('mandi')}
                        className="bg-[#064e3b] p-4 text-white border-2 border-[#047857] cursor-pointer hover:border-[#34d399] transition-all"
                      >
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-black text-[#a7f3d0] uppercase">
                            Live Mandi Spot Rates
                          </span>
                          <span className="text-xs font-mono font-black text-[#6ee7b7]">
                            Tomato ₹2,450 / Paddy ₹2,850
                          </span>
                        </div>
                        <p className="text-xs text-[#d1fae5] mt-1 font-medium">
                          Real-time AGMARKNET prices across Karnataka, Maharashtra, Telangana, and Punjab.
                        </p>
                      </div>

                      {/* Weather snapshot */}
                      <div
                        onClick={() => setActiveTab('weather')}
                        className="bg-[#022c22] p-3 border border-[#047857] text-xs flex items-center justify-between cursor-pointer hover:border-[#10b981] transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <CloudSun className="w-5 h-5 text-[#34d399]" />
                          <div>
                            <span className="font-bold text-white block">Spray Radar: Ideal</span>
                            <span className="text-[11px] text-[#a7f3d0]">Safe spray window till 11:00 AM</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#10b981]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Feature Cards Grid (Green Color Palette + Sharp Edges) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Crop Doctor Card */}
                <div
                  onClick={() => setActiveTab('doctor')}
                  className="bg-white border-2 border-[#d1fae5] p-6 shadow-xs hover:border-[#059669] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#ecfdf5] text-[#047857] flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-colors border border-[#a7f3d0]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#0f2417] text-lg group-hover:text-[#047857] transition-colors">
                        {t.cropDoctor}
                      </h3>
                      <p className="text-xs text-[#065f46] mt-1 leading-relaxed font-medium">
                        Instant photo-based identification of plant pathogens, sucking pests, and deficiency symptoms with chemical and bio-remedies.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-2 border-t border-[#d1fae5] flex items-center justify-between text-xs font-black text-[#047857] uppercase tracking-wider">
                    <span>Scan Leaf Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#059669]" />
                  </div>
                </div>

                {/* 2. Mandi Rates Card */}
                <div
                  onClick={() => setActiveTab('mandi')}
                  className="bg-white border-2 border-[#d1fae5] p-6 shadow-xs hover:border-[#059669] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#ecfdf5] text-[#047857] flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-colors border border-[#a7f3d0]">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#0f2417] text-lg group-hover:text-[#047857] transition-colors">
                        {t.mandi}
                      </h3>
                      <p className="text-xs text-[#065f46] mt-1 leading-relaxed font-medium">
                        Track live wholesale market spot prices for Tomato, Paddy, Cotton, Wheat, Arecanut, and Soybean with MSP gap alerts.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-2 border-t border-[#d1fae5] flex items-center justify-between text-xs font-black text-[#047857] uppercase tracking-wider">
                    <span>View Today's Rates</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#059669]" />
                  </div>
                </div>

                {/* 3. Weather & Spray Radar */}
                <div
                  onClick={() => setActiveTab('weather')}
                  className="bg-white border-2 border-[#d1fae5] p-6 shadow-xs hover:border-[#059669] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#ecfdf5] text-[#047857] flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-colors border border-[#a7f3d0]">
                      <CloudSun className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#0f2417] text-lg group-hover:text-[#047857] transition-colors">
                        {t.weather}
                      </h3>
                      <p className="text-xs text-[#065f46] mt-1 leading-relaxed font-medium">
                        Hyperlocal agricultural forecasts, optimal pesticide spray hours, rainfall probability, and soil moisture telemetry.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-2 border-t border-[#d1fae5] flex items-center justify-between text-xs font-black text-[#047857] uppercase tracking-wider">
                    <span>Check Spray Window</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#059669]" />
                  </div>
                </div>
              </div>
            </section>

            {/* About Creators Highlight Section on Home (AMBIT in Green) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#022c22] text-white p-8 sm:p-10 border-2 border-[#10b981] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-[#022c22] text-[#a7f3d0] text-xs font-black uppercase tracking-wider px-3 py-1 border border-[#10b981]">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>AMBIT Innovation Project</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                    Created by Akshay Ramappa Nerli, AMBIT
                  </h2>
                  <p className="text-xs sm:text-sm text-[#d1fae5] max-w-xl leading-relaxed font-medium">
                    Engineered to bring accessible, AI-assisted agronomic tools to empower farming communities across Indian states.
                  </p>
                  <p className="text-xs text-[#fef08a] font-bold">
                    ⚠️ <strong>Note: AI can make mistakes.</strong> Always verify treatment dosages with local agricultural extension officers.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('about')}
                  className="btn-sharp btn-green-accent text-xs sm:text-sm px-6 py-3.5 transition-all hover:scale-105 active:scale-95 shadow-md shrink-0 flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>Learn More About AMBIT</span>
                  <ArrowRight className="w-4 h-4 text-[#064e3b]" />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: AI Crop Doctor */}
        {activeTab === 'doctor' && <CropDoctor currentLang={currentLang} />}

        {/* Tab 3: Live APMC Mandi Rates */}
        {activeTab === 'mandi' && (
          <MandiTracker mandiData={mandiData} currentLang={currentLang} />
        )}

        {/* Tab 4: Agro-Weather Advisory */}
        {activeTab === 'weather' && <WeatherAdvisory currentLang={currentLang} />}

        {/* Tab 5: About Us (AMBIT) */}
        {activeTab === 'about' && <AboutUs currentLang={currentLang} />}
      </main>

      {/* Floating Krishi Mitr AI Chatbot trigger - Sharp Button in Vibrant Green */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="btn-sharp pulse-green bg-[#064e3b] hover:bg-[#047857] text-white p-3.5 sm:px-5 sm:py-3 border-2 border-[#10b981] shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="Ask Krishi Mitr AI Advisor"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-[#a7f3d0] animate-spin" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#34d399] animate-ping"></span>
          </div>
          <span className="hidden sm:inline-block font-black text-xs uppercase tracking-wider text-white">
            {t.mitrChat}
          </span>
        </button>
      </div>

      {/* Krishi Mitr AI Chat Modal */}
      <AgriChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentLang={currentLang}
      />

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
