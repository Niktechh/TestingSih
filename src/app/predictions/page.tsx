"use client"
import PlaceholderPage from '@/Components/PlaceholderPage'
import React, { useState } from 'react'
import { format } from "date-fns"
import { ArrowLeft, Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import Link from 'next/link'
import { useI18n } from "@/lib/i18n";
import AgriPredictSidebar from "@/Components/AgriPredictSidebar";

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
}  from "@/Components/ui/popover"

const Page = () => {
  const { t } = useI18n() as any;

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const [value, setvalue] = useState("")
  const [Crop, setCrop] = useState("")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AgriPredictSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-40 flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col w-[512px] py-5 flex-1">
                <h2 className="text-[#121712] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
                  {t("pred.title")}
                </h2>
                
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex gap-6 justify-between">
                    <p className="text-[#121712] text-base font-medium leading-normal">{t("pred.step")}</p>
                  </div>
                  <div className="rounded bg-[#dde4dd]">
                    <div className="h-2 rounded bg-[#121712]" style={{ width: "25%" }}></div>
                  </div>
                </div>

                <h3 className="text-[#121712] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                  {t("pred.select_crop")}
                </h3>
                
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                  <div className={`flex flex-1 gap-3 rounded-lg border border-[#dde4dd] bg-white p-4 flex-col cursor-pointer ${Crop === "Wheat"? "border-5 border-[#218321]" : "border-[#dde4dd]"}`} onClick={() => setCrop(Crop === "Wheat"? "" : "Wheat")} >
                    <div className="text-[#121712]" data-icon="Grains" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,56a87.53,87.53,0,0,0-31.85,6c-14.32-29.7-43.25-44.46-44.57-45.12a8,8,0,0,0-7.16,0c-1.33.66-30.25,15.42-44.57,45.12A87.53,87.53,0,0,0,48,56a8,8,0,0,0-8,8v80a88,88,0,0,0,176,0V64A8,8,0,0,0,208,56ZM120,215.56A72.1,72.1,0,0,1,56,144V128.44A72.1,72.1,0,0,1,120,200Zm0-66.1a88,88,0,0,0-64-37.09V72.44A72.1,72.1,0,0,1,120,144ZM94.15,69.11c9.22-19.21,26.41-31.33,33.85-35.9,7.44,4.58,24.63,16.7,33.84,35.9A88.61,88.61,0,0,0,128,107.36,88.57,88.57,0,0,0,94.15,69.11ZM200,144a72.1,72.1,0,0,1-64,71.56V200a72.1,72.1,0,0,1,64-71.56Zm0-31.63a88,88,0,0,0-64,37.09V144a72.1,72.1,0,0,1,64-71.56Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#121712] text-base font-bold leading-tight">{t("pred.crop.wheat")}</h2>
                      <p className="text-[#678367] text-sm font-normal leading-normal">{t("pred.crop.wheat.desc")}</p>
                    </div>
                  </div>

                  <div className={`flex flex-1 gap-3 rounded-lg border border-[#dde4dd] bg-white p-4 flex-col cursor-pointer ${Crop === "Corn"? "border-5 border-[#218321]" : "border-[#dde4dd]"}`} onClick={() => setCrop(Crop === "Corn"? "" : "Corn")} >
                    <div className="text-[#121712]" data-icon="Grains" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,56a87.53,87.53,0,0,0-31.85,6c-14.32-29.7-43.25-44.46-44.57-45.12a8,8,0,0,0-7.16,0c-1.33.66-30.25,15.42-44.57,45.12A87.53,87.53,0,0,0,48,56a8,8,0,0,0-8,8v80a88,88,0,0,0,176,0V64A8,8,0,0,0,208,56ZM120,215.56A72.1,72.1,0,0,1,56,144V128.44A72.1,72.1,0,0,1,120,200Zm0-66.1a88,88,0,0,0-64-37.09V72.44A72.1,72.1,0,0,1,120,144ZM94.15,69.11c9.22-19.21,26.41-31.33,33.85-35.9,7.44,4.58,24.63,16.7,33.84,35.9A88.61,88.61,0,0,0,128,107.36,88.57,88.57,0,0,0,94.15,69.11ZM200,144a72.1,72.1,0,0,1-64,71.56V200a72.1,72.1,0,0,1,64-71.56Zm0-31.63a88,88,0,0,0-64,37.09V144a72.1,72.1,0,0,1,64-71.56Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#121712] text-base font-bold leading-tight">{t("pred.crop.corn")}</h2>
                      <p className="text-[#678367] text-sm font-normal leading-normal">{t("pred.crop.corn.desc")}</p>
                    </div>
                  </div>

                  <div className={`flex flex-1 gap-3 rounded-lg border border-[#dde4dd] bg-white p-4 flex-col cursor-pointer ${Crop === "Rice"? "border-5 border-[#218321]" : "border-[#dde4dd]"}`} onClick={() => setCrop(Crop === "Rice"? "" : "Rice")} >
                    <div className="text-[#121712]" data-icon="Grains" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,56a87.53,87.53,0,0,0-31.85,6c-14.32-29.7-43.25-44.46-44.57-45.12a8,8,0,0,0-7.16,0c-1.33.66-30.25,15.42-44.57,45.12A87.53,87.53,0,0,0,48,56a8,8,0,0,0-8,8v80a88,88,0,0,0,176,0V64A8,8,0,0,0,208,56ZM120,215.56A72.1,72.1,0,0,1,56,144V128.44A72.1,72.1,0,0,1,120,200Zm0-66.1a88,88,0,0,0-64-37.09V72.44A72.1,72.1,0,0,1,120,144ZM94.15,69.11c9.22-19.21,26.41-31.33,33.85-35.9,7.44,4.58,24.63,16.7,33.84,35.9A88.61,88.61,0,0,0,128,107.36,88.57,88.57,0,0,0,94.15,69.11ZM200,144a72.1,72.1,0,0,1-64,71.56V200a72.1,72.1,0,0,1,64-71.56Zm0-31.63a88,88,0,0,0-64,37.09V144a72.1,72.1,0,0,1,64-71.56Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#121712] text-base font-bold leading-tight">{t("pred.crop.rice")}</h2>
                      <p className="text-[#678367] text-sm font-normal leading-normal">{t("pred.crop.rice.desc")}</p>
                    </div>
                  </div>

                  <div className={`flex flex-1 gap-3 rounded-lg border border-[#dde4dd] bg-white p-4 flex-col cursor-pointer ${Crop === "Soyabean"? "border-5 border-[#218321]" : "border-[#dde4dd]"}`} onClick={() => setCrop(Crop === "Soyabean"? "" : "Soyabean")} >
                    <div className="text-[#121712]" data-icon="Grains" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,56a87.53,87.53,0,0,0-31.85,6c-14.32-29.7-43.25-44.46-44.57-45.12a8,8,0,0,0-7.16,0c-1.33.66-30.25,15.42-44.57,45.12A87.53,87.53,0,0,0,48,56a8,8,0,0,0-8,8v80a88,88,0,0,0,176,0V64A8,8,0,0,0,208,56ZM120,215.56A72.1,72.1,0,0,1,56,144V128.44A72.1,72.1,0,0,1,120,200Zm0-66.1a88,88,0,0,0-64-37.09V72.44A72.1,72.1,0,0,1,120,144ZM94.15,69.11c9.22-19.21,26.41-31.33,33.85-35.9,7.44,4.58,24.63,16.7,33.84,35.9A88.61,88.61,0,0,0,128,107.36,88.57,88.57,0,0,0,94.15,69.11ZM200,144a72.1,72.1,0,0,1-64,71.56V200a72.1,72.1,0,0,1,64-71.56Zm0-31.63a88,88,0,0,0-64,37.09V144a72.1,72.1,0,0,1,64-71.56Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#121712] text-base font-bold leading-tight">{t("pred.crop.soy")}</h2>
                      <p className="text-[#678367] text-sm font-normal leading-normal">{t("pred.crop.soy.desc")}</p>
                    </div>
                  </div>

                  <div className={`flex flex-1 gap-3 rounded-lg border border-[#dde4dd] bg-white p-4 flex-col cursor-pointer ${Crop === "Cotton"? "border-5 border-[#218321]" : "border-[#dde4dd]"}`} onClick={() => setCrop(Crop === "Cotton"? "" : "Cotton")} >
                    <div className="text-[#121712]" data-icon="Needle" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M189.66,66.34a8,8,0,0,1,0,11.32l-16,16a8,8,0,0,1-11.32-11.32l16-16A8,8,0,0,1,189.66,66.34ZM224,72a39.71,39.71,0,0,1-11.72,28.28l-24,24a8,8,0,0,1-4.3,2.23c-51.49,8.84-137.46,94.28-138.32,95.15h0a8,8,0,0,1-11.31-11.32h0C36,208.73,120.69,123.28,129.49,72a8,8,0,0,1,2.23-4.3l24-24A40,40,0,0,1,224,72Zm-16,0a24,24,0,0,0-41-17L144.77,77.29c-4.41,21.15-18.9,46.19-35.49,69.43,23.24-16.59,48.28-31.08,69.43-35.49L201,89A23.85,23.85,0,0,0,208,72Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#121712] text-base font-bold leading-tight">{t("pred.crop.cotton")}</h2>
                      <p className="text-[#678367] text-sm font-normal leading-normal">{t("pred.crop.cotton.desc")}</p>
                    </div>
                  </div>

                  <div className={`flex flex-1 gap-3 rounded-lg border border-[#dde4dd] bg-white p-4 flex-col cursor-pointer ${Crop === "Sugarcane"? "border-5 border-[#218321]" : "border-[#dde4dd]"}`} onClick={() => setCrop(Crop === "Sugarcane"? "" : "Sugarcane")} >
                    <div className="text-[#121712]" data-icon="TreePalm" data-size="24px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M237.79,53.23a66.86,66.86,0,0,0-97.74,0,72.21,72.21,0,0,0-12.05,17,72.21,72.21,0,0,0-12-17,66.86,66.86,0,0,0-97.74,0,8,8,0,0,0,2.6,12.85L77,90.55a71.42,71.42,0,0,0-43.36,33.21,70.64,70.64,0,0,0-7.2,54.32A8,8,0,0,0,39,182.36l81-61.68V224a8,8,0,0,0,16,0V120.68l81,61.68a8,8,0,0,0,12.57-4.28,70.64,70.64,0,0,0-7.2-54.32A71.42,71.42,0,0,0,179,90.55l56.22-24.47a8,8,0,0,0,2.6-12.85ZM67.08,48a51.13,51.13,0,0,1,37.28,16.26,56.53,56.53,0,0,1,14.26,26.93L39,56.53A50.5,50.5,0,0,1,67.08,48ZM40,161.5a54.82,54.82,0,0,1,7.47-29.7,55.55,55.55,0,0,1,34-25.89A56.52,56.52,0,0,1,96.1,104a55.82,55.82,0,0,1,16.23,2.41ZM208.5,131.8A54.82,54.82,0,0,1,216,161.5l-72.3-55.1a56.3,56.3,0,0,1,64.83,25.4ZM137.38,91.19a56.53,56.53,0,0,1,14.26-26.93A51.13,51.13,0,0,1,188.92,48,50.5,50.5,0,0,1,217,56.53Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[#121712] text-base font-bold leading-tight">{t("pred.crop.sugarcane")}</h2>
                      <p className="text-[#678367] text-sm font-normal leading-normal">{t("pred.crop.sugarcane.desc")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121712] text-base font-medium leading-normal pb-2">{t("pred.sowing_date")}</p>
                    <div className="flex w-full flex-1 items-stretch rounded-lg">
                      <label htmlFor="date" className="px-1">
                        {t("pred.date_label")}
                      </label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-48 justify-between font-normal"
                          >
                            {date ? date.toLocaleDateString() : t("pred.select_date")}
                            <ChevronDown />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setDate(date)
                              setOpen(false)
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121712] text-base font-medium leading-normal pb-2">{t("pred.soil_values")}</p>
                    <div className="flex w-full flex-1 items-stretch rounded-lg">
                      <input
                        placeholder={t("pred.enter_values")}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#121712] focus:outline-0 focus:ring-0 border border-[#dde4dd] bg-white focus:border-[#dde4dd] h-14 placeholder:text-[#678367] p-[15px] pr-2 text-base font-normal leading-normal"
                        value={value} 
                        onChange={(e) => setvalue(e.target.value)}
                      />
                    </div>
                  </label>
                </div>

                <div className="flex px-4 py-3">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#218321] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">{t("next")}</span>
                  </button>
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