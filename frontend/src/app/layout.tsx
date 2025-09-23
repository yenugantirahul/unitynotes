// app/layout.tsx
"use client"; // <-- Add this at the top

import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useState } from "react"; // <-- Import useState

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Note: You can't export metadata from a client component.
// Move metadata to a page.tsx file or a separate layout file if needed.
/*
export const metadata: Metadata = {
  title: "UnityNotes",
  description: "Collaborative platform",
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Manage the sidebar state here
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <html lang="en">
      <body className={`${roboto.className} flex min-h-screen`}>
        {/* Pass state down to the Sidebar */}
        <SideBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex flex-1 flex-col">
          {/* Pass the setter function down to the Header */}
          <Header setIsSidebarOpen={setIsSidebarOpen} />

          <main className="flex-1 overflow-y-auto bg-white p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
