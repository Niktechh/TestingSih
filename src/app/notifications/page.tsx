"use client"
import React from 'react'
import PlaceholderPage from "@/Components/PlaceholderPage";
import { useI18n } from "@/lib/i18n";

const Page = () => {
  const { t } = useI18n() as any;
  return (
    <div><div
    >

              <PlaceholderPage
            title={t("page.notifications.title")}
            description={t("page.notifications.desc")}
          />
    </div></div>
  )
}

export default Page