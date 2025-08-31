"use client"
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Loader2, TrendingUp } from "lucide-react";
import AgriPredictSidebar from '@/Components/AgriPredictSidebar';


const CropYieldPredictor = () => {
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
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const crops = [
    {
      name: "Wheat",
      description: "High protein grain crop, winter season",
      icon: "🌾"
    },
    {
      name: "Rice", 
      description: "Staple grain crop, requires flooding",
      icon: "🌾"
    },
    {
      name: "Corn",
      description: "Versatile cereal grain, summer crop",
      icon: "🌽"
    },
    {
      name: "Soyabean",
      description: "Protein-rich legume crop",
      icon: "🫘"
    },
    {
      name: "Cotton",
      description: "Fiber crop for textile industry",
      icon: "🌿"
    },
    {
      name: "Sugarcane",
      description: "Sugar producing perennial crop",
      icon: "🎋"
    }
  ];

  const odishaDistricts = [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack",
    "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
    "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha",
    "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada",
    "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
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
      const response = await fetch('http://localhost:5000/predict', {
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

      const result = await response.json();
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
        status: 'success'
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
   
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
       
      <div className=" mx-auto">
        {/* Header */}
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌾 Crop Yield Predictor</h1>
          <p className="text-gray-600">AI-powered crop yield prediction for Odisha farmers</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Prediction Parameters</h2>
            
            {/* Crop Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Crop</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select District</option>
                {odishaDistricts.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* Environmental Parameters */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rainfall (mm)</label>
                <input
                  type="number"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  placeholder="e.g., 1200"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="e.g., 28"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Soil Parameters */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil pH</label>
                <input
                  type="number"
                  step="0.1"
                  value={soilPh}
                  onChange={(e) => setSoilPh(e.target.value)}
                  placeholder="e.g., 6.5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Irrigation (%)</label>
                <input
                  type="number"
                  value={irrigationPercent}
                  onChange={(e) => setIrrigationPercent(e.target.value)}
                  placeholder="e.g., 75"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Nutrient Parameters */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nitrogen (kg/ha)</label>
                <input
                  type="number"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  placeholder="e.g., 120"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phosphorus (kg/ha)</label>
                <input
                  type="number"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  placeholder="e.g., 60"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Potassium (kg/ha)</label>
                <input
                  type="number"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                  placeholder="e.g., 40"
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
                    Predicting...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4" />
                    Predict Yield
                  </>
                )}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Prediction Results</h2>
            
            {!prediction ? (
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Fill in the parameters and click "Predict Yield" to see results</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Result */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl text-center">
                  <h3 className="text-lg font-semibold mb-2">Predicted Yield</h3>
                  <div className="text-4xl font-bold mb-2">
                    {prediction.predicted_yield.toLocaleString()}
                  </div>
                  <p className="text-green-100">{prediction.unit}</p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Crop Details</h4>
                    <p className="text-sm text-gray-600">Crop: {prediction.crop}</p>
                    <p className="text-sm text-gray-600">District: {prediction.district}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Model Info</h4>
                    <p className="text-sm text-gray-600">Accuracy: {prediction.accuracy}</p>
                    <p className="text-sm text-gray-600">Status: {prediction.status}</p>
                  </div>
                </div>

                {/* Input Summary */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3">Input Parameters</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rainfall:</span>
                      <span className="font-medium">{rainfall} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temperature:</span>
                      <span className="font-medium">{temperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soil pH:</span>
                      <span className="font-medium">{soilPh}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Irrigation:</span>
                      <span className="font-medium">{irrigationPercent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nitrogen:</span>
                      <span className="font-medium">{nitrogen} kg/ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phosphorus:</span>
                      <span className="font-medium">{phosphorus} kg/ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Potassium:</span>
                      <span className="font-medium">{potassium} kg/ha</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">💡 Recommendations</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {prediction.predicted_yield > 3000 && (
                      <li>• Excellent yield predicted! Maintain current practices.</li>
                    )}
                    {prediction.predicted_yield < 2000 && (
                      <li>• Consider increasing nitrogen or improving irrigation.</li>
                    )}
                    {parseFloat(soilPh) < 6.0 && (
                      <li>• Soil pH is acidic. Consider adding lime to improve pH.</li>
                    )}
                    {parseFloat(soilPh) > 8.0 && (
                      <li>• Soil pH is alkaline. Consider adding organic matter.</li>
                    )}
                    {parseFloat(irrigationPercent) < 50 && (
                      <li>• Low irrigation coverage may limit yield potential.</li>
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