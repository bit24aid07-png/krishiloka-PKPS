import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { MandiItem } from '../types';

interface LiveTickerProps {
  mandiData: MandiItem[];
  onOpenMandi: () => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ mandiData, onOpenMandi }) => {
  if (!mandiData || mandiData.length === 0) return null;

  return (
    <div className="bg-[#022c22] text-[#ecfdf5] border-b-2 border-[#047857] py-2 overflow-hidden shadow-inner flex items-center">
      <div className="px-3 shrink-0 flex items-center gap-1.5 border-r border-[#047857] text-xs font-black text-[#34d399] uppercase tracking-wider pl-4">
        <span className="w-2 h-2 bg-[#10b981] animate-ping inline-block"></span>
        <span>APMC Live:</span>
      </div>

      <div className="relative w-full overflow-x-auto no-scrollbar flex items-center gap-6 px-4 whitespace-nowrap text-xs">
        {mandiData.map((item) => {
          const isUp = item.trend === 'up';
          return (
            <div
              key={item.id}
              onClick={onOpenMandi}
              className="inline-flex items-center gap-2 cursor-pointer hover:bg-[#064e3b] px-2.5 py-1 border border-transparent hover:border-[#10b981] transition-all"
            >
              <span className="font-bold text-white">{item.commodity}</span>
              <span className="text-[#a7f3d0] text-[11px]">({item.market})</span>
              <span className="font-mono font-black text-[#6ee7b7]">₹{item.modalPrice.toLocaleString('en-IN')}</span>
              <span
                className={`inline-flex items-center text-[10px] font-black px-1.5 py-0.2 ${
                  isUp ? 'text-[#064e3b] bg-[#34d399]' : 'text-white bg-[#dc2626]'
                }`}
              >
                {isUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {isUp ? '+' : ''}
                {item.changePercent}%
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onOpenMandi}
        className="btn-sharp hidden md:flex items-center gap-1 text-[11px] font-black text-[#34d399] hover:text-white px-4 shrink-0 border-l border-[#047857] hover:bg-[#064e3b] py-1 transition-all uppercase"
      >
        <span>All Mandis</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
