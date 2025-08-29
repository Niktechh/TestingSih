"use client"
import PlaceholderPage from '@/Components/PlaceholderPage'
import React from 'react'
import { useI18n } from "@/lib/i18n";


const Page = () => {
  const { t } = useI18n() as any;
  return (
    <div><PlaceholderPage title={t("page.data_entry.title")} description={t("page.data_entry.desc")} /></div>
  )
}

export default Page