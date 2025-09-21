"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaSearch, FaHome, FaUser, FaBars } from "react-icons/fa";
import { RiAddLargeLine } from "react-icons/ri";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Profile", icon: <FaUser /> },
    { name: "Settings", icon: <RiAddLargeLine /> },
  ];

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="h-screen  lg:flex flex-col hidden w-[220px] bg-gradient-to-b from-[#63688A] to-[#4B507D] p-5 shadow-2xl gap-8">
        <h1 className="text-3xl pt-[20px] text-white font-bold mb-8 text-center">
          UnityNotes
        </h1>

        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 p-3 rounded-md justify-start transition-all duration-300 
                ${
                  active === item.name
                    ? "bg-white text-[#63688A]"
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

      {/* Mobile Sidebar (Drawer) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative bg-gradient-to-b from-[#63688A] to-[#4B507D] w-64 h-full p-5 flex flex-col gap-8 shadow-2xl animate-slide-in">
            <h1 className="text-3xl text-white font-bold mb-8 text-center">
              UnityNotes
            </h1>

            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  onClick={() => {
                    setActive(item.name);
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-md justify-start transition-all duration-300 
                    ${
                      active === item.name
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

      {/* Header */}
      <div className="lg:h-[130px] h-[80px] p-5 flex justify-between items-center bg-[#63688A] w-full shadow-md">
        <div className="flex items-center gap-2">
          {/* Hamburger for mobile sidebar */}
          <Button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-white p-2 rounded-md hover:bg-gray-200 hover:text-black transition-colors"
          >
            <FaBars />
          </Button>
          <h1 className="text-white lg:text-5xl text-2xl font-bold">
            DashBoard
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="lg:block hidden">
          <input
            type="text"
            placeholder="Search"
            className="h-[50px] bg-white w-[300px] rounded-md p-3 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Mobile Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-white lg:hidden block text-black p-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            <FaSearch />
          </Button>

          <Button className="bg-white cursor-pointer lg:h-[50px] lg:w-[50px] text-5xl text-black p-2 rounded-md hover:bg-gray-200 transition-colors">
            <RiAddLargeLine />
          </Button>
        </div>
      </div>

      {/* Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 lg:hidden bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-5 flex flex-col gap-4 shadow-lg">
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="h-[45px] w-full rounded-md p-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-black p-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
