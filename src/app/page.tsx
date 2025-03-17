"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative min-h-screen">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('/images/hero-bg.jpg')", 
          filter: "brightness(0.6)" 
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            راه خانه تو
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            خانه هایی که با سبک زندگی تو همخوانی دارند
          </p>
          
          {/* Search box */}
          <div className="max-w-3xl w-full mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="جستجوی شهر، منطقه یا محله"
                className="flex-grow py-3 px-4 rounded-r-lg text-black focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="bg-primary-10 hover:bg-primary-700 text-white py-3 px-6 rounded-l-lg"
              >
                جستجو
                <Search className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
