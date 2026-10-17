export type Language = 'en' | 'kn' | 'hi' | 'te' | 'mr';

export interface MandiItem {
  id: string;
  commodity: string;
  category: string;
  market: string;
  district: string;
  state: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  unit: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down';
  arrivals: string;
  msp: number;
  history: number[];
  updatedAt: string;
}

export interface DiagnosisResult {
  diseaseName: string;
  scientificName: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Critical' | 'None';
  symptomsObserved: string;
  biologicalControl: string;
  chemicalControl: string;
  culturalPractices: string;
  weatherAdvisory: string;
  expertNote: string;
}

export interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: string;
    rainfallProbability: number;
    soilMoisture: string;
    uvIndex: string;
    sprayCondition: string;
    irrigationAdvice: string;
  };
  forecast: Array<{
    day: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    rainChance: number;
    sprayRating: string;
  }>;
}
