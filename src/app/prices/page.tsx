"use client";

import React, { useState } from "react";
import PlaceholderPage from "@/Components/PlaceholderPage";
import { useI18n } from "@/lib/i18n";
import AgriPredictSidebar from "@/Components/AgriPredictSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Menu } from "lucide-react";

const Page = () => {
  const { t } = useI18n() as any;
  const [searchQuery, setSearchQuery] = useState(""); // <-- state for input

  // crop data
  const crops = [
    { name: t("pred.crop.wheat"), price: "₹2,150/", change: "↑ 2%" },
    { name: t("pred.crop.rice"), price: "₹1,800/", change: "↓ 1%" },
    { name: t("pred.crop.cotton"), price: "₹5,500/", change: "↑ 3%" },
    { name: t("pred.crop.soy"), price: "₹4,200/", change: "↓ 2%" },
    { name: t("pred.crop.corn"), price: "₹3,800/", change: "↑ 1%" },
  ];

  // filter crops based on search query
  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

          {/* Placeholder */}
          {/* <PlaceholderPage
            title={t("page.prices.title")}
            description={t("page.prices.desc")}
          /> */}

          {/* Prices Section */}
          <div className="relative flex min-h-screen w-full flex-col bg-white overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
              {/* Header */}
              <header className="flex items-center justify-between border-b border-[#f1f4f1] px-10 py-3">
                <div className="flex items-center gap-4 text-[#121712]">
                  <div className="size-4">
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold tracking-[-0.015em]">
                    {t("app.title")}
                  </h2>
                </div>
                <button className="flex h-10 items-center gap-2 rounded-xl bg-[#f1f4f1] px-2.5 font-bold text-sm text-[#121712]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </button>
              </header>

              {/* Search */}
              <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                  <div className="flex flex-wrap justify-between gap-3 p-4">
                    <p className="text-[32px] font-bold">{t("prices.title")}</p>
                  </div>
                  <div className="px-4 py-3">
                    <label className="flex flex-col h-12 w-full">
                      <div className="flex w-full items-stretch rounded-xl h-full">
                        <div className="flex items-center justify-center pl-4 bg-[#f1f4f1] rounded-l-xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            fill="currentColor"
                            viewBox="0 0 256 256"
                          >
                            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                          </svg>
                        </div>
                        <input
                          value={searchQuery} // controlled input
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search crop name..."
                          className="flex w-full rounded-r-xl bg-[#f1f4f1] px-4 text-base focus:outline-none"
                        />
                      </div>
                    </label>
                  </div>

                  {/* Market update card */}
                  <div className="p-4">
                    <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white">
                      <div className="flex flex-col gap-1 flex-[2_2_0px]">
                        <p className="text-sm text-[#678368]">{t("prices.mark")}</p>
                        <p className="text-base font-bold text-[#121712]">
                          {t("prices.sum1")}
                        </p>
                        <p className="text-sm text-[#678368]">
                          {t("prices.sum2")}
                        </p>
                      </div>
                      <div className="flex-1">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKmhiFRk7jD2zTVfnwaqtvkAoxRt5R7xOXzRYClOmkBSkZHKV_P11TcxqScQRupAwSJwrHPj09UFPHN9yMMKgU3TMlgCIEouF5RftKQs1_Lt-iutvGgGY2HNEb0jX1jRhDnZxwkFmnIbOEpHjXtVeJ10B-DRKi9iigoPqrsKQOVGATDIPN3C1yE8-vOx5JKouTNPu9FrhO9OuaoJuLsLm2ieazcQz-c9BD-QmwcQuZOMEZnwurji0pCYkjRvCmJUJFkWAcos3muz4"
                          alt="Market Update"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Crop Prices */}
                  <h3 className="text-lg font-bold px-4 pb-2 pt-4">
                    {t("prices.crop.title")}
                  </h3>

                  {/* Filtered Crop list */}
                  {filteredCrops.map((crop) => (
                    <div
                      key={crop.name}
                      className="flex items-center justify-between bg-white px-4 py-2 rounded-xl shadow-sm mb-2"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center size-12 rounded-lg bg-[#f1f4f1]">
                          🌾
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-medium">{crop.name}</p>
                          <p className="text-sm text-[#678368]">{crop.price}{t("prices.quintals")}</p>
                        </div>
                      </div>
                      <p className="text-base">{crop.change}</p>
                    </div>
                  ))}

                  {/* Action Button */}
                  <div className="flex px-4 py-3">
                    <button className="flex w-full items-center justify-center rounded-xl h-12 bg-[#208823] text-white font-bold">
                      {t("prices.sell")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Page;
