"use client";

import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 p-4">
        <nav className="space-y-2">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/predictions">Predictions</Link>
          <Link href="/recommendations">Recommendations</Link>
          <Link href="/data-entry">Data Entry</Link>
          <Link href="/notifications">Notifications</Link>
          <Link href="/settings">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
