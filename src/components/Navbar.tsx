import React, { useState } from 'react';
import { 
  Sprout, 
  PhoneCall, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  Search,
  CloudSun,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  activeTab,
  onSelectTab,
  onOpenHelp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'EN' },
    { code: 'kn', label: 'ಕನ್ನಡ', script: 'KN' },
    { code: 'hi', label: 'हिन्दी', script: 'HI' },
    { code: 'te', label: 'తెలుగు', script: 'TE' },
    { code: 'mr', label: 'मराठी', script: 'MR' },
  ];

  const navItems = [
    { id: 'overview', label: t.home, icon: Sprout },
    { id: 'doctor', label: t.cropDoctor, icon: Sparkles, badge: 'AI' },
    { id: 'mandi', label: t.mandi, icon: Search },
    { id: 'weather', label: t.weather, icon: CloudSun },
    { id: 'about', label: t.aboutUs, icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#047857]/20 shadow-xs">
      {/* Top Kisan & AMBIT Bar (Primary Green theme) */}
      <div className="bg-[#064e3b] text-[#ecfdf5] text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2 border-b border-[#047857]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#a7f3d0]">
            <PhoneCall className="w-3.5 h-3.5 text-[#34d399] animate-pulse" />
            {t.callCenter}
          </span>
          <span className="hidden md:inline-block text-[#10b981]/50">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-white font-semibold">
            <span className="w-2 h-2 bg-[#34d399]"></span>
            Created by Akshay Ramappa Nerli, AMBIT
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#022c22] text-[#a7f3d0] px-2.5 py-0.5 text-[11px] font-mono font-bold border border-[#059669]">
            krishiloka.studio.ai
          </span>
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-[#34d399]" />
            <select
              value={currentLang}
              onChange={(e) => onSelectLang(e.target.value as Language)}
              className="bg-[#022c22] text-white px-2 py-0.5 text-xs border border-[#059669] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#34d399]"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label} ({l.script})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 bg-[#064e3b] border border-[#047857] flex items-center justify-center shadow-md group-hover:bg-[#047857] transition-all">
              <Sprout className="w-6 h-6 text-[#34d399]" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#10b981] border border-[#022c22] flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-[#022c22]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#064e3b] font-display">
                  Krishi<span className="text-[#059669]">Loka</span>
                </span>
                <span className="bg-[#ecfdf5] text-[#065f46] text-[10px] font-black px-1.5 py-0.5 uppercase tracking-wider border border-[#a7f3d0]">
                  Studio AI
                </span>
              </div>
              <p className="text-[11px] text-[#047857] font-bold hidden sm:block leading-none mt-0.5">
                Created by Akshay Ramappa Nerli, AMBIT
              </p>
            </div>
          </div>

          {/* Desktop Nav Links with Sharp Edges & Hover Animation */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`btn-sharp relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#064e3b] text-white border-[#047857] shadow-sm'
                      : 'bg-transparent text-[#064e3b] border-transparent hover:border-[#10b981] hover:bg-[#ecfdf5]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#34d399]' : 'text-[#059669]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-[#10b981] text-[#064e3b] px-1 py-0.2 font-black uppercase">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button - Sharp & Vibrant Green Animated */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onSelectTab('doctor')}
              className="btn-sharp btn-green-accent hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#064e3b] animate-spin" />
              <span>{t.cropDoctor}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-sharp md:hidden p-2 text-[#064e3b] hover:bg-[#ecfdf5] border border-[#064e3b]/30"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-2 border-[#064e3b]/30 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`btn-sharp w-full flex items-center justify-between px-3 py-2.5 text-xs font-black uppercase tracking-wider cursor-pointer border ${
                  isActive
                    ? 'bg-[#064e3b] text-white border-[#047857]'
                    : 'text-[#064e3b] border-transparent hover:bg-[#ecfdf5]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#34d399]' : 'text-[#059669]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-[#10b981] text-[#064e3b] px-1.5 py-0.5 font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
