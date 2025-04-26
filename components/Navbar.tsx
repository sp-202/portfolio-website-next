'use client';
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const sections = ["home", "about", "projects", "contact"];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      const offsets = sections.map((id) => {
        const section = document.getElementById(id);
        if (!section) return { id, offset: Infinity };
        return { id, offset: section.offsetTop };
      });

      const current = offsets.reduce((prev, curr) =>
        scrollY >= curr.offset - 100 ? curr : prev
      );

      setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 dark:text-white transition">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Subhodeep</h1>
        <ul className="flex space-x-6 items-center">
          {sections.map((section) => (
            <li key={section}>
              <Link
                href={`#${section}`}
                className={`transition ${
                  activeSection === section
                    ? "text-blue-500 dark:text-blue-300 text-xl font-semibold"
                    : "hover:text-blue-500 dark:hover:text-blue-300 text-xl font-semibold"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-xl transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
