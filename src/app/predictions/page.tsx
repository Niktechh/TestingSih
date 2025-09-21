"use client"
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Loader2, TrendingUp, Menu } from "lucide-react";
import AgriPredictSidebar from '@/Components/AgriPredictSidebar';
import { useI18n } from '@/lib/i18n';
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";


//prediction interface
interface Prediction {
  predicted_yield: number;
  unit: string;
  accuracy: string;
  district: string;
  crop: string;
  status: string;
}


const CropYieldPredictor = () => {
  //api url store
  const API_URL = process.env.NEXT_PUBLIC_API_URL;




  // Form state
  const [selectedCrop, setSelectedCrop] = useState("");
  const [district, setDistrict] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [soilPh, setSoilPh] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [irrigationPercent, setIrrigationPercent] = useState("");
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
 const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState("");
   const { t } = useI18n() as any;

  const crops = [
    {
      name: t("pred.crop.wheat"),
      description: t("pred.desc.wheat"),
      icon: "🌾"
    },
    {
      name: t("pred.crop.rice"), 
      description: t("pred.desc.rice"),
      icon: "🌾"
    },
    {
      name: t("pred.crop.corn"),
      description: t("pred.desc.corn"),
      icon: "🌽"
    },
    {
      name: t("pred.crop.soy"),
      description: t("pred.desc.soy"),
      icon: "🫘"
    },
    {
      name: t("pred.crop.cotton"),
      description: t("pred.desc.cotton"),
      icon: "🌿"
    },
    {
      name: t("pred.crop.sugarcane"),
      description: t("pred.desc.sugarcane"),
      icon: "🎋"
    }
  ];

const odishaDistricts = [t("pred.district.angul"),t("pred.district.balangir"),t("pred.district.balasore"),t("pred.district.bargarh"),t("pred.district.bhadrak"), t("pred.district.boudh"),t("pred.district.cuttack"),t("pred.district.deogarh"),t("pred.district.dhenkanal"),t("pred.district.gajapati"),t("pred.district.ganjam"),t("pred.district.jagatsinghpur"),t("pred.district.jajpur"),t("pred.district.jharsuguda"),t("pred.district.kalahandi"),t("pred.district.kandhamal"),t("pred.district.kendrapara"),t("pred.district.kendujhar"),t("pred.district.khordha"),t("pred.district.koraput"),t("pred.district.malkangiri"),t("pred.district.mayurbhanj"),t("pred.district.nabarangpur"),t("pred.district.nayagarh"),t("pred.district.nuapada"),t("pred.district.puri"),t("pred.district.rayagada"),t("pred.district.sambalpur"),t("pred.district.subarnapur"),t("pred.district.sundargarh")
];
  const handlePrediction = async () => {
    if (!selectedCrop || !district || !rainfall || !temperature || !soilPh || 
        !nitrogen || !phosphorus || !potassium || !irrigationPercent) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");
    setPrediction(null);

    try {
      // In a real application, replace this URL with your Flask API URL
      const response = await fetch( API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          district: district,
          crop: selectedCrop,
          rainfall: parseFloat(rainfall),
          temperature: parseFloat(temperature),
          soil_ph: parseFloat(soilPh),
          nitrogen: parseFloat(nitrogen),
          phosphorus: parseFloat(phosphorus),
          potassium: parseFloat(potassium),
          irrigation_percent: parseFloat(irrigationPercent)
        })
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json() as Prediction;
      setPrediction(result);
    } catch (err) {
      // For demo purposes, we'll simulate a prediction
      const simulatedYield = Math.round(2000 + Math.random() * 3000);
      setPrediction({
        predicted_yield: simulatedYield,
        unit: 'kg/ha',
        accuracy: '92.3%',
        district: district,
        crop: selectedCrop,
        status: t("pred.success")
      });
      setError("Using simulated data (API not connected)");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedCrop("");
    setDistrict("");
    setRainfall("");
    setTemperature("");
    setSoilPh("");
    setNitrogen("");
    setPhosphorus("");
    setPotassium("");
    setIrrigationPercent("");
    setPrediction(null);
    setError("");
  };

  return (
    <>
    <div className="flex h-full bg-background">
      <AgriPredictSidebar  />
   
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex-1">
       
      <div className=" mx-auto">
        {/* Mobile top bar */}
        <div className="md:hidden mb-4 flex items-center justify-between">
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-green-800 hover:bg-green-100">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <AgriPredictSidebar showOnMobile />
            </SheetContent>
          </Sheet>
        </div>
        {/* Header */}
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌾 {t("pred.title")}</h1>
          <p className="text-gray-600">{t("app.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("pred.para")}</h2>
            
            {/* Crop Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">{t("pred.select_crop")}</label>
              <div className="grid grid-cols-2 gap-3">
                {crops.map((crop) => (
                  <div
                    key={crop.name}
                    onClick={() => setSelectedCrop(selectedCrop === crop.name ? "" : crop.name)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedCrop === crop.name 
                        ? 'border-green-500 bg-green-50 shadow-md' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{crop.icon}</div>
                    <h3 className="font-semibold text-gray-800">{crop.name}</h3>
                    <p className="text-xs text-gray-600">{crop.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* District Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("pred.param.district")}</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">{t("pred.param.selectDistrict")}</option>
                {odishaDistricts.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* Environmental Parameters */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("pred.param.rainfall")} </label>
                <input
                  type="number"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  placeholder={t("pred.param.rainfall.eg")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("pred.param.temperature")}</label>
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder={t("pred.param.temperature.eg")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Soil Parameters */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("pred.param.soilph")}</label>
                <input
                  type="number"
                  step="0.1"
                  value={soilPh}
                  onChange={(e) => setSoilPh(e.target.value)}
                  placeholder={t("pred.param.soilph.eg")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("pred.param.irrigation")}</label>
                <input
                  type="number"
                  value={irrigationPercent}
                  onChange={(e) => setIrrigationPercent(e.target.value)}
                  placeholder={t("pred.param.irrigation.eg")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Nutrient Parameters */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("pred.param.nitrogen")}</label>
                <input
                  type="number"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  placeholder={t("pred.param.nitrogen.eg")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("pred.param.phosphorus")}</label>
                <input
                  type="number"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  placeholder={t("pred.param.phosphorus.eg")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("pred.param.potassium")}</label>
                <input
                  type="number"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                  placeholder={t("pred.param.potassium.eg")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrediction}
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("pred.predicting")}...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4" />
                    {t("pred.prediction_yield")}
                  </>
                )}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t("pred.reset")}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("pred.result_title")}</h2>
            
            {!prediction ? (
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">{t("pred.result_instructions")}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Result */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl text-center">
                  <h3 className="text-lg font-semibold mb-2">{t("pred.predicted_yield")}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {prediction ? prediction.predicted_yield.toLocaleString() : ''}

                  </div>
                  <p className="text-green-100">{prediction?.unit}</p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">{t("pred.crop_details")}</h4>
                    <p className="text-sm text-gray-600">{t("pred.crop")}: {prediction?.crop}</p>
                    <p className="text-sm text-gray-600">{t("pred.param.district")}: {prediction?.district}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">{t("pred.model_info")}</h4>
                    <p className="text-sm text-gray-600">{t("pred.accuracy")}: {prediction?.accuracy}</p>
                    <p className="text-sm text-gray-600">{t("pred.status")}: {prediction?.status}</p>
                  </div>
                </div>

                {/* Input Summary */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3">{t("pred.input_parameters")}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("pred.param.rainfall")}:</span>
                      <span className="font-medium">{rainfall} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("pred.param.temperature")}:</span>
                      <span className="font-medium">{temperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("pred.param.soilph")}:</span>
                      <span className="font-medium">{soilPh}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("pred.param.irrigation")}:</span>
                      <span className="font-medium">{irrigationPercent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("pred.param.nitrogen")}:</span>
                      <span className="font-medium">{nitrogen} kg/ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("pred.param.phosphorus")}:</span>
                      <span className="font-medium">{phosphorus} kg/ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("pred.param.potassium")}:</span>
                      <span className="font-medium">{potassium} kg/ha</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">💡 {t("reco.title")}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {prediction.predicted_yield > 3000 && (
                      <li>• {t("pred.excellent_yield")}</li>
                    )}
                    {prediction.predicted_yield < 2000 && (
                      <li>• {t("pred.nitrogen_irrigation_warning")}</li>
                    )}
                    {parseFloat(soilPh) < 6.0 && (
                      <li>• {t("pred.irrigation_warning")}</li>
                    )}
                    {parseFloat(soilPh) > 8.0 && (
                      <li>• {t("pred.soil_ph_alkaline_warning")}</li>
                    )}
                    {parseFloat(irrigationPercent) < 50 && (
                      <li>• {t("pred.irrigation_warning")}</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* API Instructions */}
        
      </div>
    </div>
    </div>
    </>
  );
};

export default CropYieldPredictor;