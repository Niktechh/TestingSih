"use client"
import React, { use, useState, useRef, useEffect } from 'react'
import Link from "next/link";
import AgriPredictSidebar from "@/Components/AgriPredictSidebar";
import { GiCorn } from "react-icons/gi"
import { GiBowlOfRice } from "react-icons/gi";


import { 
  TrendingUp, 
  Target, 
  Leaf, 
  TrendingDown,
  Sun,
  Droplets,
  Wind,
  Thermometer,
  ArrowRight,
  Activity,
  Cloud,
  Wheat,
  Bot,
  
} from "lucide-react";

import { useI18n } from "@/lib/i18n";
import { set } from 'date-fns';


const Page = () => {
  const [input, setinput] = useState("")
  const [message, setmessage] = useState([
    {
      user:"bot",
      message:"Hello! How can I assist you today?"
    }
  ])
  
  // Ref for auto-scrolling to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom()
  }, [message])

const sendMessage = async () => {
  const text = input.trim();
  if (!text) return;

  setmessage((prev) => [
    ...prev,
    { user: "user", message: text }
  ]);

  try {
    const res = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question: text }),
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    setmessage((prev) => [
      ...prev,
      { user: "bot", message: data.answer }
    ]);

  } catch (err) {
    console.error(err);
    setmessage((prev) => [
      ...prev,
      { user: "bot", message: "Sorry, something went wrong. Please try again later." }
    ]);
  }
};


  const [open,setopen ] = useState(false)
  const { t } = useI18n() as any;
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AgriPredictSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen bg-background pb-20 lg:pb-4">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 px-4 py-6 lg:px-8">
            <div className="max-w-7xl mx-auto  ">
              {/* Greeting */}
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-green-800 mb-1">
                  {t("home.greeting")}
                </h1>
                <p className="text-green-700"> 
                  {t("home.sub")}
                </p>
              </div>

              {/* Weather Card */}
              <div className="app-card bg-white/70 backdrop-blur-sm px-3 py-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-green-800">{t("home.weather.title")}</h3>
                  <Sun className="h-6 w-6 text-yellow-600" />
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("home.weather.temperature")}</p>
                      <p className="font-semibold">28°C</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("home.weather.humidity")}</p>
                      <p className="font-semibold">65%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("home.weather.wind")}</p>
                      <p className="font-semibold">12 km/h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t("home.weather.rain")}</p>
                      <p className="font-semibold">30%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Cards */}
          <div className="px-4 py-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* My Crops Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">{t("My_crop.title")}</h2>
                  <Link href="/predictions" className="text-sm text-green-600 hover:text-green-700 font-medium">
                    Manage
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Wheat Card */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
                        <Wheat className='text-white '/>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{t("crop.wheat")}</h3>
                        <p className="text-sm text-muted-foreground">2.5 {t("crop.acres")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-green-600 font-medium">{t("crop.healthy")}</span>
                    </div>
                  </div>

                  {/* Corn Card */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-lg"><GiCorn /></span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{t("crop.corn")}</h3>
                        <p className="text-sm text-muted-foreground">1.8 {t("crop.acres")} </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-foreground font-medium">{t("crop.attention")}</span>
                    </div>
                  </div>

                  {/* Rice Card */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-lg"><GiBowlOfRice/></span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{t("crop.rice")}</h3>
                        <p className="text-sm text-muted-foreground">3.2 {t("crop.acres")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-green-600 font-medium">{t("crop.healthy")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-foreground mb-6">{t("home.quick_actions")}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Yield Prediction Card */}
                <Link href="/predictions" className="group">
                  <div className="app-card hover:shadow-md transition-all duration-200 border-2 border-transparent group-hover:border-green-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-[#00943A] rounded-xl flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-green-600 transition-colors" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-foreground mb-2">{t("home.yield_prediction.title")}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{t("home.yield_prediction.desc")}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <Activity className="h-4 w-4" />
                        <span className="font-medium">{t("home.yield_prediction.accuracy")}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {t("home.yield_prediction.updated")}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Smart Recommendations Card */}
                <Link href="/recommendations" className="group">
                  <div className="app-card hover:shadow-md transition-all duration-200 border-2 border-transparent group-hover:border-green-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 gradient-yellow rounded-xl flex items-center justify-center">
                        <Target className="h-6 w-6 text-black" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-green-600 transition-colors" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-foreground mb-2">{t("home.recommendations.title")}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{t("home.recommendations.desc")}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-yellow-700">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span className="font-medium">{t("home.recommendations.new")}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {t("home.recommendations.updated")}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Soil Health Card */}
                <Link href="/predictions" className="group">
                  <div className="app-card hover:shadow-md transition-all duration-200 border-2 border-transparent group-hover:border-green-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-white" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-green-600 transition-colors" />
                    </div>
                    
                    <h3 className="font-bold text-lg text-foreground mb-2">{t("home.soil_health.title")}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{t("home.soil_health.desc")}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="font-medium">{t("home.soil_health.good_status")}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {t("home.soil_health.ph")}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Market Trends Card */}
                <div className="app-card bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                      <TrendingDown className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">{t("home.coming_soon")}</div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-foreground mb-2">{t("home.market_trends.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("home.market_trends.desc")}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      <span className="font-medium">{t("home.feature_in_dev")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-foreground mb-4">{t("home.recent_activity")}</h2>
                <div className="app-card">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{t("home.activity.soil_updated")}</p>
                        <p className="text-xs text-muted-foreground">{t("home.activity.soil_time")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-yellow-700" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{t("home.activity.irrigation")}</p>
                        <p className="text-xs text-muted-foreground">{t("home.activity.irrigation_time")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{t("home.activity.yield")}</p>
                        <p className="text-xs text-muted-foreground">{t("home.activity.yield_time")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  )
}

export default Page