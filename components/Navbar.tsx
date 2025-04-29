'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const sections = ['home', 'about', 'skills', 'projects', 'contact'];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Map sections to their offsets and heights
      const sectionData = sections.map((id) => {
        const section = document.getElementById(id);
        if (!section) {
          console.warn(`Section #${id} not found in DOM`);
          return { id, offset: Infinity, height: 0 };
        }
        return {
          id,
          offset: section.offsetTop,
          height: section.offsetHeight,
        };
      });

      // Debug: Log section offsets and scroll position
      console.debug('ScrollY:', scrollY, 'Section Data:', sectionData);

      // Find the current section based on scroll position
      const current = sectionData.reduce((prev, curr) => {
        // Consider a section active if scrollY is within its bounds (with a 100px offset)
        if (
          scrollY >= curr.offset - 100 &&
          scrollY < curr.offset + curr.height - 100
        ) {
          return curr;
        }
        // Keep the previous section if no match (helps with gaps)
        return prev.offset <= curr.offset ? prev : curr;
      }, sectionData[0]);

      if (current.id !== activeSection) {
        console.debug('Active Section Changed:', current.id);
        setActiveSection(current.id);
      }
    };

    // Run initially and on scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Re-run scroll detection on resize (in case section offsets change)
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeSection]);

  // Debug: Log menu state changes
  useEffect(() => {
    console.debug('Mobile Menu State:', isMenuOpen ? 'Open' : 'Closed');
  }, [isMenuOpen]);

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <nav
      className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg transition z-50"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-4xl font-semibold">Subhodeep</h1>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          {sections.map((section) => (
            <li key={section}>
              <Link
                href={`#${section}`}
                className={`transition ${
                  activeSection === section
                    ? 'text-blue-500 dark:text-blue-300 text-xl font-semibold'
                    : 'hover:text-blue-500 dark:hover:text-blue-300 text-xl font-semibold'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 text-xl transition"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Navigation (Dropdown) */}
      <div
        className={`md:hidden w-full absolute left-0 top-16 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg rounded-b-lg`}
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <ul className="flex flex-col items-center py-4">
          {sections.map((section) => (
            <li key={section} className="py-2">
              <Link
                href={`#${section}`}
                className={`transition ${
                  activeSection === section
                    ? 'text-blue-500 dark:text-blue-300 text-xl font-semibold'
                    : 'hover:text-blue-500 dark:hover:text-blue-300 text-xl font-semibold'
                }`}
                onClick={handleLinkClick}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
          <li className="py-2">
            <button
              onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
                handleLinkClick();
              }}
              className="p-2 rounded bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 text-xl transition"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;