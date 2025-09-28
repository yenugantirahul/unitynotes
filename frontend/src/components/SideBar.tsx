// components/SideBar.tsx
"use client";
import { FaHome, FaSignInAlt, FaUser } from "react-icons/fa";
import { Button } from "./ui/button";
import { CiSettings } from "react-icons/ci";
// Corrected Imports: Use 'next/navigation' for App Router
import { useRouter, usePathname } from "next/navigation";
import { SetStateAction } from "react";
interface SideBarTypes {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
}
const SideBar = ({ isSidebarOpen, setIsSidebarOpen }: SideBarTypes) => {
  const router = useRouter();
  const pathName: string = usePathname();
  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Login/Signup", icon: <FaSignInAlt />, path: "/login" },
    { name: "Settings", icon: <CiSettings />, path: "/settings" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <div className="relative bg-gradient-to-b from-[#63688A] to-[#4B507D] dark:bg-black  w-64 h-full p-5 flex flex-col gap-8 shadow-2xl animate-slide-in">
            <h1 className="text-3xl text-white font-bold mb-8 text-center">
              UnityNotes
            </h1>

            <div className="flex flex-col  gap-4">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)} // <-- FIX: Actually navigate
                  className={`flex items-center gap-3 p-3 dark:bg-white dark:text-black rounded-md justify-start transition-all duration-300
                    ${
                      pathName === item.path // Use pathName to set active state
                        ? "bg-white text-[#63688A]"
                        : "bg-[#4B507D] text-white hover:bg-white hover:text-[#63688A]"
                    } `}
                >
                  {item.icon} <span className="font-medium">{item.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="h-screen lg:flex flex-col hidden w-[220px] bg-gradient-to-b light:from-[#63688A] to-[#4B507D] dark:bg-black p-5 shadow-2xl gap-8">
        <h1 className="text-3xl pt-[20px] text-black dark:text-white font-bold mb-8 text-center">
          UnityNotes
        </h1>
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`flex cursor-pointer dark:bg-white dark:text-black items-center gap-3 p-3 rounded-md justify-start transition-all duration-300
              ${
                pathName === item.path
                  ? "bg-white dark:bg-black dark:text-white text-[#63688A]"
                  : "bg-[#4B507D] text-white hover:bg-white hover:text-[#63688A]"
              } `}
            >
              {item.icon} <span className="font-medium">{item.name}</span>
            </Button>
          ))}
        </div>
        <div className="mt-auto text-center text-gray-300 text-sm">
          © 2025 UnityNotes
        </div>
      </div>
    </>
  );
};

export default SideBar;
