"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaSearch, FaBars } from "react-icons/fa";
import { RiAddLargeLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Header = ({ setIsSidebarOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 1. Add state for the search input value
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Create a function to handle the search logic
  const handleSearch = () => {
    // Don't search if the query is empty
    if (!searchQuery.trim()) return;

    // Log the search query to the console for now
    console.log("Searching for:", searchQuery);

    // TODO: Implement your actual search logic.
    // For example, you might want to navigate to a search results page:
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);

    // Close the modal and reset the input after searching
    setIsModalOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="flex">
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
              // 3. Connect the input to the state
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="h-[45px] w-full rounded-md p-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-black p-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </Button>
              {/* 4. Call the search handler from the button */}
              <Button
                onClick={handleSearch}
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
