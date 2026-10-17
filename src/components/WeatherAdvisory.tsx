import React, { useState, useEffect } from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Gauge, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Sun, 
  CloudRain, 
  Calendar,
  Layers
} from 'lucide-react';
import { WeatherData, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WeatherAdvisoryProps {
  currentLang: Language;
}

export const WeatherAdvisory: React.FC<WeatherAdvisoryProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('Bengaluru Rural, Karnataka');

  const regions = [
    'Bengaluru Rural, Karnataka',
    'Shivamogga, Karnataka',
    'Nashik, Maharashtra',
    'Warangal, Telangana',
    'Ludhiana, Punjab',
    'Indore, Madhya Pradesh',
  ];

  useEffect(() => {
    fetch(`/api/weather-advisory?location=${encodeURIComponent(selectedRegion)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWeather(data);
        }
      })
      .catch((err) => console.error('Failed to fetch weather', err));
  }, [selectedRegion]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#047857]/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#ecfdf5] text-[#065f46] px-3.5 py-1 text-xs font-black uppercase tracking-wider mb-2 border border-[#a7f3d0]">
            <CloudSun className="w-3.5 h-3.5 text-[#059669]" />
            Hyperlocal Agro-Meteorological Intelligence
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#064e3b] tracking-tight font-display">
            {t.weatherTitle}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#047857] max-w-2xl font-medium">
            {t.weatherSubtitle}
          </p>
        </div>

        {/* Location selector (Sharp Edges) */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#059669]" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-xs font-black uppercase tracking-wider border-2 border-[#a7f3d0] bg-white px-3 py-2 text-[#064e3b] focus:outline-none focus:border-[#059669]"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {weather && (
        <div className="space-y-6">
          {/* Main Weather Metric Cards (Green Theme) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current temperature and condition */}
            <div className="bg-[#064e3b] text-white p-6 shadow-sm border-2 border-[#047857] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest text-[#34d399] font-black">
                    Current Field Condition
                  </span>
                  <CloudSun className="w-8 h-8 text-[#34d399]" />
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-5xl font-black font-display text-white">
                    {weather.current.temp}°C
                  </span>
                  <span className="text-sm font-bold text-[#a7f3d0]">
                    {weather.current.condition}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#047857] flex justify-between text-xs text-[#d1fae5] font-medium">
                <span className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-[#34d399]" />
                  Humidity: {weather.current.humidity}%
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-[#10b981]" />
                  Wind: {weather.current.windSpeed}
                </span>
              </div>
            </div>

            {/* Spraying Window Advisory (Green Accent Box) */}
            <div className="bg-white border-2 border-[#a7f3d0] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-black text-[#064e3b]">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <Gauge className="w-4 h-4 text-[#059669]" />
                    Pesticide Spray Window
                  </span>
                  <span className="bg-[#ecfdf5] text-[#065f46] px-2 py-0.5 text-[10px] font-black uppercase border border-[#10b981]">
                    Safe
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-base font-black text-[#064e3b]">
                    {weather.current.sprayCondition}
                  </h4>
                  <p className="text-xs text-[#047857] mt-1 leading-relaxed font-medium">
                    Low drift velocity (&lt;15 km/h) and optimal relative humidity. Avoid spraying post 11:30 AM to prevent thermal pesticide volatilization.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#d1fae5] flex items-center gap-2 text-[11px] text-[#065f46] font-black">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#059669]" />
                <span>Next 24 hours safe from rain wash-off</span>
              </div>
            </div>

            {/* Soil & Irrigation Advice */}
            <div className="bg-white border-2 border-[#a7f3d0] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-black text-[#064e3b]">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <Droplets className="w-4 h-4 text-[#0284c7]" />
                    Soil Moisture & Irrigation
                  </span>
                  <span className="bg-[#e0f2fe] text-[#0369a1] px-2 py-0.5 text-[10px] font-black uppercase border border-[#0284c7]">
                    {weather.current.soilMoisture}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-base font-black text-[#064e3b]">
                    {weather.current.irrigationAdvice}
                  </h4>
                  <p className="text-xs text-[#047857] mt-1 leading-relaxed font-medium">
                    Root zone retains healthy field capacity. Run drip systems for only 45 minutes for pulse and tomato plots.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#d1fae5] flex items-center gap-2 text-[11px] text-[#92400e] font-black">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#b45309]" />
                <span>Rain chance: {weather.current.rainfallProbability}% today</span>
              </div>
            </div>
          </div>

          {/* 7-Day Agriculture Forecast (Sharp Boxes in Green) */}
          <div className="bg-white border-2 border-[#a7f3d0] p-6 shadow-xs space-y-4">
            <h3 className="font-black text-[#064e3b] text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#059669]" />
              <span>7-Day Agricultural Planning Radar</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weather.forecast.map((fc, i) => (
                <div
                  key={i}
                  className={`p-3.5 border-2 text-center space-y-2 ${
                    i === 0
                      ? 'border-[#059669] bg-[#ecfdf5]'
                      : 'border-[#d1fae5] bg-[#f7faf7]'
                  }`}
                >
                  <p className="text-xs font-black text-[#064e3b]">{fc.day}</p>
                  <div className="my-1">
                    {fc.rainChance > 40 ? (
                      <CloudRain className="w-6 h-6 text-[#0284c7] mx-auto" />
                    ) : (
                      <Sun className="w-6 h-6 text-[#ca8a04] mx-auto" />
                    )}
                  </div>
                  <div className="text-xs font-mono font-black text-[#064e3b]">
                    {fc.tempMax}° / {fc.tempMin}°
                  </div>
                  <div className="text-[10px] text-[#047857] font-bold">Rain: {fc.rainChance}%</div>
                  <div
                    className={`text-[9px] font-black uppercase px-1 py-0.5 ${
                      fc.sprayRating === 'Ideal' || fc.sprayRating === 'Great'
                        ? 'bg-[#ecfdf5] text-[#065f46] border border-[#10b981]'
                        : fc.sprayRating === 'Good'
                        ? 'bg-[#fef3c7] text-[#92400e] border border-[#f59e0b]'
                        : 'bg-[#fee2e2] text-[#991b1b] border border-[#ef4444]'
                    }`}
                  >
                    {fc.sprayRating}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Cropping Calendar (Kharif, Rabi, Zaid) */}
          <div className="bg-[#f7faf7] border-2 border-[#a7f3d0] p-6 space-y-4">
            <h3 className="font-black text-[#064e3b] text-base flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#059669]" />
              <span>Cropping Calendar & Seasonal Advisory</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 border-2 border-[#d1fae5] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-black text-[#064e3b] text-sm">Kharif Season</span>
                  <span className="text-[10px] font-mono font-black text-[#065f46] bg-[#ecfdf5] px-2 py-0.5 border border-[#10b981]">
                    Jun - Oct
                  </span>
                </div>
                <p className="text-xs text-[#047857] font-medium">
                  Major crops: Paddy, Cotton, Soybean, Maize, Groundnut.
                </p>
                <div className="text-[11px] text-[#064e3b] font-bold">
                  • Focus on pre-monsoon land preparation and drainage channels.
                </div>
              </div>

              <div className="bg-white p-4 border-2 border-[#d1fae5] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-black text-[#92400e] text-sm">Rabi Season</span>
                  <span className="text-[10px] font-mono font-black text-[#92400e] bg-[#fef3c7] px-2 py-0.5 border border-[#f59e0b]">
                    Oct - Mar
                  </span>
                </div>
                <p className="text-xs text-[#047857] font-medium">
                  Major crops: Wheat, Chickpea (Gram), Mustard, Potato, Peas.
                </p>
                <div className="text-[11px] text-[#064e3b] font-bold">
                  • Monitor for cold stress, late blight and rust fungi.
                </div>
              </div>

              <div className="bg-white p-4 border-2 border-[#d1fae5] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-black text-[#0369a1] text-sm">Zaid (Summer)</span>
                  <span className="text-[10px] font-mono font-black text-[#0369a1] bg-[#e0f2fe] px-2 py-0.5 border border-[#0284c7]">
                    Mar - Jun
                  </span>
                </div>
                <p className="text-xs text-[#047857] font-medium">
                  Major crops: Watermelon, Cucumber, Muskmelon, Moong, Fodder.
                </p>
                <div className="text-[11px] text-[#064e3b] font-bold">
                  • Deploy precision drip irrigation to prevent summer evaporation loss.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
