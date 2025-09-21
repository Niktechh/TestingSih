"use client"
import PlaceholderPage from '@/Components/PlaceholderPage'
import React from 'react'
import { useI18n } from "@/lib/i18n";
import AgriPredictSidebar from "@/Components/AgriPredictSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Menu } from "lucide-react";

const Page = () => {
  const { t } = useI18n() as any;
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AgriPredictSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-4">
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
          <PlaceholderPage title={t("page.redeem.title")} description={t("page.redeem.desc")} />
        </div>
      </div>
    </div>
  )
}

export default Page