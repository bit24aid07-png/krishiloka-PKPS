import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  Bell, 
  CheckCircle2, 
  Calculator 
} from 'lucide-react';
import { MandiItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface MandiTrackerProps {
  mandiData: MandiItem[];
  currentLang: Language;
}

export const MandiTracker: React.FC<MandiTrackerProps> = ({ mandiData, currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [calcCommodity, setCalcCommodity] = useState<MandiItem | null>(mandiData[0] || null);
  const [calcQuantity, setCalcQuantity] = useState<number>(25);

  const states = ['All', 'Karnataka', 'Maharashtra', 'Telangana', 'Punjab', 'Madhya Pradesh'];
  const categories = ['All', 'Vegetables', 'Cereals', 'Commercial', 'Oilseeds', 'Spices', 'Plantation'];

  const filteredMandi = mandiData.filter((item) => {
    const matchesState = selectedState === 'All' || item.state.toLowerCase() === selectedState.toLowerCase();
    const matchesCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesCat && matchesSearch;
  });

  const handleSubscribeAlert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;
    if (phoneInput && phoneInput.value) {
      setAlertSuccess(`Success! Daily Mandi alerts registered for ${phoneInput.value}`);
      phoneInput.value = '';
      setTimeout(() => setAlertSuccess(null), 6000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#047857]/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#ecfdf5] text-[#065f46] px-3.5 py-1 text-xs font-black uppercase tracking-wider mb-2 border border-[#a7f3d0]">
            <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
            AGMARKNET & APMC Live Mandi Intelligence
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#064e3b] tracking-tight font-display">
            {t.mandiTitle}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#047857] max-w-2xl font-medium">
            {t.mandiSubtitle}
          </p>
        </div>

        {/* Live Indicator (Green Theme) */}
        <div className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2 text-xs font-bold border border-[#047857] shadow-xs">
          <span className="w-2.5 h-2.5 bg-[#34d399] animate-pulse"></span>
          <span>Updated Live: Today Morning Auctions</span>
        </div>
      </div>

      {/* Filter and Search Bar (Sharp Edges) */}
      <div className="bg-white p-4 border-2 border-[#a7f3d0] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* State selector */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs font-black uppercase tracking-wider border-2 border-[#a7f3d0] bg-white px-3 py-2 text-[#064e3b] focus:outline-none focus:border-[#059669]"
          >
            {states.map((s) => (
              <option key={s} value={s}>
                State: {s}
              </option>
            ))}
          </select>

          {/* Category selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-black uppercase tracking-wider border-2 border-[#a7f3d0] bg-white px-3 py-2 text-[#064e3b] focus:outline-none focus:border-[#059669]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative flex-1 md:max-w-xs">
          <Search className="w-4 h-4 text-[#047857] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop, mandi, district..."
            className="w-full text-xs font-bold border-2 border-[#a7f3d0] pl-9 pr-3 py-2 text-[#064e3b] focus:outline-none focus:border-[#059669]"
          />
        </div>
      </div>

      {/* Main Table View (Sharp Table with Green Header) */}
      <div className="bg-white border-2 border-[#a7f3d0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#064e3b] text-white border-b-2 border-[#047857] font-black uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Commodity</th>
                <th className="py-3.5 px-4">Mandi & District</th>
                <th className="py-3.5 px-4">Modal Price (₹/Qtl)</th>
                <th className="py-3.5 px-4">Min - Max Range</th>
                <th className="py-3.5 px-4">Trend (24h)</th>
                <th className="py-3.5 px-4">MSP Status</th>
                <th className="py-3.5 px-4">7-Day Trend</th>
                <th className="py-3.5 px-4 text-right">Calc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d1fae5] font-medium text-[#0f2417]">
              {filteredMandi.map((item) => {
                const isUp = item.trend === 'up';
                const aboveMsp = item.modalPrice >= item.msp;
                const mspDiff = item.modalPrice - item.msp;
                const maxHistory = Math.max(...item.history);
                const minHistory = Math.min(...item.history);

                return (
                  <tr key={item.id} className="hover:bg-[#ecfdf5] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-black text-[#064e3b] text-xs sm:text-sm">
                        {item.commodity}
                      </div>
                      <span className="text-[10px] text-[#065f46] bg-[#ecfdf5] px-1.5 py-0.2 font-black uppercase border border-[#a7f3d0]">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#064e3b]">{item.market}</div>
                      <div className="text-[11px] text-[#047857] flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#059669]" />
                        <span>{item.district}, {item.state}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-sm font-black font-mono text-[#064e3b]">
                        ₹{item.modalPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-[#047857]">Arrivals: {item.arrivals}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#047857] font-bold">
                      ₹{item.minPrice.toLocaleString('en-IN')} - ₹{item.maxPrice.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`btn-sharp inline-flex items-center gap-0.5 text-xs font-black px-2 py-0.5 ${
                          isUp ? 'text-[#064e3b] bg-[#34d399]' : 'text-white bg-[#dc2626]'
                        }`}
                      >
                        {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {isUp ? '+' : ''}
                        {item.changePercent}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {aboveMsp ? (
                        <div className="text-[#065f46]">
                          <span className="text-[11px] font-black bg-[#ecfdf5] px-1.5 py-0.5 border border-[#10b981]">
                            +₹{mspDiff} Above MSP
                          </span>
                          <span className="block text-[10px] text-[#047857] mt-0.5">
                            MSP: ₹{item.msp}
                          </span>
                        </div>
                      ) : (
                        <div className="text-[#92400e]">
                          <span className="text-[11px] font-black bg-[#fef3c7] px-1.5 py-0.5 border border-[#f59e0b]">
                            ₹{Math.abs(mspDiff)} Below MSP
                          </span>
                          <span className="block text-[10px] text-[#047857] mt-0.5">
                            MSP: ₹{item.msp}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* 7-Day Sparkline */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-end gap-1 h-6 w-20">
                        {item.history.map((val, idx) => {
                          const heightPct = Math.round(((val - minHistory + 10) / (maxHistory - minHistory + 10)) * 100);
                          return (
                            <div
                              key={idx}
                              title={`Day ${idx + 1}: ₹${val}`}
                              style={{ height: `${Math.max(20, Math.min(100, heightPct))}%` }}
                              className={`w-2 ${
                                idx === item.history.length - 1 ? 'bg-[#059669]' : 'bg-[#a7f3d0]'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setCalcCommodity(item)}
                        className="btn-sharp p-2 border border-[#a7f3d0] hover:bg-[#ecfdf5] text-[#064e3b] transition-all cursor-pointer"
                        title="Calculate your lot value"
                      >
                        <Calculator className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lot Value Calculator & SMS Alert Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lot Revenue Calculator */}
        {calcCommodity && (
          <div className="bg-white border-2 border-[#a7f3d0] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#064e3b] font-black text-base">
              <Calculator className="w-5 h-5 text-[#059669]" />
              <span>Lot Value Estimator: {calcCommodity.commodity}</span>
            </div>

            <p className="text-xs text-[#047857] font-medium">
              Calculate expected gross realization at {calcCommodity.market} current modal rate (₹{calcCommodity.modalPrice}/Qtl).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-[#064e3b] block mb-1">
                  Expected Harvest (Quintals)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Number(e.target.value) || 0)}
                  className="w-full text-xs font-black font-mono border-2 border-[#a7f3d0] p-2.5 text-[#064e3b] focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div className="bg-[#ecfdf5] border-2 border-[#10b981] p-3 flex flex-col justify-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#065f46]">
                  Estimated Gross Realization
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-[#064e3b] mt-0.5">
                  ₹{(calcQuantity * calcCommodity.modalPrice).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Free Mandi SMS / WhatsApp Alerts (Green Theme) */}
        <div className="bg-[#064e3b] text-white p-6 shadow-xs border-2 border-[#047857] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#34d399] font-black text-base">
              <Bell className="w-5 h-5 animate-bounce" />
              <span>Free Daily APMC Mandi Alerts on WhatsApp</span>
            </div>
            <p className="text-xs text-[#d1fae5] mt-1 leading-relaxed font-medium">
              Receive early morning market yard price updates on your mobile before harvest transit.
            </p>
          </div>

          <form onSubmit={handleSubscribeAlert} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="tel"
                name="phone"
                required
                placeholder="Enter 10-digit mobile number"
                className="w-full text-xs bg-[#022c22] border-2 border-[#047857] px-3 py-2 text-white placeholder-[#a7f3d0] focus:outline-none focus:border-[#34d399] font-mono"
              />
              <button
                type="submit"
                className="btn-sharp btn-green-accent px-4 py-2 text-xs font-black uppercase tracking-wider shrink-0 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Subscribe Free
              </button>
            </div>
            {alertSuccess && (
              <p className="text-xs text-[#a7f3d0] flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" />
                <span>{alertSuccess}</span>
              </p>
            )}
            <p className="text-[10px] text-[#a7f3d0]">
              Created by Akshay Ramappa Nerli, AMBIT • Free for Indian farmers
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
