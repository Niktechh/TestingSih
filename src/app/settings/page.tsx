"use client"
import PlaceholderPage from '@/Components/PlaceholderPage'
import React from 'react'
import { useI18n } from "@/lib/i18n";
import AgriPredictSidebar from "@/Components/AgriPredictSidebar";
import { Button } from '@/Components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Menu } from "lucide-react";


const Page = () => {
  const { t, language, setLanguage } = useI18n() as any;
  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "or", label: "ଓଡିଆ" },
    { code: "ml", label: "മലയാളം"},

  ];
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AgriPredictSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">

        <div className="px-4 sm:px-6 lg:px-10 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] py-5">
            {/* Mobile top bar */}
            <div className="md:hidden flex items-center justify-between px-2 pb-2">
              <Sheet>
                <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-green-800 hover:bg-green-100">
                  <Menu className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <AgriPredictSidebar showOnMobile />
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#121712] tracking-light text-2xl sm:text-[32px] font-bold leading-tight">{t("settings.title")}</p>
            </div>
            <h3 className="text-[#121712] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t("settings.language")}</h3>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-[#121712] text-base font-medium leading-normal line-clamp-1">{t("settings.app_language")}</p>
                <p className="text-[#668566] text-sm font-normal leading-normal line-clamp-2">{languages.find(l => l.code === language)?.label}</p>
              </div>
              <div className="shrink-0">
                <Select value={language} onValueChange={(val) => setLanguage(val)}>
                  <SelectTrigger className="min-w-[140px] max-w-[60vw] sm:max-w-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((l) => (
                      <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <h3 className="text-[#121712] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t("settings.help")}</h3>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-[#121712] text-base font-medium leading-normal line-clamp-1">{t("settings.faqs")}</p>
                <p className="text-[#668566] text-sm font-normal leading-normal line-clamp-2">{t("settings.faqs.desc")}</p>
              </div>
              <div className="shrink-0">
                <div className="text-[#121712] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-[#121712] text-base font-medium leading-normal line-clamp-1">{t("settings.voice")}</p>
                <p className="text-[#668566] text-sm font-normal leading-normal line-clamp-2">{t("settings.voice.desc")}</p>
              </div>
              <div className="shrink-0">
                <div className="text-[#121712] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="text-[#121712] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t("settings.contact")}</h3>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-[#121712] text-base font-medium leading-normal line-clamp-1">{t("settings.call")}</p>
                <p className="text-[#668566] text-sm font-normal leading-normal line-clamp-2">{t("settings.call.desc")}</p>
              </div>
              <div className="shrink-0">
                <div className="text-[#121712] flex size-7 items-center justify-center" data-icon="Phone" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-[#121712] text-base font-medium leading-normal line-clamp-1">{t("settings.chat")}</p>
                <p className="text-[#668566] text-sm font-normal leading-normal line-clamp-2">{t("settings.chat.desc")}</p>
              </div>
              <div className="shrink-0">
                <div className="text-[#121712] flex size-7 items-center justify-center" data-icon="ChatCircleDots" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      {/* Back to Dashboard Button */}
      <div className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-md px-4">
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