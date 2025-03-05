'use client';

import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // چک کردن حالت قبلی در localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  // تغییر وضعیت دارک مود
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-5 right-5 p-3 bg-yellow-400 dark:bg-yellow-600 text-white rounded-full transition duration-300"
    >
      {isDarkMode ? "🌙" : "🌞"}
    </button>
  );
}

export default DarkModeToggle;
