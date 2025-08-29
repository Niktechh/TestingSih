"use client"
import React, { use, useState } from 'react'
import Link from "next/link";

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

const sendMessage = async () => {
  const text = input.trim();
  if (!text) return;

  setmessage((prev) => [
    ...prev,
    { user: "user", message: text }
  ]);

  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    setmessage((prev) => [
      ...prev,
      { user: "bot", message: data.reply }
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
    <div>
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
          <h2 className="text-xl font-bold text-foreground mb-6">{t("home.quick_actions")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Yield Prediction Card */}
            <Link href="/predictions" className="group">
              <div className="app-card hover:shadow-md transition-all duration-200 border-2 border-transparent group-hover:border-green-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 gradient-green rounded-xl flex items-center justify-center">
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
            <Link href="/data_entry" className="group">
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
    {open&&(
      <div className="chatbot h-96 w-80 fixed bottom-4 right-18 bg-[#f1f1f1] flex flex-col border border-gray-300 rounded-lg shadow-lg">
        <div className="chat-head bg-[#8a96a1] text-white p-3 flex justify-center items-center text-lg font-semibold rounded-t-lg"> 
          <h2 className=''>CHATBOT</h2>
        </div>
        <div className="message_area bg-[#cececf] flex-1 p-3 overflow-y-auto">
          {message.map((msg,index) => (
            <div key={index} className={`mb-4 flex ${msg.user === "user" ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-2 rounded-lg ${msg.user === "user" ? 'bg-[#e5fcec] text-black' : 'bg-[#8b98a2] text-white'}`}>             
                {msg.message}
              </div>
            </div>    
          ))}
        </div>
        <div className="input_area p-3 bg-[#e4e4e4] flex items-center gap-2 rounded-b-lg">  
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[ #8a96a1]"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setinput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { sendMessage(); setinput(''); } }}
          />
          <button onClick={() => { sendMessage(); setinput(''); }} className="bg-[#529767] text-white px-4 py-2 rounded-lg hover:bg-[#8B98A2] transition-colors">Send</button>

        </div>
      </div>
    )}
          <button onClick={() => setopen(!open)} className=" bottom-4 right-4  fixed w-14 h-14 rounded-full bg-[#529767] text-black flex items-center justify-center shadow-lg hover:bg-[#E5FCEC]  " >
            {open? "X": "chat"}
          </button>

    </div>
  )
}

export default Page