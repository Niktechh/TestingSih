"use client"
import PlaceholderPage from '@/Components/PlaceholderPage'
import React from 'react'
import { useI18n } from "@/lib/i18n";
import AgriPredictSidebar from "@/Components/AgriPredictSidebar";

const Page = () => {
  const { t } = useI18n() as any;
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AgriPredictSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <PlaceholderPage title={t("page.notifications.title")} description={t("page.notifications.desc")} />
      </div>
    </div>
  )
}

export default Page