import React from 'react';
import { Sprout, PhoneCall, ShieldAlert, MapPin, Building2, User } from 'lucide-react';

interface FooterProps {
  onSelectTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#022c22] text-[#ecfdf5] border-t-4 border-[#064e3b] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Prominent Safety & AI Disclaimer Note (Green Primary) */}
        <div className="bg-[#064e3b] border-2 border-[#10b981] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
          <div className="flex items-center gap-2.5 text-[#a7f3d0] font-bold">
            <ShieldAlert className="w-5 h-5 text-[#34d399] shrink-0" />
            <span>
              <strong>Note: AI can make mistakes.</strong> Verify all crop diagnostics, pesticide active ingredients, and treatment dosages with certified agronomists or your local Raitha Samparka Kendra.
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#34d399] shrink-0 font-bold">
            Agricultural Advisory Guidance Only
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#047857]">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#064e3b] border border-[#10b981] flex items-center justify-center text-white font-bold shadow-md">
                <Sprout className="w-5 h-5 text-[#34d399]" />
              </div>
              <span className="text-xl font-black text-white tracking-tight font-display">
                Krishi<span className="text-[#34d399]">Loka</span>
              </span>
            </div>
            <p className="text-xs text-[#a7f3d0] leading-relaxed font-medium">
              Smart agricultural intelligence platform unifying AI plant pathology, real-time APMC wholesale mandi rates, and precision agro-weather advisories.
            </p>
            <div className="text-[11px] font-mono text-[#34d399] font-bold">
              Host: krishiloka.studio.ai
            </div>
          </div>

          {/* Creators & Innovation Attribution - AMBIT */}
          <div className="space-y-2 text-xs md:col-span-1">
            <h4 className="font-black text-[#34d399] uppercase tracking-wider text-[11px]">
              Created & Developed By
            </h4>
            <div className="space-y-2 text-white">
              <div className="p-3 bg-[#064e3b] border-2 border-[#047857] space-y-1">
                <p className="font-black text-white flex items-center gap-1.5 text-xs sm:text-sm">
                  <User className="w-3.5 h-3.5 text-[#34d399]" />
                  <span>Akshay Ramappa Nerli</span>
                </p>
                <p className="font-black text-[#a7f3d0] flex items-center gap-1.5 text-xs">
                  <Building2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>AMBIT</span>
                </p>
                <p className="text-[11px] text-[#d1fae5] pt-1 font-mono">
                  Created by Akshay Ramappa Nerli, AMBIT
                </p>
              </div>
            </div>
          </div>

          {/* Core Modules Navigation */}
          <div className="space-y-2 text-xs md:col-span-1">
            <h4 className="font-black text-[#34d399] uppercase tracking-wider text-[11px]">
              Platform Modules
            </h4>
            <ul className="space-y-1.5 text-[#a7f3d0] font-medium">
              <li 
                onClick={() => onSelectTab && onSelectTab('doctor')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                AI Plant Doctor (Disease Scanner)
              </li>
              <li 
                onClick={() => onSelectTab && onSelectTab('mandi')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Live APMC Mandi Rates & MSP
              </li>
              <li 
                onClick={() => onSelectTab && onSelectTab('weather')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Agro-Weather & Safe Spray Radar
              </li>
              <li 
                onClick={() => onSelectTab && onSelectTab('about')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                About Us (AMBIT & Creators)
              </li>
            </ul>
          </div>

          {/* Helpline & Institutional Affiliation */}
          <div className="space-y-2.5 text-xs md:col-span-1">
            <h4 className="font-black text-[#34d399] uppercase tracking-wider text-[11px]">
              Farmer Assistance
            </h4>
            <div className="p-3 bg-[#064e3b] border border-[#047857] space-y-1.5">
              <div className="flex items-center gap-2 text-[#34d399] font-black">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>1800-180-1551 (Toll Free)</span>
              </div>
              <p className="text-[11px] text-[#a7f3d0]">National Kisan Call Center (6 AM - 10 PM)</p>
            </div>
            <div className="flex items-center gap-2 text-[#a7f3d0] text-[11px] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
              <span>Karnataka, India • AMBIT Project</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a7f3d0] font-medium">
          <p>© 2026 KrishiLoka Studio AI. Created by Akshay Ramappa Nerli, AMBIT.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#34d399] font-bold">Note: AI can make mistakes</span>
            <span 
              onClick={() => onSelectTab && onSelectTab('about')}
              className="hover:text-white cursor-pointer underline font-bold"
            >
              About AMBIT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
