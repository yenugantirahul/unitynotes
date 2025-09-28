// app/layout.tsx
"use client"; // <-- Add this at the top

import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useState } from "react"; // <-- Import useState
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Note: You can't export metadata from a client component.
// Move metadata to a page.tsx file or a separate layout file if needed.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") document.title = "UnityNotes | Home";
    else if (pathname === "/login")
      document.title = "UnityNotes | Authentication";
    else if (pathname === "/profile") document.title = "UnityNotes | Profile";
  }, [pathname]);
  // Manage the sidebar state here
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <html lang="en">
      <body className={`${roboto.className} flex min-h-screen`}>
        {/* Pass state down to the Sidebar */}
        <ThemeProvider
          attribute="class" // 👈 adds "class=dark" on <html>
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <div className="flex flex-1 flex-col">
            {/* Pass the setter function down to the Header */}
            <Header setIsSidebarOpen={setIsSidebarOpen} />

            <main className="flex-1 overflow-y-auto dark:bg-gray-900 bg-white p-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
