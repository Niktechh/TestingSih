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
          {/* <PlaceholderPage title={t("page.redeem.title")} description={t("page.redeem.desc")} /> */}
        </div>


        <div className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f4f1] px-10 py-3">
          <div className="flex items-center gap-4 text-[#121712]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path></svg>
            </div>
            <h2 className="text-[#121712] text-lg font-bold leading-tight tracking-[-0.015em]">{t("app.title")}</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f4f1] text-[#121712] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">1,250 {t("redeem.points")}</span>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            ></div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px]  py-5 max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4"><p className="text-[#121712] tracking-light text-[32px] font-bold leading-tight min-w-72">{t("redeem.title")}</p></div>
            <div className="p-4">
              <div
                className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[10px] w-full h-80"
              >
  <div
  className="relative rounded-xl w-full h-64 md:h-96 flex items-end bg-cover bg-center bg-linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)"
  style={{
    backgroundImage:
      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDo45u_39GxrC0Gud9lPa7TNSmBXuCv8qQqdkTIURp161_jyxH4uMnvXqsufPh9qbQ7qbRR16pCfALIZxAQOAgU8fzBRqhwiA5vAubTbyChE8ldALcrJijSbgihvsuRstG2wzC_C_4urQ000_LI9NQuO8IXTW0n6aU875hrFOj9UxXWOcrtOZEVj_kq1BzkQhcEMRM0L8lBaKqrBZzEeUt2Xsc7hNhYG4XcjxfgODj2GJVFNQlQ3y9dygJZdFY7xjOTjoImSUaNOwo')",
  }}
>

                <div className="flex w-full items-end justify-between gap-4 p-4">
                  <div className="flex max-w-[440px] flex-1 flex-col gap-1">
                    <p className="text-white tracking-light text-2xl font-bold leading-tight max-w-[440px]">{t("points.summary")}</p>
                    <p className="text-white text-base font-medium leading-normal">{t("redeem.subtitle")}</p>
                  </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <h3 className="text-[#121712] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t("redeem.Categories")}</h3>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f4f1] pl-4 pr-4">
                <p className="text-[#121712] text-sm font-medium leading-normal">{t("redeem.seeds")}</p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f4f1] pl-4 pr-4">
                <p className="text-[#121712] text-sm font-medium leading-normal">{t("redeem.tools")}</p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f4f1] pl-4 pr-4">
                <p className="text-[#121712] text-sm font-medium leading-normal">{t("redeem.Fertilizer")}</p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f1f4f1] pl-4 pr-4">
                <p className="text-[#121712] text-sm font-medium leading-normal">{t("redeem.Equipment")}</p>
              </div>
            </div>
            <h3 className="text-[#121712] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{t("redeem.options")}</h3>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#678368] text-sm font-normal leading-normal">{t("redeem.offers")}</p>
                  <p className="text-[#121712] text-base font-bold leading-tight">{t("redeem.discount")}</p>
                  <p className="text-[#678368] text-sm font-normal leading-normal">{t("redeem.off_summary")}</p>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                ><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn13XnuWWiETtstGihjNFS1uEnE0bhLZdNzeZiVUo7Gs0_z06T1zkdXFk_KdyBVO6l4H_Od8dyfCShS90QW4vT6I_vfCEL2BQaqaRitMzGMH_TF2oz1BpL4SDdXWYaMR51IJ0L-P5xd6SNcePBuoLiyKWFZ--qaNP3kKw2GukU5Jo11Zw7wIUSwlKunJrTDlJGssfrklzfQVcCnfrkEb_sdpxGyOkYZUnxGm4oIYo9gRd5y-XLj_glaKzlQ7b8mHxxBFLn3fKIhSI" alt="seed" /></div>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                ><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfOwpoIavKfmif0jCmQgWOUTYGu2WRqRXZIZjz06DSYRYEzO6mAMYvB8n1XE8KuWBejrdmaEcl2nQB2Xlv4EMcxlkUeNWvEnhlgOLmoZrRsDW0nAct-zwjT0j-v0Gt_pawZrng6TqeaukHNUzh0Ge0U8B5e0QAZHehClmui06ck-rO1Vr_k14JzpWgj96qIMiDZduLkIdEPk915zxAsUdJ2iEJlGHbu8RMpqxXNiU-91HORbBhBDIfR0pPRPzcyH-88PMQMhJ07vw" alt="fertilizer" /></div>
                <div>
                  <p className="text-[#121712] text-base font-medium leading-normal">{t("redeem.card1")}</p>
                  <p className="text-[#678368] text-sm font-normal leading-normal">500 {t("redeem.points")}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                ><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC51HtMsU4Bm3nkhZwouD8CWlinBTuCR087URFgIrooYywhAgCKT3jcAaLfydwzfD6x7j1conQ9sE4bJSyLKvrOeqQQfip2fcI9GjQCJZ3FkuGpEKElZqV4Nk9kxPv0pfWUuXc-KJEe_vtaMvnjdoK6EoczpV8Rvid88YdHv8Rc1ZlwHXsoe4UrCi_v9IQihFYTeWlLgtYqhoaO1S2No--RU4xb8VWuoPsKMPKSZd5RbxBXAQiLSDFvyRNSx9yMyUyx2YBujqfqi7s" alt="tractor_tires" /></div>
                <div>
                  <p className="text-[#121712] text-base font-medium leading-normal">{t("redeem.card2")}</p>
                  <p className="text-[#678368] text-sm font-normal leading-normal">800 {t("redeem.points")}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                ><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6RUX86C2qBF9XuK3l5QFEYGg8P0R-RuG2hCcl8F2ObXRE0LQlo0Pk9MNYRwzH8LqQo3WQgWn6Spu5k_QP-2lyDGkzQasQmdgZDRHJNrnQTJJuPx3ZSKOIdr3Z8K6C8bpnHAcZdWHlqFuisZoox0atAY1ZU1i-Vaq7ghJmPIhmtmiaWSu5rkgzT0doBE94LIM4SiR4kNtYfD4feblN9zZ4IC1_nmX5_43T13v0BfEw7IPAYnv2VCLLQfPkoXsE6KLCz3pCzdsnxFw" alt="seed" /></div>
                <div>
                  <p className="text-[#121712] text-base font-medium leading-normal">{t("redeem.card3")}</p>
                  <p className="text-[#678368] text-sm font-normal leading-normal">300 {t("redeem.points")}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                ><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7uVJ5LMOXCmIAePjbv4JdNzjzltQoiTfCTKrLRWOK4XFKx8AAxw1k7wFzVolc8ePC-p73rPRdqtK1Rql_lZ8Hru-yQA8kpjSTBT6rlAE2gyIAiS8b6aLK3GU6by5JHMGc5BE_KZeg7Hikbmf_uKvuaqIoZTpRZnSOpCh793oQ1maSUYou2DwpKjn3c8CZzsEqbTuHb6d-azJoR2cpuJ69NRWs97TBI2SiqejuUvimbKFslZS42PyCocuV4mhj3zCc_2KexzIuThI" alt="grasses" /></div>
                <div>
                  <p className="text-[#121712] text-base font-medium leading-normal">{t("redeem.card4")}</p>
                  <p className="text-[#678368] text-sm font-normal leading-normal">1000 {t("redeem.points")}</p>
                </div>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#208823] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">{t("redeem.title")}</span>
              </button>
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