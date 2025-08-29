"use client"
import PlaceholderPage from '@/Components/PlaceholderPage'
import { Button } from '@/Components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { useI18n } from "@/lib/i18n";



const Page = () => {
  const { t } = useI18n() as any;
  return (
    <div>
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hiddenfont-family: Manrope, ">
      <div className="layout-container flex h-full grow flex-col">
       
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#131712] tracking-light text-[32px] font-bold leading-tight">{t("reco.title")}</p>
                <p className="text-[#6d8566] text-sm font-normal leading-normal">{t("reco.subtitle")}</p>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex border-b border-[#dee4dc] px-4 gap-8">
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#131712] text-[#131712] pb-[13px] pt-4" href="#">
                  <p className="text-[#131712] text-sm font-bold leading-normal tracking-[0.015em]">{t("reco.tab.irrigation")}</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#6d8566] pb-[13px] pt-4" href="#">
                  <p className="text-[#6d8566] text-sm font-bold leading-normal tracking-[0.015em]">{t("reco.tab.fertilization")}</p>
                </a>
                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#6d8566] pb-[13px] pt-4" href="#">
                  <p className="text-[#6d8566] text-sm font-bold leading-normal tracking-[0.015em]">{t("reco.tab.pest")}</p>
                </a>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-lg">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#6d8566] text-sm font-normal leading-normal">{t("reco.tab.irrigation")}</p>
                    <p className="text-[#131712] text-base font-bold leading-tight">{t("reco.card.optimize")}</p>
                    <p className="text-[#6d8566] text-sm font-normal leading-normal">{t("reco.card.optimize.desc")}</p>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#f1f4f1] text-[#131712] text-sm font-medium leading-normal w-fit"
                  >
                    <span className="truncate">{t("reco.card.done")}</span>
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
                    <p className="text-[#6d8566] text-sm font-normal leading-normal">{t("reco.card.check_moisture.desc")}</p>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#f1f4f1] text-[#131712] text-sm font-medium leading-normal w-fit"
                  >
                    <span className="truncate">{t("reco.card.done")}</span>
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
                    <p className="text-[#6d8566] text-sm font-normal leading-normal">{t("reco.card.drainage.desc")}</p>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#f1f4f1] text-[#131712] text-sm font-medium leading-normal w-fit"
                  >
                    <span className="truncate">{t("reco.card.done")}</span>
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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-3/5 w-full max-w-md px-4">
       <Link href={"./dashboard"}>
            <Button className=" gap-2 gradient-green text-white font-semibold tap-target ">
              <ArrowLeft className="h-4 w-4" />
              {t("back_to_dashboard")}
            </Button>
          </Link>

    </div>


    </div>
  )
}

export default Page