"use client"
import PlaceholderPage from '@/Components/PlaceholderPage'
import { Button } from '@/Components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from "@/lib/i18n";
import AgriPredictSidebar from "@/Components/AgriPredictSidebar";

const Page = () => {
  const { t } = useI18n() as any;
  
  // State to track completed recommendations
  const [completedRecommendations, setCompletedRecommendations] = useState<{[key: string]: boolean}>({});
  
  // State to store recommendation data for backend team
  const [recommendationData, setRecommendationData] = useState<Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    completed: boolean;
    completedAt?: string;
  }>>([
    {
      id: 'irrigation_optimize',
      type: 'irrigation',
      title: t("reco.card.optimize"),
      description: t("reco.card.optimize.desc"),
      completed: false
    },
    {
      id: 'irrigation_moisture',
      type: 'irrigation',
      title: t("reco.card.check_moisture"),
      description: t("reco.card.check_moisture.desc"),
      completed: false
    },
    {
      id: 'irrigation_drainage',
      type: 'irrigation',
      title: t("reco.card.drainage"),
      description: t("reco.card.drainage.desc"),
      completed: false
    }
  ]);

  // Load completed state from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('completedRecommendations');
    if (saved) {
      setCompletedRecommendations(JSON.parse(saved));
    }
  }, []);

  // Save completed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedRecommendations', JSON.stringify(completedRecommendations));
  }, [completedRecommendations]);

  // Handle marking recommendation as done/undone
  const handleMarkAsDone = (recommendationId: string) => {
    setCompletedRecommendations(prev => {
      const newState = { ...prev };
      newState[recommendationId] = !newState[recommendationId];
      return newState;
    });

    // Update recommendation data
    setRecommendationData(prev => 
      prev.map(rec => 
        rec.id === recommendationId 
          ? { 
              ...rec, 
              completed: !rec.completed,
              completedAt: !rec.completed ? new Date().toISOString() : undefined
            }
          : rec
      )
    );
  };

  // Function to get recommendation by ID
  const getRecommendation = (id: string) => {
    return recommendationData.find(rec => rec.id === id);
  };

  // **FOR BACKEND TEAM: These variables contain all the data you need**
  
  // 1. Current completion status of all recommendations
  const currentCompletionStatus = completedRecommendations;
  
  // 2. Complete recommendation data with timestamps
  const allRecommendationData = recommendationData;
  
  // 3. Summary statistics
  const completionStats = {
    totalRecommendations: recommendationData.length,
    completedCount: Object.values(completedRecommendations).filter(Boolean).length,
    pendingCount: recommendationData.length - Object.values(completedRecommendations).filter(Boolean).length,
    completionRate: Math.round((Object.values(completedRecommendations).filter(Boolean).length / recommendationData.length) * 100)
  };
  
  // 4. Data ready for API submission (when you're ready to implement)
  const apiPayload = {
    recommendations: recommendationData,
    completionStats: completionStats,
    lastUpdated: new Date().toISOString(),
    userId: "user_123", // Replace with actual user ID from your auth system
    sessionId: "session_456" // Replace with actual session ID
  };

  // Log data to console for backend team to see (remove in production)
  useEffect(() => {
    console.log('=== RECOMMENDATION DATA FOR BACKEND TEAM ===');
    console.log('Current Completion Status:', currentCompletionStatus);
    console.log('All Recommendation Data:', allRecommendationData);
    console.log('Completion Statistics:', completionStats);
    console.log('API Payload:', apiPayload);
    console.log('==========================================');
  }, [recommendationData, completedRecommendations]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AgriPredictSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-family: Manrope">
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-40 flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <div className="flex min-w-72 flex-col gap-3">
                    <p className="text-[#131712] tracking-light text-[32px] font-bold leading-tight">{t("reco.title")}</p>
                    <p className="text-[#6d8566] text-sm font-normal leading-normal">{t("reco.subtitle")}</p>
                  </div>
                  {/* Display completion stats for backend team reference */}
                  <div className="text-right text-sm text-gray-600">
                    <p>Completed: {completionStats.completedCount}/{completionStats.totalRecommendations}</p>
                    <p>Rate: {completionStats.completionRate}%</p>
                  </div>
                </div>
                <div className="pb-3">
                  <div className="flex border-b border-[#dee4dc] px-4 gap-8">
                    <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#131712] text-[#131712] pb-[13px] pt-4" href="#">
                      <p className="text-[#131712] text-sm font-bold leading-normal tracking-[0.015em]">{t("reco.tab.irrigation")}</p>
                    </a>
                    <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#6d8566] pb-[13px] pt-4" href="#">
                      <p className="text-[#131712] text-sm font-bold leading-normal tracking-[0.015em]">{t("reco.tab.fertilization")}</p>
                    </a>
                    <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#6d8566] pb-[13px] pt-4" href="#">
                      <p className="text-[#131712] text-sm font-bold leading-normal tracking-[0.015em]">{t("reco.tab.pest")}</p>
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-stretch justify-between gap-4 rounded-lg">
                    <div className="flex flex-[2_2_0px] flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-[#6d8566] text-sm font-normal leading-normal">{t("reco.tab.irrigation")}</p>
                        <p className="text-[#131712] text-base font-bold leading-tight">{t("reco.card.optimize")}</p>
                        <p className="text-[#131712] text-sm font-normal leading-normal">{t("reco.card.optimize.desc")}</p>
                      </div>
                      <button
                        onClick={() => handleMarkAsDone('irrigation_optimize')}
                        className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse text-sm font-medium leading-normal w-fit transition-all duration-200 ${
                          completedRecommendations['irrigation_optimize']
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-[#f1f4f1] text-[#131712] hover:bg-green-50'
                        }`}
                      >
                        <span className="truncate">
                          {completedRecommendations['irrigation_optimize'] ? 'Completed' : t("reco.card.done")}
                        </span>
                      </button>
                    </div>
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1">
                      <img src="./image_1_recom.png" alt="Water schedule image" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-stretch justify-between gap-4 rounded-lg">
                    <div className="flex flex-[2_2_0px] flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-[#6d8566] text-sm font-normal leading-normal">{t("reco.tab.irrigation")}</p>
                        <p className="text-[#131712] text-base font-bold leading-tight">{t("reco.card.check_moisture")}</p>
                        <p className="text-[#131712] text-sm font-normal leading-normal">{t("reco.card.check_moisture.desc")}</p>
                      </div>
                      <button
                        onClick={() => handleMarkAsDone('irrigation_moisture')}
                        className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse text-sm font-medium leading-normal w-fit transition-all duration-200 ${
                          completedRecommendations['irrigation_moisture']
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-[#f1f4f1] text-[#131712] hover:bg-green-50'
                        }`}
                      >
                        <span className="truncate">
                          {completedRecommendations['irrigation_moisture'] ? 'Completed' : t("reco.card.done")}
                        </span>
                      </button>
                    </div>
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1">
                      <img src="./image_2_recom.png" alt="soil moisture image" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-stretch justify-between gap-4 rounded-lg">
                    <div className="flex flex-[2_2_0px] flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-[#6d8566] text-sm font-normal leading-normal">{t("reco.tab.irrigation")}</p>
                        <p className="text-[#131712] text-base font-bold leading-tight">{t("reco.card.drainage")}</p>
                        <p className="text-[#131712] text-sm font-normal leading-normal">{t("reco.card.drainage.desc")}</p>
                      </div>
                      <button
                        onClick={() => handleMarkAsDone('irrigation_drainage')}
                        className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse text-sm font-medium leading-normal w-fit transition-all duration-200 ${
                          completedRecommendations['irrigation_drainage']
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-[#f1f4f1] text-[#131712] hover:bg-green-50'
                        }`}
                      >
                        <span className="truncate">
                          {completedRecommendations['irrigation_drainage'] ? 'Completed' : t("reco.card.done")}
                        </span>
                      </button>
                    </div>
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1">
                      <img src="./image_3_recom.png" alt="Drainage image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Dashboard Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-[-3/5] w-full max-w-md px-4">
        <Link href={"./dashboard"}>
          <Button className="gap-2 gradient-green text-white font-semibold tap-target">
            <ArrowLeft className="h-4 w-4" />
            {t("back_to_dashboard")}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Page