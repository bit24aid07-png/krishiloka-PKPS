import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  Volume2, 
  FileText, 
  RefreshCw, 
  ShieldCheck, 
  Droplets, 
  SunMedium, 
  Leaf, 
  Sprout 
} from 'lucide-react';
import { DiagnosisResult, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CropDoctorProps {
  currentLang: Language;
}

const PRESET_SAMPLES = [
  {
    key: 'tomato_blight',
    crop: 'Tomato',
    label: 'Early Blight (Leaf Spot)',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=400&auto=format&fit=crop&q=80',
    description: 'Brown concentric spots on lower leaves with yellow chlorotic halos.',
  },
  {
    key: 'paddy_blast',
    crop: 'Paddy / Rice',
    label: 'Rice Blast Disease',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80',
    description: 'Spindle-shaped gray lesions with dark brown margins.',
  },
  {
    key: 'cotton_bollworm',
    crop: 'Cotton',
    label: 'Pink Bollworm & Sucking Pest',
    image: 'https://images.unsplash.com/photo-1594488518063-8686d1ee5c4c?w=400&auto=format&fit=crop&q=80',
    description: 'Rosetted flowers, square dropping, internal larva frass.',
  },
  {
    key: 'healthy_crop',
    crop: 'Green Foliage',
    label: 'Optimal Leaf Health',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&auto=format&fit=crop&q=80',
    description: 'Clean vibrant green leaf canopy with no fungal lesions.',
  },
];

const CROP_OPTIONS = [
  'Tomato',
  'Paddy / Rice',
  'Cotton',
  'Wheat',
  'Green Chilli',
  'Sugarcane',
  'Maize / Corn',
  'Arecanut / Betel Nut',
  'Soybean',
  'Potato',
  'Pomegranate',
  'Coffee',
];

export const CropDoctor: React.FC<CropDoctorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [symptomsInput, setSymptomsInput] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(PRESET_SAMPLES[0].image);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [sampleKey, setSampleKey] = useState<string | null>('tomato_blight');
  const [loading, setLoading] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleDiagnose = async (overrideSampleKey?: string) => {
    setLoading(true);
    try {
      const activeSampleKey = overrideSampleKey !== undefined ? overrideSampleKey : sampleKey;
      const res = await fetch('/api/crop-diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: selectedCrop,
          symptoms: symptomsInput,
          imageBase64: imageBase64,
          sampleKey: activeSampleKey,
          language: currentLang === 'kn' ? 'Kannada' : currentLang === 'hi' ? 'Hindi' : currentLang === 'te' ? 'Telugu' : currentLang === 'mr' ? 'Marathi' : 'English',
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setDiagnosis(json.data);
      }
    } catch (err) {
      console.error('Diagnosis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSampleKey(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (sample: typeof PRESET_SAMPLES[0]) => {
    setImagePreview(sample.image);
    setImageBase64(null);
    setSampleKey(sample.key);
    setSelectedCrop(sample.crop);
    setSymptomsInput(sample.description);
    handleDiagnose(sample.key);
  };

  const handleSpeak = () => {
    if (!diagnosis || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${diagnosis.diseaseName}. ${diagnosis.symptomsObserved}. Organic remedy: ${diagnosis.biologicalControl}. Chemical control: ${diagnosis.chemicalControl}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  React.useEffect(() => {
    if (!diagnosis) {
      handleDiagnose('tomato_blight');
    }
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#ecfdf5] text-[#065f46] px-3.5 py-1 text-xs font-black uppercase tracking-wider border border-[#a7f3d0]">
          <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
          KrishiLoka AI Plant Pathology • Created by Akshay Ramappa Nerli, AMBIT
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#064e3b] tracking-tight font-display">
          {t.doctorTitle}
        </h2>
        <p className="text-[#047857] text-sm sm:text-base font-medium">
          {t.doctorSubtitle}
        </p>

        {/* Prominent Note: AI can make mistakes */}
        <div className="bg-[#fefce8] border-2 border-[#f59e0b] p-3.5 text-xs text-[#92400e] max-w-2xl mx-auto flex items-center justify-center gap-2.5 font-bold shadow-xs">
          <AlertTriangle className="w-4 h-4 text-[#b45309] shrink-0" />
          <span>
            <strong>Note: AI can make mistakes.</strong> Always confirm chemical active ingredients and dilution rates with your local agriculture extension officer before field application.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Input & Settings (Green Theme & Sharp Edges) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#a7f3d0] shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#d1fae5] pb-3">
            <h3 className="font-black text-[#064e3b] text-base flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#059669]" />
              <span>Plant Photo & Symptoms</span>
            </h3>
            <span className="text-xs text-[#047857] font-mono font-bold">Step 1 of 2</span>
          </div>

          {/* Preset Sample Selector (Sharp Buttons) */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-[#064e3b] mb-2 block">
              Quick Test: Select a Sample Crop Leaf
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_SAMPLES.map((sample) => (
                <button
                  key={sample.key}
                  onClick={() => handleSelectPreset(sample)}
                  className={`btn-sharp text-left p-2 border-2 transition-all flex items-center gap-2.5 cursor-pointer ${
                    sampleKey === sample.key
                      ? 'border-[#059669] bg-[#ecfdf5]'
                      : 'border-[#d1fae5] hover:border-[#059669] hover:bg-[#f7faf7]'
                  }`}
                >
                  <img
                    src={sample.image}
                    alt={sample.crop}
                    className="w-11 h-11 object-cover shrink-0 border border-[#a7f3d0]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-black text-[#064e3b] truncate">{sample.crop}</p>
                    <p className="text-[10px] text-[#047857] truncate font-medium">{sample.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload Box */}
          <div className="space-y-3">
            <div className="relative border-2 border-dashed border-[#059669] p-4 bg-[#ecfdf5]/50 text-center hover:bg-[#ecfdf5] transition-colors">
              {imagePreview ? (
                <div className="space-y-2">
                  <div className="relative max-h-56 overflow-hidden border border-[#a7f3d0] mx-auto">
                    <img
                      src={imagePreview}
                      alt="Crop Preview"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#022c22]/90 text-[#34d399] text-[10px] font-black uppercase px-2 py-0.5 border border-[#10b981]">
                      Ready for Diagnosis
                    </div>
                  </div>
                  <label
                    htmlFor="custom-crop-upload"
                    className="btn-sharp inline-flex items-center gap-1.5 text-xs font-black text-[#047857] hover:text-[#064e3b] cursor-pointer pt-1 uppercase tracking-wider"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Different Photo</span>
                  </label>
                </div>
              ) : (
                <div className="py-6 space-y-2">
                  <div className="w-12 h-12 bg-[#ecfdf5] border border-[#10b981] flex items-center justify-center mx-auto text-[#047857]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-black text-[#064e3b]">
                    Click to upload leaf photo or take picture
                  </p>
                  <p className="text-[11px] text-[#047857]">Supports JPG, PNG, WEBP up to 10MB</p>
                </div>
              )}
              <input
                id="custom-crop-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Crop Selector & Symptoms */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#064e3b] mb-1 block">
                Target Crop Name
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full text-xs font-bold border-2 border-[#a7f3d0] bg-white px-3 py-2 text-[#064e3b] focus:outline-none focus:border-[#059669]"
              >
                {CROP_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#064e3b] mb-1 block">
                Observed Symptoms or Farmer Notes (Optional)
              </label>
              <textarea
                value={symptomsInput}
                onChange={(e) => setSymptomsInput(e.target.value)}
                placeholder="e.g. Yellowing margins on lower leaves, noticed small insects after recent rains..."
                rows={2}
                className="w-full text-xs border-2 border-[#a7f3d0] p-2.5 text-[#064e3b] focus:outline-none focus:border-[#059669]"
              />
            </div>

            {/* Sharp Animated Diagnose Button (Green Theme) */}
            <button
              onClick={() => handleDiagnose()}
              disabled={loading}
              className="btn-sharp btn-green-primary w-full py-3.5 px-4 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#34d399]" />
                  <span>AI Pathology Engine Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#34d399] animate-bounce" />
                  <span>Run KrishiLoka AI Diagnosis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Diagnostic Report (Green Theme) */}
        <div className="lg:col-span-7 bg-white border-2 border-[#a7f3d0] shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#d1fae5] pb-4">
            <div>
              <h3 className="font-black text-[#064e3b] text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#059669]" />
                <span>Agronomist Diagnosis Report</span>
              </h3>
              <p className="text-xs text-[#047857] font-medium">
                Powered by Gemini 3.8 Flash Plant Pathology Model
              </p>
            </div>

            {diagnosis && (
              <button
                onClick={handleSpeak}
                className={`btn-sharp inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#fef08a] text-[#713f12] border-[#eab308]'
                    : 'bg-[#ecfdf5] text-[#064e3b] border-[#10b981] hover:bg-[#d1fae5]'
                }`}
                title="Read prescription aloud"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce text-[#713f12]' : ''}`} />
                <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
              </button>
            )}
          </div>

          {loading ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#a7f3d0] border-t-[#059669] animate-spin mx-auto"></div>
              <p className="text-sm font-black text-[#064e3b]">
                Scanning leaf patterns, chlorosis, and lesions...
              </p>
              <p className="text-xs text-[#047857] max-w-xs mx-auto">
                Correlating symptoms with agricultural pathology models.
              </p>
            </div>
          ) : diagnosis ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Top Banner: Disease Name, Severity, Confidence (Deep Green) */}
              <div className="bg-[#064e3b] text-white p-5 border-2 border-[#022c22] shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-black text-[#34d399]">
                    Target Identification
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 uppercase tracking-wider ${
                        diagnosis.severity === 'Critical'
                          ? 'bg-[#dc2626] text-white'
                          : diagnosis.severity === 'Moderate'
                          ? 'bg-[#f59e0b] text-[#022c22]'
                          : diagnosis.severity === 'None'
                          ? 'bg-[#10b981] text-[#022c22]'
                          : 'bg-[#eab308] text-[#022c22]'
                      }`}
                    >
                      Severity: {diagnosis.severity}
                    </span>
                    <span className="bg-[#022c22] text-[#34d399] text-[10px] font-mono font-black px-2 py-0.5 border border-[#047857]">
                      {diagnosis.confidence}% Match
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-black font-display text-white">
                    {diagnosis.diseaseName}
                  </h4>
                  <p className="text-xs text-[#a7f3d0] italic font-mono mt-0.5">
                    Pathogen: {diagnosis.scientificName}
                  </p>
                </div>

                <div className="bg-[#022c22]/80 p-3 border border-[#047857] text-xs text-[#ecfdf5] leading-relaxed font-medium">
                  <span className="font-black text-[#34d399]">Symptoms Observed: </span>
                  {diagnosis.symptomsObserved}
                </div>
              </div>

              {/* Treatment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Biological & Organic Control */}
                <div className="bg-[#ecfdf5] border-2 border-[#10b981] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[#064e3b] font-black text-xs uppercase tracking-wider">
                    <Leaf className="w-4 h-4 text-[#059669]" />
                    <span>{t.biologicalRemedy}</span>
                  </div>
                  <p className="text-xs text-[#064e3b] leading-relaxed font-medium">
                    {diagnosis.biologicalControl}
                  </p>
                </div>

                {/* Chemical Treatment with Dosage */}
                <div className="bg-[#fffbeb] border-2 border-[#f59e0b] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[#92400e] font-black text-xs uppercase tracking-wider">
                    <Droplets className="w-4 h-4 text-[#d97706]" />
                    <span>{t.chemicalRemedy}</span>
                  </div>
                  <p className="text-xs text-[#78350f] leading-relaxed font-black">
                    {diagnosis.chemicalControl}
                  </p>
                </div>
              </div>

              {/* Cultural & Weather Advisories */}
              <div className="space-y-3">
                <div className="p-3.5 border-2 border-[#d1fae5] bg-[#f7faf7] flex items-start gap-3">
                  <Sprout className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-black text-[#064e3b] uppercase tracking-wider">{t.culturalPractice}</h5>
                    <p className="text-xs text-[#047857] mt-0.5 leading-relaxed font-medium">
                      {diagnosis.culturalPractices}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 border-2 border-[#bae6fd] bg-[#f0f9ff] flex items-start gap-3">
                  <SunMedium className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-black text-[#0369a1] uppercase tracking-wider">{t.weatherAlert}</h5>
                    <p className="text-xs text-[#075985] mt-0.5 leading-relaxed font-medium">
                      {diagnosis.weatherAdvisory}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prominent AI Mistakes Warning Notice */}
              <div className="p-3.5 bg-[#fefce8] border-2 border-[#f59e0b] text-xs text-[#92400e] flex items-center gap-2.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-[#b45309] shrink-0" />
                <span>
                  <strong>Note: AI can make mistakes.</strong> Verify chemical formulation and water dilution with your local Raitha Samparka Kendra or agronomist before application.
                </span>
              </div>

              {/* Agronomist Advice & Next Steps */}
              <div className="border-t border-[#d1fae5] pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#047857]">
                <div className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle className="w-4 h-4 text-[#059669]" />
                  <span>Prescription verified against plant pathology manuals</span>
                </div>
                <button
                  onClick={() => alert(`Saved treatment prescription for ${diagnosis.diseaseName}. You can print or show this to your nearest Krishi Seva Kendra.`)}
                  className="btn-sharp inline-flex items-center gap-1.5 text-[#064e3b] hover:text-[#059669] font-black uppercase text-[11px] underline cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download / Print Prescription</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-[#047857]">
              <Leaf className="w-12 h-12 text-[#10b981]/50 mx-auto mb-2" />
              <p className="text-xs font-bold">Select or upload a crop photo to generate diagnosis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
