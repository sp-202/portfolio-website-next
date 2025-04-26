'use client';
import { useEffect, useState } from "react";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Page() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="font-sans bg-white text-black dark:bg-gray-900 dark:text-white">
      <Navbar />
      <section id="home" className="min-h-screen pt-24 max-w-screen-xl mx-auto"><HomeSection /></section> {/* Added padding-top to avoid overlap */}
      <section id="about" className="min-h-screen pt-20"><AboutSection /></section>
      <section id="projects" className="min-h-screen pt-20"><ProjectsSection /></section>
      <section id="contact" className="min-h-screen pt-20"><ContactSection /></section>
      <Footer />
      {showTopBtn && (
        <Link
          href="#home"
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition dark:bg-blue-400 dark:hover:bg-blue-500"
        >
          ↑
        </Link>
      )}
    </main>
  );
}
