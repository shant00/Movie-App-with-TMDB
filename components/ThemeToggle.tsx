"use client";
import { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    const newDarkMode = !darkMode;
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-900 rounded text-gray-200 dark:bg-gray-200 dark:text-black transition-colors duration-300"
    >
      {darkMode ? '🌞 Light Mode' : '🌜 Dark Mode'}

    </button>
  );
};

export default ThemeToggle;
